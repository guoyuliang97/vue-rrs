<template>
  <div>
    <div style="background-color:#fff;padding: 20px;text-align: left">
      <p style="margin-bottom: 30px;font-weight:bold">您已完成订单：</p>
      <div  v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px;">
          <div style="color:#666666">
            <div style="font-size:13px">订单号：{{item.order_no}}</div>
          </div>
          <div class="flexStart" style="margin:10px 0;">
            <div>
              <LoadingImg type="2" :src="item.cover.domain + item.cover.themb_url" style="width:200px;height:120px;" ></LoadingImg>
            </div>
            <div style="font-size:14px;margin-left:10px;line-height:30px;cursor: pointer" @click="checkOrder(item,index)">
              <h4>{{item.title}}</h4>
              <div >{{item.num}}人参与</div>
              <div>活动地点：<span>{{item.place}}</span>
                <!-- <span>{{item.province == '上海'||item.province =='北京'||item.province =='重庆'||item.province =='天津'? item.province + '市': item.province + '省'}}</span>
                <span>{{item.city + '市'}}</span>
                <span>{{item.region}}</span> -->
              </div>
              <div>
                参与时间：{{item.activ_begin_time}}—{{item.activ_end_time}}
              </div>
            </div>
            <div style="line-height:45px;font-size:14px;margin-left:20px;position: relative">
              <p >支付价格：<b style="font-size:15px;">{{item.total_price}}</b></p>
               <div @click="item.isevaluate == 1?discuss(item,index):''">
                  <span style="padding:10px;color:#fff;border-radius: 5px;cursor: pointer;" :style="{backgroundColor:item.isevaluate == 1?'#14C5CA':'#A8A8A8'}"><b>{{item.isevaluate == 1? '立即评价':'已评价'}}</b></span>
               </div>
            </div>
          </div>
          <div v-if="item.is_differ == 1">
            <div class="no_cheap" v-if="JSON.stringify(item.no_reach_differ) != '[]'">
              <!-- <div class="bar"> 
                <div class="howBar" :style="{width: ((Number(item.num))/(Number(item.no_reach_differ.num))) *100 + 'px'}"></div>
              </div> -->
              <div class="marginLeft">【返差价】当前同时间段内其他用户参与者共{{item.num}}人，活动结束时满{{item.no_reach_differ.num}}人返预付{{Number(item.no_reach_differ.refund_rate)}}%，
                <span v-if="JSON.stringify(item.reach_differ) != '[]'">当前已满足满{{item.reach_differ.num}}人返预付{{Number(item.reach_differ.refund_rate)}}% </span>              
              </div>
            </div>
            <div class="no_cheap" v-if="JSON.stringify(item.no_reach_differ) == '[]' && JSON.stringify(item.reach_differ) != '[]'">
              <!-- <div class="bar"> 
                <div class="howBar" style="width:100px"></div>
              </div> -->
              <div class="marginLeft">【返差价】当前已满足满{{item.reach_differ.num}}人返预付{{Number(item.reach_differ.refund_rate)}}%              
              </div>
            </div>
          </div>
        </div>
     
      <None v-if="!orderList.length && !isLoading" type="order"></None>
      <div v-show="isLoading" style="position:fixed;z-index:990;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;background-color: rgba(255,255,255,.5)">
        <Loading></Loading>
      </div>
      <div style="text-align:center">
        <el-pagination @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import None from '../../public/noNumber'
  import LoadingImg from '../../public/loadingImg'
  export default {
    name: "completeOrder",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        orderList:[],
        total:0,
        isLoading:false
      }
    },
    components:{
      None,
      Loading,
      LoadingImg
    },
    methods:{
      //评价
      discuss(item,index){
        this.$router.push({
          path: '/Orderevaluate',
          query:{
            order_id: item.order_id
          }
        })
      },
      checkOrder(item,index){
        this.$router.push({
          name: 'orderFor',
          query:{
            order_id: item.order_id,
            type: 1
          }
        })
      },
      handleCurrentChange(val){
        this.getOrderList(val)
      },
      getOrderList(num){
        this.isLoading = true
        this.$http.post(this.api + '/OrderLTwo',{
          token: localStorage.getItem('token'),
          page: num,
          flag: 1,
          iscomplete:2,
          verson: 2.0,
          sort:2
        })
          .then(res=>{
            if(res.data.code == 1){
              this.orderList =  res.data.data.data
              this.total = res.data.data.total
              this.isLoading = false
            }else if(res.data.code == 3){
              this.getOrderList(num)
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    mounted() {
     this.getOrderList(1)
      localStorage.removeItem('house')
    }
  }
</script>

<style scoped>
.no_cheap{
  background:rgba(245,247,250,1);
  padding: 5px;
  color:rgba(149,151,155,1);
  display: flex;
  justify-content: flex-start;
  font-size:14px;
}
.bar{
  width: 100px;
  height: 10px;
  background-color: #fff;
  border:1px solid rgba(165,165,165,1);
  border-radius:10px;
  overflow: hidden;
  margin-top: 5px;
 
}
.howBar{
  height:10px;
  background:rgba(213,216,221,1);
}
</style>
