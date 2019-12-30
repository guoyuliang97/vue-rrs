<template>
	<div class="mandatory">
		<div class="edit_datacon" style="border-top: 1px solid #dcdcdc;border-top-left-radius: 5px;border-top-right-radius: 5px;">
			<div class="editcheck_con" v-if="audit_face != 1 && audit_face != 2 ">
				<div style="line-height: 22px;margin-top: 20px;"><p style="margin-top: 20px;cursor: pointer;color:#008489 ;">您可以上传您的护照</p> <p style="margin-top: 20px;cursor: pointer;color:#008489 ;">您可以上传您的身份证</p><span style="cursor: pointer;color: #008489;">了解更多</span></div>
				<div style="margin-top: 20px;">
					 <el-button v-if="	audit_face != 1 && audit_face != 2" type="danger" style="width:300px;" @click="toCheck(1)">策划人验证</el-button>
					 <el-button v-if="audit_idcard != 1" type="danger" style="width:300px;" @click="toCheck(2)">用户验证</el-button>
				</div>
			</div>
      <div v-if="audit_face == 2" style="margin-top:20px;color:#008489">
        <p>您的身份信息已被验证</p>
      </div>
      <div v-if="audit_face == 1" style="margin-top:20px;color:#008489">
        <p>您的身份信息已提交!</p>
      </div>
		</div>

		<div class="data_title" style="margin-top: 25px;">
			<div class="edit_width">社交平台账号</div>
		</div>
		<div class="edit_datacon">
			<div class="editcheck_con">
				<p class="email_title fontweight">电子邮件地址</p>
				<p class="email_txt">请点击我们刚刚发送到229763015@qq.com的链接，验证您的电子邮件地址</p>
				<p class="email_txt">找不到我们发送的消息？请检查您的垃圾邮件文件夹或<span>重新发送确认邮件</span>。</p>
				<p class="email_title fontweight">手机号</p>
				<p class="email_txt">使用经过验证的手机号可以令沟通变得更容易。我们将通过短信给您发送代码，或透过电话通话向您告知该代码。输入代码以确认您的身份。</p>
				<p class="email_txt">只有在您的预订确认后，我们才会把您的电话号码与另一位人人游用户分享。</p>
				<p class="email_txt" v-if="tel==''">未输入手机号</p>
				<p class="email_txt" v-if="tel==''" style="color: #008489;cursor: pointer;" @click="isChecktel=true"><i class="el-icon-plus"></i> 添加手机号</p>
				<p class="email_title fontweight">Facebook</p>
				<p class="email_txt">通过Facebook登录，建立您与世界各地的房东和房客之间的信任关系。</p>
				<div style="margin-top: 20px;">
					<el-button type="primary" style="width: 200px" plain>关联</el-button>
				</div>
				<p class="email_title fontweight">谷歌</p>
				<p class="email_txt">将您的人人游账号和谷歌账号关联，让一切变得简单轻松。</p>
				<div style="margin-top: 20px;">
					<el-button type="primary" style="width: 200px" plain>关联</el-button>
				</div>
				<p class="email_title fontweight">微博</p>
				<p class="email_txt">把您的人人游账号与微博账号关联起来，轻松完成线上验证。</p>
				<div style="margin-top: 20px;">
					<el-button type="primary" style="width: 200px" plain>关联</el-button>
				</div>
			</div>
		</div>
		<div class="editcheck_telbg" v-show="isChecktel" @click="isChecktel=false"></div>
		<div class="editcheck_telcon animated flipInY" v-show="isChecktel">
			<div class="title_flex" style="width:360px;margin:0 auto;margin-top: 20px;">
				<p class="fontweight">添加手机号</p>
				<p><i class="el-icon-close" style="cursor: pointer;" @click="isChecktel=false"></i></p>
			</div>
			<el-form :model="telForm" label-width="110px" label-position="left" style="width: 360px;margin: 0 auto;margin-top: 25px;">
				<el-form-item label="选择国家/地区:">
					<el-select v-model="telForm.country" placeholder="请选择" style="width: 100%;">
					<el-option
					v-for="item in countryArr"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号:">
					<el-input v-model="telForm.tel" placeholder="手机号"></el-input>
				</el-form-item>
				<div class="title_flex" style="margin-top: 20px;">
					<div style="width: 48%;">
						<el-button type="danger" style="width: 100%;">通过短信验证</el-button>
					</div>
					<div style="width: 48%;">
						<el-button type="danger" style="width: 100%;">通过电话验证</el-button>
					</div>
				</div>
				<p style="text-align: right;margin-top: 20px;"><span style="color: #008489;cursor: pointer;">为什么需要验证？</span></p>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
				tel:"",
				isChecktel:false,
				isCheck:false,
				telForm:{
					country:'1',
					tel:""
				},
				countryArr:[
					{value:'1',label:'中国'},
					{value:'2',label:'日本'},
					{value:'3',label:'美国'},
				],
        audit_idcard:'',
        audit_face:''
			};
		},
    methods:{
      toCheck(val){
        if(val == 1){
          this.$router.push('/authentication')
        }else{
          this.$router.push('/Validation')
        }

      },
      getUser(){
        this.$http.post(this.api + '/home/User/get_user',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.audit_idcard = res.data.data[0].audit_idcard
              this.audit_face =  res.data.data[0].audit_face
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getUser()
                })
            }else{

            }
          })
      }
    },
    mounted(){
		  this.getUser()
    }
	}
</script>

<style>
.editcheck_con{
	width: 740px;
	margin: 0 auto;
	text-align: left;
}
.email_title{
	margin-top: 20px;
	font-size: 18px;
}
.email_txt{
	margin-top: 20px;
}
.email_txt span{
	color: #008489;
	cursor: pointer;
}
.editcheck_telbg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.8);
	z-index: 998;
}
.editcheck_telcon{
	position: fixed;
	top: 50%;
	left: 50%;
	right: 0;
	bottom: 0;
	width: 400px;
	height: 300px;
	border-radius: 10px;
	margin-left: -200px;
	margin-top: -150px;
	background-color: white;
	z-index: 999;
	border-top: 1px solid white;
}

</style>
