<template>
    <div style="background-color:#fff;padding:30px;border-radius: 10px;">
      <div class="withdrawal">
        <h2>基金提现</h2>
        <p style="margin-left:20px;"><b>余额<span style="color:#14c5ca">{{de_banlece}}</span>元</b></p>
      </div>
      <div style="margin: 68px 0 42px;display: flex;justify-content: flex-start;align-items: flex-start;font-weight: bold">
        <p><b>选择银行卡</b></p>
        <div style="margin-left:20px;">
          <div v-if="bankList.length" v-for="(item,index) in bankList">
            <div @click="chooseBank(item,index)" style="margin-bottom:10px;width:300px;padding: 10px 20px;border: 1px solid #EAEDF3;display: flex;align-items: center;justify-content: flex-start;cursor: pointer">
              <div style="width:10px;height: 10px;border-radius: 50%" :style="{backgroundColor:clickIndex == index? '#14c5ca':'#C0C0C0'}">
              </div>
              <div style="margin: 0 15px;">{{item.bank_name}}</div>
              <div>{{item.card_number.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")}}</div>
            </div>
          </div>
          <div v-if="!bankList.length" style="color:#858585;border:1px solid #858585;padding: 10px 20px;">还没有添加银行卡</div>
        </div>
        <div style="margin-left:20px;color:#14c5ca;cursor: pointer" @click="addBank"><i class="el-icon-plus"></i>添加银行卡</div>
      </div>
      <div style="display: flex;justify-content: flex-start;align-items: center">
        <p><b>提现金额</b></p>
        <div style="margin-left:35px;text-align: left">
          <el-input style="width:200px;font-weight: bold;" v-model="monney" type="text" placeholder="输入金额≥200.00"></el-input>
        </div>
        <div style="margin: 0 20px 0 10px;">元</div>
        <div v-if="de_banlece<200" style="color:#F3863D">! 您当前余额不足￥200.00，无法提现</div>
        <div v-if="de_banlece>=200" style="color:#F3863D">提现金额必须大于等于￥200</div>
      </div>
      <p style="margin-top: 0px;color:#A3A3A3;text-align: left;margin-left:100px;font-size:12px;">中国建设银行提现免手续费，其他银行提现收取5元收续费</p>
      <div style="display: flex;justify-content: flex-start;margin: 42px 0;">
        <p><b>到账时间</b></p>
        <div style="margin-left: 35px;font-size:14px;color:#666666;line-height:21px;"><b>预计两个工作日</b></div>
      </div>
      <div style="text-align: left;margin-left:100px;">
        <el-button type="primary" @click="refer" :disabled="de_banlece<200?true:monney?false:true" style="width:200px;background-color:#14C5CA" >确认提现</el-button>
      </div>
         <div v-show="isAddcard"  style="display:flex;justify-content:center; align-items:center;z-index: 997;position:fixed;top:0;left:0;right:0;bottom:0;" >
		    <div class="collection_bg" v-show="isAddcard" @click="isAddcard=false"></div>
      	<div class="collection_addCard " v-show="isAddcard">
          <div v-if="bankStep == 1">
            <div class="collection_addCardtop">
              <p class="fontweight">请添加持卡人本人的银行卡</p>
            </div>
            <el-form label-width="75px" class="fontColor" label-position="left">
              <el-form-item label="持卡人:">
                <el-input v-model="name" ></el-input>
              </el-form-item>
              <el-form-item label="身份证号:" style="margin-top: 30px;">
                <el-input v-model="idCard" ></el-input>
              </el-form-item>
              <el-form-item label="卡号:" style="margin-top: 30px;">
                <el-input v-model="bankCard"  @blur="bankCarAtrribut"></el-input>
              </el-form-item>
            </el-form>
            <div  class="clickBtn" @click="saveBank">下一步</div>
          </div>
          <div v-if="bankStep == 2">
            <div>
              <div class="flexStart marginBottom">
                <p><el-button @click="goStep" icon="el-icon-arrow-left" size='mini' style="width:28px;height:28px;" circle></el-button></p>
                <p class="fontweight marginLeft" style="line-height:28px;">请添加持卡人本人的银行卡</p>
              </div>
              <div class="flexBetween fontColor">
                <div>持卡人</div>
                <div class='inputBorder'>{{name}}</div>
              </div>
              <div class="flexBetween fontColor">
                <div>身份证号</div>
                <div class='inputBorder'>{{idCard}}</div>
              </div>
              <div class="flexBetween fontColor">
                <div>银行卡</div>
                <div class='inputBorder'>{{bankName}}</div>
              </div>
              <div class="flexBetween fontColor">
                <div>卡号</div>
                <div class='inputBorder'>{{bankCard}}</div>
              </div>
              <div class="flexBetween fontText">
                <div>手机号</div>
                <div style="width:284px;" class="flexBetween">
                  <el-select  v-model="m_code" placeholder="请选择"  >
                    <el-option  v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <el-input type="text"  v-model="tel"></el-input>
                </div>
              </div>
              <p v-show="isFalse" style="text-align:right;font-size:13px;color:#F13F3F">{{errorM}}</p>
              <div class="flexBetween fontText">
                <div>验证码</div>
                <div>
                  <el-input type="text" v-model="sms_code" style="width:184px;" ></el-input>
                </div>
                <div >
                  <span @click="sendSms" style="cursor:pointer">{{sms}}</span>
                </div>
              </div>
              <div @click="sendBank" class="clickBtn">
                确认并验证
              </div>
            </div>
          </div>
        </div>
    </div>

      <div v-if="isPassword" style="z-index:999;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);">
        <div style="position:fixed;width:400px;height:200px;padding:20px;top:50%;left:50%;margin-top:-120px;border-radius:5px;margin-left:-220px;background-color:#fff;">
          <div style="border-bottom: 1px solid #eee;text-align: left;padding-bottom:10px;">
            <i @click="isPassword = false" style="cursor: pointer;font-size:20px;" class="el-icon-close"></i>
            <span><b>请输入支付密码</b></span>
          </div>
          <div style="border-bottom: 1px solid #eee;padding:10px 0;">
            <p style="font-size:14px">零钱提现</p>
            <p style="margin:10px 0;font-size:20px;"><b>￥{{monney}}</b></p>
            <p style="font-size:12px;color:#A9A9A9">(中国建设银行提现免手续费，其他银行提现收取5元收续费)</p>
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
      <div v-if="isWait" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>
<script>
  import Loading from '../../public/Loading'
  import test from '../../../static/js/apy.js'
    export default {
        name: "withdrawal",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            bankList:[],
            clickIndex:0,
            de_banlece:'',
            isAddcard:false,
            banKAllList:[],
            monney:'',
            isPassword:false,
            password:'',
            aindex:0,
            isWait:false,
            idCard:'',
					name:"",
          bankCard:'',
          tel:'',
          bankName:'',
      bankChose:'',
        deletBank:false,
        sms_code:'', 
        bankStep:1,
        sms:'发送验证码',
        m_code:'',
        countryNumber:[
          {value:1,label:'+86(中国)'}
        ],
        changeTime:'',
        smsTime:60,
        fobid:true,
        telReg:/^1[3456789]\d{9}$/,
        idReg:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        isFalse:false,
        errorM:'',
         bank:''
          }
         
      },
      components:{
        Loading,
      },
      watch:{
        password:function(){
          if(this.password.length == 6){
            this.sendDraw()
            this.aindex = 0
          }
        }
      },
      methods:{
        goStep(){
          this.bankStep = 1
        },
         bankCarAtrribut(){
         let _this = this

         if(_this.bankCard){
           var BIN = require('bankcardinfo');
            //callback 方式调用
            BIN.getBankBin(_this.bankCard,function(err,data){
              if(!err){
                //todo 
                _this.bank = {
                  bankCode: data.bankCode ,      //"ICBC",
                  bankName: data.bankName  ,     // "中国工商银行",
                  cardType: data.cardType  ,     // "DC",
                  cardTypeName:  data.cardTypeName, // "储蓄卡",
                }
                _this.bankName = data.bankName 
                return data
              }else{
                _this.bankCard = ''
                // _this.$message({type:'info',message:'未查询到所属银行卡，请手动选择!'})
              }
            })
         }
      },
          sendSms(){
          if(!this.tel && !this.telReg.test(this.tel)){
            this.$message({type:'info',message:'请输入正确电话'})
          }else{
              if(this.fobid){
                this.$http.post(this.api + '/home/User/send_msg',{
                token: localStorage.getItem('token'),
                m_code:parseInt(this.m_code) ,
                flag: 7,
                mobile: this.tel
              })
              .then(res=>{
                if(res.data.code == 1){
                  this.fobid = false
                    this.changeTime = setInterval(()=>{
                      this.smsTime--
                      this.sms = '重新发送（'+this.smsTime+ '）'
                      if(this.smsTime <= 0){
                        this.smsTime = 60
                        this.fobid = true
                        this.sms = '重新发送'
                        clearInterval(this.changeTime)
                      }
                    },1000)
                }else if(res.data.code == 3){
                  this.sendSms()
                }else if(res.data.code == 0){
                  this.$message({type:'error',message:res.data.msg})
                }
              })
            }
          }
        },
        sendBank(){
          this.isWait = true
          this.$http.post(this.api + '/BankSTwo',{
            token: localStorage.getItem('token'),
            bank_name: this.bankName,
            card_number: this.bankCard,
            user_name: this.name,
            idcard: this.idCard,
            mobile: this.tel,
            m_code: parseInt(this.m_code) ,
            sms_code: this.sms_code
          })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({type:'success',message:'保存成功!'})
              this.isAddcard = false
              this.isFalse = false
              this.bankStep = 1
              this.getbank()
              this.isWait = false
            }else if(res.data.code == 3){
              this.sendBank()
            }else if(res.data.code == 0){
              this.isFalse = true
              this.errorM = res.data.msg 
            }
          })
        },
        saveBank(){
          if(!this.bankCard){
            this.$message({type:'info',message:'请填写卡号'})
          }else if(!this.name){
            this.$message({type:'info',message:'请填写持卡人'})
          }else if(!this.idCard ||  !this.idReg.test(this.idCard)){
            this.$message({type:'info',message:'请填写身份证号'})
          }else {
            this.bankStep = 2
          }
        },
        chooseBank(item,index){
          this.clickIndex = index
          this.bankChose = item.bank_id
        },
        getbank(){
          this.$http.post(this.api + '/bankl',{
            token: localStorage.getItem('token'),
          })
            .then(res=>{
              if(res.data.code == 1){
                this.bankList = res.data.data
                if(this.bankList.length){
                  this.bankChose = this.bankList[0].bank_id
                }
              }else if(res.data.code == 3){
                this.getbank()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        addBank(){
          this.isAddcard = true
        },
        // saveBank(){
        //   if(!this.card){
        //     this.$message({type:'info',message:'请填写银行卡号'})
        //   }else if(!this.name){
        //     this.$message({type:'info',message:'请填写用户姓名'})
        //   }else if(!this.bank){
        //     this.$message({type:'info',message:'请填写银行名称'})
        //   }else{
        //     this.isWait = true
        //     this.$http.post(this.api + '/banks',{
        //       token: localStorage.getItem('token'),
        //       bank_name: this.bank,
        //       card_number: this.card,
        //       user_name: this.name
        //     })
        //       .then(res=>{
        //         if(res.data.code == 1){
        //           this.getbank()
        //           this.isAddcard = false
        //           this.isWait = false
        //         }else if(res.data.code == 3){
        //           this.$http.post(this.api + '/home/Index/token')
        //             .then(res=>{
        //               localStorage.setItem('token',res.data.data)
        //               this.saveBank()
        //             })
        //         }else if(res.data.code == 0){
        //           this.isWait = false
        //           alert(res.data.msg)
        //         }
        //       })
        //   }
        // },
        refer(){
            let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
          if(!this.bankList.length){
             this.$message({
              type:'info',
              message:'请先添加银行卡再提现'
            })
          }else if(reg.test(this.monney) && Number(this.monney)>=200 && Number(this.monney)<= this.de_banlece){
            this.isPassword = true
            this.pay()
          }else{
            this.$message({
              type:'info',
              message:'提现金额大于等于￥200！（不能大于可用余额）'
            })
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
        sendDraw(){
          this.isWait = true
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
                this.isWait = false
                this.monney = ''
                this.$message({
                  type:'success',
                  message: '提交申请成功！'
                })
                this.$emit('changeMone',true)
                this.getBance()
              }else if(res.data.code == 3){
                this.sendDraw()
              }else if(res.data.code == 0){
                this.$message({type:'error',message:res.data.msg})
                this.isPassword = false
                this.password = ''
                this.isWait = false
              }
            })
        },
        getBance(){
          this.$http.post(this.api + '/BalanceTwo',{
            token: localStorage.getItem('token'),
            page:1,
            verson:2.0
          })
          .then(res=>{
            if(res.data.code == 1){
               this.de_banlece = res.data.data.due_balance
            }else if(res.data.code == 3){
              this.getBance()
            }else if(res.data.cdoe == 0){
              this.$message({type:'info',message:res.data.msg})
            }
          })
        }
      },
      mounted(){
          this.getbank()
          this.getBance()
      },
      created(){
          this.banKAllList = test()
      }
    }
</script>

<style scoped>
.withdrawal{
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
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

.collection_bg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 998;
	background-color: rgba(0,0,0,.8);
}
.collection_addCard{
	width: 402px;
  background-color: white;
	border-radius: 10px;
	z-index: 999;
  padding:5px;

}
.collection_addCard>div{
	width: 359px;
	margin: 0 auto;
}
.collection_addCardtop{
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
}
.fontColor{
  color:#999999 !important;
  line-height: 40px;;
  font-size:13px;
  margin-top: 29px;
}
.fontText{
  line-height: 40px;;
  font-size:13px;
  margin-top: 29px;
}
.inputBorder{
  width:284px;
  height:40px;
  border:1px solid rgba(219,222,229,1);
  border-radius:4px;
  margin-left:20px;
  }
  .clickBtn{
    width:359px;
    height:40px;
    background:rgba(20,197,202,1);
    border-radius:4px;
    text-align: center;
    color:#fff;
    line-height:40px;
    font-size:16px;
    margin: 30px auto 21px;
  }
  .bank{
    width:298px;
    height:74px;
    border:1px solid rgba(219,222,229,1);
    border-radius:4px;
  }
</style>
