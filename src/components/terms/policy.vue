<template>
	<div>
		<p class="fontweight policy_bigtitle">条款与政策</p>
		<p class="fontweight policy_smalltitle">适用于所有成员的政策</p>
		<p class="policy_txt" @click="changePolicy('/policy1-1')">人人耍的平等友好政策：</p>
		<p class="policy_txt" @click="changePolicy('/policy1-2')">人人耍的标准和期望是什么？</p>
		<p class="policy_txt" @click="changePolicy('/policy1-3')">人人耍的内容政策是什么？</p>
		<p class="policy_txt" @click="changePolicy('/policy1-4')">人人耍针对利用评价敲诈勒索行为的政策是什么？</p>
		<p class="policy_txt" @click="changePolicy('/policy1-5')">如果由于出现紧急情况或不可避免的情况而需要取消预订，该怎么办？</p>
		<p class="policy_point">显示全部</p>
		<p class="fontweight policy_smalltitle">对活动参加者的要求</p>
		<p class="policy_txt" @click="changePolicy('/policy1-6')">在人人耍预订有什么要求？</p>
		<p class="fontweight policy_smalltitle">对活动志愿者的要求</p>
		<p class="policy_txt" @click="changePolicy('/policy1-7')">在人人耍做志愿者有什么要求？</p>
		<p class="fontweight policy_smalltitle">对活动策划人的要求</p>
		<p class="policy_txt" @click="changePolicy('/policy1-8')">人人耍对策划人有哪些基本要求</p>
		<p class="policy_txt">如何成为超赞体验策划人？</p>
		<p class="fontweight policy_smalltitle">人人耍体验</p>
		<p class="policy_txt" @click="changePolicy('/policy1-10')">取消体验适用哪些退订政策？</p>
		<p class="policy_txt" @click="changePolicy('/policy1-11')">人人耍体验有哪些品质标准？</p>
		<p class="policy_txt" @click="changePolicy('/policy1-12')">体验参与者退款政策</p>
		<p class="policy_txt" @click="changePolicy('/policy1-13')">体验的评分或评价对我胜任体验达人有何影响？</p>
		<p class="fontweight policy_smalltitle">费用</p>
		<p class="policy_txt" @click="changePolicy('/policy1-14')">人人耍服务费是什么？</p>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		mounted(){
			
		},
		methods:{
			changePolicy(router){
				this.$router.push(router)
			}
		}
	}
</script>

<style>

</style>
