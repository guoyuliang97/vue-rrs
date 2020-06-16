<template>
	<div>
		<Head type="story"></Head>
		<div class="story_content">
			<!--显示的内容区域-->
			<div v-show="!isBasic" class="animated fadeIn">
				<div class="story_top">
					<p class="fontweight">故事</p>
					<div @click="sosuo">搜索故事 <img alt="" src="../../static/img/story/strorySearch.png" /></div>
				</div>
				<el-menu :default-active="activeIndex" class="el-menu-demo story_tabs" mode="horizontal" @select="handleSelect">
					<el-menu-item index="1"><span :style="{color:activeIndex=='1'?'#14c5ca':'#333333'}">精选故事</span></el-menu-item>
					<el-menu-item index="2"><span :style="{color:activeIndex=='2'?'#14c5ca':'#333333'}">户外活动</span></el-menu-item>
					<el-menu-item index="3"><span :style="{color:activeIndex=='3'?'#14c5ca':'#333333'}">少数民族</span></el-menu-item>
					<el-menu-item index="4"><span :style="{color:activeIndex=='4'?'#14c5ca':'#333333'}">本土文化</span></el-menu-item>
				</el-menu >
			
				<div>
					<router-view></router-view>
				</div>
			</div>
			<!--输入搜索的内容区域-->
			<div v-show="isBasic" class="animated fadeIn">
				<div class="story_search">
					<div>
						<input type="text" v-model="search" @keydown.enter="toSearch" placeholder="请输入搜索内容"/>
					</div>
					<div>
						<span style="cursor: pointer;" @click="isBasic=false"><i class="el-icon-close"></i></span>
					</div>
				</div>
				<div class="story_hot">
					<p>热门目的地</p>
					<div class="story_hotlist animated fadeIn" >
						<div class="story_hotdetail" @click="searchStory(item)" v-for="item in hotList">
							<div class="story_avator" :style="{backgroundImage:'url('+img+')',backgroundSize:'100% 100%'}"></div>
							<p>{{item.city}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from "../public/head.vue"
  import Bus from '../assets/eventBus'
	export default {
		data() {
			return {
				activeIndex:'1',
				isBasic:false,
        img:'./static/img/home/4.jpg',
				hotList:[],
        search:''
			};
		},
		components:{
			Head,
		},
		methods:{
		  sosuo(){
		    this.isBasic = !this.isBasic
      },
			handleSelect(key){
				this.activeIndex=key;
				if(key=='1'){
					this.$router.push('/wonderful')
				}else if(key=='2'){
					this.$router.push('/outdoor')
				}else if(key=='3'){
					this.$router.push('/ethnic')
				}else if(key=='4'){
					this.$router.push('/local')
				}
			},
      toSearch(){
        this.$router.push({
          name: 'homeSearch',
          query:{
            key: this.search,
            type:1
          }
        })
      },
      searchStory(item,index){
        this.$router.push({
          name: 'homeSearch',
          query:{
            key: item.city,
            type:1
          }
        })
      }
		},
    mounted() {
		  window.scroll(0,0)
      Bus.$on('hotPlace',(msg)=>{
        this.hotList = msg
      })
    },
    destroyed(){

    }
  }
</script>

<style>
@import url('../../static/css/story.css')
</style>
