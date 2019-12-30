<template>
  <div :id="flag? 'wap': 'app'">
    <router-view/>
  </div>
</template>

<script>
  export default {
  name: 'App',
    data(){
    return{
      flag:''
    }
    },
    created() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag) {
        this.flag = 1
      }else{
        this.flag = 0
      }
    }
  }
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	min-width: 1080px;
}
#wap{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  width:100%;
  min-width: 320px;
  touch-action:none;
  touch-action:pan-y;
}
*{
	margin: 0;
	padding: 0;
}
</style>
