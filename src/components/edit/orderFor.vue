<template>
    <div v-if="orderInformation" style="text-align: left">
      <div  style="background-color: #fff;padding:20px;">
        <div>
          <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
        </div>
        <div style="text-align: center;padding:30px 0">
          <p v-if="type == 2"><span><i class="el-icon-warning" style="color:#ff6200;font-size:20px;"></i>&nbsp;</span><b>您的订单还未完成!</b></p>
          <p v-if="type == 1"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>您的订单已完成!</b></p>
          <p v-if="type == 3"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>该订单还待体验!</b></p>
          <p v-if="type == 4"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>该订单正在进行中!</b></p>
          <p style="font-size:12px;margin:10px 0;">{{type == 1?'欢迎下次预定哦~':type == 3?'尽情享受您的旅程哦~':'快去支付哦~'}}</p>
        </div>
      </div>
      <div v-if="orderInformation.person.length" style="margin:10px 0;background-color: #fff;padding:0 10px;font-size:14px;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">预定游客</p>
        <div v-for="(item,index) in orderInformation.person" :key="index" style="line-height:30px;font-size:14px;border-bottom:1px solid #eee;display: flex;justify-content: flex-start">
          <div style="width:50%"><i class="iconfont icon-wo"></i><span style="margin-left:20px;font-size:13px;">{{item.name}}&nbsp;&nbsp;{{item.mobile}}</span></div>
          <div><i class="iconfont icon-credentials_icon"></i><span style="margin-left:20px;font-size:13px;">{{item.idcard}}</span></div>
        </div>
      </div>
      <div style="background-color: #fff;padding:0 10px;font-size:14px;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">体验信息</p>
        <div style="display: flex;justify-content: flex-start;margin:10px 0;">
          <div>
            <LoadingImg type="3" :src="orderInformation.cover.domain+ orderInformation.cover.image_url" style="width:300px;height:200px;overflow: hidden"></LoadingImg>
          </div>
          <div style="margin-left:20px;line-height:25px;">
            <p class="elips"><b>{{orderInformation.title}}</b></p>
            <p>类型：<span v-for="item in orderInformation.kind"><span>{{item.kind_name}}/</span></span></p>
            <p>时长：{{orderInformation.total_time}}</p>
            <p>开始：{{orderInformation.activ_begin_time}}</p>
            <p>结束：{{orderInformation.activ_end_time}}</p>
            <p>地点：{{orderInformation.country}}&nbsp;&nbsp;{{orderInformation.city}}</p>
            <p>预定人数：{{orderInformation.num}} &nbsp;人</p>
          </div>
        </div>
      </div>
      <div v-if="orderInformation.house.length" style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;display: flex;justify-content: space-between"><span>预定住宿</span><span>预定房间</span><span>住宿单价</span><span>预定总价</span></p>
        <div v-for="(item,index) in orderInformation.house">
          <p style="padding:10px 0;display: flex;justify-content: space-between">
            <span>{{item.acthouse.flag == 1? '露营':item.acthouse.flag == 2? '民宿':'酒店'}}</span>
            <span><i class="el-icon-close"></i>{{item.num}}</span>
            <span>￥&nbsp;{{item.union_price}}</span>
            <span>￥&nbsp;{{item.price}}</span>
          </p>
        </div>
      </div>
      <div v-if="orderInformation.house.length" style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;display: flex;justify-content: space-between"><span>退款住宿</span><span>退款房间</span><span>住宿 单价</span><span>退款总价</span></p>
        <div v-for="(item,index) in orderInformation.house">
          <p style="padding:10px 0;display: flex;justify-content: space-between">
            <span>{{item.acthouse.flag == 1? '露营':item.acthouse.flag == 2? '民宿':'酒店'}}</span>
            <span><i class="el-icon-close"></i>{{item.refund_num}}</span>
            <span>￥&nbsp;{{item.union_price}}</span>
            <span>￥&nbsp;{{parseInt(item.refund_num)*parseInt(item.union_price)}}</span>
          </p>
        </div>
      </div>
      <div v-if="orderInformation.refund_num" style="margin:10px 0;background-color: #fff;padding:0 10px;font-size:14px;;display: flex;justify-content: space-between">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">退款人数</p>
        <p style="line-height: 40px">{{orderInformation.refund_num}}</p>
      </div>
      <div style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">价格信息</p>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>活动单价价格：</span><span><span>￥</span>&nbsp;&nbsp;{{orderInformation.act_union_price}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>实际总额：</span><span><span>￥</span>&nbsp;&nbsp;{{orderInformation.total_price}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>基金抵扣：</span><span><span>APY</span>&nbsp;-&nbsp;{{orderInformation.balance}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>实际支付：</span><span><span>￥</span>&nbsp;&nbsp;{{orderInformation.pay_price}}</span>
        </div>
        <div v-if="orderInformation.refund_total_price" style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>退款总额：</span><span><span>￥</span>&nbsp;+&nbsp;{{orderInformation.refund_total_price}}</span>
        </div>
      </div>
      <div style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <div style="padding:20px 10px;text-align: right">
          <el-button type="primary" plain @click="dispute">提交纠纷</el-button>
          <el-button type="primary" @click="refund" v-if="orderInformation.ispay == 1 && orderInformation.iscomplete !=2" plain>退款</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import '../../../static/css/person/iconfont.css'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "orderFor",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            order_id:'',
            orderInformation:'',
            type:''
          }
      },
      components:{
        LoadingImg
      },
      methods:{
        dispute(){
          this.$router.push('/dispute')
        },
        goBack(){
          this.$router.go(-1)
        },
        getRouter(){
          this.order_id = this.$route.query.order_id
          this.type = this.$route.query.type
          this.getOrderMation()
        },
        getOrderMation(){
          this.$http.post(this.api + '/OrderD',{
            token: localStorage.getItem('token'),
            order_id: this.order_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.orderInformation = res.data.data
              }else if(res.data.code == 3){
                this.getOrderMation()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        refund(){
          this.$router.push({
            path:'/refund',
            query:{
              information: this.order_id,
              returnFace:this.orderInformation.refund_total_price
            }
          })
        }
      },
      mounted() {
          this.getRouter()
      }
    }
</script>

<style scoped>
.elips{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
