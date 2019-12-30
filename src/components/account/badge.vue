<template>
	<div class="badge">
		<p class="fontweight" style="font-size:22px;">用人人游徽章来宣传自己</p>
		<p class="fontweight" style="font-size:14px;margin-top: 15px;">我的徽章</p>
    <div style="display: flex;justify-content: flex-start;margin-top:20px;">
      <div>
        <img  :src="isplanner?'../../../static/img/badge/player.png':'../../../static/img/badge/noPlayer.png'" width="80px">
      </div>
      <div style="margin: 0 20px;">
        <img  :src="isvolunteer?'../../../static/img/badge/volunteer.png':'../../../static/img/badge/noVolunteer.png'" width="80px">
      </div>
      <div>
        <img src="../../../static/img/badge/user.png" width="80px">
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			 	api: this.GLOBAL.baseURL,
        isplanner:'',
        isvolunteer:''
			};
		},
    methods:{
		  getUse(){
		    this.$http.post(this.api + '/home/User/get_user',{
		      token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              let data =res.data.data[0]
              this.isvolunteer = data.isvolunteer
              this.isplanner = data.isplanner
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getUse()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    mounted() {
		  this.getUse()
    }
  }
</script>

<style>
.badge{
	padding-bottom: 50px;
	text-align: left;
}
</style>
