<template>
		<div class="slider">
			<div class="slider_top">
				<div class="slider_con">
					<div></div>
					<div class="fontweight">{{allText.title[0][Lan]}}</div>
					<div style="font-size: 20px;"><i class="el-icon-close" style="cursor: pointer;" @click="delslider"></i></div>
				</div>
			</div>
			<div class="slider_hidden">
<!--				<div>
					<el-input placeholder="提问或使用关键词搜索" style="margin-top: 20px;" v-model="searchData" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>-->
				<p style="font-size: 12px;margin-top: 30px;" class="fontweight">{{allText.title[1][Lan]}}</p>
				<div style="margin-top: 30px;overflow-x: hidden;">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item name="1">
							<template slot="title">
							 {{allText.q[0][Lan]}} <i class="header-icon el-icon-info"></i>
							</template>
							<div style="width: 95%;">
								<el-collapse v-model="activeNamesOne" style="border: none;">
									<el-collapse-item  :title="allText.q[1][Lan]" name="1">
										<p class="small_slidertxt"><i class="el-icon-check"></i>{{allText.answer[0][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[1][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[2][Lan]}}<span style="color:#008489;cursor: pointer" @click="toTrav">{{allText.answer[3][Lan]}}</span></p>
									</el-collapse-item>
									<el-collapse-item  :title="allText.q[2][Lan]" name="2">
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[4][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[5][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> {{allText.answer[6][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> {{allText.answer[7][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> {{allText.answer[8][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-caret-right"></i> {{allText.answer[9][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[10][Lan]}}</p>
									</el-collapse-item>
									<el-collapse-item  :title="allText.q[3][Lan]" name="3">
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[11][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>{{allText.answer[12][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>{{allText.answer[13][Lan]}}</p>
									</el-collapse-item>
									<el-collapse-item :title="allText.q[4][Lan]" name="4">
										<p class="small_slidertxt"><i class="el-icon-check"></i>  {{allText.answer[14][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i> {{allText.answer[15][Lan]}}</p>
										<p class="small_slidertxt"><i class="el-icon-check"></i>
											1.	{{allText.answer[15][Lan]}}<br/>
											2.	{{allText.answer[16][Lan]}}<br/>
											3.	{{allText.answer[17][Lan]}}<br/>
											4.	{{allText.answer[18][Lan]}}<br/>
										</p>
									</el-collapse-item>
								</el-collapse>
							</div>

						</el-collapse-item>
						<el-collapse-item name="2">
							<template slot="title">
							{{allText.q[5][Lan]}} <i class="header-icon el-icon-info"></i>
							</template>
							<div><b>1.{{allText.answer[19][Lan]}}</b></div>
							<div>{{allText.answer[20][Lan]}}</div>
							<div><b>2.{{allText.answer[21][Lan]}}</b></div>
							<div>{{allText.answer[22][Lan]}}</div>
						</el-collapse-item>
						<el-collapse-item :title="allText.q[6][Lan]" name="3">
							<div>{{allText.answer[23][Lan]}}</div>
							<div>{{allText.answer[24][Lan]}}</div>
						</el-collapse-item>
						<el-collapse-item :title="allText.q[7][Lan]" name="4">
							<div>{{allText.answer[25][Lan]}}</div>
							<div>{{allText.answer[26][Lan]}}</div>
							<div>{{allText.answer[27][Lan]}}</div>
						</el-collapse-item>
						<el-collapse-item :title="allText.q[8][Lan]" name="5">
							<div>{{allText.answer[28][Lan]}}</div>
							<div>{{allText.answer[29][Lan]}}</div>
						</el-collapse-item>
						<el-collapse-item :title="allText.q[9][Lan]" name="6">
							<div>{{allText.answer[30][Lan]}}</div>
							<div>{{allText.answer[31][Lan]}}</div>
							<div>
								{{allText.answer[32][Lan]}}</div>
							<div>
								{{allText.answer[33][Lan]}}</div>
							<div>  {{allText.answer[34][Lan]}}</div>
						</el-collapse-item>
						<el-collapse-item :title="allText.q[10][Lan]" name="7">
							<div>{{allText.answer[35][Lan]}}</div>
							<div>{{allText.answer[36][Lan]}} </div>
							<div>{{allText.answer[37][Lan]}}</div>
							<div>{{allText.answer[38][Lan]}}</div>
							<div>{{allText.answer[39][Lan]}}</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
			<div style="height: 100px;position: absolute;width: 320px;left: 15px;bottom: 0;border-top: 1px solid #dcdcdc;">
<!--				<el-button type="primary" style="width: 100%;margin-top: 15px;">访问帮助中心</el-button>
				<p style="text-align: center;margin-top: 10px;color: #008489;cursor: pointer;">提供反馈</p>-->
			</div>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				searchData:"",
				activeNames:[],
				activeNamesOne:[],
				allText:{
					title:[
						{
							'zh':'人人耍帮助',
							'en':'Allptp helps',
							'ja':'Allptpヘルプ'
						},
						{
							'zh':'建议的话题',
							'en':'Suggested topic',
							'ja':'提案する話題'
						},
					],
					q:[
						{
							'zh':'预订申请',
							'en':'booking',
							'ja':'予約申し込み'
						},
						{
							'zh':'我可以替好友或家人预订活动体验吗？',
							'en':'Can I book an event for a friend or family member?',
							'ja':'友人や家族の予約をしていただけませんか?'

						},
						{	
							'zh':'预订活动体验前可以参观吗？',
							'en':'Can I visit before booking an event experience?',
							'ja':'イベント体験を予約する前に訪問できますか？'
						},
						{
							'zh':'策划人可以有多少时间回复我的预订申请？',
							'en':'How much time can the planner reply to my booking application?',
							'ja':'プランナーが私の予約アプリケーションにどのくらいの時間応答できますか？'
						},
						{
							'zh':'如何提交预订申请？',
							'en':'How to submit a reservation application?',
							'ja':'予約申込書を提出するには？'
						},
						{
							'zh':'联系策划人',
							'en':'Contact planner',
							'ja':'お問い合わせプランナー'
						},
						{
							'zh':'何为志愿者',
							'en':'What is a volunteer',
							'ja':'ボランティアとは'
						},
						{
							'zh':'价格与费用',
							'en':'Prices and fees',
							'ja':'価格と手数料'
						},
						{
							'zh':'为旅程做准备',
							'en':'Prepare for the journey',
							'ja':'旅の準備'
						},
						{
							'zh':'更改和取消',
							'en':'Change and cancel',
							'ja':'変更してキャンセル'
						},
						{
							'zh':'解决问题',
							'en':'Solve the problem',
							'ja':'問題を解く'
						}
					],
					answer:[
						{
							'zh':'与其代他人预订体验，不妨邀请对方使用人人耍平台。如果想邀请好友使用人人耍平台，您可以直接从控制面板点击邀请好友按钮即可。',
							'en':'Instead of booking the experience on behalf of others, you may wish to invite the other party to use the platform for everyone. If you want to invite friends to use the platform for everyone, you can just click the invite friends button from the control panel.',
							'ja':'他のユーザーに代わってエクスペリエンスを予約するのではなく、すべての人のためにプラットフォームを使用するように相手を招待することができます。 友達を招待して全員のプラットフォームを使用したい場合は、コントロールパネルの[友達を招待]ボタンをクリックするだけです。'
						},
						{
							'zh':'受邀好友或家人成功完成一笔合资格的预订后，您将获得旅行基金和我们平台对该笔交易10%服务费中20%的提成。',
							'en':'After an invited friend or family member successfully completes an eligible reservation, you will receive a 20% commission on the 10% service charge for the transaction by the Travel Fund and our platform.',
							'ja':'招待された友人または家族が対象となる予約を無事に完了すると、旅行基金と当社のプラットフォームによるトランザクションの10％のサービス料に対して20％のコミッションが支払われます。'
						},
						{
							'zh':'详情请查看',
							'en':'Please check for details',
							'ja':'詳細はご確認ください'
						},
						{
							'zh':'旅行基金',
							'en':'Travel fund',
							'ja':'旅行資金'
						},
						{
							'zh':'我们鼓励所有策划人和活动参加者在见面之前先通过我们的网站完成预订程序，以确保双方的安全与隐私。',
							'en':'We encourage all planners and event participants to complete the booking process through our website before meeting to ensure the safety and privacy of both parties.',
							'ja':'すべてのプランナーとイベント参加者は、会議の前にWebサイトを通じて予約プロセスを完了して、双方の安全とプライバシーを確​​保することをお勧めします。'
						},
						{
							'zh':'不用参观活动也有多种方式可以了解活动体验和策划人，包括：',
							'en':'There are many ways to learn about the event experience and planner without visiting the event, including:',
							'ja':'イベントにアクセスすることなく、イベントの経験とプランナーについて学ぶ多くの方法があります。'
						},
						{
							'zh':'发送私人消息',
							'en':'Send a private message',
							'ja':'プライベートメッセージを送る'
						},
						{
							'zh':'个人资料验证',
							'en':'Personal data verification',
							'ja':'個人データの検証'
						},
						{
							'zh':'评价',
							'en':'Evaluation',
							'ja':'評価'
						},
						{
							'zh':'已验证照片',
							'en':'Verified photos',
							'ja':'認証済み写真'
						},
						{
							'zh':'策划人在网站上接受预订之前也需要提供有关他们自己的信息提供。',
							'en':'Planners also need to provide information about themselves before accepting reservations on the website.',
							'ja':'プランナーはまた、ウェブサイトで予約を受け入れる前に、自分自身についての情報を提供する必要があります。'
						},
						{
							'zh':'您无需等待策划人回复您的预定申请。',
							'en':'You do n’t need to wait for the planner to reply to your booking request.',
							'ja':'プランナーが予約アプリケーションに返信するのを待つ必要はありません。'
						},
						{
							'zh':'当您预定某体验活动，并支付了该订单。那么您就可以去参加该体验活动。有任何问题都可以通过线上的实时聊天工具联系策划人进行咨询。',
							'en':'When you booked an experience event and paid the order. Then you can go to the experience activity. If you have any questions, you can contact the planner for consultation through the online live chat tool.',
							'ja':'体験イベントを予約して注文を支払ったとき。 その後、体験活動に行くことができます。 ご不明な点がございましたら、オンラインライブチャットツールを介してプランナーにご相談ください。'
						},
						{
							'zh':'注：在支付该订单前，为了整个平台的安全运作，您将被请求完成个人身份验证后才可支付该订单。已经完成了个人身份验证的游客则无需再次进行验证。',
							'en':'',
							'ja':''
						},
						{
							'zh':'如果您已经准备好预订人人耍的某个体验，便可以给策划人发送申请来进行预订。如果您对体验或者体验的可订状态不确定，也可以给策划人发消息。',
							'en':'Note: Before paying the order, for the safe operation of the entire platform, you will be asked to complete the personal identity verification before paying the order. Tourists who have already completed their personal identity verification need not be verified again.',
							'ja':'注：注文を支払う前に、プラットフォーム全体を安全に運用するために、注文を支払う前に個人の本人確認を完了するよう求められます。 個人の本人確認がすでに完了している観光客は、再度確認する必要はありません。'
						},
						{
							'zh':'要发送预订申请，请按以下步骤操作：',
							'en':'To send a reservation request, please follow the steps below:',
							'ja':'予約リクエストを送信するには、以下の手順に従ってください：'
						},
						{
							'zh':'在活动体验页面上点击“查看日期”，进入日历完成步骤4之后，您的预订将会自动确认。',
							'en':'Click "View Date" on the event experience page, enter the calendar to complete step 4, your reservation will be automatically confirmed.',
							'ja':'イベント体験ページの「日付を見る」をクリックし、カレンダーを入力してステップ4を完了すると、予約が自動的に確認されます。'
						},
						{
							'zh':'检查您的预订信息，确保准确无误。',
							'en':'Check your booking information to ensure it is accurate.',
							'ja':'予約情報をチェックして、正確であることを確認してください。'
						},
						{
							'zh':'添加支付信息（可使用微信，支付宝和信用卡）',
							'en':'Add payment information (available on WeChat, Alipay and credit card)',
							'ja':'支払い情報を追加（WeChat、Alipay、クレジットカードで利用可能）'
						},
						{
							'zh':'支付该订单，完成。',
							'en':'Pay the order and complete.',
							'ja':'注文を支払い、完了します。'
						},
						{
							'zh':'下订单之前',
							'en':'Before placing an order',
							'ja':'ご注文前に'
						},
						{
							'zh':'在您想联系的策划人的活动页面处有联系策划人的字样，点击则会出现实时聊天框。您与策划人的聊天记录会一直被保留着。',
							'en':'On the event page of the planner you want to contact, there is a contact with the planner, and when clicked, a live chat box will appear. Your chat history with the planner will always be kept.',
							'ja':'連絡したいプランナーのイベントページにプランナーとの連絡があり、クリックするとライブチャットボックスが表示されます。 プランナーとのチャット履歴は常に保持されます。'
						},
						{
							'zh':'下订单后',
							'en':'After placing an order',
							'ja':'ご注文後'
						},
						{
							'zh':'您可以在同上的地方或我的旅程-还未体验的活动处联系对应的策划人。',
							'en':'You can contact the corresponding planner at the same place or at the place where I have not experienced the trip.',
							'ja':'同じ場所または私が旅行を経験したことがない場所で、対応するプランナーに連絡できます。'
						},
						{
							'zh':'所谓志愿者是指无偿热心的去帮助他人的人们。',
							'en':'The so-called volunteers refer to people who are free and enthusiastic to help others.',
							'ja':'いわゆるボランティアとは、他者を助けるために自由で熱心な人々を指します。'
						},
						{
							'zh':'在我们人人耍平台上的志愿者主要是无偿去帮助策划人们解决接待外国活动体验者们时的语言交流问题。同理策划人们也需要无偿的提供饮食和住宿等。',
							'en':'Volunteers on our Allptp platform are mainly free to help plan people to solve the language communication problem when receiving foreign event experiencers. Similarly, planning people also need to provide food and accommodation for free.',
							'ja':'Allptpプラットフォームのボランティアは主に無料で、外国のイベント体験者を受け入れる際の言語コミュニケーションの問題を解決するための人々の計画を支援しています。 同様に、計画を立てる人々も、無料で食事と宿泊施設を提供する必要があります。'
						},
						{
							'zh':'在人人耍平台上的体验活动都有一个价格，这个价格（包含服务费）由策划人来设定。',
							'en':'All experience activities on the Allptp platform have a price. This price (including service fee) is set by the planner.',
							'ja':'Allptpプラットフォームでのすべての体験アクティビティには料金があり、この料金（サービス料を含む）はプランナーによって設定されます。'
						},
						{
							'zh':'我们平台目前只面向策划人收取10%的服务费，此服务费用于平台的运营，宣传，交税和服务费中的20%给亲密好友上家的提成。',
							'en':'At present, our platform only charges a 10% service fee for planners. This service fee is 20% of the platform\'s operation, publicity, tax payment and service fee to the close friends.',
							'ja':'現在、当社のプラットフォームはプランナーに10％のサービス料金のみを請求しており、このサービス料金はプラットフォームの運営、宣伝、税金支払い、およびサービス料金の20％です。'
						},
						{
							'zh':'对于购买旅游体验产品的游客不收取任何其它费用。',
							'en':'No additional fees are charged for tourists who purchase travel experience products.',
							'ja':'旅行体験商品を購入した観光客には追加料金はかかりません。'
						},
						{
							'zh':'当您的旅程即将到来时，事先检查下您所预定的体验活动是否有需要您提前准备的东西。确认该体验活动的集合地点位置。',
							'ja':'旅が近づいたら、予約した体験に事前に準備する必要があるものが含まれているかどうかを事前に確認してください。 体験の待ち合わせ場所の場所を確認します。',
							'en':'When your journey is about to come, check in advance whether the experience you booked has something you need to prepare in advance. Confirm the location of the meeting place for the experience.'
						},
						{
							'zh':'最后提醒大家出门在外愉快的参加体验活动的同时也需注意安全。',
							'en':'Finally, remind everyone to go out and enjoy the experience activities while paying attention to safety.',
							'ja':'最後に、安全に気を配りながら、外に出て体験活動を楽しむことをみんなに思い出させてください。'
						},
						{
							'zh':'现目前暂不支持更改您的预定。如果您的行程有变，需要更改到另外一天去参加您已经预定的体验活动，您可以提前联系策划人咨询解决方案。',
							'en':'It is currently not supported to change your reservation. If your itinerary changes, you need to change to another day to participate in the experience you have booked, you can contact the planner in advance to consult the solution.',
							'ja':'現在、予約の変更はサポートされていません。 旅程が変更された場合、予約した体験に参加するために別の日に変更する必要がある場合は、事前にプランナーに連絡して解決策を調べることができます。'
						},
						{
							'zh':'如您的行程有变，需要取消您已经预定的体验活动。您可以点击头像在交易中心-待体验订单处点击对应订单然后点击退款即可。',
							'en':'If your itinerary changes, you need to cancel the experience you have booked. You can click on the avatar to click the corresponding order at the transaction center-order to be experienced and then click refund.',
							'ja':'旅程が変更になった場合は、予約した体験をキャンセルする必要があります。 アバターをクリックして、体験するトランザクションセンターの注文で対応する注文をクリックし、[払い戻し]をクリックします。'
						},
						{
							'zh':'如果您提交退款申请的时间符合该体验活动的退款政策，则该退款申请马上即可成功退款。',
							'en':'If the time for submitting your refund request complies with the refund policy for the experience event, the refund request will be refunded immediately.',
							'ja':'払い戻しリクエストの提出時期が体験イベントの払い戻しポリシーに準拠している場合、払い戻しリクエストはすぐに払い戻されます。'
						},
						{
							'zh':'如果您提交退款申请的时间不符合该体验活动的退款政策，则该笔退款申请会自动提交给该策划人，该策划人必须在3天内回复您的申请，如果超过3天未回复您的退款申请，则您会得到全额的退款。',
							'en':'If the time for submitting a refund request does not meet the refund policy for the experience event, the refund request will be automatically submitted to the planner, who must reply to your application within 3 days, if you do not respond within 3 days Your refund request, you will get a full refund.',
							'ja':'払い戻しリクエストを送信する時間がエクスペリエンスイベントの払い戻しポリシーを満たしていない場合、払い戻しリクエストは自動的にプランナーに送信されます。プランナーは3日以内にアプリケーションに返信する必要があります。3日以内に応答しない場合 払い戻しリクエストは、全額払い戻しされます。'
						},
						{
							'zh':'在策划人的退款申请列表中，他可以对您的退款申请选择拒绝，同意和退一部分。',
							'en':'In the refund request list of the planner, he can choose to reject, agree and refund part of your refund request.',
							'ja':'プランナーの払い戻しリクエストリストでは、払い戻しリクエストの一部を拒否、同意、払い戻すことを選択できます。'
						},
						{
							'zh':'如您有任何关于您所下订单的问题，可以随时联系人人耍平台来协助您解决问题。',
							'en':'If you have any questions about your order, you can always contact the Allptp platform to help you solve the problem.',
							'ja':'注文に関して質問がある場合は、いつでもAllptpプラットフォームに連絡して、問題の解決を支援することができます。'
						},
						{
							'zh':'我们的客服电话是：',
							'en':'Our customer service phone is:',
							'ja':'カスタマーサービスの電話は次のとおりです。'
						},
						{
							'zh':'客服服务时间：星期一 ~星期五 09:00~17:00 ',
							'en':'Customer service hours: Monday ~ Friday 09: 00 ~ 17: 00',
							'ja':'カスタマーサービス時間：月曜日〜金曜日9：00〜17：00'
						},
						{
							'zh':'如您在客服服务时间外想联系我们来解决您所下订单的问题，请对您所下订单提交纠纷，如此我们即可在客服服务时间内帮您解决问题。',
							'en':'If you want to contact us outside of customer service hours to solve the problem of your order, please submit a dispute about your order, so we can help you solve the problem during customer service time.',
							'ja':'注文の問題を解決するためにカスタマーサービス時間外に連絡したい場合は、注文に関する紛争を提出してください。これにより、カスタマーサービス時間中に問題を解決できるようになります。'
						},
						{
							'zh':'如何提交纠纷，点击右上角我的头像-交易中心-某订单详情-提交纠纷即可。',
							'en':'To submit a dispute, click on my avatar in the upper right corner-Trading Center-Details of an order-just submit the dispute.',
							'ja':'異議申し立てを送信するには、右上隅にある私のアバターをクリックします-取引センター-注文の詳細-異議申し立てを送信するだけです。'
						},
					
					]

				}
			};
		},
		computed:{
			Lan(){
				return this.Store.getters.getValue
			}
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
.el-collapse-item__header{
	display: flex;
	align-items: center;
	line-height: 15px;
}
</style>
