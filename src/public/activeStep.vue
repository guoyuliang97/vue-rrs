<template>
    <div>
      <Head type="activeStep" v-show="home"></Head>
      <div style="width:100%;" :style="{height:videoHeight}">
        <video id="videoId" poster= '../../static/video/video.jpg' muted="true" autoplay loop  src="../../static/video/logo.mp4" style="width:100%; height:100%; object-fit: fill" ></video>
        <div v-if="playIndex == 0" style="position:relative;width:100%;text-align: center;" :style="{marginTop:'-' + parseInt(videoHeight)/2 + 'px'}">
          <p style="color:#fff;font-size:30px;margin-bottom: 50px;">舒适体验，您值得拥有！</p>
          <span style="padding:15px 30px;background-color:#fff;font-size:20px;border-radius:5px;font-weight: bold">观看视频<i style="margin-left:10px;" class="iconfont icon-bofang"></i></span>
        </div>
      </div>
      <div style="position:absolute;width:98%;margin-top:-70px;text-align: right;padding-right:2%">
        <span v-if="playIndex == 0" style="padding: 15px 30px;border:1px solid #fff;color:#fff;border-radius:5px;font-size:20px;" @click="playVideo">播放<i style="margin-left:10px;" class="iconfont icon-bofang"></i></span>
        <span v-if="playIndex == 1" style="padding: 15px 30px;border:1px solid #fff;color:#fff;border-radius:5px;font-size:20px;" @click="playVideo">暂停<i style="margin-left:10px;" class="iconfont icon-zanting"></i></span>
      </div>
      <div style="width:620px;padding:100px 0;margin: 0 auto">
        <p style="font-size:40px;">精致房源，出色房东，严选品质</p>
        <p style="margin: 30px 0;">爱彼迎Plus是一项全新计划，只有品质最上乘的房源才能入选，它们的房东注重细节，获得了房客的高度好评。</p>
        <p>每处爱彼迎Plus房源都由专人进行了实地品质核验，满足了100多项品质标准，以确保舒适的入住体验。请留意房源照片下方的PLUS标记。</p>
      </div>
      <div style="background-color: #eee;padding:100px 0;">
        <div style="width:620px;margin: 0 auto">
          <p style="font-size:40px;margin-bottom: 30px;">精致体验</p>
          <p>无论您是入住独立房间还是独享整个房源，每个爱彼迎Plus房源都独具特色，经过精心设计，并配备一整套标准的便利设施。</p>
        </div>
        <div style="width:100%;height:400px;overflow: hidden;position:relative;margin: 50px 0;">
          <div style="font-size:40px;width:30px ;height:30px;position:absolute;margin-top:185px;color:#fff;z-index: 1"><i @click="prev" class="el-icon-arrow-left"></i></div>
          <div style="position:absolute;transition: all .3s linear" :style="{left:left + 'px',width:tiyanList.length * 700 + 'px'}">
            <ul>
              <li style="width:680px;height:400px;float:left;margin:0 10px;"  v-for="(item,index) in tiyanList" :key="index">
                <LoadingImg type="2" :src="item.domain+item.image_url" style="width:680px;height:400px;"></LoadingImg>
                <p style="margin-top:-100px;z-index:999;color:#fff;font-size:25px;">{{item.title}}</p>
              </li>
            </ul>
          </div>
          <div style="right:20px;font-size:40px;width:30px;height:30px;position:absolute;margin-top:185px;color:#fff;z-index: 2"><i @click="next" class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <div style="padding: 50px 0;">
        <div style="width:1000px;margin:0 auto 80px">
          <div style="width:620px;margin: 0 auto">
            <p style="font-size:40px;">严选品质</p>
            <p style="margin: 20px 0">所有的爱彼迎Plus房源都经过现场考察，确保房源舒适、设计合理、质量始终如一。根据房客反馈的100多项房源亮点，
              我们对这些房源提出相应要求，比如，要有必备的便利设施、墙上要装饰艺术作品。</p>
          </div>

          <div v-for="(item,index) in activeList" style="margin-top:50px;display: flex;justify-content: space-between" :key="index">
            <div style="width:500px;height:380px">
              <img :src="item.imgUrl" width="100%" height="100%" >
            </div>
            <div style="width:340px;padding: 15px 80px;background-color: #eee;text-align: left;font-size:14px;">
              <h3 style="font-size:18px;">{{item.category}}</h3>
              <p style="margin:20px 0;">{{item.introduce}}</p>
              <ul style="margin-left:15px;">
                <li v-for="items in item.content" style="list-style-type: disc">
                  {{items.title}}
                </li>
              </ul>
              <p style="margin-top:20px;">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="width:100%;height:300px;background-color:#008489">
        <div style="width:900px;margin:0 auto;padding:80px 0;display: flex;justify-content: space-between;color:#fff">
          <div style="width:350px;">
            <h2 style="margin-bottom: 40px;">可靠的入住流程</h2>
            <p>选择爱彼迎Plus的房源，您可以轻松办理入住。所有房源均配有带锁钥匙盒或密码锁，或者有房东随时准备迎接您的到来。</p>
          </div>
          <div style="width:350px;">
            <h2 style="margin-bottom: 40px;">随时为您提供优享用户支持</h2>
            <p>预订爱彼迎Plus的房源后，您可以享受我们爱彼迎Plus客服团队的周到服务。这是一个训练有素的专业团队，致力于提供卓越服务和快速响应。</p>
          </div>
        </div>
      </div>
      <div style="padding: 50px 0;">
        <div style="width:620px;margin:0 auto">
          <p style="font-size:40px;margin:20px 0;">若要为下一次旅程寻找最适合自己的爱彼迎Plus房源</p>
          <p>只需认准房源照片下方的达人徽章即可</p>
        </div>
        <div style="width:90%;margin:50px auto;display: flex;justify-content: center">
          <div v-for="(item,index) in tiyanList" :key="index" v-if="index < 5" style="width:19%;height:190px;margin:0 10px;max-width: 260px;min-width: 204px;">
            <div>
              <LoadingImg type="2" :src="item.domain + item.image_url" style="width:100%;height:190px;"></LoadingImg>
            </div>
            <div style="width:100%;margin-top:10px;text-align: left;font-size:12px;color:#A61D55">
              <span style="padding:2px 5px;background-color:#A61D55;border-radius: 5px;color:#fff;">策划达人</span>
              <span><b>已验证·</b></span><span><b>{{item.city}}</b></span>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:50px 0;">
        <h4>世界各地的爱彼迎Plus房源</h4>
        <p style="margin:20px 0;">从洛杉矶的海滨平房到京都的清幽茶室，探索品质和舒适性经过验证的爱彼迎Plus房源。</p>
        <el-button style="border-radius: 5px;background-color:#A61D55;color:#fff" @click="toAllActive">显示所有体验</el-button>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../public/loadingImg'
  import '../../static/css/video/iconfont.css'
  import Head from '../public/head'
    export default {
        name: "activeStep",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            playIndex:1,
            home:true,
            videoHeight:'',
            tiyanList:[],
            left:'0',
            pageIndex:0,
            activeList:[
              {imgUrl:'../../static/video/video.jpg',category:'舒适',introduce:'优质的床品、舒适的床铺、保护隐私的百叶窗、精致的洗浴产品……这里的每个细节都经过推敲。爱彼迎Plus的房东们倾尽全力，确保您住得舒适。您还将获得以下服务：',
                content:[{title:'精心布置的家具'},{title:'充足的毛巾和蓬松的枕头'},
                  {title:'有衣架可以悬挂衣物，有抽屉可以放置个人用品'}],title:'眉山之行'},
              {imgUrl:'../../static/video/video.jpg',category:'舒适',introduce:'优质的床品、舒适的床铺、保护隐私的百叶窗、精致的洗浴产品……这里的每个细节都经过推敲。爱彼迎Plus的房东们倾尽全力，确保您住得舒适。您还将获得以下服务：',
                content:[{title:'精心布置的家具'},{title:'充足的毛巾和蓬松的枕头'},
                  {title:'有衣架可以悬挂衣物，有抽屉可以放置个人用品'}],title:'眉山之行'},
              {imgUrl:'../../static/video/video.jpg',category:'舒适',introduce:'优质的床品、舒适的床铺、保护隐私的百叶窗、精致的洗浴产品……这里的每个细节都经过推敲。爱彼迎Plus的房东们倾尽全力，确保您住得舒适。您还将获得以下服务：',
                content:[{title:'精心布置的家具'},{title:'充足的毛巾和蓬松的枕头'},
                  {title:'有衣架可以悬挂衣物，有抽屉可以放置个人用品'}],title:'眉山之行'},
              {imgUrl:'../../static/video/video.jpg',category:'舒适',introduce:'优质的床品、舒适的床铺、保护隐私的百叶窗、精致的洗浴产品……这里的每个细节都经过推敲。爱彼迎Plus的房东们倾尽全力，确保您住得舒适。您还将获得以下服务：',
                content:[{title:'精心布置的家具'},{title:'充足的毛巾和蓬松的枕头'},
                  {title:'有衣架可以悬挂衣物，有抽屉可以放置个人用品'}],title:'眉山之行'},
            ],
            approveList:[
              {imgUrl:'../../static/video/video.jpg',local:'开普敦'},
              {imgUrl:'../../static/video/video.jpg',local:'巴塞罗那'},
              {imgUrl:'../../static/video/video.jpg',local:'悉尼'},
              {imgUrl:'../../static/video/video.jpg',local:'洛杉矶'},
            ],
          }
      },
      components:{
          Head,
        LoadingImg
      },

      methods:{
        playVideo(){
          if(this.playIndex){
            this.playIndex = 0
            document.getElementById("videoId").pause()
          }else{
            this.playIndex = 1
            document.getElementById("videoId").play()
            document.getElementById("videoId").muted = true

          }
        },
        prev(){
          if(this.pageIndex){
            this.pageIndex --
            this.left = (parseInt(this.left) + 700).toString()
          }
        },
        next(){
          if(this.pageIndex < this.tiyanList.length - 3){
            this.pageIndex ++
            this.left = (parseInt(this.left) - 700).toString()
          }
        },
        showHead(){
          let a =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(a > 82){
            this.home = false
          }else{
            this.home = true
          }
        },
        toAllActive(){
          this.$router.push('/experienceCentre')
        },
        getActive(){
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            page:1,
            sort:1
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                this.tiyanList = data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getActive()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
      },
      mounted() {
          let _this = this
          window.addEventListener('scroll',this.showHead)
          this.videoHeight = window.screen.height  * 80 /100 + 'px'
          var video = document.getElementById('videoId');
          video.controls = false;
        video.addEventListener('ended',()=>{
          this.playIndex = 0
        })
        this.getActive()
      },
      destroyed() {
        window.removeEventListener('scroll',this.showHead)
      }
    }
</script>

<style scoped>
</style>
