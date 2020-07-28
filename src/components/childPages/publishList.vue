<template>
    <div>
      <el-container>
        <el-header><Head type="publishList" @reload="reload"></Head></el-header>
        <el-main style="width:900px;margin: 20px auto;text-align: left">
          <div style="display: flex;justify-content: space-between">
            <div >
              <div style="display: flex;justify-content: flex-start;">
                <p style="font-size:30px;font-weight:bold">欢迎回来</p>
                <div style="margin-left:20px;">
                  <div style="margin:10px 0;color:red;" v-if="audit_face == 0"><el-button  size="mini"  style="border:1px solid red;color:red" >未验证身份证信息</el-button><span @click="tocheck" style="border-bottom: 1px solid red;font-size: 13px;margin-left:10px;cursor: pointer">去验证</span></div>
                  <el-button  size="mini" v-if="audit_face == 1" style="margin:10px 0;color:#14c5ca;border:1px solid #14c5ca" >验证身份已提交</el-button>
                  <div style="margin:10px 0;color:#14c5ca;" v-if="audit_face == 2" > <el-button  size="mini" style="margin:10px 0;color:#14c5ca;border:1px solid #14c5ca" >身份验证已通过</el-button><span @click="lookYan" style="border-bottom: 1px solid #14c5ca;font-size: 13px;margin-left:10px;cursor: pointer">{{isLook? '收起':'查看'}}</span></div>
                  <div  v-if="audit_face == 3" style="color:red;font-size: 13px;">
                    <el-button  size="mini"  style="margin:10px 0;color:red;border:1px solid red" >身份审核不通过，原因：{{ refuse_reason}}</el-button>
                    <span style="margin-left:20px;border-bottom: 1px solid red;cursor: pointer" @click="tocheck">去验证</span>
                  </div>
                </div>
              </div>
              <div v-if="isLook" style="display: flex;justify-content: flex-start;background-color: #F2F2F2;padding: 5px;font-size: 13px;">
                <div>姓名：{{name.slice(0,4)}}*</div>
                <div style="margin-left:20px;">身份证号：{{idCard}}*********</div>
              </div>
              <p>查看并编辑您的全部体验。祝您体验之旅愉快！</p>
            </div>
            <div>
              <el-button type="primary" plain @click="toExperience">新体验</el-button>
            </div>
          </div>
          <div style="margin-top:15px;">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
              <el-tab-pane label="待审核" name="2"></el-tab-pane>
              <el-tab-pane label="已通过" name="3"></el-tab-pane>
              <el-tab-pane label="未通过" name="4"></el-tab-pane>
              <el-tab-pane label="未提交" name="1"></el-tab-pane>
            </el-tabs>
          </div>
          <Loading v-show="loadingState" style="text-align: center"></Loading>
          <div v-for="(item,index) in publishList" style="display: flex;justify-content: space-around;padding:20px 0;border-bottom: 1px solid #E6E6E6" v-if="item.status == 0" >
            <div style="width:300px;height:200px;background-size: 100% 100%;font-size:14px;" :style="{backgroundImage: item.backUrl?'url('+item.backUrl+')':'url(../../../static/img/static/defult.png)'}">
              
              
              <div v-if="item.complete == 1 && item.audit == 0" class="experienceState" style="backgroundColor:rgba(	255,255,255,1);width:90px;color:#000;">体验已提交</div>
              <div v-if="item.complete == 0 && item.audit == 0" class="experienceState" style="backgroundColor:rgba(255,165,0,.8);width:60px;">进行中</div>
              <div v-if="item.complete == 1 && item.audit == 2" class="experienceState" style="backgroundColor:rgba(255,0,0,.5);width:60px;">已拒绝</div>
              <div v-if="item.complete == 1 && item.audit == 1" class="experienceState" style="backgroundColor:rgba(0,255,0,.5);width:60px;">通过</div>
            </div>
            <div style="line-height:40px;width:400px;">
              <h2 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.title}}</h2>
              <h2 v-if="item.title == ''">体验</h2>
              <p v-if="item.step != 0">在您提交体验前，还需要完成{{item.step}}步骤。</p>
              <p v-if="item.step == 0 && item.complete == 0 && item.audit != 1">您的体验未提交,快去提交吧!</p>
              <p v-if="item.complete == 1 && item.audit == 0" style="color:red">您的体验已提交，将在2-4天内给予审核结果。</p>
              <p v-if=" item.audit == 1">您的体验已通过审核，快去组织您的体验吧！</p>
              <p v-if="item.complete == 1 && item.audit == 2" style="color:red">提示：<span>{{item.reason}}</span></p>
              <el-button v-if="item.complete == 0" type="primary" @click="active(item,index)">继续</el-button>
              <el-button v-if="item.complete == 1" type="primary" @click="active(item,index)">查看</el-button>
            </div>
            <div>
              <el-popover
                placement="top"
                width="160"
                v-model="item.visible">
                <p>确定狠心删除这个活动？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="abolish(item,index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="deelActive(item,index)">确定</el-button>
                </div>
                <el-button slot="reference" icon="el-icon-delete"></el-button>
              </el-popover>
            </div>
          </div>
          <div v-if="!publishList.length" >
            <None type='publish'></None>
          </div>
        </el-main>
      </el-container>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:990;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
  import Loading from '../../public/Loading'
  import Head from '../../public/head.vue'
  import None from '../../public/noNumber'
    export default {
        name: "publishList",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            publishList:[],
            loadingState:false,
            user:'',
            activeName:'2',
            audit_face:'',
            isLook:false,
            idCard:'',
            name: '',
            isLoading:false,
            refuse_reason:''
          }
      },
      components:{
        Head,
        Loading,
        None,
        LoadingImg
      },
      methods:{
        handleClick(val){
          this.getPublish(this.activeName)
        },
        toExperience(){
          this.$router.push('/experience')
        },
        deelActive(item,index){
          this.$post('/home/Activity/del_activity',{
            activity_id: item.active_id
          }).then(res=>{
               if(res.data.code == 1){
                this.getPublish()
              }else if(res.data.code == 3){
                this.deelActive(item,index)
              }
            })
        },
        active(item,index){
          this.$router.push({
            name: 'Experience',
            query:{
              information: item.active_id,
              complete: item.complete
            }
          })
        },
        abolish(item,index){
          item.visible = false
        },
        getPublish(){
          this.$post('/home/Activity/complete',{
            flag:this.activeName
          }).then(res=>{
            if(res.data.code == 1){
                let data = res.data.data
                let a = []
                for(let i = 0;i<data.length;i++){
                    a.push({
                      backUrl: data[i].cover_image? data[i].cover.domain + data[i].cover.themb_url:'../../../static/img/static/defult.png',
                      complete:data[i].complete,
                      active_id: data[i].activity_id,
                      title:data[i].title,
                      step:15-data[i].step.replace(/[^0-9]/ig,' ').trim().split(/\s+/).length,
                      audit: data[i].audit,
                      status: data[i].status,
                      visible:false,
                      reason: data[i].reason
                    })
              }
                this.publishList = a
              }else if(res.data.code == 3){
                this.getPublish()
              }
          })
        },
        tocheck(){
          this.$router.push('/authentication')
        },
        reload(res){
            if(res.data.code == 1){
              let data = res.data.data[0]
              this.audit_face =  data.audit_face
              this.name = data.family_name + data.middle_name + data.name
              this.idCard = data.idcard_n.slice(0,5)
              this.refuse_reason = data.refuse_reason
            }
        },
        lookYan(){
          this.isLook = !this.isLook
        }
      },
      mounted(){
        localStorage.removeItem('active_id')
        let _this = this
        if(this.$route.query.information){
          this.activeName = this.$route.query.information
        }
        _this.handleClick()
      }
    }
</script>

<style scoped>
.experienceState{
  width:60px;
  text-align: center;
  height:30px;
  margin:10px 0 0 10px;
  border-radius:5px;
  line-height:30px;
  color:white;
}
</style>
