<template>
    <div style="background-color: #eee;">
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">我的订单</p>
      </div>
      <tab :line-width="2" custom-bar-width="30px" active-color="#008489" style="font-weight: bold">
        <tab-item @on-item-click="change" selected>未支付</tab-item>
        <tab-item @on-item-click="change">已支付</tab-item>
        <tab-item @on-item-click="change">待评价</tab-item>
        <tab-item @on-item-click="change">退款订单</tab-item>
      </tab>
      <div style="font-size: 1.5rem;">
        <div style="background-color: white;padding: 1rem;margin-top: 1rem" v-for="(item,index) in orderList">
          <div style="padding-bottom: 1rem; border-bottom: 1px solid #eee;"><span>{{item.country}}</span>&nbsp;&nbsp;<span>{{item.province}}</span>&nbsp;&nbsp;<span>{{item.city}}</span>&nbsp;&nbsp;<span>{{item.region}}</span></div>
          <div style="display: flex;justify-content: flex-start">
            <div>
              <LoadingImg type="3" :src="item.cover_image?item.cover.domain + item.cover.image_url:''" style="width:100px;height:80px;" ></LoadingImg>
            </div>
            <div style="margin-left:10px;display: flex;align-content: space-between;flex-wrap: wrap">
              <div>{{item.title}}</div>
              <div style="display: flex;justify-content: space-between;width:100%;">
                <div>￥{{item.act_union_price}}</div>
                <div>x{{item.num}}</div>
              </div>
            </div>
          </div>
          <div style="text-align: right;margin:1rem 0;">
            <p>共1人，合计￥{{item.total_price}}</p>
          </div>
          <div  style="text-align: right;">
            <el-button size="mini" plain @click="lookOrder" style="border:1px solid #008489;color:#008489;">查看订单</el-button>
          </div>
        </div>
        <div v-if="orderList.length == 10" >
          <el-button @click="LookMore" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多订单&gt;</el-button>
        </div>
      </div>
      <div v-if="!orderList.length" style="font-size: 1.5rem;text-align: center;">
        暂无数据
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
  import { MessageBox } from 'mint-ui'
  import { XButton } from 'vux'
  import { Tab, TabItem } from 'vux'
    export default {
        name: "mOrder",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            orderList:[
            ]
          }
      },
      components:{
          Tab,
        TabItem,
        XButton,
        LoadingImg
      },
      methods:{
        LookMore(){
          MessageBox.alert('请前往APP或者客户端查看')
        },
          lookOrder(){
            MessageBox.alert('请前往APP或者客户端查看')
          },
        goBack(){
          this.$router.go(-1)
        },
        change(index){

          if(index <= 1){
            this.getOrder(1,index,'','')
          }else if(index == 2){
            this.getOrder(1,1,1,2)
          }else if(index == 3){
            this.getRefun(1)
          }
        },
        getRefun(val){
            this.$http.post(this.api + '/RefundLUser',{
              token: localStorage.getItem('token'),
              page:val
            })
              .then(res=>{
                if(res.data.code == 1){

                  this.orderList = res.data.data.data
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getOrder()
                    })
                }else if(res.data.code == 0){
                  MessageBox.alert(res.data.msg)
                }
              })
        },
        getOrder(val,flag,isevaluate,iscomplete){
          this.$http.post(this.api + '/orderl',{
            token: localStorage.getItem('token'),
            page:val,
            flag: flag,
            isevaluate: isevaluate,
            iscomplete: iscomplete
          })
            .then(res=>{
              if(res.data.code == 1){

                this.orderList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOrder()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        getRefund(){
          this.$http.post(this.api + '/RefundLUser',{

          })
        }
      },
      mounted(){
          this.getOrder(1,0,'','')
      }
    }
</script>

<style scoped>

</style>
