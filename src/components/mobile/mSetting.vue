<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">设置</p>
      </div>
      <div style="padding: 1rem;">
        <div v-for="(item,index) in setList" @click="toReport" style="display: flex;justify-content: space-between;align-content: center;font-size: 1.6rem;margin-bottom: 1rem;">
          <div>{{item.name}}</div>
          <div><x-icon type="ios-arrow-right" size="20" style="fill:#D5D5D5"></x-icon></div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
    export default {
        name: "mSetting",
      data(){
          return{
            setList:[
              {name: '我的账号'},
              {name: '账户安全'},
              {name: '隐私'},
              {name: '收款方式'},
              {name: '通知'},
            ]
          }
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        toReport(){
          MessageBox.alert('请前往客户端或者APP查看更多!')
        }
      }
    }
</script>

<style scoped>

</style>
