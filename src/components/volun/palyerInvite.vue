<template>
    <div style="margin-top:15px;">
      <div style="display: flex;justify-content: flex-start;font-size:12px;line-height:40px;">
        <div>筛选</div>
        <div style="margin-left:15px;"><el-select v-model="value" @change="getOther" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
      </div>
        <div style="margin-top:17px">
          <div v-for="(item,index) in palyerList" :key="index" style="padding:18px 0;border-bottom: 1px solid #E8E8E8">
            <div style="display: flex;justify-content: flex-start;;font-size:14px;line-height:48px;">
              <div>
                <img :src="item.invuser.head_image? item.invuser.headimage.domain + item.invuser.headimage.image_url:userImg" width="48px" height="48px" style="border-radius: 50%">
              </div>
              <div @click="touser(item,index)" style="margin:0 10px;cursor: pointer">
                {{item.invuser.family_name+'·'+item.invuser.middle_name+'·'+item.invuser.name}}(策划人)
              </div>
              <div style="color:#999999">
                {{item.create_time}}
              </div>
            </div>
            <div style="display: flex;justify-content: space-between">
              <div>
                <LoadingImg type="2" v-on:toPublish="toPublish(item,index)" :src="item.cover.domain + item.cover.image_url" style="width:200px;height:135px;overflow: hidden;cursor: pointer" ></LoadingImg>
              </div>
              <div style="width:750px;font-size:12px;line-height:30px;">
                <p style="color:#999999"><span v-for="items in item.kind">{{'/'+items.kind_name}}</span></p>
                <p><b>{{item.title}}</b></p>
                <div style="display: flex;justify-content: flex-start">
                  <span>{{item.score}}</span>
                  <div style="margin-left:10px">
                    <el-rate
                      style="margin-top:5px;"
                      disabled
                      :value="parseInt(item.score)"
                      :colors="['#14c5ca', '#14c5ca', '#14c5ca']">
                    </el-rate>
                  </div>
                  <div style="margin-left:15px;">
                    评论({{item.comment_num}})
                  </div>
                </div>
                <div style="margin-top:26px;">
                  <span>￥{{item.price}}</span>
                  <span style="color:#14c5ca;margin-left:10px;">邀请志愿时间：<span v-for="(items,indexs) in item.slot">{{items.begin_time +'—'+items.end_time}}，</span></span>
                </div>
              </div>
              <div style="line-height:55px;" v-if="item.audit == 0">
                <div><el-button @click="deelInvite(item,1)" type="primary">同意</el-button></div>
                <div><el-button @click="deelInvite(item,2)" style="border:1px solid #000;color:#000;margin-top:10px;background-color: #fff;" >谢绝</el-button></div>
              </div>
              <div v-if="item.audit != 0" style="line-height:135px">
                <el-button  type="primary" >{{item.audit == 1? '已同意':'已谢绝'}}</el-button>
              </div>
            </div>
          </div>
        </div>
      <div v-if="!palyerList.length">
        <None type="invite"></None>
      </div>
      <div style="margin:20px 0;">
        <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:990;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import LoadingImg from '../../public/loadingImg'
  import None from '../../public/noNumber'
    export default {
        name: "palyerInvite",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            value:'',
            userImg:'../../../static/img/static/user.png',
            options:[
              {label:'全部',value:'0'},
              {label:'待处理',value:'1'},
              {label:'已同意',value:'2'},
              {label:'已谢绝',value:'3'},
            ],
            palyerList:[],
            total:0,
            isLoading:false
          }
      },
      components:{
        None,
        LoadingImg,
        Loading
      },
      methods:{
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query:{
              information: item.activity_id
            }
          })
        },
          //选择类型
        getOther(val){
          if(val != 0){
            this.getOtherInvit(1,parseInt(val)-1)
          }else{
            this.getInvite(1)
          }
        },
          //同意或拒绝
        deelInvite(item,a){
          this.$confirm('此操作将同意或者拒绝该申请','是否继续？','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type: 'warning'
          })
            .then(()=>{
              this.goOndelte(item,a)
            })
            .catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        },
        goOndelte(item,a){
          this.$http.post(this.api + '/InviteA',{
            token: localStorage.getItem('token'),
            invite_id: item.invite_id,
            flag: a
          })
            .then(res=>{
              if(res.data.code == 1){
                if(a == 1){
                  this.$message({
                    type: 'success',
                    message: '同意成功！'
                  })
                }else{
                  this.$message({
                    type: 'success',
                    message: '谢绝成功！'
                  })
                }
                item.audit = a
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.goOndelte(item,a)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getOtherInvit(val,autid){
          this.isLoading = true
          this.$http.post(this.api + '/InviteL',{
            token: localStorage.getItem('token'),
            page:val,
            audit:autid
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.data){
                  this.palyerList = res.data.data.data
                  this.total = res.data.data.total
                }else{
                  this.palyerList = []
                  this.total = 0
                }
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getInvite(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
          getInvite(val){
          this.isLoading = true
            this.$http.post(this.api + '/InviteL',{
              token: localStorage.getItem('token'),
              page:val
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(res.data.data.data){
                    this.palyerList = res.data.data.data
                    this.total = res.data.data.total
                  }else{
                    this.palyerList = []
                    this.total = 0
                  }
                  this.isLoading = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getInvite(val)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  this.isLoading = false
                }
              })
          },
        handleCurrentChange(val){
          if(this.value){
            this.getOtherInvit(val,parseInt(this.value) - 1)
          }else{
            this.getInvite(val)
          }
        },
        touser(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.invuser.user_id
            }
          })
        }
      },
      mounted() {
          this.getInvite(1)
      }
    }
</script>

<style scoped>

</style>
