<template>
    <div style="background-color:#fff;padding:30px;border-radius: 10px;">
      <div class="withdrawal">
        <h2>基金提现</h2>
        <p style="margin-left:20px;"><b>余额<span style="color:#008489">{{de_banlece}}</span>元</b></p>
      </div>
      <div style="margin: 30px 0;display: flex;justify-content: flex-start;align-items: flex-start;font-weight: bold">
        <p><b>选择银行卡</b></p>
        <div style="margin-left:20px;">
          <div v-if="bankList.length" v-for="(item,index) in bankList">
            <div @click="chooseBank(item,index)" style="margin-bottom:10px;width:300px;padding: 10px 20px;border: 1px solid #EAEDF3;display: flex;align-items: center;justify-content: flex-start;cursor: pointer">
              <div style="width:10px;height: 10px;border-radius: 50%" :style="{backgroundColor:clickIndex == index? '#008489':'#C0C0C0'}">
              </div>
              <div style="margin: 0 15px;">{{item.name}}</div>
              <div>尾号 789</div>
            </div>
          </div>
          <div v-if="!bankList.length" style="color:#858585;border:1px solid #858585;padding: 10px 20px;">还没有添加银行卡</div>
        </div>
        <div style="margin-left:20px;color:#008489;cursor: pointer" @click="addBank"><i class="el-icon-plus"></i>添加银行卡</div>
      </div>
      <div style="display: flex;justify-content: flex-start;align-items: center">
        <p><b>提现金额</b></p>
        <div style="margin-left:35px;text-align: left">
          <el-input style="width:200px;font-weight: bold;" v-model="monney" type="text" placeholder="输入金额≥200.00"></el-input>
        </div>
        <div style="margin: 0 20px 0 10px;">元</div>
        <div style="color:#F3863D">! 您当前余额不足200.00，无法提现</div>
      </div>
      <p style="margin-top: 0px;color:#A3A3A3;text-align: left;margin-left:100px;">收取1%的服务费</p>
      <div style="display: flex;justify-content: flex-start;margin: 20px 0;">
        <p><b>到账时间</b></p>
        <div style="margin-left: 35px;"><b>预计2小时</b></div>
      </div>
      <div style="text-align: left;margin-left:100px;">
        <el-button type="primary" @click="refer" :disabled="monney?false:true" style="width:200px;" >确认提现</el-button>
      </div>
      <div class="collection_bg" v-show="isAddcard" @click="isAddcard=false"></div>
      <div class="collection_addCard animated flipInY" v-show="isAddcard">
        <div>
          <div class="collection_addCardtop">
            <p class="fontweight">添加银行卡</p>
            <p><i class="el-icon-close" style="cursor: pointer;"  @click="isAddcard=false"></i></p>
          </div>
          <el-form label-width="75px" label-position="left">
            <el-form-item label="银行卡号:" style="margin-top: 30px;">
              <el-input v-model="card"   placeholder="银行卡号"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="name" placeholder="姓名:"></el-input>
            </el-form-item>
            <el-form-item label="银行:">
              <el-select v-model="bank" placeholder="请选择" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in banKAllList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width:100%" @click="saveBank">确定</el-button>
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
            card:'',
            name:"",
            bank:'',
            banKAllList:[],
            monney:'',
            isPassword:false,
            password:'',
            aindex:0,
            isWait:false
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
        chooseBank(item,index){
          this.clickIndex = index
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
        addBank(){
          this.isAddcard = true
        },
        saveBank(){
          this.isWait = true
          this.$http.post(this.api + '/banks',{
            token: localStorage.getItem('token'),
            bank_name: this.bank,
            card_number: this.card,
            user_name: this.name
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getbank()
                this.isAddcard = false
                this.isWait = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.saveBank()
                  })
              }else if(res.data.code == 0){
                this.isWait = false
                alert(res.data.msg)
              }
            })
        },
        refer(){
          let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
          if(reg.test(this.monney) && parseInt(this.monney)>200){
            this.isPassword = true
            this.pay()
          }else{
            this.$message({
              type:'info',
              message:'请填写正确金额！（最多保留两位小数的正数）'
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
                this.isWait = false
              }
            })
        },
      },
      mounted(){
          this.getbank()
      },
      created(){
          this.de_banlece = this.$route.query.information
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
  width: 400px;
  height: 320px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -160px;
  background-color: white;
  border-radius: 10px;
  z-index: 999;
}
.collection_addCard>div{
  width: 360px;
  margin: 0 auto;
}
.collection_addCardtop{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
