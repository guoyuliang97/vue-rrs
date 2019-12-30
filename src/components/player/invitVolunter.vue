<template>
  <div>
    <Head type="invitVolunter"></Head>
    <div style="width:1080px;margin: 106px auto;text-align: left">
      <p style="font-size:12px;"><b>我的策划&nbsp;&gt;&nbsp;邀请志愿者</b></p>
        <p style="margin: 15px 0;font-size:15px;font-weight: bold;display: flex;justify-content: space-between">邀请志愿者<span style="cursor: pointer" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span></p>
      <div>
        <ul style="display: flex;justify-content: flex-start;border-bottom: 1px solid #eee;">
          <li v-for="(item,index) in list" @click="changeRouter(item,index)" style="font-weight:bold;width:80px;margin-right:10px;font-size:12px;padding: 10px 0;text-align: center" :style="{borderBottom:index == colorIndex? '2px solid #008489':'none',color:index == colorIndex? '#008489':'#000' }">{{item.name}}</li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Head from '../../public/head'
  import Bus from '../../assets/eventBus'
    export default {
        name: "invitVolunter",
      data(){
          return{
            activeID:'',
            UserID:'',
            colorIndex:0,
            list:[
              {name: '邀请志愿者',router:'/inviteList'},
              {name: '已邀请',router:'/sucessInvit'},
            ]
          }
      },
      components:{
        Head,
      },
      watch:{
        colorIndex:function(){
          if(this.colorIndex){
            this.$router.push({
              name: 'sucessInvit',
              query:{
                activeId: this.activeID
              }
            })
          }else{
            this.$router.push({
              name: 'inviteList',
              query:{
                activeId: this.activeID,
                information: this.UserID
              }
            })
          }
        }
      },
      methods:{
        changeRouter(item,index){
          if(index != this.colorIndex){
            this.colorIndex = index
            this.$router.push(item.router)
          }
        },
        goBack(){
          this.$router.push('/myPlay')
        },
      },
      created(){
          Bus.$on('invitId',(msg) =>{
            this.activeID = msg
          })
        Bus.$on('invitUser',(msg)=>{
          this.UserID = msg
        })
      }
    }
</script>

<style scoped>

</style>
