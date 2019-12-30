<template>
  <div>
      <el-container>
        <el-header><Head type="message" v-on:reload="reload" ></Head></el-header>
        <el-container style="width:1080px;margin: 50px auto;">
          <el-aside  width="200px" >
            <h2>我的消息</h2>
            <div style="margin-top:20px;">
            <el-badge  class="item">
              <el-button @click="toFriend">我的好友</el-button>
            </el-badge>
            <br>
            <el-badge :value="sysMesaage" :hidden="sysMesaage?false:true" :max="99" class="item">
              <el-button @click="toSystemMessage">系统消息</el-button>
            </el-badge>
            <br>
            <el-badge :value="Friendsnotice" :hidden="Friendsnotice?false:true" :max="99" class="item">
              <el-button  @click="toFriendsNotice">好友通知</el-button>
            </el-badge>
            <br>
            <el-badge :value="fridendMesage" :hidden="fridendMesage?false:true" :max="99" class="item">
              <el-button @click="toFriendMessage">好友消息</el-button>
            </el-badge>
            <br>
              <el-badge :value="discussNum" :hidden="discussNum?false:true" :max="99" class="item">
                <el-button @click="discussMessage">评价</el-button>
              </el-badge>
            <br>
            <el-badge :value="zanNum" :hidden="zanNum?false:true" :max="99" class="item">
              <el-button @click="zanMessage">赞</el-button>
            </el-badge>
            </div>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
  import Bus from '../assets/eventBus'
  import Head from '../public/head.vue'
    export default {
        name: "message",
      data(){
        return{
          api: this.GLOBAL.baseURL,
          sysMesaage:'',
          fridendMesage:'',
          Friendsnotice:'',
          discussNum:'',
          zanNum:'',
          all:'',
          user_id:''
        }
      },
      watch:{
        all:function(){
          if(!this.all){
            Bus.$emit('nore',false)
          }
        },
        sysMesaage:function(){
          if(!this.sysMesaage){
            Bus.$emit('alearAll',1)
          }

        }
      },
      components:{
          Head
      },
      methods:{
        reload(res){
          this.user_id = res.data.data[0].user_id
        },
        toSystemMessage(){
          this.$router.push({
            path: '/SystemMessage',
            query:{
              information: this.user_id,
              clearNum: this.sysMesaage
            }
          })
        },
        toFriendsNotice(){
          this.$router.push('/FriendsNotice')
        },
        toFriendMessage(){
          this.Friendsnotice = 0
          this.all = parseInt(this.all) - parseInt(this.Friendsnotice)
          this.$router.push('/FriendMessage')
        },
        toFriend(){
          this.$router.push('/friend')
        },
        getNoread(){
          this.$http.post(this.api + '/home/Sysmsg/noread',{
            token:localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.sysMesaage = data.sys_count
                this.Friendsnotice = data.notice_count
                this.fridendMesage = data.chat_count
                this.zanNum = data.praise_count
                this.discussNum = data.comment_count
                this.all = parseInt(data.sys_count) + parseInt(data.notice_count)  + parseInt(data.chat_count)+ parseInt(data.praise_count)+parseInt(data.comment_count)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getNoread()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        discussMessage(){
          this.all = parseInt(this.all) - parseInt(this.discussNum)
          this.$router.push('/editevaluation')
          this.discussNum = 0
        },
        zanMessage(){
          this.all = parseInt(this.all) - parseInt(this.zanNum)
          this.$router.push('/zanMessage')
          this.zanNum = 0
        }
      },
      mounted() {
          this.getNoread()
      },
      created(){
        Bus.$on('reduce',(msg)=>{
          this.sysMesaage = parseInt(this.sysMesaage) - msg
          this.all = parseInt(this.all) - msg
        })
        Bus.$on('friendN',(msg)=>{
          this.fridendMesage = parseInt(this.fridendMesage) - msg
          this.all = parseInt(this.all) - msg
        })
        Bus.$on('clearAll',(msg) =>{
          this.all = parseInt(this.all) - parseInt( this.sysMesaage)
          this.sysMesaage = 0
        })
      }
    }
</script>

<style scoped>
  .item{
    width:87px;
    margin: 10px 0;
  }
  button{
    border:none
  }
</style>
