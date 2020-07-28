<template>
    <div>
      <div style="background-color:#fff;height:100%;width:100%;">

      </div>
      <Dialog v-on:emailLogin="emailLogin" v-on:toPhone="toPhone" v-on:toEmail="toEmail"  v-on:regist="regist" @onLogin="onLogin" v-on:deldialog="deldialog" v-on:passLogin="passLogin" v-on:checkLogin="checkLogin" v-on:emailReset="emailReset" v-on:telReset="telReset" v-on:forgetPass="forgetPass" v-on:emailRegister="emailRegister" v-on:telRegister="telRegister" v-on:loginView="loginView" v-on:registerView="registerView" :model="model" :height="height" :width="width"  ></Dialog>
    </div>
</template>

<script>
  import Dialog from "../public/dialog.vue";
  import Bus from '../assets/eventBus'
    export default {
        name: "logion",
      data(){
          return{
            height:'340',
            width:'400',
            model:"0",
            api: this.GLOBAL.baseURL
          }
      },
      components:{
        Dialog,
      },
      methods:{
        deldialog(){
          this.$router.push('/')
        },
        emailLogin(){
          this.model= '8'
          this.height='380px'
        },
        toEmail(){
          this.model = '3'
          this.height="462"
        },
        toRegister(){
          this.model="1"
          this.height="300"
        },
        toLogin(){
          this.model="0"
          this.height="380"
        },
        registerView(){
          this.model="1";
          this.height="340";
        },
        loginView(){
          this.model="0"
          this.height="380"
        },
        telRegister(){
          this.model="2";
          this.height="402"
        },
        emailRegister(){
          this.model="3";
          this.height="462"
        },
        forgetPass(){
          this.model="4";
          this.height="250"
        },
        telReset(){
          this.model="5";
          this.height="415"
        },
        emailReset(){
          this.model="6";
          this.height="450"
        },
        checkLogin(){
          this.model="7";
          this.height="380"
        },
        passLogin(){
          this.model="0";
          this.height="380"
        },
        toPhone(){
          this.model="2";
          this.height="402"
        },
        regist(res){
          this.$router.go(-1)
          Bus.$emit('regist',res)
        },
        onLogin(res){
          this.$router.go(-1)
          Bus.$emit('onLogin',res)
        },
        // getUser(){
        //   this.$http.post(this.api + '/home/User/get_user',{
        //     token: localStorage.getItem('token')
        //   })
        //     .then(res=>{
        //       if(res.data.code == 1){
        //         this.$router.push('/')
        //       }
        //     })
        // },
      },
      created(){
          if(this.$route.query.information == '2'){
            this.model="1"
            this.height="300"
          }else{
            this.model="0"
            this.height="380"
          }
      },
      mounted(){
          // this.getUser()
      },
    }
</script>

<style scoped>

</style>
