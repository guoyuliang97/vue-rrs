<template>
    <div>
      <Head v-on:mobileReload="mobileReload"></Head>
      <div style="padding: 1rem;background-color: #008489;margin-top: 50px;">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div style="width:50%;display: flex;justify-content: flex-start;background-color: #004C4F;padding:1rem;border-radius:2rem;">
            <i style="font-size:2rem;color:rgba(255,255,255,.5);" class="el-icon-search"></i>
            <input @focus="toSeach" style="border: none;background-color: #004C4F;width:100%;" />
          </div>
        </div>
      </div>
      <div>
        <swiper loop auto :aspect-ratio="300/800" dots-position="center"  :height="hieght + 'rem'" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
          <swiper-item class="swiper-demo-img" :height="hieght + 'rem'" v-for="(item, index) in bannerList" :key="index">
            <img :src="item.image_id?item.image.domain+item.image.image_url:''" :style="{height:hieght + 'rem'}">
          </swiper-item>
        </swiper>
      </div>
      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <div class="buttnL" @click="toPage(item,index)" :style="{marginRight:margin+'px',marginLeft: margin + 'px'}" v-for="(item,index) in buttnList">
          <img :src="item.imgurl" style="width:4rem;height:4rem">
          <p style="font-size:15px;">{{item.title}}</p>
        </div>
      </div>
      <div style="padding: 1rem;font-size: 12px;">
        <div>
          <h2 >即将开展的体验</h2>
          <div  id="wrap">
            <div class="box"  :style="{left:left/10 + 'rem',width: width + 'px'}">
                <div @click="toPublisha(item,index)" v-for="(item,index) in recentList"  class="boxlist"  >
                  <LoadingImg type="3"  :src="item.cover_image? item.domain + item.image_url:''" style="width:6rem;height:6rem;border-radius: 5px;overflow: hidden"></LoadingImg>
                  <div  style="margin-left:1rem;line-height: 2rem">
                    <p><b>{{item.title}}</b></p>
                    <p>{{item.kind?item.kind[0].kind_name:''}}</p>
                    <p>{{item.country}}-{{item.province}}-{{item.city}}-{{item.region}}</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div>
          <h2>热门高分体验</h2>
          <div style="display: flex;justify-content: space-between;flex-wrap: wrap;margin: 2rem 0;">
            <div @click="toPublish(item,index)" v-for="(item,index) in highgScore" style="width:47%;margin: 1rem 0;overflow: hidden">
              <div style="width:100%;overflow: hidden;border-radius: 5px;">
                <LoadingImg type="3" :src="item.cover_image?item.domain+item.image_url:''" style="width:100%;height:14rem;overflow: hidden"></LoadingImg>
              </div>
              <div style="margin-top:1rem;">
                <p>{{item.kind?item.kind[0].kind_name:''}}</p>
                <p style="margin: 0.5rem 0;font-size: 1.3rem"><b>{{item.title}}</b></p>
                <div style="display: flex;justify-content: flex-start;font-size: 1rem;align-items: center">
                  <cell :title="item.score" style="padding:1rem 0;align-items: center">
                    <rater :value="parseInt(item.score) " active-color="#008489" :font-size="15" disabled></rater>
                  </cell>
                  <div style="margin-left:0.5rem">
                    评论({{item.comment_num}})
                  </div>
                </div>
                <p v-if="item.price"><b>￥{{item.price}}</b>&nbsp;每人</p>
              </div>
            </div>
          </div>
          <el-button @click="LookMore(1)" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多体验&gt;</el-button>
        </div>
        <div style="margin-top:20px;">
          <h2>旅行故事</h2>
          <div style="margin: 2rem 0;display: flex;justify-content: space-between;flex-wrap: wrap">
            <div @click="toStory(item,index)" v-for="(item,index) in storyList" style="width:47%;margin: 1rem 0;">
              <div style="width:100%;overflow: hidden;border-radius: 5px;">
                <LoadingImg type="3" :src="item.cover_image?item.cover.domain+item.cover.image_url:''" style="width:100%;height:14rem;overflow: hidden"></LoadingImg>
              </div>
              <div style="margin-top: 1rem;">
                <p>{{item.kind?item.kind[0].kind_name:''}}</p>
                <p style="margin: 1rem 0;"><b>{{item.title}}</b></p>
              </div>
              <div style="display: flex;justify-content: space-between;align-items: center">
                <div>
                  <img :src="item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:userImg" style="width:3rem;height:3rem;border-radius: 50%;">
                </div>
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:20%;">{{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'}}</div>
                <div >赞({{item.praise_num}})</div>
                <div>评论({{item.leaving_num}})</div>
              </div>
            </div>
          </div>
          <el-button @click="LookMore(2)" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多故事&gt;</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import {Rater,Cell} from 'vux'
  import { Swiper, SwiperItem} from 'vux'
  import LoadingImg from '../../public/loadingImg'
  import Head from '../../public/mobilePublic/mobileHead'
    export default {
        name: "index",
      data(){
          return{
            bannerList:[],
            api: this.GLOBAL.baseURL,
            hieght:'',
            show: true,
            swiperItemIndex:0,
            buttnList:[
              {imgurl:'../../../static/img/static/wap/volunteer.png',title:'志愿者',router:'/volunteer'},
              {imgurl:'../../../static/img/static/wap/palyer.png',title:'策划者',router:'/palyer'},
              {imgurl:'../../../static/img/static/wap/story.png',title:'故事',router:'/mobilestory'},
              {imgurl:'../../../static/img/static/wap/experce.png',title:'体验',router:'/mobileExpericer'},
              {imgurl:'../../../static/img/static/wap/hotserch.png',title:'热搜体验',router:'/mobileHotsearch'},
              {imgurl:'../../../static/img/static/wap/nowsee.png',title:'最近浏览',router:'/mobileReccently'},
              {imgurl:'../../../static/img/static/wap/morething.png',title:'更多'},
            ],
            margin:'',
            left:0,
            width:'',
            highgScore:[],
            storyList:[],
            recentList:[{}],
            userImg:'../../../static/img/static/user.png',
            activeIndex: 1,
            storyIndex: 1
          }
        },
      components:{
        Head,
        LoadingImg,
        Swiper,
        SwiperItem,
        Rater,
        Cell,
      },
      methods:{
        toPublisha(item,index) {
          this.$router.push({
            path: '/mPublishPage',
            query:{
              information: item.activity_id
            }
          })
           /* if (typeof obj == 'object') { //判断传入的obj是否为对象
              var startTime = 0;//记录起始事件
              var isMove = false; //记录是否移动

              obj.addEventListener('touchstart', function () {
                startTime = Date.now(); //获取当前时间戳
              });

              obj.addEventListener('touchmove', function () {
                isMove = true; //记录移动

              });

              obj.addEventListener('touchend', function (e) {
                //判断是否满足点击的条件
                if (!isMove && Date.now() - startTime < 150) {
                  //tap点击事件触发
                  //if(callback){
                  //    callback();
                  //}
                  _this.config()
                }

                //数据重置
                isMove = false;
                startTime = 0;
              });
            }*/
        },
          toSeach(){
            this.$router.push('/mSearch')
          },
        onSwiperItemIndexChange(){

        },
          //加载数据
        mobileReload(){
          this.getBanner()
          this.getRecentEx()
          this.getHightEx()
          this.getStory()
        },
        //首页轮播
        getBanner(){
          this.$http.post(this.api + '/home/Banner/bannerlist',{
            token: localStorage.getItem('token'),
            flag: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                this.bannerList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getBanner()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        //获取手机屏幕高度
        getHeight(){
          var height = window.screen.height
          var width = window.screen.width
          this.margin = (width - (60*4))/8
          this.hieght = height * 0.3 /10
        },
        //手指轮播
        tochWap(){
          let _this = this
          // 初始化手指坐标点
          var wrap = document.getElementById('wrap')
          _this.width = 250*_this.recentList.length
          var startPoint = 0;
          var startEle = 0;
          //手指按下
          wrap.addEventListener("touchstart",function(e){

            startPoint = e.changedTouches[0].pageX;
            startEle = _this.left
          });
          //手指滑动
          wrap.addEventListener("touchmove",function(e){
            var currPoint = e.changedTouches[0].pageX;
            var disX = currPoint - startPoint;
            var left = startEle + disX;
            if(left <= (230- _this.width)){
              _this.left = (230- _this.width)
            }else if(left > 0){
              _this.left = 0
            }else{
              _this.left = left
            }
          });
        },
        //获取即将开展体验
        getRecentEx(){
          this.$http.post(this.api + '/SoonAct',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.recentList = res.data.data.data
                this.tochWap()

              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getRecentEx()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        //热门高分体验
        getHightEx(){
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            sort:1,
            page:1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.highgScore = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getHightEx()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        //获取故事
        getStory(){
          this.$http.post(this.api + '/home/Story/story_list',{
            token: localStorage.getItem('token'),
            sort:2,
            page: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.storyList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getStory()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        //子页面
        toPage(item,index){
          if(index == 6){
            MessageBox.alert('请前往客户端或者APP查看更多内容')
          }else if(index == 5){
            if(localStorage.getItem('isLogin')){
              this.$router.push(item.router)
            }else{
              MessageBox.alert('请登录查看最近浏览')
            }
          }else{
            this.$router.push(item.router)
          }
        },
        toPublish(item,index){
          this.$router.push({
            path: '/mPublishPage',
            query:{
              information: item.activity_id
            }
          })
        },
        toStory(item,index){
          this.$router.push({
           path: '/mStorypage',
            query:{
             information: item.story_id
            }
          })
        },
        LookMore(val){
            if(val == 1){
              this.activeIndex += 1
            }else{
              this.storyIndex += 1
            }
          this.getMore(val)
        },
        getMore(val){
            if(val == 1){
              this.$http.post(this.api + '/home/Activity/activ_list',{
                token: localStorage.getItem('token'),
                sort:1,
                page:this.activeIndex
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(res.data.data.data.length){
                      for(var i = 0;i< res.data.data.data.length;i++){
                        this.highgScore.push(res.data.data.data[i])
                      }
                    }else{
                      MessageBox.alert('没有更多体验了哟！')
                    }
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.getMore()
                      })
                  }else if(res.data.code == 0){
                    MessageBox.alert(res.data.msg)
                  }
                })
            }else{
              this.$http.post(this.api + '/home/Story/story_list',{
                token: localStorage.getItem('token'),
                sort:2,
                page: this.storyIndex
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(res.data.data.data.length){
                      for(var i = 0; i < res.data.data.data.length;i++){
                        this.storyList.push(res.data.data.data[i])
                      }
                    }else{
                      MessageBox.alert('没有更多故事了哟！')
                    }
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.getMore()
                      })
                  }else if(res.data.code == 0){
                    MessageBox.alert(res.data.msg)
                  }
                })
            }
        }
      },
      mounted(){
          this.getHeight()
      },
      created(){
          window.scroll(0,0)
      }
    }
</script>

<style scoped>
  .swiper-demo-img img {
    height: 100%;
  }
  .buttnL{
    width:60px;
    margin-top: 1rem;
    text-align: center;
  }
#wrap{
  position: relative;
  overflow: hidden;
  height:7rem;
  width:100%;
  margin: 2rem 0;
}
  .box{
    position: absolute;
    height: 7rem;
  }
  .boxlist{
    float: left;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem;
    border-right:0.1rem solid #eee;
    display: flex;
    justify-content: flex-start;
  }
</style>
