<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">系统消息</p>
      </div>
      <div style="padding: 1rem;">
        <div style="display: flex;justify-content: flex-start;margin-bottom: 2rem; " v-for="(item,index) in messList" @click="toContent(item,index)">
          <div>
            <img src="../../../static/img/static/logo1.png" style="width:4rem;height:4rem;border-radius: 50%;">
          </div>
          <div style="margin-left:1rem;width:100%">
            <div style="display: flex;justify-content: space-between;">
              <div>通知</div>
              <div>{{item.create_time}}</div>
            </div>
            <div style="padding: 1rem 0;border-bottom: 1px solid #eee;">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
    export default {
        name: "msyMessage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            messList:[
            ],
          }
      },
      methods:{
          goBack(){
            this.$router.go(-1)
          },
        getMess(val){
            this.$http.post(this.api + '/sysmsgl',{
              token: localStorage.getItem('token'),
              page: val
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.messList = res.data.data.data
                } else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getMess(val)
                    })
                } else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
        },
        toContent(item,index){
          MessageBox.alert('具体内容请前往APP或者客户端查看！')
        }
      },
      mounted(){
          this.getMess(1)
      }
    }
</script>

<style scoped>

</style>
