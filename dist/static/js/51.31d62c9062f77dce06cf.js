webpackJsonp([51],{"5gFB":function(t,e){},"Rq/p":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("a20G"),o=i("/nBy"),n=i("ZKg9"),s=(o.a,a.a,n.a,{name:"noComplete",data:function(){return{api:this.GLOBAL.baseURL,orderList:[],total:0,payFor:"",goPay:!1,orderId:"",form:{token:localStorage.getItem("token"),order_id:"",pay_type:""},isWeixin:!1,isPay:"",payStatus:"",timeOut:"",isLoading:!1,payList:[{img:"../../../static/img/static/aliPay.png",name:"支付宝"},{img:"../../../static/img/static/weChat.png",name:"微信"}],clickIndex:-1,isBank:!1,payPrice:""}},components:{Loading:o.a,None:a.a,LoadingImg:n.a},watch:{payFor:function(){2==this.payFor&&(this.form.order_id=this.orderId,this.form.pay_type=this.payFor)}},methods:{closePay:function(){this.goPay=!1,this.clickIndex=-1},checkedBank:function(){},checkOrder:function(t,e){this.$router.push({name:"orderFor",query:{order_id:t.order_id,type:2}})},handleCurrentChange:function(t){this.getOrderList(t)},getOrderList:function(t){var e=this;this.$http.post(this.api+"/orderl",{token:localStorage.getItem("token"),page:t,flag:0}).then(function(i){1==i.data.code?(e.orderList=i.data.data.data,e.total=i.data.data.total):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getOrderList(t)}):0==i.data.code&&alert(i.data.msg)})},goFor:function(t,e){this.goPay=!this.goPay,this.orderId=t.order_id,this.payPrice=t.pay_price},goPayM:function(){var t=this;1==this.payFor?(this.isLoading=!0,this.$http.post(this.api+"/Pay",{token:localStorage.getItem("token"),order_id:this.orderId,pay_type:this.payFor}).then(function(e){1==e.data.code?(t.goPay=!1,t.isWeixin=!0,t.isPay=0,t.isWeixin=!0,document.getElementById("weixin").innerHTML=e.data.data.url,t.isLoading=!1,t.setTime()):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.goPayM()}):0==e.data.code&&alert(e.data.msg)})):this.$message({type:"info",message:"选择支付方式"})},setTime:function(){var t=this,e=0;this.timeOut=setInterval(function(){e<300?(t.$http.post(t.api+"/OrderIsPay",{token:localStorage.getItem("token"),order_id:t.orderId}).then(function(e){1==e.data.code?1==e.data.data.pay_status&&(t.isPay=1,t.payStatus=1,clearInterval(t.timeOut)):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.setTime()}):0==e.data.code&&alert(e.data.msg)}),e+=1):(clearInterval(t.timeOut),t.isPay=1,t.payStatus=2)},1e3)},payClose:function(){this.isWeixin=!1,this.isPay="",this.payStatus=""},closeWx:function(){this.isWeixin=!1,clearInterval(this.timeOut)},choosePay:function(t,e){this.clickIndex=e,this.payFor=0==e?2:1==e?1:3},addBank:function(){this.isBank=!this.isBank}},mounted:function(){this.getOrderList(1)},destroyed:function(){clearInterval(this.timeOut)}}),r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"background-color":"#fff",padding:"20px","text-align":"left"}},[i("p",{staticStyle:{"margin-bottom":"30px"}},[t._v("您未完成订单：")]),t._v(" "),t._l(t.orderList,function(e,a){return i("div",{key:a,staticStyle:{"margin-bottom":"50px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","background-color":"#f5f5f5",padding:"10px",color:"#aaaaaa"}},[i("b",[t._v(t._s(e.create_time))]),t._v(" "),i("div",{staticStyle:{"font-size":"13px","margin-left":"10px"}},[t._v("订单号："+t._s(e.order_no))])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start",margin:"10px 0"}},[i("div",[i("LoadingImg",{staticStyle:{width:"200px",height:"120px"},attrs:{type:"3",src:e.cover.domain+e.cover.themb_url}})],1),t._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-left":"10px","line-height":"30px",cursor:"pointer"},on:{click:function(i){t.checkOrder(e,a)}}},[i("h4",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.content))]),t._v(" "),i("div",[t._v("活动分类："),t._l(e.kind,function(e){return i("span",[i("span",[t._v(t._s(e.kind_name))]),t._v("/")])})],2),t._v(" "),i("div",[t._v("活动地点："),i("span",[t._v(t._s(e.country))]),t._v(" "),i("span",[t._v(t._s("上海"==e.province||"北京"==e.province||"重庆"==e.province||"天津"==e.province?e.province+"市":e.province+"省"))]),t._v(" "),i("span",[t._v(t._s(e.city+"市"))]),t._v(" "),i("span",[t._v(t._s(e.region))])]),t._v(" "),i("div",[t._v("\n              活动时间："+t._s(e.activ_begin_time)+"—"+t._s(e.activ_end_time)+"\n            ")])]),t._v(" "),i("div",{staticStyle:{"line-height":"30px","font-size":"14px","margin-left":"20px",position:"relative"}},[i("p",[t._v("活动总价："),i("b",[t._v(t._s(e.total_price))])]),t._v(" "),i("p",[t._v("基金抵扣："),i("b",[t._v("- "+t._s(e.balance))])]),t._v(" "),i("p",[t._v("支付价格："),i("b",{staticStyle:{color:"#008489","font-size":"15px"}},[t._v(t._s(e.pay_price))])]),t._v(" "),i("div",[i("span",{staticStyle:{padding:"10px",color:"#fff","background-color":"#ff6200","border-radius":"5px",cursor:"pointer"},on:{click:function(i){t.goFor(e,a)}}},[i("b",[t._v("立即付款")])])]),t._v(" "),t._m(0,!0)])])])}),t._v(" "),t.orderList.length?t._e():i("None",{attrs:{type:"order"}}),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.goPay,expression:"goPay"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.3)","z-index":"990"}},[i("div",{staticStyle:{width:"500px",padding:"20px","border-radius":"15px","background-color":"#fff","text-align":"center",position:"fixed",top:"50%",left:"50%","margin-top":"-150px","margin-left":"-250px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-bottom":"20px"}},[i("div",{staticStyle:{"text-align":"right",width:"60%"}},[t._v("选择支付方式")]),t._v(" "),i("div",[i("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"25px"},on:{click:t.closePay}})])]),t._v(" "),i("div",{staticStyle:{width:"500px",height:"150px",overflow:"hidden"}},[i("div",{staticStyle:{width:"518px",height:"150px","overflow-y":"scroll"}},t._l(t.payList,function(e,a){return i("div",{staticStyle:{cursor:"pointer",display:"flex","justify-content":"space-between","align-items":"center",padding:"20px","border-bottom":"1px solid #eee"},style:{border:t.clickIndex==a?"2px solid #008489":""},on:{click:function(i){t.choosePay(e,a)}}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center"}},[i("div",{staticStyle:{width:"10px",height:"10px","border-radius":"50%"},style:{backgroundColor:t.clickIndex==a?"#008489":"#C0C0C0"}}),t._v(" "),i("div",{staticStyle:{"margin-left":"20px",display:"flex","justify-content":"flex-start","align-items":"center"}},[i("img",{attrs:{src:e.img,width:"20px",height:"20px"}}),t._v(" "),i("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(e.name))])])]),t._v(" "),i("div",{staticStyle:{color:"#EE893F"}},[t._v("\n               "+t._s(t.payPrice)+"元\n              ")])])}))]),t._v(" "),i("div",{staticStyle:{"text-align":"left","margin-top":"10px"}},[i("el-button",{style:{backgroundColor:t.isBank?"#D7D7D7":"#fff",color:t.isBank?"#858686":"#000"},attrs:{size:"mini",icon:"el-icon-plus"},on:{click:t.addBank}},[t._v("添加信用卡")])],1),t._v(" "),t.isBank?i("div",{staticStyle:{border:"1px solid #008489",padding:"20px",display:"flex","justify-content":"space-between","align-items":"center","margin-top":"20px"}},[i("div",{staticStyle:{"font-size":"12px"}},[t._v("请输入您的银行卡号:")]),t._v(" "),i("el-input",{staticStyle:{width:"250px"},attrs:{type:"tel"}}),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.checkedBank}},[t._v("确认")])],1):t._e(),t._v(" "),2==t.payFor||t.isBank?t._e():i("div",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.goPayM}},[t._v("确定")])],1),t._v(" "),2==t.payFor?i("div",[i("form",{attrs:{model:t.form,action:t.api+"/Pay",method:"get"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.token,expression:"form.token"}],attrs:{name:"token",type:"hidden"},domProps:{value:t.form.token},on:{input:function(e){e.target.composing||t.$set(t.form,"token",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.order_id,expression:"form.order_id"}],attrs:{name:"order_id",type:"hidden"},domProps:{value:t.form.order_id},on:{input:function(e){e.target.composing||t.$set(t.form,"order_id",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.pay_type,expression:"form.pay_type"}],attrs:{name:"pay_type",type:"hidden"},domProps:{value:t.form.pay_type},on:{input:function(e){e.target.composing||t.$set(t.form,"pay_type",e.target.value)}}}),t._v(" "),i("button",{staticClass:"choose",staticStyle:{width:"70px",height:"40px","border-radius":"5px","background-color":"#008489",border:"1px solid #eee",cursor:"pointer",float:"right",color:"#fff"},attrs:{type:"submit"}},[t._v("确定")])])]):t._e()])])],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isWeixin,expression:"isWeixin"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"360px",height:"350px","background-color":"#fff","border-radius":"10px","margin-top":"-195px","margin-left":"-200px",padding:"20px"}},[0==t.isPay?i("div",[i("div",{staticStyle:{"text-align":"right"}},[i("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"25px"},on:{click:t.closeWx}})]),t._v(" "),t._m(1)]):t._e(),t._v(" "),1==t.isPay?i("div",[i("div",{staticStyle:{display:"flex","justify-content":"space-between",color:"orangered"}},[1==t.payStatus?i("div",{staticStyle:{width:"0px",height:"0px","border-top":"70px solid green","border-left":"1px solid green","border-right":"70px solid transparent",position:"relative"}},[i("div",{staticStyle:{transform:"rotate(45deg)",position:"absolute","margin-top":"-70px",right:"-31px","font-family":"华文楷体","font-weight":"bold",color:"#fff"}},[t._v("成功")])]):t._e(),t._v(" "),2==t.payStatus?i("div",{staticStyle:{width:"0px",height:"0px","border-top":"70px solid orangered","border-left":"1px solid orangered","border-right":"70px solid transparent",position:"relative"}},[i("div",{staticStyle:{transform:"rotate(45deg)",position:"absolute","margin-top":"-70px",right:"-31px","font-family":"华文楷体","font-weight":"bold",color:"#fff"}},[t._v("失败")])]):t._e(),t._v(" "),t._m(2)]),t._v(" "),i("div",{staticStyle:{"text-align":"center","line-height":"40px"}},[1==t.payStatus?i("p",[i("i",{staticClass:"el-icon-success",staticStyle:{"font-size":"50px",color:"green"}})]):t._e(),t._v(" "),2==t.payStatus?i("p",[i("i",{staticClass:"el-icon-error",staticStyle:{"font-size":"50px",color:"orangered"}})]):t._e(),t._v(" "),1==t.payStatus?i("p",{staticStyle:{"font-size":"20px"}},[i("b",[t._v("您已支付成功")])]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{"font-size":"20px",color:"orangered"}},[i("b",[t._v("您支付已过期")])]):t._e(),t._v(" "),1==t.payStatus?i("p",[t._v("欢迎预定Allptp体验项目，希望您体验愉快！")]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{color:"orangered"}},[t._v("您的支付时间已过期，请重新支付！")]):t._e(),t._v(" "),1==t.payStatus?i("p",{staticStyle:{"font-size":"15px",color:"green"}},[t._v("此订单已添加到您的交易中心！请您及时核实！")]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{"font-size":"15px",color:"orangered"}},[t._v("此订单已添加到您的未完成订单！您可前往支付！")]):t._e(),t._v(" "),1==t.payStatus?i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"50px"}},[i("el-button",{staticStyle:{color:"green"},on:{click:t.payClose}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("继续浏览")]),t._v(" "),i("el-button",{staticStyle:{color:"green"}},[t._v("订单中心"),i("i",{staticClass:"el-icon-arrow-right"})])],1):t._e(),t._v(" "),2==t.payStatus?i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"50px"}},[i("el-button",{staticStyle:{color:"orangered",border:"1px solid orangered"},on:{click:t.payClose}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("重新提交")]),t._v(" "),i("el-button",{staticStyle:{color:"orangered",border:"1px solid orangered"}},[t._v("前往支付"),i("i",{staticClass:"el-icon-arrow-right"})])],1):t._e()])]):t._e()])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticStyle:{position:"fixed","z-index":"999",top:"0",left:"0",bottom:"0",right:"0",display:"flex","justify-content":"center","align-items":"center","background-color":"rgba(255,255,255,.5)"}},[i("Loading")],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{transform:"rotate(-45deg)",display:"flex","justify-content":"flex-start","line-height":"50px",color:"#349397",position:"absolute",right:"-70px",top:"60px"},attrs:{onselectstart:"return false"}},[this._v("\n              — —\n              "),e("div",{staticStyle:{width:"50px",height:"50px","border-radius":"50% 50%",border:"1px solid #349397","text-align":"center","line-height":"50px"}},[this._v("\n                未完成\n              ")]),this._v("\n              — —\n            ")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"240px",height:"300px",margin:"0 auto","border-radius":"5px","text-align":"center","background-color":"#fff",padding:"20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start",width:"150px",margin:"0 auto"}},[i("div",[i("i",{staticClass:"iconfont icon-changyonglogo28",staticStyle:{"font-size":"40px",color:"green"}})]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px"}},[i("span",[i("b",[t._v("微信支付")])]),i("br"),t._v(" "),i("span",{staticStyle:{"font-size":"15px"}},[t._v("WeChat Pay")])])]),t._v(" "),i("div",{staticStyle:{margin:"20px 0"},attrs:{id:"weixin"}}),t._v(" "),i("div",[i("p",[t._v("用微信扫码付款")])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("span",[t._v("-")]),i("span",[t._v("方便")]),i("span",[t._v("|")]),i("span",[t._v("快捷")]),i("span",[t._v("|")]),i("span",[t._v("安全")]),i("span",[t._v("-")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex","justify-content":"flex-start",padding:"10px 0"}},[e("div",{staticStyle:{"border-radius":"5px",padding:"0px 10px"}},[e("i",{staticClass:"iconfont icon-changyonglogo28",staticStyle:{"font-size":"45px",color:"orangered"}})]),this._v(" "),e("div",[e("span",[e("b",[this._v("微信支付")])]),e("br"),this._v(" "),e("span",{staticStyle:{"font-size":"15px"}},[this._v("WeChat Pay")])])])}]};var l=i("VU/8")(s,r,!1,function(t){i("5gFB")},"data-v-aa5c74de",null);e.default=l.exports}});
//# sourceMappingURL=51.31d62c9062f77dce06cf.js.map