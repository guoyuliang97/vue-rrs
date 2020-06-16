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
    methods:{
      getLan(){
        var L = navigator.language.split('-')
        this.Store.commit('setValue',L[0])
        if(L[0] == 'zh'){
          this.Store.commit('setValue2','CNY-￥')
        }else if(L[0] == 'en'){
          this.Store.commit('setValue2','USD-$')
        }else{
          this.Store.commit('setValue2','JPY-￥')
        }
      }
    },
    created() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag) {
        this.flag = 1
      }else{
        this.flag = 0
      }
    },
    mounted(){
      this.getLan()
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
