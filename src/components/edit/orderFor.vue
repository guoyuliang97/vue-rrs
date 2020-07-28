<template>
    <div v-if="orderInformation" class="fontweight" style="text-align: left">
      <div class="flexBetween" style="background-color: #fff;line-height:40px;padding: 10px;">
        <p class="contentTitle fontweight">{{type == 3?'待体验订单>订单详情':type == '4'?'进行中订单>订单详情':''}}</p>
        <p  v-if="type == 1"><span><i class="el-icon-success" style="color:#14c5ca;font-size:20px;"></i>&nbsp;</span><b>您的订单已完成!</b></p>
        <div>
          <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
        </div>
        
        <!--
          <div style="text-align: center;padding:30px 0">
            <p v-if="type == 2"><span><i class="el-icon-warning" style="color:#ff6200;font-size:20px;"></i>&nbsp;</span><b>您的订单还未完成!</b></p>
            <p v-if="type == 1"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>您的订单已完成!</b></p>
            <p v-if="type == 3"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>该订单还待体验!</b></p>
            <p v-if="type == 4"><span><i class="el-icon-success" style="color:green;font-size:20px;"></i>&nbsp;</span><b>该订单正在进行中!</b></p>
            <p style="font-size:12px;margin:10px 0;">{{type == 1?'欢迎下次预定哦~':type == 3?'尽情享受您的旅程哦~':'快去支付哦~'}}</p>
          </div>
          -->
      </div>
      <p v-if="orderInformation.is_refund == 1 && type == 1" class="mainColor contentTitle" style="background-color: #fff;text-align:center">（退款金额已原路退回，请注意查收）</p>
      <div style="background-color: #fff;padding:0 30px;font-size:14px;">
        <p class="contentTitle fontweight">订单详情<span v-if="orderInformation.is_refund == 1" style="color:red">(有退款)</span></p>
          <div >
            <div class="flexStart marginBottom">
              <LoadingImg type="2" :src="orderInformation.cover.domain+ orderInformation.cover.image_url" style="width:100px;height:70px;overflow: hidden"></LoadingImg>
              <p class="elips"><b>{{orderInformation.title}}</b></p>
            </div>
            <div style="line-height:30px;">
            <p>参与人数：{{orderInformation.num}} &nbsp;人</p>
              <p>体验地点：{{orderInformation.place}}</p>
              <p>体验时长：{{orderInformation.total_time}}</p>
              <p>体验时间：{{orderInformation.activ_begin_time}}—{{orderInformation.activ_end_time}}</p>
            </div>
          </div>
         <hr class="line">
          <div class="flexStart">
            <div>价格详情：</div>
            <div v-show="orderInformation.detail.length">
              <div class="marginTop" v-for="(item,index) in orderInformation.detail">
                <div v-if="item.type == '1'||item.type == '2'">
                  {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
                </div>
                <div v-if="item.type == '0'">
                  <div v-if="item.adult" class="marginTop">标准<span class="marginLeft"></span>{{item.adult}}人<span class="marginLeft"></span>¥{{item.adult_price}}</div>
                  <div v-if="item.kids" >儿童<span class="marginLeft"></span>{{item.kids}}人<span class="marginLeft"></span>¥{{item.kids_price}}</div>	
                </div>
                </div>
            </div>
            <div v-show="!orderInformation.detail.length">
              无
            </div>
          </div>
          <div class="flexStart">
            <div>住宿信息：</div>
            <div v-if="orderInformation.house.length">
              <p class="marginTop" v-for="(item,index) in orderInformation.house"> 
                <span>{{item.title}}</span>
                <span class="marginLeft"></span>
                <span>房数<i class="el-icon-close"></i>{{item.num}}</span>
                <span class="marginLeft"></span>
                <span>总额￥&nbsp;{{item.price}}</span>
              </p>
            </div>
            <div v-if="!orderInformation.house.length">
              无
            </div>
          </div>
          <hr v-if="orderInformation.is_refund == 1" class="line">
          <div v-if="orderInformation.is_refund == 1" style="line-height:30px;">
            <p>退款方式：{{orderInformation.flag?'全款':'非全款'}}</p>
            <div class="flexStart">
              <div>退款人数：</div>
              <div>
                <div  v-for="(item,index) in orderInformation.refund_detail">
                  <div v-if="item.type == '0'">
                    <span v-if="item.adult" >标准{{item.adult}}人</span><span class="marginLeft"></span>
                    <span v-if="item.kids" >儿童{{item.kids}}人<span class="marginLeft"></span>
                    ¥{{item.price}}</span>	
                  </div>
                </div>
              </div>
            </div>
            <div class="flexStart">
              <div>退订套餐：</div>
              <div>
                <div  v-for="(item,index) in orderInformation.refund_detail">
                  <div v-if="item.type == '1'||item.type == '2'">
                    {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
                  </div>
                </div>
              </div>
            </div>
            <div class="flexStart">
              <div>退订住宿：</div>
              <div>
                <div v-for="(item,index) in orderInformation.refund_detail">
                  <div v-if="item.type == '3'">
                    <div v-if="item.house_num">
                       {{item.name}}<span class="marginLeft"></span>房数X{{item.house_num}}<span class="marginLeft"></span>¥{{item.price}}
                    </div>
                    <div v-if="!item.house_num">
                        无
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         <hr class="line">
          <div style="line-height:30px;">
            <p>订单总额：￥{{orderInformation.total_price}}</p>
            <p>基金抵扣：{{orderInformation.balance}}</p>
            <p v-if="orderInformation.is_refund == 1">申请退款：￥{{orderInformation.refund_audit_price}}</p>
            <p v-if="orderInformation.is_refund == 1">实际退款：￥{{orderInformation.refund_total_price}}</p>
            <p v-if="type == '1' && orderInformation.is_differ == 1">返差价退款：{{orderInformation.differ_total_price}}</p>
            <p>实际支付：<span style="color:red">￥{{orderInformation.pay_price}}</span></p>
          </div>
         <hr class="line">
         <div style="line-height:30px;">
           <p>支付方式：{{orderInformation.pay_type == 1?'微信支付':orderInformation.pay_type == 2?'支付宝支付':orderInformation.pay_type == 3?'银行卡支付':'基金支付'}}</p>

           <p v-if="type != '2'">下单时间：{{orderInformation.pay_time}}</p>
           <p v-if="type == '2'">创建时间：{{orderInformation.create_time}}</p>
           <p>订单编号：{{orderInformation.order_no}}</p>
         </div>
         <hr class="line">
          <div v-if="type != '2'" style="margin:10px 0;padding:0 10px;font-size:14px;background-color: #fff;">
            <div style="padding:20px 10px;text-align: right">
              <el-button type="primary" plain @click="dispute">提交纠纷</el-button>
              <el-button type="primary" @click="refund" v-if="orderInformation.ispay == 1 && orderInformation.iscomplete !=2" plain>退款</el-button>
            </div>
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
          this.$router.push({
            path:'/dispute',
            query:{
              information: this.order_id
            }
          })
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
          this.$http.post(this.api + '/OrderDTwo',{
            token: localStorage.getItem('token'),
            order_id: this.order_id,
            verson:2.0
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
  line-height: 70px;
  margin-left:15px;
}
</style>
