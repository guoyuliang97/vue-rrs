<template>
    <div>
      <div>
        <div style="padding:1rem ;background-color: #008489;color:#FFF;text-align: left">
          <x-icon type="ios-arrow-back" size="30" @click="goBack" style="fill:white"></x-icon>
        </div>
        <div>
            <div style="padding: 10px;display: flex;justify-content: flex-start;border-bottom: 1px solid #eee;width:80%;margin: 50px auto 0;">
              <div @click="toChoose" style="border-radius: 5px;display: flex;justify-content: flex-start;font-size: 1.5rem;border-right: 1px solid #eee;padding-right: 1rem">
                <div style="width:70px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{mobileCode}}</div>
                <div><x-icon type="ios-arrow-down" size="20"></x-icon></div>
              </div>
              <div style="border-radius: 5px;">
                <input  oninput="if( this.value.length > 11 )  this.value = this.value.slice(0,11)" v-model="number" class="num_input" type='number' placeholder="输入手机号" pattern="[0-9]*"/>
                <p v-if="telEroor" style="color:red;position: absolute;font-size: 1rem;padding-left:1rem">请输入有效电话 </p>
              </div>
            </div>
            <div v-if="!isPassword" style="padding: 1rem;display: flex;justify-content: space-between;width:80%;margin: 2rem auto 0;border-bottom: 1px solid #eee;">
              <input type="number" v-model="phoneSms" class="num_inputA" placeholder="输入验证码" >
              <div @click="toSend"  style="color:#008489;">
                {{sms?sms:'发送验证码'}}
              </div>
            </div>
            <div v-if="isPassword" style="padding: 1rem;display: flex;justify-content: space-between;width:80%;margin: 2rem auto 0;border-bottom: 1px solid #eee;">
              <input type="password" v-model="password" class="num_inputA" placeholder="输入登陆密码" >
            </div>
            <div @click="isPassword?passLogin():telLogin()" style="width:80%;margin: 3rem auto 0;background-color: #008489;color:#fff;padding: 1rem 0;text-align: center;font-size: 1.5rem">
              登陆
            </div>
            <div @click="isPassword?toPassword():toWeixin()" style="width:80%;margin: 1rem auto 1.5rem;border: 1px solid #008489;color:#008489;text-align: center;padding: 1rem 0">
             {{isPassword? '其他登陆方式':'微信快捷登陆' }}
            </div>
            <div v-if="!isPassword">
              <p @click="toPassword" style="text-align: center;color:#008489;">密码登陆</p>
              <!--<p style="margin-top: 3rem;text-align: center;color:#999999;font-size: 1.3rem;">
                其他登陆方式
              </p>
              <div style="width: 40%;margin: 2rem auto 0;display: flex;justify-content: space-between">
                <img src="../../../static/img/static/wap_email.png" style="width:4rem;height:4rem;">
                <img src="../../../static/img/static/wap_qq.png" style="width:4rem;height:4rem;">
              </div>-->
            </div>
          <!-- <div>
              <mt-button  style="width:100%;margin-top: 30px; background-color: #008489;color:#fff;" :disabled="send?false:true" >发送验证码</mt-button>
            </div> -->
            <!--手机区号列表-->
            <div v-if="isChoose" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.5);z-index: 20;display: flex;align-items: center;justify-content: center">
              <div style="position:relative;width:80%;height:90%;background-color: #fff;z-index:999">
                <div style="height:90%;overflow-y: scroll" >
                  <div v-for="(item,index) in contryList" style="display: flex;justify-content: space-between;padding: 10px 10px;border-bottom: 1px solid #eee;width:80%;margin: 0 auto">
                    <div style="font-size: 1.5rem">{{item.title}}</div>
                    <div style="padding: 5px;border-radius: 50%;" :style="{backgroundColor:chooseIndex === index?'#008489':'#eee'}">
                      <div style="width:0.5rem;height:0.5rem;border-radius: 50%;" :style="{backgroundColor:chooseIndex === index?'#fff':'#eee'}">
                      </div>
                    </div>
                  </div>
                </div>
                <div style="position: absolute;bottom:10px;width:80%;left:10%;display: flex;justify-content: space-between">
                  <mt-button style="width:40%" @click="isChoose = false" plain>取消</mt-button>
                  <mt-button style="width:40%"  plain>确定</mt-button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import { Button } from 'mint-ui';
    export default {
        name: "mobileLogin",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            step:1,
            number:'',
            send:false,
            telEroor:false,
            input1:"",
            input2:'',
            input3:'',
            input4:'',
            input5:'',
            input6:'',
            mobileCode:'+86 中国',
            isChoose:false,
            contryList:[
              {title:'1'},
            ],
            chooseIndex:-1,
            sms:'',
            timeOut:60,
            changeTime:"",
            clickIndex:0,
            isPassword:false,
            phoneSms:'',
            password:''
          }
      },
      watch:{
        number:function(){
          if(this.number){
            this.send = true
          }else{
            this.send = false
            this.telEroor = false
          }
        }
      },
      components:{
        Button,
        MessageBox
      },
      methods:{
        passLogin(){
          this.$http.post(this.api + '/home/User/login_psw',{
            token: localStorage.getItem('token'),
            m_code:  parseInt(this.mobileCode),
            mobile: this.number,
            password: this.password
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$router.push('/index')
                localStorage.setItem('isLogin',true)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.passLogin()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toPassword(){
          this.isPassword = !this.isPassword
        },
        againSms(){
          this.$http.post(this.api + '/home/User/send_msg',{
            token: localStorage.getItem('token'),
            m_code: parseInt(this.mobileCode) ,
            mobile: this.number,
            flag: 3
          })
            .then(res=>{
              if(res.data.code == 1){
                this.step = 2
                this.changeTime = setInterval(()=>{
                  this.timeOut --
                  this.sms ='重新发送'+ this.timeOut
                  if(this.timeOut == 0){
                    this.sms = ''
                    this.timeOut = 60
                    clearInterval(this.changeTime)
                  }
                },1000)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.code)
                    this.againSms()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        goBack(){
          this.$router.go(-1)
        },
        toSend(){
          if(!this.sms){
            if(!(/^1[3456789]\d{9}$/.test(this.number))){
              this.telEroor = true
            }else{
              this.againSms()
            }
          }
        },
        toChoose(){
          /*this.isChoose = !this.isChoose*/
        },

        //验证登陆
        telLogin(){
          this.$http.post(this.api + '/home/User/login_sms',{
            token: localStorage.getItem('token'),
            m_code: parseInt(this.mobileCode),
            sms_code: this.phoneSms,
            mobile: this.number,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$router.push('/index')
                localStorage.setItem('isLogin',true)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.telLogin()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        toWeixin(){
          window.open(this.api + '/WechaLoginWap?token='+ localStorage.getItem('token')+'&baseurl='+encodeURIComponent(location.origin))
        }
    },
      mounted(){

      }
    }
</script>

<style scoped>
.num_input{
  font-size: 1.5rem;
  border:none;
  border-radius: 5px;
  padding-left: 1rem;
}
.num_inputA{
  font-size: 1.5rem;
  border:none;
  border-radius: 5px;
}
</style>
