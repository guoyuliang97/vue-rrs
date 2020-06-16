<template>
  <div class="home">
		<Head id="target" v-show="home" type="home" v-on:getVal="getVal"  :content="allText.search[0][Lan]" v-on:reload="reload"  v-on:search="searchHome"></Head>
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
            <input style="border:none" @focus="serchHistory" @keydown="gosearch" @blur="isSerch = false" v-model="search" type="text"  :placeholder="allText.mainSearch[0][Lan]"/>
          </div>
          <div class="search_btn">
            <div @click="toSearch">{{allText.toSearch[0][Lan]}}</div>
          </div>
        </div>
        <div v-show="isSerch"  style="border:1px solid #eee;background-color:white;box-shadow: 0px 2px 10px 1px #ebebeb;text-align: left;" >
          <div>
            <p style="font-size:12px;margin: 20px 0 20px 30px;"><b>{{allText.recentSearch[0][Lan]}}</b></p>
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
        <p id="lookRecent" class="title">{{allText.recentLook[0][Lan]}}</p>
        <div class="recently_search">
          <div class="flexStart marginR" v-for="(item,index) in recentlyList" :key="index" v-show="item.flag == 1">
            <Detail type= 'active'  :data="item" @toPublish="toPublishH(item.table_id,index)" ></Detail>
          </div>
        </div>
      </div>
			<!--搜索人人游-->
			<p id="serchRry" class="title">{{allText.searchAllptp[0][Lan]}}</p>
			<div class="search_rry">
				<div class="search_rry_btn">&lt;</div>
				<div class="search_rry_content">
					<div>
						 <div v-for="(item,index) in searchList">
                 <div  class="search_rry_detail" style="cursor: pointer;" @click="toptop(item,index)">
                    <div class="search_rry_bg">
                      <loadingImg type="2" :src="item.img" style="width:100%;height:100%;"></loadingImg>
                    </div>
                    <div class="search_rry_txt">{{item.title}}</div>
                </div>
             </div>
          </div>
				</div>
				<div class="search_rry_btn">&gt;</div>
			</div>
      <!-- 特惠体验 -->
      <div v-show="dicountActList.length" class="marginT">
        <p id="dicountAct" class="fontweight fontTitle">{{allText.special[0][Lan]}}</p>
        <p class="fontDescibe marginBottom">{{allText.special[1][Lan]}}</p>
        <div style="margin-top:30px;" class="flexWrap">
          <div class=" marginR" v-for="(item,index) in dicountActList" :key="index">
            <Detail type= 'active' :data="item" @toPublish="toPublish(item,index)"></Detail>
          </div>
        </div>
        <p style="text-align: left;margin:20px 0;"><b @click="toActive('youhui')" style="cursor: pointer">{{allText.special[2][Lan]}}</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
			<!--热门目的地-->
      <div class="marginT">
        <p id="hotPlace" class="fontweight fontTitle">{{allText.hotPlace[0][Lan]}}</p>
        <div class="flexStart" style="margin-top: 29px;">
          <div @click="handleClick(item,index) " :class="[adressIndex == index?'hoverAdress': 'adressBtn']" v-for="(item,index) in hotnav" v-if="index < 6">
            {{item.city}}
          </div>
        </div>
        <div v-if="hotActive.length" class="flexWrap">
          <div class="hot_detail" v-for="(item,index) in hotActive" >
            <Detail type="active" @toPublish="toPublish(item,index)" :data="item"></Detail>
          </div>
        </div>
        <p style="text-align: left;margin:20px 0;"><b @click="toActive('allActive')" style="cursor: pointer">{{allText.hotPlace[1][Lan]}}</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
			<!--精彩旅行故事-->
      <div>
        <p id="WonderStory" class="title">{{allText.story[0][Lan]}}</p>
        <div class="wonderful" style="position: relative">
          <div v-show="LoadingState2" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
            <Loading ></Loading>
          </div>
          <div class="storyMarg" v-for="(item,index) in wonderfulList" v-show="index < 8">
            <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :data="item" v-on:addZan="addZan(item,index)"></Detail>
          </div>
        </div>
        <p style="text-align: left;margin:20px 0;"><b @click="moreStory" style="cursor: pointer">{{allText.story[1][Lan]}}</b><i class="el-icon-arrow-right" style="font-weight:bold"></i></p>
      </div>
      <p  style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div class="flexStart">
        <div style="width:200px;">
          <ul>
            <li> <el-select v-model="value" @change="chooseLan" placeholder="语言(language)" style="width:150px;border: 2px solid #008489;border-radius:5px">
              <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.name"></el-option>
            </el-select></li>
            <li style="margin:20px 0;"><el-select v-model="value2" @change="chooseCurr" placeholder="货币(currency)" style="width:150px;border: 2px solid #008489;border-radius:5px">
              <el-option v-for="item in curren" :key="item.value" :label="item.label" :value="item.sT"></el-option>
            </el-select></li>
          </ul>
        </div>
        <Foot type="home" style="width:880px;"></Foot>
      </div>
      <p  style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div  style="text-align: left">
        <p style="margin:20px 0;"><a href="http://www.beian.miit.gov.cn" target="_blank">蜀ICP备19001672号</a></p>
        <p style="">眉山市人人游网络科技有限公司</p>
      </div>
			
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
      content:'',
      pubLish:'/publishPage?information=',
      islookRecent:true,
      isserchRry:true,
      ishotPlace:true,
      ishightAc:true,
      isWonderStory:true,
      isLoading:true,
      loadingActive:false,
      adressIndex:0,
      price_discount:'',
      idDiscount:true,
      dicountActList:[],
      hotActive:[],
      value: this.Store.getters.getValue,
      value2:this.Store.getters.getValue2,
      curren:[
        {value:'1',label:'CNY - ￥人民币',sT:'CNY-￥'},
        {value:'2',label:'USD - $ United States dollar',sT:'USD-$'},
        {value:'3',label:'JPY - ¥ 日本円',sT:'JPY-￥'}
      ],
      allText:{
        search:[
          {
            'zh':'搜索',
            'en':'search',
            'ja':'検索する'
          }
        ],
        mainSearch:[
          {
            'zh':'目的地,城市,地址',
            'en':'Destination, city, address',
            'ja':'目的地、都市、住所'
          }
        ],
        toSearch:[
          {
            'zh':'搜索',
            'en':'search',
            'ja':'検索する'
          }
        ],
        recentSearch:[
          {
            'zh':'最近搜索',
            'en':'Recently searched',
            'ja':'最近検索した'
          }
        ],
        recentLook:[
          {
            'zh':'最近浏览',
            'en':'Recently Viewed',
            'ja':'最近見た'
          }
        ],
        searchAllptp:[
          {
            'zh':'搜索人人耍',
            'en':'Search Allptp',
            'ja':'Allptpを検索'
          },
          
        ],
        special:[
          {
            'zh':'特惠体验',
            'en':'Special experience',
            'ja':'特別な体験'
          },
          {
            'zh':'超值优惠体验',
            'en':'Value-for-money experience',
            'ja':'お得な体験'
          },
          {
            'zh':'查看更多特惠体验',
            'en':'See more special offers',
            'ja':'特別オファーをもっと見る'
          }
        ],
        hotPlace:[
          {
            'zh':'高分目的地体验',
            'en':'High score destination experience',
            'ja':'ハイスコ​​アの目的地体験'
          },
          {
            'zh':'查看更多体验',
            'en':'See more experiences',
            'ja':'もっと体験を見る'
          }
        ],
        story:[
          {
            'zh':'精彩旅行故事',
            'en':'Wonderful travel story',
            'ja':'素晴らしい旅行物語'
          },
          {
            'zh':'显示全部',
            'en':'display all',
            'ja':'すべてを表示'
          }
        ]
      }
    }
  },
	components:{
		Head,
		Detail,
    Foot,
    Loading,
    loadingImg
  },
  computed:{
    Lan(){
      return this.Store.getters.getValue
    }
  },
  watch:{
    value(){
      window.scroll(0,0)
    },
    value2(){
      window.scroll(0,0)
    }
  },
  methods: {
     chooseLan(){
       this.Store.commit('setValue',this.value)
      },
      chooseCurr(){ 
        this.Store.commit('setValue2',this.value2)
      },
    // 新增搜索特惠体验折扣
    getDisCount(){
      this.$http.post(this.api + '/DiscountTwo',{
        token: localStorage.getItem('token'),
        verson: 2.0
      })
      .then(res=>{
        if(res.data.code == 1){
          this.price_discount = res.data.data.length?res.data.data[0].price_discount:''
          if(this.price_discount){
            this.getDisAct()
          }
      
        }else if(res.data.code == 3){
          this.getDisCount()
        }else if(res.data.code == 0){
          this.$message({type:'error',messages:res.data.msg})
        }
      })
    },
    getDisAct(){
      this.$http.post(this.api + '/ActivityListUserTwo',{
        token: localStorage.getItem('token'),
        page: 1,
        per_page: 9,
        discount: this.price_discount
      })
      .then(res=>{
        if(res.data.code == 1){
          this.dicountActList = res.data.data.data
        }else if(res.data.cdoe == 3){
          this.getDisAct()
        }else if(res.data.code == 0){
          this.$message({type:'error',message:res.data.msg})
        }
      })
    },


    toaPublish(item,index){
      this.$router.push({
        path: '/publishPage',
        query: {
          information: item.activity_id
        }
      })
    },
    toActive(val){
      // this.$router.push('/experienceCentre')
      this.$router.push({
        path: '/experienceCentre',
        query: {
          type: val
        }
      })
    },
    // getHotActive(){
    //   this.loadingActive = true
    //   this.$http.post(this.api + '/home/Activity/activ_list',{
    //     token: localStorage.getItem('token'),
    //     sort:1,
    //     page: 1
    //   })
    //     .then(res=>{
    //       if(res.data.code == 1){
    //         this.activeList = res.data.data.data
    //         this.loadingActive = false
    //       }else if(res.data.code == 3){
    //         this.getHotActive()
    //       }else if(res.data.code == 0){
    //         alert(res.data.msg)
    //       }
    //     })
    // },
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
    handleClick(item, index){
      if(this.hotIndex != item.city){
        this.hotIndex = item.city
        this.adressIndex = index
        this.getActive()
      }
    },
    toPublishH(val){
       this.$router.push({
        path: '/publishPage',
        query: {
          information: val
        }
      })
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
      // var hightAc = document.getElementById('hightAc').offsetTop
      var dicountAct = document.getElementById('dicountAct').offsetTop
      var WonderStory = document.getElementById('WonderStory').offsetTop
        let a =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(a > 533){
          this.home = false
        }else{
          this.home = true
        }
        if(hotPlace - a <= winHeight){
          if(this.ishotPlace){
            this.ishotPlace = false
            this.getHotLocal()
          }
        }
        if(WonderStory - a <= winHeight){
          if(this.isWonderStory){
            this.isWonderStory = false
            this.getStory()
          }
        }

    },
    //点赞
    addZan(item,index){
      if(item.is_praise == 0){
        this.$http.post(this.api + '/home/Comment/praise',{
          token: localStorage.getItem('token'),
          flag: 1,
          table_id: item.story_id,
          type: 1
        })
          .then(res=>{
           if(res.data.code == 1){
             item.is_praise = 1
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
              item.is_praise = 0
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
        this.$http.post(this.api + '/VisitListTwo',{
          token: localStorage.getItem('token'),
          page: 1,
          per_page:3
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              this.recentlyList = data
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
    getActive(){
      this.hotActive = []
      this.LoadingState = true
      this.$http.post(this.api + '/ActivityListUserTwo',{
        token: localStorage.getItem('token'),
        sort: 1,
        page:1,
        city: this.hotIndex,
        per_page:9
      })
        .then(res=>{
          if(res.data.code == 1){
            let data = res.data.data.data
            this.hotActive = data
            this.LoadingState = false
          }else if(res.data.code == 3){
            this.getActive()
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
             
              this.wonderfulList = data
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
      window.scroll(0,0)
      this.getBanner()
      this.getVist()
      this.getKind()
      this.sendBuidu()
      this.getDisCount()
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
              this.getActive()
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .marginR{
    margin-right:30px;
    margin-bottom: 30px;
  }
  .marginR:nth-child(3n){
    margin-right:0
  }
  .marginT{
    margin-top: 65px;
    text-align: left;
  }
  .fontTitle{
    font-size:24px;                 
  }
  .fontDescibe{
    font-size:20px;
  }
  .adressBtn{
    width:100px;
    height:50px;
    border:1px solid rgba(213,216,221,1);
    border-radius:4px;
    line-height: 50px;
    font-size:18px;
    color:#000;
    text-align: center;
    margin-right:40px;
    cursor: pointer;
  }
  .hoverAdress{
    width:100px;
    height:50px;
    background:rgba(20,197,202,1);
    border-radius:4px;
    line-height: 50px;
    font-size:18px;
    color:#fff;
    text-align: center;
    margin-right:40px;
    cursor: pointer;
  }
  .storyMarg{
    margin-right: 26px;
    margin-bottom:31px;

  }
  .storyMarg:nth-child(4n + 1){
    margin-right:0
  }
   a{
   text-decoration: none;
   color: #008489;
 }
</style>
