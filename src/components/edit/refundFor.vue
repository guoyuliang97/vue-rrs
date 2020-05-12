<template>
    <div v-if="orderInformation" style="text-align: left;font-weight:bold;">
      <div style="background-color: #fff;padding:20px;font-size:14px;">
        <div>
          <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
        </div>
        <div style="text-align: center;padding:30px 0;font-size:16px;">
          <div v-if="orderInformation.type == 0">
            <p v-if="orderInformation.audit == 0" class="fontweight">您的订单正在退款申请中</p>
            <p v-if="orderInformation.audit == 1" class="fontweight"><span><i class="el-icon-success" style="color:#14C5CA;font-size:20px;"></i>&nbsp;</span>您的订单已退款成功</p>
            <!-- <p v-if="orderInformation.audit == 1"  style="color:red;font-size:14px;margin-top:10px;">(退款原因：{{orderInformation.refund_reason}})</p> -->
            <p v-if="orderInformation.audit == 2" class="fontweight" ><span><i class="el-icon-warning" style="color:#DC4242;font-size:20px;"></i>&nbsp;</span>您的订单已被拒绝退款</p>
            <p v-if="orderInformation.audit == 2" style="color:red;font-size:14px;margin-top: 10px;">(拒绝原因:{{orderInformation.refund_reason}})</p>
            <p v-if="orderInformation.audit == 1" class="mainColor contentTitle" style="background-color: #fff;text-align:center;margin-top:10px">（退款金额已原路退回，请注意查收）</p>

          </div>
          <div v-if="orderInformation.type == 1">
            <p>您的订单已被策划人退款</p>
            <p  style="color:red">(退款原因：{{orderInformation.refund_reason}})</p>
          </div>
        </div>
        <p class="contentTitle fontweight">订单详情<span v-if="orderInformation.is_refund == 1" style="color:red">(有退款)</span></p>
        <div >
          <div class="flexStart marginBottom">
            <LoadingImg type="3" :src="orderInformation.cover.domain+ orderInformation.cover.image_url" style="width:100px;height:70px;overflow: hidden"></LoadingImg>
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
           <div>
             <div class="marginTop" v-for="(item,index) in orderInformation.detail">
               <div v-if="item.type == '1'||item.type == '2'">
                {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
               </div>
               <div v-if="item.type == '0'">
                <div class="marginTop">标准<span class="marginLeft"></span>{{item.adult}}人<span class="marginLeft"></span>¥{{item.adult_price}}</div>
                <div >儿童<span class="marginLeft"></span>{{item.kids}}人<span class="marginLeft"></span>¥{{item.kids_price}}</div>	
               </div>
              </div>
           </div>
         </div>
         <div class="flexStart">
           <div>住宿信息：</div>
           <div>
             <p class="marginTop" v-for="(item,index) in orderInformation.house"> 
              <span>{{item.title}}</span>
              <span class="marginLeft"></span>
              <span>房数<i class="el-icon-close"></i>{{item.num}}</span>
              <span class="marginLeft"></span>
              <span>总额￥&nbsp;{{item.price}}</span>
            </p>
           </div>
         </div>
         <hr class="line">
          <div style="line-height:30px;">
            <p>退款方式：{{orderInformation.flag?'全款':'非全款'}}</p>
            <div class="flexStart">
              <div>退款人数：</div>
              <div>
                <div  v-for="(item,index) in orderInformation.refund_detail">
                  <div v-if="item.type == '0'">
                    <span >标准{{item.adult}}人</span><span class="marginLeft"></span>
                    <span >儿童{{item.kids}}人<span class="marginLeft"></span>
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
                <div  v-for="(item,index) in orderInformation.refund_detail">
                  <div v-if="item.type == '3'">
                    {{item.name}}<span class="marginLeft"></span>房数X{{item.house_num}}<span class="marginLeft"></span>¥{{item.price}}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
         <hr class="line">
         <div style="line-height:30px;">
           <p>订单编号：{{orderInformation.order_no}}</p>
           <p>退款总额：<span style="color:red">￥{{orderInformation.refund_total_price}}</span></p>
         </div>
          <hr class="line">
          <div class="flexEnd">
            <div class="mainButton" @click="sendDis">提交纠纷</div>
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
          order_id:''
        }
    },
  components:{
    LoadingImg
  },
  methods:{
      sendDis(){
      this.$router.push({
            path:'/dispute',
            query:{
              information: this.order_id
            }
          })
      },
      getRefund(){
        this.$http.post(this.api + '/RefundDTwo',{
          token: localStorage.getItem('token'),
          refund_id: this.refundId,
          verson:2.0
        })
          .then(res=>{
            if(res.data.code == 1){
              this.orderInformation = res.data.data
              this.order_id = res.data.data.order_id
              console.log(this.orderInformation)
            }else if(res.data.code == 3){
            
                this.getRefund()
             
            }else if(res.data.code == 0){
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
.elips{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 70px;
  margin-left:15px;
}
</style>
