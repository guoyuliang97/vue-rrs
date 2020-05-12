<template>
	<div class="experience">
		<Head type="experience"></Head>
		<div class="experience_content">
			<div class="experience_nav" style="position:relative">
				<Experiencenav :navindex="navindex" v-on:changenavf="changenavf"  :overType="overType"></Experiencenav>
        <div style="width:13%;min-width: 123px;font-size:14px;height:100px;text-align:left;border-top:1px solid #eee;color:#14c5ca;font-weight: bold;position:fixed;bottom:0;left:0;background-color:#fff">
          <div style="margin:10px 10px;padding:10px 0;">
            <p v-if="isCheck == true" style="margin:10px 0;">您还需要填写<span >{{num}}</span>项</p>
            <p v-if="isCheck == false" style="margin:10px 0;">您可以提交体验了！<i class="el-icon-check" style="color:#14c5ca;font-size:20px;font-weight: bold"></i></p>
            <div style="width:100%;height:10px;background-color:#eee">
              <div style="background-color:#14c5ca;height:10px;" :style="{'width':stepNum}">
              </div>
            </div>
          </div>
        </div>
			</div>
			<div class="experience_container" :class="navindex == 11?'newContair':''">
				<router-view v-on:changeRouter="changeRouter" @saveId="saveActive"></router-view>
			</div>
			<div class="experience_last" v-show="navindex != 11">
				<div v-show="navindex!=0&&navindex!=1&&navindex!=7&&navindex != 11&&navindex != 12 && navindex != 15">
					<div class="last_top">
						<img alt="" :src="data.cover_image?data.cover.domain+data.cover.themb_url:'../../static/img/exprerience/photo.png'" :style="{marginTop:data.cover_image?'100px':'300px'}"/>
						<div class="last_con">
							<p class="fontweight" style="font-size: 22px;color: white;margin-top: 200px;">{{data.title?data.title:'体验'}}</p>
							<div style="border-top:2px solid rgba(255,255,255,.4);margin-top: 20px;"></div>
							<p class="last_detail"><i class="el-icon-location"></i> {{data.city?data.city:'地点'}}</p>
							<p class="last_detail"><i class="el-icon-time"></i> {{time?time:'未知'}}</p>
							<p class="last_detail"><i class="el-icon-menu"></i>主要语言（{{data.main_laguage==0?'中文':data.main_laguage == 1?'English':'日语'}}）</p>
						</div>
					</div>
					<div class="about_user" >
						<div class="user_top">
							<p class="user_topleft">体验达人User</p>
							<img :src="userImg" style="width:48px;height:48px;border-radius: 50%;">
						</div>
						<div style="font-size: 12px;line-height:20px;">{{data.introduce?data.introduce:'写点您与该体验主题之间的故事吧！'}}</div>
					</div>
					<div class="exp_lastDetail" >
						<div class="last_con exp_lastTopline">
							<p class="fontweight">体验内容</p>
							<p style="margin-top: 10px;font-size: 12px;">{{data.descripte?data.descripte:'写一段概述，告诉参与者他们在这项体验当中会做些什么。'}}</p>
						</div>
						<div class="detail_whitebg" :style="{display:navindex==4?'none':'block'}"></div>
					</div>
					<div class="exp_lastDetail" >
						<div class="last_con exp_lastTopline">
							<p class="fontweight">我会提供什么</p>
							<div style="margin-top: 10px;font-size: 12px;line-height:20px;">{{data.activ_provite?data.activ_provite:'让参与者知道您这项体验都包含些什么内容。'}}</div>
						</div>
						<div class="detail_whitebg" :style="{display:navindex==6?'none':'block'}"></div>
					</div>
					<div class="exp_lastDetail" >
						<div class="last_con exp_lastTopline">
							<p class="fontweight">体验地点</p>
							<p style="margin-top: 10px;font-size: 12px;">{{data.go_place?data.go_place:'告诉参与者您的这项体验将带他们去哪里。'}}</p>
						</div>
						<div class="detail_whitebg" :style="{display:navindex==10?'none':'block'}"></div>
					</div>
					<div class="exp_lastDetail" >
						<div class="last_con exp_lastTopline">
							<p class="fontweight">注意事项</p>
							<p style="margin-top: 10px;font-size: 12px;">{{data.activ_notice?data.activ_notice:'在参与者预订前，还有什么他们需要知道的吗?'}}</p>
						</div>
						<div class="detail_whitebg" :style="{display:navindex==13?'none':'block'}"></div>
					</div>
					<div class="exp_lastDetail" >
						<div class="last_con exp_lastTopline">
							<p class="fontweight">集合地点</p>
							<p style="margin-top: 10px;font-size: 12px;">{{data.set_address?data.set_address:'我们会在您预订之后与您分享确切的集合地址。'}}</p>
						</div>
						<div class="detail_whitebg" :style="{display:navindex==10?'none':'block'}"></div>
					</div>
				</div>
        <div v-show="navindex == 12 || navindex == 15" style="width: 300px;border: 1px solid #eee;padding: 20px;margin-bottom: 50px;">
            <h3>价格计算器</h3>
            <p style="font-weight: bold;font-size: 12px;color:#008489">(小贴士:APY 代表人民币)</p>
            <div class="price">
              <div>{{navindex == 12? '住宿':'包场'}}价格</div>
              <div style="display: flex;justify-content: flex-start;align-items: center;border: 1px solid #eee;padding: 10px;">
                <div style="border-right: 1px solid #eee;width:30px;padding-right: 10px;">
                  APY
                </div>
                <div>
                  <input type="text" v-model="howprice" style="width:80px;border:none;margin-left:10px;font-size: 15px;" placeholder="输入价格">
                </div>
              </div>
            </div>
            <div class="price">
              <div>提供数量</div>
              <div style="display: flex;justify-content: flex-start;align-items: center;border: 1px solid #eee;padding: 10px;">
                <div>
                  <input type="text" v-model="prideNum" style="width:80px;border:none;margin-left:10px;font-size: 15px;" placeholder="输入数量">
                </div>
              </div>
            </div>
            <div class="price">
              <div><b>您将赚取</b></div>
              <div style="font-weight: bold">
                <span>￥</span>
                <span>{{getMoney}}</span>
              </div>
            </div>
            <p>这是扣除{{server_fee}}allptp的服务费后，您可以
              赚到的金额</p>
        </div>
			</div>
		</div>
	</div>
</template>

<script>
  import Bus from '../assets/eventBus'
	import Head from "../public/head.vue"
	import Experiencenav from "./experience/experienceNav"
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
				navindex:"",
				topData:"",
        num:15,
        stepNum:'',
        overType:'',
        isCheck:true,
        price:'',
        priceall:'',
        personNumber:'',
        data:'',
        userImg:'',
        time:'',
        server_fee:'',
        getMoney:'',
        prideNum:'',
        howprice:'',
        activeId:'',
        isLookPrice:false,
			};
		},
		components:{
			Head,
			Experiencenav
		},
		methods:{
      lookPrice(){
        this.isLookPrice = !this.isLookPrice
      },
			changenavf(msg){
        this.navindex=msg;
        localStorage.setItem('navIndex',msg)
        console.log(this.navindex)
			},
			changeRouter(msg){
          this.navindex=msg.id;
          this.$router.push({
            name: msg.router,
            query:{
              information: msg.information,
              complete: msg.complete
            }
          });
          this.overType = msg.id - 1
          this.step()
			},
      step(){
        if(this.activeId){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id:  this.activeId,
            visit:0
          })
            .then(res=>{
              if(res.data.code == 1){
                var arr = res.data.data.step.replace(/[^0-9]/ig,' ').trim().split(/\s+/)
                // this.navindex = arr[arr.length-1] 
                Bus.$emit('change',arr)
                let a = arr.length
                if(a<15){
                  this.isCheck = true
                  this.num = 15 - a
                
                  this.stepNum = Number(a/15*100).toFixed(2) + '%'
                }else{
                  this.isCheck = false
                  this.stepNum = Number(a/15*100).toFixed(2) + '%'
                }
                this.data = res.data.data
                this.time= res.data.data.total_time

              }else if(res.data.code == 3){
                this.step()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }else{
          this.stepNum = 0
        }
      },
      getConfig(){
			  this.$http.post(this.api + '/Config',{
			    token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.server_fee = res.data.data.server_fee + '%'
            }else if(res.data.code == 3){
              this.getConfig()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      saveActive(msg){
			  this.activeId = msg
      },
      padunNov(){

      }
		},
    watch:{
      price:function(){
        this.priceall = this.price * 3
      },
      howprice:function(){
        if(this.howprice && !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.howprice)){
          this.$message({
            type: 'error',
            message: '请输入正确金额'
          })
        }else if(this.prideNum && this.howprice){
          this.getMoney =parseInt(this.prideNum) * parseInt(this.howprice) - parseInt(this.prideNum) * parseInt(this.howprice)*(this.server_fee.replace("%","")/100)
        }
      },
      prideNum:function(){
        if(this.prideNum && !(/^[1-9]\d*$/).test(this.prideNum)){
          this.$message({
            type: 'error',
            message: '请输入正确数量!'
          })
        }else if(this.prideNum && this.howprice){
          this.getMoney = parseInt(this.prideNum) * parseInt(this.howprice) -parseInt(this.prideNum) * parseInt(this.howprice)* (this.server_fee.replace("%","")/100)
        }
      },
      activeId:function(){
          Bus.$emit('changeAC',this.activeId)
      }
    },
		mounted(){
		  let _this = this
      if(localStorage.getItem('userImg')){
        this.userImg = localStorage.getItem('userImg')
      }else{
        this.userImg = '../../../static/img/static/user.png'
      }
      if(localStorage.getItem('navIndex')){
        this.navindex = localStorage.getItem('navIndex')
      }
       console.log(this.navindex == 12) 
			_this.step()
      _this.getConfig()
		},
		destroyed(){
      localStorage.removeItem('complete')
      localStorage.removeItem('navIndex')
		},
    created() {
		  this.activeId = this.$route.query.information
    }
  }
</script>

<style>
@import url('../../static/css/experience.css');
.price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}
</style>
