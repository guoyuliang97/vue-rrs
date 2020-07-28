<template>
	<div>
		<Head type="story"></Head>
		<div class="story_content">
			<!--显示的内容区域-->
			<div v-show="!isBasic" class="animated fadeIn">
				<div class="story_top">
					<p class="fontweight">{{allText.title[0][Lan]}}</p>
					<div @click="sosuo">{{allText.title[1][Lan]}} <img alt="" src="../../static/img/story/strorySearch.png" /></div>
				</div>
				<el-menu :default-active="activeIndex" class="el-menu-demo story_tabs" mode="horizontal" @select="handleSelect">
					<el-menu-item index="1"><span :style="{color:activeIndex=='1'?'#14c5ca':'#333333'}">{{allText.title[2][Lan]}}</span></el-menu-item>
					<el-menu-item index="2"><span :style="{color:activeIndex=='2'?'#14c5ca':'#333333'}">{{allText.title[3][Lan]}}</span></el-menu-item>
					<el-menu-item index="3"><span :style="{color:activeIndex=='3'?'#14c5ca':'#333333'}">{{allText.title[4][Lan]}}</span></el-menu-item>
					<el-menu-item index="4"><span :style="{color:activeIndex=='4'?'#14c5ca':'#333333'}">{{allText.title[5][Lan]}}</span></el-menu-item>
				</el-menu >
			
				<div>
					<router-view></router-view>
				</div>
			</div>
			<!--输入搜索的内容区域-->
			<div v-show="isBasic" class="animated fadeIn">
				<div class="story_search">
					<div>
						<input type="text" v-model="search" @keydown.enter="toSearch" :placeholder="allText.title[6][Lan]"/>
					</div>
					<div>
						<span style="cursor: pointer;" @click="isBasic=false"><i class="el-icon-close"></i></span>
					</div>
				</div>
				<div class="story_hot">
					<p>{{allText.title[7][Lan]}}</p>
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
				search:'',
				allText:{
					title:[
						{
							'zh':'故事',
							'en':'story',
							'ja':'物語'
						},
						{
							'zh':'搜索故事',
							'en':'Search stories',
							'ja':'ストーリーを検索'
						},
						{
							'zh':'精选故事',
							'en':'Featured stories',
							'ja':'特集記事'
						},
						{
							'zh':'户外活动',
							'en':'Outdoor activities',
							'ja':'野外活動'
						},
						{
							'zh':'少数民族',
							'en':'minority',
							'ja':'少数'
						},
						{
							'zh':'本土文化',
							'en':'local culture',
							'ja':'地域文化'
						},
						{
							'zh':'请输入搜索内容',
							'en':'Enter search content',
							'ja':'検索内容を入力'
						},
						{
							'zh':'热门目的地',
							'en':'Popular destination',
							'ja':'人気の目的地'
						},
						{
							'zh':'推荐搜索',
							'en':'Recommended search',
							'ja':'おすすめの検索'
						},
					]
				}
			};
		},
		components:{
			Head,
		},
		computed:{
			Lan(){
				return this.Store.getters.getValue
			}
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
