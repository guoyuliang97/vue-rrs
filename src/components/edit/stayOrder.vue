<template>
    <div>
      <div style="background-color:#fff;padding: 20px;text-align: left">
        <p style="margin-bottom: 30px;font-weight:bold">您待体验订单：</p>
        <div  v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px;">
          <div style="color:#aaaaaa">
            <!-- <b >{{item.create_time}}</b> -->
            <div style="font-size:13px">订单号：{{item.order_no}}</div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin:10px 0;">
            <div>
              <LoadingImg type="3" :src="item.cover.domain + item.cover.themb_url" style="width:200px;height:120px;" ></LoadingImg>
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
            <div style="line-height:90px;font-size:14px;margin-left:20px;position: relative">
              <!-- <p>活动总价：<b>{{item.total_price}}</b></p>
              <p>基金抵扣：<b>-&nbsp;{{item.balance}}</b></p> -->
              <p >支付价格：<b style="font-size:15px;">￥{{item.total_price}}</b></p>
              <!-- <div onselectstart="return false" style="transform:rotate(-45deg);display: flex;justify-content: flex-start;line-height:50px;color:#349397;position:absolute;right:-70px;top:60px;">
                — —
                <div style="width:50px;height:50px;border-radius: 50% 50%;border:1px solid #349397;text-align: center;line-height:50px;">
                  待体验
                </div>
                — —
              </div> -->
            </div>
          </div>
          <div class="no_cheap" v-if="item.no_reach_differ.length">
            <div class="bar"> 
              <div class="howBar" :style="{width: ((Number(item.num))/(Number(item.no_reach_differ.num))) *100 + 'px'}"></div>
            </div>
            <div class="marginLeft">【返差价】当前同时间段内其他用户参与者共{{item.num}}人，活动结束时满{{item.no_reach_differ.num}}人返预付{{orderList.no_reach_differ.refund_rate}}，
              当前已满足满{{item.reach_differ.num}}人返预付{{Number(item.reach_differ.refund_rate)}}%               
            </div>
          </div>
          <div class="no_cheap" v-if="!item.no_reach_differ.length">
            <div class="bar"> 
              <div class="howBar" :style="{width: ((Number(item.num))/(Number(item.reach_differ.num))) *100 + 'px'}"></div>
            </div>
            <div class="marginLeft">【返差价】当前已满足满{{item.reach_differ.num}}人返预付{{Number(item.reach_differ.refund_rate)}}%              
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
        name: "stayOrder",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            orderList:[],
            total:0
          }
      },
      components:{
        None,
        LoadingImg
      },
      methods:{
        handleCurrentChange(val){
          this.getOrder(val)
        },
        getOrder(val){
          this.$http.post(this.api + '/OrderLTwo',{
            token: localStorage.getItem('token'),
            version:2.0,
            page: val,
            flag: 1,
            iscomplete: 0,
            sort: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.orderList =  res.data.data.data
                this.total = res.data.data.total
                console.log(this.orderList)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOrder(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        checkOrder(item,index){
          this.$router.push({
            name: 'orderFor',
            query:{
              order_id: item.order_id,
              type: 3
            }
          })
        },
      },
      mounted(){
          this.getOrder(1)
      },
    }
</script>

<style scoped>
.no_cheap{
  background:rgba(255,241,241,1);
  padding: 5px;
  color:#F5764F;
  display: flex;
  justify-content: flex-start;
  font-size:14px;
  height: 40px;
  line-height: 40px;
}
.bar{
  width: 100px;
  height: 10px;
  background-color: #fff;
  border:1px solid rgba(255,108,0,1);
  border-radius:10px;
  overflow: hidden;
  margin-top: 20px;
  
}
.howBar{
  height:10px;
  background:rgba(255,223,209,1);
}

</style>
