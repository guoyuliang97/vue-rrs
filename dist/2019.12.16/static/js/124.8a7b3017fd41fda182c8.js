webpackJsonp([124],{"2eQh":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("/nBy"),n=i("a20G"),o=i("ZKg9"),r=(n.a,a.a,o.a,{name:"completeOrder",data:function(){return{api:this.GLOBAL.baseURL,orderList:[],total:0,isLoading:!1}},components:{None:n.a,Loading:a.a,LoadingImg:o.a},methods:{discuss:function(t,e){this.$router.push({path:"/Orderevaluate",query:{order_id:t.order_id}})},checkOrder:function(t,e){this.$router.push({name:"orderFor",query:{order_id:t.order_id,type:1}})},handleCurrentChange:function(t){this.getOrderList(t)},getOrderList:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/orderl",{token:localStorage.getItem("token"),page:t,flag:1,iscomplete:2}).then(function(i){1==i.data.code?(e.orderList=i.data.data.data,e.total=i.data.data.total,e.isLoading=!1):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getOrderList(t)}):0==i.data.code&&alert(i.data.msg)})}},mounted:function(){this.getOrderList(1),localStorage.removeItem("house")}}),s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"background-color":"#fff",padding:"20px","text-align":"left"}},[i("p",{staticStyle:{"margin-bottom":"30px"}},[t._v("您已完成订单：")]),t._v(" "),t._l(t.orderList,function(e,a){return 0==e.status?i("div",{key:a,staticStyle:{"margin-bottom":"50px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","background-color":"#f5f5f5",padding:"10px",color:"#aaaaaa"}},[i("b",[t._v(t._s(e.create_time))]),t._v(" "),i("div",{staticStyle:{"font-size":"13px","margin-left":"10px"}},[t._v("订单号："+t._s(e.order_no))])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"10px 0"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[i("div",[i("LoadingImg",{staticStyle:{width:"200px",height:"120px"},attrs:{type:"3",src:e.cover.domain+e.cover.themb_url}})],1),t._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-left":"10px","line-height":"30px",cursor:"pointer"},on:{click:function(i){t.checkOrder(e,a)}}},[i("h4",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.content))]),t._v(" "),i("div",[t._v("活动分类："),t._l(e.kind,function(e){return i("span",[i("span",[t._v(t._s(e.kind_name))]),t._v("/")])})],2),t._v(" "),i("div",[t._v("活动地点："),i("span",[t._v(t._s(e.country))]),t._v(" "),i("span",[t._v(t._s("上海"==e.province||"北京"==e.province||"重庆"==e.province||"天津"==e.province?e.province+"市":e.province+"省"))]),t._v(" "),i("span",[t._v(t._s(e.city+"市"))]),t._v(" "),i("span",[t._v(t._s(e.region))])]),t._v(" "),i("div",[t._v("\n              活动时间："+t._s(e.total_time)+"\n            ")])])]),t._v(" "),i("div",{staticStyle:{"line-height":"30px","font-size":"14px",position:"relative",width:"170px"}},[i("p",[t._v("活动总价："),i("b",[t._v(t._s(e.total_price))])]),t._v(" "),i("p",[t._v("基金抵扣："),i("b",[t._v("- "+t._s(e.balance))])]),t._v(" "),i("p",[t._v("支付价格："),i("b",{staticStyle:{color:"#008489","font-size":"15px"}},[t._v(t._s(e.pay_price))])]),t._v(" "),i("div",{on:{click:function(i){1==e.isevaluate&&t.discuss(e,a)}}},[i("span",{staticStyle:{padding:"10px",color:"#fff","border-radius":"5px",cursor:"pointer"},style:{backgroundColor:1==e.isevaluate?"green":"#A8A8A8"}},[i("b",[t._v(t._s(1==e.isevaluate?"立即评价":"已评价"))])])]),t._v(" "),t._m(0,!0)])])]):t._e()}),t._v(" "),t.orderList.length||t.isLoading?t._e():i("None",{attrs:{type:"order"}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticStyle:{position:"fixed","z-index":"990",top:"0",left:"0",bottom:"0",right:"0",display:"flex","justify-content":"center","align-items":"center","background-color":"rgba(255,255,255,.5)"}},[i("Loading")],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{transform:"rotate(-45deg)",display:"flex","justify-content":"flex-start","line-height":"50px",color:"#349397",position:"absolute",right:"0px",top:"50px"},attrs:{onselectstart:"return false"}},[this._v("\n            — —\n            "),e("div",{staticStyle:{width:"50px",height:"50px","border-radius":"50% 50%",border:"1px solid #349397","text-align":"center","line-height":"50px"}},[this._v("\n              已完成\n            ")]),this._v("\n            — —\n          ")])}]};var d=i("VU/8")(r,s,!1,function(t){i("gDIL")},"data-v-367ee7ca",null);e.default=d.exports},gDIL:function(t,e){}});
//# sourceMappingURL=124.8a7b3017fd41fda182c8.js.map