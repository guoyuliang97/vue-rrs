<template>
  <div class="home">
		<Head v-show="home" type="home" v-on:getVal="getVal"  :content="editSearch" v-on:reload="reload"  v-on:search="searchHome"></Head>
		<div class="home_banner">
        <el-carousel height="700px" >
          <el-carousel-item v-for="(item,index) in bannerList "   height="700px">
            <img :src="item.image_id?item.image.domain+item.image.image_url:''" style="height:100%;width:100%;">
            <div style="position:absolute;z-index:999;top:38%;left:23%;font-size:30px;width:400px;text-align: left;">
              <p style="color:#fff">{{item.text}}</p>
              <el-button  plain style="margin-top:20px;">{{item.button_text}}</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
		</div>
		<div class="home_container">
			<!--搜索框-->
      <div>
        <div class="home_search" id="search">
          <div class="search_logo">
            <img alt="" src="../../static/img/home/search.png" style="margin-top: 21px;"/>
          </div>
          <div class="search_input">
            <input style="border:none" @focus="serchHistory" @keydown="gosearch" @blur="isSerch = false" v-model="search" type="text"  placeholder="目的地,城市,地址"/>
          </div>
          <div class="search_btn">
            <div @click="toSearch">搜索</div>
          </div>
        </div>
        <div v-show="isSerch"  style="border:1px solid #eee;background-color:white;box-shadow: 0px 2px 10px 1px #ebebeb;text-align: left;" >
          <div>
            <p style="font-size:12px;margin: 20px 0 20px 30px;"><b>最近搜索</b></p>
            <div v-for="(item,index) in serchList" v-show="index<5" :key="index" @mousedown="changeSearch(item,index)" class="isSerch">
              <p style="font-size:14px;font-weight:bold" >
                <i class="el-icon-time" style="color:#000;font-size:12px;font-weight:bold;"></i>
                <span style="margin-left:10px;">{{item.keywords}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
			<!--最近搜索-->
      <div v-show="recentlyList.length">
        <p id="lookRecent" class="title">您最近浏览</p>
        <div class="recently_search">
          <div v-for="(item,index) in recentlyList" :key="index" v-show="index<2" style="width:330px;height:200px;margin-right:50px;overflow: hidden">
            <a :href="pubLish + item.activity_id" onclick="return false" style="color:#000;text-decoration: none"  target="_blank">
              <div class="detail_img"  @click="toPublish(item,index)" style="position: relative">
                <loadingImg type="3" :src="item.img" style="width:330px;height:200px;overflow: hidden"></loadingImg>
                <div style="position: absolute;bottom:0;right:0;left:0;color:#fff;padding:10px;">
                  <div class="detail_top" >
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:200px;text-align: left"><b>{{item.title}}</b></p>
                  </div>
                  <div class="detail_top" >
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:200px;text-align: left">{{item.kind}}</p>
                    <div style="text-align: right">
                      <p>{{item.create_time}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
			<!--搜索人人游-->
			<p id="serchRry" class="title">搜索人人耍</p>
			<div class="search_rry">
				<div class="search_rry_btn">&lt;</div>
				<div class="search_rry_content">
					<div>
						 <div v-for="(item,index) in searchList">
                 <div  class="search_rry_detail" style="cursor: pointer;" @click="toptop(item,index)">
                    <div class="search_rry_bg">
                      <loadingImg type="3" :src="item.img" style="width:100%;height:100%;"></loadingImg>
                    </div>
                    <div class="search_rry_txt">{{item.title}}</div>
                </div>
             </div>
          </div>
				</div>
				<div class="search_rry_btn">&gt;</div>
			</div>
			<!--热门目的地-->
      <div>
        <p id="hotPlace" class="title">热门目的地</p>
        <el-tabs v-model="hotIndex" @tab-click="handleClick">
          <el-tab-pane style="position: relative" v-for="(item,index) in hotnav"  :label="item.city" :name="item.city">
            <div v-show="LoadingState" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
              <Loading  ></Loading>
            </div>
            <div class="hot_list">
              <div class="hot_detail" v-for="(item,index) in hotList" v-if="index < 9">
                <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <p style="text-align: left;margin:20px 0;"><b @click="moreActive" style="cursor: pointer">查看更多{{hotIndex}}活动</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
      <!--热门高分体验-->
      <div>
        <p id="hightAc" class="title">热门高分体验</p>
        <div style="margin-top:15px;display: flex;flex-wrap: wrap;width:100%;position: relative">
          <div v-show="loadingActive" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
            <Loading  ></Loading>
          </div>
          <div v-for="(item,index) in activeList" :key="index" v-if="index <9" class="marginR">
            <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
          </div>
        </div>
        <p style="text-align: left;margin:20px 0;"><b @click="toActive" style="cursor: pointer">查看所有体验</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
			<!--精彩旅行故事-->
      <div>
        <p id="WonderStory" class="title">精彩旅行故事</p>
        <div class="wonderful" style="position: relative">
          <div v-show="LoadingState2" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
            <Loading ></Loading>
          </div>
          <div class="wonderful_detail" v-for="(item,index) in wonderfulList" v-show="index < 8">
            <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :zanIndex="item.zanIndex" :status="item.status" :address="item.address" :remark="item.remark" :imgUrl="item.img" :avator="item.avator" :zan="item.zan" :say="item.leaving_num" v-on:addZan="addZan(item,index)"></Detail>
          </div>
        </div>
        <p style="text-align: left;margin:20px 0;"><b @click="moreStory" style="cursor: pointer">显示全部</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
			<Foot type="home"></Foot>
      <div v-if="isLoading && islookRecent && isserchRry " class="animated fadeIn" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: white"></div>
		</div>
  </div>
</template>

<script>
  import '../../static/css/home.css'
	import Head from "../public/head.vue"
	import Detail from "../public/detail.vue"
  import Foot from "../public/foot.vue"
  import test from '../../static/js/language'
  import Loading from '../public/Loading'
  import loadingImg from '../public/loadingImg'
export default {
  name: 'HelloWorld',
  data () {
    return {
      api: this.GLOBAL.baseURL,
      LoadingState: false,
      LoadingState2:false,
      home:true,
      hotIndex:'',
      isSerch:false,
      search:'',
      loading:false,
			bannerList:[],
			recentlyList:[],
			searchList:[],
			hotnav:[],
			hotList:[],
			wonderfulList:[],
      serchList:[],
      language:[],
      isBanner:false,
      editSearch:'搜索',
      content:'',
      activeList:[],
      pubLish:'/publishPage?information=',
      islookRecent:true,
      isserchRry:true,
      ishotPlace:true,
      ishightAc:true,
      isWonderStory:true,
      isLoading:true,
      loadingActive:false
    }
  },
	components:{
		Head,
		Detail,
    Foot,
    Loading,
    loadingImg
	},
  watch:{
  },
  methods: {
    toaPublish(item,index){
      this.$router.push({
        path: '/publishPage',
        query: {
          information: item.activity_id
        }
      })
    },
    toActive(){
      this.$router.push('/experienceCentre')
    },
    getHotActive(){
      this.loadingActive = true
      this.$http.post(this.api + '/home/Activity/activ_list',{
        token: localStorage.getItem('token'),
        sort:1,
        page: 1
      })
        .then(res=>{
          if(res.data.code == 1){
            this.activeList = res.data.data.data
            this.loadingActive = false
          }else if(res.data.code == 3){
            this.getHotActive()
          }else if(res.data.code == 0){
            alert(res.data.msg)
          }
        })
    },
    getVal(msg){
      this.content = msg
    },
    gosearch(){
      if(event.keyCode === 13){
        this.toSearch()
      }
    },
    getKind(){
      this.isserchRry = true
      this.$http.post(this.api + '/home/Kind/kindlist',{
        token: localStorage.getItem('token')
      })
        .then(res=>{
          if(res.data.code == 1){
            let data = res.data.data
            let a = []
            let b = []
            for(let j in data){
              a.push(data[j])
            }
            for(let i =0;i<a.length;i++){
              b.push({img:a[i].image_id?a[i].domain+a[i].image_url:'',title:a[i].kind_name,value:a[i].kind_id})
            }
            this.searchList = b
            this.isserchRry = false
          }else if(res.data.code == 3){
            this.getKind()
          }else if(res.data.code == 0){
            alert(res.data.msg)
            this.isserchRry = false
          }
        })
    },
    searchHome(){
      this.$router.push({
        name: 'homeSearch',
        query:{
          key: this.content,
          type:0
        }
      })
    },
    toptop(item){
      this.$router.push({
        path: '/classification',
        query:{
          information: item.value,
          name: item.title
        }
      })
    },
    handleClick(tab, event){
      this.getActive(this.hotIndex)
    },
    toPublish(item,index) {
      this.$router.push({
        path: '/publishPage',
        query: {
          information: item.activity_id
        }
      })
    },
    toperson(item,index){
      this.$router.push({
        path: '/userdata',
        query: {
          information: item.userId
        }
      })
    },
    consult(index) {
      if (localStorage.getItem('isLogin')) {
        this.$router.push({
          path: '/counsel',
          query: {
            information: this.hotList[index]
          }
        })
      } else {
        this.$alert('您还没有注册或者登陆')
      }
    },
    toSearch() {
      this.$router.push({
        name: 'homeSearch',
        query:{
          key: this.search,
          type:0
        }
      })
    },
    toStory(item,index){
      this.$router.push({
        path: '/storyPage',
        query:{
          information: item.story_id
        }
      })
    },
    
    showHead(){
      var winHeight =  document.documentElement.clientHeight
      var hotPlace = document.getElementById('hotPlace').offsetTop
      var hightAc = document.getElementById('hightAc').offsetTop
      var WonderStory = document.getElementById('WonderStory').offsetTop
        let a =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(a > 533){
          this.home = false
        }else{
          this.home = true
        }
        if(localStorage.getItem('token')){

          if(hotPlace - a <= winHeight){
            if(this.ishotPlace){
              this.ishotPlace = false
              this.getHotLocal()
            }
          }
          if(hightAc - a <= winHeight){
            if(this.ishightAc){
              this.ishightAc = false
              this.getHotActive()
            }
          }
          if(WonderStory - a <= winHeight){
            if(this.isWonderStory){
              this.isWonderStory = false
              this.getStory()
            }
          }
        }
    },
    //点赞
    addZan(item,index){
      if(item.zanIndex == 0){
        this.$http.post(this.api + '/home/Comment/praise',{
          token: localStorage.getItem('token'),
          flag: 1,
          table_id: item.story_id,
          type: 1
        })
          .then(res=>{
           if(res.data.code == 1){
             item.zanIndex = 1
             item.zan = item.zan + 1
           }else if(res.data.code == 3){
             this.addZan(item,index)
           }else if(res.data.code == 0){
             alert(res.data.msg)
           }
          })

      }else{
        this.$http.post(this.api + '/home/Comment/praise',{
          token: localStorage.getItem('token'),
          flag: 1,
          table_id: item.story_id,
          type: 2
        })
          .then(res=>{
            if(res.data.code == 1){
              item.zan = item.zan - 1
              item.zanIndex = 0
            }else if(res.data.code == 3){
              this.addZan(item,index)
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    serchHistory(){
      if(localStorage.getItem('isLogin')){
        this.isSerch = true
        this.$http.post(this.api + '/home/Index/search_lately',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.serchList = res.data.data
            }else if(res.data.code == 3){
              this.serchHistory()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    changeSearch(item,index){
      this.$router.push({
        name:'homeSearch',
        query:{
          key: item.keywords
        }
      })
    },
    moreActive(){
      for(let i = 0;i<this.hotnav.length;i++){
        if(this.hotnav[i].city == this.hotIndex){
          this.$router.push({
            path: 'moreActive',
            query:{
              key: this.hotIndex,
            }
          })
        }
      }
    },
    moreStory(){
      this.$router.push('/story')
    },
   getVist(){
     this.islookRecent = true
      if(localStorage.getItem('isLogin')){
        this.$http.post(this.api + '/home/Index/visit_lately',{
          token: localStorage.getItem('token'),
          page: 1
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              for(let i =0;i<data.length;i++){
                if(data[i].flag == 1){
                  let kind = ''
                  for(let j = 0;j<data[i].kind.length;j++){
                    if(j == data[i].kind.length-1){
                      kind += data[i].kind[j].kind_name
                    }else{
                      kind += data[i].kind[j].kind_name + '/'
                    }
                  }
                  if(!data[i].status){
                    this.recentlyList.push({
                      img:data[i].domain + data[i].image_url,
                      title:data[i].title,
                      activity_id:data[i].table_id,
                      kind: kind,
                      create_time: data[i].create_time,
                      status: data[i].status
                    })
                  }
                }
              }
              this.islookRecent = false
            }else if(res.data.code == 3){
              this.getVist()
            }else if(res.data.code == 0){
              alert(res.data.msg)
              this.islookRecent = false
            }
          })
      }else{
        this.recentlyList = []
        this.islookRecent = false
      }
    },
    getActive(val){
      this.LoadingState = true
      this.$http.post(this.api + '/home/Activity/activ_list',{
        token: localStorage.getItem('token'),
        sort: 1,
        page:1,
        city: val
      })
        .then(res=>{
          if(res.data.code == 1){
            let data = res.data.data.data
            this.hotList = data
            this.LoadingState = false
          }else if(res.data.code == 3){
            this.getActive(val)
          }else if(res.data.code == 0){
            alert(res.data.msg)
          }
        })

    },
    getStory(){
      this.LoadingState2 = true
      this.$http.post(this.api + '/home/Story/story_list',{
        token: localStorage.getItem('token'),
        sort: 2,
        page: 1
      })
        .then(res=>{
          if(res.data.code == 1){
            let data = res.data.data.data
            if(data.length){
              let a = []
              for(let i = 0;i<data.length;i++){
                let user = data[i].user
                let avator = ''
                let zan = ''
                if(data[i].cover_image){
                  if(user.head_image){
                    avator = user.headimage.domain + user.headimage.image_url
                  }else{
                    avator =  '../../static/img/static/user.png'
                  }
                  if(data[i].is_praise){
                    zan = 1
                  }else{
                    zan = 0
                  }
                  a.push({
                    img:data[i].cover.domain + data[i].cover.image_url,
                    address:data[i].province,
                    remark: data[i].title,
                    avator:avator,
                    zan: data[i].praise_num,
                    say: data[i].leavemsg_num,
                    zanIndex:zan,
                    story_id: data[i].story_id,
                    userId: data[i].user_id,
                    leaving_num: data[i].leaving_num
                  })
                }
              }
              this.wonderfulList = a
            }
            this.LoadingState2 = false
          }else if(res.data.code == 3){
            this.getStory()
          }else if(res.data.code == 0){
            alert(res.data.msg)
          }
        })
    },
    reload(){
      this.getBanner()
      this.getVist()
      this.getKind()
      this.sendBuidu()
    },
    sendBuidu(){
      if(window.location.href.indexOf('.top') == -1 && window.location.href.indexOf('localhost') == -1){
        this.$http.post(this.api + '/BaiduPush',{
          token: localStorage.getItem('token'),
          url: encodeURIComponent(window.location.href)
        })
          .then(res=>{
            if(res.data.code == 1){
            }else if(res.data.code == 3){
              this.sendBuidu()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    //首页轮播
    getBanner(){
      this.isLoading = true
      this.$http.post(this.api + '/home/Banner/bannerlist',{
        token: localStorage.getItem('token'),
        flag: 0
      })
        .then(res=>{
          if(res.data.code == 1){
            this.bannerList = res.data.data
            this.isLoading = false
          }else if(res.data.code == 3){
            this.getBanner()
          }else if(res.data.code == 0){
            alert(res.data.msg)
            this.isLoading = false
          }
        })
        .catch(error=>{
          this.isLoading = false
        })
    },
    getHotLocal(){
      this.LoadingState = true
      this.$http.post(this.api + '/PopularCity',{
        token: localStorage.getItem('token'),
      })
        .then(res=>{
          if(res.data.code == 1){
            if(res.data.data.length){
              this.hotnav = res.data.data
              this.hotIndex = this.hotnav[0].city
              this.getActive(this.hotIndex)
            }
            this.ishotPlace = false
          }else if(res.data.code == 3){
            this.getHotLocal()
          }else if(res.data.code == 0){
            alert(res.data.msg)
          }
        })
    },

  },
  mounted(){
    window.scroll(0,0)
    let _this = this
    window.addEventListener('scroll',this.showHead)
    _this.language = test()
  },
  destroyed(){
    window.removeEventListener('scroll',this.showHead)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .marginR{
    text-align: left;
    width:330px;
    margin-right:45px;
    margin-bottom: 20px;
  }
  .marginR:nth-child(3n + 1){
    margin-right:0
  }
</style>
