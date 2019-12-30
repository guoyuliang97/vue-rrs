<template>
    <div class="exp_con">
      <h2 class="title">体验包场</h2>
      <p class="language_txt" style="font-size:18px">如果参与者可以包下整场体验，您就不必费心等待更多预订，从而进一步专注于分享您的专业知识。</p>
      <p class="language_txt" style="font-size:18px">  参与者可以把单次体验整个包下来作为私人体验。 如果您日历上的某次体验还没有人预订，参与者可以包下整场体验。</p>
      <el-checkbox v-model="checked" style="margin:20px 0;">允许参与者包场</el-checkbox>
      <div v-show="checked">
        <h2 style="margin:10px 0;">设置最低价格</h2>
        <p style="margin:10px 0;">这是您为体验包场设置的最低价格。</p>
        <div style="display: flex;justify-content: flex-start;;margin:10px 0;" >
         <div style="line-height: 40px;border:1px solid #008489;border-radius: 5px;padding: 0 10px;border-right:none;">
           APY(人民币)
         </div>
          <div style="border:1px solid #d93900;width:300px;border-radius: 5px;padding-left:10px;" :style="{'background-color':price==''? 'rgba(252, 100, 45,)':'#fff','border':price==''?'1px solid #d93900':'1px solid #008489'}" ><input v-model="price" placeholder="输入最低价格" style="width:200px;height:38px;font-size:15px;border:0;"></div>
        </div>
        <p style="color:#d93900" v-show="price == ''">体验包场必须设置最低价格</p>
        <p style="margin:10px 0;">如果每人的费用高于输入的最低价格，参与者将支付较高的金额。</p>

        <div v-if="checked == true">
          <el-button type="primary" plain @click="sendActive">{{complete?'保存':'下一步'}}</el-button> <el-button type="primary" plain @click="cancel">撤销</el-button>
        </div>
      </div>
      <div v-if="checked == false">
        <el-button type="primary" plain @click="sendActive">{{complete?'保存':'下一步'}}</el-button>
      </div>

    </div>
</template>

<script>

    export default {
        name: "makeBlock",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            checked:false,
            price:'',
            priceChoose:false,
            money:'',
            isMoney:false,
            currency:[
              {value:0,label:'人民币-￥'},
              {value:1,label:'美元-$'},
              {value:2,label:'日元-J.￥ '}
            ],
            complete:'',
            active_id:''
          }
      },
      methods:{
          cancel(){
            this.price = ''
            this.checked = false
            this.priceChoose=false
          },
        sendActive(){
            if(this.checked == true){
              if(!this.price || !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.price)){
                this.$message({type:'info',message:'请填写正确金额！（最多保留两位小数的正数）'})
              }else{
                if(this.active_id){
                  this.$http.post(this.api + '/home/Activity/save_activity',{
                    token: localStorage.getItem('token'),
                    activity_id: this.active_id,
                    book_whole: this.checked,
                    low_price: this.price,
                    step: 15
                  })
                    .then(res=>{
                      if(res.data.code == 1){
                        if(!this.complete){
                          this.$emit('changeRouter',{id:16,router:'needVolunter',information: this.active_id,complete: this.complete})
                        }else{
                          this.$message({
                            type: 'success',
                            message: '保存成功！'
                          })
                        }
                      }else if(res.data.code == 3){
                        this.sendActive()
                      }else if(res.data.code == 0){
                        this.$alert(res.data.msg)
                      }
                    })
                }else{
                  this.$http.post(this.api + '/home/Activity/save_activity',{
                    token: localStorage.getItem('token'),
                    book_whole: this.checked,
                    low_price: this.price,
                    step: 15
                  })
                    .then(res=>{
                      if(res.data.code == 1){
                        this.$emit('saveId',res.data.data)
                        this.$emit('changeRouter',{id:16,router:'needVolunter',information: res.data.data})
                      }else if(res.data.code == 3){
                        this.sendActive()
                      }else if(res.data.code == 0){
                        this.$alert(res.data.msg)
                      }
                    })
                }
              }
          }else{
              if(this.active_id){
                this.$http.post(this.api + '/home/Activity/save_activity',{
                  token: localStorage.getItem('token'),
                  activity_id: this.active_id,
                  book_whole: this.checked,
                  low_price: this.price,
                  step: 15
                })
                  .then(res=>{
                    if(res.data.code == 1){
                      if(!this.complete){
                         this.$emit('changeRouter',{id:16,router:'needVolunter',information: this.active_id,complete:this.complete})
                      }else{
                        this.$message({
                          type: 'success',
                          message: '保存成功！'
                        })
                      }  
                    }else if(res.data.code == 3){
                      this.sendActive()
                    }else if(res.data.code == 0){
                      this.$alert(res.data.msg)
                    }
                  })
              }else{
                this.$http.post(this.api + '/home/Activity/save_activity',{
                  token: localStorage.getItem('token'),
                  book_whole: this.checked,
                  low_price: this.price,
                  step: 15
                })
                  .then(res=>{
                    if(res.data.code == 1){
                      this.$emit('saveId',res.data.data)
                      this.$emit('changeRouter',{id:16,router:'needVolunter',information: res.data.data})
                    }else if(res.data.code == 3){
                      this.sendActive()
                    }else if(res.data.code == 0){
                      this.$alert(res.data.msg)
                    }
                  })
              }
            }
        },
        getActives(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.currency >=0){
                  this.money = res.data.data.currency
                  this.isMoney = true
                }else{
                  this.isMoney = false
                }
                if(res.data.data.book_whole){
                  this.checked = true
                  this.price = res.data.data.low_price
                }
              }else if(res.data.code == 3){
                this.getActives()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }

      },
      mounted() {
        if(this.active_id){
         this.getActives()
        }
      },
      created(){
        window.scroll(0,0)
          this.complete = this.$route.query.complete
        this.active_id = this.$route.query.information
      }
    }
</script>

<style scoped>

</style>
