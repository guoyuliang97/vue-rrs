<template>
		<div class="slider">
			<div class="slider_top">
				<div class="slider_con">
					<div></div>
					<div class="fontweight">人人耍帮助</div>
					<div style="font-size: 20px;"><i class="el-icon-close" style="cursor: pointer;" @click="delslider"></i></div>
				</div>
			</div>
			<div class="slider_hidden">
				<div>
					<el-input placeholder="提问或使用关键词搜索" style="margin-top: 20px;" v-model="searchData" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
				<p style="font-size: 12px;margin-top: 30px;" class="fontweight">建议的话题</p>
				<div style="margin-top: 30px;overflow-x: hidden;">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item name="1">
							<template slot="title">
							 预订申请 <i class="header-icon el-icon-info"></i>
							</template>
							<div style="width: 95%;">
								<el-collapse v-model="activeNamesOne" style="border: none;">
									<el-collapse-item title="我可以替好友或家人预订活动体验吗？" name="1">
										<p class="small_slidertxt"><i class="el-icon-check"></i> 与其代他人预订体验，不妨邀请对方使用人人耍平台。如果想邀请好友使用人人耍平台，您可以直接从控制面板点击邀请好友按钮即可。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> 受邀好友或家人成功完成一笔合资格的预订后，您将获得旅行基金和我们平台对该笔交易10%服务费中20%的提成。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> 详情请查看<span style="color:#008489;cursor: pointer" @click="toTrav">旅行基金</span></p>
									</el-collapse-item>
									<el-collapse-item title="预订活动体验前可以参观吗？" name="2">
										<p class="small_slidertxt"><i class="el-icon-check"></i> 我们鼓励所有策划人和活动参加者在见面之前先通过我们的网站完成预订程序，以确保双方的安全与隐私。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> 不用参观活动也有多种方式可以了解活动体验和策划人，包括：</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> 发送私人消息</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> 个人资料验证</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> 评价</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> 已验证照片</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> 策划人在网站上接受预订之前也需要提供有关他们自己的信息提供。</p>
									</el-collapse-item>
									<el-collapse-item title="策划人可以有多少时间回复我的预订申请？" name="3">
										<p class="small_slidertxt"><i class="el-icon-check"></i> 您无需等待策划人回复您的预定申请。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>当您预定某体验活动，并支付了该订单。那么您就可以去参加该体验活动。有任何问题都可以通过线上的实时聊天工具联系策划人进行咨询。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>注：在支付该订单前，为了整个平台的安全运作，您将被请求完成个人身份验证后才可支付该订单。已经完成了个人身份验证的游客则无需再次进行验证。</p>
									</el-collapse-item>
									<el-collapse-item title="如何提交预订申请？" name="4">
										<p class="small_slidertxt"><i class="el-icon-check"></i>  如果您已经准备好预订人人耍的某个体验，便可以给策划人发送申请来进行预订。如果您对体验或者体验的可订状态不确定，也可以给策划人发消息。</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> 要发送预订申请，请按以下步骤操作：</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>
											1.	在活动体验页面上点击“查看日期”，进入日历完成步骤4之后，您的预订将会自动确认。<br/>
											2.	检查您的预订信息，确保准确无误。<br/>
											3.	添加支付信息（可使用微信，支付宝和信用卡）<br/>
											4.	支付该订单，完成。<br/>
										</p>
									</el-collapse-item>
								</el-collapse>
							</div>

						</el-collapse-item>
						<el-collapse-item name="2">
							<template slot="title">
							联系策划人 <i class="header-icon el-icon-info"></i>
							</template>
							<div><b>1.下订单之前</b></div>
							<div>在您想联系的策划人的活动页面处有联系策划人的字样，点击则会出现实时聊天框。您与策划人的聊天记录会一直被保留着。</div>
      <div><b>2.下订单后</b></div>
              <div>您可以在同上的地方或我的旅程-还未体验的活动处联系对应的策划人。</div>
						</el-collapse-item>
						<el-collapse-item title="何为志愿者" name="3">
							<div>所谓志愿者是指无偿热心的去帮助他人的人们。</div>
							<div>在我们人人耍平台上的志愿者主要是无偿去帮助策划人们解决接待外国活动体验者们时的语言交流问题。同理策划人们也需要无偿的提供饮食和住宿等。</div>
						</el-collapse-item>
						<el-collapse-item title="价格与费用" name="4">
							<div>在人人耍平台上的体验活动都有一个价格，这个价格（包含服务费）由策划人来设定。</div>
							<div>我们平台目前只面向策划人收取10%的服务费，此服务费用于平台的运营，宣传，交税和服务费中的20%给亲密好友上家的提成。</div>
							<div>对于购买旅游体验产品的游客不收取任何其它费用。</div>
						</el-collapse-item>
						<el-collapse-item title="为旅程做准备" name="5">
							<div>当您的旅程即将到来时，事先检查下您所预定的体验活动是否有需要您提前准备的东西。确认该体验活动的集合地点位置。</div>
							<div>最后提醒大家出门在外愉快的参加体验活动的同时也需注意安全。</div>
						</el-collapse-item>
						<el-collapse-item title="更改和取消" name="6">
							<div>现目前暂不支持更改您的预定。如果您的行程有变，需要更改到另外一天去参加您已经预定的体验活动，您可以提前联系策划人咨询解决方案。</div>
							<div>如您的行程有变，需要取消您已经预定的体验活动。您可以点击头像在交易中心-待体验订单处点击对应订单然后点击退款即可。</div>
              <div>
                如果您提交退款申请的时间符合该体验活动的退款政策，则该退款申请马上即可成功退款。</div>
              <div>
                如果您提交退款申请的时间不符合该体验活动的退款政策，则该笔退款申请会自动提交给该策划人，该策划人必须在3天内回复您的申请，如果超过3天未回复您的退款申请，则您会得到全额的退款。</div>
              <div>  在策划人的退款申请列表中，他可以对您的退款申请选择拒绝，同意和退一部分。</div>
						</el-collapse-item>
						<el-collapse-item title="解决问题" name="7">
							<div>如您有任何关于您所下订单的问题，可以随时联系人人耍平台来协助您解决问题。</div>
							<div>我们的客服电话是： </div>
							<div>客服服务时间：星期一 ~星期五 09:00~17:00 </div>
							<div>如您在客服服务时间外想联系我们来解决您所下订单的问题，请对您所下订单提交纠纷，如此我们即可在客服服务时间内帮您解决问题。</div>
							<div>如何提交纠纷，点击右上角我的头像-交易中心-某订单详情-提交纠纷即可。</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
			<div style="height: 100px;position: absolute;width: 320px;left: 15px;bottom: 0;border-top: 1px solid #dcdcdc;">
				<el-button type="primary" style="width: 100%;margin-top: 15px;">访问帮助中心</el-button>
				<p style="text-align: center;margin-top: 10px;color: #008489;cursor: pointer;">提供反馈</p>
			</div>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				searchData:"",
				activeNames:[],
				activeNamesOne:[]
			};
		},
		methods:{
			handleChange(){
				
			},
			delslider(){
				this.$emit('delslider')
			},
      toTrav(){
			  this.$router.push('/travelfunds')
      }
		}
	}
</script>

<style>
.slider{
	width: 350px;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 998;
	background-color: white;
	transition: all .2s linear;
	box-shadow:-2px 0 3px -1px #dcdcdc
}
.slider_top{
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #dcdcdc;
	text-align: center;
}
.slider_con{
	width: 320px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.slider_hidden{
	width: 320px;
	left: 15px;
	position: absolute;
	top: 60px;
	bottom:100px;
	left: 15px;
	overflow: auto;
	text-align: left;
}
.big_slidertitle{
	font-size: 16px;
	margin-top: 10px;
}
.small_slidertxt{
	font-size: 12px;
	margin-top: 5px;
}
</style>
