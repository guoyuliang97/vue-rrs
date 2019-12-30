<template>
    <div>
      <Head></Head>
      <div style="width:1080px;margin:80px auto;text-align: left">
        <div style="width:50px;cursor: pointer" @click="toBack"><i class="el-icon-arrow-left" ></i>返回</div>
        <div style="width:600px;margin:20px auto">
          <div style="margin:20px 0;display: flex;justify-content: space-between">
            <div><h3>咨询策划人：</h3></div>
            <div style="display: flex;justify-content: flex-start">
              <div><img :src="userImg" width="48px" height="48px" style="border-radius: 50%" ></div>
              <div style="margin-left:20px;height:48px;line-height:48px;"><span>{{userName}}</span></div>
            </div>
          </div>
          <h3>咨询的活动:</h3>
          <div style="display: flex;justify-content: flex-start;margin-top:20px;">
            <div>
              <img :src="imgurl" width="280px" height="180px" >
            </div>
            <div style="margin-left:30px;line-height:30px;">
              <p>{{title}}</p>
              <p>{{remark}}</p>
              <p>{{English}}</p>
              <el-rate v-model="score" disabled></el-rate>
              <p>{{monney}}</p>
            </div>
          </div>
          <h3 style="margin:20px 0;">咨询内容:</h3>
          <el-input type="textarea" :rows="5" v-model="counselContent"></el-input>
          <div style="margin-top:20px">
            <el-button type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Head from './head.vue'
    export default {
        name: "counsel",
      data(){
          return{
            imgurl:'',
            title:'',
            remark:'',
            English:'',
            score:'',
            monney:'',
            counselContent:'',
            userImg:'',
            userName:'',
          }
      },
      components:{
          Head
      },
      created:function(){
          this.getParams()
      },
      watch:{
        '$route':'getParams'
      },
      methods:{
        toBack(){
          this.$router.go(-1)
        },
        getParams:function(){
          var routeParams = this.$route.query.information
          this.imgurl = routeParams.img
          this.title = routeParams.name
          this.remark = routeParams.remark.slice(0,10)
          this.English = routeParams.english
          this.score = routeParams.score
          this.monney = routeParams.money
          this.userImg = routeParams.img
          this.userName = routeParams.name
        }
      }
    }
</script>

<style scoped>

</style>
