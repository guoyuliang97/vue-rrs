<template>
    <div>
        <div><Head type="transaction" v-on:reload="reload"></Head></div>
        <div style="background-color:#eee;width:100%;padding:100px 0;">
          <div style="width:1080px;margin: 0 auto;display: flex;justify-content: flex-start">
            <div style="width:250px;">
              <div style="width:250px;height:220px;border-radius: 10px;background-color:#fff;color:#666666">
               
                <LoadingImg type="user" :src="imgUrl"  style="width:72px;height:72px;margin: 0 auto;padding-top:17px;"></LoadingImg>
               
                <p style="margin:10px 0;font-size:14px;">总额&nbsp;￥{{ parseFloat(due_balance,2)+parseFloat(unpaid_amount,2)?(parseFloat(due_balance,2)+parseFloat(unpaid_amount,2)).toFixed(2):0}}</p>
                <p><span style="font-size:12px;color">可用余额：{{due_balance}} &nbsp;&nbsp;|&nbsp;&nbsp;未到账：￥{{unpaid_amount?unpaid_amount:0}}</span></p>
                <div style="margin:10px auto;width:37px;padding:1px 2px;font-size:12px;color:#14C5CA;cursor: pointer;border:1px solid rgba(20,197,202,1);" ><span @click="withdrawal" >提现</span></div>
              </div>
              <div style="margin-top:20px;width:230px;background-color:#fff;border-radius:10px;padding:10px 10px;font-size:14px;">
                  <ul>
                    <li @click="toRouter(item,index)" v-for="(item,index) in transactionlist" :key="index" style="padding:10px 0;display: flex;cursor:pointer;justify-content: space-between;border-bottom:1px solid #eee;">
                      <span>{{item.title}}</span><span><i class="el-icon-arrow-right"></i></span></li>
                  </ul>
              </div>
            </div>
            <div style="width:800px;margin-left:30px;height:auto">
              <router-view></router-view>
            </div>
          </div>
          <div v-show="isWithdrawal" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.3);z-index:999">
              <div v-if="type == 1" style="position:fixed;top:50%;left:50%;width:340px;background-color:#fff;padding:20px;border-radius: 5px;margin-top:-140px;margin-left:-190px;">
                <p style="text-align: right"><i class="el-icon-close" style="font-size: 20px;" @click="abolish"></i></p>
                <h4>Allptop 密码设置</h4>
                <p style="font-size:14px;color:#008489;margin:20px 0;">您还未设置安全密码！</p>
                <p>请前往【账户设置】=>【安全】=>设置安全密码，设置成功后可提现！<span @click="toSave" style="border-bottom: 1px solid #008489;color:#008489">立即前往</span></p>
              </div>
              <div v-if="type == 2" style="width:380px;height:340px;padding:20px 0;border-radius:5px;background-color:#eee;top:50%;left:50%;position:fixed;margin-top:-190px;margin-left:-190px; ">
                <div style="text-align: left">
                  <i @click="returnBack" style="cursor: pointer;font-size:20px;" class="el-icon-arrow-left"></i>
                </div>
                <h4 style="background-color:#fff;padding:10px 0;">Allptop 基金提现</h4>
                <div >
                  <p style="background-color: #fff;padding:10px 10px;margin:10px 0;text-align: left;font-size:12px;font-weight: bold">选择银行卡账户:</p>
                  <el-select v-model="bankChose" placeholder="请选择" style="width:100%;">
                    <el-option
                      v-for="(item,index) in bankList"
                      :key="index"
                      :label="item.bank_name+'          '+item.card_number.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, '**** **** **** $2')"
                      :value="item.bank_id">
                    </el-option>
                  </el-select>
                </div>
                <div style="padding:10px;margin:10px 0;background-color: #fff;font-size:12px;text-align: left;">
                  <p>提现金额（收取0.1%服务费）</p>
                  <div style="display: flex;justify-content: flex-start;padding:10px 0;border-bottom: 1px solid #eee;">
                    <span style="font-size:15px;margin-right:10px;">￥</span><input v-model="monney" type="number" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  style="border:none;font-size:20px;width:250px;"></input>
                  </div>
                  <div style="display: flex;justify-content: space-between;padding-top:10px;">
                    <span>可用余额{{due_balance}}元</span><span @click="allReduce" style="cursor: pointer;color:#008489">全部提现</span>
                  </div>
                </div>
                <div>
                  <el-button @click="refer" type="primary" style="width:100%" :disabled="monney?false:true" plain>预计两小时到账，确认提现</el-button>
                </div>
              </div>
              <div v-if="isPassword" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);">
                <div style="position:fixed;width:400px;height:200px;padding:20px;top:50%;left:50%;margin-top:-120px;margin-left:-220px;background-color:#fff;">
                   <div style="border-bottom: 1px solid #eee;text-align: left;padding-bottom:10px;">
                     <i @click="isPassword = false" style="cursor: pointer;font-size:20px;" class="el-icon-close"></i>
                     <span><b>请输入支付密码</b></span>
                   </div>
                  <div style="border-bottom: 1px solid #eee;padding:10px 0;">
                    <p style="font-size:14px">零钱提现</p>
                    <p style="margin:10px 0;font-size:20px;"><b>￥{{monney}}</b></p>
                    <p style="font-size:12px;color:#A9A9A9">(额外扣除￥{{monney * 0.1/100}}服务费)</p>
                  </div>
                  <div class="password-div">
                    <ul>
                      <li class="list"></li>
                      <li class="list"></li>
                      <li class="list"></li>
                      <li class="list"></li>
                      <li class="list"></li>
                      <li class="list"></li>
                    </ul>
                    <input  type="number" oninput = "value=value.replace(/[^\d]/g,'')" ref="input" @keydown="onFocus"  name="password" v-model="password"  maxlength="6">
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

  import '../../static/css/monney/iconfont.css'
  import Head from '../public/head'
  import LoadingImg from '../public/loadingImg'
    export default {
        name: "transaction",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            transactionlist:[
              {title:'交易记录',router:'/records'},
              {title:'已完成订单',router:'/completeOrder'},
              {title:'待体验订单',router:'/stayOrder'},
              {title:'进行中订单',router:'/goingOrder'},
              {title:'未完成订单',router:'/noComplete'},
              {title:'退款订单',router:'/refundOrder'},
              ],
            imgUrl:'',
            is_setpwd:'',
            isWithdrawal:false,
            formLabelAlign:{
              password: '',
              re_password: '',
            },
            type:'',
            bankList:[],
            bankChose:'',
            monney:'',
            due_balance:'',
            unpaid_amount:'',
            isPassword:false,
            password:'',
            aindex:0,
          }
      },
      components:{
          Head,
          LoadingImg
      },
      watch:{
        password:function(){
          if(this.password.length == 6){
            this.sendDraw()
            this.aindex = 0
          }
        }
      },
      mounted(){
        this.getbank()
        this.getbalance()
      },
      methods:{
          //提现申请
          sendDraw(){
            this.$http.post(this.api +'/Draw',{
              token: localStorage.getItem('token'),
              amount: this.monney,
              bank_id: this.bankChose,
              pay_password: this.password
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.isPassword = false
                  this.password = ''
                  this.isWithdrawal = false
                  this.$message({
                    type:'success',
                    message: '提交成功！'
                  })
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/Index/token')
                    .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.sendDraw()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  this.isPassword = false
                  this.password = ''
                }
              })
          },
          getbalance(){
            this.$http.post(this.api + '/balance',{
              token: localStorage.getItem('token'),
              page: 1
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.due_balance = res.data.data.due_balance
                  this.unpaid_amount = res.data.data.unpaid_amount
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getbalance()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
        getbank(){
            this.$http.post(this.api + '/bankl',{
              token: localStorage.getItem('token'),
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.bankList = res.data.data
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getbank()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
        },
        toRouter(item,index){
          this.$router.push(item.router)
        },
        reload(res){
          this.is_setpwd = res.data.data[0].is_setpwd
          if(res.data.data[0].head_image){
            this.imgUrl = res.data.data[0].headimage.domain + res.data.data[0].headimage.image_url
          }else{
            this.imgUrl = '../../static/img/static/user.png'
          }
        },
        withdrawal(){
          if(this.is_setpwd){
            this.$router.push({
              path: '/withdrawal',
              query:{
                information: this.due_balance
              }
            })
          }else{
            this.isWithdrawal = true
            this.type = 1
          }
        },
        abolish(){
         this.isWithdrawal = false
          this.formLabelAlign = {
            password: '',
            re_password: ''
          }
        },
        allReduce(){
            this.monney = this.due_balance
        },
        returnBack(){
            this.isWithdrawal = false
            this.monney = ''
            this.bankChose = ''
        },
        refer(){
            let reg = /^0|0[.]?[0]∗0/
           if(reg.test(this.monney)){
              this.$message({
                type:'info',
                message:'金额不能为0'
              })
           }else{
             this.isPassword = true
             this.pay()
           }
        },
        pay(){
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        },
        onFocus(){
          var list = document.getElementsByClassName('list')
              if (event.keyCode === 99 ||event.keyCode === 96 ||event.keyCode === 97||event.keyCode === 98|| event.keyCode === 99|| event.keyCode === 100|| event.keyCode ===101|| event.keyCode === 102|| event.keyCode === 103||
                event.keyCode === 104|| event.keyCode === 105 || event.keyCode === 48||event.keyCode === 49||event.keyCode === 50||event.keyCode === 51||event.keyCode === 52||event.keyCode === 53||event.keyCode === 54||
                event.keyCode === 55||event.keyCode === 56||event.keyCode === 57){
                list[this.aindex].innerHTML = '*'
                  this.aindex +=1
              }else if(event.keyCode === 8){
                this.aindex -= 1
                list[this.aindex].innerHTML = ' '
              }

        },
        toSave(){
          localStorage.setItem('rt','security')
          localStorage.setItem('accountNav','4')
          this.$router.push({
            path: '/security',
          })
        }
      },
      destroyed(){
        localStorage.removeItem('dis')
      }
    }
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .list {
    border: 1px solid #eee;
    float:left;
    width:50px;
    height:50px;
    line-height:50px;
    font-weight: bold;
  }
  .password-div ul{
    overflow: hidden;
    margin-left:50px;
  }
  .password-div{
    width:100%;
    text-align: center;
    margin:10px 0;
  }
  .password-div input{
    width: 1px;
    height: 1px;
    opacity: 0;
    border: 0;
  }
</style>
