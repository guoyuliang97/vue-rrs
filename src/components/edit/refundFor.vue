<template>
    <div v-if="orderInformation" style="text-align: left">
      <div style="background-color: #fff;padding:20px;">
        <div>
          <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
        </div>
        <div style="text-align: center;padding:30px 0">
          <div v-if="orderInformation.type == 0">
            <p v-if="orderInformation.audit == 0">您的订单正在退款申请中</p>
            <p v-if="orderInformation.audit == 1">您的订单已退款成功</p>
            <p v-if="orderInformation.audit == 1" style="color:red">(退款原因：{{orderInformation.reason}})</p>
            <p v-if="orderInformation.audit == 2">您的订单已被拒绝退款</p>
            <p v-if="orderInformation.audit == 2" style="color:red">(拒绝原因:{{orderInformation.refuse_reason}})</p>
          </div>
          <div v-if="orderInformation.type == 1">
            <p>您的订单已被策划人退款</p>
            <p  style="color:red">(退款原因：{{orderInformation.reason}})</p>
          </div>
        </div>
      </div>
      <div v-if="orderInformation.person" style="margin:10px 0;background-color: #fff;padding:0 10px;font-size:14px;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">退款游客</p>
        <div v-for="(item,index) in orderInformation.person" :key="index" style="line-height:30px;font-size:14px;border-bottom:1px solid #eee;display: flex;justify-content: flex-start">
          <div style="width:50%"><i class="iconfont icon-wo"></i><span style="margin-left:20px;font-size:13px;">{{item.name}}&nbsp;&nbsp;{{item.mobile}}</span></div>
          <div><i class="iconfont icon-credentials_icon"></i><span style="margin-left:20px;font-size:13px;">{{item.idcard}}</span></div>
        </div>
      </div>
      <div style="background-color: #fff;padding:0 10px;font-size:14px;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">体验信息</p>
        <div style="display: flex;justify-content: flex-start;margin:10px 0;">
          <div>
            <LoadingImg type="3" :src="orderInformation.cover_image?orderInformation.cover.domain+ orderInformation.cover.image_url:''" style="width:300px"></LoadingImg>
          </div>
          <div style="margin-left:20px;line-height:25px;">
            <p class="elips"><b>{{orderInformation.title}}</b></p>
            <p>类型：<span v-for="item in orderInformation.kind"><span>{{item.kind_name}}/</span></span></p>
            <p>时长：{{orderInformation.total_time}}</p>
            <p>开始：{{orderInformation.activ_begin_time}}</p>
            <p>结束：{{orderInformation.activ_end_time}}</p>
            <p>地点：{{orderInformation.country}}&nbsp;&nbsp;{{orderInformation.city}}</p>
            <p>退款人数：{{orderInformation.person_num}}</p>
          </div>
        </div>
      </div>
      <div v-if="orderInformation.house.length" style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;display: flex;justify-content: space-between"><span>退款住宿</span><span>退款数量</span><span>住宿单价</span><span>退款总价</span></p>
        <div v-for="(item,index) in orderInformation.house">
          <p style="padding:10px 0;display: flex;justify-content: space-between">
            <span>{{item.flag == 1? '露营':item.flag == 2? '民宿':'酒店'}}</span>
            <span><i class="el-icon-close"></i>{{item.house_num}}</span>
            <span>￥&nbsp;{{item.union_price}}</span>
            <span>￥&nbsp;{{item.house_price}}</span>
          </p>
        </div>
      </div>
      <div style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">价格信息</p>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>活动价格：</span><span><span>￥</span>&nbsp;&nbsp;{{orderInformation.act_union_price}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>支付总额：</span><span><span>￥</span>&nbsp;&nbsp;{{orderInformation.order_total_price}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>退款总额：</span><span><span>￥</span>&nbsp;+&nbsp;{{orderInformation.total_price}}</span>
        </div>
        <div style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
          <span>退款基金：</span><span><span>APY</span>&nbsp;+&nbsp;{{orderInformation.balance}}</span>
        </div>
      </div>
      <div style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
        <p style="border-bottom:1px solid #eee;padding:10px 0;">订单信息</p>
        <div style="padding:20px 10px;text-align: right">
       <!--   <el-button type="primary"  plain>取消退款</el-button>-->
          <el-button type="primary" plain>联系客服</el-button>
        </div>
      </div>
    </div>
</template>
<script>
  import LoadingImg from '../../public/loadingImg'
export default {
    name: 'refundFor',
    data(){
        return{
          api: this.GLOBAL.baseURL,
          refundId:'',
          orderInformation:'',
        }
    },
  components:{
    LoadingImg
  },
  methods:{
      getRefund(){2
        this.$http.post(this.api + '/RefundD',{
          token: localStorage.getItem('token'),
          refund_id: this.refundId
        })
          .then(res=>{
            if(res.data.code == 1){
              this.orderInformation = res.data.data
              console.log(this.orderInformation)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getRefund()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
    goBack(){
        this.$router.go(-1)
    }
  },
  mounted(){
      this.getRefund()
  },
  created(){
      this.refundId = this.$route.query.information
  }
    
}
</script>
<style scoped>

</style>
