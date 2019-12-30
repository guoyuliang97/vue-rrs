<template>
	<div class="volunteers">
			<router-view></router-view>	
		</div>
</template>

<script>
	export default {
		data() {
			return {
				page:0
			};
		},
		mounted(){
			
		},
		methods:{
			backPage(){
				if(this.page>0){
					this.page--
				}
			},
			addPage(){
				this.page++
			}
		}
	}
</script>

<style>
@import url('../../static/css/volunteers.css');
@import url('../../static/css/animate.min.css');

</style>
