<template>
    <div>
      <div style="background-color:#fff;padding: 20px;text-align: left">
        <p style="margin-bottom: 30px;">您未完成订单：</p>
          <div v-for="(item,index) in orderList" :key="index" style="margin-bottom:50px; ">
            <div style="display: flex;justify-content: flex-start;background-color:#f5f5f5;padding:10px;color:#aaaaaa;">
              <b>{{item.create_time}}</b>
              <div style="font-size:13px;margin-left:10px;">订单号：{{item.order_no}}</div>
            </div>
            <div style="display: flex;justify-content: flex-start;margin:10px 0;">
              <div>
                <LoadingImg type="3" :src="item.cover.domain + item.cover.themb_url" style="width:200px;height:120px;" ></LoadingImg>
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
                  活动时间：{{item.activ_begin_time}}—{{item.activ_end_time}}
                </div>
              </div>
              <div style="line-height:30px;font-size:14px;margin-left:20px;position: relative">
                <p>活动总价：<b>{{item.total_price}}</b></p>
                <p>基金抵扣：<b>-&nbsp;{{item.balance}}</b></p>
                <p >支付价格：<b style="color:#008489;font-size:15px;">{{item.pay_price}}</b></p>
                <div>
                  <span @click="goFor(item,index)" style="padding:10px;color:#fff;background-color:#ff6200;border-radius: 5px;cursor: pointer"><b>立即付款</b></span>
                </div>
                <div onselectstart="return false" style="transform:rotate(-45deg);display: flex;justify-content: flex-start;line-height:50px;color:#349397;position:absolute;right:-70px;top:60px;">
                  — —
                  <div style="width:50px;height:50px;border-radius: 50% 50%;border:1px solid #349397;text-align: center;line-height:50px;">
                    未完成
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
        <div v-show="goPay" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.3);z-index:990 ;">
          <div style="width:500px;padding:20px;border-radius: 15px;background-color:#fff;text-align: center;position: fixed;top:50%;left:50%;margin-top: -150px;margin-left: -250px;">
            <div style="display: flex;justify-content: space-between;margin-bottom: 20px">
              <div style="text-align: right;width:60%">选择支付方式</div>
              <div>
                <i @click="closePay" style="font-size: 25px;" class="el-icon-close"></i>
              </div>
            </div>
            <div style="width:500px;height:150px;overflow:hidden">
              <div style="width:518px;height:150px;overflow-y: scroll;" >
                <div v-for="(item,index) in payList" @click="choosePay(item,index)" style="cursor:pointer;display: flex;justify-content: space-between;align-items: center;padding: 20px;border-bottom: 1px solid #eee;" :style="{border: clickIndex == index? '2px solid #008489':''}">
                  <div style="display: flex;justify-content: flex-start;align-items: center">
                    <div style="width:10px;height:10px;border-radius: 50%" :style="{backgroundColor: clickIndex == index? '#008489':'#C0C0C0'}">
                    </div>
                    <div style="margin-left: 20px;display: flex;justify-content: flex-start;align-items: center">
                      <img :src="item.img" width="20px" height="20px" >
                      <span style="margin-left:20px;">{{item.name}}</span>
                    </div>
                  </div>
                  <div style="color:#EE893F">
                   {{payPrice}}元
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align: left;margin-top:10px;">
              <el-button @click="addBank"  size="mini" :style="{backgroundColor: isBank? '#D7D7D7':'#fff',color:isBank?'#858686':'#000'}"   icon="el-icon-plus">添加信用卡</el-button>
            </div>
            <div v-if="isBank" style="border: 1px solid #008489;padding: 20px;display: flex;justify-content: space-between;align-items: center;margin-top:20px;">
              <div style="font-size: 12px;">请输入您的银行卡号:</div>
              <el-input type="tel" style="width:250px;"></el-input>
              <el-button type="primary" @click="checkedBank" size="mini">确认</el-button>
            </div>
            <div v-if="payFor != 2 && !isBank" style="text-align: right">
                <el-button type="primary"  @click="goPayM">确定</el-button>
              </div>
              <div v-if="payFor == 2">
                <form :model="form"  :action="api + '/Pay'" method="get" >
                  <input name="token" type="hidden" v-model="form.token">
                  <input name="order_id" type="hidden" v-model="form.order_id">
                  <input name="pay_type" type="hidden" v-model="form.pay_type">
                  <button type="submit" style="width:70px;height:40px;border-radius:5px;background-color:#008489;border:1px solid #eee;cursor: pointer;float: right;color:#fff;" class="choose" >确定</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      <div v-show="isWeixin" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:999">
          <div style="position:fixed;top:50%;left:50%;width:360px;height:350px;background-color:#fff;border-radius: 10px;margin-top:-195px;margin-left:-200px;padding:20px;">
            <div v-if="isPay == 0">
              <div style="text-align: right">
                <i class="el-icon-close" style="font-size:25px;" @click="closeWx"></i>
              </div>
              <div style="width:240px;height:300px;margin: 0 auto;border-radius:5px;text-align: center;background-color: #fff;padding:20px;">
                <div style="display: flex;justify-content: flex-start;width:150px;margin:0 auto;">
                  <div>
                    <i style="font-size:40px;color:green" class="iconfont icon-changyonglogo28"></i>
                  </div>
                  <div style="margin-left:20px;">
                    <span><b>微信支付</b></span><br>
                    <span style="font-size:15px;">WeChat Pay</span>
                  </div>
                </div>
                <div style="margin:20px 0;" id="weixin"></div>
                <div>
                  <p>用微信扫码付款</p>
                </div>
                <div style="display: flex;justify-content: space-between;">
                  <span>-</span><span>方便</span><span>|</span><span>快捷</span><span>|</span><span>安全</span><span>-</span>
                </div>
              </div>
            </div>
            <div v-if="isPay == 1">
              <div style="display: flex;justify-content: space-between;color:orangered" >
                <div v-if="payStatus == 1" style="width:0px;height:0px;border-top:70px solid green;border-left:1px solid green;border-right:70px solid transparent;position: relative">
                  <div style="transform:rotate(45deg);position:absolute;margin-top:-70px;right:-31px;font-family: 华文楷体;font-weight: bold;color:#fff; ">成功</div>
                </div>
                <div v-if="payStatus == 2" style="width:0px;height:0px;border-top:70px solid orangered;border-left:1px solid orangered;border-right:70px solid transparent;position: relative">
                  <div style="transform:rotate(45deg);position:absolute;margin-top:-70px;right:-31px;font-family: 华文楷体;font-weight: bold;color:#fff; ">失败</div>
                </div>
                <div style="display: flex;justify-content: flex-start;padding:10px 0;">
                  <div style="border-radius:5px;padding:0px 10px;">
                    <i style="font-size:45px;color:orangered" class="iconfont icon-changyonglogo28"></i>
                  </div>
                  <div>
                    <span><b>微信支付</b></span><br>
                    <span style="font-size:15px;">WeChat Pay</span>
                  </div>
                </div>
              </div>
              <div style="text-align: center;line-height:40px;">
                <p v-if="payStatus == 1"><i style="font-size:50px;color:green" class="el-icon-success"></i></p>
                <p v-if="payStatus == 2"><i style="font-size:50px;color:orangered" class="el-icon-error"></i></p>
                <p v-if="payStatus == 1" style="font-size:20px;"><b>您已支付成功</b></p>
                <p v-if="payStatus == 2" style="font-size:20px;color:orangered"><b>您支付已过期</b></p>
                <p v-if="payStatus == 1">欢迎预定Allptp体验项目，希望您体验愉快！</p>
                <p v-if="payStatus == 2" style="color:orangered">您的支付时间已过期，请重新支付！</p>
                <p v-if="payStatus == 1" style="font-size:15px;color:green">此订单已添加到您的交易中心！请您及时核实！</p>
                <p v-if="payStatus == 2" style="font-size:15px;color:orangered">此订单已添加到您的未完成订单！您可前往支付！</p>
                <div v-if="payStatus == 1" style="display: flex;justify-content: space-between;margin-top:50px;">
                  <el-button @click="payClose" style="color:green"><i class="el-icon-arrow-left"></i>继续浏览</el-button>
                  <el-button style="color:green">订单中心<i class="el-icon-arrow-right"></i></el-button>
                </div>
                <div v-if="payStatus == 2" style="display: flex;justify-content: space-between;margin-top:50px;">
                  <el-button @click="payClose" style="color:orangered;border:1px solid orangered"><i class="el-icon-arrow-left"   ></i>重新提交</el-button>
                  <el-button style="color:orangered;border:1px solid orangered">前往支付<i class="el-icon-arrow-right"></i></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div v-show="isLoading" style="position:fixed;z-index:999;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;background-color: rgba(255,255,255,.5)">
        <Loading></Loading>
      </div>
    </div>
</template>
<script>
  import None from '../../public/noNumber'
  import Loading from '../../public/Loading'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "noComplete",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            orderList:[],
            total:0,
            payFor:'',
            goPay:false,
            orderId:"",
            form:{
              token: localStorage.getItem('token'),
              order_id:"",
              pay_type:''
            },
            isWeixin:false,
            isPay:'',
            payStatus:'',
            timeOut:'',
            isLoading:false,
            payList:[
              {img: '../../../static/img/static/aliPay.png',name:'支付宝'},
              {img: '../../../static/img/static/weChat.png',name:'微信'},
            ],
            clickIndex: -1,
            isBank:false,
            payPrice:''
          }
      },
      components:{
        Loading,
        None,
        LoadingImg
      },
      watch:{
        payFor:function(){
          if(this.payFor == 2){
            this.form.order_id = this.orderId
            this.form.pay_type = this.payFor
          }
        }
      },
      methods:{
          closePay(){
            this.goPay = false
            this.clickIndex = -1
          },
        checkedBank(){

        },
        checkOrder(item,index){
          this.$router.push({
            name: 'orderFor',
            query:{
              order_id: item.order_id,
              type: 2
            }
          })
        },
        handleCurrentChange(val){
          this.getOrderList(val)
        },
        getOrderList(num){
          this.$http.post(this.api + '/orderl',{
            token: localStorage.getItem('token'),
            page: num,
            flag: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                this.orderList =  res.data.data.data
                this.total = res.data.data.total
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
        },
        goFor(item,index){
          this.goPay = !this.goPay
          this.orderId = item.order_id
          this.payPrice = item.pay_price
        },
        goPayM(){
          if(this.payFor == 1){
            this.isLoading = true
            this.$http.post(this.api + '/Pay',{
              token: localStorage.getItem('token'),
              order_id: this.orderId,
              pay_type: this.payFor
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.goPay = false
                  this.isWeixin = true
                  this.isPay = 0
                  this.isWeixin = true
                  document.getElementById('weixin').innerHTML = res.data.data.url
                  this.isLoading = false
                  this.setTime()
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.goPayM()
                      })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.$message({
              type: 'info',
              message:'选择支付方式'
            })
          }
        },
        setTime(){
          let a = 0
          this.timeOut = setInterval(()=>{
            if(a < 300){
              this.$http.post(this.api + '/OrderIsPay',{
                token: localStorage.getItem('token'),
                order_id: this.orderId
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(res.data.data.pay_status == 1){
                      this.isPay = 1
                      this.payStatus = 1
                      clearInterval(this.timeOut);
                    }
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.setTime()
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
              a+=1;
            }else{
              clearInterval(this.timeOut);
              this.isPay = 1
              this.payStatus = 2
            }
          },1000)
        },
        payClose(){
          this.isWeixin = false
          this.isPay = ''
          this.payStatus = ''
        },
        closeWx(){
          this.isWeixin = false
          clearInterval(this.timeOut)
        },
        choosePay(item,index){
          this.clickIndex = index
          if(index == 0){
            this.payFor = 2
          }else if(index == 1){
            this.payFor = 1
          }else{
            this.payFor = 3
          }
        },
        addBank(){
          this.isBank = !this.isBank
        }
      },
      mounted() {
       this.getOrderList(1)
      },
      destroyed(){
        clearInterval(this.timeOut);
      }
    }
</script>

<style scoped>

</style>
