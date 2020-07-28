<template>
    <div v-if="activeData">
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: fixed;z-index:999;left:0;right:0" :style="{top: top + 'px',opacity:opacity }">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">活动详情</p>
      </div>
      <swiper loop auto :aspect-ratio="300/800" dots-position="center"  :height="height + 'px'" style="position: relative" >
        <swiper-item class="swiper-demo-img" :height="height + 'px'" v-for="(item, index) in imgList" :key="index">
          <LoadingImg type="2" :src="item.image_id?item.domain+item.image_url:''" style="position: relative" :style="{height: height + 'px',width: screnWidth + 'px'}"></LoadingImg>
        </swiper-item>
        <div style="position: absolute;bottom:8rem;z-index:2;color:#fff;left:1rem;font-size: 1.6rem">
          <p><span v-for="(item,index) in activeData.kind" v-show="index<3">/{{item.kind_name}}</span></p>
          <h2 style="margin: 1rem 0;">{{activeData.title}}</h2>
          <div @click="lookMoreImg" style="background-color: #fff;border-radius: 10px;padding: 1rem;color:#008489;width:120px">
            更多图集与视频
          </div>
        </div>
      </swiper>
      <div style="padding: 1rem">
        <div class="centent">
          <img src="../../../static/img/static/wap/location.png" style="width:2rem">
          <p style="margin-left:10px;font-size: 1.5rem;"><span>{{activeData.country}}</span>&nbsp;<span>{{activeData.province}}</span>&nbsp;<span>{{activeData.city}}</span>&nbsp;<span>{{activeData.region}}</span> </p>
        </div>
        <div class="centent">
          <img src="../../../static/img/static/wap/personL.png" style="width:2rem">
          <p style="margin-left:10px;font-size: 1.5rem;">活动年龄要求：{{activeData.age_limit}}</p>
        </div>
        <div class="centent">
          <img src="../../../static/img/static/wap/thingS.png" style="width:2rem">
          <p style="margin-left:10px;font-size: 1.5rem;">{{activeData.activ_bring?'参与者需要带：'+activeData.activ_bring:'参与者无需自带物品'}}</p>
        </div>
        <div class="centent">
          <img src="../../../static/img/static/wap/house.png" style="width:2rem">
          <p style="margin-left:10px;font-size: 1.5rem;">{{activeData.issatay == 2?'该体验包含住宿':activeData.issatay == 1?'该体验提供住宿':'该体验不提供住宿'}}</p>
        </div>
        <div v-if="isOwer == activeData.user_id" class="centent">
            <img src="../../../static/img/static/wap/invite.png" style="width:2rem">
            <p @click="lookMoreImg" style="margin-left:10px;font-size: 1.5rem;color:#008489">点击邀请志愿者</p>
        </div>
        <div>
          <div style="display: flex;justify-content: space-between">
            <h2>来认识一下该活动策划者{{activeData.user.family_name+activeData.user.middle_name+activeData.user.name?activeData.user.family_name+activeData.user.middle_name+activeData.user.name:'匿名用户'}}</h2>
            <img :src="activeData.user.head_image?activeData.user.headimage.domain+activeData.user.headimage.image_url:''" style="width:5rem;height:5rem;border-radius: 50%;">
          </div>
          <div style="font-size: 1.5rem;line-height: 30px;">
            {{activeData.introduce}}
          </div>
          <div style="margin: 2rem 0;">
            <h2>活动内容</h2>
            <div style="font-size: 1.5rem;margin: 2rem 0;word-wrap:break-word;white-space:pre-wrap;line-height: 40px;">{{activeData.descripte}}</div>
          </div>
          <div style="margin: 2rem 0;">
            <h2>那些人可以加入</h2>
            <p style="margin: 1rem 0;font-size: 1.5rem;">{{activeData.age_limit}}岁以上</p>
          </div>
          <div style="margin: 2rem 0;">
            <h2>体验地点</h2>
            <p style="font-size: 1.5rem;margin: 2rem 0;word-wrap:break-word;white-space:pre-wrap;line-height: 40px;">{{activeData.go_place}}</p>
          </div>
          <div style="margin: 2rem 0;">
            <h2>集合地点</h2>
            <p style="margin: 1rem 0;font-size: 1.5rem;">{{activeData.set_address}}</p>
          </div>
            <Map style="width:100%;height:200px;"></Map>
          <div>
            <h2>评价</h2>
            <div style="margin: 1rem 0;">
              <div v-for='(item,index) in disList' style="display: flex;justify-content: space-between;margin-bottom: 2.5rem;">
                <div style="display: flex;justify-content: flex-start;">
                  <div>
                    <LoadingImg type="user" :src="item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:'../../../static/img/static/user.png'" style="width:4rem;height:4rem;border-radius: 50%;"></LoadingImg>
                  </div>
                  <div style="margin-left:1rem;">
                    <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><b>{{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'}}</b></p>
                    <p style="margin: 0.5rem 0;font-size: 12px">{{item.create_time}}</p>
                    <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.content}}</p>
                    <p style="color:#008489;">{{item.leaving_num}}条回复</p>
                  </div>
                </div>

              </div>
            </div>
            <div v-if="!disList.length" style="margin:20px 0;text-align: center">
              暂无评论！期待您的参与！
            </div>
            <el-button @click="lookMoreImg" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多评论&gt;</el-button>
          </div>
          <div style="margin: 2rem 0;">
            <div class="need">
              <div> <h4>退订政策</h4>
                <p><span v-if="activeData.return_policy == 1||activeData.return_policy == 2">活动开始</span>{{return_policy}} <span v-if="activeData.return_policy == 1||activeData.return_policy == 2">取消可全额退款</span></p>
                <p>{{activeData.return_content}}</p></div>
       <!--       <div><x-icon type="ios-arrow-right" size="20"  style="fill:#999999"></x-icon></div>-->
            </div>
            <div class="need">
              <div>
                <h4>年龄要求</h4>
                <p>{{activeData.age_limit}}岁以上</p>
              </div>
            </div>
          </div>
          <div style="margin-bottom: 60px;">
            <div v-if="long_day == '2'">
              <h2>体验房源</h2>
              <div style="display:flex;margin: 2rem 0;flex-wrap: wrap;justify-content: space-between;font-size: 15px;" >
                <div v-for="(item,index) in houseImage" style="width:47%;margin: 10px 0;">
                  <div style="position: relative">
                    <LoadingImg type="2" :src="item.img[0].domain+item.img[0].image_url" style="width:100%;height:10rem;"></LoadingImg>
                    <span style="padding: 2px 10px;border-radius: 3px;position: absolute;right:10px;bottom:10px;background-color: #057F83;color:#fff;opacity: .9">露营</span>
                  </div>
                  <div style="display: flex;justify-content: space-between;margin: 1rem 0;">
                    <p>可住2人</p>
                    <p>提共2间</p>
                  </div>
                  <div>￥1/晚</div>
                </div>
              </div>
              <el-button @click="lookMoreImg" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">前往预定房源&gt;</el-button>
            </div>
            <div  v-if="long_day == '1'">
              <h2>房源照片</h2>
              <div style="display:flex;margin: 2rem 0;flex-wrap: wrap;justify-content: space-between;font-size: 15px;">
                <div v-for="(item,index) in houseImage" style="width:47%;margin: 10px 0;">
                  <LoadingImg type="2" :src="item.domain+item.image_url"  style="width:100%;height:10rem;"></LoadingImg>
                </div>
              </div>
            </div>
          </div>
          <div style="position: fixed;">
            <div @click="checkApp" style="position:fixed;top: 80%;right:0;z-index:9;background: linear-gradient(to right, #008489 , #26BAC0);border-top-left-radius: 2rem;border-bottom-left-radius: 2rem;font-size: 1.5rem;padding:0.5rem 1rem;color:#fff;">
              <p>打开App</p>
            </div>
            <div @click="openApp"  style="position:fixed;top:70%;right:0;z-index:9;background: linear-gradient(to right, #008489 , #26BAC0);border-top-left-radius: 2rem;border-bottom-left-radius: 2rem;font-size: 1.5rem;padding:0.5rem 1rem;color:#fff;">
              <p>下载App</p>
            </div>
          </div>

          <div style="display: flex;justify-content: space-between;position: fixed;background-color: white;left:0;right:0;padding: 0.5rem 1rem;border-top: 1px solid #eee;" :style="{bottom:bottom + 'px'}">
            <div>
              <p style="font-size: 1.5rem;font-weight: bold"><span v-if="activeData.price">￥{{activeData.price}}/人</span><span v-if="!activeData.price" style="color:red">已过期/已满</span></p>
              <div style="display: flex;justify-content: flex-start;margin-top: 10px;">
                <cell style="border:none;padding: 0;">
                  <rater v-model="score" active-color="#008489" :font-size="15" disabled></rater>
                </cell>
                <div style="margin-left:10px;color:#008489">{{disList.length}}条评论</div>
              </div>
            </div>
            <div v-if="activeData.price" style="line-height: 51px;">
              <el-button size="mini" plain @click="lookMoreImg" style="border:1px solid #008489;color:#008489;">预定</el-button>
            </div>
          </div>

        </div>
      </div>

    </div>

</template>

<script>
  import policy from '../../../static/js/returnPolicy'
  import Bus from '../../assets/eventBus'
  import Map from '../../public/map'
  import { MessageBox } from 'mint-ui'
  import {Rater,Cell} from 'vux'
  import { Swiper, SwiperItem} from 'vux'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "mPublishPage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            height:"",
            screnWidth:'',
            opacity:0,
            top:-50,
            imageList:[
              {img: '../../../static/img/static/2.jpg'},
              {img: '../../../static/img/static/1.jpg'},
              {img: '../../../static/img/static/3.jpg'},
            ],
            disList:[],
            houseList:[
              {img: '../../../static/img/static/2.jpg'},
              {img: '../../../static/img/static/1.jpg'},
              {img: '../../../static/img/static/3.jpg'},
            ],
            score:0,
            bottom: -60,
            jionDress:[],
            activeData:'',
            province:'',
            imgList:[],
            isOwer:"",
            return_policy:'',
            policy:[],
            long_day:'',
            houseImage:[]
          }
      },
      components:{
        LoadingImg,
        Swiper,
        SwiperItem,
        Rater,
        Cell,
        Map
      },
      watch:{
        '$route':'getParams',
        province:function(){
          this.$nextTick(()=>{
            Bus.$emit('jionDress',[this.activeData.set_address_lng,this.activeData.set_address_lat])
            Bus.$emit('tyas',2)
          })
        }
      },
      methods:{
        openApp(){
          var userAgent = navigator.userAgent ;
          var url="",downUrl="";
          if(userAgent.indexOf("Android")>-1){
            url='/app-release.apk';//安卓版App地址，由安卓同事提供
            downUrl='/app-release.apk'; //安卓版App下载地址，由安卓同事提供
          }else{
            url='https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1';//IOS版App地址，由IOS同事提供
            downUrl="https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1"; //IOS版App下载地址，由IOS同事提供
          }
          window.open(downUrl)
        },
        checkApp(){
          var userAgent = navigator.userAgent ;
          var url="",downUrl="";
          if(userAgent.indexOf("Android")>-1){
            MessageBox.alert('暂时没有安卓APP，请耐心等待！')
          }else{
            url='https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1';//IOS版App地址，由IOS同事提供
            downUrl="https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1"; //IOS版App下载地址，由IOS同事提供
          }
          function test(){
            window.location.href = url;
            setTimeout(function(){
              window.location.href = downUrl;
            },5000)
          }
          test();
        },
        getComment(val){
          this.$http.post(this.api + '/home/Comment/comment_list',{
            token: localStorage.getItem('token'),
            table_id:this.activity_id,
            flag: 1,
            order: 1,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                this.disList = data
                this.total =  res.data.data.total
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getComment(val)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        lookMoreImg(){
          MessageBox.alert('请前往APP或者客户端查看')
        },
        goBack(){
          this.$router.push('/')
        },
        //获取手机屏幕高度
        getHeight(){
          this.height = window.innerHeight
          this.screnWidth = window.screen.width
        },
        getScroll(){
          window.addEventListener('scroll',this.showHead)
        },
        showHead(){
          let a =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(a>=0 && a <= 50){
            this.top = a - 50
            if(this.opacity){
              this.opacity -= 0.1
            }else{
              this.opacity += 0.1
            }
          }else{
            this.top = 0
            this.opacity = 1
          }
          if(a>=0 && a <=60){
            this.bottom = a - 60
          }else{
            this.bottom = 0
          }
        },
        getParams(){
          this.activity_id = this.$route.query.information
          this.getActive()
          this.getComment()
        },
        getActive(){
          this.$http.post(this.api + '/home/Activity/get_activity',{
            token: localStorage.getItem('token'),
            activity_id: this.activity_id,
            visit: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.activeData = data
                this.imgList.push(data.cover)
                this.score = data.score
                for(let i =0;i<data.image.length;i++){
                  this.imgList.push(data.image[i])
                }
                 if(this.isOwer){
                   var url =encodeURIComponent(window.location.href + '&'+ 'userId' +'='+this.isOwer)
                 }else{
                   var url =encodeURIComponent(window.location.href)
                 }
                let obj = {
                  title: this.activeData.title,		//分享标题
                  desc: this.activeData.descripte,						//分享内容
                  linkurl: decodeURIComponent(url),//分享链接
                  img: this.imgList[0].domain + this.imgList[0].image_url,				//分享内容显示的图片
                }
                this.return_policy = this.policy[data.return_policy].label
                this.jionDress = [data.set_address_lng,data.set_address_lat]
                this.province = data.province +data.city+ data.region

                if(data.issatay == 2){
                  this.long_day = '1'
                  this.houseImage = data.houseimage
                }else if(data.issatay == 1){
                  this.long_day = '2'
                  var a = []
                  for(let i=0;i<data.house.length;i++){
                    a.push({img:data.house[i].image,flag:data.house[i].flag})
                  }
                  this.houseImage = a
                }else{
                  this.long_day = ''
                }
                if(window.location.href.indexOf('localhost') == -1 && window.location.href.indexOf('.top') == -1){
                  this.SDK(url,obj)
                }
                
              }else if(res.data.code== 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getActive()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        getUser(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isOwer = res.data.data.user_id
              }
            })
        },
      },
      mounted(){
          this.getScroll()
      /*  this.getData()*/

      },
      created(){
        this.getUser()
          this.getParams()
          this.getHeight()
        window.scroll(0,0)
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(!flag){
          this.$router.push({
            path: '/publishPage',
            query:{
              information: this.$route.query.information
            }
          })
        }
        this.policy = policy()
      }
    }
</script>

<style scoped>
.centent{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
  .need{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color:#666666
  }
</style>
