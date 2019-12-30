<template>
    <div style="line-height:40px;">
      <div v-if="XG" style="display: flex;justify-content: space-between;margin:20px 0;background-color: #eee;">
        <p>*您正在修改已创建<span style="color:#008489">{{longTime[0]}}—{{longTime[1]}}</span>的活动时间</p>
        <p @click="abiosh" style="color:#008489">取消</p>
      </div>
      <h2>介绍活动举办的时间</h2>
      <div class="block" >
        <p style="margin-right: 20px;"><b>举办活动时间段:</b></p>
        <el-date-picker
          v-model="longTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>

      </div>
      <div style="margin:20px 0;">
        <p ><b>活动开始和结束时间:</b></p>
        <div style="display: flex;justify-content: flex-start">
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '23:45'
    }">
          </el-time-select>
          <el-time-select style="margin-left:20px;"
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '24:00',
    }">
          </el-time-select>
        </div>
        <span style="font-size:12px;color:#008489">（小贴士：第一天和最后一天）</span>
      </div>
      <div style="margin:20px 0">
        <span style="margin: 20px 0;"><b>活动参加人数:</b></span>
        <el-input type="text" v-model="personNum"  style="width:200px;" placeholder="请输入人数"></el-input>
      </div>
      <div style="display: flex;justify-content: flex-start">
        <p><b>活动价格：</b></p>
        <div style="border:1px solid #008489;border-radius: 5px;">
          <span style="padding: 0 10px;border-right:1px solid #008489">APY(人民币)</span>
          <input type="text" v-model="price"  placeholder="请输入价格" style="width:200px;border:none;font-size:15px;">
        </div>
      </div>
      <div style="margin: 20px 0;">
        <el-button icon="el-icon-plus" @click="addTime">{{XG?'保存修改时间':'增加活动时间段'}}</el-button>
      </div>
      <div v-show="timeNumber.length">
        <div style="margin: 20px 0;border-bottom: 1px solid #008489;font-size: 15px;display: flex;justify-content: space-between" v-for="(item,index) in timeNumber">
          <div>
            <div><span>活动时间段：</span>{{item.begin_date}}——{{item.end_date}}</div>
            <div><span>开始时间和结束时间：</span>{{item.begin_time}} - {{item.end_time}}</div>
            <div><span>活动人数：</span>{{item.max_person_num}}</div>
            <div><span>活动价格：</span>APY&nbsp;{{item.price}}</div>
          </div>
        <div style="color:#008489;font-size:20px;cursor: pointer">
          <div><i class="el-icon-delete" @click="delet(item,index)"></i></div>
          <div><i class="el-icon-edit" @click="modification(item,index)"></i></div>
        </div>
        </div>
      </div>
      <div style="margin:20px 0;">
        <el-button type="primary" plain @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
      </div>
    </div>
</template>

<script>

    export default {
        name: "Ltime",
      props:['active_id','complete'],
      data(){
          return{
            api: this.GLOBAL.baseURL,
            pickerOptions2: {
              disabledDate:(time)=> {
                if(this.timeNumber.length){
                  var a = ''
                  for(let i = 0;i<this.timeNumber.length;i++){
                    if(a == true){
                      a == true
                      break
                    }else{
                      a = time.getTime() >= this.parseDate(this.timeNumber[i].begin_date) && time.getTime()<=this.parseDate(this.timeNumber[i].end_date)
                    }
                  }
                return a || time.getTime() < Date.now() - 8.64e7
                }else{
                  return  time.getTime() < Date.now() - 8.64e7;
                }
              },
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }],
            },
            price:'',
            money:'',
            timeNumber:[],
            personNum:'',
            startTime:'00:00',
            endTime:'00:15',
            longTime:[],
            madificIndex:'',
            XG:false
          }
      },
      watch:{
        timeNumber:function(){
          if(this.timeNumber.length){
            this.$emit('notChange','1')
          }else{
            this.$emit('notChange','')
          }
        }
      },
      methods:{
        sort(arr){
          var len = arr.length;
          var preIndex, current;
          for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while(preIndex >= 0 && this.parseDate(arr[preIndex].begin_date) >this.parseDate(current.begin_date)){
              arr[preIndex+1] = arr[preIndex];
              preIndex--;
            }
            arr[preIndex+1] = current;
          }
          },
        abiosh(){
          this.longTime = []
          this.startTime = '00:00'
          this.endTime = '00:15'
          this.personNum = ''
          this.price = ''
          this.XG = false
        },
          //修改时间
        modification(item,index){
          this.longTime = [item.begin_date,item.end_date]
          this.startTime = item.begin_time
          this.endTime = item.end_time
          this.personNum = item.max_person_num
          this.price = item.price
          this.madificIndex = index
          this.XG = true
        },
        changeRouter(){
          if(!this.timeNumber.length){
            this.$message({type:'info',message:'请填写活动'})
          }else{
            if(this.active_id){
              console.log(111)
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                long_day: 0,
                slot: this.timeNumber,
                step: 11
              })
                .then(res=>{
                  if(res.data.code = 1){
                    if(!this.complete){
                       this.$emit('changeRouter',{id:12,router:'accommodation',information:this.active_id,complete:this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功!'
                      })
                    }
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
            }else{
              console.log(222)
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                long_day: 0,
                slot: this.timeNumber,
                step: 11
              })
                .then(res=>{
                  if(res.data.code = 1){
                    this.$emit('saveId',res.data.data)
                    this.$emit('changeRouter',{id:12,router:'accommodation',information: res.data.data})
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
            }

          }
        },
        addTime() {
          if(!this.longTime.length){
            this.$message({
              type:'error',
              message: '请填写活动时间'
            })
          }else if(!this.personNum || !(/^[1-9]\d*$/).test(this.personNum)){
            this.$message({
              type: 'error',
              message: '请填写正确活动人数（正整数）'
            })
          }else if(!this.price || !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.price)){
            this.$message({
              type: 'error',
              message: '请填写正确金额！（最多保留两位小数的正数）'
            })
          }else{
            if(this.XG){
              this.timeNumber[this.madificIndex] = ({
                begin_date: this.longTime[0],
                end_date: this.longTime[1],
                begin_time: this.startTime,
                end_time: this.endTime,
                max_person_num: this.personNum,
                price: this.price
              })
              this.XG = false
            }else{
              if(this.timeNumber.length){
                var a = []
                for(let i = 0; i < this.timeNumber.length ; i ++){
                  if( this.parseDate(this.timeNumber[i].begin_date) > this.parseDate(this.longTime[0]) &&  this.parseDate(this.timeNumber[i].begin_date) < this.parseDate(this.longTime[1]) ){
                    a.push(i)
                  }
                }
                if(a.length){
                  this.$message({
                    type:'error',
                    message: '不能添加相同时间段'
                  })
                }else{
                  this.timeNumber.push({
                    begin_date: this.longTime[0],
                    end_date: this.longTime[1],
                    begin_time: this.startTime,
                    end_time: this.endTime,
                    max_person_num: this.personNum,
                    price: this.price
                  })
                }
              }else{
                this.timeNumber.push({
                  begin_date: this.longTime[0],
                  end_date: this.longTime[1],
                  begin_time: this.startTime,
                  end_time: this.endTime,
                  max_person_num: this.personNum,
                  price: this.price
                })
              }
            }
            this.longTime = []
            this.startTime = '00:00'
            this.endTime = '00:15'
            this.personNum = ''
            this.price = ''
            this.sort( this.timeNumber)
          }
        },
        delet(item,index){
          this.$confirm('此操作将删除该时间段，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(item.slot_id){
              this.$http.post(this.api + '/SlotD',{
                token: localStorage.getItem('token'),
                slot_id: item.slot_id
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.timeNumber.splice(index,1)
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    })
                  }else if(res.data.code == 3){
                    this.delet(item,index)
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              this.timeNumber.splice(index,1)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
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
                let data = res.data.data
                if(data.long_day == 0){
                  for(let i =0;i<data.slot.length;i++){
                    if(data.slot[i].status == 0 && data.slot[i].online != 1){
                      this.timeNumber.push({
                        begin_date: data.slot[i].begin_date,
                        end_date: data.slot[i].end_date,
                        begin_time: data.slot[i].begin_time,
                        end_time: data.slot[i].end_time,
                        max_person_num: data.slot[i].max_person_num,
                        price: data.slot[i].price,
                        slot_id: data.slot[i].slot_id
                      })
                    }
                  }
                }
              }else if(res.data.code == 3){
                    this.getActive()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        },
        parseDate(str) { // 字符串转时间戳
          return Date.parse(new Date(Date.parse(str.replace(/-/g, "/")))) ; // 精确到秒
        },
      },
      mounted() {
        let _this = this
        if(_this.active_id){
          _this.getActive()
        }
        console.log( typeof  this.active_id)
      },
      created(){
        window.scroll(0,0)
      }

    }
</script>

<style scoped>
  .block{
    margin: 20px 0;
  }
</style>
