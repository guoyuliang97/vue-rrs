<template>
    <div class="exp_con">
      <h2 class="title" style="font-size:30px;">提交至人人耍前，请先查看我们的政策</h2>
      <p class="language_txt">人人耍会审查您将提交的版本内容，所以请务必确保您对提交内容确认无误。 您可以随时返回并修改描述。</p>
      <div class="margin">
        <h4>参与者人数最低要求</h4>
        <p class="language_txt">人人耍体验参与者人数最少可为一人。 也就是说，即便只有一人预订，您仍然需要开展体验。</p>
      </div>
      <div class="margin">
        <h4>服务费</h4>
        <p class="language_txt">人人耍对每笔预订收取10%的费用。 了解更多关于人人耍服务费的信息。</p>
      </div>
      <div class="margin">
        <h4>专属体验</h4>
        <p class="language_txt">在人人耍上安排的各体验日期，您只能接待爱彼迎的参与者。 请您安排其他时间接待通过其他平台预订和支付的活动参与者。</p>
      </div>
      <div class="margin">
        <h4>选择提交即表示我确认以下信息是真实的(必填)<span style="color:#F73737;">*</span>：</h4>
        <el-checkbox-group v-model="checkList" style="display: flex;flex-direction: column;">
          <el-checkbox label="我的体验符合本地法律规定。了解更多可能适用的其他法律规定，如营业许可。" style="margin:10px 0;"></el-checkbox>
          <el-checkbox label="我同意人人耍体验附加服务条款及参与者退款政策。" style="margin:10px 0;"></el-checkbox>
          <el-checkbox label="我确认我的描述和照片为原创，它们准确反映我的体验活动内容。" style="margin:10px 0;"></el-checkbox>
        </el-checkbox-group>
        <div class="margin">
          <el-button type="primary" :disabled="checkList.length <3? true:false" @click="change">提交审核</el-button>
          <el-button type="primary" plain @click="changeRouter">编辑描述</el-button>
        </div>
      </div>
      <div v-show="isAudit" style="position: fixed;top:0;left:0;bottom: 0;right:0;background-color: rgba(0,0,0,.5);z-index:999;display: flex;justify-content: center;align-items: center">
        <div style="padding: 20px;background-color: #fff;">
          <h3>提示</h3>
          <h4 style="margin: 20px 0;">当前您还未验证策划者身份信息,为保证您的体验能提交前往请验证策划者身份信息。</h4>
          <div style="display: flex;justify-content: space-between">
            <el-button type="primary" @click="isAudit = false">不用了</el-button><el-button type="primary" @click="toAudit">前往验证</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "subExperience",
      data(){
          return{
            checkList:[],
            api: this.GLOBAL.baseURL,
            audit_face:'',
            isAudit:false,
            active_id: ''
          }
      },
      methods:{
        change(){
          if(this.active_id){
              this.$http.post(this.api + '/ActivityE',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                visit:0
              })
                .then(res=>{
                  if(res.data.code == 1){
                    let a = res.data.data.step.replace(/[^0-9]/ig,' ').trim().split(/\s+/).length
                    if(a ==15) {
                      if(this.audit_face == 2 || this.audit_face == 1){
                        this.$http.post(this.api + '/home/Activity/save_activity',{
                          token: localStorage.getItem('token'),
                          activity_id: this.active_id,
                          complete: 1,
                        })
                          .then(res=>{
                            if(res.data.code == 1){
                              this.$router.push('/publishList')
                            }else if(res.data.code == 3){
                              this.change()
                            }else if(res.data.code == 0){
                              alert(res.data.msg)
                            }
                          })
                      }else{
                       this.isAudit = true
                     }
                    }else{
                      alert('您的体验还未填写完整！')
                    }
                  }else if(res.data.code == 3){
                    this.change()
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
          }
        },
        changeRouter(){
          this.$emit('changeRouter',{id:4,router:"Feel",information: this.active_id})
        },
        getUser(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.audit_face =  res.data.data[0].audit_face
              }else if(res.data.code == 3){
                this.getUser()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toAudit(){
          this.$router.push({
              path: '/authentication',
              query:{
                active_id: this.active_id
              }
            })
        }
      },
      mounted(){
          this.getUser()
      },
      created() {
          this.active_id = this.$route.query.information
      }
    }
</script>

<style scoped>
.margin{
  margin: 30px 0;
}
.el-checkbox+.el-checkbox {
  margin-left: 0px;
}
</style>
