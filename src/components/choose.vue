<template>
    <div>
        <Head type="choose" v-on:reload="reload"></Head>
        <div style="width:80%;margin: 80px 10%;display: flex;justify-content: flex-start">
          <div  style="width:50%;min-width:500px;text-align:left">
            <div @click="toBack" style="width:50px;cursor: pointer"><i class="el-icon-arrow-left"></i>返回</div>
            <div style="padding: 20px 50px">
              <h1>确认并支付</h1>
              <p>您可以将更多好友添加为此体验的参与者，然后确认预订。</p>
              <p>可接待年满{{age_limit}}周岁及以上的参与者。</p>
              <h1>还有谁一起参加？</h1>
              <h3>参与者人数</h3>
              <!--人数预定-->
              <el-button style="width:300px" @click="pick(1)">
                <div style="display: flex;justify-content: space-between"><span style="padding: 5px" :style="{'background-color': personNumber == 1? 'none':'#008489','color':personNumber == 1? 'none':'#fff'}">{{personNumber}}位游客</span><span style="padding:5px"><i :class="classa"></i></span></div>
              </el-button>
              <div style="width:280px;background-color:#fff;padding: 10px" v-show="isAdd" class="animated fadeInDown">
                <div style="display: flex;justify-content: space-between;margin:10px 0 ;" v-for="(item,index) in otherList">
                  <div><b>{{item.person}}</b></div>
                  <div>
                    <el-button icon="el-icon-minus" size="mini" circle @click="reduce(item,index)" :disabled="index ==0?  item.adult ==1? true:false:item.adult ==0? true:false"></el-button>
                    <span style="margin:0 10px">{{item.adult}}</span>
                    <el-button icon="el-icon-plus" size="mini" circle @click="add(item,index)"  :disabled="personNumber == numlast? true:addClick"></el-button>
                  </div>
                </div>
              </div>
              <!---->
              <p>此体验<b>只剩下{{numlast}}个名额</b>了，记得尽快预订哦。</p>
              <h3>参与者详细资料</h3>
              <p>输入的信息将用于添加此预订的参与者。</p>
              <div style="border-top:1px solid #eee;border-bottom: 1px solid #eee;padding:10px 0;">
                <div style="display: flex;justify-content: space-between;">
                  <div style="line-height:52px;">
                    <span>{{user?user:'匿名用户'}}</span><span style="margin-left:20px;">{{userF}}</span>
                  </div>
                  <div>
                    <img :src="userImg? userImg: '../../../static/img/static/user.png'" width="48px" height="48px" style="border-radius: 50%">
                  </div>
                </div>
                <div v-for="(item,index) in form.person" style="display: flex;justify-content: space-between;margin:20px 0;font-size:14px;">
                  <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;max-width:90px;min-width: 50px;">
                    <span>{{item.name}}</span>
                  </div>
                  <div v-show="item.mobile">
                    <span>电话：<span >{{item.mobile}}</span></span>
                  </div>
                  <div v-show="item.idcard">
                    <span>身份证：{{item.idcard}}</span>
                  </div>
                  <div>
                    <i @click="deletPerson(item,index)" style="color:red;cursor: pointer" class="el-icon-remove"> </i>
                  </div>
                </div>
              </div>
              <p @click="addperson = true" style="color:#008489;cursor: pointer;font-size:15px;"><i class="el-icon-plus"></i>添加新旅客</p>
              <h1>付款方式</h1>
              <p><b>付款方式：</b></p>
              <div  style="width:100%;border:1px solid #008489;position:relative;overflow: hidden;transition:height 1s;" :style="{'height':height}">
                <div v-show="a" style="width:100%;height:200px;position:absolute;z-index:999" :style="{'margin-top':marginTop}">
                  <div  v-for="(item,index) in paymentList" style="width:94%;height:50px;line-height:50px;display: flex;justify-content: space-between;padding:0 2%;" @click="remove(index)">
                    <div>
                      <span><i :class="item.styleHead"></i></span><span style="margin-left:10px">{{item.mess}}</span>
                    </div>
                    <div style="text-align:right">
                      <span><i v-show="chooseIndex == index? true:false" :class="item.check" style="color:#008489;font-weight:bold;font-size: 18px;"></i></span></div>
                    </div>
                </div>
                <div v-show="b" style="width:500px;height:200px;position:absolute;">
                  <div v-for="(item,index) in paymentList" style="width:94%;height:50px;line-height:50px;display: flex;justify-content: space-between;padding:0 2%;" @click="pay(index)" >
                    <div>
                      <span><i :class="item.styleHead"></i></span><span style="margin-left:10px">{{item.mess}}</span>
                    </div>
                    <div style="text-align:right">
                      <span v-show="chooseIndex == index? true:false"><i :class="item.check" style="color:#008489;font-weight:bold;font-size:18px;"></i></span></div>
                  </div>
                </div>
              </div>
              <div v-if="payIndex == 1" style="width:500px;margin-top:50px">
                <p>通过安全链接前往支付宝完成添加</p>
                <form :model="form" id="form" :action="api + '/orderadd'" @submit=" check" method="get">
                  <input name="token" type="hidden" v-model="form.token">
                  <input name="activity_id" type="hidden" v-model="form.activity_id">
                  <input name='num' type="hidden" v-model="form.num">
                  <input name="slot_id" type="hidden" v-model="form.slot_id">
                  <input name="pay_type" type="hidden" v-model="form.pay_type">
                  <input name="isstay" type="hidden" v-model="form.isstay">
                  <input name="is_book_whole" type="hidden" v-model="form.is_book_whole">
                  <input name="balance" type="hidden" v-model="form.balance">
                  <button type="submit"  style="width:168px;padding:10px 20px;background-color:#008489;color:#fff;border:1px solid #008489;text-align:center;border-radius:5px;cursor: pointer">确认并支付</button>
                </form>
              </div>
              <div v-if="payIndex == 2" style="width:500px;margin-top:50px">
                <p>通过安全链接前往微信完成添加</p>
                <el-button type="primary" plain @click="alipay(1)">确认并支付</el-button>
              </div>
              <div v-if="payIndex == 3" style="width:500px;margin-top:50px">
                <el-form :model="creditCard">
                  <div style="display: flex;justify-content: space-between">
                    <el-form-item label="名字">
                      <el-input v-model="creditCard.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓氏">
                      <el-input v-model="creditCard.surnames"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="信用卡信息" class="information">
                    <el-input v-model="creditCard.information" :placeholder="creditCard.prompt"></el-input>
                    <div style="display: flex;justify-content: space-between">
                      <el-input v-model="creditCard.overTime" :placeholder="creditCard.timePrompt"></el-input>
                      <el-input v-model="creditCard.saveNumber" placeholder="安全码"></el-input>
                    </div>
                  </el-form-item>
                  <div style="display: flex;justify-content: space-between">
                    <el-form-item label="街道信息">
                      <el-input v-model="creditCard.street"></el-input>
                    </el-form-item>
                    <el-form-item label="门牌号">
                      <el-input v-model="creditCard.houseNumber"></el-input>
                    </el-form-item>
                  </div>
                  <div style="display: flex;justify-content: space-between">
                    <el-form-item label="城市">
                      <el-input v-model="creditCard.city"></el-input>
                    </el-form-item>
                    <el-form-item label="州/省">
                      <el-input v-model="creditCard.state"></el-input>
                    </el-form-item>
                  </div>
                  <div style="display: flex;justify-content: space-between">
                    <el-form-item label="邮政编码">
                      <el-input v-model="creditCard.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="国家" >
                      <el-select v-model="creditCard.country" placeholder="请选择" style="margin:0 0;width:202px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-form>
                <p style="color:#008489;cursor: pointer" @click="Voucher = true">添加新的礼金券</p>
                <div v-show="Voucher" style="display: flex;justify-content: flex-start">
                  <el-input v-model="giftVoucher" style="width:300px;margin-right:20px"></el-input> <el-button type="primary"  plain @click="Voucher = false">取消</el-button>
                </div>
                <p>如果您以中国居民的身份预订中国的体验，您的信息将会与爱彼迎中国共享。 中国政府部门可能会要求爱彼迎中国披露与中国的体验相关的体验达人资料和参与者资料。
                  了解更多。 您还同意体验参与者免责声明、退订政策和体验参与者退款政策。</p>
                <div style="width:200px;padding: 10px 20px;background-color:rgb(255, 90, 95);color:#fff;border-radius: 5px;text-align:center;font-weight:bold;font-size:20px;cursor: pointer;">确认并支付</div>
              </div>
            </div>
          </div>
          <!-- 右边-->
          <div style="min-width:300px;width:30%;margin-left:20px;height:800px;margin-top:50px;border:1px solid #eee;padding:20px;text-align: left;">
              <div style="display: flex;justify-content: space-between">
              <div>
                <h3>{{dataTile}}</h3>
              </div>
              <div style="margin-left:20px;">
                <img :src="dataImg" width="200px" height="150px" style="margin-top:20px" >
              </div>
            </div>
            <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            <div v-if="activeList.day">
              <div>
                <p>{{activeList.day}}&nbsp;&nbsp;| {{weekDay}}</p>
                <p>{{activeList.list.time[0]}} − {{activeList.list.time[1]}}</p>
              </div>
              <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
              <div>
                <span>￥{{activeList.list.price}}</span><span><i class="el-icon-close"></i>{{personNumber}}位参与者</span>
                <span style="float:right">￥{{(activeList.list.price * personNumber).toFixed(2)}}</span>
              </div>
            </div>
            <div v-if="activeList.beginTime">
              <div>
                <p>{{activeList.beginTime}}—{{activeList.endTime}}&nbsp;&nbsp;</p>
                <p>{{activeList.begin_time}} − {{activeList.end_time}}</p>
              </div>
              <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
              <div>
                <span>￥{{activeList.price}}</span><span><i class="el-icon-close"></i>{{personNumber}}位参与者</span>
                <span style="float:right">￥{{(activeList.price * personNumber).toFixed(2)}}</span>
              </div>
            </div>
            <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            <div v-show="house.length">
              <div v-for="(item,index) in house" v-show="index < house.length -1 " :key="index" style="display: flex;justify-content: space-between;">
                <p style="font-size:15px;">住宿 &nbsp;&nbsp; <span>{{item.houseType}}&nbsp;|&nbsp;<span>￥</span>{{item.price}}</span>/晚</p>
                <p style="font-size:15px;"><i style="font-size:15px;" class="el-icon-close"></i>{{item.number}}</p>
                <p style="font-size:15px;"><span>￥</span>{{(item.price * item.number).toFixed(2)}}</p>
              </div>
              <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            </div>
            <div v-if="book_whole">
              <div  style="display: flex;justify-content: space-between">
                <div>是否包场</div>
                <div  style="transition:width .5s;overflow: hidden;border-top-right-radius:20px;border-bottom-right-radius: 20px;border-top-left-radius: 20px;border-bottom-left-radius: 20px;" :style="{width:closeIndex?'70px':'70px',backgroundColor:closeIndex?'#008489':'#eee'}" @click="change">
                  <i v-if="closeIndex == 0"  style="font-size:30px;float:left" class="el-icon-circle-close-outline"></i>
                  <i v-if="closeIndex == 1" style="font-size:30px;background-color:#fff;border-radius:50%;color:#008489;float:right" class="el-icon-circle-check-outline"></i>
                </div>
              </div>
              <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            </div>
            <div>
              <div style="display: flex;justify-content: space-between">
                <div >
                  <p>基金抵扣</p>
                </div>
                <div>
                  <div style="border: 1px solid #008489;padding: 5px 0;">
                    <span style="padding: 0 10px;border-right:1px solid #008489">-</span>
                    <input type="number" @blur="chooseCheck()" v-model="jiJin"  style="width:40px;border:none;padding: 10px 0;">
                  </div>
                  <p style="font-size:12px;margin:0 0;color:#008489">(基金余额<span>{{due_balance}}</span>)</p>
                </div>
              </div>
              <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            </div>
            <div>
              <span>总价 (CNY)</span><span style="float:right"><span>￥</span>{{(allPrice)}}</span>
            </div>
            <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            <div>
              <h3>退订政策</h3>
              <p>{{return_policy == 0?'随时全额退款':return_policy == 1?'活动开始24小时前':'活动开始7天前'}}<span v-if="return_policy == 1||return_policy == 2">取消可全额退款</span></p>
            </div>
            <hr style="margin:20px 0;border:none;border-bottom: 1px solid #eee">
            <div>
              <h3>查看参与者预订条件</h3>
              <h3>年龄要求</h3>
              <p>可接待年满{{age_limit}}周岁及以上的参与者。</p>
            </div>
          </div>
        </div>
      <div v-show="isWeixin" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:999">
        <div style="position:fixed;top:50%;left:50%;width:360px;height:400px;background-color:#fff;border-radius: 10px;margin-top:-220px;margin-left:-200px;padding:20px;">
         <div v-if="isPay == 0">
           <div style="text-align: right">
             <i class="el-icon-close" style="font-size:25px;" @click="closeWx"></i>
           </div>
           <div style="width:240px;height:300px;margin: 0 auto;border-radius:5px;text-align: center;background-color: #fff;padding:20px;">
             <div style="display: flex;justify-content: flex-start;width:150px;margin:0 auto;">
               <div>
                 <i style="font-size:40px;color:green" class="iconfont icon-changyonglogo28"></i>
               </div>
               <div style="margin-left:20px;">
                 <span><b>微信支付</b></span><br>
                 <span style="font-size:15px;">WeChat Pay</span>
               </div>
             </div>
             <div style="margin:20px 0;" id="weixin"></div>
             <div>
               <p>用微信扫码付款</p>
             </div>
             <div style="display: flex;justify-content: space-between;">
               <span>-</span><span>方便</span><span>|</span><span>快捷</span><span>|</span><span>安全</span><span>-</span>
             </div>
           </div>
         </div>
          <div v-if="isPay == 1">
            <div style="display: flex;justify-content: space-between;" :style="{color: payStatus == 1?'green':'orangered'}">
              <div v-if="payStatus == 1" style="width:0px;height:0px;border-top:70px solid green;border-left:1px solid green;border-right:70px solid transparent;position: relative">
                <div style="transform:rotate(45deg);position:absolute;margin-top:-70px;right:-31px;font-family: 华文楷体;font-weight: bold;color:#fff; ">成功</div>
              </div>
              <div v-if="payStatus == 2" style="width:0px;height:0px;border-top:70px solid orangered;border-left:1px solid orangered;border-right:70px solid transparent;position: relative">
                <div style="transform:rotate(45deg);position:absolute;margin-top:-70px;right:-31px;font-family: 华文楷体;font-weight: bold;color:#fff; ">失败</div>
              </div>
              <div style="display: flex;justify-content: flex-start;padding:10px 0;">
                <div style="border-radius:5px;padding:0px 10px;">
                  <i style="font-size:45px;" :style="{color: payStatus == 1?'green':'orangered'}" class="iconfont icon-changyonglogo28"></i>
                </div>
                <div>
                  <span><b>微信支付</b></span><br>
                  <span style="font-size:15px;">WeChat Pay</span>
                </div>
              </div>
            </div>
            <div style="text-align: center">
              <p v-if="payStatus == 1"><i style="font-size:50px;color:green" class="el-icon-success"></i></p>
              <p v-if="payStatus == 2"><i style="font-size:50px;color:orangered" class="el-icon-error"></i></p>
              <p v-if="payStatus == 1" style="font-size:20px;"><b>您已支付成功</b></p>
              <p v-if="payStatus == 2" style="font-size:20px;color:orangered"><b>您支付已过期</b></p>
              <p v-if="payStatus == 1">欢迎预定Allptp体验项目，希望您体验愉快！</p>
              <p v-if="payStatus == 2" style="color:orangered">您的支付时间已过期，请重新支付！</p>
              <p v-if="payStatus == 1" style="font-size:15px;color:green">此订单已添加到您的交易中心！请您及时核实！</p>
              <p v-if="payStatus == 2" style="font-size:15px;color:orangered">此订单已添加到您的未完成订单！您可前往支付！</p>
              <div v-if="payStatus == 1" style="display: flex;justify-content: space-between;margin-top:50px;">
                <el-button @click="payClose" style="color:green"><i class="el-icon-arrow-left"></i>继续浏览</el-button>
                <el-button style="color:green">订单中心<i class="el-icon-arrow-right"></i></el-button>
              </div>
              <div v-if="payStatus == 2" style="display: flex;justify-content: space-between;margin-top:50px;">
                <el-button @click="payClose" style="color:orangered;border:1px solid orangered"><i class="el-icon-arrow-left"   ></i>重新提交</el-button>
                <el-button style="color:orangered;border:1px solid orangered">前往支付<i class="el-icon-arrow-right"></i></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="addperson" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:999">
        <div style="position:fixed;top:50%;left:50%;width:360px;height:400px;background-color:#fff;border-radius: 10px;margin-top:-220px;margin-left:-200px;padding:20px;">
            <div style="margin:20px 0;">
              请填写您朋友的身份信息
            </div>
            <el-form label-position="left" label-width="80px" :model="formPerson">
              <el-form-item label="姓名">
                <el-input onkeyup="value=value.replace(/[\d]/g,'')" v-model="formPerson.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input   maxlength="11" v-model="formPerson.mobile"></el-input>
              </el-form-item>
              <el-form-item label="身份证">
                <el-input  maxlength="18" v-model="formPerson.idcard"></el-input>
              </el-form-item>
            </el-form>
            <p style="color:#008489;font-size:15px">(以上信息都是选填)</p>
            <p style="color:#008489;font-size:15px;">本公司承诺，该信息不会参与无相关的活动</p>
            <div style="display: flex;justify-content: space-between">
              <el-button type="primary" plain @click="addperson = false">取消</el-button>
              <el-button type="primary" plain @click="addPersonForm">添加</el-button>
            </div>
        </div>
      </div>
      <div  v-if="isPassword" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:999">
        <div  style="position:fixed;width:400px;height:120px;padding:20px;top:50%;left:50%;margin-top:-120px;margin-left:-220px;background-color:#fff;">
          <div style="border-bottom: 1px solid #eee;text-align: center;padding-bottom:10px;position: relative">
            <i @click="closePay" style="cursor: pointer;font-size:20px;position: absolute;left:0;" class="el-icon-close"></i>
            <span><b>请输入安全密码</b></span>
          </div>
          <div @click="checkPass" class="password-div">
            <ul>
              <li class="list"></li>
              <li class="list"></li>
              <li class="list"></li>
              <li class="list"></li>
              <li class="list"></li>
              <li class="list"></li>
            </ul>
            <input id="passW"  v-myfocus type="tel" oninput = "value=value.replace(/[^\d]/g,'')"  @keydown="onFocus"  name="password" v-model="password"  maxlength="6">
          </div>
        </div>
      </div>
      <div v-show="isWithdrawal" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.3);z-index:999">
        <div  style="position:fixed;top:50%;left:50%;width:340px;background-color:#fff;padding:20px;border-radius: 5px;margin-top:-140px;margin-left:-190px;">
          <p style="text-align: right"><i class="el-icon-close" style="font-size: 20px;" @click="abolish"></i></p>
          <h4>Allptop 密码设置</h4>
          <p style="font-size:14px;color:#008489;margin:20px 0;">您还未设置安全密码！</p>
          <p>请前往【账户设置】=>【安全】=>设置安全密码，设置成功后可提现！</p>
        </div>
      </div>
      <div v-if="isLoading" style="position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.8)">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../public/Loading'
  import '../../static/css/pay/iconfont.css'
  import '../../static/css/weixin/iconfont.css'
  import Head from '../public/head.vue'
    export default {
        name: "choose",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            personNumber:1,
            allPrice:'',
            numlast:'',
            classa:'el-icon-arrow-up',
            pickIndex:-1,
            isAdd:false,
            userImg:'',
            marginTop:'-50px',
            height:'50px',
            addClick:false,
            dataImg:'',
            dataTile:'',
            weekDay:'',
            user:'',
            userF:'',
            userPhone:'',
            a:true,
            b:false,
            chooseIndex:1,
            payIndex:1,
            activeId:'',
            activeList:[],
            creditCard:{
              name:'',
              surnames:'',
              information:'',
              prompt:'卡号',
              overTime:'',
              timePrompt:'到期日期',
              saveNumber:'',
              street:'',
              houseNumber:'',
              city:'',
              state:'',
              mail:'',
              country:''
            },
            isPay:'',
            payStatus:'',
            giftVoucher:'',
            Voucher:false,
            otherList:[
              {person:'成人',adult:1},
              {person:'儿童',adult:0},
              {person:'婴儿',adult:0},
            ],
            paymentList:[
              {styleHead:'',mess:'选择付款方式:',check:''},
              {styleHead:'iconfont icon-zhifubao-copy blue',mess:'支付宝',check:'el-icon-check'},
              {styleHead:'iconfont icon-weixin green',mess:'微信',check:'el-icon-check'},
              {styleHead:'iconfont icon-xinyongqia white',mess:'信用卡',check:'el-icon-check'}
            ],
            options:[
              {value:0,label:'中国'},
              {value:1,label:'日本'},
              {value:2,label:'美国'},
            ],
            form:{
              token:'',
              person:[],
              house:[],
              num:'',
              slot_id:'',
              pay_type:'',
              isstay:'',
              is_book_whole:'',
              balance:''
            },
            formPerson:{
              name:'',
              mobile:'',
              idcard:'',
            },
            isWeixin:false,
            orderId:'',
            timeOut:'',
            addperson:false,
            house:[],
            isstay:0,
            chooseHouse:[],
            closeIndex:0,
            book_whole:'',
            due_balance:0,
            jiJin:0,
            return_policy:'',
            age_limit:'',
            isPassword:false,
            password:'',
            aindex:0,
            isLoading:false,
            is_setpwd:'',
            isWithdrawal:false
          }
      },
      components:{
          Head,
        Loading
      },
      watch:{
        aindex:function(){
          if(this.aindex <=0){
            this.aindex = 0
          }
        },
        password:function(){
         if(this.password.length == 6){
           this.fundSend()
         }
        },
    /*    jiJin:function(){
           if(parseFloat(this.jiJin) > 0 && parseFloat(this.jiJin) <= this.allPrice){
             this.form.balance = this.jiJin
             this.getCalculate(this.closeIndex)
           }else{
             this.$message({
               type: 'info',
               message: '基金抵扣不能大于总价或者基金大于零'
             })
             this.jiJin = ''
             this.getCalculate(this.closeIndex)
           }

        },*/
        personNumber:function(){
          if(!this.closeIndex){
            this.getCalculate(this.closeIndex)
            this.form.num = this.personNumber
          }
        },
        closeIndex:function(){
          if(this.closeIndex){
            this.getCalculate(this.closeIndex)
            this.form.is_book_whole = this.closeIndex
          }else{
            this.getCalculate(this.closeIndex)
            this.form.is_book_whole = ''
          }
        },
        '$route':'getParams',
      },
      directives:{
          myfocus:{
            inserted: function (el) {
              el.focus()
            }
          }

      },
      methods:{
          check(){
           console.log(this.form)
          },
        checkPass(){
          document.getElementById('passW').focus()
        },
          //用基金提交订单
         fundSend(){
           let slot_id = ''
           if( this.activeList.beginTime){
             slot_id =  this.activeList.slot_id
           }else{
             slot_id =  this.activeList.list.slot_id
           }
           this.$http.post(this.api + '/orderadd',{
             token: localStorage.getItem('token'),
             activity_id: this.activeId,
             num: this.personNumber,
             slot_id: slot_id,
             person: this.form.person,
             pay_type: 4,
             isstay: this.isstay,
             is_book_whole: this.closeIndex,
             balance: this.jiJin,
             house: this.chooseHouse,
             password: this.password
           })
             .then(res=>{
               if(res.data.code == 1){
                 this.isPassword = false
                 this.$router.push('/stayOrder')
                 this.$message({
                   type: 'success',
                   message: '支付成功！'
                 })
               }else if(res.data.code == 3){
                 this.$http.post(this.api + '/home/index/token')
                   .then(res=>{
                     localStorage.setItem('token',res.data.data)
                     this.fundSend()
                   })
               }else if(res.data.code == 0){
                 this.isPassword = false
                 this.password = ''
                 this.aindex = 0
                 this.jiJin = 0
                 alert(res.data.msg)
               }
             })
         },

        deletPerson(item,index){
          this.$confirm('您正在删除已添加得乘客信息,是否继续?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(()=>{
              this.form.person.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
            })
            .catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消删除！'
              })
            })
        },
          closePay(){
            this.isPassword = false
            this.jiJin = ''
            this.password = ''
            this.aindex = 0
          },
        abolish(){
           this.isWithdrawal = false
           this.jiJin = ''
        },
        chooseCheck(){
          if(parseFloat(this.jiJin) > 0 && parseFloat(this.jiJin) < this.allPrice){
            this.form.balance = this.jiJin
          }else if(parseFloat(this.jiJin)  ==  this.allPrice){
            this.$confirm('您正在进行基金全额支付,是否继续？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(()=>{
                if(this.is_setpwd){
                  this.isPassword = true
                }else{
                  this.isWithdrawal = true
                }
              })
              .catch(()=>{
                this.jiJin = ''
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
                this.getCalculate(this.closeIndex)
              })
          }else if(parseFloat(this.jiJin)<0 || parseFloat(this.jiJin) > this.allPrice){
            this.$message({
              type: 'info',
              message: '请输入基金大于零，小于或等于总价'
            })
            this.jiJin = ''
          }
        },
          //输入安全密码
        onFocus(){
          var list = document.getElementsByClassName('list')
          if (event.keyCode === 99 ||event.keyCode === 96 ||event.keyCode === 97||event.keyCode === 98|| event.keyCode === 99|| event.keyCode === 100|| event.keyCode ===101|| event.keyCode === 102|| event.keyCode === 103||
            event.keyCode === 104|| event.keyCode === 105 || event.keyCode === 48||event.keyCode === 49||event.keyCode === 50||event.keyCode === 51||event.keyCode === 52||event.keyCode === 53||event.keyCode === 54||
            event.keyCode === 55||event.keyCode === 56||event.keyCode === 57){
            if(this.aindex <=5){
              list[this.aindex].innerHTML = '*'
              this.aindex +=1
            }
          }else if(event.keyCode === 8){
            if( this.aindex >0){
              this.aindex -= 1
              list[this.aindex].innerHTML = ' '
            }else{
            }
          }
        },
          //选择包场
        change(){
          if(this.closeIndex){
            this.closeIndex = 0
          }else{
            this.closeIndex = 1
          }
        },
        getCalculate(val){
          let slot_id = ''
          if( this.activeList.beginTime){
            slot_id =  this.activeList.slot_id
          }else{
            slot_id =  this.activeList.list.slot_id
          }
          this.$http.post(this.api + '/Calculate',{
            token: localStorage.getItem('token'),
            slot_id: slot_id,
            num: this.personNumber,
            isstay: this.isstay,
            is_book_whole: val,
            balance: this.jiJin,
            house: this.chooseHouse
          })
            .then(res=>{
              if(res.data.code == 1){
                this.allPrice = res.data.data.total_price
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getCalculate(val)
                  })
              }else if(res.data.code == 0){
                this.jiJin = ''
                alert(res.data.msg)
              }
            })
        },
        reduce(item,index){
          if(index == 0){
            if(item.adult > 1 &&  this.personNumber > this.form.person.length + 1){
              this.addClick = false
              item.adult = item.adult -1
              let b =0
              for(let i = 0;i<this.otherList.length;i++){
                b = b + this.otherList[i].adult
              }
              this.personNumber = b
            }else{
              this.$message({
                type: 'info',
                message: '您添加了用户信息，不能少于您添加的用户信息人数！'
              })
            }
          }else{
            if(item.adult !=0 &&  this.personNumber > this.form.person.length + 1){
              this.addClick = false
              item.adult=item.adult -1
              let b =0
              for(let i = 0;i<this.otherList.length;i++){
                b = b + this.otherList[i].adult
              }
              this.personNumber = b
            }else{
              this.$message({
                type: 'info',
                message: '您添加了用户信息，不能少于您添加的用户信息人数！'
              })
            }
          }
        },
        add(item,index){
          if(this.personNumber < this.numlast){
            this.addClick = false
            item.adult = item.adult + 1
            let b =0
            for(let i = 0;i<this.otherList.length;i++){
              b = b + this.otherList[i].adult
            }
            this.personNumber = b
          }else{
            this.addClick = true
          }

        },
        pick(el){
          if(this.pickIndex == el){
            this.classa='el-icon-arrow-up'
            this.pickIndex = -1
            this.isAdd = false
          }else{
            this.classa= 'el-icon-arrow-down'
            this.pickIndex = el
            this.isAdd = true
          }
        },
        remove(index){
          this.height = '200px'
          this.a = false
          this.b = true

        },
        pay(index){
          this.height = '50px'
          this.a = true
          this.b = false
          this.payIndex = index
          if(index>1){
            if(index == 2){
              this.chooseIndex = index
              this.marginTop= '-100px'
            }else{
              this.chooseIndex = index
              this.marginTop = '-150px'
            }
          }else if(index == 1){
            this.chooseIndex = index
            this.marginTop = '-50px'
          }else{
            this.chooseIndex = index
            this.marginTop = ''
          }
        },
        alipay(payIndex){
          if(this.jiJin > this.allPrice){
            this.$message({
              type: 'info',
              message: '基金抵扣不能大于总价'
            })
          }
          let slot_id = ''
          if( this.activeList.beginTime){
            slot_id =  this.activeList.slot_id
          }else{
            slot_id =  this.activeList.list.slot_id
          }
          this.$http.post(this.api + '/orderadd',{
            token: localStorage.getItem('token'),
            activity_id: this.activeId,
            num: this.personNumber,
            slot_id: slot_id,
            person: this.form.person,
            pay_type: payIndex,
            isstay: this.isstay,
            is_book_whole: this.closeIndex,
            balance: this.jiJin,
            house: this.chooseHouse
          })
            .then(res=> {
              if(res.data.code == 1){
                this.isPay = 0
                this.isWeixin = true
                document.getElementById('weixin').innerHTML = res.data.data.url
                this.orderId = res.data.data.order_id
                this.setTime()
              }else {
                alert(res.data.msg)
              }
            })
        },
        toBack(){
          this.$router.go(-1)
        },
        getParams(){
          this.isLoading = true
          this.activeId = this.$route.query.activeId
          this.activeList = (JSON.parse(this.$route.query.chooseTime))[0]
          if( this.activeList.beginTime){
            this.numlast =  this.activeList.max_person_num- this.activeList.order_person_num
          }else{
            this.weekDay = this.getWeekDay( this.activeList.day)
            this.numlast =  this.activeList.list.personNum -  this.activeList.list.order_person_num
          }
          this.$http.post(this.api + '/home/Activity/get_activity',{
            token: localStorage.getItem('token'),
            activity_id: this.activeId,
            visit: 0,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.dataImg = res.data.data.cover.domain + res.data.data.cover.image_url
                this.dataTile = res.data.data.title
                this.book_whole = res.data.data.book_whole
                this.return_policy = res.data.data.return_policy
                this.age_limit = res.data.data.age_limit
                this.getbalance()
                this.isLoading = false
                this.checkNUm()
                this.getCalculate(this.closeIndex)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getParams()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getWeekDay(str){
          var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          var myDate = new Date(Date.parse(str));
          return weekDay[myDate.getDay()]
        },
        closeWx(){
          this.isWeixin = false
          clearInterval(this.timeOut)
        },
        getOrderTime(){
          this.$http.post(this.api + '/OrderIsPay',{
            token: localStorage.getItem('token'),
            order_id: this.orderId
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.pay_status == 1){
                  this.isPay = 1
                  this.payStatus = 1
                  clearInterval(this.timeOut);
                  localStorage.setItem('dis','stayOrder')
                  this.$router.push('/transaction')
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOrderTime()
                  })
              }
            })
        },
        setTime(){
          let a = 0
         this.timeOut = setInterval(()=>{
            if(a < 300){
              this.getOrderTime()
              a+=1;
            }else{
              clearInterval(this.timeOut);
              this.isPay = 1
              this.payStatus = 2
            }
          },1000)
        },
        addPersonForm(){
          if(this.form.person.length < this.personNumber - 1){
            if(!this.formPerson.name){
              this.$message({
                type:'info',
                message: '请添加名字'
              })
            }else if(!this.formPerson.mobile ||  !(/^[1-9]\d*$/).test(this.formPerson.mobile)){
              this.$message({
                type:'info',
                message: '请添加正确电话号码'
              })
            }else if(!this.formPerson.idcard ||  !(/^[1-9]\d*$/).test(this.formPerson.idcard)){
              this.$message({
                type:'info',
                message: '请添加正确身份号码'
              })
            }else{
              this.form.person.push(
                {name:this.formPerson.name,mobile:this.formPerson.mobile,idcard:this.formPerson.idcard}
              )
              this.formPerson = {
                name:'',
                mobile:'',
                idcard:''
              }
              this.addperson = false
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          }else{
            this.$message({
              type: 'info',
              message: '人数信息超过参与者人数!'
            })
          }
        },
        payClose(){
          this.isWeixin = false
          this.isPay = ''
          this.payStatus = ''
        },
        //查询余额
        getbalance(){
          this.$http.post(this.api + '/balance',{
            token: localStorage.getItem('token'),
            page: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.due_balance = res.data.data.due_balance
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getbalance()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        reload(res){
            this.user = res.data.data[0].family_name + res.data.data[0].middle_name + res.data.data[0].name
            this.userImg = res.data.data[0].head_image? res.data.data[0].headimage.domain + res.data.data[0].headimage.image_url : ''
          this.is_setpwd = res.data.data[0].is_setpwd
          for(let i = 0;i <this.form.person.length;i++) {
            let a = this.form.person[i]
            for(let item in a){
              var input1 = document.createElement('input')
              input1.setAttribute("type",'hidden')
              input1.setAttribute('name', 'person'+'['+[i]+']'+'['+[item]+']');
              input1.setAttribute("value", a[item]);
              document.getElementById('form').append(input1);
            }
          }

        },
        checkNUm(){
          let slot = ''
          if(this.$route.query.chooseHouse){
            this.house =  JSON.parse(this.$route.query.chooseHouse)
            this.isstay = 1
            for(let i =0;i<this.house.length - 1;i++){
              this.form.house.push({house_id:this.house[i].house_id,num:this.house[i].number})
              this.chooseHouse.push({house_id:this.house[i].house_id,num:this.house[i].number})
            }
            for(let i = 0;i < this.form.house.length;i++) {
              let a =  this.form.house[i]
              for(let item in a){
                var input2 = document.createElement('input')
                var form = document.getElementById('form')
                input2.setAttribute("type",'hidden')
                input2.setAttribute('name', 'house'+'['+[i]+']'+'['+[item]+']');
                input2.setAttribute("value", a[item]);
                form.appendChild(input2);
              }
            }
          }
          if( this.activeList.beginTime){
            slot =  this.activeList.slot_id
          }else{
            slot =  this.activeList.list.slot_id
          }
          this.form = {
            token: localStorage.getItem('token'),
            activity_id: this.activeId,
            num: this.personNumber,
            slot_id:slot,
            person:[],
            pay_type:2,
            isstay:this.isstay,
            is_book_whole:this.closeIndex,
            balance:this.jiJin,
            house: this.chooseHouse
          }
        }
      },
      mounted() {

      },
      created() {
        this.getParams()
      },
      destroyed(){
        clearInterval(this.timeOut);
        localStorage.removeItem('house')
      }
    }
</script>

<style scoped>
h1{
  font-size:30px
}
p{
  font-size:18px
}
  h1,h3,p{
    margin: 20px 0;
  }
button:focus,button:hover{
  background-color:#fff;
  border:1px solid #008489
}
  .blue{
    color: #5a9ef7;
    font-size: 25px;
  }
  .white{
    color: #5a9ef7;
    font-size:20px;
  }
  .green{
    color:green;
    font-size: 25px;
  }
.password-div ul{
  overflow: hidden;
  margin-left:50px;
}
.password-div{
  width:100%;
  text-align: center;
  margin:10px 0;
}
.password-div input{
  width: 1px;
  height: 1px;
  opacity: 0;
  border: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.list {
  border: 1px solid #eee;
  float:left;
  width:50px;
  height:50px;
  line-height:50px;
  font-weight: bold;
}
</style>
