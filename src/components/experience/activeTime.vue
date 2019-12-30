<template>
    <div style="text-align:left;width:90%;margin: 50px auto;line-height:40px;">
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
      <p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
      <div class="title_con">
        <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 您需要会用您选择的语言与参与者交流</p>
        <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 体验发布后，您还可以添加自己会说的其他语言</p>
      </div>
      <div style="margin:20px 0;">
        <router-view :active_id="active_id" :complete="complete" @saveId="saveId" v-on:changeRouter="changeRouter" v-on:notChange="notChange"></router-view>
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
            complete:''
          }
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
              localStorage.setItem('Time','Ltime')
            }else if(this.radio == '2'){
              this.$router.push({
                name: 'moreTime',
                query:{
                  information: this.active_id
                }
              })
              localStorage.setItem('Time','moreTime')
            }
          }
      },
      methods:{
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
        }
      },
      mounted() {
        window.scroll(0,0)
          let _this = this
        if(this.active_id){
          _this.getActives()
        }
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
