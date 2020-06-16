<template>
	<div class="wonderful_con">
    <div v-show="recommendedList.length">
      <p class="title">推荐搜索</p>
      <div class="recommended_list">
        <div class="recommended_detail" v-for="(item,index) in recommendedList" v-if="index<6" :style="{backgroundImage:'url('+item.img+')',backgroundSize:'100% 100%'}">
          <div class="recommended_bg fontweight" @click="toSearch(item)">
            <p class="recommended_name">{{item.city}}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="wonderfulList.length">
      <p class="title">精选故事</p>
      <div class="select_list">
        <div class="select_detail" v-for="(item,index) in wonderfulList">
                      <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :data="item" v-on:addZan="addZan(item,index)"></Detail>

        </div>
      </div>
    </div>
    <Loading v-show="loadingState" ></Loading>
		<div v-show="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:999;">
      <Loading style="position:fixed;top:50%;left:50%;z-index:9999"></Loading>
    </div>
    <div v-if="!wonderfulList.length">
      <None type='story'></None>
    </div>
    <p v-if="request" style="font-size:12px;margin:30px 0;">············没有更多故事了！快去发布吧！············</p>
	</div>
</template>

<script>
  import None from '../../public/noNumber'
  import Bus from '../../assets/eventBus'
  import Loading from '../../public/Loading'
	import Detail from "../../public/detail.vue"
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
        img:'./static/img/home/1.jpg',
				recommendedList:[],
        wonderfulList:[],
        isLoading:false,
        loadingState:false,
        page:1,
        request:false,
			};
		},
		components:{
			Detail,
      Loading,
      None
		},
    methods:{
      getStory(val){
        this.$http.post(this.api + '/home/Story/story_list',{
          token: localStorage.getItem('token'),
          sort:2,
          page:val,
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              for(let i = 0;i<data.length;i++){
               this.wonderfulList.push(data[i])
              }
              if(!data.length){
                this.request = true
              }else{
                this.request = false
              }
              this.isLoading = false
              this.loadingState = false

            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/Index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getStory(val)
                })
            }else{
              alert(res.data.msg)
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
      toStory(item,index){
        this.$router.push({
          path: '/storyPage',
          query:{
            information: item.story_id
          }
        })
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
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addZan(item,index)
                  })
              }else{
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
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addZan(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        }
      },
      onScroll(){
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollHeight == scrollTop+windowHeight){
          //写后台加载数据的函数
          if(!this.request){
            this.loadingState = true
            this.page += 1
            this.getStory(this.page)
          }
        }
      },
      getHotLocal() {
        this.$http.post(this.api + '/PopularCityStory',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.recommendedList = res.data.data
              Bus.$emit('hotPlace',res.data.data)
            }else if(res.data.code == 3){

            }else{
              alert(res.data.msg)
            }
          })
      },
      toSearch(item) {
        this.$router.push({
          name: 'homeSearch',
          query:{
            key: item.city,
            type:1
          }
        })
      },
    },
    mounted() {
      window.addEventListener('scroll',this.onScroll)
		  this.isLoading = true
		  this.getStory(this.page)
      this.getHotLocal()
    },
    destroyed(){
      window.removeEventListener('scroll',this.onScroll)
    }
  }
</script>

<style>
@import url('../../../static/css/wonderful.css')
</style>
