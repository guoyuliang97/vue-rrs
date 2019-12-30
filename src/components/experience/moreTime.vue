<template>
    <div>
      <div class="block">
        <span style="margin-right: 10px;"><b>举办活动时间段:</b></span>
        <el-date-picker
          v-model="longTime"
          type="daterange"
          value-format="timestamp"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <div class="block">
        <span style="margin-right:10px;"><b>每天举办活动数量：</b></span>
        <el-input type="text" v-model="activeNum"  maxlength="2"  placeholder="请输入数量至少为1" style="width:200px;"></el-input>
      </div>
      <div class="block" v-for="(item,index) in activeList" :key="index" >
          <p style="margin-right:20px;"><b>活动开始和结束时间：</b></p>
          <!-- <el-time-picker is-range v-model="dateTime"  value-format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>-->
          <el-time-select
            editable
            placeholder="起始时间"
            @focus="timeChoose(item,index)"
            v-model="item.startTime"
            :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '24:00',
      minTime: index>0? activeList[index-1].endTime:''
    }">
          </el-time-select>
          <el-time-select
            editable
            placeholder="结束时间"
            v-model="item.endTime"
            :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '24:00',
      minTime: item.startTime
    }">
          </el-time-select>
      </div>
      <div class="block">
        <div style="display: flex;justify-content: flex-start">
          <span style="margin-right:10px;"><b>活动人数:</b></span>
          <el-input type="text"  v-model="personNum" placeholder="请输入正整数" style="width:200px;border:none;font-size:15px;"></el-input>
        </div>
      </div>
      <div class="block">
        <div style="display: flex;justify-content: flex-start">
          <span style="margin-right:10px;"><b>活动价格:</b></span>
          <div style="border:1px solid #008489;border-radius: 5px;padding-right:10px;">
            <span style="padding: 0 10px;border-right:1px solid #008489">APY(人民币)</span>
            <input type="text"  v-model="price" placeholder="请输入价格" style="width:200px;border:none;font-size:15px;">
          </div>
        </div>
      </div>
      <div class="block">
        <el-button type="primary" plain @click="saveActive">添加到日历</el-button>
      </div>
      <div v-show="allDay.length" >
        <div style="width:490px;margin-right:20px;">
          <p style="font-size:12px;color:#008489;">(点每一天查看具体活动)</p>
          <p style="font-size:12px;color:#008489;cursor: pointer" @click="deletDate">清空日期</p>
          <div style="width:470px;padding:20px 10px;background-color:#008489;color:#fff;text-align:center;border-top-right-radius:10px;border-top-left-radius:10px;">
            <div class="ui-datepicker-header">
              <div class="ui-datepicker-header-year">
                <i class="el-icon-d-arrow-left ui-datepicker-btn ui-datepicker-prev-btn" @click="prevYear"></i>
                <span>{{year}}</span>
                <i class="el-icon-d-arrow-right ui-datepicker-btn ui-datepicker-next-btn" @click="nextYear"></i>
              </div>
              <div class="ui-datepicker-header-month">
                <i class="el-icon-arrow-left ui-datepicker-btn ui-datepicker-prev-btn" @click="prevMonth"></i>
                <span>{{month}}</span>
                <i class="el-icon-arrow-right ui-datepicker-btn ui-datepicker-next-btn" @click="nextMonth"></i>
              </div>
            </div>
          </div>
          <table style=" border-collapse: collapse;text-align: center" width="490px" height="69px;">
            <tr>
              <td>一</td>
              <td>二</td>
              <td>三</td>
              <td>四</td>
              <td>五</td>
              <td>六</td>
              <td>日</td>
            </tr>
          </table>
          <div style="width:490px;overflow:hidden">
            <div v-for="(item,index) in dayCount" :key="index" @click="color[index].index == '2'||color[index].index  == '3'? '': changeColor(item,index)"  class="datepick" >
              <div v-if="item != ' '&& color[index].index == '1'" style="cursor: pointer;"  :style="{backgroundColor:dateIndex === index?'#008489': '#F0F0F0',color:dateIndex === index?'#fff':'#000'}"  >{{item}}</div>
              <div v-if="item != ' '&& color[index].index == '2'"  style="line-height: 30px;color:red;border:1px solid red"  >{{item}}<p>已过期</p></div>
              <div v-if="item != ' '&& color[index].index == '3'"   >{{item}}</div>
            <!--  <div v-if="color[index].index == '3'"  style="background-color: #EE395B;color:#fff;"  >{{item}}/无</div>-->
              <div v-if="item != ' '&& color[index].index == '0'"  :style="{backgroundColor:dateIndex === index? '#008489': '#E1F5F6',color:dateIndex === index?'#fff':'#000',}" style="line-height: 35px;cursor: pointer;" >{{item}}<p>有活动</p></div>
            </div>
          </div>
        </div>
        <div v-show="isShow" style="padding:20px;border-radius:10px;width:440px;font-size:14px;margin-top:20px;">
          <p v-if="isRemake"  style="display: flex;justify-content: space-between;color:#008489">您正在修改活动时间段<span @click="abolishRemake" style="cursor: pointer">取消</span></p>
          <div>
            <p>活动开始和结束时间：</p>
            <div style="display: flex;justify-content: flex-start">
              <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
      start: '00:00',
      step: '00:15',
      end:'24:00',
      minTime:Alllist.length?Alllist[Alllist.length -1].time[1]:''
    }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '24:00',
      minTime:startTime
    }">
              </el-time-select>
            </div>
          </div>
          <div>
            <p>活动人数：</p>
            <el-input type="text"  v-model="newPerson"  style="width:200px;border:none;font-size:15px;"></el-input>
          </div>
          <div>
            <p>活动价格：</p>
            <div style="border:1px solid #008489;border-radius: 5px;">
              <span style="padding: 0 10px;border-right:1px solid #008489">APY(人民币)</span>
              <input type="text"   v-model="Newprice" placeholder="￥" style="width:200px;border:none;font-size:15px;">
            </div>
          </div>
          <el-button style="margin:20px 0;" type="primary" plain @click="addActive(colorIndex)">{{isRemake? '保存': '新增'}}</el-button>
          <div v-if="Alllist.length">
            <div style="border-bottom:1px solid #008489;padding:10px 0;" v-for="(item,index) in Alllist " v-if="item.online !=1 && item.status !=2" >
              <div style="display: flex;justify-content: space-between"><span><b>开始时间：</b>{{item.time[0]}}</span><span><b>结束时间：</b>{{item.time[1]}}</span></div>
              <div style="display: flex;justify-content: space-between"><span><b>活动价格：APY&nbsp;&nbsp;</b>￥{{item.price}}</span><span><b>活动人数：</b>{{item.personNum}}</span></div>
               <div>
                 <span><i @click="delet(item,index,colorIndex)" class="el-icon-delete" style="font-size:20px;cursor: pointer;color:#008489"></i></span>
                 <span><i @click="remake(item,index,colorIndex)" class="el-icon-edit" style="font-size:20px;cursor: pointer;color:#008489"></i></span>
               </div>
            </div>
          </div>
          <div style="text-align: center" v-if="!Alllist.length">
            该天还没有活动哟！快新增一个吧!
          </div>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <el-button type="primary" plain @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
      </div>
    </div>
</template>

<script>

    export default {
        name: "moreTime",
      props:['active_id','complete'],
      data() {
        return {
          api: this.GLOBAL.baseURL,
          longTime:'',
          dateTime: '',
          activeNum:'',
          isShow:false,
          pickerOptions2: {
            disabledDate: (time) => {
              if(this.allDay.length){
                var a = ''
                for(let i = 0;i<this.allDay.length;i++){
                  if(a == true){
                    a == true
                    break
                  }else{
                    a = time.getTime() == this.parseDate(this.allDay[i].day)
                  }
                }
                return a || time.getTime() < Date.now() - 8.64e7
              }else{
                return  time.getTime() < Date.now() - 8.64e7;
              }
             }
            },
          activeList:[],
          price:'',
          dayCount:[],
          year:(new Date().getFullYear()),
          month:(new Date().getMonth() + 1),
          color:[],
          allDay:[],
          active:[],
          startTime:'',
          endTime:'',
          Alllist:[],
          Newprice:'',
          colorIndex:'',
          personNum:'',
          newPerson:'',
          dayIndex:'',
          noList:[],
          day:'',
          dateIndex:-1,
          isRemake: false,
          remakeList:'',
          remakeIndex:''
          }
        },
      methods:{
          //选择时间
        timeChoose(){

        },
        changeRouter(item,index){
          if(this.complete){
            if(this.allDay.length){
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                slot: this.allDay,
                long_day: 1,
                step: 11
              })
                .then(res=>{
                  if(res.data.code == 1){
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
                      })
                  }else if(res.data.code == 3){
                    this.changeRouter(item,index)
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                long_day: 1,
                step: 11
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.$message({
                      type: 'success',
                      message: '保存成功！'
                    })
                  }else if(res.data.code == 3){
                    this.changeRouter(item,index)
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }
          }else{
            if(!this.allDay.length){
              this.$message({
                type: 'error',
                message: '请填写活动'
              })
            }else{
              if(this.active_id){
                this.$http.post(this.api + '/home/Activity/save_activity',{
                  token: localStorage.getItem('token'),
                  activity_id: this.active_id,
                  slot: this.allDay,
                  long_day: 1,
                  step: 11
                })
                  .then(res=>{
                    if(res.data.code == 1){
                        this.$emit('changeRouter',{id:12,router:'accommodation',information: this.active_id,complete: this.complete})
                    }else if(res.data.code == 3){
                      this.changeRouter(item,index)
                    }else if(res.data.code == 0){
                      alert(res.data.msg)
                    }
                  })
              }else{
                this.$http.post(this.api + '/home/Activity/save_activity',{
                  token: localStorage.getItem('token'),
                  slot: this.allDay,
                  long_day: 1,
                  step: 11
                })
                  .then(res=>{
                    if(res.data.code == 1){
                      this.$emit('saveId',res.data.data)
                      this.$emit('changeRouter',{id:12,router:'accommodation',information: res.data.data,})
                    }else if(res.data.code == 3){
                      this.changeRouter(item,index)
                    }else if(res.data.code == 0){
                      alert(res.data.msg)
                    }
                  })
              }
            }
          }
        },
        timestampToTime(timestamp) {
           var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
           let  Y = date.getFullYear() + '-';
           let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
           let  D = (date.getDate()<10? '0'+ date.getDate():date.getDate());
            return Y+M+D;
         },
        get(day1, day2) {
          var getDate = function(str) {
            var tempDate = new Date();
            var list = str.split("-");
            tempDate.setFullYear(list[0]);
            tempDate.setMonth(list[1] - 1);
            tempDate.setDate(list[2]);
            return tempDate;
          }
          var date1 = getDate(day1);
          var date2 = getDate(day2);
         /* if (date1 > date2) {
            console.log('no')
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
          }else if(date1 == date2){
            console.log('yes')
            var dateArr = []
            dateArr.push({day:day2,list:[]})
            return dateArr
          }*/

          if(( date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() )){
            var dateArr = [];
            dateArr.push({day:day2,list:[]})
            return dateArr
          }else{
            date1.setDate(date1.getDate() + 1);
            var dateArr = [];
            var i = 0;
            while (!(date1.getFullYear() == date2.getFullYear()
              && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                .getDate())) {
              var dayStr =date1.getDate().toString();
              var newDate = (date1.getMonth() + 1).toString();
              if(dayStr.length ==1){
                dayStr="0"+dayStr;
              }
              if(newDate.length == 1){
                newDate = '0'+ newDate
              }
              dateArr[i] =({day:date1.getFullYear() + "-" + newDate + "-"
                  + dayStr,list:[]}) ;
              i++;
              date1.setDate(date1.getDate() + 1);
            }
            dateArr.splice(0,0,{day:day1,list:[]})
            dateArr.push({day:day2,list:[]});
            return dateArr;
          }
        },
        prevYear(){
          this.year -= 1
        },
        nextYear(){
          this.year += 1
        },
        prevMonth(){
          this.month -= 1
          if(this.month == 0){
            this.month = 12
            this.year -=1
          }
        },
        nextMonth(){
          this.month += 1
          if(this.month == 13){
             this.month = 1
            this.year += 1
          }
        },
        getMonth(year,month){
          var day = new Date(year,month,0)
          var dayCount = day.getDate()
          return dayCount
        },
        getFirstDay(year,month){
          var day = new Date(year,month-1)
          var dayCount = day.getDay()
          if(dayCount == 0){
            dayCount = 7
          }
          return dayCount
        },
        changeColor(item,index){
          if(this.dateIndex == index){
            this.isShow = false
            this.dateIndex = -1
          }else{
            this.dateIndex = index
            this.dayIndex = index
            let d = item.toString()
            let m = this.month.toString()
            if(item < 10){
              d = '0' + d
            }
            if(m < 10){
              m = '0' + m
            }
            let day = this.year + '-' + m + '-'+ d
            this.isShow = true
            this.day = day
            this.Alllist = []
            this.colorIndex = ''
            for(let i =0;i<this.allDay.length;i++){
              if(day == this.allDay[i].day){
                this.colorIndex = i
                this.Alllist = this.allDay[i].list
              }
            }
          }
        },
        saveActive() {
          if (!this.longTime) {
            this.$message({
              type: 'error',
              message: '请选择活动时间'
            })
          } else if (!this.activeNum||!(/^[1-9]\d*$/).test(this.activeNum)) {
            this.$message({
              type: 'error',
              message: '请填写正确活动数量（正整数）'
            })
          }else if(!this.personNum || !(/^[1-9]\d*$/).test(this.personNum)){
            this.$message({
              type: 'error',
              message: '请填写正确活动人数（正整数）'
            })
          }else if (!this.price || !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.price)) {
            this.$message({
              type: 'error',
              message: '请填写正确金额！（最多保留两位小数的正数）'
            })
          } else {
            let a = []
            a = this.get(this.timestampToTime(this.longTime[0]),this.timestampToTime(this.longTime[1]))
            for(let i =0;i<a.length;i++){
              let c = []
              for(let j =0;j<this.activeList.length;j++){
                c.push({time:[this.activeList[j].startTime,this.activeList[j].endTime],price:this.price,personNum:this.personNum})
              }
              a[i].list = c
            }
          if(this.allDay.length){
            for(let i =0;i<a.length;i++){
              for(let j = 0 ; j < this.allDay.length;j++){
                if( this.parseDate(a[i].day) == this.parseDate(this.allDay[j].day)){
                  this.allDay.splice(j,1)
                }
              }
            }
            for(let i =0;i<a.length;i++){
              this.allDay.push(a[i])
            }
          }else{
            this.allDay=(a)
          }
            this.getweekDay()
          }
        },
        addActive(index){
          if(!this.isRemake){
            if(!this.startTime||!this.endTime){
              this.$message({
                type:'error',
                message:'请填写活动时间'
              })
            }else if(!this.Newprice ||  !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.Newprice)){
              this.$message({
                type:'error',
                message:'请填写正确金额！（最多保留两位小数的正数）'
              })
            }else if(!this.newPerson || !(/^[1-9]\d*$/).test(this.newPerson)){
              this.$message({
                type:'error',
                message:'请填写正确活动人数（正整数）'
              })
            }else{
              if(!this.Alllist.length){
                this.Alllist.push({time:[this.startTime,this.endTime],price:this.Newprice,personNum:this.newPerson})
                this.allDay.push({day:this.day,list:this.Alllist})
                this.getweekDay()
                this.startTime = ''
                this.endTime = ''
                this.Newprice = ''
                this.newPerson = ''
              }else{
                this.Alllist.push({time:[this.startTime,this.endTime],price:this.Newprice,personNum:this.newPerson})
                this.allDay[index].list = this.Alllist
                this.color[this.dayIndex].index = '0'
                this.startTime = ''
                this.endTime = ''
                this.Newprice = ''
                this.newPerson = ''
              }
            }
          }else{
            if(!this.startTime||!this.endTime){
              this.$message({
                type:'error',
                message:'请填写活动时间'
              })
            }else if(!this.Newprice ||  !(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.Newprice)){
              this.$message({
                type:'error',
                message:'请填写正确金额！（最多保留两位小数的正数）'
              })
            }else if(!this.newPerson || !(/^[1-9]\d*$/).test(this.newPerson)){
              this.$message({
                type:'error',
                message:'请填写正确活动人数（正整数）'
              })
            }else{
                if(!this.Alllist.length){
                  this.Alllist.push({time:[this.startTime,this.endTime],price:this.Newprice,personNum:this.newPerson})
                  this.allDay[index].list = this.Alllist
                  this.startTime = ''
                  this.endTime = ''
                  this.Newprice = ''
                  this.newPerson = ''
                  this.isRemake = false
                }else{
                  var b = this.parseDate(this.day +' '+this.startTime)
                  for(let i = 0; i< this.Alllist.length; i++){
                    var a = this.parseDate(this.day +' '+this.Alllist[i].time[0])
                    if( b < a){
                      this.Alllist.splice(i,0,{time:[this.startTime,this.endTime],price:this.Newprice,personNum:this.newPerson})
                      break;
                    }else{
                      if(i >= this.Alllist.length - 1 ){
                        this.Alllist.push({time:[this.startTime,this.endTime],price:this.Newprice,personNum:this.newPerson})
                        break;
                      }
                    }
                  }
                  this.allDay[index].list = this.Alllist
                  this.color[this.dayIndex].index = '0'
                  this.startTime = ''
                  this.endTime = ''
                  this.Newprice = ''
                  this.newPerson = ''
                  this.isRemake = false
                }
            }
          }
        },
        delet(item,index,colorIndex){
          this.$confirm('此操作将删除当天该时间段, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delatTime(item,index,colorIndex)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        delatTime(item,index,colorIndex){
          this.$http.post(this.api + '/SlotD',{
            token: localStorage.getItem('token'),
            slot_id: item.slot_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.Alllist.splice(index,1)
                if(colorIndex){
                  this.allDay[colorIndex].list = this.Alllist
                }
                if(!this.Alllist.length){
                  this.color[this.dayIndex].index = '1'
                  this.allDay.splice(colorIndex,1)
                }
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.delatTime(item,index,colorIndex)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getAllDay(){
          var day = this.getMonth(this.year,this.month)
          var dayIn = this.getFirstDay(this.year,this.month)
          var newDay = new Date().getTime()
          var temp =[]
          var color = []
          let b = []
          for(let i = 1;i<dayIn;i++){
            temp.push(' ')
            color.push({index:0})
          }
          for(let i = 1;i<=day;i++) {
            temp.push(i)
            b.push({index: 1})
            for (let j = 0; j < this.allDay.length; j++) {
              if(new Date(this.year, this.month - 1, i).getTime() >= Date.now() - 8.64e7){
                if (new Date(this.year, this.month - 1, i).getTime() == this.parseDate(this.allDay[j].day) && this.allDay[j].list.length && this.allDay[j].status !=2 ) {
                  for(let m =0; m<this.allDay[j].list.length;m++){
                    if(this.allDay[j].list[m].online != 1){
                      b[i - 1] = ({index: 0})
                    }else{
                      if(b[i-1].index == 0){
                        b[i - 1] = ({index: 0})
                      }else{
                        b[i - 1] = ({index: 3})
                      }
                    }
                  }
                } else {
                  if(b[i-1].index == 0){
                    b[i - 1] = ({index: 0})
                  }else{
                    b[i - 1] = ({index: 1})
                  }
                }
              }else{
                b[i - 1] = ({index: 3})
              }
            }
          }
          this.color = color.concat(b)
          this.dayCount = temp
        },
        parseDate(str) { // 字符串转时间戳
          return Date.parse(new Date(Date.parse(str.replace(/-/g, "/")))) ; // 精确到秒
        },
        getweekDay(){
          var beganTime = new Date(this.allDay[0].day)
/*          this.year = beganTime.getFullYear()
          this.month = beganTime.getMonth()+1*/
          var day = this.getMonth(this.year,this.month)
          var dayIn = this.getFirstDay(this.year,this.month)
          var temp =[]
          var color = []
          let b = []
          for(let i = 1;i<dayIn;i++){
            temp.push(' ')
            color.push({index:0})
          }
          for(let i = 1;i<=day;i++){
            temp.push(i)
            b.push({index:1})
            for (let j = 0; j < this.allDay.length; j++) {
              if(new Date(this.year, this.month - 1, i).getTime() >= Date.now() - 8.64e7){
                if (new Date(this.year, this.month - 1, i).getTime() == this.parseDate(this.allDay[j].day) && this.allDay[j].list.length && this.allDay[j].status !=2 ) {
                  for(let m =0; m<this.allDay[j].list.length;m++){
                    if(this.allDay[j].list[m].online != 1){
                       b[i - 1] = ({index: 0})
                    }else{
                      if(b[i-1].index == 0){
                        b[i - 1] = ({index: 0})
                      }else{
                        b[i - 1] = ({index: 3})
                      }
                    }
                  }
                } else {
                  if(b[i-1].index == 0){
                    b[i - 1] = ({index: 0})
                  }else{
                    b[i - 1] = ({index: 1})
                  }
                }
              }else{
                b[i - 1] = ({index: 3})
              }
            }
          }
          this.color = color.concat(b)
          this.dayCount = temp
        },
        deletDate(){
          this.$confirm('此操作将删除已选取的时间, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var a = []
            for(let i = 0;i<this.allDay.length;i++){
              for(let j = 0; j < this.allDay[i].list.length;j++){
                if(this.allDay[i].list[j].slot_id){
                  a.push(this.allDay[i].list[j].slot_id)
                }
              }
            }
            this.deletAllDay(a)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        deletAllDay(val){
         this.$http.post(this.api + '/SlotD',{
           token: localStorage.getItem('token'),
           slot_id: JSON.stringify(val)
         })
           .then(res=>{
             if(res.data.code == 1){
               this.allDay = []
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
             }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   localStorage.setItem('token',res.data.data)
                   this.deletAllDay(val)
                 })
             }else if(res.data.code == 0){
               alert(res.data.msg)
             }
           })
        },
        remake(item,index){
          this.isRemake = true
          this.remakeIndex = index
          this.Alllist.splice(index,1)
          this.remakeList = item
          this.startTime = item.time[0]
          this.endTime = item.time[1]
          this.Newprice = item.price
          this.newPerson = item.personNum
        },
        abolishRemake(){
          this.isRemake = false
          this.Alllist[this.remakeIndex] = (this.remakeList)
          this.startTime = ''
          this.endTime = ''
          this.Newprice = ''
          this.newPerson = ''
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
                if(data.long_day == 1){
                  this.allDay = data.slot
                  if(this.allDay.length){
                    this.getweekDay()
                  }
                }
              }else if(res.data.code == 3){
               this.getActives()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      watch:{
        activeNum:function(){
          var reg = /^[1-9]\d*$/
          if(this.activeNum){
            if(reg.test(this.activeNum)){
              let a = []
              for(let i = 0;i<parseInt(this.activeNum);i++){
                a.push({startTime:'',endTime:''})
              }
              this.activeList = a
            }else{
              this.$message({
                type: 'error',
                message: '请输入正整数'
              })
            }
          }else{
            this.activeList = []
          }
        },
        year:function(){
         this.getAllDay()
        },
        month:function(){
         this.getAllDay()
        },
        allDay:function(){
          if(this.allDay.length){
            this.$emit('notChange','2')
          }else{
            this.$emit('notChange','')
          }
        },
      },
      mounted(){
          let _this = this
        if(_this.active_id){
         _this.getActives()
        }
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
  .ui-datepicker-header-year{
    display: flex;
    justify-content: space-between;
    line-height:40px;
  }
  .ui-datepicker-btn{
    font-size:20px;
    line-height:40px;
    cursor: pointer;
  }
  .ui-datepicker-header-month{
    display: flex;
    justify-content: space-between;
    padding:0 30px;
    margin-top:30px;

  }
  .datepick{
    float:left;
    width:68px;
    height:68px;
    line-height:68px;
    text-align:center;
    margin: 0 2px 2px 0;

    font-size:12px;
  }
</style>
