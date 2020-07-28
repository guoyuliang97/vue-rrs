<template>
	<div>
		<div class="head" :style="{ backgroundColor:type=='help'||type=='helphome'?'#14C5CA':type=='home'||type=='activeStep'? 'none':'white',color:type=='help'||type=='helphome'||type=='home'||type=='activeStep'?'white':'black',borderBottom:type=='helphome'?'none':'border-bottom: 1px solid #eeeeee;',}">
			<div class="head_logo" >
				<div v-if="type!='home'&&type!='help'&&type!='activeStep'" @click="toHome" style="width:42px;"><img src="../../static/img/static/logo1.png" width="100%"></div>
				<div v-if="type=='home'||type=='activeStep'||type=='help'" @click="toHome" style="width:42px;"><img src="../../static/img/static/logo.png" width="100%"></div>
				<div v-if="type == 'moreActive'||type == 'experienceCentre'||type=='fenleiPage'||type=='classification'||type=='edit'||type=='help'||type=='home'" style="margin-left: 20px;">
					<el-input :style="{width:inputWidth+'px',transition:'all .2s linear'}"  :placeholder="content"  @keyup.enter.native="search" v-model="aeditSearch" >
						<el-button @click="search" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>
			<div  v-if="type=='myWant'||type == 'fenleiPage'||type == 'classification'||type == 'refundDescirbe'||type=='invitVolunter'||type=='translation'||type=='myPlay'||type=='transaction'||type=='experienceCentre'||type=='activeStep'||type=='moreActive'||type=='publishList'||type=='storyList'||type=='Disputes'||type=='story'||type=='message'||type=='storyPublish'||type=='privacyS'||type=='jouerney'||type=='wish'||type=='storyPage'||type=='publishPage'||type=='home'||type=='edit'||type=='help'||type=='helphome'||type=='about'||type=='activities'||type=='hospitality'||type=='whyVolunteer' || type=='siteMap'||type=='volunteerList'">
				<div style="width: 45px;float: right;">
					<div class="head_user" v-if="isLogin" @click="isLoginMess=!isLoginMess">
            <LoadingImg type="user" :src="userImg"  style="width:100%;height:100%"></LoadingImg></div>
					<div v-if="isLoginMess" style="width: 280px;margin-top: 20px;padding: 0;margin-left:-206px;background-color:#fff;border:1px solid #eee" >
						<ul class="head_drop">
							<li @click="toEdit">{{allText[0].login[0][getLan]}}</li>
							<li @click="toTravelfunds" >
								<p>{{allText[0].login[1][getLan]}}</p>
							</li>
              <li @click="toTransaction">{{allText[0].login[2][getLan]}}</li>
							<li @click="toAccount">{{allText[0].login[3][getLan]}}</li>
							<li @click="exitAccount">{{allText[0].login[4][getLan]}}</li>
						</ul>
					</div>

				</div>
				<ul class="head_nav" v-if="type!='help'&&type!='helphome'">
					<li class="fontweight headList" @click="toExperience" :style="{borderBottom: type == 'publishList'?'2px solid #14C5CA':''}">{{allText[0].title[0][getLan]}}</li>
					<li class="fontweight headList" @click="toVolunteers" :style="{borderBottom: type == 'volunteerList'?'2px solid #14C5CA':''}" >{{allText[0].title[1][getLan]}}</li>
					<li class="fontweight headList" :style="{borderBottom: type == 'story'?'2px solid #14C5CA':''}" >
            <el-popover placement="bottom" width="100" trigger="click">
              <div @click="toStory" style="width:150px;text-align:center;cursor: pointer"><i class="el-icon-view">{{allText[0].click[0][getLan]}}</i></div>
              <div @click="toStoryPublish" style="width:150px;text-align:center;margin-top:10px;cursor: pointer;"><i class="el-icon-edit">{{allText[0].click[1][getLan]}}</i></div>
              <span slot="reference" >{{allText[0].title[2][getLan]}}</span>
          </el-popover></li>
          <li class="fontweight headList"  @click="toWish" v-show="isLogin" :style="{borderBottom: type == 'wish'?'2px solid #14C5CA':''}">{{allText[0].title[3][getLan]}}</li>
          <li class="fontweight headList"  @click="toJourney" v-show="isLogin" :style="{borderBottom: type == 'jouerney'?'2px solid #14C5CA':''}">{{allText[0].title[4][getLan]}}</li>
          <li class="fontweight headList"  @click="toCehua" v-show="someThing" :style="{borderBottom: type == 'myPlay'?'2px solid #14C5CA':''}">
            <el-badge is-dot :hidden="isPlayer? false:true" class="item">{{allText[0].title[5][getLan]}}</el-badge></li>
          <li class="fontweight headList"  @click="toZhiyuan" v-show="volunteer" :style="{borderBottom: type == 'myWant'?'2px solid #14C5CA':''}">{{allText[0].title[6][getLan]}}</li>
          <li class="fontweight headList"  @click="toMessage" v-show="isLogin" :style="{borderBottom: type == 'message'?'2px solid #14C5CA':''}">
            <el-badge is-dot :hidden="isMesage? false:true" class="item">{{allText[0].title[7][getLan]}}</el-badge>
          </li>
					<li class="fontweight headList"  @click="showHelp" >{{allText[0].title[8][getLan]}}</li>
					<li class="fontweight headList" v-if="!isLogin" @click="toRegister">{{allText[0].title[9][getLan]}}</li>
					<li class="fontweight headList"  v-if="!isLogin" @click="toLogin">{{allText[0].title[10][getLan]}}</li>
				</ul>
				<ul class="head_nav" v-if="type=='help'&&type!='helphome'">
					<li class="fontweight headList">旅行帮助</li>
				</ul>
			</div>
			<div class="header_do" v-if="type=='experience'"><span>已是最新</span> | <span @click="quitExperience">退出</span></div>
		</div>
		<Dialog v-on:emailLogin="emailLogin" v-on:toPhone="toPhone" v-on:toEmail="toEmail"  v-on:regist="regist" @onLogin="onLogin" v-on:deldialog="deldialog" v-on:passLogin="passLogin" v-on:checkLogin="checkLogin" v-on:emailReset="emailReset" v-on:telReset="telReset" v-on:forgetPass="forgetPass" v-on:emailRegister="emailRegister" v-on:telRegister="telRegister" v-on:loginView="loginView" v-on:registerView="registerView" :model="model" :height="height" :width="width" v-show="showDialog" ></Dialog>
    <Navslider class="animated slideInRight" v-on:delslider="delslider" v-show="showSlider"></Navslider>
	</div>
</template>

<script>
  import LoadingImg from './loadingImg'
	import Dialog from "./dialog.vue";
	import Navslider from "./navslider"
  import Bus from '../assets/eventBus'
	export default {
		props:['type','content'],
		data() {
			return {
				showDialog:false,
        isLoginMess:false,
				height:'340',
				width:'400',
				model:"0",
				showSlider:false,
				isLogin:false,
				inputWidth:250,
        userImg:'',
        isMesage:false,
        someThing:false,
        volunteer:false,
        pageIndex:-1,
        aeditSearch:'',
        isPlayer:false,
        userDefult: '../../static/img/static/user.png' ,
        Lan: '',
        Cur:'',
        allText:[
          {
            title:[
              {
                'zh':'成为策划者',
                'en':'planners',
                'ja':'企画者'
              },
              {
                'zh':'志愿者',
                'en':'volunteers',
                'ja':'ボランティア'
              },
              {
                'zh':'故事',
                'en':'story',
                'ja':'ストーリー'
              },
              {
                'zh':'心愿单',
                'en':'Wish',
                'ja':'願いごとリスト'
              },
              {
                'zh':'我的旅程',
                'en':'journey',
                'ja':'私の旅'
              },
              {
                'zh':'我的策划',
                'en':'My plan',
                'ja':'私の企画'
              },
              {
                'zh':'我的志愿',
                'en':'volunteer',
                'ja':'私の願い'
              },
              {
                'zh':'消息',
                'en':'message',
                'ja':'ニュース'
              },
              {
                'zh':'帮助',
                'en':'help',
                'ja':'助けて'
              },
              {
                'zh':'注册',
                'en':'register',
                'ja':'登録'
              },
              {
                'zh':'登录',
                'en':'login',
                'ja':'アクセス'
              }
            ],
            login:[
              {
                'zh':'编辑个人资料',
                'en':'Edit profile',
                'ja':'プロファイル編集'
              },
              {
                'zh':'旅行基金',
                'en':'Travel fund',
                'ja':'旅行資金'
              },
              {
                'zh':'交易中心',
                'en':'Trading Center',
                'ja':'貿易センター'
              },
              {
                'zh':'账号设置',
                'en':'Account Settings',
                'ja':'アカウント設定'
              },
              {
                'zh':'退出',
                'en':'quit',
                'ja':'脱落'
              }
            ],
            click:[
              {
                'zh':'查看故事',
                'en':'View story',
                'ja':'ストーリーを見る'
              },
              {
                'zh':'创建故事',
                'en':'Create a story',
                'ja':'ストーリーを作成する'
              }
            ]

          }
         
        ]
      };
		},
		components:{
			Dialog,
      Navslider,
      LoadingImg
    },
    computed:{
      getLan(){
        return this.Store.getters.getValue
      },
      getCur(){
        return this.Store.M
      }
    },
    watch:{
      aeditSearch:function(){
        this.$emit('getVal',this.aeditSearch)
      }
    },
		methods:{
      search(){
        this.$emit('search')
      },
			toAccount(){
				this.$router.push('/account')
			},
			toTravelfunds(){
				this.$router.push('/travelfunds')
			},
			editFocus(){
				this.inputWidth=  270
			},
			editBlur(){
				this.inputWidth= 150
			},
			toEdit(){
				this.$router.push('/edit')
			},
			delslider(){
				this.showSlider=false
			},
			showHelp(){
				this.showSlider=true
			},
			toExperience(){
        this.pageIndex = '1'
        this.$router.push('/publishList')

			},
			toHome(){
				this.$router.push('/')
			},
			toVolunteers(){
        this.pageIndex = 1
				this.$router.push('/volunteerList')
			},
			deldialog(){
				this.showDialog=false
			},
      toPhone(){
        this.model="2";
        this.height="402"
      },
      toWish(){
        this.$router.push('/wish')
      },
      toJourney(){
        this.$router.push('/jouerney')
      },
      toTransaction(){
			  this.$router.push('/transaction')
      },
      emailLogin(){
        this.model= '8'
        this.showDialog = true
        this.height='380px'
      },
      toEmail(){
        this.model = '3'
        this.showDialog=true;
        this.height="462"
      },
			toRegister(){
				this.showDialog=true;
				this.model="1"
				this.height="300"
			},
			toLogin(){
				this.showDialog=true;
				this.model="0"
				this.height="380"
			},
			registerView(){
				this.model="1";
				this.height="340";
			},
			loginView(){
				this.model="0"
				this.height="380"
			},
			telRegister(){
				this.model="2";
				this.height="402"
			},
			emailRegister(){
				this.model="3";
				this.height="462"
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
				this.height="450"
			},
			checkLogin(){
				this.model="7";
				this.height="380"
			},
			passLogin(){
				this.model="0";
				this.height="380"
			},
			toStory(){
				this.$router.push('/story')
			},
      toStoryPublish(){
        this.$router.push('/storyList')
      },
      toMessage(){
			  this.$router.push('/message')
      },
      regist(res) {
        this.isLogin = true
        this.showDialog = false
        this.userImg = res.data.data.headimage? res.data.data.headimage.domain + res.data.data.headimage.image_url :this.userDefult
        if(res.data.data.audit_face == 2 && res.data.data.isplanner == 1){
          this.someThing = true
        }
        if(res.data.data.isvolunteer == 1 && res.data.data.audit_idcard == 1 ){
          this.volunteer = true
        }
        sessionStorage.setItem('userImg',this.userImg)
        this.$emit('reload',res)
      },
      exitAccount(){
        this.$post('/home/User/quit',{}).then(res=>{
          if(res.data.code == 1){
            sessionStorage.removeItem('isLogin')
            sessionStorage.removeItem('userImg')
            localStorage.removeItem('token')
            this.isLogin = false
            this.isLoginMess = false
            this.someThing = false
            this.volunteer = false
            this.getToken()
            this.$router.push('/')
          }else if(res.data.code == 3){
            this.exitAccount()
          }
        })


      },
      onLogin(res){
        this.getToken()
        this.showDialog = false
        this.$router.push('/')
      },
      quitExperience(){
			  this.$router.push('/publishList')
      },
      getMesage(){
        this.$post('/home/Sysmsg/noread',{}).then(res=>{
          if(res.data.code == 1){
              let data = res.data.data
              if(data.chat_count === 0&&data.notice_count === 0&&data.sys_count === 0&& data.praise_count === 0 && data.comment_count === 0){
                this.isMesage = false
              }else{
                this.isMesage = true
              }
            }else if(res.data.code == 3){
              this.getMesage()
            }
        })
      },
      toCehua(){
			  this.$router.push('/myPlay')
      },
      toZhiyuan(){
			  this.$router.push('/myWant')
      },
      getToken(){ 
        var token = localStorage.getItem('token')
        var isLogin = sessionStorage.getItem('isLogin')
        var userImg = sessionStorage.getItem('userImg')
        if(token){
          this.isLogin = isLogin? true:false
          this.userImg = isLogin? userImg: ''
          this.$post('/home/User/get_user',{}).then(res=>{
            if(res.data.code == 1){
              this.isLogin = true
              let img = res.data.data[0].headimage? res.data.data[0].headimage.domain + res.data.data[0].headimage.image_url:this.userDefult
              if(!userImg){
                this.userImg = img
              }
              if(res.data.data[0].isplanner == 1 && res.data.data[0].audit_face == 2 ){
                this.someThing = true
              }
              if(res.data.data[0].isvolunteer == 1 && res.data.data[0].audit_idcard == 1){
                this.volunteer = true
              }
              this.getMesage()
              sessionStorage.setItem('userImg',img)
              sessionStorage.setItem('isLogin',true)
            }else if(res.data.cdoe == 3){
              this.getToken()
            }
            this.$emit('reload',res)
            this.getNoReadAll()
          })
        }else{
          this.$post( '/home/Index/token',{}).then(res=>{
            localStorage.setItem('token',res.data.data)
             this.$emit('reload')
             this.getNoReadAll()
          })
        }
      },
      getLang(){
        var type = navigator.appName;
        if (type == "Netscape"){
          var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
        }else{
          var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
        }
        var lang = lang.substr(0, 2);//获取浏览器配置语言前两位
     
      },
      getNoReadAll(){
        this.$post('/PlannerNoRead',{}).then(res=>{
          if(res.data.code == 1){
            let data = res.data.data
            if(data.complete_num != 0 || data.enroll_num != 0||data.order_num != 0 || data.refund_num != 0){
              this.isPlayer = true
            }
          }else if(res.data.code == 3){
            this.getNoReadAll()
          }
        })
      },
		},
    mounted(){
      this.getToken()
    },
    created(){
      Bus.$on('userImage',(msg)=>{
        this.userImg = msg
      })
      Bus.$on('changeContent',(msg)=>{
        this.aeditSearch = msg
      })
      Bus.$on('nore',(msg)=>{
        this.isMesage = msg
      })
    }
  }
</script>

<style>
.item{
  line-height:20px
}
	.head{
		min-width: 1080px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
    font-size:14px;

		z-index: 997;
		height: 52px;
		padding: 15px 20px;
		display: flex;

		justify-content: space-between;
	}
	.head_logo{
		font-size: 20px;
		font-weight: bold;
		line-height: 52px;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
	}
	.head_user{
		width: 42px;
		height: 42px;
		border-radius: 50%;
		margin-top: 5px;
		cursor: pointer;
	}
	.head_nav{
		float: right;
		margin-right: 20px;
		height: 100%;
	}
	.head_nav li{
		height: 100%;
		line-height: 52px;
		float: left;
		cursor: pointer;
	}
	.header_do{
		line-height: 52px;
	}
	.header_do span:nth-child(2){
		cursor: pointer;
		color: #14C5CA;
	}
	.head_drop{
		width: 250px;
		margin: 0 auto;
	}
	.head_drop li{
		height: 50px;
		line-height: 50px;
		text-align: left;
		border-bottom: 1px solid #DCDFE6;
		font-size: 13px;
		background-color: white;
		cursor: pointer;
		color:rgb(118, 118, 118);
		transition: all .3s linear;
	}
	.head_drop li:hover{
		border-bottom: 2px solid #14C5CA;
		color: #14C5CA;
	}
	.head_drop li:nth-child(5){
		border: none;
	}
  .headList{
    padding: 5px 10px;
    margin-right: 10px;
  }
  .headList:nth-child(9n){
     padding: 5px 10px;
    margin-right: 0
  }

</style>
