<template>
  <div style="text-align: left">
    <div  style="background-color: #fff;padding:20px;">
      <div style="display: flex;justify-content: space-between">
        <div style="line-height:40px;font-size:14px;">
          <h4>已支付订单>纠纷申请</h4>
        </div>
        <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
      </div>
      <div style="display: flex;justify-content: space-between;margin-top:15px;">
        <div :style="{backgroundColor:index == 1? '#008489':'#F4F6F9',color:index == 1?'#fff':'#A8A8A8'}" style="height:25px;width:50%;text-align: center;line-height:25px;font-size:12px;" >提交纠纷</div>
        <div :style="{backgroundColor:index == 2? '#008489':'#F4F6F9',color:index == 2?'#fff':'#A8A8A8'}" style="text-align: center;width:50%;line-height:25px;font-size:12px;">提交成功</div>
      </div>
      <div >
        <div v-if="index == 1"  style="margin-top:15px;font-size:12px;">
          <div style="display: flex;justify-content: flex-start">
            <div style="height:50px;line-height: 50px;">
              <b>纠纷理由&nbsp;<span style="color:#F73737;">*</span></b>
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left:15px;">
              <el-select
                v-model="reason"
                multiple
                collapse-tags
                placeholder="请选择">
                <el-option
                  v-for="item in reasonList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="margin-top:26px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>其他原因&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:15px;width:217px;">
              <el-input type="textarea" v-model="oterresen" :rows="4" placeholder="其他原因"></el-input>
            </div>
          </div>
          <div style="margin-top:26px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>您的意见&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:15px;width:217px;">
              <el-input type="textarea" :rows="4" placeholder="您的意见"></el-input>
            </div>
          </div>
          <div>
            <el-button type="primary" size="mini" @click="sendDispte" style="margin-left:65px;margin-top:25px;">提交申请</el-button>
          </div>
        </div>
        <div v-if="index == 2" style="margin-top:50px;">
          <div style="display: flex;justify-content: space-around">
            <div style="display: flex;justify-content: flex-start;color:#008489">
              <div>
                <i style="font-size:24px" class="el-icon-circle-check"></i>
              </div>
              <div style="font-size:12px;margin-left:11px;line-height:24px;">
                提交成功
              </div>
            </div>
          </div>
          <div style="margin-top:16px;color:#999999;text-align: center;font-size:8px;">
            <p>您提交的纠纷将会在(1-2)工作日处理!</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "dispute",
    data(){
      return{
        index:1,
        options:[],
        value:'',
        reason:'',
        reasonList:[],
        oterresen:'',
        order_id:'',
        api: this.GLOBAL.baseURL
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      sendDispte(){
        this.$http.post(this.api + "/DisputeS",{
          token: localStorage.getItem('token'),
          option_id: this.reason,
          activity_id: this.activity_id,
          order_id: this.order_id,
          content: this.oterresen
        })
        .then(res=>{
            if(res.data.code == 1){
              this.index = 2
            }else if(res.data.code == 3){
              this.sendDispte()
            }else if(res.data.code == 0){
              this.$message({type:'error',messages:res.data.msg})
            }
          })
      },
    },
    created(){
      this.order_id = this.$route.query.information
    }
  }
</script>

<style scoped>

</style>
