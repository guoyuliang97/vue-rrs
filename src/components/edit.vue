<template>
	<div>
		<Head type="edit" v-on:getVal="getVal"  :content="editSearch" v-on:search="searchHome"></Head>
		<div class="edit_con">
			<div class="edit_nav">
				<div class="edit_navdetail" @click="toEditdata" :style="{color:navIndex=='0'?'#008489':'rgb(118, 118, 118)',fontWeight:navIndex=='0'?'bold':'normal'}">编辑个人资料</div>
				<div class="edit_navdetail" @click="toEditphoto" :style="{color:navIndex=='1'?'#008489':'rgb(118, 118, 118)',fontWeight:navIndex=='1'?'bold':'normal'}">照片</div>
				<div class="edit_navdetail" @click="toEditcheck" :style="{color:navIndex=='2'?'#008489':'rgb(118, 118, 118)',fontWeight:navIndex=='2'?'bold':'normal'}">信任与验证</div>
<!--				<div class="edit_navdetail" @click="toEditevaluation" :style="{color:navIndex=='3'?'#008489':'rgb(118, 118, 118)',fontWeight:navIndex=='3'?'bold':'normal'}">评价</div>-->
				<div class="look_data fontweight" @click="toUserdata">查看个人资料</div>
			</div>
			<div class="edit_container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from "../public/head.vue"
	export default {
		data() {
			return {
				navIndex:0,
        editSearch:'搜索',
        content:''
			};
		},
		components:{
			Head
		},
		methods:{
      searchHome(){
        this.$router.push({
          name: 'homeSearch',
          query:{
            key: this.content,
            type:0
          }
        })
      },
      getVal(msg){
        this.content = msg
      },
			toEditdata(){
				this.navIndex=0;
				this.$router.push('/editdata');
				localStorage.setItem('editIndex',this.navIndex);
				localStorage.setItem('editRouter','/editdata')
			},
			toEditphoto(){
				this.navIndex=1;
				this.$router.push('/editphoto');
				localStorage.setItem('editIndex',this.navIndex)
				localStorage.setItem('editRouter','/editphoto')
			},
			toEditcheck(){
				this.navIndex=2;
				this.$router.push('/editcheck');
				localStorage.setItem('editIndex',this.navIndex)
				localStorage.setItem('editRouter','/editcheck')
			},
		/*	toEditevaluation(){
				this.navIndex=3;
				this.$router.push('/editevaluation');
				localStorage.setItem('editIndex',this.navIndex);
				localStorage.setItem('editRouter','/editevaluation')
			},*/
			toUserdata(){
				this.$router.push('/userdata');
			},
		},
		mounted(){
		  window.scroll(0,0)
			let editIndex=localStorage.getItem('editIndex');
			let editRouter=localStorage.getItem('editRouter')
			if(editIndex){
				this.navIndex=editIndex
			}else{
				this.editIndex=0
			}
			if(editRouter){
				this.$router.push(editRouter)
			}
		},
		destroyed(){
			localStorage.setItem('editIndex','0');
			localStorage.setItem('editRouter','/editdata')
		}
  }
</script>

<style>
@import url('../../static/css/edit.css')
</style>
