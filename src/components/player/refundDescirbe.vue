<template>
    <div>
        <Head type='refundDescirbe'></Head>
        <div v-if="Rdata" class="fontweight" style="margin: 80px auto;width:1080px;text-align:left;font-size:16px;">
            <p style="font-szie:14px;" v-if="type != '5'" ><b>我的策划&gt;{{type == 4? '已完成':type == 3?'退款申请':'查看预定'}}&gt;{{type == 3? '申请详情':type == 1?'预定详情':type == 4?'已完成详情':'预定详情'}}</b></p>
            <p style="font-szie:14px;" v-if="type == '5'" ><b>我的策划&gt;已主动退款</b></p>

              <div class="flexBetween">
                <p class="fontweight" style="margin: 32px 0;font-size:18px">{{type == 3?'申请详情':type == 4?'详情':type=='1'?'订单详情':'详情'}}</p>
                <el-button icon="el-icon-arrow-left" style="width:50px;height:50px;" @click="goBack"  circle></el-button>
              </div>
              <div class="flexStart">
                <LoadinImg type="user" :src="Rdata.user.head_image?Rdata.user.headimage.domain + Rdata.user.headimage.image_url:''" style="width:92.04px;height:92.04px;" ></LoadinImg>
                <div style="margin-left:10px;line-height:92px;font-size:29px;">
                    <b>{{Rdata.user.family_name+Rdata.user.middle_name+Rdata.user.name?Rdata.user.family_name+Rdata.user.middle_name+Rdata.user.name:'匿名用户'}}</b>
                    <span v-if="Rdata.is_refund == 1" style="color:#F13636;font-size:12px">(有退款)</span>
                </div>
              </div>
              <div style="margin-top: 25px;">
                <p>参与人数：{{Rdata.num}}人</p>
                <p class="marginT">预定时间：{{Rdata.activ_begin_time}}—{{Rdata.activ_end_time}}</p>
              </div>
              <hr class="lineS">
              <div class="flexStart">
                <div>价格详情：</div>
                <div v-if="Rdata.detail.length">
                  <div class="marginTop" v-for="(item,index) in Rdata.detail">
                    <div v-if="item.type == '1'||item.type == '2'">
                      {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
                    </div>
                    <div v-if="item.type == '0'">
                      <div class="marginTop">标准<span class="marginLeft"></span>{{item.adult}}人<span class="marginLeft"></span>¥{{item.adult_price}}</div>
                      <div >儿童<span class="marginLeft"></span>{{item.kids}}人<span class="marginLeft"></span>¥{{item.kids_price}}</div>	
                    </div>
                  </div>
                </div>
                <div v-if="!Rdata.detail.length">
                  无
                </div>
              </div>
              <div class="flexStart marginT">
                <div>住宿信息：</div>
                <div v-if="Rdata.house.length">
                  <p class="marginTop" v-for="(item,index) in Rdata.house"> 
                    <span>{{item.title}}</span>
                    <span class="marginLeft"></span>
                    <span>房数<i class="el-icon-close"></i>{{item.num}}</span>
                    <span class="marginLeft"></span>
                    <span>总额￥&nbsp;{{item.price}}</span>
                  </p>
                </div>
                <div v-if="!Rdata.house.length">无</div>
              </div>
               <hr class="lineS">
               <div v-if="type != '3'" class="flexStart">
                  <div>游客信息：</div>
                  <div v-if="Rdata.person.length">
                    <p class="marginTop" v-for="(item,index) in Rdata.person"> 
                      <span>{{item.name}}</span>
                      <span class="marginLeft"></span>
                      <span>联系电话：{{item.mobile}}</span>
                    </p>
                  </div>
                  <div v-if="!Rdata.person.length">无</div>
               </div>
               <div class="flexStart marginT">
                  <div>用户电话：</div>
                  <div>
                    {{Rdata.user.mobile?Rdata.user.mobile:'无'}}
                  </div>
               </div>
               <div v-if="Rdata.is_refund == 1 || type == '3'">
                 <hr class="lineS">
                <div  class="refundFlex">
                    <div>
                      <b>退款方式：</b>
                    </div>
                    <div>
                      <b>{{Number( Rdata.refund_total_price) == Number(Rdata.total_price)?'全款':'非全款'}}</b>
                    </div>
                  </div>
                  <div  class="refundFlex">
                    <div>
                      <b>退款人数：</b>
                    </div>
                    <div>
                      <div  v-for="(item,index) in Rdata.refund_detail">
                        <div v-if="item.type == '0'">
                          <div class="marginTop">标准{{item.adult}}人<span class="marginLeft"></span>儿童{{item.kids}}人<span class="marginLeft"></span>¥{{item.price}}</div>
                        </div>
                      </div>
                      <div>

                      </div>
                    </div>
                   
                  </div>
                  <div  class="refundFlex">
                    <div>
                      <b>退订套餐：</b>
                    </div>
                    <div v-if="Rdata.refund_detail.length">
                      <div class="marginTop" v-for="(item,index) in Rdata.refund_detail">
                        <div v-if="item.type == '1'||item.type == '2'">
                          {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
                        </div>
                      </div>
                    </div>
                    <div v-if="!Rdata.refund_detail.length">
                      无
                    </div>
                  </div>
                  <div  class="refundFlex">
                    <div>
                      <b>退订住宿：</b>
                    </div>
                    <div v-if="Rdata.refund_detail.length">
                      <div  v-for="(item,index) in Rdata.refund_detail">
                        <div class="marginTop" v-if="item.type == '3'">
                          {{item.name}}<span class="marginLeft"></span>房数X{{item.house_num}}	<span class="marginLeft"></span>总额¥{{item.price}}
                        </div>
                      </div>
                    </div>
                    <div v-if="!Rdata.refund_detail.length">
                      无
                    </div>
                  </div>
                  <div v-if="type == '3'" class="refundFlex">
                    <div>
                      <b>退款原因：</b>
                    </div>
                    <div>
                      {{Rdata.refund_reason}}
                    </div>
                  </div>
               </div>
                
               <hr class="lineS">
                <div v-if="type == '1'">
                  <p>支付状态&nbsp;&nbsp;&nbsp;<span style="color:#F73D3D">已支付</span></p>
               </div>
               <div class=" marginT">
                 <p>支付总额&nbsp;&nbsp;&nbsp;￥{{Rdata.total_price}}</p>
               </div>
                <div class=" marginT" v-if="Rdata.is_differ">
                  <p>返差价退款&nbsp;&nbsp;&nbsp;￥{{Rdata.differ_total_price?Rdata.differ_total_price:0}}</p>
                </div>
               <div  v-if="type == 3||type == 4" class="marginT">
                 <p>申请退款&nbsp;&nbsp;&nbsp;￥{{Rdata.refund_audit_price?Rdata.refund_audit_price:0}}</p>
               </div>
               <div class=" marginT" v-if="type == 3 || Rdata.is_refund == 1 || type == 4">
                 <p>实际退款&nbsp;&nbsp;&nbsp;<span style="color:#F73D3D">￥{{Rdata.refund_total_price?Rdata.refund_total_price:0}}</span></p>
               </div>
               <div class=" marginT">
                 <p>实际支付&nbsp;&nbsp;&nbsp;<span style="color:#F73D3D">￥{{Number( Rdata.total_price) - Number(Rdata.refund_total_price?Rdata.refund_total_price:0) - Number(Rdata.differ_total_price?Rdata.differ_total_price:0)}}</span></p>
               </div>
               <div class="marginT">
                 <p>{{type == '3'?'申请时间':'下单时间'}}&nbsp;&nbsp;&nbsp;{{Rdata.create_time}}</p>
               </div>
               <div class="marginT">
                 <p>订单编号&nbsp;&nbsp;&nbsp;{{Rdata.order_no}}</p>
               </div>
               <hr class="lineS">
               <div class="flexEnd">
                  <!-- <div v-if="type == 3">
                    <div style="display:flex;justify-content:flex-start;margin: 5px 0;">
                      <span><b>退款总额</b></span>
                      <div style="width:70px;color:#008489;margin-left:10px;"><b>￥{{Rdata.total_price}}</b></div>
                    </div>
                    <div style="margin-bottom: 20px;color:#008489"><p>(退款原因:{{Rdata.refund_reason}})</p></div>
                  </div> -->
                    <div v-if="type == 3 && Rdata.status == 0 && Rdata.audit == 0">
                        <el-button size="mini" @click="agreeOrder" style="width:120px;border:1px solid rgba(102,102,102,1);">同意</el-button>
                        <el-button size="mini" @click="toRefuse" style="width:120px;border:1px solid rgba(102,102,102,1);">拒绝</el-button>
                      <el-button size="mini" @click="Modify" style="width:120px;border:1px solid rgba(102,102,102,1);">退一部分</el-button>
                    </div>
                    <div v-if="type == 2 && Rdata.status == 0">
                      <el-button size="mini" @click="contact"  style="width:120px;border:1px solid rgba(102,102,102,1);">私信</el-button>
                      <el-button size="mini" @click="changeOrder" style="width:120px;border:1px solid rgba(102,102,102,1);">修改订单金额</el-button>
                    </div>
                  
                  <div v-if="type == 1 && Rdata.status == 0 ">
                    <el-button size="mini" @click="contact" style="width:120px;border:1px solid rgba(102,102,102,1);">私信</el-button>
                    <el-button size="mini" @click="changeErollA" style="width:120px;border:1px solid rgba(102,102,102,1);">主动退款</el-button>
                  </div>
                  
                  <div v-if="Rdata.status != 0" >
                    <el-button size="mini" v-if="Rdata.audit == 1" type="primary" >已同意</el-button>
                    <el-button size="mini" v-if="Rdata.audit == 2" type="primary" >已拒绝</el-button>
                  </div>
                  <div v-if="Rdata.status == 0 && Rdata.audit != 0" >
                    <el-button size="mini" v-if="Rdata.audit == 1" type="primary" >已同意</el-button>
                    <el-button size="mini" v-if="Rdata.audit == 2" type="primary" >已拒绝</el-button>
                  </div>
                  <div v-if="type == 4">
                    <div style="display:flex;justify-content:flex-end;margin: 15px 0;">
                      <span><b>支付总额</b></span>
                      <div style="width:70px;color:#008489;margin-left:50px;"><b>￥{{Rdata.total_price}}</b></div>
                    </div>
                    <div>
                      <el-button size="mini" @click="Rdata.isevaluate_planner == 1? toRevalution():''" style="width:120px;border:1px solid rgba(102,102,102,1);">{{Rdata.isevaluate_planner == 1? '评价他':'已评价'}}</el-button>
                    </div>
                  </div>
               </div>
               
            <!-- <div style="margin: 20px 0;padding: 25px 15px;background-color:#FBFBFB">
                <div class="refundFlex">
                    <div style="line-height:48px;">
                        <b>预定用户</b>
                    </div>
                    <div style="display:flex;justify-content:flex-start;margin-left:20px;align-items:center">
                        <div>
                            <img :src="Rdata.user.head_image?Rdata.user.headimage.domain+Rdata.user.headimage.image_url:'../../../static/img/static/user.png'" style="width:48px;height:48px;border-radius:50%;">
                        </div>
                        <div style="margin-left:10px;line-height:48px;">
                            <b>{{Rdata.user.family_name+Rdata.user.middle_name+Rdata.user.name?Rdata.user.family_name+Rdata.user.middle_name+Rdata.user.name:'匿名用户'}}</b>
                        </div>
                      <div v-if="Rdata.is_refund" style="margin-left:20px;color:#008489">
                        ({{Rdata.is_refund == 1? '有退款':''}})
                      </div>
                    </div>
                </div>
                <div v-if="type == 4" class="refundFlex">
                  <div>
                    <b>参与活动:</b>
                  </div>
                  <div style="display: flex;justify-content: flex-start;margin-left:15px;">
                    <img :src="Rdata.cover_image? Rdata.cover.domain+Rdata.cover.image_url:''" style="width:150px;height:100px">
                    <span style="margin-left:10px;"><b>{{Rdata.title}}</b></span>
                  </div>
                </div>
                <div v-if="type == 3" class="refundFlex">
                  <div>
                    <b>预定住宿</b>
                  </div>
                  <div style="display:flex;justify-content:flex-start;margin-left:20px;">
                    <div v-if="Rdata.order_house.length" v-for="item in Rdata.order_house" style="display:flex;justify-content:flex-start;margin-right:15px;">
                      <div style="position:relative">
                        <LoadinImg :src="item.domain + item.image_url"  type="3" style="width:100px;height:70px;overflow: hidden"></LoadinImg>
                        <span style="position:absolute;bottom: 2px;right:0;padding: 1px 5px;background-color: rgba(0,0,0,.5);color:#fff;font-size:12px;">
                          {{item.flag == 1?'露营':item.flag == 2?'民宿':'酒店'}}
                        </span>
                      </div>
                      <div style="margin-left:10px;font-size:12px;">
                        <p>{{item.title}}</p>
                        <p style="margin: 10px 0;">可住({{item.max_person}})人</p>
                        <p><span>房数:{{item.num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
                      </div>
                    </div>
                    <div v-if="!Rdata.house.length">
                      <b>无</b>
                    </div>
                  </div>
                </div>
                <div class="refundFlex">
                    <div>
                        <b>参与人数</b>
                    </div>
                    <div style="margin-left:20px;">
                        <b>{{Rdata.num}}人</b>
                    </div>
                </div>
                <div v-if="type == 3" class="refundFlex">
                  <div>
                    <b>支付总额</b>
                  </div>
                  <div style="margin-left:20px;">
                    <b>￥{{Rdata.order_total_price}}</b>
                  </div>
                </div>
                 <div  class="refundFlex">
                    <div>
                        <b>{{type == 4?'参与时间':'预定时间'}}</b>
                    </div>
                    <div style=margin-left:20px;>
                        <b>{{Rdata.activ_begin_time}}</b>
                        <b>-</b>
                        <b>{{Rdata.activ_end_time}}</b>
                    </div>
                </div>
                <div v-if="type == 3" class="refundFlex">
                  <div>
                    <b>退款方式</b>
                  </div>
                  <div style=margin-left:20px;>
                    <b>{{Rdata.flag == 1?'全款':'非全款'}}</b>
                  </div>
                </div>
                <div v-if="type == 3" class="refundFlex">
                  <div>
                    <b>退款人数</b>
                  </div>
                  <div style=margin-left:20px;>
                    <b>{{Rdata.person_num}}人</b>
                  </div>
                </div>
              <div v-if="type != 3" class="refundFlex">
                <div>
                  <b>预定住宿</b>
                </div>
                <div style="display:flex;flex-direction:column;margin-left:20px;">
                  <div v-if="Rdata.house.length" v-for="item in Rdata.house" style="display:flex;justify-content:flex-start;margin-bottom: 15px;">
                    <div style="position:relative">
                      <LoadinImg :src="item.image.length?item.image[0].domain + item.image[0].image_url:''"   type="3" style="width:100px;height:70px;overflow: hidden"></LoadinImg>
                      <span style="position:absolute;bottom: 2px;right:0;padding: 1px 5px;background-color: rgba(0,0,0,.5);color:#fff;font-size:12px;">
                                {{item.acthouse.flag == 1?'露营':item.acthouse.flag == 2?'民宿':'酒店'}}
                      </span>
                    </div>
                    <div style="margin-left:10px;font-size:12px;">
                      <p><b>{{item.title}}</b></p>
                      <p style="margin: 10px 0;">可住{{item.max_person}}人</p>
                      <p><span>房数:{{item.num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
                    </div>
                  </div>
                  <div v-if="!Rdata.house.length">
                    <b>无</b>
                  </div>
                </div>
              </div>
              <div v-if="type != 3 && Rdata.is_refund" class="refundFlex">
                <div>
                  <b>退款方式</b>
                </div>
                <div style=margin-left:20px;>
                  <b>非全款</b>
                </div>
              </div>
              <div v-if="type != 3 && Rdata.is_refund" class="refundFlex">
                <div>
                  <b>退款人数</b>
                </div>
                <div style=margin-left:20px;>
                  <b>{{Rdata.refund_num}}人</b>
                </div>
              </div>
              <div v-if="type != 3 && Rdata.is_refund" class="refundFlex">
                <div>
                  <b>退款住宿</b>
                </div>
                <div style="display:flex;flex-direction:column;margin-left:20px;">
                  <div v-if="Rdata.house.length" v-for="item in Rdata.house" style="display:flex;justify-content:flex-start;margin-bottom: 15px;">
                    <div style="position:relative">
                      <LoadinImg :src="item.image.length?item.image[0].domain + item.image[0].image_url:''"   type="3" style="width:100px;height:70px;overflow: hidden"></LoadinImg>
                      <span style="position:absolute;bottom: 2px;right:0;padding: 1px 5px;background-color: rgba(0,0,0,.5);color:#fff;font-size:12px;">
                                {{item.acthouse.flag == 1?'露营':item.acthouse.flag == 2?'民宿':'酒店'}}
                      </span>
                    </div>
                    <div style="margin-left:10px;font-size:12px;">
                      <p><b>{{item.title}}</b></p>
                      <p style="margin: 10px 0;">可住{{item.max_person}}人</p>
                      <p><span>房数:{{item.refund_num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
                    </div>
                  </div>
                  <div v-if="!Rdata.house.length">
                    <b>无</b>
                  </div>
                </div>
              </div>
              <div v-if="type == 3" class="refundFlex">
                <div>
                  <b>退款住宿</b>
                </div>
                <div style="display:flex;flex-direction:column;margin-left:20px;">
                  <div v-if="Rdata.house.length" v-for="item in Rdata.house" style="display:flex;justify-content:flex-start;margin-bottom: 15px;">
                    <div style="position:relative">
                      <LoadinImg :src="item.domain + item.image_url"  type="3" style="width:100px;height:70px;overflow: hidden"></LoadinImg>
                      <span style="position:absolute;bottom: 2px;right:0;padding: 1px 5px;background-color: rgba(0,0,0,.5);color:#fff;font-size:12px;">
                                {{item.flag == 1?'露营':item.flag == 2?'民宿':'酒店'}}
                              </span>
                    </div>
                    <div style="margin-left:10px;font-size:12px;">
                      <p><b>{{item.title}}</b></p>
                      <p style="margin: 10px 0;">可住{{item.max_person}}人</p>
                      <p><span>房数:{{item.house_num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
                    </div>
                  </div>
                  <div v-if="!Rdata.house.length">
                    <b>无</b>
                  </div>
                </div>
              </div>
                <div v-if="type != 4 && Rdata.user.mobile || Rdata.reason && type != 4" class="refundFlex">
                    <div>
                        <b>{{type == 3?'其他原因':'联系电话'}}</b>
                    </div>
                    <div style=margin-left:20px;>
                        <b>{{type == 3?Rdata.reason:Rdata.user.mobile}}</b>
                    </div>
                </div>
                 <div class="refundFlex">
                    <div>
                        <b>{{type == 3? '申请时间':'下单时间'}}</b>
                    </div>
                    <div style=margin-left:20px;>
                      <b>{{Rdata.create_time}}</b>
                    </div>
                </div>
            </div>
            <div style="text-align:right;margin-top:20px;">
              <div v-if="type == 2">
                <div style="display:flex;justify-content:flex-end">
                  <span><b>支付状态</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>未支付</b></div>
                </div>
                <div style="margin: 15px 0;">
                  <span><b>需支付金额</b></span>
                  <span style="color:#008489;margin-left:50px;"><b>￥{{Rdata.total_price}}</b></span>
                </div>
              </div>
              <div v-if="type == 1">
                <div style="display:flex;justify-content:flex-end">
                  <span><b>支付状态</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>已支付</b></div>
                </div>
                <div style="margin: 15px 0;display:flex;justify-content:flex-end">
                  <span><b>支付总额</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>￥{{Rdata.total_price}}</b></div>
                </div>
                <div v-if="Rdata.is_refund" style="display:flex;justify-content:flex-end;margin: 15px 0;">
                  <span><b>退款总额</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>￥{{Rdata.refund_total_price}}</b></div>
                </div>
              </div>
              <div v-if="type == 3">
                <div style="display:flex;justify-content:flex-end;margin: 15px 0;">
                  <span><b>退款总额</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>￥{{Rdata.total_price}}</b></div>
                </div>
                <div style="margin-bottom: 20px;color:#008489"><p>(退款原因:{{Rdata.reason}})</p></div>
              </div>
              <div v-if="type == 3 && Rdata.status == 0 && Rdata.audit == 0">
                  <el-button size="mini" @click="agreeOrder" style="width:120px;border:1px solid rgba(102,102,102,1);">同意</el-button>
                  <el-button size="mini" @click="toRefuse" style="width:120px;border:1px solid rgba(102,102,102,1);">拒绝</el-button>
                 <el-button size="mini" @click="Modify" style="width:120px;border:1px solid rgba(102,102,102,1);">退一部分</el-button>
              </div>
              <div v-if="type == 2 && Rdata.status == 0">
                <el-button size="mini" @click="contact"  style="width:120px;border:1px solid rgba(102,102,102,1);">私信</el-button>
                <el-button size="mini" @click="changeOrder" style="width:120px;border:1px solid rgba(102,102,102,1);">修改订单金额</el-button>
              </div>
              <div v-if="type == 1 && Rdata.status == 0 ">
                <el-button size="mini" @click="contact" style="width:120px;border:1px solid rgba(102,102,102,1);">私信</el-button>
                <el-button size="mini" @click="changeErollA" style="width:120px;border:1px solid rgba(102,102,102,1);">退款</el-button>
              </div>
              <div v-if="Rdata.status != 0" >
                <el-button size="mini" v-if="Rdata.audit == 1" type="primary" >已同意</el-button>
                <el-button size="mini" v-if="Rdata.audit == 2" type="primary" >已拒绝</el-button>
              </div>
              <div v-if="Rdata.status == 0 && Rdata.audit != 0" >
                <el-button size="mini" v-if="Rdata.audit == 1" type="primary" >已同意</el-button>
                <el-button size="mini" v-if="Rdata.audit == 2" type="primary" >已拒绝</el-button>
              </div>
              <div v-if="type == 4">
                <div style="display:flex;justify-content:flex-end;margin: 15px 0;">
                  <span><b>支付总额</b></span>
                  <div style="width:70px;color:#008489;margin-left:50px;"><b>￥{{Rdata.total_price}}</b></div>
                </div>
                <div>
                  <el-button size="mini" @click="Rdata.isevaluate_planner == 1? toRevalution():''" style="width:120px;border:1px solid rgba(102,102,102,1);">{{Rdata.isevaluate_planner == 1? '评价他':'已评价'}}</el-button>
                </div>
              </div>
            </div> -->
        </div>
        <div v-show="isPrice" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(0,0,0,.5);display: flex;align-items: center;justify-content: center">
          <div v-if="alerIndex == 'remake'" style="background-color: #fff;padding: 20px;width:400px;">
            <div style="display: flex;justify-content: space-between">
              <p>您正在退还一部分金额给顾客！</p>
              <i @click="isPrice = false" style="font-size:20px;cursor: pointer" class="el-icon-close"></i>
            </div>
            <div style="display: flex;justify-content: flex-start;margin: 20px 0;">
              <div style="line-height: 40px;">
                <b>输入退款金额:</b>
              </div>
              <div style="margin-left:10px;">
                <el-input placeholder=" 请输入价格" v-model="price"></el-input>
              </div>
            </div>
            <div>
              <el-button @click="checkPrice" type="primary" style="width:100%;">确定</el-button>
            </div>
          </div>
          <div v-if="alerIndex == 'refused'" style="background-color: #fff;padding: 20px;width:400px;">
            <div style="display: flex;justify-content: space-between">
              <p>您正在拒绝用户退款申请！</p>
              <i @click="isPrice = false" style="font-size:20px;cursor: pointer" class="el-icon-close"></i>
            </div>
            <div style="display: flex;justify-content: flex-start;margin: 20px 0;">
              <div style="line-height: 40px;">
                <b>输入您的原因:</b>
              </div>
              <div style="margin-left:10px;">
                <el-input placeholder=" 请输入原因" type="textarea" style="width:280px" autosize v-model="reason"></el-input>
              </div>
            </div>
            <div>
              <el-button @click="refused" type="primary" style="width:100%;">确定</el-button>
            </div>
          </div>
          <div v-if="alerIndex == 'changeMoney'" style="background-color: #fff;padding: 20px;width:400px;">
            <div style="display: flex;justify-content: space-between">
              <p>您正在修改订单金额！</p>
              <i @click="isPrice = false" style="font-size:20px;cursor: pointer" class="el-icon-close"></i>
            </div>
            <div style="display: flex;justify-content: flex-start;margin: 20px 0;">
              <div style="line-height: 40px;">
                <b>输入您修改的金额:</b>
              </div>
              <div style="margin-left:10px;">
                <el-input placeholder=" 请输入价格" v-model="price"></el-input>
              </div>
            </div>
            <div>
              <el-button @click="changeMoney" type="primary" style="width:100%;">确定</el-button>
            </div>
          </div>
        </div>
      <Chat v-if="isChat" v-on:chat="chat" :userUrl="imgUrl" :to_user_id="to_user_id" :isOwer="userid" :userName="userName" :other_img="other_img"></Chat>
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
    </div>
</template>
<script>
  import LoadinImg from '../../public/loadingImg'
  import Chat from '../../public/chat'
import Head from '../../public/head'
export default {
    name: 'refundDescirbe',
    data(){
        return{
          api: this.GLOBAL.baseURL,
          house:[],
          type:'',
          order_id:'',
          Rdata:'',
          price:'',
          isPrice:false,
          alerIndex:'',
          reason:'',
          imgUrl:'',
          userid:'',
          to_user_id:'',
          userName:'',
          other_img:'',
          isChat:false,
          isdiscus:false,
          content:'',
          wherIndex:''
        }
    },
    components:{
        Head,
      Chat,
      LoadinImg
    },
    methods:{
      closeDiscus(){
        this.isdiscus = false
        this.content = ''
      },
      changeOrder(){
        this.isPrice = !this.isPrice
        this.alerIndex = 'changeMoney'
      },
      changeMoney(){
        this.$http.post(this.api + '/PriceU',{
          token: localStorage.getItem('token'),
          order_id: this.order_id,
          total_price: this.price
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.isPrice = false
              this.getOrder()
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                   localStorage.setItem('token',res.data.data)
                  this.changeMoney()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      goBack(){
        if(this.wherIndex){
          this.$router.go(-1)
          this.$router.push({
            path: '/myPlay',
            query:{
              chooseIndex: this.wherIndex
            }
          })
        }else{
          this.$router.go(-1)
        }
      },
      getRefunc(){
        this.$http.post(this.api + '/RefundDTwo',{
          token: localStorage.getItem('token'),
          refund_id: this.order_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.Rdata = res.data.data
    
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getRefunc()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      //同意
      agreeOrder(){
        if(this.type == 3){
          this.$confirm('此操作将退还用户已支付金额!, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.agreeInformation()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      agreeInformation(){
        this.$http.post(this.api + '/AgreeRefund',{
          token: localStorage.getItem('token'),
          refund_id: this.order_id,
          type: 1,
          return_price: this.Rdata.total_price
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '退款成功！'
              })
              this.isPrice = false
              this.getRefunc()
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.agreeInformation()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      //拒绝
      refused(){
        if(this.type == 3){
          if(!this.reason){
            this.$message({
              type: 'info',
              message: '请输入您拒绝理由！'
            })
          }else{
            this.$http.post(this.api + '/AgreeRefund',{
              token: localStorage.getItem('token'),
              refund_id: this.order_id,
              type: 2,
              refuse_reason: this.reason
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message:'您已拒绝退款申请!'
                  })
                  this.isPrice = false
                  this.isPrice = false
                  this.getRefunc()
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.refused()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        }
      },
      //退款
      changeErollA(){
        this.$router.push({
          path:'/playerReturn',
          query:{
            information: this.order_id
          }
        })
      },
      //修改
      Modify(){
        this.isPrice = !this.isPrice
        this.alerIndex = 'remake'
      },
      checkPrice(){
        this.$confirm('此操作将退给用户您输入的金额!, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendPrice()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      sendPrice(){
        this.$http.post(this.api + '/AgreeRefund',{
          token: localStorage.getItem('token'),
          refund_id: this.order_id,
          return_price: this.price,
          type:1
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '退款成功！'
              })
              this.isPrice = false
              this.getRefunc()
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendPrice()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      toRefuse(){
        this.isPrice = !this.isPrice
        this.alerIndex = 'refused'
      },
      getOrder(){
        this.$http.post(this.api + '/OrderDTwo',{
          token: localStorage.getItem('token'),
          order_id: this.order_id,
          verson:2.0
        })
          .then(res=>{
            if(res.data.code == 1){
              this.Rdata = res.data.data
        
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getOrder()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      //评价
      toRevalution(){
        this.userName = this.Rdata.user.family_name+ this.Rdata.user.middle_name+ this.Rdata.user.name
        this.isdiscus = !this.isdiscus
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
                this.isdiscus = false
                this.getOrder()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.saveDiscuss()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      contact(){

        this.isChat = true
        this.to_user_id = this.Rdata.user.user_id
        this.userName = this.Rdata.user.family_name+this.Rdata.user.middle_name+this.Rdata.user.name?this.Rdata.user.family_name+this.Rdata.user.middle_name+this.Rdata.user.name:'匿名用户'
        this.other_img = this.Rdata.user.head_image?this.Rdata.user.headimage.domain+this.Rdata.user.headimage.image_url:'../../../static/img/static/user.png'
      },
      chat(){
        this.isChat = false
      }
    },
  mounted(){
      if(this.type == '3'){
        this.getRefunc()
      }else{
          this.getOrder()
      }
 
  },
    created(){
      if(localStorage.getItem('userImg')){
        this.imgUrl = localStorage.getItem('userImg')
      }else{
        this.imgUrl = '../../../static/img/static/user.png'
      }
      this.type = this.$route.query.type
      this.order_id = this.$route.query.information
      this.wherIndex = this.$route.query.index
    }
}
</script>
<style scoped>
.refundFlex{
    margin: 25px 0;
    display: flex;
    justify-content: flex-start;
}
.marginT{
  margin-top: 25px;
}
.lineS{
  margin: 32px 0;
	border:none;
	border-top:1px solid #DFE1E4;
}
</style>
