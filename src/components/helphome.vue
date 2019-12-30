<template>
	<div>
		<Head type="helphome"></Head>
		<div class="helphome_top">
			<div class="helphome_con">
				<p class="fontweight ask_help">我们能帮上什么忙吗？</p>
				<div style="margin-top: 30px;">
					<el-input placeholder="请输入内容" size="large" v-model="helpData" class="input-with-select" style="width: 60%;">
						<el-button slot="append" icon="el-icon-search"></el-button>
					  </el-input>
				</div>
			</div>
		</div>
		<div class="helphome_nav">
			<div class="helphome_con">
				<ul>
					<li class="fontweight" :style="{color:helpIndex=='0'?'#008489':'#333333',borderBottom:helpIndex=='0'?'2px solid #008489':'none'}">旅行帮助</li>
				</ul>
			</div>
		</div>
		<div class="helphome_con">
			<p class="fontweight" style="margin-top: 60px;font-size: 30px;">有问题吗？您找对地方了</p>
			<div class="help_one">
				<div style="background:-webkit-linear-gradient(left, #660066 , #33CCCC);">
					<div class="help_onediv">
						<div class="help_divleft">
							<p class="fontweight">运作方式</p>
							<p class="fontweight">探索世界各地独具特色的风土人情</p>
						</div>
						<div class="help_divright">
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
				<div style="background-color: #33CCCC;">
					<div class="help_onediv">
						<div class="help_divleft">
							<p class="fontweight">信任与安全</p>
							<p class="fontweight">了解我们如何让所有用户放心地使用人人游平台</p>
						</div>
						<div class="help_divright">
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</div>
			<p class="fontweight" style="margin-top: 60px;font-size: 30px;">为您推荐</p>
			<div class="help_tj">
				<div>
					<p class="fontweight">预定要求</p>
					<p class="help_tjdetail">如何验证我的手机号？</p>
					<p class="help_tjdetail">为什么我没有收到电子邮件通知？</p>
					<p class="help_tjdetail">如何编辑我的账号设置或个人资料？</p>
					<p class="help_tjdetail"><span style="color:#008489">浏览全部</span></p>
				</div>
				<div>
					<p class="fontweight">身份和验证</p>
					<p class="help_tjdetail">什么是个人资料验证项？怎样才可以获取？</p>
					<p class="help_tjdetail">人人游要求我提供身份证件时该如何操作？</p>
					<p class="help_tjdetail">在人人游预订有什么要求？</p>
					<p class="help_tjdetail"><span style="color:#008489">浏览全部</span></p>
				</div>
				<div>
					<p class="fontweight">预订并支付</p>
					<p class="help_tjdetail">我什么时候会被收取预订的费用？</p>
					<p class="help_tjdetail">我可以更改待处理的预订申请吗？</p>
					<p class="help_tjdetail"><span style="color:#008489">浏览全部</span></p>
				</div>
			</div>
			
			<p class="fontweight" style="margin-top: 60px;font-size: 30px;">全部主题</p>
			<div class="all_way">
				<div>
					<div><img alt="" src="../../static/img/helphome/qizi.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">新手上路</p>
					<p class="help_tjdetail">理解体验</p>
					<p class="help_tjdetail">安全出行</p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/yuding.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">预定</p>
					<p class="help_tjdetail">预定体验</p>
					<p class="help_tjdetail">预定要求</p>
					<p class="help_tjdetail">身份证和验证</p>
					<p class="help_tjdetail">预定和支付</p>
					<p class="help_tjdetail"><span style="color:#008489">显示全部</span></p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/fukuan.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">付款</p>
					<p class="help_tjdetail">为预定付款</p>
					<p class="help_tjdetail">定价和费用</p>
					<p class="help_tjdetail">付款方式</p>
					<p class="help_tjdetail">押金</p>
					<p class="help_tjdetail">礼金券和旅行基金</p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/lvcheng.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">您的旅程</p>
					<p class="help_tjdetail">旅程相关帮助</p>
					<p class="help_tjdetail">体验相关问题</p>
					<p class="help_tjdetail">更改预订</p>
					<p class="help_tjdetail">取消预订</p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/zhanghao.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">您的账号</p>
					<p class="help_tjdetail">您的个人资料</p>
					<p class="help_tjdetail">账号安全</p>
					<p class="help_tjdetail">评价</p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/tiyan.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">发布体验</p>
					<p class="help_tjdetail">成为体验达人</p>
				</div>
				<div>
					<div><img alt="" src="../../static/img/helphome/hezuo.png"/></div>
					<p class="fontweight" style="margin-top: 15px;">合作伙伴与社区</p>
					<p class="help_tjdetail">人人游社区</p>
					<p class="help_tjdetail">邻居</p>
					<p class="help_tjdetail">摄影师和服务提供商</p>
				</div>
			</div>
			<div class="send_back">
				<p class="fontweight" style="color: #008489;cursor: pointer;">提供反馈</p>
				<div>
					<span style="cursor: pointer;">仍然需要帮助？</span>
					 <el-button type="primary">联系我们</el-button>
				</div>
			</div>
		</div>
		<div>
			<img alt="" src="https://z1.muscache.cn/airbnb/static/help/home/nitetime-c316030c2ec9d3e3a76579ffbad914a0.svg" style="margin-top:90px;"/>
		</div>
	</div>
</template>

<script>
	import Head from "../public/head.vue"
	export default {
		data() {
			return {
				helpData:"",
				activeName:"first",
				helpIndex:0
			};
		},
		components:{
			Head
		},
		methods:{
			handleClick(){
				
			}
		}
	}
</script>

<style>
.helphome_top{
	width: 100%;
	margin-top: 82px;
	height: 250px;
	background-color: #008489;
	text-align: left;
	border-top: 1px solid #008489;
}
.helphome_con{
	width: 1080px;
	margin: 0 auto;
	text-align: left;
}
.ask_help{
	color: white;
	font-size: 40px;
	margin-top: 50px;
}
.helphome_nav{
	height: 70px;
	background-color: white;
	box-shadow:0 2px 3px -1px #dcdcdc
}
.helphome_con ul{
	height: 100%;
}
.helphome_con ul li{
	height: 100%;
	float: left;
	margin-left: 15px;
	line-height: 70px;
}
.helphome_con ul li:nth-child(1){
	margin-left: 0;
}
.help_one{
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
	padding-bottom: 30px;
	border-bottom: 1px solid #dcdcdc;
}
.help_one>div{
	width: 525px;
	height: 150px;
	cursor: pointer;
}
.help_onediv{
	width: 480px;
	margin: 0 auto;
	height: 70px;
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
}
.help_divleft p{
	height: 35px;
	line-height: 35px;
	text-align: left;
	color: white;
}
.help_divright{
	line-height: 70px;
	color: white;
	font-size: 30px;
}
.help_tj{
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
	padding-bottom: 30px;
	border-bottom: 1px solid #dcdcdc;
}
.help_tj>div{
	width: 340px;
	margin-left: 30px;
}
.help_tj>div:nth-child(1){
	margin-left: 0;
}
.help_tjdetail{
	margin-top: 15px;
	cursor: pointer;
	border: none;
}
.help_tjdetail:hover{
	color: #008489;
}
.all_way{
	display: flex;
	margin-top: 10px;
	flex-wrap:wrap;
	padding-bottom: 30px;
	border-bottom: 1px solid #dcdcdc;
}
.all_way>div{
	width: 340px;
	margin-left: 30px;
	text-align: left;
	margin-top: 30px;
}
.all_way>div:nth-child(3n+1){
	margin-left: 0;
}
.send_back{
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
}
</style>
