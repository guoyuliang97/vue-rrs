<template>
    <div>
      <Head v-on:mobileReload="mobileReload" ></Head>
      <div :style="{height:hieght + 'px'}" style="padding: 4rem 1rem;background: url('../../../static/img/home/1.png') no-repeat; background-size: cover">
        <div style="display: flex;justify-content: flex-start;align-items: center;font-size: 1.6rem;font-weight: bold;color:#fff;height:100%;">
          <img :src="userImg" style="width:5rem;height:5rem;border-radius: 50%;margin-right:1rem;">
          <span >{{userName?userName:'匿名用户'}}</span>
        </div>
      </div>
      <div>
        <div @click="toPage(item,index)" v-for="(item,index) in btnList" style="display: flex;justify-content: flex-start;align-items: center;font-size: 1.5rem;border-bottom: 1px solid #eee;padding:1rem;">
          <div>
            <img :src="item.img" style="width:3rem">
          </div>
          <div>
            {{item.title}}
          </div>
        </div>
      </div>
      <div style="padding: 0.3rem;background-color: #eee;"></div>
      <div style="padding: 2rem;display: flex;flex-wrap: wrap;justify-content: space-between">
        <div @click="toReport" v-for="(item,index) in otherList" style="text-align: center">
          <img :src="item.img" style="width:5rem" >
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import Head from '../../public/mobilePublic/mobileHead'
    export default {
        name: "editOwer",
      data(){
          return{
            btnList:[
              {img: '../../../static/img/static/wap/mes.png',title: '我的通知',router:'/myMessage'},
              {img: '../../../static/img/static/wap/order.png',title: '我的订单',router:'/mOrder'},
              {img: '../../../static/img/static/wap/Pstory.png',title: '我发布的故事',router:'/mPublishStory'},
              {img: '../../../static/img/static/wap/sysMes.png',title: '系统消息',router:'/msyMessage'},
              {img: '../../../static/img/static/wap/sheZ.png',title: '设置',router:'/mSetting'},
            ],
            otherList:[
              {img: '../../../static/img/static/wap/tranvel.png',title: '旅行基金'},
              {img: '../../../static/img/static/wap/invitF.png',title: '邀请好友'},
              {img: '../../../static/img/static/wap/adress.png',title: '收货地址'},
              {img: '../../../static/img/static/wap/report.png',title: '反馈'},
            ],
            hieght:'',
            userName:'',
            userImg:''
          }
      },
      components:{
        Head,
        MessageBox
      },
      methods:{
        toReport(){
          MessageBox.alert('请前往客户端或者APP查看更多内容')
        },
        toPage(item,index){
          this.$router.push(item.router)
        },
        //获取手机屏幕高度
        getHeight(){
          var height = window.screen.height
          this.hieght = height * 0.2
        },
        mobileReload(res){
          let data = res.data.data[0]
          this.userName = data.family_name + data.middle_name + data.name
          this.userImg = data.head_image? data.headimage.domain + data.headimage.image_url:'../../../static/img/static/user.png'
        }
      },
      created(){
          window.scroll(0,0)
         this.getHeight()
      }
    }
</script>

<style scoped>

</style>
