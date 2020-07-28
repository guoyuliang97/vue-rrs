<template>
    <div class="fontweight" style="text-align: left;">
      <div  style="background-color: #fff;padding:20px;">
        <div >
          <div style="line-height:40px;font-size:14px;">
            <h4>已支付订单>退款申请</h4>
          </div>
          <!-- <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button> -->
        </div>
        <div class="flexBetween" style="margin-top:15px;">
          <div :class="[index == 1? 'mainBackColor':'defultColor']" style="height:25px;width:50%;text-align: center;line-height:25px;font-size:12px;" >退款申请</div>
          <div :class="[index == 2? 'mainBackColor':'defultColor']" style="text-align: center;width:50%;line-height:25px;font-size:12px;">退款成功</div>
        </div>
        <div v-if="orderInformation">
          <div v-if="index == 1"  style="margin-top:15px;font-size:12px;">
            <div class="flexStart">
                <div style="height:50px;line-height: 90px;">
                  <b>退款活动</b>
                </div>
                <div style="display: flex;justify-content: flex-start;margin-left:15px;margin-top:10px;">
                <LoadingImg type="new2" :src="orderInformation.cover_image?(orderInformation.cover.domain+orderInformation.cover.themb_url):''" style="width:100px;height:70px;"></LoadingImg>
                <div class="flexColumn" style="margin-left:12px;height:70px;">
                  <p>{{orderInformation.title}}</p>
                  <p>策划人：<b>{{(orderInformation.user.family_name+orderInformation.user.middle_name+orderInformation.user.name)?(orderInformation.user.family_name+'·'+orderInformation.user.middle_name+'·'+orderInformation.user.name):'匿名用户'}}</b></p>
                </div>
              </div>
            </div>
            <div style="line-height:30px;">
              <p>参与人数：{{orderInformation.num}}人</p>
              <p>体验地点：{{orderInformation.place}}</p>
              <p>体验时长：{{orderInformation.total_time}}</p>
              <p>体验时间：{{orderInformation.activ_begin_time}}—{{orderInformation.activ_end_time}}</p>
            </div>
            <hr class="line">
            <div>
              <div class="flexStart"> 
                <div>价格详情：</div>
                <div>
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
              </div>
              <div class="flexStart">
                <div>预定住宿：</div>
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
            </div>
            <hr class="line">
            <div class="flexStart ">
              <div style="line-height:40px;"><b>退款方式&nbsp;<span style="color:#F73737;">*</span></b></div>
              <div style="margin-left:9px;">
                <el-select v-model="value" :disabled="disabled"  style="width:410px;" placeholder="请选择退款方式">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-if="value == 0">
              <div class="flexStart marginBottom">
                <div class="fontweight" style="width:70px;">退订套餐&nbsp;<span style="color:#F73737;">*</span></div>
                <div style="margin-left:9px;">
                  <div class="marginTop" v-for="(item,index) in orderInformation.detail" >
                    <div class="flexStart" v-if="item.type == '1'||item.type == '2'">
                      <div @click="chooseCombine(item,index)"  style="cursor:pointer; width:12px;height:12px;border-radius:50%;border:1px solid rgba(195,195,195,1);" :style="{backgroundColor:isChoose(item,index)?'#14c5ca':'#fff'}"></div>
                      <div style="margin-left:9px;line-height:14px;">
                          {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="marginBottom flexStart">
                  <div style="line-height:40px;"><b>退款人数&nbsp;<span style="color:#F73737;">*</span></b></div>
                  <div class="marginLeft">
                    <div class="flexStart ">
                      <div style="line-height:40px;">标准人数</div>
                      <div  style="margin-left:17px;" class="flexStart">
                        <el-button @click="reduceP(1)" :disabled="person_a == 0"  style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-minus" size="mini" circle></el-button>
                        <span style="line-height:40px;margin: 0 10px;">{{person_a}}</span>
                        <el-button @click="reduceP(2)" :disabled="person_a == adult_num" style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-plus" size="mini" circle></el-button>
                      </div>
                    </div>
                     <div class="flexStart">
                      <div style="line-height:40px">儿童人数</div>
                      <div style="margin-left:17px;" class="flexStart">
                        <el-button @click="reduceK(1)" :disabled="person_k == 0"  style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-minus" size="mini" circle></el-button>
                        <span style="line-height:40px;margin: 0 10px;">{{person_k}}</span>
                        <el-button @click="reduceK(2)" :disabled="person_k == kids_num" style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-plus" size="mini" circle></el-button>
                      </div>
                    </div>
                    
                  </div>
              </div>
              <div v-if="orderInformation.house.length" class="flexStart marginBottom" >
                <div style="line-height:40px;"><b>退款住宿&nbsp;<span style="color:#F73737;">*</span></b></div>
                <div style="display:flex;flex-direction:column;margin-left:9px;">
                    <div v-for="item in  orderInformation.house" style="display:flex;justify-content:flex-start;margin-bottom:15px;">
                      <div style="margin-left:10px;line-height:40px;">
                        <p>{{item.title}}房数</p>
                      </div>
                      <div style="display:flex;justify-content:flex-start;margin-left:20px;line-height:30px;margin-top:5px;">
                        <el-button @click="reduceH(item,1)" :disabled="item.number == 0"  style="border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-minus" size="mini" circle></el-button>
                        <div style="margin: 0 10px;"><b>{{item.number}}</b></div>
                        <el-button @click="reduceH(item,2)" :disabled="item.number == item.num " style="border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-plus" size="mini" circle></el-button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div style="margin-top:25px;display: flex;justify-content: flex-start">
              <div style="line-height:40px;"><b>退款原因&nbsp;<span style="color:#F73737;">*</span></b></div>
              <div style="margin-left:9px;">
                <el-input type="textarea" style="width:410px;" :rows="4" v-model="reson"></el-input>
              </div>
            </div>
            <hr class="line">
            <p style="text-align:right;">订单退款总额：￥&nbsp;&nbsp;{{total_price}}</p>
            <div class="marginBottom" style="display:flex;justify-content:flex-end">
              <span @click="goBack" style="font-size:9px;color:#999999;line-height:23px;cursor:pointer;">取消退款</span>
              <div @click="sendRefun" class="mainButton" style="margin-left:27px;" >提交申请</div>
            </div>
          </div>
          <div v-if="index == 2" style="margin-top:50px;">
            <div style="display: flex;justify-content: space-around">
              <div style="display: flex;justify-content: flex-start;color:#008489">
                <div>
                  <i style="font-size:24px" class="el-icon-circle-check"></i>
                </div>
                <div style="font-size:12px;margin-left:11px;line-height:24px;">
                  退款成功
                </div>
              </div>
            </div>
            <div style="margin-top:16px;color:#999999;text-align: center;font-size:12px;">
              <p>您的金额已退回原始钱包中</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;right:0;bottom: 0;background-color:rgba(255,255,255,.5);left:0;display: flex;justify-content: center;align-items: center;z-index:999">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
  import Loading from '../../public/Loading'
    export default {
        name: "refund",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            index:1,
            value:1,
            house:[],
            options:[
              {label:'全退',value:1},
              {label:'非全退',value:0},
            ],
            reson:'',
            orderInformation:'',
            pay_refund:'',
            balance:'',
            total_price:"",
            order_id:'',
            isLoading:false,
            returnFace:'',
            disabled:false,
            combineL:[],
            adult_num:0,
            kids_num:0,
            person_a:0,
            person_k:0
          }
      },
      components:{
        Loading,
        LoadingImg
      },
      computed:{
        isChoose(item,index){
          return function(item,index){
            if(this.combineL.indexOf(item.combine_id) != -1){
                return true
            }else{
              return false
            }
          }
        },
      },
      watch:{
        value:function(){
          this.getHouseNum()
        },
        

      },
      methods:{
        chooseCombine(item,index){
          if(this.combineL.indexOf(item.combine_id)  == -1){
            this.combineL.push(item.combine_id)
          }else{
            let i  = this.combineL.indexOf(item.combine_id)
             this.combineL.splice(i,1)
          }
          this.getHouseNum()
        },
        goBack(){
          if(this.index == 2){
            this.$router.push('/transaction')
          }else{
            this.$router.go(-1)
          }
        },
        reduceP(val){
          if(val == 1){
            this.person_a -= 1
            this.getHouseNum()
          }else{
            this.person_a += 1
            this.getHouseNum()
          }
        },
        reduceK(val){
          if(val == 1){
            this.person_k -= 1
            this.getHouseNum()
          }else{
            this.person_k += 1
            this.getHouseNum()
          }
        },
        reduceH(item,val){
          if(val == 1){
            item.number -= 1
            this.getHouseNum()
          }else{
            item.number += 1
            this.getHouseNum()
          }
        },
        getHouseNum(){
           let b= []
            for(let i =0;i<this.orderInformation.house.length;i++){
              if(this.orderInformation.house[i].number){
              b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].number})

              }
            }
            this.getAmount(JSON.stringify(b))
        },
        sendRefun(){
          this.isLoading = true
            let b = []
            for(let i =0;i<this.orderInformation.house.length;i++){
               if(this.orderInformation.house[i].number){
              b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].number})

              }
            }
            this.$http.post(this.api + '/RefundSTwo',{
              token: localStorage.getItem('token'),
              verson:2.0,
              order_id: this.order_id,
              person_num: this.value? this.adult_num:this.person_a,
              house: this.value?'':JSON.stringify(b),
              kids_num: this.value?this.kids_num:this.person_k,
              combine: this.value? '': JSON.stringify(this.combineL),
              flag: this.value,
              reason: this.reson,
              type: 0
            })
            .then(res=>{
              if(res.data.code == 1){
                this.isLoading = false
                if(this.pay_refund){
                  this.index = 2
                }else{
                  this.$message({
                    type:'success',
                    message:'您的退款将会根据该活动退款政策在2-3个工作日进行退款！'
                  })
                }
                this.$router.push('/refundOrder')
              }else if(res.data.code == 3){
                this.sendRefun()
              }else if(res.data.code == 0){
                this.isLoading = false
                this.$message({type:'error',message:res.data.msg})
              }
            })
          
        },
        checkRefund(){
          this.$http.post(this.api + '/CheckPolicy',{
            token: localStorage.getItem('token'),
            order_id: this.order_id,
          })
          .then(res=>{
            if(res.data.code == 1){
              this.pay_refund = 1
            }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.checkRefund()
                })
            }else{
              this.pay_refund = 0
            }
          })
        },
        getAmount(house){
          this.$http.post(this.api + '/RefundAmountTwo',{
            token: localStorage.getItem('token'),
            verson:2.0,
            order_id:this.order_id,
            person_num:this.value ==0?this.person_a:'',
            house:this.value ==0?house:'',
            reason:this.reason,
            kids_num:this.value ==0? this.person_k:'',
            combine: this.value ==0?JSON.stringify(this.combineL):'',
            flag:this.value
          })
            .then(res=>{
              if(res.data.code == 1){
                this.balance = res.data.data.balance
                this.total_price = (res.data.data.pay_price).toFixed(2)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAmount(order,person,house,reason,flag)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getOrderMation(){
          this.$http.post(this.api + '/OrderRefundDTwo',{
            token: localStorage.getItem('token'),
            order_id: this.order_id,
          })
            .then(res=>{
              if(res.data.code == 1){

                let data  = res.data.data
                console.log(data)
                for(var i =0;i<data.detail.length;i++){
                  
                  if(data.detail[i].type == '0'){
                    this.adult_num = data.detail[i].adult 
                    this.kids_num =  data.detail[i].kids
                  }
                }
                for(var i = 0; i < data.house.length;  i++){
                  data.house[i].number = 0
                }
                this.orderInformation = data
                console.log(this.orderInformation)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOrderMation()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
      },
      mounted(){
          this.getOrderMation()
        this.checkRefund()
        this.getAmount()
      },
      created(){
        this.order_id = this.$route.query.information
        this.returnFace = this.$route.query.returnFace
        if(this.returnFace){
          this.disabled = true
          this.value = 0
        }else{
          this.disabled = false
          this.value = 1
        }
      }
    }
</script>

<style scoped>

</style>
