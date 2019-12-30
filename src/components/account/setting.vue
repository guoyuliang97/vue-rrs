<template>
	<div class="setting">
		<div class="data_title">
			<div class="edit_width">停用账号</div>
		</div>
		<div class="edit_datacon">
			<div style="width: 740px;margin: 0 auto;text-align: left;">
				<div v-show="isEnd">
					<div class="end_top">
						<div>
							<p class="fontweight detail_p" style="font-size: 16px;">请告诉我们您为什么要注销账号</p>
							<div>
								<el-radio-group v-model="reason">
									<p class="radio_margin">
										<el-radio :label="1">我有安全顾虑。</el-radio>
									</p>
									<p class="radio_margin">
										<el-radio :label="2">我有隐私顾虑。</el-radio>
									</p>
									<p class="radio_margin">
										<el-radio :label="3">我觉得这个没有用。</el-radio>
									</p>
									<p class="radio_margin">
										<el-radio :label="4">我不知道如何使用它。</el-radio>
									</p>
									<p class="radio_margin">
										<el-radio :label="5">只是暂时的。我会回来。</el-radio>
									</p>
									<p class="radio_margin">
										<el-radio :label="6">其他</el-radio>
									</p>
								</el-radio-group>
							</div>
							<p class="fontweight" style="margin-top: 15px;">有什么其他想告诉我们的吗？</p>
							<el-input
							  type="textarea"
							  :autosize="{ minRows: 4, maxRows: 4}"
							  placeholder="请输入内容"
							  v-model="otherTextarea" style="margin-top: 15px;">
							</el-input>
							<p class="fontweight" style="margin-top: 15px;">我们可以联系您以获取更多详细信息吗？</p>
							<el-radio-group v-model="canGet" style="margin-top: 15px;">
								<el-radio :label="1">可以</el-radio>
								<el-radio :label="2">不可以</el-radio>
							</el-radio-group>
							<p class="fontweight" style="margin-top: 15px;">将会发生什么情况</p>
							<p class="detail_p">1.注销账号前您在爱彼迎平台上所有活动所对应的权利和义务仍将保留</p>
							<p class="detail_p">2.您的个人资料和所有房源都会被隐藏</p>
							<p class="detail_p">3.您可以随时<span style="cursor: pointer;color: #008489;">联系我们</span>以重新启用您的账号</p>
							<p class="detail_p">4.<span style="cursor: pointer;color: #008489;">了解关于账号停用的更多信息</span></p>
						</div>
						<div>
							<p class="fontweight" style="margin-top: 15px;">注销账号的替代方案</p>
							<p class="fontweight" style="margin-top: 20px;color: #008489;cursor: pointer;" @click="settingRouter('3','/privacy')">修改我的隐私设置</p>
							<p class="detail_p">关闭您房源的搜索索引功能，您的房源便不会出现在谷歌、必应等搜索引擎的搜索结果中。</p>
							<p class="fontweight" style="margin-top: 20px;color: #008489;cursor: pointer;" @click="settingRouter('0','/notice')">变更通知偏好</p>
							<p class="detail_p">我们是否给您发送了过多的邮件？您可以修改您的通知偏好设置。</p>
						</div>
					</div>
				</div>
				<div v-if="isEnd == false" style="text-align: left;margin-top: 20px;">
					<el-button type="danger" @click="endAccount">停用账号</el-button>
				</div>
        <div v-if="isEnd == true" style="text-align: left;margin-top: 20px;">
          <el-popover
            placement="top"
            width="160"
            v-model="visible2">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button type="danger" @click="endAccount" slot="reference">确定</el-button>
          </el-popover>

        </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isEnd:false,
				endForm:{
					
				},
				reason:1,
				otherTextarea:"",
				canGet:"",
        visible2:false
			};
		},
		methods:{
			endAccount(){
				if(!this.isEnd){
					this.isEnd=true
				}
			},
			settingRouter(navindex,router){
				this.$router.push(router);
				localStorage.setItem('accountNav',navindex);
				localStorage.setItem('accountRouter',router);
				this.$emit('changesetting',navindex)
			}
		}
	}
</script>

<style>
.setting{
	padding-bottom: 50px;
}
.end_top{
	display: flex;
	justify-content: space-between;
	text-align: left;
}
.end_top>div{
	width: 48%;
}
</style>
