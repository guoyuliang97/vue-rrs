<template>
	<div class="security">
    <div class="data_title">
      <div class="edit_width">账户绑定</div>
    </div>
    <div class="edit_datacon">
      <div style="width: 740px;margin: 0 auto;text-align: left;">
        <el-collapse v-model="Account" @change="handleChange" >
          <el-collapse-item  title="手机号" name="1" style="margin-top: 10px;">
            <el-form style="text-align: left;" :model="phoneChick" label-position="left" label-width="80px">
              <el-form-item label="手机号:">
                <div v-if="!mobile_link" style="display: flex;justify-content: flex-start">
                  <el-select  v-model="phoneChick.m_code" placeholder="请选择"  >
                    <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <el-input style="margin-left:10px;" v-model="phoneChick.tel" placeholder="手机号" ></el-input>
                </div>
                <div v-if="mobile_link">
                  {{ mobile.substr(0,3)+'*****'+mobile.substr(8,3)}}
                </div>
              </el-form-item>
              <el-form-item label="验证码:" style="margin-top: 30px;">
                <div style="display: flex;justify-content: space-between">
                  <el-input v-model="phoneChick.sms_code" placeholder="输入验证码" type="text"></el-input>
                  <el-button @click="sendSms(1)" :disabled="!phoneChick.tel&&!mobile?true:phoneChick.forbid == 1?true:false" style="margin-left:20px;background-color: #14c5ca;color:#fff;font-size: 12px;width:200px;">{{phoneChick.sms}}</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="mobile_link" label="新手机号:" style="margin-top: 30px;">
                <div  style="display: flex;justify-content: flex-start">
                  <el-select  v-model="phoneChick.newm_code" placeholder="请选择"  >
                    <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <el-input style="margin-left:10px;" v-model="phoneChick.newTel" placeholder="手机号" ></el-input>
                </div>
              </el-form-item>
              <el-form-item v-if="mobile_link" label="验证码:" style="margin-top: 30px;">
                <div style="display: flex;justify-content: space-between">
                  <el-input v-model="phoneChick.newsms_code" placeholder="输入验证码" type="text"></el-input>
                  <el-button @click="sendSms(2)" :disabled="!phoneChick.newTel?true:phoneChick.newforbid == 1?true:false" style="margin-left:20px;background-color: #14c5ca;color:#fff;font-size: 12px;width:200px;">{{phoneChick.newsms}}</el-button>
                </div>
              </el-form-item>
              <div style="text-align: left;margin-top: 20px;">
                <el-button type="primary" @click="changePassword(1)">{{mobile_link == 1?'确定换绑':'确认绑定'}}</el-button>
              </div>
            </el-form>
          </el-collapse-item>
          <span v-if="Account.indexOf('1') == -1" style="position: absolute;margin-top:-35px;font-size: 12px;" :style="{marginLeft:mobile_link == 1?'600px':'670px'}">{{mobile_link == 1? mobile.substr(0,3)+'*****'+mobile.substr(8,3)+ ' 已绑定':'未绑定'}}</span>
          <el-collapse-item title="邮箱" name="2" style="margin-top: 10px;">
            <el-form style="text-align: left;" :model="emailChick" label-position="left" label-width="80px">
              <el-form-item  label="邮箱地址:" style="margin-top: 30px;">
                <div v-if="email_link">
                  <p>{{email.substr(0,3)+'*************'}}</p>
                </div>
                <div v-if="!email_link">
                  <el-input v-model="emailChick.emailUrl"  type="text"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="验证码:" style="margin-top: 30px;">
                <div style="display: flex;justify-content: space-between">
                  <el-input v-model="emailChick.sms_code"  type="text"></el-input>
                  <el-button @click="sendEmail"  style="margin-left:20px;background-color: #14c5ca;color:#fff;font-size: 12px;width:200px;">{{emailChick.sms}}</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="email_link" label="新邮箱:" style="margin-top: 30px;">
                <el-input v-model="emailChick.newEmail"  type="text"></el-input>
              </el-form-item>
              <el-form-item v-if="email_link" label="验证码:" style="margin-top: 30px;">
                 <div style="display: flex;justify-content: space-between">
                   <el-input v-model="emailChick.newSms_code"  type="text"></el-input>
                   <el-button  @click="newSendEmail" :disabled="!emailChick.newEmail?true:emailChick.newforbid == 1? true:false" style="margin-left:20px;background-color: #14c5ca;color:#fff;font-size: 12px;width:200px;">{{emailChick.newSms}}</el-button>
                 </div>
              </el-form-item>
              <div style="text-align: left;margin-top: 20px;">
                <el-button type="primary" @click="mekdeEmail">{{email_link == 1?'确定换绑':'确认绑定'}}</el-button>
              </div>
            </el-form>
          </el-collapse-item>
          <span v-if="Account.indexOf('2') == -1"  style="position: absolute;margin-top:-35px;font-size: 12px;" :style="{marginLeft: email_link==1?'545px':'670px' }">{{email_link == 1?email.substr(0,3)+'*****'+email.substr(7)+ '已绑定':'未绑定'}}</span>
        </el-collapse>
      </div>
    </div>
    <div style="margin-top:20px;" class="data_title">
      <div class="edit_width">密码设置</div>
    </div>
    <div class="edit_datacon">
      <div style="width: 740px;margin: 0 auto;text-align: left;">
        <el-collapse v-model="passwordR" @change="handleFirstChange" >
          <div v-if="isPassword" style="display: flex;justify-content: space-between;height:50px;line-height: 50px;border-bottom: 1px solid #ECECEC">
            <span>设置安全密码</span>
            <span style="color:#666666;font-size:12px;font-weight:bold;">已设置</span>
          </div>
          <el-collapse-item  v-if="!isPassword" title="设置安全密码" name="1" style="margin-top: 10px;">
            <el-form style="text-align: left;" :model="saveForm" label-position="left" label-width="80px">
              <el-form-item label="输入密码:" style="margin-top: 30px;">
                <el-input maxlength="6"  v-model="saveForm.newPass" placeholder="密码6位数" type="password"></el-input>
              </el-form-item>
              <el-form-item label="重复密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="saveForm.rePass" placeholder="重复密码" type="password"></el-input>
              </el-form-item>
              <div style="text-align: left;margin-top: 20px;">
                <el-button type="primary" @click="changePassword(3)">确认修改</el-button>
              </div>
            </el-form>
          </el-collapse-item>
          <span v-if="passwordR.indexOf('1') == -1 && !isPassword" style="position: absolute;margin-top:-35px;margin-left:670px;font-size: 12px;">未设置</span>
        </el-collapse>
      </div>
    </div>
		<div class="data_title" style="margin-top:21px;">
			<div class="edit_width">修改密码</div>
		</div>
		<div class="edit_datacon">
			<div style="width: 740px;margin: 0 auto;text-align: left;">
				<el-collapse v-model="activeNames" >
				  <el-collapse-item v-if="loginMobile" title="手机登陆密码修改" name="1" style="margin-top: 10px;">
					<el-form style="text-align: left;" :model="mobileForm" label-position="left" label-width="80px">
            <el-form-item label="手机号:" style="margin-top: 30px;">
              <p>{{mobile.substr(0,3)+'*****'+mobile.substr(8,3)}}</p>
            </el-form-item>
						<el-form-item label="验证码:" style="margin-top: 30px;">
              <div style="display: flex;justify-content: space-between">
                <el-input v-model="mobileForm.smsCode" placeholder="输入验证码" type="password"></el-input>
                <el-button @click="sendMobile" :disabled="mobileForm.forbid?true:false" style="background-color: #14c5ca;color:#fff;margin-left:10px;font-size: 12px;width:200px">{{mobileForm.sms}}</el-button>
              </div>
						</el-form-item>
						<el-form-item label="新密码:" style="margin-top: 30px;">
							<el-input v-model="mobileForm.password" placeholder="新密码" type="password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码:" style="margin-top: 30px;">
							<el-input v-model="mobileForm.rePassword" placeholder="确认密码" type="password"></el-input>
						</el-form-item>
						<div style="text-align: left;margin-top: 20px;">
							<el-button type="primary" @click="checkMobile">确认修改</el-button>
						</div>
					</el-form>
				  </el-collapse-item>
				  <el-collapse-item v-if="loginEmail" title="邮箱密码修改" name="3">
					  <el-form style="text-align: left;" :model="emailForm" label-position="left" label-width="80px">
						  <el-form-item label="邮箱地址:" style="margin-top: 30px;">
						   <p>{{email.substr(0,3)+'*************'}}</p>
						  </el-form-item>
              <el-form-item label="验证码:" style="margin-top: 30px;">
                <div style="display: flex;justify-content: space-between">
                  <el-input v-model="emailForm.smsCode" placeholder="邮箱验证码" ></el-input>
                  <el-button :disabled="emailForm.forbid?true:false"  @click="sendEmailFor" style="font-size:12px;margin-left:20px;background-color: #14c5ca;color:#fff;width:200px">{{emailForm.sms}}</el-button>
                </div>
              </el-form-item>
              <el-form-item label="新密码:" style="margin-top: 30px;">
                  <el-input  v-model="emailForm.password" placeholder="新密码" ></el-input>
              </el-form-item>
              <el-form-item label="重复密码:" style="margin-top: 30px;">
                <el-input v-model="emailForm.rePassword" placeholder="重复密码" ></el-input>
              </el-form-item>
						  <div style="text-align: left;margin-top: 20px;">
						  <el-button @click="checkEmail" type="primary">确认修改</el-button>
						  </div>
					  </el-form>
				  </el-collapse-item>
          <el-collapse-item title="修改安全密码" name="4">
            <el-form style="text-align: left;" :model="pass" label-position="left" label-width="80px">
              <el-form-item label="原始密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="pass.old_password" type="password" placeholder="原始密码6位数" ></el-input>
              </el-form-item>
              <el-form-item label="新密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="pass.password" type="password" placeholder="新密码6位数" ></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="pass.re_password" type="password" placeholder="确认密码6位数" ></el-input>
              </el-form-item>
              <div style="text-align: left;margin-top: 20px;">
                <el-button type="primary"  @click="check">确定</el-button>
              </div>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="找回安全密码" name="5">
            <el-form style="text-align: left;"  :model="rePassword" label-position="left" label-width="80px">
              <el-form-item label="手机号:" style="margin-top: 30px;">
                  <p>{{mobile.substr(0,3)+'*****'+mobile.substr(8,3)}}</p>
              </el-form-item>
              <el-form-item label="验证码:">
                <div  style="margin-top: 0;display: flex;justify-content: flex-start">
                  <el-input type="text" style="width: 100%;" placeholder="验证码" v-model="rePassword.checkcode"></el-input>
                  <el-button @click="returnSave" type="primary" style="margin-left:10px;font-size: 12px;width:200px" :disabled="rePassword.fobid == 0?false:true">{{rePassword.sms}}</el-button>
                </div>
              </el-form-item>
              <el-form-item label="新密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="rePassword.password" type="password" placeholder="新密码6位数" ></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" style="margin-top: 30px;">
                <el-input maxlength="6" v-model="rePassword.re_password" type="password" placeholder="确认密码6位数" ></el-input>
              </el-form-item>
              <div style="text-align: left;margin-top: 20px;">
                <el-button @click="loadMima"  type="primary">确定</el-button>
              </div>
            </el-form>
          </el-collapse-item>
				</el-collapse>
			</div>
		</div>
    <div v-if="isSecurity" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.4);z-index:999;display: flex;justify-content: center;align-items: center">
      <div style="background-color: #fff;border-radius: 10px;text-align: center;padding:20px;">
        <div v-if="mobile">
          <p style="color:#333333"><b>密码设置安全验证</b></p>
          <p style="margin-top: 10px;">已向<span> {{ mobile.substr(0,3)+'*****'+mobile.substr(8,3)}}</span>发送验证码</p>
          <div style="display: flex;justify-content: space-around;margin-top:20px;">
            <el-input placeholder="验证码" v-model="smsCode"></el-input>
            <el-button @click="takeSave" :disabled="forbid == 1? true:false" style="font-size:12px;background-color: #14c5ca;color:#fff;margin-left:10px;width:200px">{{sms}}</el-button>
          </div>
          <div style="display: flex;justify-content: space-between;margin-top:20px;">
            <el-button @click="abolishSecur">取消</el-button>
            <el-button @click="checkSave">确定</el-button>
          </div>
        </div>
        <div v-if="!mobile&&email">
          <p style="color:#333333"><b>密码设置安全验证</b></p>
          <p style="margin-top: 10px;">已向<span> {{ email.substr(0,3)+'*************'}}</span>发送验证码</p>
          <div style="display: flex;justify-content: space-around;margin-top:20px;">
            <el-input placeholder="验证码" v-model="smsCode"></el-input>
            <el-button @click="takeSave" :disabled="forbid == 1? true:false" style="font-size:12px;background-color: #14c5ca;color:#fff;margin-left:10px;width:200px">{{sms}}</el-button>
          </div>
          <div style="display: flex;justify-content: space-between;margin-top:20px;">
            <el-button @click="abolishSecur">取消</el-button>
            <el-button @click="checkSave">确定</el-button>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
				changeForm:{
					oldpass:"",
					newpass:"",
					checkpass:""
				},
				telForm:{
          m_code:'',
					tel:"",
					checkcode:"",
					newpass:"",
					checkpass:""
				},
        mobileForm:{
			    smsCode:"",
          sms:'发送验证码',
          password:'',
          rePassword:"",
          forbid:0
        },
				emailForm:{
          smsCode:'',
          sms:'发送邮箱验证码',
          password:"",
          rePassword:'',
          forbid:0,
				},
        pass:{
          old_password:'',
			    password: '',
          re_password:''
        },
        rePassword:{
			    m_code:'',
          tel:"",
          sms:'发送验证码',
          fobid:0,
          checkcode:'',
          password:'',
          re_password:''
        },
        phoneChick:{
          m_code:'',
          tel:'',
          sms_code:'',
          forbid:0,
          newTel:'',
          sms:'发送验证码',
          newm_code:'',
          newsms_code:"",
          newforbid:'',
          newsms:'发送验证码'
        },
        emailChick:{
          emailUrl:'',
          sms_code:'',
          forbid:'',
          newEmail:'',
          newSms_code:'',
          newSms:'发送邮箱验证码',
          sms:'发送邮箱验证码'
        },
        saveForm:{
			    newPass:'',
          rePass:''
        },
				activeNames:[],
        countryNumber:[
          {value:1,label:'+86'}
        ],
        changeTime:'',
        overChange:'',
        smsTime:60,
        overTime: 60,
        passwordR:[],
        isPassword:false,
        Account:[],
        mobile_link:'',
        mobile:'',
        mobileCode:'',
        email_link:'',
        email:'',
        isSecurity:false,
        sms:'发送验证码',
        forbid:1,
        smsCode:'',
        loginMobile:'',
        loginm_code:'',
        loginEmail:'',
        type:1
			};
		},
		methods:{
		  //找回安全密码
      returnSave(){
        if(!this.mobile){
          this.$message({
            type: 'info',
            message: '请绑定手机号'
          })
        }else{
          this.$http.post(this.api + '/home/User/send_msg',{
            token: localStorage.getItem('token'),
            m_code: parseInt(this.mobileCode),
            mobile: (this.mobile),
            flag:6
          })
            .then(res=>{
              if(res.data.code == 1){
                this.rePassword.fobid = 1
                this.changeTime = setInterval(()=>{
                  this.smsTime--
                  this.rePassword.sms = '已发送（'+this.smsTime+ '）'
                  if(this.smsTime <= 0){
                    this.smsTime = 60
                    this.rePassword.fobid = 0
                    this.rePassword.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.returnSave()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      //换绑邮箱发送验证码
      newSendEmail(){
        this.$http.post(this.api + '/email',{
          token: localStorage.getItem('token'),
          toemail: this.emailChick.newEmail,
          flag: 4
        })
          .then(res=>{
            if(res.data.code == 1){
              this.emailChick.forbid = 1
              this.changeTime = setInterval(()=>{
                this.overTime--
                this.emailChick.newSms = '已发送（'+this.overTime+ '）'
                if(this.overTime <= 0){
                  this.overTime = 60
                  this.emailChick.forbid = 0
                  this.emailChick.newSms = '重新发送'
                  clearInterval(this.changeTime)
                }
              },1000)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.newSendEmail()
                })
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      },
		  //手机登录发送验证码
      sendMobile(){
        if(!this.loginMobile){
          this.$message({
            type: 'info',
            message: '你不是手机登录的哟！'
          })
        }else{
          this.$http.post(this.api + '/home/User/send_msg',{
            token: localStorage.getItem('token'),
            m_code: this.mobileCode,
            mobile: this.mobile,
            flag: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.mobileForm.forbid = 1
                this.changeTime = setInterval(()=>{
                  this.smsTime --
                  this.mobileForm.sms = '已发送('+this.smsTime+'）'
                  if(this.smsTime == 0){
                    this.smsTime = 60
                    this.mobileForm.forbid =  0
                    this.mobileForm.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.sendMobile()
                  })
              }
            })
        }
      },
		  //手机登录修改密码
      checkMobile(){
        this.$http.post(this.api + '/FindMobilePwd',{
          token: localStorage.getItem('token'),
          m_code: this.loginm_code,
          mobile: this.loginMobile,
          sms_code: this.mobileForm.smsCode,
          password: this.mobileForm.password,
          re_password: this.mobileForm.rePassword
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              localStorage.removeItem('isLogin')
              localStorage.removeItem('userImg')
              localStorage.removeItem('token')
              this.$router.push('/')
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.checkMobile()
                })
            }
          })
      },
		  //邮箱登陆修改密码发送验证码
      sendEmailFor(){
        if(!this.loginEmail){
          this.$message({
            type: 'info',
            message: '您不是邮箱登陆!'
          })
        }else{
          this.$http.post(this.api + '/email',{
            token: localStorage.getItem('token'),
            toemail: this.email,
            flag:2
          })
            .then(res=>{
              if(res.data.code == 1){
                this.emailForm.forbid = 1
                this.changeTime = setInterval(()=>{
                  this.smsTime --
                  this.emailForm.sms = '已发送('+this.smsTime+')'
                  if( this.smsTime == 0){
                    this.smsTime = 60
                    this.emailForm.forbid = 0
                    this.emailForm.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.sendEmailFor()
                  })
              }else{

              }
            })
        }
      },
      //邮箱登陆修改密码
      checkEmail(){
        this.$http.post(this.api + '/FindLoginPwd',{
          token: localStorage.getItem('token'),
          email: this.loginEmail,
          sms_code: this.emailForm.smsCode,
          password: this.emailForm.password,
          re_password: this.emailForm.rePassword
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type:'success',
                message: '修改成功!'
              })
              localStorage.removeItem('isLogin')
              localStorage.removeItem('userImg')
              localStorage.removeItem('token')
              this.$router.push('/')
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.checkEmail()
                })
            }
          })
      },
      sendEmail(){
        this.$http.post(this.api + '/email',{
          token: localStorage.getItem('token'),
          toemail: this.email_link == 1? this.email:this.emailChick.emailUrl,
          flag: this.email_link == 1? 3:4
        })
          .then(res=>{
            if(res.data.code == 1){
              this.emailChick.forbid = 1
              this.changeTime = setInterval(()=>{
                this.smsTime--
                this.emailChick.sms = '已发送（'+this.smsTime+ '）'
                if(this.smsTime <= 0){
                  this.smsTime = 60
                  this.emailChick.forbid = 0
                  this.emailChick.sms = '重新发送'
                  clearInterval(this.changeTime)
                }
              },1000)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendEmail()
                })
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      },
      mekdeEmail(){
        if(this.email_link == 1){
          if(!this.emailChick.sms_code){
            this.$message({
              type: 'info',
              message: '请输入验证码！'
            })
          }else if(!this.emailChick.newEmail){
            this.$message({
              type: 'info',
              message: '请输入新邮箱！'
            })
          }else if(!this.emailChick.newSms_code){
            this.$message({
              type: 'info',
              message: '请输入新邮箱验证码!'
            })
          }else{
            this.$http.post(this.api + '/BindEditEmail',{
              token: localStorage.getItem('token'),
              email_original: this.email,
              sms_code_original: this.emailChick.sms_code,
              email: this.emailChick.newEmail,
              sms_code: this.emailChick.newSms_code
            })
              .then(res=>{
                if(res.data.code == 1){
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                  this.$message({
                    type: 'success',
                    message: '绑定邮箱成功！'
                  })
                  this.emailChick = {
                    newEmail:'',
                    newSms_code:'',
                    sms_code:''
                  }
                  this.Account=[]
                  this.getUser()
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.mekdeEmail()
                    })
                }else if(res.data.code == 0){
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                  alert(res.data.msg)
                }
              })
          }
        }else{
         if(!this.emailChick.emailUrl){
            this.$message({
              type: 'info',
              message: '请输入邮箱地址！'
            })
          }else  if(!this.emailChick.sms_code){
           this.$message({
             type: 'info',
             message: '请输入验证码！'
           })
         }else{
           this.$http.post(this.api + '/BindEmail',{
             token: localStorage.getItem('token'),
             email: this.emailChick.emailUrl,
             sms_code: this.emailChick.sms_code
           })
             .then(res=>{
               if(res.data.code == 1){
                 clearInterval(this.changeTime)
                 clearInterval(this.overChange)
                 this.smsTime = '60'
                 this.overTime = '60'
                 this.$message({
                   type: 'success',
                   message: '绑定邮箱成功！'
                 })
                 this.Account=[]
                 this.getUser()
               }else if(res.data.code == 3){
                 this.$http.post(this.api + '/home/index/token')
                   .then(res=>{
                     localStorage.setItem('token',res.data.data)
                     this.mekdeEmail()
                   })
               }else if(res.data.code == 0){
                 clearInterval(this.changeTime)
                 clearInterval(this.overChange)
                 this.smsTime = '60'
                 this.overTime = '60'
                 this.$alert(res.data.msg)
               }
             })
         }
        }
      },
      //设置安全验证验证码
      takeSave(){
        if(this.mobile){
          this.$http.post(this.api + '/home/User/send_msg',{
            token: localStorage.getItem('token'),
            m_code: parseInt(this.mobileCode),
            mobile: this.mobile,
            flag: 6
          })
            .then(res=>{
              if(res.data.code == 1){
                this.forbid = 1
                this.changeTime = setInterval(()=>{
                  this.smsTime--
                  this.sms = '已发送（'+this.smsTime+ '）'
                  if(this.smsTime <= 0){
                    this.smsTime = 60
                    this.forbid = 0
                    this.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.takeSave()
                  })
              }
            })
        }else{
          this.$http.post(this.api + '/email',{
            token: localStorage.getItem('token'),
            toemail: this.email,
            flag: 5,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.forbid = 1
                this.changeTime = setInterval(()=>{
                  this.smsTime--
                  this.sms = '已发送（'+this.smsTime+ '）'
                  if(this.smsTime <= 0){
                    this.smsTime = 60
                    this.forbid = 0
                    this.sms = '重新发送'
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.takeSave()
                  })
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }
      },
      handleFirstChange(val){
        if(val.length){
          if(this.mobile_link||this.email_link){
            this.$confirm('你正在设置账户安全密码, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.isSecurity = true
                this.takeSave()
            }).catch(() => {
              this.isSecurity = false
              this.passwordR = []
            });
          }else{
            this.passwordR = []
            this.$message({
              type: 'info',
              message: '你还没有绑定手机号或者邮箱哦！'
            })
          }
        }
      },
      abolishSecur(){
        this.isSecurity = false
        this.passwordR = []
      },
      handleChange(val){

      },
      changePassword(val){
        if(val == 1){
          if(this.mobile_link){
            if(!this.phoneChick.sms_code){
              this.$message({
                type: 'info',
                message: '请输入验证码！'
              })
            }else if(!this.phoneChick.newTel){
              this.$message({
                type: 'info',
                message: '请输入新手机号码！'
              })
            }else if(!this.phoneChick.newm_code){
              this.$message({
                type: 'info',
                message: '请输入区号!'
              })
            }else if(!this.phoneChick.newsms_code){
              this.$message({
                type: 'info',
                message: '请输入新手机号的验证码!'
              })
            }else{
              this.$http.post(this.api + '/BindEditMobile',{
                token: localStorage.getItem('token'),
                m_code_original: parseInt(this.mobileCode),
                mobile_original: this.mobile,
                sms_code_original: this.phoneChick.sms_code,
                m_code:parseInt(this.phoneChick.newm_code) ,
                mobile: this.phoneChick.newTel,
                sms_code: this.phoneChick.newsms_code
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.$message({
                      type: 'success',
                      message: '换绑成功！'
                    })
                    this.phoneChick = {
                      sms_code:'',
                      newTel:'',
                      newm_code:'',
                      newsms_code:"",
                      newforbid:'',
                    }
                    clearInterval(this.changeTime)
                    clearInterval(this.overChange)
                    this.smsTime = '60'
                    this.overTime = '60'
                    this.Account=[]
                    this.getUser()
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.changePassword(val)
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                    clearInterval(this.changeTime)
                    clearInterval(this.overChange)
                    this.smsTime = '60'
                    this.overTime = '60'
                  }
                })
            }
          }else{
            this.$http.post(this.api + '/BindMobile',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.phoneChick.m_code),
              mobile: this.phoneChick.tel,
              sms_code: this.phoneChick.sms_code
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message: '绑定成功！'
                  })
                  this.phoneChick = {
                    sms_code:'',
                    newTel:'',
                    newm_code:'',
                    newsms_code:"",
                    newforbid:'',
                  }
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                  this.Account=[]
                  this.getUser()
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.changePassword(val)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                }
              })
          }
        }else if(val == 3){
          if(this.saveForm.newPass.length  != 6 || !(/^[0-9]+$/).test(this.saveForm.newPass) ){
            this.$message({type:'error',message:'请输入6位数密码'})
          }else if(this.saveForm.rePass.length != 6 || !(/^[0-9]+$/).test(this.saveForm.rePass) ){
            this.$message({type: 'error',message: '重复密码输入错误'})
          }else{
            this.$http.post(this.api + '/PaywordSet',{
              token: localStorage.getItem('token'),
              password: this.saveForm.newPass,
              re_password: this.saveForm.rePass
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.isPassword = true
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                  this.$message({
                    type:'success',
                    message:'设置成功!'
                  })
                }else if(res.data.code == 3){
                  this.changePassword(val)
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  clearInterval(this.changeTime)
                  clearInterval(this.overChange)
                  this.smsTime = '60'
                  this.overTime = '60'
                }
              })
          }
        }else{
          this.$http.post(this.api + '/home/User/edit_pwd',{
            token: localStorage.getItem('token'),
            ori_password: this.changeForm.oldpass,
            password: this.changeForm.newpass,
            re_password: this.changeForm.checkpass,
          })
            .then(res=>{
              if(res.data.code == 1){
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
                localStorage.removeItem('isLogin')
                this.$router.push('/')
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.changePassword(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
              }
            })
        }
      },
      //修改安全密码
      check(){
        if(this.pass.old_password.length  != 6 || !(/^[0-9]+$/).test(this.pass.old_password) ){
          this.$message({type:'error',message:'请输入6位数数字密码'})
        }else if(this.pass.old_password.length  != 6 || !(/^[0-9]+$/).test(this.pass.password) ){
          this.$message({type:'error',message:'请输入6位数数字密码'})
        }else if(this.pass.old_password.length != 6 || !(/^[0-9]+$/).test(this.pass.re_password)) {
          this.$message({type:'error',message:'请输入6位数数字密码'})
        }else{
          this.$http.post(this.api + '/PaywordEdit',{
            token: localStorage.getItem('token'),
            ori_password: this.pass.old_password,
            password: this.pass.password,
            re_password:this.pass.re_password
          })
            .then(res=>{
              if(res.data.code == 1){
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
                this.$message({
                  type: 'info',
                  message: '安全密码修改成功!'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.check()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
              }
            })
        }
      },
      sendSms(val){
        if(this.mobile_link){
          if(val == 1){
            this.$http.post(this.api + '/home/User/send_msg',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.mobileCode),
              mobile: (this.mobile),
              flag:4
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.phoneChick.forbid = 1
                  this.changeTime = setInterval(()=>{
                    this.smsTime--
                    this.phoneChick.sms = '已发送（'+this.smsTime+ '）'
                    if(this.smsTime == 0){
                      this.smsTime = 60
                      this.phoneChick.forbid = 0
                      this.phoneChick.sms = '重新发送'
                      clearInterval(this.changeTime)
                    }
                  },1000)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/Index/token')
                    .then(res=>{
                      if(res.data.code == 1){
                        localStorage.setItem('token',res.data.data)
                        this.onloginSmS(val)
                      }
                    })
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/User/send_msg',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.phoneChick.newm_code),
              mobile: this.phoneChick.newTel,
              flag:5
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.phoneChick.newforbid = 1
                  this.overChange = setInterval(()=>{
                    this.overTime--
                    this.phoneChick.newsms = '已发送（'+this.overTime+ '）'
                    if(this.overTime == 0){
                      this.overTime = 60
                      this.phoneChick.newforbid = 0
                      this.phoneChick.newsms = '重新发送'
                      clearInterval(this.overChange)
                    }
                  },1000)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/Index/token')
                    .then(res=>{
                      if(res.data.code == 1){
                        localStorage.setItem('token',res.data.data)
                        this.onloginSmS(val)
                      }
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        }else{
            this.$http.post(this.api + '/home/User/send_msg',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.phoneChick.m_code),
              mobile: this.phoneChick.tel,
              flag:5
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.phoneChick.forbid = 1
                  this.changeTime = setInterval(()=>{
                    this.smsTime--
                    this.phoneChick.sms = '已发送（'+this.smsTime+ '）'
                    if(this.smsTime <= 0){
                      this.smsTime = 60
                      this.phoneChick.forbid = 0
                      this.phoneChick.sms = '重新发送'
                      clearInterval(this.changeTime)
                    }
                  },1000)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/Index/token')
                    .then(res=>{
                      if(res.data.code == 1){
                        localStorage.setItem('token',res.data.data)
                        this.onloginSmS(val)
                      }
                    })
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
        }
      },
      loadMima(){
        if(this.rePassword.password.length  != 6 || !(/^[0-9]+$/).test(this.rePassword.password) ){
          this.$message({type:'error',message:'请输入6位数数字密码'})
        }else if(this.rePassword.re_password.length != 6 || !(/^[0-9]+$/).test(this.rePassword.re_password) ){
          this.$message({type:'error',message:'请输入6位数数字密码'})
        }else{
          this.$http.post(this.api + '/PaywordEditCode',{
            token: localStorage.getItem('token'),
            m_code: this.mobileCode,
            mobile: this.mobile,
            sms_code: this.rePassword.checkcode,
            password: this.rePassword.password,
            re_password: this.rePassword.re_password
          })
            .then(res=>{
              if(res.data.code == 1){
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
                this.rePassword = {
                  checkcode:'',
                  password:'',
                  re_password:'',
                  sms:'发送验证码',
                  fobid:0,
                }
                this.$message({
                  type: 'success',
                  message:'找回成功！快去旅行吧1'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.loadMima()
                  })
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
              }
            })
        }
      },
      getUser(){
        this.$http.post(this.api + '/home/User/get_user',{
          token: localStorage.getItem('token'),
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data[0]
              if(data.mobile_link){
                this.mobile_link = 1
                this.mobile = data.mobile_link
                this.mobileCode = data.m_code_link
              }else{
                this.mobile_link = 0
                this.mobileCode = ''
                this.mobile = ''
              }
              if(data.email_link){
                this.email_link = 1
                this.email = data.email_link
              }else{
                this.email_link = 0
                this.email = ''
              }
              if(data.mobile){
                this.loginMobile = data.mobile
                this.loginm_code = data.m_code
              }
              if(data.email){
                this.loginEmail = data.email
              }
              if(data.is_setpwd){
                this.isPassword = true
              }
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getUser()
                })
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      },
      //安全验证
      checkSave(){
        if(this.mobile){
          this.$http.post(this.api + '/VeriMobileCode',{
            token: localStorage.getItem('token'),
            m_code: this.mobileCode,
            mobile: this.mobile,
            sms_code: this.smsCode
          })
            .then(res=>{
              if(res.data.code == 1){
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
                this.$message({
                  type: 'success',
                  message: '验证成功！'
                })
                this.isSecurity = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.checkSave()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
              }
            })
        }else{
          this.$http.post(this.api + '/VeriEmailCode',{
            token: localStorage.getItem('token'),
            email: this.email,
            sms_code: this.smsCode
          })
            .then(res=>{
              if(res.data.code == 1){
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
                this.$message({
                  type: 'success',
                  message: '验证成功！'
                })
                this.isSecurity = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.checkSave()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                clearInterval(this.changeTime)
                clearInterval(this.overChange)
                this.smsTime = '60'
                this.overTime = '60'
              }
            })
        }
      }
		},
    mounted(){
		  this.getUser()
    },
    destroyed() {
		  localStorage.removeItem('rt')
    }
  }
</script>

<style>
.security{
	padding-bottom: 50px;
}
</style>
