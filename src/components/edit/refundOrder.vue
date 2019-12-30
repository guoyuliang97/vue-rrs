<template>
    <div>
      <div style="background-color:#fff;padding: 20px;text-align: left">
        <p style="margin-bottom: 30px;">您退款订单：</p>
        <div v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px;">
          <div style="display: flex;justify-content: flex-start;background-color:#f5f5f5;padding:10px;color:#aaaaaa">
            <b >{{item.create_time}}</b>
            <div style="font-size:13px;margin-left:10px;">订单号：{{item.order_no}}</div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin:10px 0;">
            <div>
              <LoadingImg type="3" :src="item.cover.domain + item.cover.themb_url" style="width:200px;height:120px;"></LoadingImg>
            </div>
            <div style="font-size:14px;margin-left:10px;line-height:30px;cursor: pointer" @click="checkFund(item,index)">
              <h4>{{item.title}}</h4>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</div>
              <div>活动分类：<span v-for="items in item.kind"><span>{{items.kind_name}}</span>/</span></div>
              <div>活动地点：<span>{{item.country}}</span>
                <span>{{item.province == '上海'||item.province =='北京'||item.province =='重庆'||item.province =='天津'? item.province + '市': item.province + '省'}}</span>
                <span>{{item.city + '市'}}</span>
                <span>{{item.region}}</span>
              </div>
              <div>
                活动时间：{{item.activ_begin_time}}—{{item.activ_end_time}}
              </div>
            </div>
            <div style="line-height:30px;font-size:14px;margin-left:20px;position: relative">
              <p>退款总价：<b>{{item.total_price}}</b></p>
              <p>退款基金：<b>-&nbsp;{{item.balance}}</b></p>
              <p>退款支付价格：<b style="color:#008489;font-size:15px;">{{item.pay_price}}</b></p>
              <div onselectstart="return false" style="transform:rotate(-45deg);display: flex;justify-content: flex-start;line-height:50px;color:#349397;position:absolute;right:-70px;top:60px;">
                — —
                <div v-if="item.type == 0" style="width:50px;height:50px;border-radius: 50% 50%;border:1px solid #349397;text-align: center;line-height:50px;">
                  {{item.audit? item.audit == 1?'已通过':'已拒绝':'申请中'}}
                </div>
                <div v-if="item.type == 1" style="width:50px;height:50px;border-radius: 50% 50%;border:1px solid #349397;text-align: center;line-height:50px;">
                  已退款
                </div>
                — —
              </div>
            </div>
          </div>
        </div>
         <None v-if="!orderList.length" type="order"></None>
        <div style="text-align:center">
          <el-pagination @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
 import None from '../../public/noNumber'
 import LoadingImg from '../../public/loadingImg'
    export default {
        name: "refundOrder",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            orderList:[],
            total:0
          }
      },
      components:{
        None,
        LoadingImg
      },
      methods:{
        //查看
        checkFund(item,index){
          this.$router.push({
            path: '/refundFor',
            query:{
              information: item.refund_id
            }
          })
        },
        handleCurrentChange(val){
          this.getOrderList(val)
        },
        getOrderList(val){
          this.$http.post(this.api + '/RefundLUser',{
            token: localStorage.getItem('token'),
            page: val
          })
          .then(res=>{
            if(res.data.code == 1){
              this.orderList = res.data.data.data
              this.total = res.data.data.total
            }else if(res.data.code == 3){
              this.getOrderList(val)
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
        },
      },
      mounted(){
        this.getOrderList(1)
      }
    }
</script>

<style scoped>

</style>
