<template>
  <div>
    <div style="background-color:#fff;padding: 20px;text-align: left">
      <p style="margin-bottom: 30px;">您已完成订单：</p>
      <div v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px;" v-if="item.status == 0">
        <div style="display: flex;justify-content: flex-start;background-color:#f5f5f5;padding:10px;color:#aaaaaa">
          <b >{{item.create_time}}</b>
          <div style="font-size:13px;margin-left:10px;">订单号：{{item.order_no}}</div>
        </div>
        <div style="display: flex;justify-content: space-between;margin:10px 0;">
          <div style="display: flex;justify-content: flex-start">
            <div>
              <LoadingImg type="3" :src="item.cover.domain + item.cover.themb_url" style="width:200px;height:120px;"></LoadingImg>
            </div>
            <div style="font-size:14px;margin-left:10px;line-height:30px;cursor: pointer" @click="checkOrder(item,index)">
              <h4>{{item.title}}</h4>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</div>
              <div>活动分类：<span v-for="items in item.kind"><span>{{items.kind_name}}</span>/</span></div>
              <div>活动地点：<span>{{item.country}}</span>
                <span>{{item.province == '上海'||item.province =='北京'||item.province =='重庆'||item.province =='天津'? item.province + '市': item.province + '省'}}</span>
                <span>{{item.city + '市'}}</span>
                <span>{{item.region}}</span>
              </div>
              <div>
                活动时间：{{item.total_time}}
              </div>
            </div>
          </div>
          <div style="line-height:30px;font-size:14px;position: relative;width:170px;">
            <p>活动总价：<b>{{item.total_price}}</b></p>
            <p>基金抵扣：<b>-&nbsp;{{item.balance}}</b></p>
            <p >支付价格：<b style="color:#008489;font-size:15px;">{{item.pay_price}}</b></p>
            <div @click="item.isevaluate == 1?discuss(item,index):''">
              <span style="padding:10px;color:#fff;border-radius: 5px;cursor: pointer;" :style="{backgroundColor:item.isevaluate == 1?'green':'#A8A8A8'}"><b>{{item.isevaluate == 1? '立即评价':'已评价'}}</b></span>
            </div>
            <div onselectstart="return false" style="transform:rotate(-45deg);display: flex;justify-content: flex-start;line-height:50px;color:#349397;position:absolute;right:0px;top:50px;">
              — —
              <div style="width:50px;height:50px;border-radius: 50% 50%;border:1px solid #349397;text-align: center;line-height:50px;">
                已完成
              </div>
              — —
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
        this.$http.post(this.api + '/orderl',{
          token: localStorage.getItem('token'),
          page: num,
          flag: 1,
          iscomplete:2,
        })
          .then(res=>{
            if(res.data.code == 1){
              this.orderList =  res.data.data.data
              this.total = res.data.data.total
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getOrderList(num)
                })
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

</style>
