<template>
    <div>
      <div v-if="type == 'wap'" style="position: fixed;top:0;left:0;right:0;bottom: 0;background-image: url('../../static/img/static/bg_wap.png');background-size: cover">
        <div style="background-color: white;display: flex;justify-content:flex-start;padding: 10px 10px;">
          <i @click="tohome" style="font-size: 30px;color:#000;" class="el-icon-close"></i>
          <p style="text-align: center;width:100%;">为您的第一趟旅程节省25元！</p>
        </div>
        <div style="margin-top: 10%;text-align: left;padding: 20px;">
          <img style="cursor: pointer" @click="toHome" src="../../static/img/static/logo.png" width="30px">
        </div>
        <div style="margin-top:10px;color:#fff;text-align:center;" >
          <div style="width:40px;height:40px;border-radius: 50%;background-color: #fff;margin: 0 auto">
          </div>
          <p style="margin-top:10px;">{{userName}} 送你一张</p>
          <p style="margin-top: 20px;font-size: 30px"><span style="font-size: 50px"><b>￥25</b></span>&nbsp;基金券</p>
          <p style="font-size: 13px">预定体验，旅程费用最高可减￥50</p>
          <p style="margin-top:20px;">注册并领取基金券</p>
          <div style="margin: 5px 0;">
            <div @click="toTelPhone" style="width:70%;padding: 10px 0;border-radius: 20px;background-color: #008489;color:#fff;margin: 0 auto;">手机号注册</div>
            <div @click="toWeixin" style="width:70%;padding: 10px 0;border-radius: 20px;opacity:1;border:1px solid #fff;color:#fff;margin: 10px auto 0;">微信</div>
          </div>
          <div>
            <p>其他注册方式</p>
            <div style="display: flex;justify-content: space-around;width:50%;margin: 10px auto 0;">
              <img  @click="toEmail" src="../../static/img/static/icon_y.png" >
              <img @click="toLogin" src="../../static/img/static/icon_qq.png" >
            </div>
          </div>
        </div>
      </div>
      <div v-if="type == 'pc'" style="position: fixed;top:0;left:0;right:0;bottom: 0;background-image: url('../../static/img/static/bg_pc.png');padding: 50px;">
        <div style="text-align: left;">
          <img style="cursor: pointer" @click="toHome" src="../../static/img/static/logo.png" width="30px">
        </div>
        <div style="margin-top:10%;color:#fff;" >
          <div style="width:40px;height:40px;border-radius: 50%;background-color: #fff;margin: 0 auto">
          </div>
          <p style="margin-top:10px;">{{userName}} 送你一张</p>
          <p style="margin-top: 20px;font-size: 30px"><span style="font-size: 50px"><b>￥25</b></span>&nbsp;基金券</p>
          <p style="font-size: 13px">预定体验，旅程费用最高可减￥25</p>
          <p style="margin-top:20px;">注册并领取基金券</p>
          <div style="margin: 10px 0;">
            <div @click="toTelPhone" style="width:340px;padding: 10px 0;border-radius: 20px;background-color: #008489;color:#fff;margin: 0 auto;">手机号注册</div>
            <div @click="toWeixin" style="width:340px;padding: 10px 0;border-radius: 20px;opacity:1;border:1px solid #fff;color:#fff;margin: 10px auto 0;">微信</div>
          </div>
          <div>
            <p>其他注册方式</p>
            <div style="display: flex;justify-content: space-around;width:200px;margin: 20px auto 0;">
              <img @click="toEmail" src="../../static/img/static/icon_y.png" >
              <img @click="toLogin" src="../../static/img/static/icon_qq.png" >
            </div>
          </div>
        </div>
      </div>
      <div v-if="isRegist" style="position: fixed;top:0;left:0;right:0;bottom: 0;background-color: rgba(255,255,255,1);padding: 50px;z-index:1">
        <div style="text-align: left;">
          <img style="cursor: pointer" @click="toHome" src="../../static/img/static/logo1.png" width="30px">
        </div>
        <div style="width:350px;text-align: left;position: fixed;top:50%;left:50%;margin-left:-175px;" :style="{marginTop: isTel?'-200px':'-250px'}">
          <div v-if="isTel">
            <div style="font-size: 25px;">手机号注册</div>
            <div style="margin-top: 30px;">
              <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #C4C4C4">
                <div style="display: flex;justify-content: flex-start;padding:10px;height: 20px;line-height: 20px;cursor: pointer;">
                  <div><b>{{PC_code}}</b></div>
                  <div style="border-right: 1px solid #C4C4C4;padding: 0 10px;"><i class="el-icon-arrow-down"></i></div>
                </div>
                <input @blur="checkTel" v-model="PC_tel" style="border: none" placeholder="输入手机号"></input>
              </div>
              <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #C4C4C4;margin-top: 30px;padding: 10px 0;">
                <input v-model="PC_SMSCode" style="border: none;padding: 0 10px;" placeholder="输入验证码"></input>
                <div @click="telForbid?'':sendTel()"  :style="{color:telForbid?'#999':'#008489'}" style="font-size: 15px;text-align: right;cursor: pointer"><b>{{PC_SMS}}</b></div>
              </div>
              <div @click="telRegist" style="background-color: #008489;border-radius: 20px;padding: 10px 0;width:350px;color:#fff;text-align: center;margin-top: 50px;cursor: pointer">
                确认
              </div>
              <div @click="otherRegist" style="border:1px solid #000000;border-radius: 20px;padding: 10px 0;width:350px;color:#000;text-align: center;margin-top: 20px;cursor: pointer">
                其他方式
              </div>
            </div>
          </div>
          <div v-if="!isTel">
            <div style="font-size: 25px;">邮箱注册</div>
            <div style="margin-top: 30px;">
              <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #C4C4C4;padding: 10px;">
                <div ><b>账号</b></div>
                <input v-model="PC_email" style="border: none;margin-left:20px;"  placeholder="输入邮箱账号"></input>
              </div>
              <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #C4C4C4;margin-top: 20px;padding: 10px 0;">
                <input v-model="PC_emailCode" style="border: none;padding: 0 10px;" placeholder="输入验证码"></input>
                <div @click="emailForbid?'':sendEmail()" :style="{color:emailForbid?'#999':'#008489'}" style="font-size: 15px;text-align: right;cursor: pointer"><b>{{PC_emailSMS}}</b></div>
              </div>
              <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #C4C4C4;padding: 10px;margin-top: 20px;">
                <div ><b>密码</b></div>
                <input v-model="PC_emailWord" type="password" style="border: none;margin-left:20px;" placeholder="输入密码"></input>
              </div>
              <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #C4C4C4;padding: 10px;margin-top: 20px;">
                <div ><b>重复密码</b></div>
                <input v-model="PC_emailReWord" type="password" style="border: none;margin-left:20px;" placeholder="重复输入密码"></input>
              </div>
              <div @click="emailRegist" style="background-color: #008489;border-radius: 20px;padding: 10px 0;width:350px;color:#fff;text-align: center;margin-top: 50px;cursor: pointer">
                确认
              </div>
              <div @click="otherRegist" style="border:1px solid #000000;border-radius: 20px;padding: 10px 0;width:350px;color:#000;text-align: center;margin-top: 20px;cursor: pointer">
                其他方式
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "share",
      data(){
          return{
            type: 'pc',
            api: this.GLOBAL.baseURL,
            isRegist:false,
            isTel:true,
            countryNumber:[
              {value:1,label:'+86(中国)'}
            ],
            PC_code:'+86(中国)',
            PC_tel:'',
            PC_SMSCode:'',
            PC_SMS:'发送验证码',
            PC_telTime:60,
            PC_email:'',
            PC_emailCode:'',
            PC_emailSMS:'发送验证码',
            PC_emailWord:'',
            PC_emailReWord:'',
            PC_emailTime:60,
            emailForbid:false,
            telForbid:true,
            changeTime:'',
            userID:'',
            userName:''
          }
      },
      methods:{
          getToken(){
            this.$http.post(this.api + '/home/Index/token')
              .then(res=>{
                if(res.data.code == 1){
                  localStorage.setItem('token',res.data.data)
                  this.getUser()
                }
              })
          },
          getUser(){
            this.$http.post(this.api + '/home/User/get_otheruser',{
              token: localStorage.getItem('token'),
              user_id: this.userID
            })
              .then(res=>{
                if(res.data.code == 1){
                  let data = res.data.data
                  this.userName = data.family_name + data.middle_name + data.name?data.family_name + data.middle_name + data.name:'匿名用户'
                }else if(res.data.code == 3){
                  this.getUser()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
        toLogin(){
          var baseurl = 'https://www.allptp.cn'
          window.open(this.api + "/QqLogin"+'?baseurl='+encodeURIComponent(baseurl)+'&token='+ localStorage.getItem('token')+'&userId='+this.top_id,'_self')
        },
        toWeixin(){
          var baseurl = 'https://www.allptp.cn'
          window.open( this.api + '/WechaLogin?token='+ localStorage.getItem('token')+'&baseurl='+encodeURIComponent(baseurl)+'&userId='+sessionStorage.getItem('Share'),'_self')
        },
        toHome(){
          this.$router.push('/')
        },
        tohome(){
          this.$router.push('/index')
        },
        toTelPhone(){
          this.isRegist = !this.isRegist
          this.isTel = true
        },
        toEmail(){
          this.isRegist = !this.isRegist
          this.isTel = false
        },
        otherRegist(){
          this.isRegist = false
          this.PC_telTime=60
          this.PC_emailTime = 60
          this.PC_SMS = '发送验证码'
          this.PC_emailSMS = '发送验证码'
          this.PC_tel = ''
          this.PC_SMSCode = ''
          this.PC_email = ''
          this.PC_emailCode = ''
          this.PC_emailWord = ''
          this.PC_emailReWord = ''
          clearInterval(this.changeTime)
        },
        emailRegist(){
          if(!this.PC_email){
            this.$message({
              type: 'info',
              message: '请填写邮箱'
            })
          }else if(!this.PC_emailCode){
            this.$message({
              type: 'info',
              message: '请填写邮箱验证码'
            })
          }else if(!this.PC_emailWord){
            this.$message({
              type: 'info',
              message: '请填写密码'
            })
          }else if(!this.PC_emailReWord){
            this.$message({
              type: 'info',
              message: '请重复填写密码'
            })
          }else{
            this.$http.post(this.api + '/RegisterEmail',{
              token: localStorage.getItem('token'),
              email: this.PC_email,
              sms_code: this.PC_emailCode,
              password: this.PC_emailWord,
              repassword: this.PC_emailReWord,
              top_user_id: sessionStorage.getItem('Share')
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type:'success',
                    message:'注册成功！'
                  })
                  localStorage.setItem('isLogin',true)
                  this.$router.push('/')
                  this.PC_email= ''
                  this.PC_emailCode=''
                  this.PC_emailSMS='发送验证码'
                  this.PC_emailWord=''
                  this.PC_emailReWord=''
                }else if(res.data.code == 3){
                  this.emailRegist()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        sendEmail(){
          var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
          if(!regex.test(this.PC_email)){
            this.$message({
              type: 'error',
              message: '邮箱格式错误'
            })
          }else{
            this.$http.post(this.api + '/CheckEmail',{
              token: localStorage.getItem('token'),
              email: this.PC_email
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.checkEmail()
                }else if(res.data.code == 0){
                  this.PC_email = ''
                  this.$message({
                    type: 'info',
                    message: '改邮箱已经注册'
                  })
                }
              })
          }
        },
        checkEmail(){
          this.$http.post(this.api + '/email',{
            token: localStorage.getItem('token'),
            toemail: this.PC_email,
            flag: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.emailForbid = true
                this.changeTime = setInterval(()=>{
                  this.PC_emailTime--
                  this.PC_emailSMS = '重新发送（'+this.PC_emailTime+ '）'
                  if(this.PC_emailTime <= 0){
                    this.PC_emailTime = 60
                    this.emailForbid = false
                    this.PC_emailSMS = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.login()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        telRegist(){
          if(!this.PC_tel){
            this.$message({type: 'info',message:'填写手机号'})
          }else if(!this.PC_SMSCode){
            this.$message({type: 'info',message:'填写验证码'})
          }else if(!this.PC_code){
            this.$message({type: 'info',message:'选择手机区号'})
          }else{
            this.$http.post(this.api + '/home/User/login_sms',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.PC_code),
              mobile: this.PC_tel,
              sms_code: this.PC_SMSCode,
              top_user_id: sessionStorage.getItem('Share')
            })
              .then(res=>{
                if(res.data.code == 1){
                  localStorage.setItem('isLogin',true)
                  this.$message({
                    type:'success',
                    message:'注册成功！'
                  })
                  this.$router.push('/')
                }else if(res.data.code == 3){
                  this.telRegist()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        sendTel(){
          var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if(!myreg.test(this.PC_tel)){
            this.$message({type:'info',message:'手机号格式有问题'})
          }else{
            this.$http.post(this.api + '/home/User/send_msg',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.PC_code),
              mobile: this.PC_tel,
              flag:2
            })
              .then(res=>{
                if(res.data.code== 1){
                  this.telForbid = true
                  this.changeTime = setInterval(()=>{
                    this.PC_telTime--
                    this.PC_SMS = '重新发送（'+this.PC_telTime+ '）'
                    if(this.PC_telTime <= 0){
                      this.PC_telTime = 60
                      this.telForbid = false
                      this.PC_SMS = '重新发送'
                      clearInterval(this.changeTime)
                    }
                  },1000)
                }else if(res.data.code == 3){
                  this.sendTel()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        checkTel(){
          var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if(this.PC_tel){
            if(!myreg.test(this.PC_tel)){
              this.$message({type:'info',message:'手机号格式有问题'})
            }else{
              this.$http.post(this.api + '/home/User/validate_mobile',{
                token: localStorage.getItem('token'),
                mobile: this.PC_tel,
                m_code: parseInt(this.PC_code)
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.telForbid = false
                    this.sendTel()
                  }else if(res.data.code == 0){
                    this.PC_tel = ''
                    this.$message({
                      type: 'info',
                      message: '该手机号已经注册'
                    })
                  }
                })
            }
          }

        }

      },
      mounted(){
        this.getToken()
      },
      created(){
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(flag){
          this.type = 'wap'
        }else{
          this.type = 'pc'
        }
        if(this.$route.query.userId){
          this.userID = this.$route.query.userId
          sessionStorage.setItem('Share',this.$route.query.userId)
        }
      },
    }
</script>

<style scoped>

</style>
