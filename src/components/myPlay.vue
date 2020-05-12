<template>
    <div>
      <Head type="myPlay" v-on:reload="reload"></Head>
      <div style="width:1080px;margin:106px auto 0;text-align: left">
        <div style="border-bottom: 1px solid #eee;padding:10px 0;display: flex;justify-content: space-between">
          <span v-for="(item,index) in clickArr">
            <span @click="changeClick(item.index)" style="padding:10px 20px;cursor: pointer;font-weight: bold" :style="{borderBottom:clickIndex == item.index? '2px solid #14C5CA':'',color:clickIndex == item.index? '#14C5CA':'#000'}">{{item.name}}</span>
            <span style="color:#14C5CA" v-if="index == 1">({{order_num}})</span>
            <span style="color:#14C5CA" v-if="index == 2">({{enroll_num}})</span>
            <span style="color:#14C5CA" v-if="index == 3">({{refund_num}})</span>
            <span style="color:#14C5CA" v-if="index == 4">({{complete_num}})</span></span>
        </div>
        <div style="margin-top:30px;" v-show="clickIndex == 1">
          <h2>活动日历</h2>
          <p style="font-size:12px;margin-top:5px;">可查看您单日或多天的活动时间列表</p>
          <div style="width:1080px;margin:20px auto;text-align: left;display: flex;justify-content: space-between;">
            <div style="width:490px;">
              <div style="width:490px;background-color: #14C5CA;border-radius: 5px;padding: 20px 0;margin-top:15px;color:#fff;">
                <div style="display: flex;justify-content: space-between;margin: 20px 0;">
                  <div style="cursor: pointer" @click="reduce(1)">&lt;</div>
                  <div>{{year}}</div>
                  <div style="cursor: pointer" @click="add(1)">&gt;</div>
                </div>
                <div style="display: flex;justify-content: space-between;padding: 30px 15px 0 ;">
                  <div @click="reduce(2)" style="cursor: pointer">&lt;</div>
                  <div>{{month}}</div>
                  <div @click="add(2)" style="cursor: pointer">&gt;</div>
                </div>
              </div>
              <div style="width:490px;display:flex;justify-content: space-between;padding:20px 0;text-align: center">
                <p class="DateWeek">一</p>
                <p class="DateWeek">二</p>
                <p class="DateWeek">三</p>
                <p class="DateWeek">四</p>
                <p class="DateWeek">五</p>
                <p class="DateWeek">六</p>
                <p class="DateWeek">日</p>
              </div>
              <div style="width:490px;margin-top:15px;display: flex;flex-wrap: wrap;">
                <div  @mousedown="item != ' '&& color[index].index != 2?chooseMore(item,index):''" @mouseover="item != ' '&&color[index].index != 2?leaveMore(item,index):''" @mouseup="item != ' '&&color[index].index != 2?dlete(item,index):''" class="dateList" v-for="(item,index) in dayCount"  :style="{backgroundColor:color[index].index == 1&&color[index].today != 1?'#E1F5F6':color[index].index == 2&&color[index].today != 1?'#F0F0F0':color[index].index == 3&&color[index].today != 1? '#14C5CA':color[index].today == 1?'#EE395B':'',color:color[index].index==3||color[index].today == 1?'#fff':'#000',lineHeight: color[index].today == 1||color[index].online ==1? '35px':'' }">
                  <p>{{item}}</p>
                  <p v-if="color[index].today == 1&&color[index].online !=1">进行中</p>
                  <p v-if="color[index].online ==1">有取消</p>
                  <div v-if="color[index].flag == 1" style="color:red;position: absolute;top:10px;left:10px;background-color: #EE395B;width:10px;height:10px;border-radius: 50%;">
                  </div>
                </div>
              </div>
            </div>
            <div style="width:565px;margin-left:25px;padding:10px 0;position: relative">
              <h2>我的策划</h2>
              <div v-show="dateActive.length" v-for="(item,index) in dateActive" style="" >
                <div v-if="chooseTime.length" :style="{color:item.online == 0?'#000':'#999999'}">
                      <div v-if="JSON.stringify(item.differ)!=''&& !item.day" class="flexStart fontweight" style="margin: 11px 0;padding: 5px;background:rgba(243,245,248,1);color:#476785;font-size:12px">
                          <div style="width:60px;">
                            [返差价]
                          </div>
                          <div style="width:483px;">
                            当前同时间段内用户参与者共{{item.sale_num}}人,活动结束时
                            <span >
                              满{{item.differ.num}}人,返预付{{Number(item.differ.refund_rate)}}%;
                            </span>
                          </div>
                      </div>
                      <div style="border: 1px solid #CCCCCC;font-size:12px;margin-top:15px;padding: 11px 10px;">
                         <p ><b>{{item.day?item.day:''}}&nbsp;&nbsp;&nbsp;{{item.time}}</b></p>
                          <div v-if="JSON.stringify(item.differ)!=''&& item.day" class="flexStart fontweight" style="margin: 11px 0;padding: 5px;background:rgba(243,245,248,1);color:#476785;font-size:12px">
                              <div style="width:60px;">
                                [返差价]
                              </div>
                              <div style="width:483px;">
                                当前同时间段内用户参与者共{{item.sale_num}}人,活动结束时
                                <span >
                                  满{{item.differ.num}}人,返预付{{Number(item.differ.refund_rate)}}%;
                                </span>
                              </div>
                          </div>
                          <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #E8E8E8;padding: 10px 0;">
                            <div @click="toPublish(item,index)" style="position: relative;width:200px;height:120px;">
                              <loadingImg type="3"  :src="item.cover.domain+ item.cover.image_url" style="width:200px;height:120px;"></loadingImg>
                              <span v-if="item.online == 0" style="padding:5px 10px;color:#fff;position: absolute;font-size:12px;top:0" :style="{backgroundColor:item.is_doing ==0? '#008489':'#FA9F00'}">
                                {{item.is_doing == 0? '已发布':'进行中'}}
                              </span>
                              <span v-if="item.online == 1" style="z-index:999;padding:5px 10px;color:#fff;position: absolute;font-size:12px;top:0;left:0;right:0;bottom:0;background-color: rgba(102,102,102,.5);display: flex;justify-content: center;align-items: center">
                              已取消
                            </span>
                          </div>
                          <div style="margin-left:15px;line-height:30px;width:300px;">
                            <p><span v-for="items in item.kind">{{'/'+items.kind_name}}</span></p>
                            <p><b>{{item.title}}</b></p>
                            <div style="display: flex;justify-content: space-between;margin-top:20px;">
                              <div>
                                <span>￥{{item.price}}每人</span><span style="margin-left:10px;" :style="{color:item.online == 0?'#008489':'#999999'}">{{item.sale_num}}人预定</span>
                              </div>
                              <div @click="item.online == 1?'':lookOrder(item,index)" :style="{cursor:item.online == 1?'':'pointer',color:item.online == 0?'#008489':'#999999',borderColor:item.online==0?'#008489':'#999999'}" style="border:2px solid;padding: 0 10px;border-radius: 3px;font-weight: bold">
                                查看预定
                              </div>
                            </div>
                          </div>
                      </div>
                      <div style="display: flex;justify-content: space-between;margin-top:15px;">
                      <div style="display: flex;justify-content: flex-start;cursor: pointer">
                        <span @click="deleteActive(item,index)" style="color:#000;" >删除</span>
                        <span  style="margin: 0 10px;color:#000;" @click="item.online == 1?restore(item,index):abolish(item,index)">{{item.online == 1?'恢复':'取消'}}</span>
                        <span>修改</span>
                      </div>
                      <div style="display: flex;justify-content: space-between;width:300px;">
                        <span  :style="{cursor:item.online == 1?'':'pointer',}" @click="item.online == 1?'':backMoney(item,index)"><b>退款申请({{item.refund_num}})</b></span>
                        <span @click="toApplication(item,index)"  :style="{color:item.online == 0?'#008489':'#999999',cursor:item.online == 1?'':'pointer',}"><b>志愿者申请({{item.enroll_count}})</b></span>
                        <span :style="{color:item.online == 0?'#008489':'#999999',cursor:item.online == 1?'':'pointer',}" @click="item.online == 1?'':toInvite(item,index)"><b>邀请志愿者</b></span>
                      </div>
                    </div>
                    </div>
                    
                  </div>
                  <div v-if="!chooseTime.length" style="border: 1px solid #CCCCCC;font-size:12px;margin-top:15px;padding: 11px 10px;" >
                    <p ><b>发布时间：{{item.create_time}}</b></p>
                     <div class="flexStart fontweight" style="margin: 11px 0;padding: 5px;background:rgba(243,245,248,1);color:#476785;font-size:12px">
                      <div style="width:60px;">
                        [返差价]
                      </div>
                      <div style="width:483px;">
                        活动结束时同时间段内用户参与者
                        <span v-for="(v,i) in item.differ">
                          满{{v.num}}人,返预付{{Number(v.refund_rate)}}%;
                        </span>
                      </div>
                    </div>
                    <div style="display: flex;justify-content: flex-start;border-bottom: 1px solid #E8E8E8;padding: 10px 0;">
                      <div @click="toPublish(item,index)" style="position: relative;width:200px;height:120px;">
                        <loadingImg type="3"  :src="item.cover.domain+ item.cover.image_url" style="width:200px;height:120px;"></loadingImg>
                        <span  style="padding:5px 10px;color:#fff;position: absolute;font-size:12px;top:0" :style="{backgroundColor:item.is_doing ==0? '#008489':'#FA9F00'}">
                  {{item.is_doing == 0? '已发布':'进行中'}}
                  </span>
                    </div>
                    <div style="margin-left:15px;line-height:30px;width:300px;">
                      <p><span v-for="items in item.kind">{{'/'+items.kind_name}}</span></p>
                      <p><b>{{item.title}}</b></p>
                      <div style="display: flex;justify-content: space-between;margin-top:20px;">
                        <div>
                          <span v-if="item.price">￥{{item.price}}每人</span><span style="margin-left:10px;color:#008489">{{item.sale_num}}人预定</span>
                        </div>
                        <div @click="lookOrder(item,index)"  style="color:#008489;cursor:pointer;border:2px solid #008489;padding: 0 10px;border-radius: 3px;font-weight: bold">
                          查看预定
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="display: flex;justify-content: space-between;margin-top:15px;">
                    <div style="display: flex;justify-content: flex-start;cursor: pointer">
                      <span style="color:#000;" @click="deleteActive(item,index)">删除</span>
                      <span  style="margin: 0 10px;color:#000;" @click="abolish(item,index)">取消</span>
                      <span @click="toRemake(item,index)">修改</span>
                    </div>
                    <div style="display: flex;justify-content: space-between;width:300px;">
                      <span  style="cursor: pointer" @click="backMoney(item,index)"><b>退款申请({{item.refund_num}})</b></span>
                      <span  style="color:#008489;cursor: pointer"  @click="toApplication(item,index)"><b>志愿者申请({{item.enroll_count}})</b></span>
                      <span style="color:#008489;cursor: pointer" @click="toInvite(item,index)"><b>邀请志愿者</b></span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="!dateActive.length">
                <none type="myPlay"></none>
              </div>
              <div v-if="isDate || isADate" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.9);display: flex;justify-content: center;align-items: center">
                <Loading></Loading>
              </div>
            </div>
          </div>
          <div v-show="isInvite" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.3);z-index:999;overflow: hidden">
            <div style="text-align:left;position:fixed;top:50%;left:50%;width:400px;height:350px;padding:20px;background-color:#fff;border-radius:10px;margin-top:-220px;margin-left:-220px;font-size:15px;">
              <div style="display: flex;justify-content: space-between">
                <el-checkbox v-model="checked">全选</el-checkbox>
                <i @click="isInvite = false" style="font-size:25px;cursor: pointer" class="el-icon-circle-close-outline"></i>
              </div>
              <div>
                <p>选择您想要{{remakeTime == 1? '删除':'取消'}}的日期</p>
                <div style="margin:20px 0;">
                  <el-select v-model="date" style="width:100%" multiple collapse-tags placeholder="请选择" @change="changeTime">
                    <el-option
                      v-for="item in datePicker"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div v-if="timePicker.length">
                <p>请选择{{remakeTime == 1? '删除':'取消'}}的时间段</p>
                <div style="margin-top:20px">
                  <el-select v-model="dateTime" style="width:100%" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="item in timePicker"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <el-button type="primary" @click="abolishInvite" :disabled="date.length||dateTime.length?false:true" style="position:absolute;width:400px;bottom: 20px;left:20px;">确定</el-button>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:30px;" v-show="clickIndex == 2">
          <div style="display:flex;justify-content: space-between">
            <div style="font-size: 13px;display: flex;justify-content: flex-start">
              <span @click="changeClickList(items,indexs)" v-for="(items,indexs) in serchList" class="aras" :style="{backgroundColor: ListIndex == indexs? '#008489':'#F1F1F1',color:ListIndex == indexs?'#fff':'#000'}">{{items.name}}</span>
            </div>
            <div  style="font-size: 13px;position: relative">
              <span @click="orderClick" style="cursor: pointer">排序<i :class=" Isorder ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
              <div v-if="Isorder" style="position: absolute;background-color: #F3F3F3;padding:10px 20px;width:100px;left:-100px;">
                <p v-for="(items,indexs) in orderList" @click="changeOrder(items,indexs)" style="padding:10px 0;font-size: 12px;font-weight: bold;cursor: pointer" :style="{color:orderIndex == indexs?'#008489':'#000'}">{{items.name}}</p>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;">
            <div class="miniwidth">预定用户</div><div class="miniwidth">预定体验</div><div class="miniwidth">参与人数</div><div class="miniwidth">预定活动时间</div><div class="miniwidth">预定住宿</div><div class="miniwidth">联系电话</div><div class="miniwidth">未/已支付</div><div class="miniwidth">下单时间</div><div class="miniwidth">操作</div>
          </div>
          <div v-for="(item,index) in orderActive" :key="index" style="border-bottom: 1px solid #E6E6E6">
            <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
              <div style="display: flex;justify-content:flex-start;width:120px;padding:19px 0;">
                <img :src="item.user.head_image?item.user.headimage.domain + item.user.headimage.image_url:'../../../static/img/static/user.png'" width="32px" height="32px" style="border-radius: 50%;margin-left:40px;">
                <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.user.family_name+item.user.middle_name+ item.user.name)?(item.user.name):'匿名用户'}}</div>
              </div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="120"
                :content="item.title"
              >
                <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.title}}</el-button>
              </el-popover></div>
              <div class="width">{{item.num}}</div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="120"
                @show="takeUp(item,index)"
                :content="timeContent"
              >
                <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.activ_begin_time}}-{{item.activ_end_time}}</el-button>
              </el-popover></div>
              <div style="width:120px;height: 70px;">
                <el-button  style="border:none;padding:0;margin-top:30px;" :style="{color:item.house.length?'#008489':'#000'}" slot="reference"  plain>{{item.house.length?'已预定':'无'}}</el-button>
                <p @click="lookXq(item,index)" style="margin-top:5px;font-weight:bold;cursor:pointer;" v-if="item.house.length">查看详情&gt;</p>
              </div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="200"
                :content="item.introduce"
              >
                <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.user.mobile}}</el-button>
              </el-popover></div>
              <div class="width" style="color:#008489">
                <span >{{item.ispay == 1? '￥'+item.total_price:'￥'+item.total_price+'(未)' }}</span>
              </div>
              <div class="width" style="color:#008489">
                {{item.create_time}}
              </div>
              <div class="width" v-if="item.status == 0 && item.ispay == 1" >
                <span  style="cursor: pointer"  @click="changeErollA(item,1)" >私信</span>
                <span  @click="toRefundDes(item,1)" style="margin: 0 5px;cursor: pointer">查看详情</span>
                <span  style="cursor: pointer"  @click="changeErollA(item,2)" plain>退款</span>
              </div>
              <div class="width" v-if="item.status == 0 && item.ispay == 0">
                <span style="cursor: pointer"    @click="changeErollA(item,1)" >私信</span>
                <span style="cursor: pointer"   @click="changeErollA(item,3)" plain>查看详情</span>
              </div>
              <div class="width" v-if="item.status">
                <el-button type="primary" size="mini" :style="{backgroundColor:item.status == 2? '#fff':'#008489',color:item.status == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'申请中':'已退款'}}</el-button>
                <span  @click="toRefundDes(item,1)" style="margin-left:10px;cursor: pointer">查看详情</span>
              </div>
            </div>
          </div>
          <div v-show="!orderActive.length">
            <none type='lookOrder'></none>
          </div>
          <div v-if="paginationShow" style="margin:20px 0;">
            <el-pagination  @current-change="handleOrderChange" :current-page="index" :page-size="10" layout="total, prev, pager, next" :total="ordertotal"></el-pagination>
          </div>
        </div>
        <div style="margin-top: 30px;" v-show="clickIndex == 3">
          <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;">
            <div class="minivolunwidth">头像/昵称</div><div class="minivolunwidth">性别</div><div class="minivolunwidth">语言/技能</div><div class="minivolunwidth">申请时间</div><div class="minivolunwidth">备注</div><div class="minivolunwidth">志愿人评分</div><div class="minivolunwidth">操作</div>
          </div>
          <div v-for="(item,index) in volunList" :key="index" style="border-bottom: 1px solid #E6E6E6">
            <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
              <div style="display: flex;justify-content:flex-start;width:150px;padding:19px 0;">
                <img :src="item.user.head_image?item.user.headimage.domain + item.user.headimage.image_url:'../../../static/img/static/user.png'" width="32px" height="32px" style="border-radius: 50%;margin-left:40px;">
                <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.user.family_name+item.user.middle_name+ item.user.name)?(item.user.name):'匿名用户'}}</div>
              </div>
              <div class="volunwidth">{{sexArr[item.user.six].label}}</div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="200"
                @show="takevolunUp(item,index)"
                :content="voluncontent"
              >
                <el-button class="volunwidth" style="border:none;padding:0;" slot="reference"  plain>{{languageList[item.main_language].label}},<span v-for="(items,indexs) in item.language">{{languageList[items].label}},</span>/{{item.skill}}</el-button>
              </el-popover></div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="200"
                :content="item.slot_id[0].begin_time+'—'+item.slot_id[0].end_time"
              >
                <el-button class="volunwidth" style="border:none;padding:0;" slot="reference"  plain>{{item.slot_id[0].begin_time}}-{{item.slot_id[0].end_time}}</el-button>
              </el-popover></div>
              <div><el-popover
                placement="top-start"
                trigger="click"
                width="200"
                :content="item.introduce"
              >
                <el-button class="volunwidth" style="border:none;padding:0;" slot="reference"  plain>{{item.introduce}}</el-button>
              </el-popover></div>
              <div  style="width:150px;padding:19px 0">
                <el-rate
                  v-bind="parseInt(item.score)"
                  disabled
                  show-score
                  :colors="['#008489','#008489','#008489']"
                  text-color="#008489"
                  score-template="{value}">
                </el-rate></div>
              <div class="volunwidth" v-if="item.audit == 0">
                <el-button type="primary"  size="mini" @click="changeVolunErollA(item,1)" >同意</el-button>
                <el-button type="primary" size="mini" @click="changeVolunErollA(item,2)" plain>谢绝</el-button>
              </div>
              <div class="volunwidth" v-if="item.audit">
                <el-button type="primary" size="mini" :style="{backgroundColor:item.audit == 2? '#fff':'#008489',color:item.audit == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'已同意':'已谢绝'}}</el-button>
              </div>
            </div>
          </div>
          <div v-show="!volunList.length">
            <none type='application'></none>
          </div>
          <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
            <Loading></Loading>
          </div>
          <div style="margin:20px 0;">
            <el-pagination  @current-change="handlevolunChange" :current-page="index" :page-size="10" layout="total, prev, pager, next" :total="voluntotal"></el-pagination>
          </div>
        </div>
      <div style="margin-top: 30px;" v-show="clickIndex == 4">
        <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;padding:10px 0;">
          <div class="refundWidth">退款用户</div><div class="refundWidth">预定时间</div><div class="refundWidth">退款方式</div><div class="refundWidth">退款人数</div><div class="refundWidth">退款住宿</div><div class="refundWidth">退款金额</div><div class="refundWidth">操作</div>
        </div>
        <div v-for="(item,index) in refundList" :key="index" style="border-bottom: 1px solid #E6E6E6">
          <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
            <div style="display: flex;justify-content:flex-start;width:150px;padding:19px 0;">
              <img :src="item.domain?item.domain + item.image_url:'../../../static/img/static/user.png'" width="32px" height="32px" style="border-radius: 50%;margin-left:40px;">
              <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.family_name+item.middle_name+ item.name)?(item.family_name+item.middle_name+ item.name):'匿名用户'}}</div>
            </div>
            <div><el-popover
              placement="top-start"
              trigger="click"
              width="200"
              @show="takeUp(item,index)"
              :content="content"
            >
              <el-button class="refundMiniwidth" style="border:none;padding:0;" slot="reference"  plain>{{item.activ_begin_time}}-{{item.activ_end_time}}</el-button>
            </el-popover></div>
            <div class="refundMiniwidth">{{item.flag? '全退':'非全退'}}</div>
            <div class="refundMiniwidth">
              {{item.person_num}}
            </div>
            <div class="refundMiniwidth">
              <p v-if="!item.house.length" >无</p>
              <p @click="lookXqB(item,index)"  v-if="item.house.length">查看详情&gt;</p>
            </div>
            <div class="refundMiniwidth" style="color:#008489">
              {{'￥'+item.total_price}}
            </div>
            <div style="display: flex;justify-content: center;align-items: center;width:150px;cursor: pointer" v-if="item.audit == 0">
              <span style="margin: 0 10px;"  @click="changeErollAB(item,3)" >查看详情</span>
            </div>
            <div  style="display: flex;justify-content: center;align-items: center;width:150px;cursor: pointer" v-if="item.audit != 0">
              <el-button size="mini" type="primary">{{item.audit == 1? '已同意':'已拒绝'}}</el-button>
              <span style="margin: 0 10px;"  @click="changeErollAB(item,3)" >查看详情</span>
            </div>
            <div class="refundMiniwidth" v-if="item.status">
              <el-button type="primary" size="mini" :style="{backgroundColor:item.status == 2? '#fff':'#008489',color:item.status == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'已同意':'已拒绝'}}</el-button>
            </div>
          </div>
        </div>
        <div v-show="!refundList.length">
          <none type='refundPage'></none>
        </div>
        <div style="margin:20px 0;">
          <el-pagination  @current-change="handleRefundChange"  :current-page="index" :page-size="10" layout="total, prev, pager, next" :total="refundtotal"></el-pagination>
        </div>
        <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
          <Loading></Loading>
        </div>
      </div>
      <div style="margin-top:30px;" v-show="clickIndex == 5">
        <div style="display: flex;justify-content: flex-start">
          <div @click="changeLook(1)" :style="{backgroundColor: lookIndex == 1? '#008489':'#F1F1F1',color:lookIndex == 1? '#fff':'#000'}" style="padding: 5px 20px;cursor: pointer">全部</div>
          <div @click="changeLook(2)" :style="{backgroundColor: lookIndex == 2? '#008489':'#F1F1F1',color:lookIndex == 2? '#fff':'#000'}" style="padding: 5px 20px;margin:0 20px;cursor: pointer">待评价</div>
          <div @click="changeLook(3)" :style="{backgroundColor: lookIndex == 3? '#008489':'#F1F1F1',color:lookIndex == 3? '#fff':'#000'}" style="padding: 5px 20px;cursor: pointer">已评价</div>
        </div>
        <div style="display: flex;justify-content: space-around;padding: 10px 020px;margin-top:20px;background-color:#F4F6F9 ">
          <div class="conpletewidth">用户</div>
          <div class="conpletewidth">参与体验</div>
          <div class="conpletewidth">参与人数</div>
          <div class="conpletewidth">参与时间</div>
          <div class="conpletewidth">已支付</div>
          <div class="conpletewidth">操作</div>
        </div>
        <div  v-for="(item,index) in completList" style="display: flex;justify-content: space-around;padding:20px 0px;font-size:12px;border-bottom: 1px solid #E6E6E6;">
          <div class="conpletewidth" style="display: flex;justify-content:center;">
            <img  :src="item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:'../../static/img/static/user.png'" style="width:40px;height:40px;border-radius: 50%;margin-top:10px;">
            <div style="margin-left:10px;line-height: 60px;">{{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'}}</div>
          </div>
          <div class="conpletewidth" style="display: flex;justify-content: flex-start">
            <loadingImg type="3" :src="item.cover?item.cover.domain + item.cover.image_url:''" style="width:60px;height:60px;overflow: hidden"></loadingImg>
            <div style="text-align: left;line-height: 60px;margin-left:5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.title}}</div>
          </div>
          <div class="conpletewidth" style="line-height: 60px;">
            {{item.num}}
          </div>
          <div class="conpletewidth" style="line-height: 30px;">
            {{item.activ_begin_time}}—{{item.activ_end_time}}
          </div>
          <div class="conpletewidth" style="line-height: 60px;color:#008489">
            <span>￥</span><span>{{item.pay_price}}</span>
          </div>
          <div class="conpletewidth" >
            <span style="cursor: pointer;color:#008489" @click="lookMore(item)"><b>查看详情</b></span>
            <span style="margin-left:20px;font-weight: bold" @click="item.isevaluate_planner == 1?toDiscuss(item):''" :style="{color:item.isevaluate_planner == 1?'#008489':'',cursor:item.isevaluate_planner == 1?'pointer':''}">{{item.isevaluate_planner == 1? '评价他':'已评价'}}</span>
            <div style="margin-top:10px;color:#4570B1;width:180px;word-break:break-all;" v-if="item.isevaluate_planner == 2">({{item.comment.content}})</div>
          </div>
        </div>
        <div v-show="!completList.length">
          <none type="myPlay2"></none>
        </div>
        <div style="margin:20px 0;">
          <el-pagination  @current-change="handleCurrentChange" :current-page="index"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:990;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
      <div v-show="lookHouse" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color:rgba(0,0,0,.5);display: flex;justify-content: center;align-items: center">
        <div id="houseA"  style="width:500px;padding:20px;background-color:#fff;font-size:12px;border-radius:10px;">
          <div style="display:flex;justify-content:space-between">
            <span><b>预定住宿</b></span><i @click="lookHouse = false" style="font-size:20px;" class="el-icon-close"></i>
          </div>
          <div v-for="(item,index) in houseList" style="display:flex;justify-content:flex-start;margin-top:20px;">
            <div >
              <loadingImg type="2" :src="item.image[0].domain + item.image[0].image_url" style="width:230px;;height:150px;overflow: hidden;"></loadingImg>
            </div>
            <div style="line-height:50px;margin-left:20px;">
              <p><b>{{item.title}}</b></p>
              <p>可住{{item.max_person}}人（{{item.num}}间）</p>
              <p><b>￥{{item.price}}</b></p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="lookHouseB" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color:rgba(0,0,0,.5);display: flex;justify-content: center;align-items: center">
        <div id="houseAB"  style="width:500px;padding:20px;background-color:#fff;font-size:12px;border-radius:10px;">
          <div style="display:flex;justify-content:space-between">
            <span><b>预定住宿</b></span><i @click="lookHouseB = false" style="font-size:20px;" class="el-icon-close"></i>
          </div>
          <div v-for="(item,index) in houseListB" style="display:flex;justify-content:flex-start;margin-top:20px;">
            <div >
              <loadingImg type="2" :src="item.domain + item.image_url" style="width:230px;;height:150px;overflow: hidden;"></loadingImg>
            </div>
            <div style="line-height:50px;margin-left:20px;">
              <p><b>{{item.title}}</b></p>
              <p>可住{{item.max_person}}人（{{item.house_num}}）间</p>
              <p><b>￥{{item.house_price}}</b></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isdiscus" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(0,0,0,.8);display: flex;justify-content: center;align-items: center">
        <div style="background-color: #fff;width:400px;padding:20px;border-radius: 10px;">
          <div style="text-align: right">
            <i @click="closeDiscus" style="cursor: pointer;font-size: 20px;" class="el-icon-close" ></i>
          </div>
          <p style="text-align: left">你对{{userName?userName:'匿名用户'}}的评价</p>
          <el-input style="margin-top:15px;" type="textarea" v-model="content" placeholder="写下你对他的印象吧" rows="4"></el-input>
          <div style="margin-top:15px;text-align: right">
            <el-button plain @click="closeDiscus" style="border:1px solid rgba(102,102,102,1);color:#000">取消</el-button>
            <el-button @click="saveDiscuss" style="border:1px solid #008489;background-color: #E1FFFD;color:#008489">评价</el-button>
          </div>
        </div>
      </div>
      <div>
      </div>
      <Chat v-if="isChat" v-on:chat="chat" :userUrl="imgUrl" :to_user_id="to_user_id" :isOwer="userid" :userName="userName" :other_img="other_img"></Chat>
    </div>
</template>

<script>
  import lan  from '../../static/js/language'
  import test from '../../static/js/sex'
  import Chat from '../public/chat'
  import Loading from '../public/Loading'
  import Head from '../public/head'
  import loadingImg from '../public/loadingImg'
  import none from '../public/noNumber'
    export default {
        name: "myPlay",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            year:(new Date()).getFullYear(),
            month:(new Date()).getMonth() + 1,
            day:(new Date()).getDate(),
            todayYear:(new Date()).getFullYear(),
            todayMonth:(new Date()).getMonth() + 1,
            dayCount:[],
            color:[],
            activeList:[],
            time:[],
            downIndex:'',
            upIndex:'',
            chooseTime:[],
            dateActive:[],
            isLoading:false,
            isDate:true,
            isInvite:false,
            date:[],
            datePicker:[],
            timePicker:[],
            dateTime:[],
            timeAll:[],
            checked:false,
            active_id:"",
            clickIndex:1,
            lookIndex:1,
            completList:[],
            total:0,
            isdiscus:false,
            content:'',
            order_id:'',
            userName:'',
            remakeTime:'',
            index:1,
            isADate:true,
            clickArr:[
              {name:'活动日历',index:1},
              {name:'活动预定',index:2},
              {name:'志愿者申请',index:3},
              {name:'退款申请',index:4},
              {name:'已完成',index:5},
            ],
            orderActive:[],
            timeContent:'',
            isChat:false,
            imgUrl:'',
            userid:'',
            to_user_id:'',
            serchList:[
              {name: '全部'},
              {name: '已付款'},
              {name: '未付款'},
              {name:'已主动退款'}
            ],
            ListIndex:0,
            orderList:[
              {name:'活动时间从早到晚',index:1},
              {name:'活动时间从晚到早',index:-1},
              {name:'下单时间升序',index:2},
              {name:'下单时间降序',index:-2},
            ],
            Isorder:false,
            orderIndex:0,
            ordertotal:0,
            volunList:[],
            voluntotal:0,
            languageList:[],
            sexArr:[],
            refundList:[],
            refundtotal:0,
            lookHouse:false,
            houseList:[],
            lookHouseB:false,
            houseListB:[],
            orderSort:1,
            complete_num: '',
            enroll_num: '',
            order_num: '',
            refund_num: '',
            voluncontent:'',
            paginationShow:true
          }
      },
      components:{
          Head,
        Loading,
        loadingImg,
        none,
        Chat,
      },
      watch:{
        year:function(){
          this.chooseTime = []
          this.getMonth()
          this.getDateActive()
        },
        month:function(){
          this.chooseTime = []
          this.getMonth()
          this.getDateActive()
        },
        isInvite:function() {
          if (!this.isInvite) {
            this.date = []
            this.dateTime = []
            this.checked = false
          }
        },
        checked:function(){
          if(this.checked){
            this.getAlltime()
          }else{
            this.date = []
            this.dateTime = []
          }
        },
        clickIndex:function(){
          this.index = 1
          if(this.clickIndex == 5){
            this.getAll(1)
            this.doAllRead(4)
          }else if(this.clickIndex == 2){
            this.getOrid(1,'',this.orderSort)
            this.doAllRead(1)
          }else if(this.clickIndex == 3){
            this.getEroll(1)
            this.doAllRead(2)
          }else if(this.clickIndex == 4){
            this.getRefund(1)
            this.doAllRead(3)
          }
        },
        orderIndex:function(){
          this.index = 1
          if(this.ListIndex == '1'){
            this.getOrid(1,1,this.orderSort,0,)
          }else if(this.ListIndex == '0'){
            this.getOrid(1,'',this.orderSort)
          }else if(this.ListIndex == '2'){
            this.getOrid(1,0,this.orderSort)
          }else{
            this.getOrid(1,1,this.orderSort,2,'',1)
          }
        }
      },
      methods:{
          doAllRead(flag){
            this.$http.post(this.api + '/PlannerReadAll',{
              token: localStorage.getItem('token'),
              flag:flag
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(flag == 1){
                    this.order_num = 0
                  }else if(flag == 2){
                    this.enroll_num = 0
                  }else if(flag == 3){
                    this.refund_num = 0
                  }else{
                    this.complete_num =0
                  }
                }else if(res.data.code == 3){
                  this.doAllRead(flag)
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
          getNoReadAll(){
            this.$http.post(this.api + '/PlannerNoRead',{
              token: localStorage.getItem('token'),
            })
              .then(res=>{
                if(res.data.code == 1){
                  let data = res.data.data
                  this.complete_num =data.complete_num
                    this.enroll_num = data.enroll_num
                    this.order_num = data.order_num
                    this.refund_num = data.refund_num
                }else if(res.data.code == 3){
                  this.getNoReadAll()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id
            }
          })
        },
        changeErollAB(item,val){
          if(val == 3){
            this.$router.push({
              path: '/refundDescirbe',
              query:{
                information: item.refund_id,
                type:3,
                index:'4'
              }
            })
          }
        },
        lookXqB(item,index){
          this.lookHouseB = !this.lookHouseB
          this.houseListB = item.house
        },
        lookXq(item,index){
          this.lookHouse = !this.lookHouse
          this.houseList = item.house
        },
        handleRefundChange(val){
          this.getRefund(val)
        },
        getRefund(val){
          this.isLoading = true
          this.$http.post(this.api + '/RefundLPlanner',{
            token: localStorage.getItem('token'),
            page: val,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.refundList = res.data.data.data
                this.refundtotal = res.data.data.total
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getRefund(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
        changeVolunErollA(item,val){
          this.isLoading = true
          this.$http.post(this.api + '/ErollA',{
            token: localStorage.getItem('token'),
            enroll_id: item.enroll_id,
            flag: val
          })
            .then(res=>{
              if(res.data.code == 1){
                item.audit = val == 1? 1:2
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                      this.changeVolunErollA(item,val)
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
        handlevolunChange(val){
          this.getEroll(val)
        },
        getEroll(val){
          this.isLoading = true
          this.$http.post(this.api + '/ErollL',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.volunList = res.data.data.data
                this.voluntotal = res.data.data.total
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
        handleOrderChange(val){
            this.index = val
          this.paginationShow = false
          if(this.ListIndex == '1'){
            this.getOrid(val,1,this.orderSort,0,)
          }else if(this.ListIndex == '0'){
            this.getOrid(val,'',this.orderSort)
          }else if(this.ListIndex == '2'){
            this.getOrid(val,0,this.orderSort)
          }else{
            this.getOrid(1,1,this.orderSort,2,'',1)
          }
          this.$nextTick(function () {
            this.paginationShow = true;
          })
        },
        changeOrder(items,indexs){
          this.orderIndex = indexs
          this.orderSort = items.index
          this.Isorder = false
        },
        orderClick(){
          this.Isorder = !this.Isorder
        },
        changeClickList(items,indexs){
          this.ListIndex = indexs
          this.index = 1
          if(this.ListIndex == '1'){
            this.getOrid(1,1,this.orderSort,0,)
          }else if(this.ListIndex == '0'){

            this.getOrid(1,'',this.orderSort)
          }else if(this.ListIndex == '2'){

            this.getOrid(1,0,this.orderSort)
          }else{

            this.getOrid(1,1,this.orderSort,2,'',1)
          }
        },
        toRefundDes(item){
          this.$router.push({
            path: '/refundDescirbe',
            query:{
              information: item.order_id,
              type:1,
              index: 2
            }
          })
        },
        chat(){
          this.isChat = false
        },
        changeErollA(item,val){
          if(val == 2){
            this.$router.push({
              path:'/playerReturn',
              query:{
                information: item.order_id
              }
            })
          }else if(val == 3){
            this.$router.push({
              path: '/refundDescirbe',
              query:{
                information: item.order_id,
                type:2
              }
            })
          }else{
            this.isChat = true
            this.to_user_id = item.user.user_id
            this.userName = item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'
            this.other_img = item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:'../../../static/img/static/user.png'
          }
        },
        takeUp(item,index){
          this.timeContent = item.activ_begin_time +'—'+ item.activ_end_time
        },
        takevolunUp(item,index){
          let a = ''
          let b = this.languageList[item.main_language].label + ','
          for(let i = 0;i<item.language.length;i++){
            a += this.languageList[item.language[i]].label+','
          }
          a = a +'/'+ item.skill
          this.voluncontent =b+ a
        },
          //获取预定
        getOrid(val,flag,sort,status,iscomplete,type){
          this.$http.post(this.api + '/OrderLPlannerTwo',{
            token: localStorage.getItem('token'),
            flag: flag,
            page: val,
            status:status,
            iscomplete:iscomplete,
            sort:sort,
            type:type,
            verson:2.0,
            per_page:10
          })
            .then(res=>{
              if(res.data.code == 1){
                this.orderActive = res.data.data.data
                this.ordertotal = res.data.data.total
              }else if(res.data.code == 3){

              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
          //查看详情
        lookMore(item){
          this.$router.push({
            path: '/refundDescirbe',
            query:{
              information: item.order_id,
              type:4,
              index: '5'
            }
          })
        },
        toRemake(item,index){
          this.$router.push({
            name: 'Experience',
            query:{
              information: item.activity_id,
              complete: item.complete
            }
          })
        },
        deleteActive(item,index){
          if(!this.chooseTime.length){
            this.isInvite = true
            this.remakeTime = 1
            this.active_id = item.activity_id
            this.getTime(item.activity_id)
          }else{
            this.$confirm('此操作将删除当天的这个活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteSingle(item)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        },
        deleteSingle(val){
          this.$http.post(this.api + '/SlotD',{
            token: localStorage.getItem('token'),
            slot_id: val.slot_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                this.getActive()
                this.getDateActive()
              }else if(res.data.code == 3){
                this.deleteSlot()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        saveDiscuss(){
          if( !this.content){
            this.$message({
              type: 'info',
              message: '请填写评价'
            })
          }else{
            this.$http.post(this.api + '/CommentPlannerS',{
              token: localStorage.getItem('token'),
              content: this.content,
              order_id: this.order_id
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message: '评价成功!'
                  })
                  this.content = ''
                  this.isdiscus = false
                  if(this.lookIndex == 1){
                    this.getAll(1)
                  }else{
                    this.getNocomplete(1,this.lookIndex -1)
                  }
                }else if(res.data.code == 3){
                  this.saveDiscuss()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }

        },
        toDiscuss(item){
          this.order_id = item.order_id
          this.userName = item.user.family_name+item.user.middle_name+item.user.name
          this.isdiscus = !this.isdiscus
        },
        closeDiscus(){
          this.isdiscus = false
          this.content = ''
        },
        handleCurrentChange(val){
          if(this.lookIndex == 1){
            this.getAll(val)
          }else{
            this.getNocomplete(val,this.lookIndex -1)
          }
        },
        getAll(val){
          this.isLoading = true
          this.$http.post(this.api + '/OrderLPlanner',{
            token: localStorage.getItem('token'),
            page: val,
            flag: 1,
            iscomplete: 2,
            status:0
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.completList = res.data.data.data
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAll(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
          getNocomplete(val,num){
            this.isLoading = true
            this.$http.post(this.api + '/OrderLPlanner',{
              token: localStorage.getItem('token'),
              page: val,
              flag: 1,
              isevaluate_planner:num,
              iscomplete: 2,
              status:0
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.total = res.data.data.total
                  this.completList = res.data.data.data
                  this.isLoading = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  this.isLoading = false
                }
              })
          },
        changeLook(val){
          if(this.lookIndex != val){
            this.lookIndex = val
          }
          if(val == 2){
            this.getNocomplete(1,this.lookIndex -1)
          }else if(val == 3){
            this.getNocomplete(1,this.lookIndex-1)
          }else{
            this.getNocomplete(1)
          }
        },
        changeClick(val){
         if(this.clickIndex != val){
           this.clickIndex = val
         }
        },
        toApplication(item,index){
          this.$router.push({
            name:'appliCation',
            query:{
              information: item.activity_id
            }
          })
        },
          getMonth(){
            let lastDay = this.getLastDay(this.year,this.month)
            let day = this.getFirtDay(this.year,this.month -1)
            let temp = []
            let dayCount = []
            let color = []
            let b = []
            for(let i =1;i<day;i++){
              temp.push(' ')
              color.push({index:0})
            }
            for(let j= 1;j<=lastDay;j++){
              temp.push(j)
              b.push({index:0})
              if(this.time.length){
                for(let m = 0;m<this.time.length;m++){
                  if(this.time[m].long_day){
                    //单天活动
                    for(let n = 0;n<this.time[m].slot.length;n++){
                      if(new Date(this.year,this.month-1,j).getTime() == this.parseDate(this.time[m].slot[n].day)){
                        if(new Date(this.year,this.month-1,j).getTime() == new Date(this.todayYear,this.todayMonth-1,this.day).getTime()){
                          b[j-1] = ({today:1})
                        }
                        for(let l = 0;l<this.time[m].slot[n].list.length;l++){
                          if(this.time[m].slot[n].list[l].enroll_count !=0|| this.time[m].slot[n].list[l].order_num !=0|| this.time[m].slot[n].list[l].refund_num !=0){
                            if(this.time[m].slot[n].list[l].online == 1){
                              if( b[j-1].today){
                                b[j-1] = ({index:1,flag:1,today:1,online:1})
                              }else{
                                b[j-1] = ({index:1,flag:1,online:1})
                              }
                            }else{
                              if(b[j-1].online == 1){
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,flag:1,today:1,online:1})
                                }else{
                                  b[j-1] = ({index:1,flag:1,online:1})
                                }
                              }else{
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,flag:1,today:1})
                                }else{
                                  b[j-1] = ({index:1,flag:1})
                                }
                              }
                            }
                          }else{
                            if(this.time[m].slot[n].list[l].online == 1){
                              if(b[j-1].flag){
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,flag:1,today:1,online:1})
                                }else{
                                  b[j-1] = ({index:1,flag:1,online:1})
                                }
                              }else{
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,today:1,online:1})
                                }else{
                                  b[j-1] = ({index:1,online:1})
                                }
                              }
                            }else{
                              if(b[j-1].online){
                                if(b[j-1].flag){
                                  if( b[j-1].today){
                                    b[j-1] = ({index:1,flag:1,today:1,online:1})
                                  }else{
                                    b[j-1] = ({index:1,flag:1,online:1})
                                  }
                                }else{
                                  if( b[j-1].today){
                                    b[j-1] = ({index:1,today:1,online:1})
                                  }else{
                                    b[j-1] = ({index:1,online:1})
                                  }
                                }
                              }else{
                                if(b[j-1].flag){
                                  if( b[j-1].today){
                                    b[j-1] = ({index:1,flag:1,today:1})
                                  }else{
                                    b[j-1] = ({index:1,flag:1})
                                  }
                                }else{
                                  if( b[j-1].today){
                                    b[j-1] = ({index:1,today:1})
                                  }else{
                                    b[j-1] = ({index:1})
                                  }
                                }
                              }
                            }

                          }
                        }
                      }else{
                        if( b[j-1].index == 1){
                          b[j-1].index = 1
                        }else{
                          b[j-1] = ({index:2})
                        }
                      }
                    }
                  }else{
                    //多天活动
                    for(let n = 0;n< this.time[m].slot.length;n++){
                      if(new Date(this.year,this.month -1,j).getTime() >= this.parseDate(this.time[m].slot[n].begin_date) && new Date(this.year,this.month -1,j).getTime() <= this.parseDate(this.time[m].slot[n].end_date)){
                        if(new Date(this.year,this.month-1,j).getTime() == new Date(this.todayYear,this.todayMonth-1,this.day).getTime()){
                          b[j-1] = ({today:1})
                        }
                        if(this.time[m].slot[n].enroll_count !=0|| this.time[m].slot[n].order_num !=0|| this.time[m].slot[n].refund_num !=0){
                          if(this.time[m].slot[n].online == 1){
                            if( b[j-1].today){
                              b[j-1] = ({index:1,flag:1,today:1,online:1})
                            }else{
                              b[j-1] = ({index:1,flag:1,online:1})
                            }
                          }else{
                            if(b[j-1].online){
                              if( b[j-1].today){
                                b[j-1] = ({index:1,flag:1,today:1,online:1})
                              }else{
                                b[j-1] = ({index:1,flag:1,online:1})
                              }
                            }else{
                              if( b[j-1].today){
                                b[j-1] = ({index:1,flag:1,today:1})
                              }else{
                                b[j-1] = ({index:1,flag:1})
                              }
                            }
                          }
                        }else{
                          if(this.time[m].slot[n].online == 1){
                            if(b[j-1].flag){
                              if( b[j-1].today){
                                b[j-1] = ({index:1,flag:1,today:1,online:1})
                              }else{
                                b[j-1] = ({index:1,flag:1,online:1})
                              }
                            }else{
                              if( b[j-1].today){
                                b[j-1] = ({index:1,today:1,online:1})
                              }else{
                                b[j-1] = ({index:1,online:1})
                              }
                            }
                          }else{
                            if(b[j-1].online){
                              if(b[j-1].flag){
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,flag:1,today:1,online:1})
                                }else{
                                  b[j-1] = ({index:1,flag:1,online:1})
                                }
                              }else{
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,today:1,online:1})
                                }else{
                                  b[j-1] = ({index:1,online:1})
                                }
                              }
                            }else{
                              if(b[j-1].flag){
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,flag:1,today:1})
                                }else{
                                  b[j-1] = ({index:1,flag:1})
                                }
                              }else{
                                if( b[j-1].today){
                                  b[j-1] = ({index:1,today:1})
                                }else{
                                  b[j-1] = ({index:1})
                                }
                              }
                            }
                          }
                        }
                      }else{
                        if( b[j-1].index == 1){
                          b[j-1].index == 1
                        }else{
                          b[j-1] = ({index:2})
                        }
                      }
                    }
                  }
                }
              }else{
                b[j-1] = ({index:2})
              }
            }
            this.dayCount = temp
            this.color = color.concat(b)
            this.isDate = false
          },
          getLastDay(year,month){
            let lastDay = new Date(year,month,0)
            let day = lastDay.getDate()
            return day
          },
          getFirtDay(year,month){
            let firstDay = new Date(year,month)
            let dayWeek = firstDay.getDay()
            if(dayWeek == 0){
              dayWeek = 7
            }
            return dayWeek
          },
        reduce(val){
            if(val == 1){
              this.year -= 1
            }else{
              if(this.month == 1){
                this.month = 12
                this.year -= 1
              }else{
                this.month -= 1
              }
            }
        },
        add(val){
            if(val == 1){
              this.year += 1
            }else{
              if(this.month == 12){
                this.month = 1
                this.year += 1
              }else{
                this.month += 1
              }
            }
        },
        getActive(){
          this.$http.post(this.api + '/ActivityList',{
            token: localStorage.getItem('token'),
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.length){
                  this.activeList = res.data.data
                  let a = []
                  let c = ''
                  for(let i = 0;i<this.activeList.length;i++){
                    a.push({long_day:this.activeList[i].long_day,slot:this.activeList[i].slot})
                  }
                  this.time = a
                }
                this.getMonth()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                      this.getActive()
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        parseDate(str) { // 字符串转时间戳
          return Date.parse(new Date(Date.parse(str.replace(/-/g, "/")))) ;
        },
        chooseMore(item,index){
            this.downIndex = index
          if(this.color[index].index == 3){
            this.color[index].index = 1
            if(this.month < 10){
              var b  = '0'+ this.month
            }else{
              var b = this.month
            }
            if(item<10){
              var c  = '0' + item
            }else{
              var c = item
            }
            let d = this.year.toString()+'-'+ b+'-' + c
            let a = this.chooseTime.indexOf(d)
            this.chooseTime.splice(a,1)
          }else{
            this.color[index].index = 3

            if(this.month < 10){
              var a = '0'+ this.month
            }else{
              var a = this.month
            }
            if(item<10){
              var b = '0' + item
            }else{
              var b = item
            }
            this.chooseTime.push(this.year.toString()+'-'+ a+'-' + b)
          }
        },
        leaveMore(item,index){
          if(this.downIndex){
            if(this.color[index].index == 3){
              this.color[index].index = 1
              if(this.month < 10){
                var b  = '0'+ this.month
              }else{
                var b = this.month
              }
              if(item<10){
                var c  = '0' + item
              }else{
                var c = item
              }
              let d = this.year.toString()+'-'+ b+'-' + c
              let a = this.chooseTime.indexOf(d)
              this.chooseTime.splice(a,1)
            }else{
              this.color[index].index = 3
              if(this.month < 10){
                var a = '0'+ this.month
              }else{
                var a = this.month
              }
              if(item<10){
                var b = '0' + item
              }else{
                var b = item
              }
              this.chooseTime.push(this.year.toString()+'-'+ a+'-' + b)
            }
          }
        },
        dlete(item,index){
            this.downIndex = ''
          this.getDateActive()
        },
        getDateActive(){
          this.$http.post(this.api + '/ActivityListTwo',{
            token: localStorage.getItem('token'),
            date:JSON.stringify(this.chooseTime),
            verson:2.0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                let a = []
                
                if(this.chooseTime.length){
                  for(let i =0;i< data.length;i++){
                    if(data[i].long_day){
                      for(let m=0;m<data[i].slot.length;m++){
                        for(let j = 0;j<data[i].slot[m].list.length;j++){
                          a.push({
                            time:data[i].slot[m].list[j].time[0]+'—'+data[i].slot[m].list[j].time[1],
                            price:data[i].slot[m].list[j].price,
                            title: data[i].title,
                            kind:data[i].kind,
                            activity_id:data[i].activity_id,
                            slot_id:data[i].slot[m].list[j].slot_id,
                            day:data[i].slot[m].day,
                            cover_image:data[i].cover_image,
                            cover:data[i].cover,
                            enroll_count:data[i].slot[m].list[j].enroll_count,
                            sale_num:data[i].slot[m].list[j].order_num,
                            is_doing:data[i].is_doing,
                            online:data[i].slot[m].list[j].online,
                            refund_num:data[i].slot[m].list[j].refund_num,
                            differ: data[i].slot[m].list[j].no_reach_differ
                          })
                        }
                      }
                    }else{
                      for(let j=0;j<data[i].slot.length;j++){
                        a.push({
                          time:data[i].slot[j].begin_date+'—'+data[i].slot[j].end_date,
                          price:data[i].slot[j].price,
                          title: data[i].title,
                          kind:data[i].kind,
                          activity_id:data[i].activity_id,
                          slot_id:data[i].slot[j].slot_id,
                          cover_image:data[i].cover_image,
                          cover:data[i].cover,
                          enroll_count:data[i].enroll_count,
                          sale_num:data[i].slot[j].order_num,
                          is_doing:data[i].is_doing,
                          online:data[i].slot[j].online,
                          refund_num:data[i].slot[j].refund_num,
                          differ:data[i].slot[j].no_reach_differ
                        })
                      }
                    }
                  }
                }else{
                  a = res.data.data
                }
                this.dateActive = a
         
                this.isADate = false
              }else if(res.data.code == 3){
                this.getDateActive()
              }else if(res.data.code == 0){
                this.$message({type:'error',message:res.data.msg})
              }
            })
        },
        //查看预定
        lookOrder(item,index){
          if(this.chooseTime.length){
            this.$router.push({
              path:'/LookOrder',
              query:{
                activeId: item.activity_id,
                slot_id:item.slot_id
              }
            })
          }else{
            this.$router.push({
              path:'/LookOrder',
              query:{
                activeId: item.activity_id
              }
            })
          }
        },
        //查看退款
        backMoney(item,index){
          if(this.chooseTime){
            this.$router.push({
              path: '/refundPage',
              query:{
                information: item.activity_id,
                slot_id: item.slot_id
              }
            })
          }else{
            this.$router.push({
              path: '/refundPage',
              query:{
                information: item.activity_id
              }
            })
          }

        },
        //邀请志愿者
        toInvite(item,index){
   /*       console.log(item)
          localStorage.setItem('invite_id',item.activity_id)*/
          this.$router.push({
            name: 'invitVolunter',
            query:{
              information: item.user_id,
              activeId:item.activity_id
            }
          })
        },
        //取消活动
        abolish(item,index){
          if(!this.chooseTime.length){
            this.isInvite = true
            this.remakeTime = 2
            this.active_id = item.activity_id
            this.getTime(item.activity_id)
          }else{
            this.$confirm('此操作将取消当天的这个活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.abolishSingle(item)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        },
        abolishSingle(item){
          this.$http.post(this.api + '/SlotC',{
            token: localStorage.getItem('token'),
            activity_id: item.activity_id,
            flag: 2,
            is_all: 0,
            slot_id: item.slot_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type: 'success',
                  message: '取消成功！'
                })
                this.chooseTime = []
                this.getActive()
                this.getDateActive()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.abolishTime()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getTime(val){
          this.$http.post(this.api + '/home/Activity/get_activity',{
            token: localStorage.getItem('token'),
            activity_id: val,
            visit:0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                if(data.long_day){
                  this.Longday = true
                  let a = []
                  let c = []
                  for(let i = 0;i<data.slot.length;i++){
                    c.push({index:i})
                    let b = []
                    for(let j = 0; j<data.slot[i].list.length;j++){
                      if(!data.slot[i].list[j].online){
                        b.push({label:data.slot[i].day +'  '+ data.slot[i].list[j].time[0]+'—'+data.slot[i].list[j].time[1],value:data.slot[i].list[j].slot_id})
                      }
                    }
                    if(b.length){
                      c[i].index = b
                      a.push({label:data.slot[i].day,value:i})
                    }
                  }
                  this.datePicker = a
                  this.timeAll = c
                }else{
                  this.Longday = false
                  let a = []
                  for(let i =0;i<data.slot.length;i++){
                    if(!data.slot[i].online){
                      a.push({label:data.slot[i].begin_date+' '+data.slot[i].begin_time+'—'+data.slot[i].end_date+' '+data.slot[i].end_time,value:data.slot[i].slot_id})
                    }
                  }
                  this.datePicker = a
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getTime(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        abolishInvite(){
          if(this.remakeTime == 1){
            this.deleteSlot()
          } else{
            this.abolishTime()
          }
        },
        deleteSlot(){
          this.$http.post(this.api + '/SlotD',{
            token: localStorage.getItem('token'),
            slot_id: this.Longday?JSON.stringify(this.dateTime):JSON.stringify(this.date)
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isInvite = false
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                this.getActive()
                this.getDateActive()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deleteSlot()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        abolishTime(){
          this.$http.post(this.api + '/SlotC',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            flag: 2,
            is_all: this.checked? 1:0,
            slot_id: this.Longday?JSON.stringify(this.dateTime):JSON.stringify(this.date)
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isInvite = false
                this.$message({
                  type: 'success',
                  message: '取消成功！'
                })
                this.chooseTime = []
                this.getActive()
                this.getDateActive()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.abolishTime()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        changeTime(event){
          let a = []
          for(let j = 0;j<this.date.length;j++){
            for(let i = 0;i<this.timeAll.length;i++){
              if(this.date[j] == i){
                for(let m = 0;m<this.timeAll[i].index.length;m++){
                  a.push({label:this.timeAll[i].index[m].label,value:this.timeAll[i].index[m].value})
                }
              }
            }
          }
          this.timePicker = a
        },
        getAlltime(){
          let a = []
          let b = []
          let c = []
          for(let i = 0;i<this.datePicker.length;i++){
            a.push(this.datePicker[i].value)
          }
          for(let i = 0;i<this.timeAll.length;i++){
            for(let m = 0;m<this.timeAll[i].index.length;m++){
              c.push({label:this.timeAll[i].index[m].label,value:this.timeAll[i].index[m].value})
              b.push(this.timeAll[i].index[m].value)
            }
          }
          this.timePicker =  c
          this.date = a
          this.dateTime = b
        },
        //恢复活动
        restore(item,index){
          this.$http.post(this.api + '/SlotC',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            flag: 1,
            slot_id: item.slot_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type:'success',
                  message:'恢复活动成功！'
                })

                this.chooseTime = []
                this.getActive()
                this.getDateActive()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.restore(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        reload(res){
          let data = res.data.data[0]
          this.userid = data.user_id
          this.imgUrl = data.head_image?data.headimage.domain + data.headimage.image_url:'../../../static/img/static/user.png'
        },
      },
      mounted(){
        this.getDateActive()
        this.getNoReadAll()
      },
      created(){
        this.getActive()
        this.languageList = lan()
        this.sexArr = test()
        if(this.$route.query.chooseIndex){
          this.clickIndex = this.$route.query.chooseIndex
        }
      }
    }
</script>

<style scoped>
  .aras{
    padding: 5px 20px;
    margin-right:20px;
  }
  .miniwidth{
    width:120px;
    height:40px;
    line-height: 40px;
  }
  .minivolunwidth{
    width:150px;
    height:40px;
    line-height: 40px;
  }
  .volunwidth{
    width:150px;
    height:70px;
    line-height: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .width{
    width:120px;
    height:69px;
    line-height:69px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
.DateWeek{
  width:70px;
  font-weight: bold;
}
  .dateList{
    width:68px;
    height:68px;
    line-height: 70px;
    text-align: center;
    margin: 0 2px 2px 0;
    font-size: 12px;
    user-select: none;
    position: relative;
  }
  .conpletewidth{
    width:180px;
    text-align: center;
  }
  .refundWidth{
    width:150px;
    height:25px;
  }
  .refundMiniwidth{
    width:150px;
    height:70px;
    line-height:70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
