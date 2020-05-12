<template>
    <div class="exp_con">
      <h2 class="title">邀请志愿者</h2>
      <p class="language_txt">针对您创建的体验，根据您的需求，是否需要志愿者来参与活动，并且帮助您与参与者之间的沟通。但是您必须向志愿者免单。</p>
      <div style="margin:20px 0;">
        <el-radio v-model="radio" label='0'>不需要</el-radio>
        <el-radio v-model="radio" label='1'>需要</el-radio>
      </div>
      <div v-if="radio == '1'" style="margin: 20px 0;">
        <div>
          <div>是否为志愿者提供住宿</div>
          <el-radio v-model="prodeHouse" label='0'>提供</el-radio>
          <el-radio v-model="prodeHouse" label='1'>不提供</el-radio>
        </div>
        <div style="display: flex;justify-content: flex-start;align-items: center">
          <div>选择需要的语言：</div>
          <div style="margin-left:20px;">
            <el-select
            v-model="needLanguage"
            multiple
            collapse-tags
            style="margin-left: 10px;"
            placeholder="语言">
            <el-option
              v-for="item in lang"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></div>
        </div>
        <div style="margin: 20px 0;">
          <div>其他要求：</div>
          <div style="margin:10px 0;">
            <el-input type="textarea" :autosize="{minRows:5}" v-model="needOther" placeholder="请输入您的其他要求"></el-input>
          </div>
        </div>
      </div>
      <el-button type="primary" plain @click="sendActive">{{complete == '1'? '保存':'下一步'}}</el-button>
    </div>
</template>

<script>
  import lan from '../../../static/js/language'
    export default {
        name: "needVolunter",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            radio:'',
            complete:'',
            needLanguage: '',
            lang:[],
            needOther:'',
            active_id:'',
            prodeHouse:''
          }
      },
      methods:{
        sendActive(){
          if(this.radio == '1'){
            if(this.active_id){
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                is_volunteen: this.radio,
                volun_laguage: this.needLanguage,
                volun_require: this.needOther,
                house_volunteen: this.prodeHouse,
                step: 16
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(this.complete == '1'){
                      this.$router.push('/publishList')
                    }else{
                      this.check()
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
                is_volunteen: this.radio,
                volun_laguage: this.needLanguage,
                volun_require: this.needOther,
                house_volunteen: this.prodeHouse,
                step: 16
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.active_id = res.data.data
                    this.$emit('saveId',res.data.data)
                    this.check()
                  }else if(res.data.code == 3){
                    this.sendActive()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
            }
          }else{
            if(this.active_id){
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id:this.active_id,
                is_volunteen: this.radio,
                step: 16
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(this.complete == '1'){
                      this.$router.push('/publishList')
                    }else{
                      this.check()
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
                is_volunteen: this.radio,
                step: 16
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.active_id = res.data.data
                    this.$emit('saveId',res.data.data)
                    this.check()
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.sendActive()
                      })
                  }else{
                    this.$alert(res.data.msg)
                  }
                })
            }
          }

        },
        check(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                let a = res.data.data.step.replace(/[^0-9]/ig,' ').trim().split(/\s+/).length
                if(a == 15){
                  this.$emit('changeRouter',{id:17,router:'subExperience',information: this.active_id,complete: this.complete})
                }else{
                  this.$emit('changeRouter',{id:16,router:'needVolunter',information: this.active_id,complete: this.complete})
                  this.$alert('您还有步骤未填写完整')
                }
              }else if(res.data.code == 3){
                this.check()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        },
        getActive(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                this.radio = res.data.data.is_volunteen.toString()
                this.complete = res.data.data.complete
                if(res.data.data.volun_laguage){
                  var a = []
                  for(let m = 0;m<res.data.data.volun_laguage.split(',').length;m++){
                    a.push(parseInt(res.data.data.volun_laguage.split(',')[m]))
                  }
                  this.needLanguage = a
                }
                this.needOther =  res.data.data.volun_require
              }else if(res.data.code == 3){
                this.getActive()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
          if(this.active_id){
           this.getActive()
          }
      },
      created(){
        this.lang = lan()
        window.scroll(0,0)
        this.active_id = this.$route.query.information
      }
    }
</script>

<style scoped>

</style>
