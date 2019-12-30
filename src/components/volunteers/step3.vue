<template>
	<div class="step3">
		<p class="volunteers_logo" @click="toHome">LOGO</p>
		<div class="step_txt fontweight animated zoomIn">
			让我们再来看一下爱彼迎体验到底是什么
		</div>
		<div class="back_btn animated fadeIn" style="left: 7.5%;" @click="backPage">
			<span style="color: #008489;"><i class="el-icon-arrow-left" style="font-weight: bold;"></i></span> 返回
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				time:2,
				changetime:''
			};
		},
		methods:{
			backPage(){
				this.$router.go(-1)
			},
			toHome(){
				this.$router.push('/')
			}
		},
		mounted(){
			var _this=this;
			this.changetime=setInterval(()=>{
				_this.time--;
				if(_this.time==0){
					_this.time=2;
					this.$router.push('/step4')
				}
			},1000)
		},
		destroyed(){
			this.time=2;
			clearInterval(this.changetime)
		}
	}
</script>

<style>
	.step3{
		position: absolute;
		top: 20px;
		left: 20px;
		right: 20px;
		bottom: 20px;
	}
	.step_txt{
		height: 40px;
		line-height: 40px;
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: -20px;
		font-size: 28px;
	}
</style>
