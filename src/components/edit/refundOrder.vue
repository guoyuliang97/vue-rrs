<template>
    <div>
      <div style="background-color:#fff;padding: 20px;text-align: left">
        <p style="margin-bottom: 30px;font-weight:bold">您退款订单：</p>
        <div  v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px;">
          <div style="color:#aaaaaa">
            <!-- <b >{{item.create_time}}</b> -->
            <div style="font-size:13px">订单号：{{item.order_no}}</div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin:10px 0;">
            <div>
              <LoadingImg type="2" :src="item.domain + item.themb_url" style="width:200px;height:120px;" ></LoadingImg>
            </div>
            <div style="font-size:14px;margin-left:10px;line-height:40px;cursor: pointer" @click="checkFund(item,index)">
              <h4>{{item.title}}</h4>
              <div>活动地点：<span>{{item.place}}</span>
                <!-- <span>{{item.province == '上海'||item.province =='北京'||item.province =='重庆'||item.province =='天津'? item.province + '市': item.province + '省'}}</span>
                <span>{{item.city + '市'}}</span>
                <span>{{item.region}}</span> -->
              </div>
              <div>
                参与时间：{{item.activ_begin_time}}—{{item.activ_end_time}}
              </div>
            </div>
            <div style="line-height:90px;font-size:14px;margin-left:20px;position: relative">
            
              <p >退款金额：<b style="font-size:15px;">￥{{item.total_price}}</b></p>
              
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
          this.$http.post(this.api + '/RefundLUserTwo',{
            token: localStorage.getItem('token'),
            page: val,
            sort:4
          })
          .then(res=>{
            if(res.data.code == 1){
              this.orderList = res.data.data.data
              this.total = res.data.data.total
            }else if(res.data.code == 3){
              this.getOrderList(val)
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
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
