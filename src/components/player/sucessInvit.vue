<template>
  <div style="margin-top:15px;">
    <div style="display: flex;justify-content: flex-start;font-size:12px;line-height:40px;">
      <div>筛选</div>
      <div style="margin-left:15px;">  <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
    </div>
    <div style="margin-top:15px;">
      <div v-for="(item,index) in sucessList" :key="index" style="display: flex;padding: 15px 0;justify-content: space-between;border-bottom: 1px solid #E8E8E8;">
        <div>
          <img :src="item.domain?item.domain+item.image_url:'../../../static/img/static/user.png'" width="200px" height="200px">
        </div>
        <div style="width:750px;font-size:15px;line-height:40px;margin-left:20px;">
          <div style="display: flex;justify-content: flex-start">
            <div>{{(item.family_name+item.middle_name+item.name)?(item.family_name+'·'+item.middle_name+'·'+item.name):'匿名用户'}}</div>
            <div style="margin-left:20px">{{item.score}}</div>
            <div style="margin-left:10px;padding-top:10px;"><el-rate
              disabled
              :value="parseFloat(item.score)"
              :colors="['#008489', '#008489', '#008489']">
            </el-rate></div>
          </div>
          <div>
            <span><b>{{item.six == 0?'私密':item.six == 1?'男':'女'}}</b></span>
            <span style="margin-left:13px"><b>{{item.country !=0?item.country:'未知'}}</b></span>
          </div>
          <div>
            <p>{{language[item.language].label}}/<span  v-for="items in item.other_language.split(',')">{{items?items == 0?'中文,':items == 1?'English,':'日本语,':''}}</span></p>
          </div>
          <div>
            {{item.introduce?item.introduce:'这个人很懒！什么都没留下'}}
          </div>
         <!-- <div >邀请志愿者时间：<span v-for="items in item.slot">{{items.begin_time +'—'+ items.end_time}}</span></div>-->
          <div v-if="item.slot.length < 2">
            邀请志愿者时间：<span>{{item.slot[0].begin_time +'—'+item.slot[0].end_time}}</span>
          </div>
          <div v-if="item.slot.length > 1">
            <el-popover
              placement="top-start"
              trigger="click"
              width="500"
              @show="timeNow(item)"
              :content="asdasdasd"
            >
              <el-button  style="border:none;padding:0;" slot="reference"  plain>邀请志愿者时间：多个时间段(点击查看)</el-button>
            </el-popover>
          </div>
        </div>
        <div style="text-align: right;width:68px;"  :style="{lineHeight:item.audit?'200px':'100px'}">
          <el-button type="primary" size="mini" >{{item.audit?item.audit == 1? '已同意':'已拒绝':'待处理'}}</el-button>
          <el-button v-if="item.status == 0 && item.audit == 0" size="mini" style="width:68px;margin:0;border-color:#008489;color:#008489;background-color: #fff;" @click="open(item,index)">撤回</el-button>
        </div>
      </div>
    </div>
    <None v-if="!sucessList.length" type="suceeIvit"></None>
    <div style="margin:20px 0;text-align: center">
      <el-pagination  @current-change="handleCurrentChange" :current-page.sync="index"   :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import None from '../../public/noNumber'
  import test from '../../../static/js/language'
    export default {
        name: "sucessInvit",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            options:[
              {label:'待处理',value:'0'},
              {label:'已同意',value:'1'},
              {label:'已拒绝',value:'2'},
            ],
            value:'',
            sucessList:[],
            active_id:'',
            total:0,
            language:[],
            asdasdasd:'',
            index:1
          }
      },
      components:{
        None
      },
      watch:{
        value:function(){
          this.getList(1)
        }
      },
      methods:{
        timeNow(item){
          let a = ''
          for(let i = 0;i<item.slot.length;i++){
             a+= item.slot[i].begin_time + '—'+item.slot[i].end_time + ' ||  '
          }
          this.asdasdasd = a
        },
        open(item,index) {
          this.$confirm('您正在撤回对该志愿者的邀请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
           this.returnInvit(item,index)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消撤回'
            });
          });
        },
        returnInvit(item,index){
          this.$http.post(this.api + '/InviteD',{
            token: localStorage.getItem('token'),
            invite_id: item.invite_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.sucessList.splice(index,1)
                this.$message({
                  type: 'success',
                  message: '撤回成功!'
                });
              }else if(res.data.code == 3){
                this.$http.post(this.api +'/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.returnInvit(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        getList(val){
          this.$http.post(this.api + '/InviteListMy',{
            token: localStorage.getItem('token'),
            audit:this.value,
            activity_id: this.active_id,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.sucessList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getSucess(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
          getSucess(val){
            this.$http.post(this.api + '/InviteListMy',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
              page:val
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.total = res.data.data.total
                  this.sucessList = res.data.data.data
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getSucess(val)
                    })
                }else{
                  alert(res.data.msg)
                }
              })
          },
        handleCurrentChange(val){
          if(this.value){
            this.getList(val)
          }else{
            this.getSucess(val)
          }
        }
      },
      mounted(){
          this.getSucess(1)
      },
      created(){
        this.active_id = this.$route.query.activeId
        this.language = test()
      }
    }
</script>

<style scoped>

</style>
