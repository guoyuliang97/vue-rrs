<template>
    <div class="newZxp animated fadeInde ">
      <div>
        <h2 style="margin:20px 0;">请选择您需要创建的活动时间</h2>
        <div v-if="banIndex == ''">
          <el-radio v-model="radio" label="1" >举办多天活动</el-radio>
          <el-radio v-model="radio" label="2">举办单天活动</el-radio>
        </div>
        <div v-if="banIndex == '1'">
          <el-radio v-model="radio" label="1" >举办多天活动</el-radio>
        </div>
        <div v-if="banIndex == '2'">
          <el-radio v-model="radio" label="2">举办单天活动</el-radio>
        </div>
        <p class="language_title"><span class="fontweight mainColor" >小贴士</span> <i class="el-icon-arrow-up"></i></p>
        <div class="title_con" style="width:400px;">
          <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 您需要会用您选择的语言与参与者交流</p>
          <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 体验发布后，您还可以添加自己会说的其他语言</p>
        </div>
        <div style="position: relative">
            <div style="position:absolute;top:-200px;width:300px;right:120px;">
            <span  class="fontweight" @click="lookPrice">价格计算器<i class="el-icon-arrow-right"></i></span>
            <div v-show="isLookPrice" 
            style="background-color:#fff; width: 300px;height: 300px;border: 1px solid #eee;padding: 20px;line-height:20px;">
              <h3>价格计算器</h3>
              <p style="font-weight: bold;font-size: 12px;color:#008489">(小贴士:APY 代表人民币)</p>
              <div class="price">
                <div>活动价格</div>
                <div style="display: flex;justify-content: flex-start;align-items: center;border: 1px solid #eee;padding: 10px;">
                  <div style="border-right: 1px solid #eee;width:30px;padding-right: 10px;">
                    APY
                  </div>
                  <div>
                    <input type="text" v-model="howprice" style="width:80px;border:none;margin-left:10px;font-size: 15px;" placeholder="输入价格">
                  </div>
                </div>
              </div>
              <div class="price">
                <div>提供数量</div>
                <div style="display: flex;justify-content: flex-start;align-items: center;border: 1px solid #eee;padding: 10px;">
                  <div>
                    <input type="text" v-model="prideNum" style="width:80px;border:none;margin-left:10px;font-size: 15px;" placeholder="输入数量">
                  </div>
                </div>
              </div>
              <div class="price">
                <div><b>您将赚取</b></div>
                <div style="font-weight: bold">
                  <span>￥</span>
                  <span>{{getMoney}}</span>
                </div>
              </div>
              <p>这是扣除{{server_fee}}allptp的服务费后，您可以
                赚到的金额</p>
            </div>
          </div>
        </div>
        
        <div style="margin:20px 0;">
          <router-view :active_id="active_id" :complete="complete" @saveId="saveId" v-on:changeRouter="changeRouter" v-on:notChange="notChange"></router-view>
        </div>
      </div>
      
    </div>
</template>

<script>

    export default {
        name: "activeTime",
      data(){
          return{
            radio:'1',
            api: this.GLOBAL.baseURL,
            banIndex:'',
            active_id:'',
            complete:'',
            prideNum:'',
            getMoney:'',
            server_fee:'',
            isLookPrice: false,
            howprice:'',
             priceReg: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
             reg: /^[1-9]\d*$/,
             Oreg:/^0|0[.]?[0]∗0/
          }
      },
      computed:{
      
      },
      watch:{
          radio:function(){
            if(this.radio == '1'){
              this.$router.push({
                  name: 'Ltime',
                  query:{
                  information: this.active_id
                }
              })
              this.saveLongData(0)
              localStorage.setItem('Time','Ltime')
            }else if(this.radio == '2'){
              this.$router.push({
                name: 'moreTime',
                query:{
                  information: this.active_id
                }
              })
              localStorage.setItem('Time','moreTime')
              this.saveLongData(1)
            }
            
          },
          howprice:function(){
            if(this.Oregtest(this.howprice)&&this.howprice ||this.howprice && !this.priceReg.test(this.howprice)){
              this.$message({
                type: 'error',
                message: '请输入正确金额（大于1最多保留两位小数）'
              })
            }else if(this.prideNum && this.howprice){
              this.getMoney =parseInt(this.prideNum) * parseInt(this.howprice) - parseInt(this.prideNum) * parseInt(this.howprice)*(this.server_fee.replace("%","")/100)
            }
          },
         prideNum:function(){
            if(this.prideNum && !this.reg.test(this.prideNum)){
              this.$message({
                type: 'error',
                message: '请输入正确数量!'
              })
            }else if(this.prideNum && this.howprice){
              this.getMoney = parseInt(this.prideNum) * parseInt(this.howprice) -parseInt(this.prideNum) * parseInt(this.howprice)* (this.server_fee.replace("%","")/100)
            }
         },
      },
      methods:{
        lookPrice(){
          this.isLookPrice = !this.isLookPrice
        },
        saveLongData(val){
          this.$http.post(this.api + '/ActivitSaveTwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            version: 2.0,
            long_day: val,
            step: 11
          })
        },
        notChange(val){
          this.banIndex = val
        },
        saveId(res){
          this.$emit('saveId',res)
        },
        changeRouter(res){
          this.$emit('changeRouter',{id:res.id,router:res.router,information:res.information,complete: this.complete})
        },
        getActives(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                if(data.long_day == 1 ){
                  this.radio = '2'
                }else{
                  this.radio = '1'
                }
              }else if(res.data.code == 3){
                this.getActives()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
         getConfig(){
			  this.$http.post(this.api + '/Config',{
			    token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.server_fee = res.data.data.server_fee + '%'
            }else if(res.data.code == 3){
              this.getConfig()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      },
      mounted() {
        window.scroll(0,0)
          let _this = this
          _this.getActives()
          _this.getConfig()     
      },
      created(){
          this.active_id = this.$route.query.information
        this.complete = this.$route.query.complete
  
      },
      destroyed(){
          localStorage.removeItem('Time')
      }
    }
</script>

<style scoped>

</style>
