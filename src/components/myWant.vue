<template>
  <div>
    <Head type="myWant"></Head>
    <div style="width:1080px;margin: 106px auto;text-align: left">
      <h4>我的志愿</h4>
      <div>
        <ul style="display: flex;justify-content: flex-start;border-bottom: 1px solid #eee;margin-top:15px;">
          <li v-for="(item,index) in list" @click="changeRouter(item,index)" style="font-weight:bold;width:80px;margin-right:10px;font-size:12px;padding: 10px 0;text-align: center" :style="{borderBottom:index == colorIndex? '2px solid #008489':'none',color:index == colorIndex? '#008489':'#000' }">{{item.name}}</li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Head from '../public/head'
    export default {
        name: "myWant",
      data(){
        return{
          colorIndex:'0',
          list:[
            {name: '策划者邀请',router:'/palyerInvite'},
            {name: '我的志愿申请',router:'/myAplication'},
            {name: '已完成志愿',router:'/overInvite'},
          ]
        }
      },
      components:{
        Head,
      },
      methods:{
        changeRouter(item,index){
          if(index != this.colorIndex){
            this.colorIndex = index
            this.$router.push(item.router)
          }
        },
      }
    }
</script>

<style scoped>

</style>
