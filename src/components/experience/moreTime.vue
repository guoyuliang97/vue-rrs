<template>
    <div style="line-height: 40px;width: 100%;" class="flexBetween">
      <div>
        <div v-if="isRemake" class="flexBetween" style="margin:20px 0;background-color: #eee;padding: 0 10px">
            <p>*您正在修改已创建<span style="color:#CA1425">{{witchDay}}</span>的活动时间</p>
            <p @click="abiosh" style="color:#CA1425;cursor: pointer;">取消</p>
        </div>
        <div v-if="isRemake"  class="block">
          <span style="margin-right: 10px;"><b>举办活动时间段:</b></span>
          <el-date-picker
            v-model="reMakeDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="!isRemake" class="block">
          <span style="margin-right: 10px;"><b>举办活动时间段:</b></span>
          <el-date-picker
            @change = 'chooseTime'
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
        <div v-show="allTimeL.length" >
           <span style="margin-right: 10px;"><b>已选活动时间段:</b></span>
            <div style="max-width:450px;">
              <el-button @click="deletTime(item,index)"  v-for="(item,index) in allTimeL" size='mini' icon="el-icon-delete">{{item.begin_date}}——{{item.end_date}}</el-button>
            </div>
        </div>
        <div v-if="!isRemake" class="block">
          <span style="margin-right:10px;"><b>每天举办活动数量：</b></span>
          <el-input type="text" v-model="activeNum"  maxlength="2"  placeholder="请输入数量至少为1" style="width:200px;"></el-input>
        </div>
        <div class="block" v-for="(item,index) in activeList" :key="index" >
            <p style="margin-right:20px;"><b>活动开始和结束时间：</b></p>
            <!-- <el-time-picker is-range v-model="dateTime"  value-format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>-->
            <el-time-select
              editable
              placeholder="起始时间"
              v-model="item.begin_time"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
              minTime: index>0? activeList[index-1].end_time:''
            }">
            </el-time-select>
            <el-time-select
              editable
              placeholder="结束时间"
              v-model="item.end_time"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
              minTime: item.begin_time
            }">
            </el-time-select>
        </div>
        <div class="block">
          <div style="display: flex;justify-content: flex-start">
            <span style="margin-right:10px;"><b>活动人数:</b></span>
            <el-input type="text"  v-model="personNum" placeholder="请输入正整数" style="width:200px;border:none;font-size:15px;"></el-input>
          </div>
        </div>

        <!-- 第二版本新增 -->
        <div>
          <p><b>优惠设置<span style="color:#999">(可多选)</span></b></p>
          <div style="position:relative;margin-bottom: 0px;">
            <el-checkbox-group style="text-color: #14c5ce !important" @change="checkDiscount"   v-model="discountChose">
              <el-checkbox  label="1">设置折扣价</el-checkbox>
              <el-checkbox label="2">设置亲子套餐</el-checkbox>
              <el-checkbox label="3">设置综合套餐</el-checkbox>
            </el-checkbox-group>
            <!-- 查看显示 -->
            <div class="flexStart contentTitle positionTop">
              <div class="check1 sizeCheck"  v-show="chooseShow('1')" :style="{'color': '1' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(1)" >
                (查看
                <i :class="{'el-icon-arrow-up':'1' != clickCheck,'el-icon-arrow-down': '1' == clickCheck}"></i>)
              </div>
              <div class="check2 sizeCheck"  v-show="chooseShow('2')" :style="{'color': '2' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(2)" >
                (查看
                <i :class="{'el-icon-arrow-up':'2' != clickCheck,'el-icon-arrow-down': '2' == clickCheck}"></i>)
              </div>
              <div class="check3 sizeCheck"  v-show="chooseShow('3')" :style="{'color': '3' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(3)" >
                (查看
                <i :class="{'el-icon-arrow-up':'3' != clickCheck,'el-icon-arrow-down': '3' == clickCheck}"></i>)
              </div>
            </div>
          </div>
          
          <!-- 设置折扣价 -->
          <div v-show="choseLook == 1" :v-model="zkCombo">
            <div class="flexStart " >
              <span class="contentTitle">标准原价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="zkCombo.oldPrice"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <span class="contentTitle marginLeft">折扣:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="zkCombo.discount"  placeholder="请输入折扣" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle">折</span>
              <div>
                <span class="contentTitle marginLeft">折扣价:{{disprice}}元</span>
              </div>
            </div>
            <div class="flexStart">
              <span class="contentTitle">儿童原价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="zkCombo.oldChildPrice"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <span class="contentTitle marginLeft">折扣:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="zkCombo.childDiscount"  placeholder="请输入折扣" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle">折</span>
              <div>
                <span class="contentTitle marginLeft">折扣价:{{childDisprice}}元</span>
              </div>
            </div>
          </div>
          <!-- 设置亲子套餐 -->
          <div v-show="choseLook == 2">
            <div v-show="isCreate" class="contentTitle">
              <span @click="getCombine('1',isQzCombine)" style="cursor:pointer" :style="{'color': isQzCombine?'#999':'#14c5ca'}">
              <i class="el-icon-plus"></i>
                使用您创建过的亲子套餐
              </span> 
            </div>
            <div class="flexStart" v-for="(item,index) in pcCombo">
              <span class="contentTitle">成人人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.adult"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">儿童人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.kids"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="item.price"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <div   @click="aplyDate(item,index,'1')" class="circle"><i class="el-icon-tickets"></i></div>
              <div @click="delteQzCombo(item,index)" class="circle"><i class="el-icon-close"></i></div>
            </div>
              <el-button @click="addCombo('2')" icon="el-icon-plus">增加亲子套餐</el-button>
          </div>
          <!-- 设置综合套餐价格 -->
          <div v-show="choseLook == 3">
            <div v-show="isZhemo" class="contentTitle">
              <span @click="getCombine('2',iszhCombo)" style="cursor:pointer" :style="{'color': iszhCombo?'#999':'#14c5ca'}">
              <i class="el-icon-plus"></i>
                使用您创建过的综合套餐
              </span> 
            </div>
            <div class="flexStart" v-for="(item,index) in zhCombo">
                <span class="contentTitle"> 套餐名称:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.name"  placeholder="请输入名称" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.adult"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="item.price"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <div   @click="aplyDate(item,index,'2')" class="circle"><i class="el-icon-tickets"></i></div>
              <div @click="delteZhCombo(item,index)" class="circle"><i class="el-icon-close"></i></div>
            </div>
            <el-button @click="addCombo('3')" icon="el-icon-plus">增加综合套餐</el-button>
          </div>
        </div>




        <!-- 第一版本结构 -->
        <div v-show="isPrice">
          <p><b>设置价格：</b></p>
          <div class="flexStart">
            <span class="contentTitle">标准价格:</span>
            <div class="inputBorder flexStart">
              <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
              <input type="text" v-model="bzPrice"  placeholder="请输入价格" style="width:200px;border:none;font-size:15px;padding-left:10px">
            </div>
          </div>
          <div class="flexStart">
            <span class="contentTitle">儿童价格:</span>
            <div class="inputBorder flexStart">
              <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
              <input type="text" v-model="etPrice"  placeholder="请输入价格" style="width:200px;border:none;font-size:15px;padding-left:10px">
            </div>
          </div>
        </div>
        <div v-if="!isRemake" class="block">
          <el-button type="primary" style="background-color: #fff !important;color: #14C5CA !important" plain @click="saveActive">添加到日历</el-button>
        </div>
         <div v-if="isRemake" class="block">
          <el-button  style="background-color: #fff !important;color: #666666 !important;border-color: #D5D8DD !important" @click="saveActive">保存修改</el-button>
        </div>



        <!-- 设置反差价 -->
        <div>
          <el-checkbox v-model="chaJia"><b>设置返差价</b></el-checkbox>
          <el-tooltip content="bottom" placement="bottom" effect="light">
            <div slot="content" style="width:300px;line-height:30px;">
              <p class="fontweight">返差价说明：</p>
              <p>1.活动满设置人数且此体验完成结束时，退还用户预付的百分比金额（人数也包含购买套餐的固定人数）</p>
              <p>2.如果设置第二次的人数下限大于上一次人数时，返还比例需大于上一次比例</p>
              <p>3.体验结束时，若没有达到满设置退还人数时，
                  将不会退还金额给用户</p>
              <p>4.退差价的返还金额比例不叠加，默认选择只满
                  足要求的一档返还</p>
              <p class="zhuShi">例子：小王购买了某策划者的体验，此体验参
                  与时间为14:00-18:00，策划者设置此体验满
                  10人参与则退还10%，若此体验在结束时满了
                  10人参与，小王将收到支付的10%的退款。</p>
            </div>
            <i class='el-icon-question' style="color:#999" ></i>
          </el-tooltip>
          <div v-show="chaJia">
            <div class="flexStart" v-for="(item,index) in cjList">
              <div class="flexStart" >
                <span class="contentTitle">满人数:</span>
                <el-input type="text" v-model="item.num" @blur="isCjNum(item,index)" placeholder="输入人数" class="inputStyle"></el-input>
              </div>
              <div class="flexStart marginLeft">
                <span class="contentTitle">退还比例:</span>
                <el-input type="text" v-model="item.refund_rate" @blur="isCjScale(item,index)" placeholder="输入百分比" class="inputStyle"></el-input>
                <span>(%)</span>
              </div>
              <div @click="delteCj(item,index)" class="circle">
                <i class="el-icon-close"></i>
                </div>
            </div>
            <el-button @click="addCombo('1')" icon="el-icon-plus">新增返差价</el-button>
          </div>
        </div>
        <!-- 设置儿童年龄 -->
        <div v-show="isChildren">
          <p class="fontweight">设置儿童价标准</p>
          <div class="inputBorder flexStart" style="width:197px">
            <input @blur="isminOld" type="number" style="width:90px;border:none;text-align: center" v-model="minOld" placeholder="最小年龄">
            至
            <input @blur="ismaxOld" type="number" style="border:none;width:90px;text-align:center" v-model="maxOld" placeholder="最大年龄">
          </div>
        </div>
        <!-- 设置参与者年龄 -->
        <div>
          <p class="fontweight">设置参与者年龄下限</p>
          <div class="inputBorder" style="width:90px">
            <input @blur="isminJoinOld" type="number" style="width:90px;border:none;text-align: center" v-model="minJoinOld" placeholder="最小年龄">
          </div>
        </div>
        <div style="margin: 20px 0;">
          <el-button type="primary" plain @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
        </div>
      </div>
      <div v-show="allDay.length">
        <p id="dateShow" style="width:420px;"><span class="fontweight">体验日历</span>
        <span @click="packDate" class="mainColor contentTitle fontweight marginLeft">{{isDate?'查看日历':'收起日历'}}</span>
        </p>
         <div v-show="!isDate">
          <div  style="width:420px;">
            <div class="flexBetween"><span class="fontweight contentTitle">(点每一天查看具体活动)</span><span class="mainColor "><span @click="getAllSlot">批量删除</span><span class="marginLeft" @click="deletDate">清空日期</span></span></div>
            <div style="width:400px;padding:20px 10px;background-color:#14C5CA;color:#fff;text-align:center;border-top-right-radius:10px;border-top-left-radius:10px;">
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
            <table style=" border-collapse: collapse;text-align: center" width="420px" height="59px;">
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
            <div style="width:420px;overflow:hidden">
              <div v-for="(item,index) in dayCount" :key="index" @click="color[index].index == '2'||color[index].index  == '3' || color[index].index  == '1'? '': changeColor(item,index)"  class="datepick" >
                <!-- <div v-if="item != ' '&& color[index].index == '1'" style="cursor: pointer;"  :style="{backgroundColor:dateIndex === index?'#E5FAFB': '#F0F0F0',color:dateIndex === index?'#fff':'#000'}"  >{{item}}</div> -->
                <div v-if="item != ' '&& color[index].index == '2'"  style="line-height: 30px;color:red;border:1px solid red"  >{{item}}<p>已过期</p></div>
                <div v-if="item != ' '&& color[index].index == '3'"  style="background-color:#F0F0F0" >{{item}}</div>
                <div v-if="item != ' '&& color[index].index == '1'"  style="background-color:#F0F0F0" >{{item}}</div>

              <!--  <div v-if="color[index].index == '3'"  style="background-color: #EE395B;color:#fff;"  >{{item}}/无</div>-->
                <div v-if="item != ' '&& color[index].index == '0'"  :style="{backgroundColor:dateIndex === index? '#14C5CA': '#E5FAFB',color:dateIndex === index?'#fff':'#14C5CA',}" style="line-height: 29px;cursor: pointer;" >{{item}}<p>有活动</p></div>
              </div>
            </div>
          </div>
         
          <div v-show="timeNumber.length">
            <div class="timeList" v-for="(item,index) in timeNumber">
                <div>
                  <div class="flexBetween" >
                      <div><span>开始和结束时间：</span>{{item.begin_time}} — {{item.end_time}}</div>
                      <div class="flexStart">
                        <div>
                            <el-button tyle="primary" @click="delet(item,index)"  size="mini" plain>删除</el-button>          
                        </div>
                        <div class="marginLeft">
                            <el-button tyle="primary" @click="remake(item,index)" plain size="mini">编辑</el-button>
                        </div>
                      </div>
                  </div>
                  <div><span>活动人数：</span>{{item.max_person_num}}</div>
                  <div v-if="item.kind == '2'">
                    <span>活动价格：</span>
                    标准价格&nbsp;￥{{item.price[0]}} 
                    <span class="marginLeft">儿童价格&nbsp;￥{{item.price[1]}}</span>
                  </div>
                  <div v-if="item.kind == '1'">
                    <p> <span>活动价格：</span></p>
                    <p>
                    标准&nbsp;￥{{item.price.disprice}}
                    <span class="marginLeft">{{item.price.discount}}折</span>
                    <span class="marginLeft">原价￥{{item.price.oldPrice}}</span>
                    </p>
                    <p> <span>儿童&nbsp;￥{{item.price.childDisprice}}</span> 
                    <span class="marginLeft">{{item.price.childDiscount}}折</span>
                    <span class="marginLeft">原价￥{{item.price.oldChildPrice}}</span> 
                    </p>
                  </div>
                  <div v-if=" item.qzCombo.length" class="flexStart" >
                      <div>亲子套餐：</div>
                      <div class="flexWrap">
                        <div class="marginRight " v-for="(v,i) in item.qzCombo"><span>{{v.adult}}成人{{v.kids}}儿童</span> <span>￥{{v.price}}</span> </div>
                      </div>
                  </div>
                  <div v-if="item.zhCombo.length" class="flexStart" >
                      <div>综合套餐：</div>
                      <div class="flexWrap">
                        <div class="marginRight " v-for="(v,i) in item.zhCombo"><span>{{v.name}}{{v.adult}}人</span> <span>￥{{v.price}}</span> </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 批量删除 -->
      <div v-show="isDelet" class="positionFixed">
          <div class="daletDate contentTitle">
              <div >
                <p class="mainPadding"><span class="marginLeft">时间段</span><span class="marginLeft"></span><span class="marginLeft">体验日期</span></p>
                <div class="flexBetween">
                  <div class="backDate">
                    <div v-for="(item,index) in allSlotDay" @click="chooseDelate(item,index)" class="a" :style="{backgroundColor:daletIndex === index?'#fff':'#F3F5F7'}">{{item.begin_time}}—{{item.end_time}}</div>
                  </div>
                  <div class="deleteDay">
                    <span class="delteList" :style="{borderColor:isDelateDay(item,index)? '#14C5CA':'#DFE1E4',color:isDelateDay(item,index)?'#14C5CA':'#333333'}" @click="chooseDay(item,index)" v-for="(item,index) in AllDayList">{{item.date_temp}}</span>
                  </div>
                </div>
              </div>
              <div style="text-align:right;padding:16px 24.5px;">
                <span @click="DeletDayAbolish" style="color:#C3C5C8;cursor:pointer">取消</span>
                <span @click="checkDelet" class="marginLeft queding">确认删除</span>
              </div>
          </div>
          
      </div>
      <!-- 套餐应用到 -->
      <div v-show="isPosition" class="positionFixed">
        <div class="clickDate contentTitle">
          <p>
            <span class="mainColor marginRight">
              <span v-if="applyCombo">亲子{{applyCombo.adult}}成人{{applyCombo.kids}}儿童￥{{applyCombo.price}}</span>
              <span v-if="applyZhCombo">综合{{applyZhCombo.adult}}套餐人数￥{{applyZhCombo.price}}</span>
            </span>
            套餐应用到</p>
            <div>
              <el-radio v-if="isRemake" v-model="dateChoose" label="1">当前选择日期</el-radio>
              <el-radio v-model="dateChoose" label="2">所有日期</el-radio>
              <el-radio v-model="dateChoose" label="3">自定义日期</el-radio>
            </div>
            <div v-show="dateChoose == '3'">
              <div class="littleDate">
                <div class="flexBetween year mainCenter">
                  <span @click="prevYear">&lt;</span>
                  <span>{{year}}</span>
                  <span @click="nextYear">&gt;</span>
                </div> 
                <div class="flexBetween month mainCenter">
                  <span @click="prevMonth">&lt;</span>
                  <span>{{month}}</span>
                  <span @click="nextMonth">&gt;</span>
                </div>
              </div>
              <table style=" border-collapse: collapse;text-align: center;font-weight:bold;" width="350px" height="50px;">
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
              <div class="litieList  flexWrap flexStart">
                <div v-for="(item,index) in littleDay" :key="index" @click="color[index].index == '2'||color[index].index  == '3' || color[index].index  == '1'? '': litileClick(item,index)"  class="litielPick" >
                  <div v-if="item.date != ' '&& color[index].index == '2'"  style="line-height: 25px;color:red;border:1px solid red"  >{{item.date}}<p>已过期</p></div>
                  <div v-if="item.date != ' '&& color[index].index == '3'"  style="background-color:#F0F0F0" >{{item.date}}</div>
                  <div v-if="item.date != ' '&& color[index].index == '1'"  style="background-color:#F0F0F0" >{{item.date}}</div>
                  <div v-if="item.date != ' '&& color[index].index == '0'"  :style="{backgroundColor:item.dateIndex === index? '#14C5CA': '#E5FAFB',color:item.dateIndex === index?'#fff':'#14C5CA',}" style="line-height: 25px;cursor: pointer;font-size:12px;" >{{item.date}}<p class="small">有活动</p></div>
                </div>
              </div>
            </div>
            <div class="mainCenter">
              <span style="color:#C3C5C8;cursor:pointer" @click="abolishDate()">取消</span>
              <span class="marginLeft queding" @click="sendChoose()" >确认</span>
            </div>
        </div>
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
          longTime:[],
          dateTime: '',
          allTimeL:[],
          activeNum:'',
          isShow:false,
          pickerOptions2: {
            disabledDate: (time) => {
              if(this.allDay.length ||  this.allTimeL.length){
                var a = ''
                for(let i = 0;i<this.allDay.length;i++){
                  if(a == true){
                    a == true
                    break
                  }else{
                    a = time.getTime() == this.parseDate(this.allDay[i].day)
                  }
                }
                for(let i = 0;i<this.allTimeL.length;i++){
                  if(a == true){
                    a == true
                    break
                  }else{
                    a = time.getTime() >= this.parseDate(this.allTimeL[i].begin_date) && time.getTime() <= this.parseDate(this.allTimeL[i].end_date)
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
          reMakeDate:'',
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
          remakeIndex:'',
          discountChose:[],
          bzPrice:'',
          etPrice:'',
          chaJia:false,
          minOld:'',
          maxOld:'',
          cjList:[
            {
              num:'',
              refund_rate:''
            },
          ],
          zkCombo:{
            oldPrice:'',
            discount:'',
            disprice: '',
            oldChildPrice:'',
            childDiscount:'',
            childDisprice: ''
          },
          pcCombo:[
            {
              adult:'',
              kids:'',
              price:'',
              type: 1  
            }
          ],
          zhCombo:[
            {
              name:'',
              adult:'',
              price:'',
              type: 2  
            }
          ],
          choseLook:'',
          checkList:[
            {name: '查看',witch:'1'},
            {name: '查看',witch:'2'},
            {name: '查看',witch:'3'},
          ],
          clickCheck:'',
          showList:[],
          changeArr:[],
          minJoinOld:'',
          priceReg: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
          reg: /^[1-9]\d*$/,
          isDate: false,
          timeNumber:[],
          isQzCombine:false,
          iszhCombo: false,
          isZhemo:false,
          isCreate:false,
          dateChoose:'',
          isPosition:false,
          littleDay:[],
          sendDate:[],
          applyCombo:'',
          applyZhCombo:'',
          slot_id:'',
          witchDay:'',
          isDelet:false,
          daletIndex:'',
          allSlotDay:[],
          AllDayList:[],
          daleteDayIndex:'',
          sendDeletDay:[],
          chooseBT:'',
          chooseET:'',
          applyIndex:'',
          isTimeNumber:[]
          }
        },
        watch:{
        activeNum:function(){
          if(this.activeNum){
            if(this.reg.test(this.activeNum)){
              let a = []
              for(let i = 0;i<parseInt(this.activeNum);i++){
                a.push({begin_time:'',end_time:''})
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
        dayCount(){
          if(this.isPosition){
            this.chnageLittle()
          }
        },
         discountChose(){
          var t = this.discountChose.length
          if(t == 1){
            this.showList = []
            this.choseLook = this.discountChose[0]
          }else if(t == 2){
            this.showList = [this.discountChose[0]]
            this.choseLook = this.discountChose[1]
          }else if(t == 3){
            this.showList = [this.discountChose[0],this.discountChose[1]]
            this.choseLook = this.discountChose[2]
          }else{
            this.choseLook = ''
          }
        },
      },
        computed:{
          isDelateDay(item,index){
            return function(item,index){
              var i = this.sendDeletDay.indexOf(item.date)
              if(i != -1){
                return true
              }else{
                return false
              }
            }
          },
          disprice(){
          if(this.zkCombo.oldPrice && this.zkCombo.discount){
            return this.zkCombo.oldPrice*this.zkCombo.discount*0.1
          }else{
            return this.oldPrice
          }
        },
        childDisprice(){
          if(this.zkCombo.oldChildPrice && this.zkCombo.childDiscount){
            return this.zkCombo.oldChildPrice * this.zkCombo.childDiscount *0.1
          }else{
            return this.oldChildPrice
          }
        },
        isChildren(){
          if(this.isTimeNumber.length){
            for(var i = 0; i< this.isTimeNumber.length;i++){
              if(this.isTimeNumber[i].price[1] || this.isTimeNumber[i].price.childDisprice){
                return true
              }
            }
            return false
          }else if(this.etPrice || this.zkCombo.oldChildPrice){
            return true
          }else{
            return false
          }
        },
        isPrice(){
          if(this.discountChose.indexOf('1') != -1){
            return false
          }else{
            return true
          }
        },
        },
      methods:{
        //第二版本
        deletTime(item,index){
          this.$confirm('是否确定删除该已选择时间','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.$message({type:'success',message:'删除成功!'})
            this.allTimeL.splice(index,1)
          })
          .catch(()=>{
            this.$message({type:'info',message:'已取消'})
          })
        },
        chooseTime(val){
          if(val != null){
            this.allTimeL.push({begin_date:val[0],end_date:val[1]})
            this.longTime = []
          }
        },
        DeletDayAbolish(){
          this.isDelet = false
          this.daletIndex = ''
          this.sendDeletDay = []
        },
        chooseDay(item,index){
          var i = this.sendDeletDay.indexOf(item.date)
          if(i == -1){
             this.sendDeletDay.push(item.date)
          }else{
            this.sendDeletDay.splice(i,1)
          }
        },
        checkDelet(){
          var arr = {}
          var date = []
          for(var i =0 ; i < this.sendDeletDay.length; i ++ ){
            var day = this.timestampToTime(this.sendDeletDay[i] * 1000)
            date.push(day)
          }
          arr = ({is_all:0,begin_time:this.chooseBT,end_time:this.chooseET,date:date})
          this.$confirm('此操作将删除该时间段所在的日期,是否继续?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.checkDeletDay(arr)
           
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        checkDeletDay(val){
          this.$http.post(this.api + '/ActivitySlotDelTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            is_all: val.is_all,
            begin_time: val.begin_time,
            end_time: val.end_time,
            date:JSON.stringify(val.date)
          })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({type:'success',message:'删除成功!'})
              this.getDaySlot(this.chooseBT,this.chooseET)
              this.getActives()
            }else if(res.data.code == 3){
              this.checkDeletDay(val)
            }else if(res.data.code == 0){
              this.$message({type: 'error',message: res.data.msg})
            }
          })
        },
        chooseDelate(item,index){
          if(this.daletIndex !== index){
            this.chooseBT = item.begin_time
            this.chooseET = item.end_time
            this.getDaySlot(item.begin_time,item.end_time)
          }
          this.daletIndex = index
           
        },
        getDaySlot(begin_time,end_time){
          this.$http.post(this.api + '/ActivitySlotDateTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            begin_time: begin_time,
            end_time: end_time
          })
          .then(res=>{
            if(res.data.code == 1){
              this.AllDayList = res.data.data
            }else if(res.data.code == 3){
              this.getDaySlot(begin_time,end_time)
            }else if(res.data.code == 0){
              this.$message({type:'error',message:res.data.msg})
            }
          })
        },
        // 获取所有时间段
        getAllSlot(){
          this.$http.post(this.api + '/ActivitySlotTimeTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id
          })
          .then(res=>{
            if(res.data.code == 1){
              this.isDelet = true
              this.allSlotDay = res.data.data
            }else if(res.data.code == 3){
              this.getAllSlot()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        changeDay(val){
           let d = val.toString()
            let m = this.month.toString()
            if(val < 10){
              d = '0' + d
            }
            if(m < 10){
              m = '0' + m
            }
            return  this.year + '-' + m + '-'+ d
        },
        //发送应用到选择
        sendChoose(){
           var date, 
               type,
               sendDate = [];
          if(this.applyCombo){
            date = this.applyCombo
            type = '1'
          }else{
            date = this.applyZhCombo 
            type = '2'
          }
          if(this.dateChoose == '3'){
            if(this.sendDate.length){
              for(var i = 0; i < this.sendDate.length ; i++ ){
                var day = this.changeDay(this.sendDate[i])
                sendDate.push(day)
              }
              date['date'] = sendDate
              date['is_apply'] = 1
              date['flag'] = this.dateChoose
              if(type == '1'){
                this.pcCombo[this.applyIndex] = date
              }else{
                this.zhCombo[this.applyIndex] = date
              }
            }else{
              this.$message({type:'warning',message:'请选择自定义日期!'})
            }
          }else if(this.dateChoose == '2'){
              date['is_apply'] = 1
              date['flag'] = this.dateChoose
              if(type == '1'){
                this.pcCombo[this.applyIndex] = date
              }else{
                this.zhCombo[this.applyIndex] = date
              }
          }else if(this.dateChoose == '1'){
              date['date'] = this.reMakeDate
              date['is_apply'] = 1
              date['flag'] = this.dateChoose
              if(type == '1'){
                this.pcCombo[this.applyIndex] = date
              }else{
                this.zhCombo[this.applyIndex] = date
              }
          }else{
            this.$message({type: 'warning',message: '请选择应用方式!'})
          }
          
        },
        chnageLittle(){
          var arr  = this.dayCount,
              b = [];
              for(var i = 0; i< arr.length ; i++ ){
                b.push({date:arr[i],dateIndex:''})
              }
              this.littleDay = b
        },
        litileClick(item,index){
         item.dateIndex = item.dateIndex === index? '':index 
         if(this.sendDate.indexOf(item.date) != -1){
           var i = this.sendDate.indexOf(item.date)
           this.sendDate.splice(i,1)
         }else{
           this.sendDate.push(item.date)
         }
        },
        abolishDate(){
          this.isPosition = false
          this.applyZhCombo = ''
          this.applyCombo = ''
          this.sendDate = []
          this.littleDay = []
          this.year = (new Date().getFullYear())
          this.month = (new Date().getMonth() + 1)
        },
        //应用日期
        aplyDate(item,index,val){
          if(val == '1'){
            if(!item.adult || !this.reg.test(item.adult)){
              this.$message({type: 'error',message:'请检查成人人数是否填写/是否为正整数!'})
            }else if(!item.kids || !this.reg.test(item.kids)){
              this.$message({type: 'error',message:'请检查儿童人数是否填写/是否为正整数!'})
            }else if(!item.price || !this.priceReg.test(item.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
              this.isPosition = !this.isPosition
              this.applyCombo = item
              this.applyIndex = index
              
              this.chnageLittle()
            }
          }else{
             if(!item.name || item.name.length > 10){
              this.$message({type: 'error',message:'请检查是否填写名称(名称小于等于10个字)'})
            }else if(!item.adult || !this.reg.test(item.adult)){
              this.$message({type: 'error',message:'请检查套餐人数是否填写/是否为正整数!'})
            }else if(!item.price || !this.priceReg.test(item.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
               this.isPosition = !this.isPosition
               this.applyZhCombo = item
               this.applyIndex = index
               this.chnageLittle()
            }
          }
        },
        getSlotDate(val){
          this.$http.post(this.api + '/ActivitySlotDetailTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            date: val
          })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              var active = []
                  for(let i =0;i<data.length;i++){
                    if(data[i].status == 0 && data[i].online != 1){
                  
                        var arr = data[i]
                        var price = {
                            oldPrice:arr.price_origin,
                            discount:arr.price_discount,
                            disprice:arr.price,
                            oldChildPrice:arr.kids_price_origin,
                            childDiscount:arr.kids_price_discount,
                            childDisprice:arr.kids_price
                        }
                        var priceArr = [
                         arr.price_origin, arr.kids_price_origin
                        ] 
                        var qzCombo = [],
                            zhCombo = [];
                        for(var j = 0; j< arr.combine.length;j++){
                          if(arr.combine[j].type == 1){
                            qzCombo.push(arr.combine[j])
                          }else{
                            zhCombo.push(arr.combine[j])
                          }
                        }
                        active.push(
                          {
                            slot_id: arr.slot_id,
                            begin_time: arr.begin_time,
                            end_time: arr.end_time,
                            max_person_num: arr.max_person_num,
                            price: arr.is_discount ==1? price: priceArr,
                            kind: arr.is_discount ==1? '1' : '2',
                            qzCombo:qzCombo,
                            zhCombo:zhCombo
                          }
                        )
                     }
                  }
                  this.timeNumber = active
                  this.isTimeNumber = active
            }else if(res.data.code == 3){
                  this.getSlotDate(val)
            }else if(res.data.cdoe == 0){
                  this.$message({type:'error',message:res.data.msg})
            }
          })
        },
        packDate(){
          this.isDate = !this.isDate
        },
        chooseShow(index){       
          if(this.showList.indexOf(index) != -1){
            return  this.swtichAll(index)
          }
        },
        //删除返差价
        delteCj(item,index){
          if(this.cjList.length >1){
            this.Messages('是否删除该返差价',3,index)
          }else{
             this.cjList=[{num:'',refund_rate:''}]
          }
        },
        //计算差价是否满足要求
        isCjNum(item,index){
          if(this.cjList.length > 1 &&  Number(item.num) <= Number(this.cjList[index -1].num)){
            this.$message({type: 'warning',message:'满减人数必须大于上一个满减人数'})
            item.cjNum = ''
          }
        },
        isCjScale(item,index){
          if(this.cjList.length > 1 &&  Number(item.refund_rate) <= Number(this.cjList[index -1].refund_rate)){
            this.$message({type: 'warning',message:'退还比例必须大于上一个退还比例'})
            item.cjScale = ''
          }
        },
        //判断年龄要求
        isminOld(){
          if(this.maxOld && Number(this.maxOld) < Number(this.minOld) ){
             this.$message({type: 'warning',message: '儿童最小年龄不得大于儿童最大年龄'})
              this.minOld  = ''
          }
          if(this.minJoinOld && Number(this.minOld) < Number(this.minJoinOld)){
            this.$message({type: 'warning',message: '儿童年龄不得小于参与者最小年龄'})
            this.minOld = this.minJoinOld
          }
        },
        isminJoinOld(){
           if(this.minOld && Number(this.minJoinOld) > Number(this.minOld)){
            this.$message({type: 'warning',message: '参与者年龄不得大于儿童最小年龄'})
            this.minJoinOld = this.minOld
          }
        },
        ismaxOld(){
          if(this.minOld && Number(this.maxOld) <= Number(this.minOld)){
            this.$message({type: 'warning',message: '儿童最大年龄不得小于儿童最小年龄'})
            this.maxOld = ''
          }
        },
        
        changeCheck(index){
          var arr = this.discountChose
          if(arr.length == 3 || arr.length == 2){
             var isTrue =  this.requestTrue(arr[arr.length-1]) // 有值为true 无值为false
             if(!isTrue){
               this.$message({
                 type: 'warning',
                 message:'没填数据就取消勾选了'
               })
               arr = arr.splice(arr.length-1,1)
             }
             this.showList = arr
             this.clickCheck = index
              this.choseLook = index
          }else {
          this.showList = arr
          this.clickCheck = index
          this.choseLook = index
          }
        },
        checkDiscount(val,index){
          this.clickCheck = ''
          var arr = val
          if(this.changeArr.length > arr.length){
              for(var i=0; i < this.changeArr.length ; i ++){
                if(arr.indexOf(this.changeArr[i]) == -1){
                    this.clearCombo(this.changeArr[i])
                }
              }
          }else if(arr.length > 1){
             var isTrue =  this.requestTrue(arr[arr.length-2]) // 有值为true 无值为false
             if(!isTrue){
               this.$message({
                 type: 'warning',
                 message:'没填数据就取消勾选了'
               })
               arr = arr.splice(arr.length-2,1)
             }
          }
          this.changeArr = arr
          if(val.indexOf('2') != -1 || val.indexOf('3') != -1){
            this.paduanCheck()
          }
        },
        clearCombo(i){
          if(i == '1'){
            this.zkCombo = {
              oldPrice:'',
              discount:'',
              disprice: '',
              oldChildPrice:'',
              childDiscount:'',
              childDisprice: ''
            }
          }else if(i == '2'){
            this.pcCombo = [
                {
                  adult:'',
                  kids:'',
                  price:'',
                  type: 1  
                }
              ]
          }else{
            this.zhCombo = [
                {
                  name:'',
                  adult:'',
                  price:'',
                  type: 2  
                }
              ]
          } 
      
        },
        requestTrue(index){
           return this.swtichAll(index)
        },
        swtichAll(index){
          switch(index){
              case '1':
                var ob = this.zkCombo
                if( ob.oldPrice && ob.discount && ob.oldChildPrice && ob.childDiscount){
                  return true
                }else{
                  return false
                }
                break;
              case '2':
              
                var item = this.pcCombo[0]
                if(item.adult && item.kids && item.price){
                  return true
                }
                break;
              case '3':
                var item = this.zhCombo[0]
                if(item.name && item.price && item.adult){
                  return true
                }
                break;
            }
        },
        addCombo(num){
          if(num == '2'){
            var arr = this.pcCombo[this.pcCombo.length -1]
            if(!arr.adult || !this.reg.test(arr.adult)){
              this.$message({type: 'error',message:'请检查成人人数是否填写/是否为正整数!'})
            }else if(!arr.kids || !this.reg.test(arr.kids)){
              this.$message({type: 'error',message:'请检查儿童人数是否填写/是否为正整数!'})
            }else if(!arr.price || !this.priceReg.test(arr.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
              this.pcCombo.push({adult:'',kids:'',price:'',type:1})
            }
          }else if(num == '3'){
            var arr = this.zhCombo[this.zhCombo.length -1]
            if(!arr.name || arr.name.length > 10){
              this.$message({type: 'error',message:'请检查是否填写名称(名称小于等于10个字)'})
            }else if(!arr.adult || !this.reg.test(arr.adult)){
              this.$message({type: 'error',message:'请检查套餐人数是否填写/是否为正整数!'})
            }else if(!arr.price || !this.priceReg.test(arr.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
              this.zhCombo.push({name:'',adult:'',price:'',type:2})
            }
          }else{
           
            var arr = this.cjList[this.cjList.length -1]
       
            if(!arr.num || !this.reg.test(arr.num)){
              this.$message({type: 'error',message:'请检查是否填写正确满减人数(整数)'})
            }else if(!arr.refund_rate || !this.priceReg.test(arr.refund_rate)){
               this.$message({type: 'error',message:'请检查满减比例填写是否正确(最多两位小数)'})
            }else{
              this.cjList.push({num:'',refund_rate:'',})
            }
          }
        },
        //消息提醒
        Messages(message,val,index){
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              this.$message({
              type: 'success',
              message: '删除成功!'
              });
              if(val == '1'){
                 this.pcCombo.splice(index,1)
              }else if(val == '2'){
                this.zhCombo.splice(index,1)
              }else{
                this.cjList.splice(index,1)
              }
            }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
            });        
          });
        },
        // 亲子删除套餐
        delteQzCombo(item,index){
          if(this.pcCombo.length >1){
            this.Messages('是否删除该亲子套餐',1,index)
          }else{
            this.pcCombo=[{adult:'',kids:'',price:'',type: 1}]
          }
            
        },
        // 删除综合套餐
        delteZhCombo(item,index){
          if(this.zhCombo.length >1){
            this.Messages('是否删除该综合套餐',2,index)
          }else{
             this.zhCombo=[{name:'',adult:'',price:'',type:2}]
          }
        },
        checkCombo(val){
          if(this.discountChose.indexOf('2') != -1 && this.discountChose.indexOf('3') == -1){
                for(var i = 0; i< this.pcCombo.length;i++){
                  var ob = this.pcCombo[i]
                  if(!ob.adult || !ob.kids || !ob.price){
                    this.$message({type: 'warning',message:'您的亲子套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }else if(this.discountChose.indexOf('3') != -1 && this.discountChose.indexOf('2') == -1){
                for(var i = 0; i< this.zhCombo.length;i++){
                  var ob = this.zhCombo[i]
                  if(!ob.name || !ob.adult || !ob.price){
                    this.$message({type: 'warning',message:'您的综合套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }else if(this.discountChose.indexOf('2') == -1 && this.discountChose.indexOf('3') == -1){
                this.addTimeList(val)
              }else{
                for(var i = 0; i< this.pcCombo.length;i++){
                  var ob = this.pcCombo[i]
                  if(!ob.adult || !ob.kids || !ob.price){
                    this.$message({type: 'warning',message:'您的亲子套餐未填完整'})
                    return false
                  }
                }
                 for(var i = 0; i< this.zhCombo.length;i++){
                  var ob = this.zhCombo[i]
                  if(!ob.name || !ob.adult || !ob.price){
                    this.$message({type: 'warning',message:'您的综合套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }
        },
        addTimeList(val){
          var combine = []
          for(var i = 0; i <this.pcCombo.length;i++){
            if(this.pcCombo[i].adult && this.pcCombo[i].kids && this.pcCombo[i].price){
                  combine.push(this.pcCombo[i])
              }
          }
          for(var j = 0; j < this.zhCombo.length; j++){
             if(this.zhCombo[j].name && this.zhCombo[j].adult && this.zhCombo[j].price){
                  combine.push(this.zhCombo[j])
              }
          }
          if(this.isRemake){
            this.$http.post(this.api + '/SlotEditAllTwo',{
              token: localStorage.getItem('token'),
              version: 2.0,
              activity_id: this.active_id,
              slot_id:  this.slot_id,
              begin_date: this.reMakeDate,
              end_date: this.reMakeDate,
              begin_time: this.activeList[0].begin_time,
              end_time: this.activeList[0].end_time,
              max_person_num: this.personNum,
              is_discount: val == 1? '1':'0',
              price_origin: val == 1? this.zkCombo.oldPrice:this.bzPrice,
              kids_price_origin: val == 1? this.zkCombo.oldChildPrice:this.etPrice,
              price_discount: val == 1? this.zkCombo.discount:'',
              price:val == 1? this.zkCombo.disprice: '',
              kids_price_discount: val == 1? this.zkCombo.childDiscount: '',
              kids_price: val == 1? this.zkCombo.childDisprice:'',
              combine: combine.length? JSON.stringify(combine):''
            })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({type: 'success',message:'修改成功!'})
                this.getSlotDate(this.reMakeDate)
                this.abiosh()
              }else if(res.data.code == 3){
                 this.addTimeList(val)
              }else if(res.data.cdoe == 0){
                 this.$message({type: 'error',message: res.data.msg})
              }
            })
          }else{
            this.$http.post(this.api + '/SlotAddAllTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            date: JSON.stringify(this.allTimeL),
            time:JSON.stringify(this.activeList),
            max_person_num: this.personNum,
            is_discount: val == 1? '1':'0',
            price_origin: val == 1? this.zkCombo.oldPrice:this.bzPrice,
            kids_price_origin: val == 1? this.zkCombo.oldChildPrice:this.etPrice,
            price_discount: val == 1? this.zkCombo.discount:'',
            price:val == 1? this.zkCombo.disprice: '',
            kids_price_discount: val == 1? this.zkCombo.childDiscount: '',
            kids_price: val == 1? this.zkCombo.childDisprice:'',
            combine: combine.length? JSON.stringify(combine):''
          })
          .then(res=>{
            if(res.data.code == 1){
               this.$message({type: 'success',message:'保存成功!'})
                // let a = []
                // a = this.get(this.longTime[0],this.longTime[1])
                // for(let i =0;i<a.length;i++){
                //   let c = []
                //   for(let j =0;j<this.activeList.length;j++){
                //     c.push({time:[this.activeList[j].startTime,this.activeList[j].endTime]})
                //   }
                //   a[i].list = c
                // }
                // if(this.allDay.length){
                //   for(let i =0;i<a.length;i++){
                //     for(let j = 0 ; j < this.allDay.length;j++){
                //       if( this.parseDate(a[i].day) == this.parseDate(this.allDay[j].day)){
                //         this.allDay.splice(j,1)
                //       }
                //     }
                //   }
                //   for(let i =0;i<a.length;i++){
                //     this.allDay.push(a[i])
                //   }
                // }else{
                //   this.allDay=(a)
                // }
                // this.getweekDay()
                this.getActives()
    
            }else if(res.data.code == 3){
              this.addTimeList(val)
            }else if(res.data.code == 0){
              this.$message({type: 'error',message: res.data.msg})
            }
          })
          }
          
        },
        abiosh(){
          this.isRemake = false
          this.allTimeL = []
          this.isCreate = false
          this.isZhemo = false
          this.longTime = []
          this.activeList = []
          this.activeNum = ''
          this.personNum = ''
          this.bzPrice = ''
          this.etPrice = ''
          this.zkCombo = {
            oldPrice:'',
            discount:'',
            disprice: '',
            oldChildPrice:'',
            childDiscount:'',
            childDisprice: ''
          }
          this.discountChose = []
          this.pcCombo = [
              {
                adult:'',
                kids:'',
                price:'',
                type: 1  
              }
            ]
          this.zhCombo = [
              {
                name:'',
                adult:'',
                price:'',
                type: 2  
              }
            ]
        },










        changeRouter(item,index){
          if(this.complete == '1'){
            if(this.allDay.length){
              this.$http.post(this.api + '/ActivitSaveTwo',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                version: 2.0,
                long_day: 1,
                kids_stand_low: this.minOld,
                kids_stand_high: this.maxOld,
                age_limit: this.minJoinOld,
                differ: JSON.stringify(this.cjList),
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
              this.$http.post(this.api + '/ActivitSaveTwo',{
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
                this.$http.post(this.api + '/ActivitSaveTwo',{
                  token: localStorage.getItem('token'),
                  activity_id: this.active_id,
                  version: 2.0,
                  long_day: 1,
                  kids_stand_low: this.minOld,
                  kids_stand_high: this.maxOld,
                  age_limit: this.minJoinOld,
                  differ: JSON.stringify(this.cjList),
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
                this.$http.post(this.api + '/ActivitSaveTwo',{
                  token: localStorage.getItem('token'),
                  version: 2.0,
                  long_day: 1,
                  kids_stand_low: this.minOld,
                  kids_stand_high: this.maxOld,
                  age_limit: this.minJoinOld,
                  differ: JSON.stringify(this.cjList),
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
            this.timeNumber = []
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
            this.longTime = [day,day]
            this.getSlotDate(day)
          }
        },
        saveActive(){
          if(!this.isPrice){
            if(this.isRemake){
               if(!this.reMakeDate){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if(!this.personNum || !this.reg.test(this.personNum)){
                  this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                }else if( !this.zkCombo.oldPrice || !this.zkCombo.discount){
                  this.$message({type: 'error',message: '请填写完整折扣价'})
                }else{
                  this.checkCombo(1) 
                }
              }else{
                  if(!this.allTimeL.length ){
                    this.$message({type: 'error',message: '请填写活动时间段'})
                  }else if(!this.activeNum && !this.isRemake||!this.reg.test(this.activeNum) && !this.isRemake){
                    this.$message({ type: 'error', message: '请填写正确活动数量（正整数）'})
                  }else if(!this.personNum || !this.reg.test(this.personNum)){
                    this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                  }else if( !this.zkCombo.oldPrice || !this.zkCombo.discount){
                    this.$message({type: 'error',message: '请填写完整折扣价'})
                  }else{
                    this.checkCombo(1) 
                  }
                }
            }else{
              if(this.isRemake){
                 if(!this.reMakeDate){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if(!this.personNum || !this.reg.test(this.personNum)){
                  this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                }else if(!this.bzPrice){
                  this.$message({type: 'error',message: '请填写标准价格'})
                }else{
                  this.checkCombo(2)
                }
              }else{
                if(!this.allTimeL.length){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if(!this.activeNum && !this.isRemake||!this.reg.test(this.activeNum) && !this.isRemake){
                  this.$message({ type: 'error', message: '请填写正确活动数量（正整数）'})
                }else if(!this.personNum || !this.reg.test(this.personNum)){
                  this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                }else if(!this.bzPrice){
                  this.$message({type: 'error',message: '请填写标准价格'})
                }else{
                  this.checkCombo(2)
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
          this.$http.post(this.api + '/ActivitySlotDelTwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id ,
            version: 2.0,
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
          this.abiosh()
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
        //修改活动
        remake(item,index){
          this.isRemake = true
          this.reMakeDate = this.longTime[0]
          this.witchDay = this.longTime[0] +' '+ item.begin_time + '-'+ item.end_time
          this.remakeIndex = index
          this.slot_id = item.slot_id        
          // this.longTime.push(item.begin_date,item.end_date)
          this.activeList = [{begin_time: item.begin_time,end_time:item.end_time}]
          this.personNum = item.max_person_num
          this.price = item.price
          if(item.kind == 1){
            this.zkCombo = item.price
            this.discountChose.push('1')
          }else{
            this.bzPrice = item.price[0]
            this.etPrice = item.price[1]
          }
          if(item.qzCombo.length){
             this.pcCombo = item.qzCombo
             this.discountChose.push('2')
          }
          if(item.zhCombo.length){
             this.zhCombo = item.zhCombo
            this.discountChose.push('3')
          }
        },
        abolishRemake(){
          this.isRemake = false
          this.Alllist[this.remakeIndex] = (this.remakeList)
          this.startTime = ''
          this.endTime = ''
          this.Newprice = ''
          this.newPerson = ''
        },
        getInformation(){
            this.$http.post(this.api + '/ActivityAllSlotDetailTwo',{
              
            })
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
        },
        
        //获取已创建套餐
        isCombine(val,combine){
          if(!combine){
              this.$http.post(this.api + '/CombineUsedTwo',{
              token: localStorage.getItem('token'),
              version: 2.0,
              activity_id: this.active_id,
              type: val
            })
            .then(res=>{
              if(res.data.code == 1){
                var data = res.data.data
                if(data.length){
                  if(val == '1'){
                    this.isCreate = true
                  }else{
                    this.isZhemo = true
                  }
                }
               
              }else if(res.data.code == 3){
                this.getCombine(val)
              }else if(res.data.cdoe == 0){
                this.$message({type: 'error',message: res.data.msg})
              }
            })
          }
        
        },
        getCombine(val,combine){
          if(!combine){
              this.$http.post(this.api + '/CombineUsedTwo',{
              token: localStorage.getItem('token'),
              version: 2.0,
              activity_id: this.active_id,
              type: val
            })
            .then(res=>{
              if(res.data.code == 1){
                var data = res.data.data
                  var arr = []
                  if(data.length){
                    if(val == '1'){
                      data.forEach((item) => {
                      arr.push(item)
                      })
                      this.pcCombo = arr
                      this.isQzCombine = true
                    }else{
                      data.forEach((item) => {
                      arr.push(item)
                      })
                      this.zhCombo = arr
                      this.iszhCombo = true
                    }
                  }
              }else if(res.data.code == 3){
                this.getCombine(val)
              }else if(res.data.cdoe == 0){
                this.$message({type: 'error',message: res.data.msg})
              }
            })
          }
        },
        paduanCheck(){
          if(!this.isCreate){
            this.isCombine('1',this.isQzCombine)
          }
          if(!this.isZhemo){
            this.isCombine('2',this.isZhCombine)
          }
        },
        getActive(){
          this.$http.post(this.api + '/ActivityAllSlotDetailTwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0,
            version: 2.0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                  for(let i =0;i<data.length;i++){
                    if(data[i].status == 0 && data[i].online != 1){
                        var arr = data[i]
                        var price = {
                            oldPrice:arr.price_origin,
                            discount:arr.price_discount,
                            disprice:arr.price,
                            oldChildPrice:arr.kids_price_origin,
                            childDiscount:arr.kids_price_discount,
                            childDisprice:arr.kids_price
                        }
                        var priceArr = [
                         arr.price_origin, arr.kids_price_origin
                        ]
                        var qzCombo = [],
                            zhCombo = [];
                        for(var j = 0; j< arr.combine.length;j++){
                          if(arr.combine[j].type == 1){
                            qzCombo.push(arr.combine[j])
                          }else{
                            zhCombo.push(arr.combine[j])
                          }
                        }
                        this.isTimeNumber.push(
                          {
                            slot_id: arr.slot_id,
                            begin_date: arr.begin_date,
                            end_date: arr.end_date,
                            begin_time: arr.begin_time,
                            end_time: arr.end_time,
                            max_person_num: arr.max_person_num,
                            price: arr.is_discount ==1? price: priceArr,
                            kind: arr.is_discount ==1? '1' : '2',
                            qzCombo:qzCombo,
                            zhCombo:zhCombo
                          }
                        )
                     }
                  }
              }else if(res.data.code == 3){
                    this.getActive()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        },
        getPriceAcity(){
          this.$http.post(this.api + '/ActivityETwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
          .then(res=>{
            if(res.data.code == 1){
              var data = res.data.data
               this.minOld =  data.kids_stand_low
                this.maxOld = data.kids_stand_high
                this.minJoinOld = data.age_limit
                if(data.differ.length){
                   this.cjList = data.differ
                   this.chaJia = true
                }
            }else if(res.data.cdoe == 3){
              this.getPriceAcity()
            }else if(res.data.code == 0){
              this.$message({type: 'warning',message: res.data.msg})
            }
          })
        },
      },
      
      mounted(){
          this.getActive()
         this.getActives()
         this.getPriceAcity()
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
    width:58px;
    height:58px;
    line-height:58px;
    text-align:center;
    margin: 0 2px 2px 0;

    font-size:12px;
  }
    .block{
    margin: 20px 0;
  }
  .sizeCheck{
    width: 108px;
    text-align: center;
    color: #000;
    cursor: pointer;
    position: absolute;
  }
  .check2{
    margin-left: 138px
  }
  .check3{
    margin-left: 276px
  }
  .el-checkbox{
    color: #000 !important;
  }
  .timeList{
    width: 410px;
    margin: 20px 0;
    font-size: 15px;
    background-color:#F5F7FA;
    padding: 10px;
    font-weight: bold;
  }
  .clickDate{
    width: 350px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 11px 0px rgba(232,235,238,1);
    border-radius:4px;
    padding: 15px;
}
.daletDate{
  width: 370px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 11px 0px rgba(232,235,238,1);
  border-radius:4px;
}
.littleDate{
  width: 350px;
  background-color: #14c5ca;
  border-radius: 5px;
  color:#fff;
  font-size: 18px;
}
.year{
  padding: 10px 10px;
}
.month{
  padding: 10px 20px;
}
.litieList{
  width: 350px;
}
.litielPick{
  width: 48px;
  height: 48px;
  border: 1px solid #fff;
  line-height: 50px;
  text-align: center;

}
.queding{
  background:rgba(20,197,202,1);
  border-radius:2px;
  padding: 5px 10px;
  color:#fff; 
  cursor: pointer;
}
.backDate{
  background-color:#F3F5F7 ;
  border-top: 1px solid #F3F5F7;
}
.delteList{
  padding: 10px;
  height:30px;
  line-height: 30px;
  border:1px solid rgba(223,225,228,1);
  border-radius:5px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  font-size:12px;
}
.deleteDay{
  width: 255px;

}
.backDate .a{
  padding: 10px;
  cursor: pointer;
}
</style>
