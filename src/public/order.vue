<template>
  <div>
    <el-container>
      <el-header><Head type="order" v-on:reload="reload" ></Head></el-header>
      <el-container style="width:1080px;margin:30px auto 0;text-align:left;">
        <el-aside width="600px">
          <div @click="goBack" style="cursor: pointer;width:50px"><i class="el-icon-arrow-left" ></i>返回</div>
          <div style="padding:20px;margin: 0 auto;width:490px">
            <div style="text-align:left">
              <div width="490px" style="margin: 0 auto">
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
                <table width="490px" height="68px" style="text-align:center" class="ui-datepicker-body">
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
                <div style="width:490px;overflow:hidden">
                  <div v-if="activeList.length != 0" v-for="(item,index) in dayData"   class="datepick" >
                    <div v-if="item != ' '&& color[index].index == '1'" style="background-color:#F0F0F0;width:100%;height:100%;display: flex;justify-content: center;align-items: center">
                      <div style="width:40px;height:40px;text-align: center;line-height:40px;position: relative;color:#999999">
                        {{item}}
                        <p style="background-color:#999999;height:1px;position:absolute;width:40px;transform: rotate(-45deg);top:20px;"></p>
                      </div>
                    </div>
                    <div v-if="item != ' '&& color[index].index == '0'" style="cursor:pointer;width:100%;height:100%;display: flex;justify-content: center;align-items: center;background-color: #14C5CA;color:#FFF;">
                      <div :style="{lineHeight:color[index].is_discount?'20px':'40px'}" style="width:40px;height:40px;text-align: center;position: relative;">
                        <p>{{item}}</p>
                        <p class="contentTitle" style="color:#fff" v-if="color[index].is_discount">{{Number(color[index].is_discount)}}折</p>
                      </div>
                    </div>
                    <div v-if="item != ' '&& color[index].index == '00' " style="background-color:#E1F5F6;width:100%;height:100%;display: flex;justify-content: center;align-items: center" >
                      <div style="width:40px;height:40px;text-align: center;line-height:40px;position: relative;color:red">
                        {{item}}
                      </div>
                    </div>
                  </div>
                  <div v-if="dayList.length != 0" v-for="(item,index) in dayData" @click="item ==''|| color[index].index == '1'||color[index].index == '00'?'':changeColor(item,index)" class="datepick" >
                    <div v-if="item != ' '&& color[index].index == '1'" style="background-color:#F0F0F0;width:100%;height:100%;display: flex;justify-content: center;align-items: center">
                      <div style="width:40px;height:40px;text-align: center;line-height:40px;position: relative;color:#999999">
                        {{item}}
                        <p style="background-color:#999999;height:1px;position:absolute;width:40px;transform: rotate(-45deg);top:20px;"></p>
                      </div>
                    </div>
                    <div v-if="item != ' '&& color[index].index == '0'" style="cursor:pointer;width:100%;height:100%;display: flex;justify-content: center;align-items: center" :style="{backgroundColor:colorIndex == index?'#14C5CA':'#E5FAFB',color:colorIndex == index?'#FFF':'#14C5CA'}">
                      <div :style="{lineHeight:color[index].is_discount?'20px':'40px'}" style="width:40px;height:40px;text-align: center;position: relative;">
                        <p>{{item}}</p>
                        <p class="contentTitle" style="color:#fff" v-if="color[index].is_discount">{{Number(color[index].is_discount)}}折</p>
                      </div>
                    </div>
                    <div v-if="item != ' '&& color[index].index == '00' " style="background-color:#E1F5F6;width:100%;height:100%;display: flex;justify-content: center;align-items: center" >
                      <div style="width:40px;height:40px;text-align: center;line-height:40px;position: relative;color:red">
                        {{item}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main style="width:480px;overflow: hidden">
          <div v-show="nextOrder">
            <p style="font-size:30px">下个可{{orderVolunteer? '报名': '预定'}}的体验</p>
            <h3>选择日期以查看{{orderVolunteer? '可报名': '可订'}}状态。</h3>
              <p class="childTip" v-if="kids_stand_high && !orderVolunteer">小贴士:儿童价年龄标准为{{kids_stand_low}}至{{kids_stand_high}}岁</p>
            <div style="width:480px;height:530px;overflow:hidden">
              <ul style="width:467px;height:530px;overflow-y: scroll;padding: 0 10px">
                <li v-if="dayMonth.length == 0&&item.status != 2" v-for="(item,index) in longMonth"  style="margin: 10px 0;line-height: 50px;">
                  <p class="fontweight">{{item.begin_date}}——{{item.end_date}}</p>
                  <!-- 修改套餐新增 -->
                  <div  style="border-top:1px solid #eee;border-bottom:1px solid #eee;line-height: 30px;padding: 0px 20px;">
                    <div style="font-size:14px;" :style="">
                      <div class="flexBetween">
                        <div >
                            <p class="fontweight">{{item.begin_time}} —— {{item.end_time}}</p>
                              <p v-if="!orderVolunteer">
                              <p>标准:￥{{item.price}}
                                <span class="oldPrice" v-if="item.is_discount">
                                (原价￥{{item.price_origin}}) 
                                <hr class="delteLine">
                                </span>
                              </p> 
                              <p v-if="item.price">
                                儿童:￥{{item.kids_price}}
                                <span class="oldPrice" v-if="item.is_discount">
                                (原价￥{{item.kids_price_origin}})
                                  <hr class="delteLine">
                                </span>
                              </p>
                            </p>
                        </div>
                        <div>
                          <div v-if="orderVolunteer" style="height: 100px;line-height:100px;">
                            <el-button type="primary" plain @click="choose(item,index)">报名</el-button>
                          </div>
                          <div v-if="!orderVolunteer" style="height: 100px;line-height:100px;">
                            <el-button type="primary"  :style="{color:(item.max_person_num - item.order_person_num)>0?'':'red'}" plain :disabled="(item.max_person_num - item.order_person_num)>0? false:true" @click="choose(item,index)">{{(item.max_person_num - item.order_person_num)>0?'选择':'已满'}}</el-button>
                          </div>
                        </div>
                      </div>
                      <p v-if="item.combine.length">包含套餐</p>
                      <div class="flexWrap">
                        <div v-for="(items,indexs) in item.combine" class="marginRight">
                          <span class="comnibe" v-if="items.type == 1">
                            亲子 
                            <span>{{items.adult}}成人</span>
                            <span>{{items.kids}}儿童</span>
                            <span>￥{{items.price}}</span>
                          </span>
                          <span class="comnibe" v-if="items.type == 2">
                            <span>{{items.name}}</span>
                            <span>{{items.adult}}人</span>
                            <span>￥{{items.price}}</span>
                          </span>
                        </div>
                      </div>
                      <p v-if="!orderVolunteer" style="color:#E43333;font-size:14px;font-weight: bold">{{item.max_person_num}}个名额·还剩{{item.max_person_num - item.order_person_num}}个名额</p>
                    </div>
                  </div>
                </li>
                <li v-if="item.status != 2" v-for="(item,index) in dayMonth"  :key="index" style="margin:20px 0;">
                  <p style="margin: 20px 0;"><b>{{item.date}}</b></p>
                  <div style="border-top:1px solid #eee;border-bottom:1px solid #eee;line-height: 30px;padding: 0px 20px;">
                    <div style="font-size:14px;">
                      <div class="flexBetween">
                        <div :style="{lineHeight:orderVolunteer?'100px':''}">
                            <p class="fontweight">{{item.begin_time}} —— {{item.end_time}}</p>
                            <div v-if="!orderVolunteer">
                              <p>标准:￥{{item.price}}
                                <span class="oldPrice" v-if="item.is_discount">
                                (原价￥{{item.price_origin}}) 
                                <hr class="delteLine">
                                </span>
                              </p> 
                              <p v-if="item.price">
                                儿童:￥{{item.kids_price}}
                                <span class="oldPrice" v-if="item.is_discount">
                                (原价￥{{item.kids_price_origin}})
                                  <hr class="delteLine">
                                </span>
                              </p>
                            </div>
                        </div>
                        <div>
                          <div v-if="orderVolunteer" style="height: 100px;line-height:100px;">
                            <el-button type="primary" plain @click="choose(item,index)">报名</el-button>
                          </div>
                          <div v-if="!orderVolunteer" style="height: 100px;line-height:100px;">
                            <el-button type="primary"  :style="{color:(item.max_person_num - item.order_person_num)>0?'':'red'}" plain :disabled="(item.max_person_num - item.order_person_num)>0? false:true" @click="choose(item,index)">{{(item.max_person_num - item.order_person_num)>0?'选择':'已满'}}</el-button>
                          </div>
                        </div>
                      </div>
                      <div v-if="!orderVolunteer">
                        <p v-if="item.combine.length">包含套餐</p>
                        <div class="flexWrap">
                          <div v-for="(items,indexs) in item.combine" class="marginRight">
                            <span class="comnibe" v-if="items.type == 1">
                              亲子 
                              <span>{{items.adult}}成人</span>
                              <span>{{items.kids}}儿童</span>
                              <span>￥{{items.price}}</span>
                            </span>
                            <span class="comnibe" v-if="items.type == 2">
                              <span>{{items.name}}</span>
                              <span>{{items.adult}}人</span>
                              <span>￥{{items.price}}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      
                      <p v-if="!orderVolunteer" style="color:#E43333;font-size:14px;font-weight: bold">{{item.max_person_num}}个名额·还剩{{item.max_person_num - item.order_person_num}}个名额</p>
                    </div>
                  </div>
                </li>
                <p v-if="!dayMonth.length && !longMonth.length" style="line-height: 503px;text-align: center">该月没有活动喔！，请查看其他月份</p>
              </ul>
            </div>
          </div>
          <div v-show="clickOrder">
            <div >
              <p style="font-size:30px">{{amount}}个可{{orderVolunteer?'报名':'预定'}}</p>
              <p class="childTip" v-if="kids_stand_high && !orderVolunteer">小贴士:儿童价年龄标准为{{kids_stand_low}}至{{kids_stand_high}}岁</p>
              <p style="margin:20px 0;"><span>活动/住宿日期&nbsp;&nbsp;<span class="margin"></span>{{checkDate}}</span><span style="float:right;color:#14C5CA;cursor: pointer" @click="deletTime">清除日期</span></p>
              <div style="width:480px;height:530px;overflow:hidden">
                <ul style="width:477px;height:530px;overflow-y: scroll;padding: 0 10px">
                   <li v-if="item.status != 2" v-for="(item,index) in clickList"  :key="index" style="margin:20px 0;">
                    <div v-if="item.status != 2" style="border-top:1px solid #eee;border-bottom:1px solid #eee;display: flex;line-height: 30px;justify-content: space-between;padding: 0px 20px;">
                      <div style="font-size:14px;width:70%;" :style="{lineHeight:!orderVolunteer?'':'100px'}">
                        <p class="fontweight">{{item.begin_time}} —— {{item.end_time}}</p>
                        <div v-if="!orderVolunteer">
                          <p>标准:￥{{item.price}}
                            <span class="oldPrice" v-if="item.is_discount">
                              (原价￥{{item.price_origin}}) 
                              <hr class="delteLine">
                              </span>
                            </p> 
                          <p v-if="item.price">
                            儿童:￥{{item.kids_price}}
                              <span class="oldPrice" v-if="item.is_discount">
                              (原价￥{{item.kids_price_origin}})
                                <hr class="delteLine">
                              </span>
                            </p>
                        </div>
                        <div v-if="!orderVolunteer">
                           <p v-if="item.combine.length">包含套餐</p>
                          <div v-for="(items,indexs) in item.combine">
                            <span class="comnibe" v-if="items.type == 1">
                              亲子 
                              <span>{{items.adult}}成人</span>
                              <span>{{items.kids}}儿童</span>
                              <span>￥{{items.price}}</span>
                            </span>
                            <span class="comnibe" v-if="items.type == 2">
                              <span>{{items.name}}</span>
                              <span>{{items.adult}}人</span>
                              <span>￥{{items.price}}</span>
                            </span>
                          </div>
                        </div>
                       
                        <p v-if="!orderVolunteer" style="color:#E43333;font-size:14px;font-weight: bold">{{item.max_person_num}}个名额·还剩{{item.max_person_num - item.order_person_num}}个名额</p>
                      </div>
                      <div v-if="orderVolunteer" style="height: 100px;line-height:100px;">
                        <el-button type="primary" plain @click="choose(item,index)">报名</el-button>
                      </div>
                      <div v-if="!orderVolunteer" style="height: 100px;line-height:100px;">
                        <el-button type="primary"  :style="{color:(item.max_person_num - item.order_person_num)>0?'':'red'}" plain :disabled="(item.max_person_num - item.order_person_num)>0? false:true" @click="choose(item,index)">{{(item.max_person_num - item.order_person_num)>0?'选择':'已满'}}</el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-main>
        <div  v-show="volunteer" style="position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.6);z-index:999">
          <div class="volunteer animated fadeIn">
            <p @click="volunteer = false" ><i style="cursor: pointer" class="el-icon-arrow-left"></i>返回</p>
            <div style="margin:20px 0;display: flex;justify-content: flex-start">
              <p>主要语言:</p>
              <el-select style="margin-left:10px;width:400px;"  v-model="firstlanguage" placeholder="请选择主要语言">
                <el-option v-for="item in stillist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div style="margin:20px 0;display: flex;justify-content: flex-start">
              <p>其他语言:</p>
              <el-select style="margin-left:10px;width:400px;"
                         v-model="volunLanguage"
                         multiple
                         filterable
                         allow-create
                         default-first-option
                         placeholder="请选择其他语言">
                <el-option
                  v-for="(item,index) in stillist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="index === firstlanguage? true:false"
                >
                </el-option>
              </el-select>
            </div>
            <div style="margin:20px 0;display: flex;justify-content: flex-start">
              <p>所会技能:</p>
              <el-input style="margin-left:10px;width:400px;" type="textarea" v-model="skill" :rows="4" placeholder="请填写技能"></el-input>
            </div>
            <div style="margin:20px 0;display: flex;justify-content: flex-start">
              <p>自我介绍:</p>
              <el-input v-model="introduce" style="margin-left:10px;width:400px;" type="textarea" :rows="4" placeholder="请简单介绍自己"></el-input>
            </div>
            <div style="text-align:right">
              <el-button type="primary" plain @click="send">申请</el-button>
            </div>
          </div>
        </div>
      </el-container>
      <div v-if="isLoading" style="position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.8);z-index:999">
        <Loading></Loading>
      </div>
    </el-container>
  </div>
</template>

<script>
  import Lan from '../../static/js/language'
  import Loading from './Loading'
  import Head from './head.vue'
    export default {
        name: "order",
      data(){
        return{
          api: this.GLOBAL.baseURL,
          orderList:[
          ],
          nextOrder:true,
          clickOrder:false,
          checkDate:'12月 23',
          amount:'1',
          clickList:[],
          dayData:[],
          year:(new Date()).getFullYear().toString(),
          month:((new Date()).getMonth()+1).toString(),
          nowDay:0,
          activeId:'',
          color:[],
          activeList:[],
          dayList:[],
          orderVolunteer:'',
          volunteer:false,
          volunLanguage:'',
          skill:'',
          introduce:'',
          stillist: [],
          jionTion:[],
          timeSolt:[],
          longDay:'',
          isHouse:'',
          colorIndex:-1,
          isLoading:false,
          isChoose:'',
          dayMonth:[],
          longMonth:[],
          allTime:[],
          firstlanguage:'',
          kids_stand_low:'',
          kids_stand_high:''
        }
      },
      components:{
          Head,
        Loading
      },
      watch:{
        year:function(){
          this.chooseTime()
          this.changeAlltime()
        },
        month:function(){
          this.chooseTime()
          this.changeAlltime()
        },
        '$route':'getParams',
      },
      
      methods:{
          changeAlltime(){
            var a = []
            if(this.longDay == 1){
              for(let i = 0;i<this.allTime.length;i++){
                if(this.parseDate(this.allTime[i].date)>= new Date(this.year,this.month-1,1).getTime() && this.parseDate(this.allTime[i].date) <= new Date(this.year,this.month,0).getTime() && this.parseDate(this.allTime[i].date) > Date.now() - 8.64e7 ){
                  a.push(this.allTime[i])
                }
               this.dayMonth = a
              }
            }else{
              for(let i =0;i<this.allTime.length;i++){
                if(this.parseDate(this.allTime[i].begin_date) >= new Date(this.year,this.month-1,1).getTime() && this.parseDate(this.allTime[i].begin_date) <= new Date(this.year,this.month,0).getTime()&& this.parseDate(this.allTime[i].end_date) > Date.now() - 8.64e7){
                  a.push(this.allTime[i])
                }
              }
              this.longMonth = a
        
            }
          },
          getALLtime(){
            // /home/Activity/get_activity
            this.$http.post(this.api + '/ActivitySlotUserTwo',{
              token: localStorage.getItem('token'),
              activity_id : this.activeId,
              verson: 2.0
            })
              .then(res=>{
                if(res.data.code == 1){
                  let data = res.data.data
                  for(var i = 0; i< data.length; i++){
                   this.longDay = data[i].long_day
                   if(data[i].online == 0){
                      if(data[i].long_day == 1){
                      this.dayList.push(data[i])
                      }else{
                        this.activeList.push(data[i])
                      }
                   }
                   this.allTime = data[i].long_day?this.dayList:this.activeList
                  }
                  this.changeAlltime()
                  this.chooseTime()
                }else if(res.data.code == 3){
                      this.getALLtime()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
        chooseTime(){
          var dayCount=this.getMonth(this.year,this.month); //这个月最后一天
          var dayIn=this.getFirstDay(this.year,this.month); //这个月第一天星期几
          var temp=[];
          var a = [];
          var b = []
          for(var i=1;i<dayIn;i++){
            temp.push(' ');
            a.push({index:1})
          }
          for(var i=1;i<=dayCount;i++){
            temp.push(i);
            b.push({index:i})
            if(this.activeList.length){
              for(let j = 0;j<this.activeList.length;j++){
                if(new Date(this.year,this.month -1,i).getTime() > Date.now()- 8.64e7 && new Date(this.year,this.month -1,i).getTime() >= this.parseDate(this.activeList[j].begin_date) && new Date(this.year,this.month -1,i).getTime() <= this.parseDate(this.activeList[j].end_date)){
              
                   b[i-1]=({index:'0',is_discount:this.activeList[j].is_discount?this.activeList[j].price_discount:''})
                
                }else if(new Date(this.year,this.month -1,i).getTime() < Date.now()- 8.64e7 && new Date(this.year,this.month -1,i).getTime() >= this.parseDate(this.activeList[j].begin_date) && new Date(this.year,this.month -1,i).getTime() <= this.parseDate(this.activeList[j].end_date)){
          
                  b[i-1]=({index:'1',is_discount:this.activeList[j].is_discount?this.activeList[j].price_discount:''})
                }else{
                  if( b[i-1].index != '0'){
                    b[i-1]=({index:'1',is_discount:this.activeList[j].is_discount?this.activeList[j].price_discount:''})
                  }
                }
              }
            }else{
              for(let j=0;j<this.dayList.length;j++){
                if(new Date(this.year,this.month -1,i).getTime() > Date.now()- 8.64e7  && new Date(this.year,this.month -1,i).getTime() == this.parseDate(this.dayList[j].date)){
                  if(this.dayList[j].status !=2 ){
                    if(b[i-1].is_discount){
                       b[i-1]=({index:'0',is_discount:Number(this.dayList[j].price_discount) < Number(b[i-1].is_discount)?this.activeList[j].price_discount:b[i-1].is_discount})
                    }else{
                       b[i-1]=({index:'0',is_discount:this.dayList[j].is_discount?this.dayList[j].price_discount:''})
                    }
                  }else{
                   if(b[i-1].is_discount){
                       b[i-1]=({index:'1',is_discount:Number(this.dayList[j].is_discount) < Number(b[i-1].is_discount)?this.activeList[j].price_discount:b[i-1].is_discount})
                    }else{
                       b[i-1]=({index:'1',is_discount:this.dayList[j].is_discount?this.dayList[j].price_discount:''})
                    }
                  }
                }else{
                  if( b[i-1].index != '0'){
                    b[i-1]=({index:'1'})
                  }
                }
              }
            }
          }
          this.color = a.concat(b)
    
          this.dayData= temp
      
          this.isLoading = false
        },
         parseDate(str) { // 字符串转时间戳
          return Date.parse(new Date(Date.parse(str.replace(/-/g, "/")))) ;
        },
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
          this.deletTime()
        },
        nextYear(){
          this.year = (Number(this.year) +1).toString()
          this.deletTime()
        },
        prevMonth(){
          this.month = (Number(this.month) -1).toString()
          if(this.month === '0'){
            this.month = 12
            this.year = (Number(this.year) -1).toString()
          }
          this.deletTime()
          return this.month && this.year
        },
        nextMonth(){
          this.month = (Number(this.month) +1).toString()
          if(this.month === '13'){
            this.month = 1
            this.year = (Number(this.year) +1).toString()
          }
          this.deletTime()
          return this.month && this.year
        },
        changeColor(item,index){
          if(this.colorIndex == index){
            this.colorIndex = -1
            this.clickOrder = false
            this.nextOrder = true
          }else{
            this.colorIndex = index
            this.nextOrder = false
            this.clickOrder = true
          }
          if(item<10){
            item = '0'+item
          }
          if(this.month<10){
            this.checkDate = this.year +'-0'+ this.month +'-'+ item
          }else{
            this.checkDate = this.year +'-'+ this.month +'-'+ item
          }
          var arr = []
          for(let i =0;i<this.dayList.length;i++){
            if(this.checkDate == this.dayList[i].date){
              arr.push(this.dayList[i])
              
            }
          }
          this.clickList = arr
          this.amount = arr.length
        },
        goBack(){
          this.$router.go(-1)
        },
        choose(item,index){
            if(this.isChoose){
              if(this.orderVolunteer){
                this.volunteer = true
                if(!this.longDay){
                  this.jionTion = [item.begin_date,item.end_date]
                  this.timeSolt = [item.slot_id]
                }else{
                  this.jionTion = [item.day]
                  this.timeSolt = [item.slot_id]
                }
              }else{
                if(this.isHouse){
                  this.$confirm('该体验为顾客提供了房源, 是否预定?', '提示', {
                    confirmButtonText: '去预定',
                    cancelButtonText: '不预定',
                    type: 'warning'
                  }).then(() => {
                    
                    this.$router.push({
                      name: 'allHouse',
                      query:{
                        activeId: this.activeId,
                        slot_id:item.slot_id,
                        chooseTime: JSON.stringify(item)
                      }
                    })
                  }).catch(() => {
                      this.$router.push({
                        name: 'choose',
                        query:{
                          activeId: this.activeId,
                          chooseTime: JSON.stringify(item)
                        }
                      })
                  });
                }else{
                  this.$router.push({
                    name: 'choose',
                    query:{
                      activeId: this.activeId,
                      chooseTime: JSON.stringify(item)
                    }
                  })
                }
              }
            }else{
              this.$message({
                type: 'info',
                message: '你还没有验证身份，请验证后再预定！'
              })
              localStorage.setItem('editRouter','editcheck')
              localStorage.setItem('editIndex',2)
              this.$router.push({
                path: '/editcheck'
              })
            }
        },
        getParams(){
          this.activeId = this.$route.query.information
          this.isHouse = this.$route.query.isflag
        },
        getTime(){

        },
        deletTime(){
          this.clickOrder = false
          this.nextOrder = true
          this.colorIndex = -1
        },
        //申请志愿者
        send(){
          if(this.firstlanguage === ''){
            this.$message({type:'info',message:'请选择主要语言'})
          }else if(!this.volunLanguage){
          this.$message({type:'info',message:'请选择其他语言'})
          }else if(!this.skill){
            this.$message({type:'info',message:'请填写其他技能'})
          }else if(!this.introduce){
            this.$message({type:'info',message:'请填写您的自我介绍'})
          }else{
            this.isLoading = true
            this.$http.post(this.api + '/ErollS',{
              token: localStorage.getItem('token'),
              language: this.volunLanguage,
              skill: this.skill,
              activity_id: this.activeId,
              introduce: this.introduce,
              slot_id: this.timeSolt,
              free_time: this.jionTion,
              main_language: this.firstlanguage
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.volunteer = false
                  this.introduce = ''
                  this.skill = ''
                  this.$message({
                    message:'申请发送成功',
                    type:'success'
                  })
                  this.isLoading = false
                }else if(res.data.code == 3){
                  this.send()
                }else{
                  this.$alert(res.data.msg)
                  this.isLoading = false
                }
              })
              .catch(error=>{
                this.isLoading = false
              })
          }
        },
        getOld(){
          this.$http.post(this.api + '/ActivityETwo',{
            token: localStorage.getItem('token'),
            activity_id: this.activeId
          })
          .then(res=>{
            if(res.data.code == 1){
              this.kids_stand_low = res.data.data.kids_stand_low
              this.kids_stand_high = res.data.data.kids_stand_high
            }else if(res.data.code == 3){
              this.getOld()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        //查看是否可以预定
        reload(res){
          let data = res.data.data[0]
          if(data.audit_idcard){
            this.isChoose = true
          }else{
            this.isChoose = false
          }
          this.getOld()
        }
      },
      mounted(){
          this.isLoading = true
          this.getALLtime()
      },
      created() {
        this.getParams()
        if(this.$route.query.orderVolunteer){
          this.orderVolunteer = this.$route.query.orderVolunteer
    
        }
        this.stillist = Lan()
      },
    }
</script>

<style scoped>
  ul{
    margin: 0 0;
    padding: 0 0
  }
  .ui-datepicker-header{
    width:480px;
    padding: 5px;
    height:150px;
    line-height: 50px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color:#fff;
    text-align:center;
    background-color:#14C5CA;
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
  .datepick{
    float:left;
    width:68px;
    height:68px;
    line-height:68px;
    text-align:center;
    margin:0 2px 2px 0
  }
  .volunteer{
    position:fixed;
    background-color:#fff;
    z-index:999;
    top:50%;
    left:50%;
    width:500px;
    height:440px;
    margin-left:-270px;
    margin-top:-240px;
    border:1px solid #eee;
    text-align:left;
    padding:20px;
    border-radius:10px;
  }
  .oldPrice{
    color: #999999;
    font-size:12px;
    position: relative;
  }
  .delteLine{
    position: absolute;
    right: 0px;
    top: 6px;
    width:70px;
  }
  .comnibe{
    padding: 5px 10px;
    background:rgba(243,245,247,1);
    border-radius:4px;

  }
  .childTip{
    width:230px;
    color:#14C5CA;
    font-size:15px;
    font-weight:400;
    padding: 5px 10px;
    background:rgba(232,255,255,1);
    margin-top: 10px;
  }
</style>
