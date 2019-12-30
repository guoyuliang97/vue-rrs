<template>
	<div class="volunteers_content">
		<div class="volunteers_left">
			<p class="volunteers_logo" @click="toHome">LOGO</p>
			<div class="pages animated fadeInLeft">
				<p class="fontweight pages_bigtitle">你好！</p>
				<p class="volunteers_txt">我们很高兴你想要开展体验</p>
				<p class="volunteers_txt">几分钟就可以创建你自己的体验页面，之后再提交给爱彼迎审核</p>
				<p class="volunteers_txt">我们很高兴你想要开展体验</p>
				<p class="volunteers_txt">几分钟就可以创建你自己的体验页面，之后再提交给爱彼迎审核</p>
				<p class="volunteers_txt">我们很高兴你想要开展体验</p>
				<p class="volunteers_txt">几分钟就可以创建你自己的体验页面，之后再提交给爱彼迎审核</p>
				<div class="volunteers_btn">
					<span @click="createNow">立即创建</span>
				</div>
			</div>
			<div class="back_btn animated fadeIn" @click="backPage">
				<span style="color: #008489;"><i class="el-icon-arrow-left" style="font-weight: bold;"></i></span> 返回
			</div>
		</div>
		<div class="volunteers_right animated fadeIn">
			<img alt="" src="../../../static/img/home/2.png" style="width: 100%;height: 100%;"/>
		</div>
		<Dialog v-show="dialogVisible" v-on:regist="regist" v-on:onLogin="onLogin" :height="height" v-on:passLogin="passLogin" v-on:checkLogin="checkLogin" v-on:emailReset="emailReset" v-on:telReset="telReset" v-on:forgetPass="forgetPass" v-on:emailRegister="emailRegister" :model="model" :width="width"  v-on:telRegister="telRegister" v-on:loginView="loginView" v-on:deldialog="deldialog" v-on:registerView="registerView"></Dialog>
	</div>
</template>

<script>
	import Dialog from "../../public/dialog.vue";
	export default {
		data() {
			return {
				dialogVisible:false,
				height:'380',
				width:'400',
				model:"0",
        tel_register:{
          phone:'',
          sms_code:'',
          password:'',
          repassword:''
        },
        tel_onlogin:{
          lmobile:'',
          password:'',
        }
			};
		},
		components:{
			Dialog
		},
		methods:{
			//model:0为登录，1为注册首页，2为手机号注册，3为邮箱注册,4为忘记密码首页,5为手机号重置密码,6为邮箱重置密码
      createNow(){
        if(localStorage.getItem('isLogin')){
          this.$router.push({
            name: 'publishList',
            params:{
              type: 'experience'
            }
          })
        }else{
          this.dialogVisible = true
        }
			},
			backPage(){
				this.$router.go(-1)
			},
			handleClose(){

			},
			deldialog(){
				this.dialogVisible=false
				this.model="0";
				this.height="370"
			},
			registerView(){
				this.model="1";
				this.height="340";
			},
			loginView(){
				this.model="0"
				this.height="370"
			},
			telRegister(){
				this.model="2";
				this.height="482"
			},
			emailRegister(){
				this.model="3";
				this.height="482"
			},
			forgetPass(){
				this.model="4";
				this.height="250"
			},
			telReset(){
				this.model="5";
				this.height="415"
			},
			emailReset(){
				this.model="6";
				this.height="300"
			},
			checkLogin(){
				this.model="7";
				this.height="370"
			},
			passLogin(){
				this.model="0";
				this.height="370"
			},
			toHome(){
				this.$router.push('/')
			},
      regist(){
        this.dialogVisible =false
      },
      onLogin(){
        this.dialogVisible =false
      }
		}
	}
</script>

<style>

</style>
