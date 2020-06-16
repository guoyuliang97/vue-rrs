<template>
	<div>
		<Head type="edit" v-on:getVal="getVal"  :content="editSearch"   v-on:search="searchHome"></Head>
		<div class="account_con title_flex">
			<div class="account_nav">
				<div class="account_navdetail" @click="changeAccoutnav('0','/notice')" :style="{color:accountNav=='0'?'#14c5ca':'rgb(118, 118, 118)',fontWeight:accountNav=='0'?'bold':'normal'}">通知</div>
				<div class="account_navdetail" @click="changeAccoutnav('2','/collection')" :style="{color:accountNav=='2'?'#14c5ca':'rgb(118, 118, 118)',fontWeight:accountNav=='2'?'bold':'normal'}">收款方式</div>
				<div class="account_navdetail" @click="changeAccoutnav('4','/security')" :style="{color:accountNav=='4'?'#14c5ca':'rgb(118, 118, 118)',fontWeight:accountNav=='4'?'bold':'normal'}">安全</div>
				<div class="account_navdetail" @click="changeAccoutnav('6','/setting')" :style="{color:accountNav=='6'?'#14c5ca':'rgb(118, 118, 118)',fontWeight:accountNav=='6'?'bold':'normal'}">设置</div>
				<div class="account_navdetail" @click="changeAccoutnav('7','/badge')" :style="{color:accountNav=='7'?'#14c5ca':'rgb(118, 118, 118)',fontWeight:accountNav=='7'?'bold':'normal'}">徽章</div>
				<div class="funds_btn fontweight" @click="toTravelfunds">旅行基金</div>
			</div>
			<div class="account_container">
				<router-view v-on:changesetting="changesetting"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from "../public/head.vue"
	export default {
		data() {
			return {
				accountNav:'0',
        editSearch:'搜索',
        content:''
			};
		},
		components:{
			Head
		},
		methods:{
			changeAccoutnav(navindex,router){
				this.accountNav=navindex;
				this.$router.push(router);
				localStorage.setItem('accountNav',this.accountNav);
				localStorage.setItem('accountRouter',router)
			},
			toTravelfunds(){
				this.$router.push('/travelfunds')
			},
			changesetting(msg){
				this.accountNav=msg;
				localStorage.setItem('accountNav',this.accountNav);
			},
      getVal(msg){
        this.content = msg
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
		},
		mounted(){
			let accountIndex=localStorage.getItem('accountNav');
			let accountRouter=localStorage.getItem('accountRouter');
			if(accountIndex){
				this.accountNav=accountIndex;
			}else{
				this.accountNav="0"
			}
			if(accountRouter){
				this.$router.push(accountRouter)
			}else{
				this.$router.push('/account')
			}
		},
		destroyed(){
			localStorage.setItem('accountNav','0');
			localStorage.setItem('accountRouter','/account');
		},

	}
</script>

<style>
@import url('../../static/css/account.css')
</style>
