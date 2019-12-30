<template>
    <div>
      <div>
        <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
          <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
          <p style="font-size: 2rem">热搜体验</p>
        </div>
        <div>
          <img src="../../../static/img/static/wap/hotBack.png" width="100%">
        </div>
        <p style="background-color: #F0F0F0;color:#999999;padding: 0.5rem 1rem;font-size: 1rem">实时热点，每小时更新</p>
        <div style="padding: 1rem">
          <div v-for="(item,index) in hotList" @click="toPublish(item,index)" style="margin-bottom: 2rem;display: flex;justify-content: flex-start">
            <span style="font-size: 1.5rem;font-weight: bold" :style="{color:index+1 <=3? '#FF4848':'#FEBB52'}">{{index+1}}</span>
            <span style="margin-left:2rem;font-size: 1.5rem" :style="{color: index+1 >3? '#666666':'#000'}">{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "hotsearch",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            hotList:[]
          }
      },
      methods:{
          toPublish(item,index){
            this.$router.push({
              path: '/mPublishPage',
              query:{
                information: item.activity_id
              }
            })
          },
        goBack(){
          this.$router.go(-1)
        },
        getHot(){
          this.$http.post(this.api + '/PopularAct',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.hotList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getHot()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
          this.getHot()
      }
    }
</script>

<style scoped>

</style>
