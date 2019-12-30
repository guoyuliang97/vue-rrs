<template>
	<div>
		<Head type="help"  v-on:getVal="getVal"  :content="editSearch"  v-on:search="searchHome"></Head>
		<div class="terms_con">
			<div class="terms_left">
				<el-breadcrumb separator="/" >
				  <el-breadcrumb-item><span style="color:#000;cursor: pointer;" @click="toHelphome">Help home</span></el-breadcrumb-item>
				  <el-breadcrumb-item><span style="color:#000;cursor: pointer;">旅行帮助</span></el-breadcrumb-item>
				  <el-breadcrumb-item><span style="color:#008489;cursor: pointer;" @click="policy('/policy')">条款与政策</span></el-breadcrumb-item>
				</el-breadcrumb>
				<el-menu
				  :default-active="activeIndex"
				  class="el-menu-vertical-demo"
				  @open="handleOpen"
				  @close="handleClose" style="text-align: left;margin-top: 20px;padding: 0;border: none;">
				  <el-submenu index="1">
					<template slot="title">
					  <span class="fontweight">新手上路</span>
					</template>
					<el-menu-item-group>
					  <el-menu-item index="1-1" @click="policy('/terms1-1')">理解体验</el-menu-item>
					  <el-menu-item index="1-2" @click="policy('/terms1-2')">安全出行</el-menu-item>
					</el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="2">
				  <template slot="title">
				  	<span class="fontweight">预定</span>
				  </template>
				  <el-menu-item-group>
				  	<el-menu-item index="2-1" @click="policy('/terms2-1')" >预订体验 </el-menu-item>
					<el-menu-item index="2-3" @click="policy('/terms2-3')">身份和验证 </el-menu-item>
					<el-menu-item index="2-4" @click="policy('/terms2-4')">预订和支付 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="3">
				  <template slot="title">
				  <span class="fontweight">付款，收款和退款</span>
				  </template>
				  <el-menu-item-group>
				  <el-menu-item index="3-1" @click="policy('/terms3-1')">付款 </el-menu-item>
				  <el-menu-item index="3-2" @click="policy('/terms3-2')">收款 </el-menu-item>
				  <el-menu-item index="3-3" @click="policy('/terms3-3')">退款 </el-menu-item>
				  <el-menu-item index="3-4" @click="policy('/terms3-4')">旅行基金 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="4">
				  <template slot="title">
				  <span class="fontweight">您的旅程 </span>
				  </template>
				  <el-menu-item-group>
				  <el-menu-item index="4-1" @click="policy('/terms4-1')">体验相关问题 </el-menu-item>
				  <el-menu-item index="4-2" @click="policy('/terms4-2')">策划人取消预订 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="5">
				  <template slot="title">
				  <span class="fontweight">您的账号  </span>
				  </template>
				  <el-menu-item-group>
				  <el-menu-item index="5-1" @click="policy('/terms5-1')">您的个人资料 </el-menu-item>
				  <el-menu-item index="5-2" @click="policy('/terms5-2')">账号安全 </el-menu-item>
				  <el-menu-item index="5-3" @click="policy('/terms5-3')">评价 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="6">
				  <template slot="title">
				  <span class="fontweight">发布活动体验</span>
				  </template>
				  <el-menu-item-group>
				  <el-menu-item index="6-1" @click="policy('/terms6-1')">发布活动体验 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="7">
				  <template slot="title">
				  <span class="fontweight" >面对策划人的服务</span>
				  </template>
				  <el-menu-item-group>
				  <el-menu-item index="7-1" @click="policy('/terms7-1')">面对策划人的服务 </el-menu-item>
				  </el-menu-item-group>
				  </el-submenu>
				</el-menu>
			</div>
			<div class="terms_right">
				<router-view></router-view>
			</div>
		</div>
		<div style="width: 1080px;margin: 0 auto;margin-top: 30px;">
			<p style="color: #008489;text-align: left;" class="fontweight"><span style="cursor: pointer;">提供反馈</span></p>
		</div>
	</div>
</template>

<script>
  import Head from "../public/head.vue"
	export default {
		data() {
			return {
				activeIndex:'',
        editSearch:'搜索',
        content:'',
			};
		},
		components:{
			Head
		},
		methods:{
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
			toHelphome(){
			},
			handleOpen(){
			},
			handleClose(){
			},
      policy(router){
        this.$router.push(router)
      }
		},
    mounted() {
      window.scroll(0,0)
    }

  }
</script>

<style>
.terms_con{
	width: 1080px;
	margin: 0 auto;
	margin-top: 112px;
	display: flex;
	justify-content: space-between;
	padding-bottom: 60px;
	border-bottom: 1px solid #dcdcdc;
}
.terms_left{
	width: 260px;
}
.terms_right{
	width: 800px;
	text-align: left;
	margin-top: 35px;
}
</style>
