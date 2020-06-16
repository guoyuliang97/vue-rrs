<template>
    <div>
      <Head type="homeSearch"></Head>
      <div style="width:50px;margin-top:80px;cursor: pointer;margin-left:10%" @click="goBack"><i class="el-icon-arrow-left"></i>返回</div>
      <div style="margin:10px auto;width:1080px;">
          <div v-if="hotList.length">
            <h3 style="text-align: left;margin:20px 0;">相关活动：</h3>
            <div class="hot_list">
              <div class="hot_detail" v-for="(item,index) in hotList">
                <Detail type="active"  :data="item" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
              </div>
            </div>
            <p v-if="hotList.length == 10"  style="text-align: left;margin-top:20px;cursor: pointer"><span @click="toMore(1)"><b>查看更多</b></span></p>
          </div>
          <div v-if="wonderfulList.length">
            <h3 style="text-align: left;margin:20px 0;">相关故事：</h3>
            <div class="wonderful">
              <div class="wonderful_detail" v-for="(item,index) in wonderfulList" v-if="index < 8">
                                  <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :data="item" v-on:addZan="addZan(item,index)"></Detail>

              </div>
            </div>
            <p v-if="wonderfulList.length >= 8" style="text-align: left;margin-top:20px;cursor: pointer"><span @click="toMore(2)"><b>查看更多</b></span></p>
          </div>
          <div v-if="goodVolunteer.length">
            <h3 style="text-align: left;margin:20px 0;">相关志愿者：</h3>
            <div class="volunteer">
              <div @click="toPerson(item)" class="marginG" style="cursor: pointer" v-for="item in goodVolunteer">
                <LoadingImg style=" width: 250px;height: 235px;" type="2" :src="item.head_image?item.headimage.domain + item.headimage.image_url:''"></LoadingImg>
                <div class="text">
                  <div class="clear">
                    <div style="float:left">{{item.name}}</div>
                    <div style="float:right;font-size:12px;"><el-rate :value="parseInt(item.score)" disabled ></el-rate></div>
                  </div>
                  <div class="clear">
                    <div style="float:left">{{item.gender}}</div>
                    <div style="float:right">{{item.local}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="goodVolunteer.length >= 8" style="text-align: left;margin-top: 20px;cursor: pointer"><span @click="toMore(3)"><b>查看更多</b></span></p>
          </div>
       <div v-if="isLocal">
         <None type="local"></None>
       </div>
      </div>
      <div v-show="isLoading" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:999">
        <Loading style="position:fixed;top:50%;left:50%;"></Loading>
      </div>
    </div>
</template>

<script>
  import None from '../../public/noNumber'
  import Detail from '../../public/detail.vue'
  import Head from '../../public/head.vue'
  import Loading from '../../public/Loading'
  import test from '../../../static/js/language'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "homeSearch",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            isLoading:false,
            wonderfulList:[],
            hotList:[],
            goodVolunteer:[],
            actotal:0,
            language:[],
            isLocal:false,
            keyWord:''
          }
      },
      components:{
          Head,
        Detail,
        Loading,
        None,
        LoadingImg
      },
      methods:{
        toMore(val){
          if(val == 1){
            this.$router.push({
              path: '/experienceCentre',
              query:{
                information: this.keyWord
              }
            })
          }else if(val == 2){
            this.$router.push('/story')
          }else{
            this.$router.push('/volunteerList')
          }
        },
        goBack(){
          this.$router.go(-1)
        },
        getSearch(val){
          this.isLoading = true
          this.$http.post(this.api + '/home/Search/search',{
            token: localStorage.getItem('token'),
            keywords: this.$route.query.key,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.hotList = res.data.data.activity.data
                this.wonderfulList = res.data.data.story.data
                this.goodVolunteer = res.data.data.user.data
                this.isLoading = false
                this.actotal = res.data.data.activity.total
                if(this.hotList.length || this.wonderfulList.length || this.goodVolunteer.length){
                  this.isLocal = false
                }else{
                  this.isLocal = true
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getSearch()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
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
        addZan(item,index){
          let type = ''
          if(item.is_praise == 0){
            type = 1
          }else {
            type = 2
          }
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: 1,
            table_id: item.story_id,
            type: type
          })
            .then(res=>{
              if(res.data.code == 1){
                item.praise_num = type == 2?item.praise_num - 1:item.praise_num + 1
                item.is_praise = type == 2? 0:1
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addZan(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getStory(val){
          this.isLoading = true
          this.$http.post(this.api + '/home/Story/story_list',{
            token: localStorage.getItem('token'),
            keywords: this.$route.query.key,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.wonderfulList = res.data.data.data
                this.isLoading = false
                if(this.wonderfulList.length){
                  this.isLocal = false
                }else{
                  this.isLocal = true
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getStory(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        handleCurrentChange(val){
          if(this.$route.query.type){
            this.getStory(val)
          }else{
            this.getSearch(val)
          }
        },
        activeCurrentChange(){

        },
        userCurrentChange(){

        },
        toPublish(item,index) {
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id
            }
          })
        },
        consult(item,index) {
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
        toPerson(item){
          this.$router.push({
            path: '/userdata',
            query:{
              information: item.user_id
            }
          })
        }
      },
      mounted() {
          window.scroll(0,0)
          let _this = this
        if(this.$route.query.type == 1){
          _this.getStory(1)
        }else{
          _this.getSearch(1)
        }
      },
      created(){
          this.language = test()
        this.keyWord = this.$route.query.key
      }
    }
</script>

<style scoped>
  .hot_list{
    display: flex;
    flex-wrap:wrap;
  }
  .hot_detail{
    width: 330px;
    margin-left: 45px;
    margin-top: 20px;
  }
  .hot_detail:nth-child(3n+1){
    margin-left: 0;
  }
  .wonderful{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .wonderful_detail{
    width: 260px;
    margin-right: 13px;
    margin-top: 20px;
  }
  .wonderful_detail:nth-child(4n){
    margin-right: 0
  }
  .clear{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    margin-bottom: 30px;
  }
  .volunteer{
    width: 1080px;
    display: flex;
    flex-wrap: wrap;
  }
  .img{
    width: 250px;
    height: 235px;
  }
  .text{
    margin-top: 10px;
    overflow: hidden;
  }
  .marginG{
    margin-right: 20px;
  }
</style>
