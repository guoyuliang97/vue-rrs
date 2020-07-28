<template>
	<div class="dialog">
		<div class="dialog_bg" @click="delDialog"></div>
		<div class="dialog_con animated fadeIn" :style="{width:width+'px',height:height+'px',marginTop:-height/2+'px',marginLeft:-width/2+'px'}">
			<div class="dialog_container">
				<div class="login_top">
					<p v-show="model!='4'&&model!='5'&&model!='6'" class="fontweight login_title">{{model=='0'||model=='7'||model == '8'?allText.login[0][Lan]:allText.click[3][Lan]}}</p>
					<p v-show="model=='4'||model=='5'||model=='6'" class="fontweight login_title">{{allText.login[1][Lan]}}</p>
					<p></p>
					<p class="login_del" @click="delDialog"><i class="el-icon-circle-close-outline"></i></p>
				</div>
				<!--注册-->
				<p class="login_txt" v-show="model!='0'&&model!='7'&&model!='8'">{{model=='4'||model=='5'||model=='6'?allText.login[9][Lan]:model=="1"||model=="2"||model=="3"?allText.login[8][Lan]:""}} <span class="fontweight" @click="loginView">{{allText.click[0][Lan]}}</span></p>
				<div class="register_btns" v-show="model=='1'" style="margin-top: 30px;" @click="telRegister">{{allText.login[6][Lan]}}</div>
				<div class="register_btns" v-show="model=='1'" @click="toEmail" style="background-color: #008489;">{{allText.login[7][Lan]}}</div>
				<!--手机号注册-->
				<form class="tel_register" v-show="model=='2'" :model="tel_register">
          <div style="display:flex;justify-content: flex-start">
            <el-select style="margin-top:15px;width:140px"  v-model="tel_register.m_code" placeholder="请选择"  >
              <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
            <input class="login_input" style="margin-left:10px"  :placeholder="allText.login[2][Lan]" v-model="tel_register.mobile"></input>
          </div>
					<div class="tel_check">
						<p><input type="text" :placeholder="allText.login[5][Lan]" v-model="tel_register.sms_code" /></p>
						<el-button type="primary" style="margin-left:10px;font-size:12px;" :disabled="tel_register.fobid == 1? true:false" @click="sendSms">{{tel_register.sms}}</el-button>
					</div>
          <div style="display: flex;justify-content: space-between">
            <input class="login_input" :placeholder="allText.login[3][Lan]" type="password" v-model="tel_register.password"></input>
            <input style="margin-left:10px" class="login_input" type="password"  :placeholder="allText.login[4][Lan]" @keydown="listenSend" v-model="tel_register.repassword"></input>
          </div>
      <el-select  @change="v = true" style="width:321.6px;margin-top: 15px;" v-model="tel_register.flag" clearable placeholder="请选择类型">
        <el-option   v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
					<el-button  type="primary" style="width:100%;margin-top:20px;" @click="telSend">{{allText.click[3][Lan]}}</el-button>
				</form>
				<!--忘记密码首页-->
				<div class="register_btns" style="margin-top: 30px;" v-show="model=='4'" @click="telReset">{{allText.click[7][Lan]}}</div>
				<div class="register_btns" style="background-color: #008489;" v-show="model=='4'" @click="emailReset">{{allText.click[8][Lan]}}</div>
				<!--手机号重置-->
				<form v-show="model=='5'" :model="resetPhone" >
          <div style="display: flex;justify-content: flex-start" >
            <el-select style="margin-top:30px;margin-right:10px;"  v-model="resetPhone.m_code" placeholder="选择区号"  >
              <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
            <input class="login_input" style="margin-top:30px;"  :placeholder="allText.login[2][Lan]" v-model="resetPhone.lmobile"></input>
          </div>
					<div class="tel_check">
						<p><input type="text" :placeholder="allText.login[5][Lan]" v-model="resetPhone.sms_code" /></p>
						<el-button type="primary" style="margin-left:10px;" @click="resetSendSmS" :disabled="resetPhone.fobid == 1? true:false">{{resetPhone.sms}}</el-button>
					</div>
					<input class="login_input" type="password" v-model="resetPhone.password" :placeholder="allText.login[3][Lan]"></input>
					<div class="register_btns" style="background-color: #008489;" @click="resetPhone_login">{{allText.click[0][Lan]}}</div>
					<div class="register_btns" style="background-color: #008489;" @click="emailReset">{{allText.click[8][Lan]}}</div>
				</form>
				<!--邮箱重置-->
				<form v-show="model=='6'" :model="emailForm">
          <el-input v-model="emailForm.email" :placeholder="allText.login[10][Lan]" style="margin-top:15px;" ></el-input>
          <div style="display: flex;justify-content: space-between;margin-top:15px;" >
            <el-input v-model="emailForm.smsEmail"   :placeholder="allText.login[11][Lan]" ></el-input>
            <el-button @click="sendEmail" :disabled="emailForm.forbid?true:false" style="font-size:12px;margin-left:10px;background-color: #008489;color:#fff;width:200px">{{emailForm.sms}}</el-button>
          </div>
          <el-input style="margin-top:15px;" type="password" v-model="emailForm.emailPass" :placeholder="allText.login[3][Lan]" ></el-input>
          <el-input style="margin-top:15px;" type="password" v-model="emailForm.emailRePass" :placeholder="allText.login[4][Lan]" ></el-input>
          <div class="register_btns" @click="toEmailL" style="background-color: #008489;">{{allText.click[0][Lan]}}</div>
          <div class="register_btns" @click="telReset">{{allText.click[7][Lan]}}</div>
				</form>
				<!--邮箱注册-->
				<form class="email_register" :model="email_Login" v-show="model=='3'">
          <el-input @blur="checkEmail" @keyup.enter.native="tel_email" v-model="email_Login.email_num"  style="margin-top:30px;" :placeholder="allText.login[10][Lan]"></el-input>
          <div style="display: flex;justify-content: flex-start;margin-top:10px;">
            <el-input @keyup.enter.native="tel_email" v-model="email_Login.email_sms"  :placeholder="allText.login[11][Lan]" > </el-input> 
            <el-button type="primary" size="mini" :disabled="email_Login.fobid == 1? true:false" @click="login" style="margin-left:10px;">{{email_Login.sms}}</el-button>
          </div>
          <div style="display: flex;justify-content: flex-start">
            <el-input type="password" @keyup.enter.native="tel_email" style="margin-top:10px;" v-model="email_Login.email_password" :placeholder="allText.login[3][Lan]"></el-input>
            <el-input type="password"  @keyup.enter.native="tel_email" v-model="email_Login.email_Repassword" style="margin-left:10px;margin-top:10px;" :placeholder="allText.login[4][Lan]"></el-input>
          </div>
          <el-select  @change="v = true" style="width:321.6px;margin-top: 15px;" v-model="email_Login.flag" clearable placeholder="请选择类型">
            <el-option   v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
            <div class="register_btns" style="background-color: #008489;"> 
              <el-button type="primary" @click="tel_email" style="border:0;width:100%;" >{{allText.click[0][Lan]}}</el-button></div>
            <div class="register_btns" @click="toPhone" >{{allText.login[6][Lan]}}</div>
				</form>
				<!--登录-->
				<form class="login_con" v-show="model=='0'||model=='7'||model == '8'" :model="tel_onlogin">
          <div style="display: flex;justify-content: flex-start" v-show="model!='7'&&model !='8'">
            <el-select style="margin-top:30px;margin-right:10px;"  v-model="tel_onlogin.m_code" placeholder="选择区号"  >
              <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
            <input class="login_input" style="margin-top:30px;"  :placeholder="allText.login[2][Lan]" v-model="tel_onlogin.lmobile"></input>
          </div>
					<input class="login_input" v-show="model!='7'&&model !='8'" type="password" :placeholder="allText.login[3][Lan]" @keydown="listenLogin" v-model="tel_onlogin.password"></input>
          <div style="display: flex;justify-content: flex-start" v-show="model=='7'">
            <el-select style="margin-top:30px;margin-right:10px;"  v-model="tel_onlogin.m_code" placeholder="选择区号"  >
              <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
            <input class="login_input" style="margin-top:30px;"  :placeholder="allText.login[2][Lan]" v-model="tel_onlogin.lmobile"></input>
          </div>
					<div class="tel_check" v-show="model=='7'">
						<input type="text" :placeholder="allText.login[5][Lan]" @keydown="listenLogin" v-model="tel_onlogin.sms_code" />
						<el-button type="primary"  @click="onloginSmS" style="font-size:12px;margin-left:10px;"  :disabled="tel_onlogin.fobid == 1? true:false">{{tel_onlogin.sms}}</el-button>
					</div>
          <div style="margin-top:15px;"  v-show="model == '8'">
            <input class="login_input" type="text" @keydown="listenLogin" :placeholder="allText.login[10][Lan]" v-model="tel_onlogin.email" />
            <input class="login_input" type="password" @keydown="listenLogin" :placeholder="allText.login[3][Lan]" v-model="tel_onlogin.emailPassword" />
          </div>
            <el-button class="login_input" style="margin-top:10px;" type="primary" @click="tel_login">{{allText.click[0][Lan]}}</el-button>
					<div class="login_moredo"> 
						<!-- <div v-show="model!='7'" style="margin-top: 2px;">
							<el-checkbox v-model="checked">{{allText.click[4][Lan]}}</el-checkbox>
						</div> -->
						<p></p>
						<div v-show="model!='7'"><span @click="checkLogin">{{allText.click[1][Lan]}}</span> | <span @click="forgetPass">{{allText.click[2][Lan]}}</span> | <span @click="registerView">{{allText.click[3][Lan]}}</span></div>
						<div v-show="model=='7'&&model !='8'"><span @click="passLogin">{{allText.click[6][Lan]}}</span></div>
					</div>
				</form>
				<!--底部-->
        <div v-if="model=='0'||model == '7'||model == '8'" class="other_loginway fontweight">{{allText.click[5][Lan]}}</div>
        <div class="three_loginway" v-show="model=='0'||model == '7'||model == '8'">
					<p><img @click="toWeixin" src="../../static/img/volunteers/wechat.png"/></p>
					<a target="_blank"><img src="../../static/img/static/qq.png" width="32px" height="32px" @click="toLogin()" /></a>
					<p><img @click="toEmail_login" src="../../static/img/volunteers/email.png"/></p>
				</div>
		<!--<div class="three_loginway" v-show="model!='0'&&model!='4'&&model!='5'&&model!='6'&&model!='7'">
					<p v-show="model!='3'" @click="emailRegister"><img src="../../static/img/volunteers/email.png"/></p>
					<p><img  src="../../static/img/volunteers/wechat.png"/></p>
					<p><img src="../../static/img/static/qq.png"/></p >
					<p><img src="../../static/img/volunteers/wb.png"/></p>
				</div>-->
			</div>
		</div>
	</div>
</template>

<script>
  import '../../static/css/dialog.css'
	export default {
		props:['height','width','title','model',],
		data() {
			return {
				checked:true,
        v:false,
        c:false,
        api:this.GLOBAL.baseURL,
        smsTime:60,
        changeTime:'',
        options:[
          {value:0,label:'不选'},
          {value:1,label:'志愿者'},
          {value:2,label:'策划人'}
        ],
        tel_register:{
          mobile:'',
          m_code:'+86(中国)',
          fobid:0,
          sms_code:'',
          sms:'发送验证码',
          password:'',
          repassword:'',
          flag:'',
        },
        tel_onlogin:{
          m_code:'+86(中国)',
          lmobile:'',
          password:'',
          fobid:'',
          sms:'发送验证码',
          sms_code:'',
          email:'',
          emailPassword:''
        },
        resetPhone:{
          m_code:'+86(中国)',
          lmobile:'',
          sms_code:'',
          forbid:0,
          sms:'发送验证码',
          password:''
        },
        countryNumber:[
          {value:1,label:'+86(中国)'}
        ],
        email_Login:{
          email_num:'',
          email_sms:'',
          email_password:'',
          email_Repassword:'',
          flag:'',
          fobid:0,
          sms:'发送验证码'
        },
        emailForm:{
          email:'',
          smsEmail:'',
          emailPass:'',
          emailRePass:'',
          forbid:0,
          sms:'发送验证码',
        },
        topId:'',
        allText:{
          login:[
            {
              'zh':'登录人人耍',
              'en':'login Allptp',
              'ja':'Allptpにログイン'
            },
            {
              'zh':'重置密码',
              'en':'reset Password',
              'ja':'パスワードを再設定する'
            },
            {
              'zh':'手机号码',
              'en':'tel',
              'ja':'電話番号'
            },
            {
              'zh':'密码',
              'en':'password',
              'ja':'パスワード'
            },
            {
              'zh':'重复密码',
              'en':'Repeat password',
              'ja':'パスワードを再度入力してください'
            },
            {
              'zh':'验证码',
              'en':'SMS code',
              'ja':'SMSコード'
            },
            {
              'zh':'手机号注册',
              'en':'Phone number registration',
              'ja':'電話番号登録'
            },
            {
              'zh':'邮箱注册',
              'en':'email registration',
              'ja':'メール登録'
            },
            {
              'zh':'已有账号？',
              'en':'Have an account?',
              'ja':'アカウントを持っています？'
            },
            {
              'zh':'想起密码?',
              'en':'Remember your password?',
              'ja':'パスワードを覚えていますか？'
            },
            {
              'zh':'邮箱地址',
              'en':'email address',
              'ja':'電子メールアドレス'
            },
            {
              'zh':'邮箱验证码',
              'en':'E-mail code',
              'ja':'メール確認コード'
            }, 
             
          ],
          click:[
            {
              'zh':'登录',
              'en':'login',
              'ja':'ログインする'
            },
            {
              'zh':'验证码登录',
              'en':'SMS login',
              'ja':'SMSログイン'
            },
            {
              'zh':'忘记密码',
              'en':'forget password',
              'ja':'パスワードを忘れた'
            },
            {
              'zh':'注册',
              'en':'registered',
              'ja':'登録済み'
            },
            {
              'zh':'记住我',
              'en':'remember',
              'ja':'私を覚えてますか'
            },
            {
              'zh':'其他登录方式',
              'en':'Other login methods',
              'ja':'その他のログイン方法'
            },
             {
              'zh':'普通密码登陆',
              'en':'Ordinary password login',
              'ja':'通常のパスワードによるログイン'
            },
            {
              'zh':'手机号重置密码',
              'en':'Phone number reset password',
              'ja':'電話番号リセットパスワード'
            },
            {
              'zh':'邮箱重置密码',
              'en':'Email reset password',
              'ja':'パスワードリセットメール'
            }
          ]
        }
			}
    },
    computed:{
      Lan(){
        return this.Store.getters.getValue
      }
    },
		methods:{

		  //邮箱重置
      async sendEmail(){
        if(!this.emailForm.email){
          this.$message({
            type: 'info',
            message: '你还没有输入邮箱！'
          })
        }else{
          var isTrue =  await this.checkEmailA()
          if(isTrue){
            this.$post('/email',{
              flag: 2,
              toemail: this.emailForm.email
            }).then(res=>{
              if(res.data.code == 1){
                this.emailForm.forbid = 1
                  this.smsTime--
                  this.emailForm.sms = '重新发送（'+this.smsTime+ '）'
                  this.changeTime = setInterval(()=>{
                    this.smsTime--
                    this.emailForm.sms = '重新发送（'+this.smsTime+ '）'
                    if(this.smsTime <= 0){
                      this.smsTime = 60
                      this.emailForm.forbid = 0
                      this.emailForm.sms = '重新发送'
                      clearInterval(this.changeTime)
                    }
                  },1000)
              }else if(res.data.code == 3){
                this.sendEmail()
              }
            })
          }
        }
      },
      checkEmail(){
        if(this.email_Login.email_num.length){
          var reg =  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if(reg.test(this.email_Login.email_num)){
            this.reEmail()
          }else{
            this.$message({
              type: 'error',
              message: '请输入正确的邮箱!'
            })
            this.email_Login.fobid = 1
          }
        }
      },
      checkEmailA(){
        return new Promise(resolve=>{
            if(this.emailForm.email){
            this.$post('/CheckEmail',{
              email: this.emailForm.email
            }).then(res=>{
              if(res.data.code == 1){
                this.emailForm.email = ''
                this.$message({
                  type: 'error',
                  message: '该邮箱没有注册！'
                })
                resolve(false) 
              }else if(res.data.code == 0){
                resolve(true) 
              }
            })
          }
        })
      },
      reEmail(){
        this.$http.post(this.api + '/CheckEmail',{
          token: localStorage.getItem('token'),
          email: this.email_Login.email_num,
        })
          .then(res=>{
            if(res.data.code == 0){
              this.$message({
                type: 'info',
                message:'您的邮箱已经注册!'
              })
              this.email_Login.fobid = 1
            }else if(res.data.code == 1){
              this.email_Login.fobid = 0
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.reEmail()
                })
            }
          })
      },
      toWeixin(){
        var baseurl = location.href
       window.open( this.api + '/WechaLogin?token='+ localStorage.getItem('token')+'&baseurl='+encodeURIComponent(baseurl)+'&userId='+this.top_id,'_self')
      },
      toLogin(){
        var baseurl = location.href
        window.open(this.api + "/QqLogin"+'?baseurl='+encodeURIComponent(baseurl)+'&token='+ localStorage.getItem('token')+'&userId='+this.top_id,'_self')
      },
      changeDialog(){
        this.tel_register = {
          m_code:'+86(中国)',
          fobid:0,
          sms:'发送验证码',
        }
        this.tel_onlogin={
          m_code:'+86(中国)',
          fobid:'',
          sms:'发送验证码',
          email:'',
          emailPassword:''
        }
        this.resetPhone = {
          m_code:'+86(中国)',
          forbid:0,
          sms:'发送验证码',
          password:''
        }
        this.emailForm = {
          forbid:0,
          sms:'发送验证码',
        }
        this.smsTime = 60
        clearInterval(this.changeTime)
      },
			delDialog(){
        this.changeDialog()
				this.$emit('deldialog')
			},
      toPhone(){
        this.$emit('toPhone')
      },
			registerView(){
        this.changeDialog()
				this.$emit('registerView')
			},
			loginView(){
        this.changeDialog()
				this.$emit('loginView')
			},
			telRegister(){
        this.changeDialog()
				this.$emit('telRegister')
			},
			emailRegister(){
        this.changeDialog()
				this.$emit('emailRegister')
			},
			forgetPass(){
        this.changeDialog()
				this.$emit('forgetPass')
			},
			telReset(){
        this.changeDialog()
				this.$emit('telReset')
			},
			emailReset(){
        this.changeDialog()
				this.$emit('emailReset')
			},
			checkLogin(){
        this.changeDialog()
				this.$emit('checkLogin')
			},
			passLogin(){
        this.changeDialog()
				this.$emit('passLogin')
			},
      toEmail_login(){
        this.changeDialog()
        this.$emit('emailLogin')
      },
      goAuth(b){
        if(b == 1){
          this.$router.push({
            path: '/Validation',
            query:{
              information: 'volunteer'
            }
          })
        }else if(b == 2){
          this.$router.push( '/authentication')
        }
      },
      login(){
        if(!this.email_Login.email_num){
          this.$message({type:'info',message:'请填写邮箱'})
        }else{
          this.$post('/email',{
            toemail: this.email_Login.email_num,
            flag: 1
          }).then(res=>{
            if(res.data.code == 1){
              this.email_Login.fobid = 1
              this.smsTime--
              this.email_Login.sms = '重新发送（'+this.smsTime+ '）'
              this.changeTime = setInterval(()=>{
                this.smsTime--
                this.email_Login.sms = '重新发送（'+this.smsTime+ '）'
                if(this.smsTime <= 0){
                  this.smsTime = 60
                  this.email_Login.fobid = 0
                  this.email_Login.sms = '重新发送'
                  clearInterval(this.changeTime)
                }
              },1000)
            }else if(res.data.code == 3){
              this.login()
            }else if(res.data.code == 0){
              this.$message({type:'info',message:res.data.msg})
            }
          })
        }
      },
      tel_email(){
        if(!this.email_Login.email_num){
          this.$message({type:'info',message:'请填写邮箱地址'})
        }else if(!this.email_Login.email_sms){
          this.$message({type:'info',message:'请填写邮箱验证码'})
        }else if(!this.email_Login.email_password){
          this.$message({type:'info',message:'请填写密码'})
        }else if(!this.email_Login.email_Repassword){
          this.$message({type:'info',message:'请重复填写邮箱地址'})
        }else {
          this.$post('/RegisterEmail',{
            email: this.email_Login.email_num,
            sms_code: this.email_Login.email_sms,
            password: this.email_Login.email_password,
            repassword: this.email_Login.email_Repassword,
            flag: this.email_Login.flag,
            top_user_id: this.topId,
          }).then(res=>{
            if(res.data.code == 1){
              this.delDialog()
              this.$emit('regist',res)
              this.goAuth(this.email_Login.flag)
            }else if(res.data.code == 3){
              this.tel_email()
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
        }
      },
      listenLogin(){
			    if(event.keyCode === 13){
			      this.tel_login()
          }
      },
      listenSend(){
			  if(event.keyCode === 13){
			    this.telSend()
        }
      },
      toEmail(){
        this.$emit('toEmail')
      },
      verifyPhone(){
        return new Promise(resolve=>{
          this.$post('/home/User/validate_mobile',{
            m_code: parseInt(this.tel_register.m_code),
            mobile:this.tel_register.mobile
          }).then(res=>{
              if(res.data.code == 1){
                resolve(false)
              }else if(res.data.code == 3){
                this.verifyPhone()
              }else{
                resolve(true)
              }
          })
        })
      },
      telSend() {
        if(!this.tel_register.mobile){
          this.$message({type:'info',message:'请填写手机号'})
        }else if(!this.tel_register.sms_code){
          this.$message({type:'info',message:'请填写验证码'})
        }else if(!this.tel_register.password){
          this.$message({type:'info',message:'请填写登陆密码'})
        }else if(!this.tel_register.repassword){
          this.$message({type:'info',message:'请重复填写密码'})
        }else{
          this.$post('/home/User/register',{
            mobile: this.tel_register.mobile,
            m_code: parseInt(this.tel_register.m_code),
            sms_code: this.tel_register.sms_code,
            password: this.tel_register.password,
            repassword: this.tel_register.repassword,
            flag: this.tel_register.flag,
            top_user_id:this.topId
          }).then(res=>{
            if (res.data.code == 1){
                this.delDialog()
                this.goAuth(this.tel_register.flag)
                this.$emit('regist',res)
              }else if(res.data.code == 3){
                this.telSend()
              }else if(res.data.code == 0){
                this.$message({type:'error',message:res.data.msg})
            }
          })
        }
      },
      tel_login(){
			    if(this.model == '0'){
              if(!this.tel_onlogin.lmobile){
                this.$message({type:'info',message:'请填写手机号!'})
              }else if(!this.tel_onlogin.password){
                this.$message({type:'info',message:'请填写密码!'})
              }else if(!this.tel_onlogin.m_code){
                this.$message({type:'info',message:'请选择区号!'})
              }else{
                this.$post('/home/User/login_psw',{
                  m_code: parseInt(this.tel_onlogin.m_code),
                  mobile: this.tel_onlogin.lmobile,
                  password: this.tel_onlogin.password 
                }).then(res=>{
                  if(res.data.code == 1){
                    this.delDialog()
                    this.$emit('onLogin',res)
                  }else if(res.data.code == 3){
                      this.tel_login()
                  }else if(res.data.code == 0){
                    this.$message({type:'error',message:res.data.msg})
                  }
                })
              }
          }else if(this.model == '8'){
            if(!this.tel_onlogin.email){
              this.$message({type:'info',message:'请填写邮箱地址!'})
            }else if(!this.tel_onlogin.emailPassword){
              this.$message({type:'info',message:'请填写密码!'})
            }else{
              this.$post('/EmailLogin',{
                email: this.tel_onlogin.email,
                password: this.tel_onlogin.emailPassword
              }).then(res=>{
                if(res.data.code == 1){
                  this.delDialog()
                  this.$emit('onLogin',res)
                }else if(res.data.code == 3){
                  this.tel_login()
                }else if(res.data.code == 0){
                  this.$message({type:'error',message:res.data.msg})
                }
              })
            }
          }else{
            if(!this.tel_onlogin.lmobile){
              this.$message({type:'info',message:'请填写手机号!'})
            }else if(!this.tel_onlogin.sms_code){
              this.$message({type:'info',message:'请填写手机验证码!'})
            }else if(!this.tel_onlogin.m_code){
              this.$message({type:'info',message:'请选择区号!'})
            }else{
              this.$post('/home/User/login_sms',{
                mobile: this.tel_onlogin.lmobile,
                sms_code : this.tel_onlogin.sms_code,
                m_code: parseInt(this.tel_onlogin.m_code)
              }).then(res=>{
                if(res.data.code == 1){
                    this.delDialog()
                    this.$emit('onLogin',res)
                  }else if(res.data.code == 3){
                    this.tel_login()
                  }else if(res.data.code == 0){
                    this.$message({type:'error',message:res.data.msg})
                  }
              })
            }
        }
      },
      async sendSms(){
        if(!this.tel_register.mobile){
          this.$message({type:'info',message:'请填写手机号!'})
        }else if(!this.tel_register.m_code){
          this.$message({type:'info',message:'请选择区号!'})
        }else{
          var isTrue = await this.verifyPhone()
          if(!isTrue){
            this.$message({type:'info',message:'手机号已注册'})
          }else{
            this.$post( '/home/User/send_msg',{
              m_code: parseInt(this.tel_register.m_code),
              mobile: this.tel_register.mobile,
              flag:2
            }).then(res=>{
              if(res.data.code == 1){
                this.tel_register.fobid = 1
                this.smsTime--
                this.tel_register.sms = '重新发送（'+this.smsTime+ '）'
                this.changeTime = setInterval(()=>{
                  this.smsTime--
                  this.tel_register.sms = '重新发送（'+this.smsTime+ '）'
                  if(this.smsTime <= 0){
                    this.smsTime = 60
                    this.tel_register.fobid = 0
                    this.tel_register.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.cdoe == 3){
                this.sendSms()
              }else if(res.data.code == 0){
                this.$message({type:'error',message:res.data.msg})
              }
            })
          }
          
        }
      },

      onloginSmS(){
        if(!this.tel_onlogin.lmobile){
          this.$message({type:'info',message:'请填写手机号!'})
        }else if(!this.tel_onlogin.m_code){
          this.$message({type:'info',message:'请选择区号!'})
        }else{
          this.$post('/home/User/send_msg',{
            m_code: parseInt(this.tel_onlogin.m_code),
            mobile: this.tel_onlogin.lmobile,
            flag:3
          }).then(res=>{
                if(res.data.code == 1){
                  this.tel_onlogin.fobid = 1
                  this.smsTime--
                  this.tel_onlogin.sms = '重新发送('+this.smsTime+ ')'
                  this.changeTime = setInterval(()=>{
                    this.smsTime--
                    this.tel_onlogin.sms = '重新发送('+this.smsTime+ ')'
                    if(this.smsTime <= 0){
                      this.smsTime = 60
                      this.tel_onlogin.fobid = 0
                      this.tel_onlogin.sms = '重新发送'
                      clearInterval(this.changeTime)
                    }
                  },1000)
                }else if(res.data.code == 3){
                  this.onloginSmS()
                }else if(res.data.code == 0){
                  this.$message({type:'error',message:res.data.msg})
                }
            })
        }
      },
      resetSendSmS(){
        if(!this.resetPhone.lmobile){
          this.$message({type:'info',message:'请填写手机号'})
        }else{
          this.$post('/home/User/send_msg',{
            m_code: parseInt(this.resetPhone.m_code),
            mobile: this.resetPhone.lmobile,
            flag:1
          }).then(res=>{
            if(res.data.code == 1){
              this.resetPhone.fobid = 1
              this.smsTime--
              this.resetPhone.sms = '重新发送（'+this.smsTime+ '）'
              this.changeTime = setInterval(()=>{
                this.smsTime--
                this.resetPhone.sms = '重新发送（'+this.smsTime+ '）'
                if(this.smsTime <= 0){
                  this.smsTime = 60
                  this.resetPhone.fobid = 0
                  this.resetPhone.sms = '重新发送'
                  clearInterval(this.changeTime)
                }
              },1000)
            }else if(res.data.code == 3) {
              this.resetSendSmS()
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
        }
      },
      resetPhone_login(){
        if(!this.resetPhone.lmobile){
          this.$message({type:'info',message:'请填写手机号码'})
        }else if(!this.resetPhone.password){
          this.$message({type:'info',message:'请填写密码'})
        }else if(!this.resetPhone.sms_code){
          this.$message({type:'info',message:'请填写手机验证码'})
        }else{
          this.$post('/home/User/find_pwd',{
            m_code: parseInt(this.resetPhone.m_code),
            mobile: this.resetPhone.lmobile,
            sms_code: this.resetPhone.sms_code,
            password: this.resetPhone.password,
          }).then(res=>{
             if(res.data.code == 1){
              this.delDialog()
              sessionStorage.setItem('isLogin',true)
              this.$emit('onLogin',res)
            }else if(res.data.code == 3){
              this.resetPhone_login()
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
        }
      },
      toEmailL(){
        if(!this.emailForm.email){
          this.$message({type:'info',message:'请填写邮箱地址'})
        }else if(!this.emailForm.smsEmail){
          this.$message({type:'info',message:'请填写邮箱验证码'})
        }else if(!this.emailForm.emailPass){
          this.$message({type:'info',message:'请填写邮箱密码'})
        }else if(!this.emailForm.emailRePass){
          this.$message({type:'info',message:'请重复填写邮箱密码'})
        }else{
          this.$post('/FindEmailPwd',{
            email: this.emailForm.email,
            sms_code: this.emailForm.smsEmail,
            password: this.emailForm.emailPass,
            re_password: this.emailForm.emailRePass
          }).then(res=>{
            if(res.data.code == 1){
              this.delDialog()
              this.$emit('onLogin',res)
            }else if(res.data.code == 3){
              this.toEmailL()
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
        }
      }
		},
    mounted(){
      var str=location.href; //取得整个地址栏
      var num=str.indexOf("?")
      str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
      var arr=str.split("&"); //各个参数放到数组里
      for(var i=0;i < arr.length;i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          var name = arr[i].substring(0, num);
          if (name == 'userId') {
            var value = arr[i].substr(num + 1);
            var c = value.indexOf('#')
            value = value.substring(0, c)
            this.topId = value
          }else if(sessionStorage.getItem('Share')){
            this.topId = sessionStorage.getItem('Share')
          }
        }
      }
    },
    destroyed() {
      this.smsTime = 60
		  clearInterval(this.changeTime)
    }
  }
</script>

<style>
</style>
