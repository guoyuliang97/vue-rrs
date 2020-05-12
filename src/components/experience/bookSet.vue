<template>
    <div class="exp_con">
      <h2 class="title">您希望在活动开始前多久截止预订？</h2>
      <p class="language_txt">我们建议您把截止时间设置为接近体验开始时间，以便更多的参与者预订。但请确保您有充足时间为接待参与者做准备。</p>
      <el-select style="width:600px;margin:20px 0;" v-model="orderTime" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p>参与者可在距离<span style="color:#008489">{{valueIndex}}</span>预订。</p>
      <h3 style="margin:20px 0;">如果到某个时间没有参与者预订您的体验，您希望取消体验吗？</h3>
      <div>
        <el-radio v-model="order" label='1'>不用了，谢谢。请按原计划安排我的体验。</el-radio>
      </div>
      <div style="margin:20px 0;">
        <el-radio v-model="order" label='0'>是的。如果没有参与者预订，请取消我的体验</el-radio>
      </div>
      <div v-show="order == 0">
        <el-select style="width:600px;margin:0px 0;" v-model="cancelOrder"  placeholder="请选择">
          <el-option
            v-for="(item,index) in cancelList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" plain style="margin-top:20px;" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
      </div>
    </div>
</template>

<script>

    export default {
        name: "bookSet",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            orderTime:-1,
            order:'',
            cancelOrder:0,
            isShow:false,
            isCancelOrder:true,
            options:[
              {value:-1,label:'不设置'},
              {value:0,label:'体验开始时'},
              {value:3600,label:'体验开始1个小时前'},
              {value:7200,label:'体验开始2个小时前'},
              {value:10800,label:'体验开始3个小时前'},
              {value:14400,label:'体验开始4个小时前'},
              {value:28800,label:'体验开始8个小时前'},
              {value:43200,label:'体验开始12个小时前'},
              {value:86400,label:'体验开始1天前'},
              {value:172800,label:'体验开始2天前'},
              {value:259200,label:'体验开始3天前'},
              {value:345600,label:'体验开始4天前'},
              {value:432000,label:'体验开始5天前'},
              {value:518400,label:'体验开始6天前'},
              {value:604800,label:'体验开始一周前'},
            ],
            cancelList:[
              {value:0,label:'体验开始时'},
              {value:172800,label:'体验开始2天前'},
              {value:259200,label:'体验开始3天前'},
              {value:345600,label:'体验开始4天前'},
              {value:432000,label:'体验开始5天前'},
              {value:518400,label:'体验开始6天前'},
              {value:604800,label:'体验开始1周前'},
            ],
            valueIndex:'',
            complete:'',
            active_id:''
          }
      },
      methods:{
        changeRouter(){
          if(this.active_id){
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                end_order: this.orderTime,
                no_order: this.order,
                no_end_order: this.cancelOrder,
                step:14
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(this.complete == '0'){
                      this.$emit('changeRouter',{id:15,router:'makeBlock',information: this.active_id,complete: this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
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
              end_order: this.orderTime,
              no_order: this.order,
              no_end_order: this.cancelOrder,
              step:14
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId',res.data.data)
                  this.$emit('changeRouter',{id:15,router:'makeBlock',information: res.data.data})
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }
        },
        getActive(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id:  this.active_id,
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                for(let i = 0;i<this.options.length;i++){
                  if(this.options[i].value == res.data.data.end_order){
                    this.orderTime = res.data.data.end_order
                    this.valueIndex = this.options[i].label
                  }
                }
                this.order = res.data.data.no_order.toString()
                this.cancelOrder = res.data.data.no_end_order
              }else if(res.data.code == 3){
                this.getActive()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }
      },
      watch:{
          orderTime:function(){
            for(let i = 0;i<this.options.length;i++){
              if(this.options[i].value == this.orderTime){
                this.valueIndex = this.options[i].label
              }
           }
        },

      },
      mounted(){
        window.scroll(0,0)
        if(this.active_id){
          this.getActive()
        }
      },
      created(){
          this.complete = this.$route.query.complete
          this.active_id = this.$route.query.information
      }
    }
</script>

<style scoped>

</style>
