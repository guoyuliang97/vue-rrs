<template>
    <div>
      <div style="position:fixed;top:0;left:0;right:0;background-color: #fff;padding:1rem;display: flex;justify-content: space-between;z-index: 999">
        <div style="display: flex;justify-content: space-between;color:#008489;width:65%">
          <div style="font-size: 2rem;font-weight: bold">allptp</div>
        </div>
        <div v-if="!isLogin" @click="toLogin" style="border-left:0.1rem solid #eee;font-size: 1.5rem;padding: 0 1rem;color:#008489;">
          注册或登陆
        </div>
        <div @click="lookMore" v-if="isLogin" style="border-left:0.1rem solid #eee;font-size: 1.5rem;padding: 0 1rem;color:#008489;">
          <div v-if="!isLook">
            <img src="../../../static/img/static/wap/login.png" style="width:2rem;height:2rem"/>
          </div>
          <div v-if="isLook">
            <img src="../../../static/img/static/wap/back.png" style="width:2rem;height:2rem"/>
          </div>
        </div>
      </div>
      <div class="animated slideInRight " v-if="isLook" style="position: fixed;background-color: white;left:0;right:0;bottom:0;top:44px;z-index:999">
        <div v-for="(item,index) in moreList" @click="toOther(item,index)" style="display: flex;justify-content: flex-start;align-items: center;padding: 1rem;border-bottom: 1px solid #eee;">
          <img :src="item.img" style="width:2rem;height:2rem;margin-right:1rem">
          <div>{{item.title}}</div>
        </div>
      </div>
      <div @click="checkApp" style="position:fixed;top:80%;right:0;z-index:9;background: linear-gradient(to right, #008489 , #26BAC0);border-top-left-radius: 2rem;border-bottom-left-radius: 2rem;font-size: 1.5rem;padding:0.5rem 1rem;color:#fff;">
        <p>打开App</p>
      </div>
      <div @click="openApp" style="position:fixed;top:70%;right:0;z-index:9;background: linear-gradient(to right, #008489 , #26BAC0);border-top-left-radius: 2rem;border-bottom-left-radius: 2rem;font-size: 1.5rem;padding:0.5rem 1rem;color:#fff;">
        <p>下载App</p>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
        name: "mobileHead",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            isLogin:false,
            moreList:[
              {img: '../../../static/img/static/wap/home.png',title: '首页',router:'/index'},
              {img: '../../../static/img/static/wap/search.png',title: '搜索',router:'/mSearch'},
              {img: '../../../static/img/static/wap/ower.png',title: '个人中心',router:'/meditOwer'},
              {img: '../../../static/img/static/wap/equit.png',title: '退出'},
            ],
            isLook:false
          }
      },
    components:{
      MessageBox,
    },
      methods:{
          getToken(){
            if(localStorage.getItem('token')){
                this.$http.post(this.api + '/home/User/get_user',{
                  token: localStorage.getItem('token')
                })
                  .then(res=>{
                    if(res.data.code == 1){
                      this.isLogin = true
                      localStorage.setItem('isLogin',true)
                      this.$emit('mobileReload',res)
                    }else if(res.data.code == 3){
                      this.$http.post(this.api + '/home/Index/token')
                        .then(res=>{
                          localStorage.setItem('token',res.data.data)
                          this.$emit('mobileReload')
                          localStorage.removeItem('isLogin')
                        })
                    }else{
                      localStorage.removeItem('isLogin')
                      this.$emit('mobileReload')
                    }
                  })
            }else{
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.$emit('mobileReload')
                })
            }
          },
        toLogin(){
            this.$router.push('/mobileLogin')
        },
        lookMore(){
            this.isLook = !this.isLook
        },
        toOther(item,index){
            if(index == 3){
              this.quit()
            }else{
              this.$router.push(item.router)
            }

      },
        quit(){
            this.$http.post(this.api + '/home/User/quit',{
              token: localStorage.getItem('token')
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$router.push('/index')
                  localStorage.removeItem('isLogin')
                  localStorage.removeItem('token')
                  this.isLogin = false
                  this.isLook = false
                  this.getToken()
                  MessageBox.alert('退出成功！')
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.quit()
                    })
                }else if(res.data.code == 0){
                  MessageBox.alert(res.data.msg)
                }
              })
        },
        checkApp(){
          var userAgent = navigator.userAgent ;
          var url="",downUrl="";
          if(userAgent.indexOf("Android")>-1){
            /*url='weixin://';//安卓版App地址，由安卓同事提供
            downUrl="XXXXXXXXX"; //安卓版App下载地址，由安卓同事提供*/
            MessageBox.alert('暂时没有安卓APP，请耐心等待！')
          }else{
            url='https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1';//IOS版App地址，由IOS同事提供
            downUrl="https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1"; //IOS版App下载地址，由IOS同事提供
          }
          function test(){
            window.location.href = url;
            setTimeout(function(){
              window.location.href = downUrl;
            },5000)
          }
          test();
        },
        openApp(){
          var userAgent = navigator.userAgent ;
          var url="",downUrl="";
          if(userAgent.indexOf("Android")>-1){
            url='/人人耍.apk';//安卓版App地址，由安卓同事提供
            downUrl='/人人耍.apk'; //安卓版App下载地址，由安卓同事提供
          }else{
            url='https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1';//IOS版App地址，由IOS同事提供
            downUrl="https://apps.apple.com/us/app/%E4%BA%BA%E4%BA%BA%E8%80%8D/id1482092521?l=zh&ls=1"; //IOS版App下载地址，由IOS同事提供
          }
          window.open(downUrl)
        }
      },
      mounted() {
          this.getToken()
      },
      created(){
          if(localStorage.getItem('isLogin')){
            this.isLogin = localStorage.getItem('isLogin')
          }
      }
    }
</script>

<style scoped>

</style>
