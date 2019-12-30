<template>
    <div style="text-align:left">
        <div width="560px" style="margin: 0 auto">
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
          <table width="560px" height="78px" style="text-align:center" class="ui-datepicker-body">
            <tr>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th>日</th>
            </tr>
          </table>
          <div style="width:560px;overflow:hidden">
            <div v-for="(item,index) in dayData" @click="dateCheck();changeColor(index)" :style="{'color':color[index],'background-color':activeIndex == index? '#008489':'#fff'}"  style="float:left;width:78px;height:78px;line-height:78px;text-align:center;border:1px solid #eee;cursor: pointer;" >
               {{item}}
            </div>
          </div>

        </div>

    </div>
</template>

<script>
  // new Date(year,month-1,day)
  // 年getFullYear()    月getMonth()   日getDate()   星期几getDay()
  //当月第一天 new Date(year,month-1,1)     当月最后一天 new Date(year,month,0)
    export default {
        name: "datepicker",
      data(){
          return{
            datepicker:'',
            dayData:[],
            color:[],
            year:(new Date()).getFullYear().toString(),
            month:((new Date()).getMonth()+1).toString(),
            nowDay:0,
            activeIndex:-1
          }
      },
      computed:{

      },
      watch:{
          year:function(){
            this.year = this.year
            var dayCount=this.getMonth(this.year,this.month);
            var dayIn=this.getFirstDay(this.year,this.month);
            var temp=[];
            var color=[];
            for(var i=1;i<dayIn;i++){
              temp.push('0');
              color.push('#fff')
            }
            for(var i=1;i<=dayCount;i++){
              temp.push(i);
              color.push()
            }
            this.dayData=temp
            this.color = color
          },
          month:function(){
            var dayCount=this.getMonth(this.year,this.month);
            var dayIn=this.getFirstDay(this.year,this.month);
            var temp=[];
            var color=[];
            for(var i=1;i<dayIn;i++){
              temp.push('0');
              color.push('#fff')
            }
            for(var i=1;i<=dayCount;i++){
              temp.push(i);
              color.push()
            }

            this.dayData=temp
            this.color = color
          }
      },
      mounted(){
      // this.datepicker =  this.getMonthData(2016,12)
        var dayCount=this.getMonth(this.year,this.month);
        var dayIn=this.getFirstDay(this.year,this.month);
        var temp=[];
        var color=[];
        for(var i=1;i<dayIn;i++){
          temp.push('0');
          color.push('#fff')
        }
        for(var i=1;i<=dayCount;i++){
          temp.push(i);
          color.push()
        }
        this.dayData=temp
        this.color = color
      },
      methods:{
          /*getMonthData(year,month){
            var datepicker = {}

            let ret = []
            if(!year || !month){
              var today = new Date();
              var year = today.getFullYear()
              var month = today.getMonth() + 1;
            }
            let firstDay = new Date(year,month-1,1);
            let firstDayWeekDay = firstDay.getDay();
            if(firstDayWeekDay === 0) firstDayWeekDay = 7;
            let lastDayOfLastMonth = new Date(year,month-1,0);
            let lastDateOfLastMonth = lastDayOfLastMonth.getDate();
            let prevMonthDayCount = firstDayWeekDay-1;
            let lastDay = new Date(year,month,0)
            let lastDate = lastDay.getDate()
            for( let i = 0;i <7*6;i++){
                var date = i + 1 - prevMonthDayCount
                var showDate = date
                var thisMonth = month
              //上月
              if(date <= 0){
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date
              }else if(date > lastDate){
                //下一月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
              }
              if(thisMonth === 0){
                thisMonth = 12
              }
              if(thisMonth === 13){
                thisMonth = 1;
              }
              ret.push({
                month : thisMonth,
                date: date,
                showDate:showDate
              })

            }
            return ret
            var monthData = datepicker.getMonthData(year,month);

          }*/

          getMonth(year,month){
            var day=new Date(year,month,0);
            var dayCount= day.getDate();
            return dayCount
          },
          getFirstDay(year,month){
              var day=new Date(year,month-1);
              var dayCount=day.getDay();
              if(dayCount==0){
                dayCount=7
              }
              return dayCount
          },
        prevYear(){
            this.year = (Number(this.year) -1).toString()
        },
        nextYear(){
            this.year = (Number(this.year) +1).toString()
        },
        prevMonth(){
          this.month = (Number(this.month) -1).toString()
            if(this.month === '0'){
              this.month = 12
              this.year = (Number(this.year) -1).toString()
            }
            return this.month && this.year

        },
        nextMonth(){
          this.month = (Number(this.month) +1).toString()
          if(this.month === '13'){
            this.month = 1
            this.year = (Number(this.year) +1).toString()
          }
          return this.month && this.year
        },
        changeColor(index){
            if((this.dayData)[index] === '0'){
              this.activeIndex = this.activeIndex
            }else if(this.activeIndex === index){
              this.activeIndex = -1
            }else{
              this.activeIndex = index

            }
        },
        dateCheck(){
            this.$emit('dateCheck')
        }
      }
    }
</script>

<style scoped>

 .ui-datepicker-header{
   width:550px;
   padding: 5px;
   height:150px;
  line-height: 50px;
   border-top-right-radius: 10px;
   border-top-left-radius: 10px;
   color:#fff;
  text-align:center;
  background-color:#008489;
  border-bottom: 1px solid #ccc;
  font-weight:bold;
}
 .ui-datepicker-header-year{
   height:70px;
   font-size:25px;
   line-height:70px
 }
 .ui-datepicker-header-month{
   height:70px;
   font-size:20px;
   line-height:70px;
   padding:0 20px;
 }
 .ui-datepicker-btn{
  cursor: pointer;
  font-family:serif;
  font-size: 20px;
  width: 20px;
  height: 70px;
  line-height: 70px;
  color: #fff;
  text-align:center;
  text-decoration: none;
}
.ui-datepicker-prev-btn{
  float:left
}
 .ui-datepicker-next-btn{
  float:right
}
 .ui-datepicker-body{
  border-collapse: collapse;
}
.ui-datepicker-body th{
  height: 78px;
  text-align: center;
  font-size: 16px;
  line-height: 78px;
}


</style>
