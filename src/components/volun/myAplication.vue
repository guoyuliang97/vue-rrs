<template>
  <div style="margin-top:15px;">
    <div style="margin-top:17px">
      <div v-for="(item,index) in palyerList" :key="index" style="padding:18px 0;border-bottom: 1px solid #E8E8E8">
        <div style="display: flex;justify-content: flex-start;;font-size:14px;line-height:48px;">
          <div>
            <img :src="item.user.head_image? item.user.headimage.domain + item.user.headimage.image_url: '../../../static/img/static/user.png'" width="48px" height="48px" style="border-radius: 50%">
          </div>
          <div style="margin:0 10px;">
            我
          </div>
          <div style="color:#999999">
            {{item.create_time}}
          </div>
        </div>
        <div style="display: flex;justify-content: space-between">
          <div>
            <LoadingImg type="3" v-on:toPublish="toPublish(item,index)" :src="item.activity.cover.domain + item.activity.cover.image_url" style="width:200px;height:135px;overflow: hidden;cursor: pointer" ></LoadingImg>
          </div>
          <div style="width:750px;font-size:12px;line-height:30px;">
            <p style="color:#999999"><span v-for="items in item.activity.kind">{{'/'+items.kind_name}}</span></p>
            <p><b>{{item.activity.title}}</b></p>
            <div style="display: flex;justify-content: flex-start">
              <span>{{item.activity.score}}</span>
              <div style="margin-left:10px">
                <el-rate
                  style="margin-top:5px;"
                  disabled
                  :value="parseInt(item.activity.score)"
                  :colors="['#008489', '#008489', '#008489']">
                </el-rate>
              </div>
              <div style="margin-left:15px;">
                评论({{item.activity.comment_num}})
              </div>
            </div>
            <div style="margin-top:15px;">
              <span>￥{{item.price}}</span>
              <span style="color:#008489;margin-left:10px;">报名志愿活动时间：<span v-for="(items,indexs) in item.slot_id">{{items.begin_time +'—'+items.end_time}}，</span></span>
            </div>
          </div>
          <div v-if="item.status == 0" :style="{lineHeight: item.audit == 0?'55px':'135px'}" >
            <div><el-button type="primary">{{item.audit?item.audit == 1?'已同意':'已拒绝':'待处理'}}</el-button></div>
            <div v-if="item.audit == 0"><el-button @click="backInvit(item,index)">撤回</el-button></div>
          </div>
          <div v-if="item.status == 1" style="line-height: 135px;">
            <div><el-button style="background-color: #fff;border-color: red;color:red">已撤回</el-button></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!palyerList.length">
      <None type="myInvite"></None>
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
    name: "myAplication",
    data(){
      return{
        api:this.GLOBAL.baseURL,
        value:'',
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
      getInvite(val){
        this.isLoading = true
        this.$http.post(this.api + '/ErollListMy',{
          token: localStorage.getItem('token'),
          page: val
        })
          .then(res=>{
            if(res.data.code == 1){
              if(res.data.data.data){
                this.total = res.data.data.total
                this.palyerList = res.data.data.data

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
        this.getInvite(val)
      },
      backInvit(item,index){
        this.$confirm('此操作将撤回对该活动的志愿者申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.returnBM(item,index)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //撤回报名
      returnBM(item,index){
        this.$http.post(this.api + '/ErollD',{
          token: localStorage.getItem('token'),
          enroll_id: item.enroll_id
        })
          .then(res=>{
            if(res.data.code == 1){
              item.status = 1
              this.$message({
                type: 'success',
                message: '撤回成功!'
              });
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.returnBM(item,index)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
    },
    mounted() {
      this.getInvite(1)
    }
  }
</script>

<style scoped>

</style>
