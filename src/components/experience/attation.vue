<template>
  <div>
    <div style="width:90%;margin: 50px auto;text-align:left;line-height:40px;">
      <h2>介绍活动中的注意事项</h2>
      <p>您需要写出活动中的注意事项、活动人数和退订政策</p>
      <p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
      <div class="title_con">
        <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 您需要会用您选择的语言与参与者交流</p>
        <p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 体验发布后，您还可以添加自己会说的其他语言</p>
      </div>
      <div>
        <p>您的退订政策</p>
        <el-select v-model="value" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div v-if="value != 0 && value != ''">
          <p>请输入退订政策内容：</p>
          <el-input style="width:600px;" type="textarea" :rows="2" placeholder="请输入政策内容" v-model="content"></el-input>
        </div>
      </div>
      <div>
        <p>参加活动的年龄限制：</p>
        <div style="display: flex;justify-content: flex-start;border:1px solid #dcdfe6;width:150px;">
          <input type="text" v-model="oldSix"  style="border: none;width:80px;border-right:1px solid #dcdfe6;font-size: 18px;text-align: center">
          <div style="padding: 0 10px;">岁以上</div>
        </div>
      </div>
      <div>
        <p>活动中的注意事项：</p>
        <el-input style="width:600px;font-size: 18px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="notice"></el-input>
      </div>
      <div style="margin: 20px 0;">
        <el-button type="primary" plain @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
      name: "attation",
      data() {
        return {
          api: this.GLOBAL.baseURL,
          options: [
            {value: 0, label: '随时退款 '},
            {value: 1, label: '24小时前'},
            {value: 2, label: '7天前'}
            ],
            value:'',
          content:'',
          notice:'',
          oldSix:'',
          complete:'',
          active_id:''
        }
      },
      methods:{
        changeRouter(){
           if(this.value<0){
            this.$message({type:'info',message:'请选择退订政策'})
          }else if(!this.oldSix || !(/^[1-9]\d*$/).test(this.oldSix)){
            this.$message({type:'info',message:'请填写年龄限制且只能为数字'})
          }else if(!this.notice){
            this.$message({type:'info',message: '请填写注意事项'})
          }else{
            if(this.active_id){
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                return_policy: this.value,
                return_content: this.content,
                age_limit: this.oldSix,
                activ_notice: this.notice,
                step: 13
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(!this.complete){
                      this.$emit('changeRouter',{id:14,router:'bookSet',information: this.active_id,complete: this.complete})
                    }else{
                      this.$message({
                        type:'success',
                        message:'保存成功！'
                      })
                    }
                  
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
            }else{
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                return_policy: this.value,
                return_content: this.content,
                age_limit: this.oldSix,
                activ_notice: this.notice,
                step: 13
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.$emit('saveId',res.data.data)
                    this.$emit('changeRouter',{id:14,router:'bookSet',information: res.data.data})
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
            }
          }
        },
        getActive(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.value = data.return_policy
                this.content = data.return_content
                this.notice = data.activ_notice
                this.oldSix = data.age_limit
              }else if(res.data.code == 3){
                this.getActive()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }
      },
      created() {
        window.scroll(0,0)
          this.complete = this.$route.query.complete
        this.active_id = this.$route.query.information
      },
      mounted(){
        if(this.active_id){
          this.getActive()
        }

      }
    }
</script>

<style scoped>

</style>
