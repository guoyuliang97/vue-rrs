<template>
    <div style="line-height:40px;">
      <h2>介绍活动举办的时间</h2>
      <p>你需要写入举办活动，好让活动参加者选择参加活动的时间</p>
      <div class="block">
        <span style="margin-right: 20px;"><b>选择一个或者多个日期:</b></span>
        <el-date-picker
          type="dates"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions1"
          v-model="shortTime"
          @change = 'addDate'
          placeholder="选择一个或多个日期">
        </el-date-picker>
      </div>
      <div class="block">
        <span style="margin-right: 20px;"><b>每一天的活动:</b></span>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="item.time"  v-for="(item,index) in arr" v-show="arr.length != ''" :key="index" >
              <div>
                <div>
                  <el-time-picker is-range v-model="dateTime"  value-format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
              </div>
                <div style="margin-top: 20px;">
                  <el-input style="width:350px;"   placeholder="请输入价格" v-model="monney"></el-input>
                </div>
                <el-button style="margin-top: 20px;" @click="add(index)">新增</el-button>
              </div>
              <div v-for="items in item.active">
                <div style="border:1px solid #eee;border-radius:5px;margin:20px 0;width:600px;padding:10px;line-height:30px;" >
                  <div style="">
                    <span><b>活动时间：</b>{{items.dateTime[0]}}-{{items.dateTime[1]}}</span>
                  </div>
                  <p><b>内容：</b>{{items.content}}</p>
                  <p><b>价格：</b>{{items.monney}}</p>
                </div>
              </div>
          </el-collapse-item>
        </el-collapse>
      </div>
        <div class="block" v-show="showTime">
          <span style="margin-right: 20px;"><b>已创建的活动:</b></span>
          <div v-for="(item,index) in showTime" :key="index" style="border-bottom:1px solid #008489;font-size:15px">
            <div style="display:flex;justify-content: flex-start;">
              <div>
                <p><b>开始时间：</b><span>{{item.begin_time}}</span></p>
              </div>
              <div style="margin-left:40px;">
                <p><b>结束时间：</b><span>{{item.end_time}}</span></p>
              </div>
            </div>
            <div>
              <p><b>活动内容：</b>{{item.content}}</p>
            </div>
            <div>
              <p><b>活动时长：</b>{{item.total_time}}分钟</p>
            </div>
            <div>
              <p><b>价格：</b>{{item.price}}</p>
            </div>
          </div>
        </div>

      <div style="margin:20px 0;">
        <el-button type="primary" plain @click="changeRouter">{{compoletea?'保存':'下一步'}}</el-button>
      </div>
    </div>
</template>

<script>

    export default {
        name: "Rtime",
      data() {
        return {
          api: this.GLOBAL.baseURL,
          shortTime:[],
          dateTime:'',
          monney:'',
          activeName:1,
          arr:[],
          solt:[],
          showTime:[],
          pickerOptions1: {
            disabledDate:(time)=> {
                return time.getTime() < Date.now() - 8.64e7;
            }
            },
            compoletea:""
        };
      },
      methods:{
          add(index){
            let a =[]
            let dateTime = this.dateTime
            let monney = this.monney
            if(dateTime==''||monney==''){
              this.$alert('请填写完整')
            }else{
              this.arr[index].active.push({dateTime:dateTime,monney:monney})
              this.solt.push({date:this.arr[index].time,begin_time:dateTime[0],end_time:dateTime[1],price:monney})
              this.dateTime = ''
              this.monney = ''
            }
             },
          addDate(){
            let b = []
            let shortTime = this.shortTime
            if( shortTime == null){
              this.arr = []
            }else{
              for (let i =0;i<shortTime.length;i++){
                let value = shortTime[i]
                b.push({time:value,active:[]})
              }
                this.arr = b

            }
          },
        changeRouter(){
          if(!this.shortTime.length){
            this.$message({type:'info',message:'请选择举办时间'})
          }else{
            if(!this.arr[0].active.length){
              this.$message({type:'info',message:'请填写每天的活动'})
            }else{
              if(localStorage.getItem('active_id')){
                 this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: localStorage.getItem('active_id'),
                slot: this.solt,
                step: 12
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(!this.compoletea){
                      this.$emit('changeRouter',{id:12,router:'/accommodation'})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
                      })
                    }
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.changeRouter()
                      })
                  }else{
                    this.$alert(res.data.msg)
                  }
                })
              }else{
                this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                slot: this.solt,
                step: 12
              })
                .then(res=>{
                  if(res.data.code == 1){
                  localStorage.setItem('active_id',res.data.data)
                    this.$emit('changeRouter',{id:12,router:'/accommodation'})
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.changeRouter()
                      })
                  }else{
                    this.$alert(res.data.msg)
                  }
                })
              }

            }
          }
        },
        getActive(){
          this.$http.post(this.api + '/ActivityE',{
            token: localStorage.getItem('token'),
            activity_id: localStorage.getItem('active_id'),
            visit: 0
          })
            .then(res=>{
              if(res.data.code == 1){
                this.showTime = res.data.data.slot
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getActive()
                  })
              }else{
                this.$alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
          let _this = this
        if(localStorage.getItem('active_id')){
          _this.getActive()
        }
      },
      created(){
        window.scroll(0,0)
          this.compoletea = parseInt(localStorage.getItem('completea'))
      }
    }
</script>

<style scoped>
.block{
  margin: 20px 0;
}
</style>
