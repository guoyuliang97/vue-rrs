<template>
    <div style="text-align: left">
      <div  style="background-color: #fff;padding:20px;">
        <div style="display: flex;justify-content: space-between">
          <div style="line-height:40px;font-size:14px;">
            <h4>已支付订单>退款申请</h4>
          </div>
          <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
        </div>
        <div style="display: flex;justify-content: space-between;margin-top:15px;">
          <div :style="{backgroundColor:index == 1? '#008489':'#F4F6F9',color:index == 1?'#fff':'#A8A8A8'}" style="height:25px;width:50%;text-align: center;line-height:25px;font-size:12px;" >退款申请</div>
          <div :style="{backgroundColor:index == 2? '#008489':'#F4F6F9',color:index == 2?'#fff':'#A8A8A8'}" style="text-align: center;width:50%;line-height:25px;font-size:12px;">退款成功</div>
        </div>
        <div v-if="orderInformation">
          <div v-if="index == 1"  style="margin-top:15px;font-size:12px;">
            <div style="display: flex;justify-content: flex-start">
              <div style="height:50px;line-height: 90px;">
                <b>退款用户</b>
              </div>
               <div style="display: flex;justify-content: flex-start;margin-left:15px;margin-top:10px;">
              <img :src="orderInformation.user.head_image?(orderInformation.user.headimage.domain+orderInformation.user.headimage.themb_url):'../../../static/img/static/user.png'" width="70px" height="70px" style="border-radius: 50%;">
              <div style="line-height: 25px;margin-left:12px;height:70px;">
                <p><b>{{(orderInformation.user.family_name+orderInformation.user.middle_name+orderInformation.user.name)?(orderInformation.user.family_name+'·'+orderInformation.user.middle_name+'·'+orderInformation.user.name):'匿名用户'}}</b></p>
                <p><span>参与人数:{{orderInformation.num}}人</span></p>
                <p>已支付：￥{{orderInformation.total_price}}</p>
              </div>
            </div>
            </div>
            <div v-if="orderInformation.house.length" style="margin-top:25px;display: flex;justify-content: flex-start">
              <div style="line-height:40px;">
                <b>预定住宿</b>
              </div>
              <div style="margin-left:15px;display:flex;justify-content:space-between">
                <div v-for="(item,index) in orderInformation.house" style="display:flex;justify-content:flex-start;margin-right:15px;">
                  <div style="position:relative;width:100px;height:70px;">
                    <img :src="item.image[0].domain+ item.image[0].themb_url" width="100px" height="70px">
                    <span style="position:absolute;bottom:0;right:0;padding:2px 3px;background-color:#333333;color:#fff;">{{item.acthouse.flag == 1?'露营':item.acthouse.flag == 2?'民宿':'酒店'}}</span>
                  </div>
                  <div style="margin-left:10px;">
                    <p>{{item.title}}</p>
                    <p style="margin: 10px 0;">标准{{item.max_person}}人间({{item.num}})</p>
                    <p><b>￥{{item.price}}</b></p>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top:25px;display: flex;justify-content: flex-start;align-items: center">
              <div style="line-height:40px;"><b>支付金额&nbsp;</b></div>
              <div style="margin-left:15px;">
                <div style="color:#008489; ">￥&nbsp;&nbsp;{{orderInformation.total_price}}</div>
              </div>
            </div>
            <div style="margin-top:25px;display: flex;justify-content: flex-start">
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

            <div style="margin-top:25px;display: flex;justify-content: flex-start">
              <div style="line-height:40px;"><b>退款人数&nbsp;<span style="color:#F73737;">*</span></b></div>
              <div style="margin-left:9px;display:flex;justify-content:flex-start">
                 <el-button @click="reduceP(1)" :disabled="value == 1||personNum == 0"  style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-minus" size="mini" circle></el-button>
                <span style="line-height:40px;margin: 0 10px;">{{value == 1?parseInt(orderInformation.num) - parseInt(orderInformation.refund_num): personNum}}</span>
                <el-button @click="reduceP(2)" :disabled="value == 1||personNum == parseInt(orderInformation.num) - parseInt(orderInformation.refund_num)" style="margin-top:5px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-plus" size="mini" circle></el-button>
              </div>
            </div>
            <div v-if="orderInformation.house.length" style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款住宿&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="display:flex;flex-direction:column;margin-left:9px;">
                <div v-for="item in  orderInformation.house" style="display:flex;justify-content:flex-start;margin-bottom:15px;">
                  <div>
                      <img :src="item.image[0].domain+ item.image[0].themb_url" width="100px" height="70px">
                  </div>
                  <div style="margin-left:10px;">
                    <p>{{item.title}}</p>
                    <p style="margin: 10px 0;">标准{{item.max_person}}人间</p>
                    <p><b>￥{{item.price}}</b></p>
                  </div>
                  <div style="display:flex;justify-content:flex-start;line-height:73px;margin-left:20px;">
                    <el-button @click="reduceH(item,1)" :disabled="value == 1 || item.push.number == 0"  style="margin-top:20px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-minus" size="mini" circle></el-button>
                    <div style="margin: 0 10px;"><b>{{value == 1? parseInt(item.num) - parseInt(item.refund_num):item.push.number}}</b></div>
                    <el-button @click="reduceH(item,2)" :disabled="value == 1 || item.push.number == parseInt(item.num) - parseInt(item.refund_num)" style="margin-top:20px;border:1px solid #008489;color:#008489;width:30px;height:30px;" icon="el-icon-plus" size="mini" circle></el-button>
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
            <div style="margin-top:25px;display: flex;justify-content: flex-start">
              <div style="line-height:40px;"><b>退款金额&nbsp;<span style="color:#F73737;">*</span></b></div>
              <div style="margin-left:9px;">
                <div style="color:#F73737;width:197px;height:40px;line-height:40px;border:1px solid #eee;padding:0 10px ">￥&nbsp;&nbsp;{{total_price}}</div>
              </div>
            </div>
            <div style="margin-top:25px;display: flex;justify-content: flex-start">
              <div style="line-height:40px;"><b>退款基金&nbsp;<span style="color:#F73737;">*</span></b></div>
              <div style="margin-left:9px;">
                <div style="color:#F73737;width:197px;height:40px;line-height:40px;border:1px solid #eee;padding:0 10px ">APY&nbsp;&nbsp;{{balance}}</div>
              </div>
            </div>
            <div>
              <el-button @click="sendRefun" type="primary" size="mini" style="margin-left:65px;margin-top:25px;">提交申请</el-button>
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
              {label:'非全退',value:2},
            ],
            reson:'',
            orderInformation:'',
            personNum:1,
            pay_refund:'',
            balance:'',
            total_price:"",
            order_id:'',
            isLoading:false,
            returnFace:'',
            disabled:false
          }
      },
      components:{
        Loading,
      },
      watch:{
        value:function(){
          if(this.value == 1){
              this.getAmount(this.order_id,'','','',1)
          }else{
            let b= []
            for(let i =0;i<this.orderInformation.house.length;i++){
              b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].push.number})
            }
            this.getAmount(this.order_id,this.personNum,JSON.stringify(b),this.reason,0)
          }
        },
        personNum:function(){
          let b= []
          for(let i =0;i<this.orderInformation.house.length;i++){
            b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].push.number})
          }
          this.getAmount(this.order_id,this.personNum,JSON.stringify(b),this.reason,0)
        },

      },
      methods:{
        goBack(){
          if(this.index == 2){
            this.$router.push('/transaction')
          }else{
            this.$router.go(-1)
          }
        },
        reduceP(val){
          if(val == 1){
            this.personNum -= 1
          }else{
            this.personNum += 1
          }
        },
        reduceH(item,val){
          if(val == 1){
            item.push.number -= 1
            let b= []
            for(let i =0;i<this.orderInformation.house.length;i++){
              b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].push.number})
            }
            this.getAmount(this.order_id,this.personNum,JSON.stringify(b),this.reason,0)
          }else{
            item.push.number += 1
            let b= []
            for(let i =0;i<this.orderInformation.house.length;i++){
              b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].push.number})
            }
            this.getAmount(this.order_id,this.personNum,JSON.stringify(b),this.reason,0)
          }
        },
        sendRefun(){
          this.isLoading = true
          if(this.value == 1){
            this.$http.post(this.api + '/RefundS',{
              token: localStorage.getItem('token'),
              order_id: this.order_id,
              flag: 1,
              reason: this.reson,
              type: 0
            })
            .then(res=>{
              if(res.data.code == 1){
                this.isLoading = false
                if(this.pay_refund){
                  this.index = 2
                }else{
                  this.$router.push('/refundOrder')
                  this.$message({
                    type:'success',
                    message:'您的退款将会根据该活动退款政策在2-3个工作日进行退款！'
                  })
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendRefun()
                })
              }else if(res.data.code == 0){
                this.isLoading = false
                alert(res.data.msg)
              }
            })
          }else{
            console.log(8)
              let b = []
              for(let i =0;i<this.orderInformation.house.length;i++){
                b.push({oh_id:this.orderInformation.house[i].oh_id,num:this.orderInformation.house[i].push.number})
              }
             this.$http.post(this.api + '/RefundS',{
              token: localStorage.getItem('token'),
              order_id: this.order_id,
              flag: 0,
              type:0,
              person_num: this.personNum,
              reason: this.reson,
              house:JSON.stringify(b),
            })
            .then(res=>{
              if(res.data.code == 1){
                console.log(9)
                this.isLoading = false
                 if(this.pay_refund){
                   this.index = 2
                }else{
                   this.$message({
                     type:'info',
                     message:'您的退款将会根据该活动退款政策在2-3个工作日进行退款！'
                   })
                   this.$router.push('/refundOrder')
                 }
              }else if(res.data.code == 3){
                 this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendRefun()
                })
              }else if(res.data.code == 0){
                this.isLoading = false
                alert(res.data.msg)
              }
            })
          }
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
        getAmount(order,person,house,reason,flag){
          this.$http.post(this.api + '/RefundAmount',{
            token: localStorage.getItem('token'),
            order_id:order,
            person_num:person,
            house:house,
            reason:reason,
            flag:flag
          })
            .then(res=>{
              if(res.data.code == 1){
                this.balance = res.data.data.balance
                this.total_price = res.data.data.pay_price
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
          this.$http.post(this.api + '/OrderD',{
            token: localStorage.getItem('token'),
            order_id: this.order_id
          })
            .then(res=>{
              if(res.data.code == 1){

                let data  = res.data.data
                for(let i =0;i<data.house.length;i++){
                  data.house[i].push = ({number:1})
                }
                this.orderInformation = data
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
        this.getAmount(this.order_id,'','','',1)
      },
      created(){
        this.order_id = this.$route.query.information
        this.returnFace = this.$route.query.returnFace
        if(this.returnFace){
          this.disabled = true
          this.value = 2
        }else{
          this.disabled = false
          this.value = 1
        }
      }
    }
</script>

<style scoped>

</style>
