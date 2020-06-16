<template>
	<div style="text-align: left;">
		<p class="fontweight">结算国家/地区</p>
		<div>
			<el-select v-model="country" placeholder="请选择" disabled style="width: 50%;margin-top: 20px;">
				<el-option
				  v-for="item in countryArr"
				  :key="item.value"
				  :label="item.label"
				  :value="item.value">
				</el-option>
			</el-select>
		</div>
		<p class="fontweight" style="margin-top: 30px;display: flex;justify-content: space-between"><span>收款方式</span>
     
   

		<p style="margin-top: 15px;color: #14c5ca;">
			<span style="cursor: pointer;" @click="isAddcard=true"><i class="el-icon-plus"></i> 添加银行卡</span>
		</p>
     <div >
      <div style="margin-top:20px" class="flexStart" v-for="(item,index) in saveList">
        <div class="bank">
          <div style="display:flex;justify-content:flex-start">
            <div>
              <img :src="item.img" style="width:160px;object-fill:cover">
            </div>
            <div style="font-size:13px;font-weight:bold;line-height:45px;">
              {{item.cardTypeName}}
            </div>
          </div>
          
          <div style="text-align:center;font-size:16px;display:flex;justify-content:center;">
            <div style="color:#666666;font-size:19px;opacity:0.3;">**** **** ****</div>
           <div style="margin-left:18px;font-weight:bold">{{item.card_number.slice(15,19)}}</div> 
          </div>
        </div>
        <div style="line-height:74px;margin-left:24px;color:#999999;font-size:16px;">取消绑定</div>
       
        <!-- <div style="display: flex;justify-content: space-between;font-size:15px;">
          <p style="color:#fff">{{item.bank_name}}</p>
          <span style="color:#008489;background-color:#fff;padding:2px 5px;border-radius: 5px;">已验证</span>
        </div>
        <p style="margin:20px 0;color:#fff;font-size:20px;text-align: center">{{item.card_number.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")}}</p>
        <div v-show="deletBank">
          <i @click="deleteBnak(item,index)" style="color:#fff;font-size:20px;cursor: pointer" class="el-icon-delete"></i>
        </div> -->
      </div>
    </div>
		<div style="margin-top: 35px;text-align: left;">
			<el-button type="primary">保存</el-button>
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
                <el-input v-model="bankCard"  @blur="bankCarAtrribut(bankCard)"></el-input>
              </el-form-item>
            </el-form>
            <div  class="clickBtn" @click="saveBank">下一步</div>
          </div>
          <div v-if="bankStep == 2">
            <div>
              <div class="flexStart marginBottom">
                <p><el-button @click="bankStep = 1" icon="el-icon-arrow-left" size='mini' style="width:28px;height:28px;" circle></el-button></p>
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
                <div class='inputBorder'>{{this.bank.bankName}}</div>
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
	
	</div>
</template>

<script>
  import test from '../../../static/js/apy.js'
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
				country:"",
				countryArr:[],
				isAddcard:false,
					idCard:'',
					name:"",
          bankCard:'',
          tel:'',
         bankList:[],
        saveList:[],
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
			};
		},
    watch:{
		    card:function(){
            var v = this.card;
            if(/\S{5}/.test(v)){
              this.card = v.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
            }
        }

    },
    methods:{
      sendSms(){
        if(!this.tel && !this.telReg.test(this.tel)){
          this.$message({type:'info',message:'请输入正确电话'})
        }else{
            if(this.fobid){
              this.$http.post(this.api + '/home/User/send_msg',{
              token: localStorage.getItem('token'),
              m_code: parseInt(this.m_code),
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
      getLogo(val){
        var  bankLogo = 'https://apimg.alipay.com/combo.png?d=cashier&t=' + val
        return bankLogo
           
      },
      sendBank(){
        if(!this.tel){
          this.$message({type:'info',message:'请填写手机号'})
        }else if( !this.sms_code){
            this.$message({type:'info',message:'请填写验证码'})
        }else{
            this.$http.post(this.api + '/BankSTwo',{
            token: localStorage.getItem('token'),
            bank_name: this.bank.bankName,
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
              this.bank = {}
              this.bankCard = ''
              this.name = ''
              this.idCard = ''
              this.tel = ''
              this.m_code = ''
              this.sms_code = ''
              this.bankStep = 1
              this.getBank()
            }else if(res.data.code == 3){
              this.sendBank()
            }else if(res.data.code == 0){
              this.isFalse = true
              this.errorM = res.data.msg 
            }
          })
        }
      
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
      getBank(){
        var logo,arrl;
		    this.$http.post(this.api + '/bankl',{
		      token: localStorage.getItem('token'),
        })
          .then(res=>{
            if(res.data.code == 1){
            //  this.saveList = res.data.data
            let data = res.data.data
            var arr = []
            if(data.length){
              for(var i = 0; i< data.length;i++){
                arrl =  this.bankCarAtrribut(data[i].card_number)
                if(arrl){
                   logo = this.getLogo(arrl.bankCode)
                   arr.push({name:data[i].name,img:logo,card_number:data[i].card_number,cardTypeName:arrl.cardTypeName})
                }
               
              }
            }
            this.saveList = arr
            }else if(res.data.code == 3){
              this.getBank()
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
      },
      bankCarAtrribut(val){
         let _this = this
         if(val){
           var BIN = require('bankcardinfo');
            //callback 方式调用
           var a =  BIN.getBankBin(val,function(err,data){
              if(!err){
                //todo 
                _this.bank = {
                  bankCode: data.bankCode ,      //"ICBC",
                  bankName: data.bankName  ,     // "中国工商银行",
                  cardType: data.cardType  ,     // "DC",
                  cardTypeName:  data.cardTypeName, // "储蓄卡",
                }
                return data
              }else{
                _this.bankCard = ''
              }
            })
            return a._rejectionHandler0
         }
      },
      delet(){
		    this.deletBank = !this.deletBank
      },
      deleteBnak(item,index){
        this.$confirm('此操作将永久删除绑定银行卡, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.deleteAllA(item,index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteAllA(item,index){
        this.$http.post(this.api + '/bankd',{
          token: localStorage.getItem('token'),
          bank_id: item.bank_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.saveList.splice(index,1)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.deleteAllA(item,index)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    mounted() {
		  this.bankList = test()
      this.getBank()
    },
    destroyed(){
      clearInterval(this.changeTime)
    }
  }
</script>

<style>
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
