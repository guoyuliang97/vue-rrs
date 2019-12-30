<template>
	<div class="volunteers_content">
		<div class="volunteers_left">
			<p class="volunteers_logo" @click="toHome">LOGO</p>
			<div class="pages animated fadeInLeft">
				<p class="fontweight pages_bigtitle">你好！</p>
				<p class="volunteers_txt">我们很高兴你想要开展体验</p>
				<p class="volunteers_txt">几分钟就可以创建你自己的体验页面，之后再提交给爱彼迎审核</p>
				<div class="volunteers_btn">
					<span @click="addPage">下一步</span>
				</div>
			</div>
		</div>
		<div class="volunteers_right animated fadeIn">
			<img alt="" src="../../../static/img/home/5.jpg" style="width: 100%;height: 100%;"/>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			addPage(){
				this.$router.push('/step2')
			},
			toHome(){
				this.$router.push('/')
			}
		}
	}
</script>

<style>

</style>
