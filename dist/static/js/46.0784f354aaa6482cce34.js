webpackJsonp([46],{"4y2L":function(t,e){},Npvf:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("a20G"),a=i("ZKg9"),r=(n.a,a.a,{name:"stayOrder",data:function(){return{api:this.GLOBAL.baseURL,orderList:[],total:0}},components:{None:n.a,LoadingImg:a.a},methods:{handleCurrentChange:function(t){this.getOrder(t)},getOrder:function(t){var e=this;this.$http.post(this.api+"/orderl",{token:localStorage.getItem("token"),page:t,flag:1,iscomplete:0}).then(function(i){1==i.data.code?(e.orderList=i.data.data.data,e.total=i.data.data.total):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getOrder(t)}):0==i.data.code&&alert(i.data.msg)})},checkOrder:function(t,e){this.$router.push({name:"orderFor",query:{order_id:t.order_id,type:3}})}},mounted:function(){this.getOrder(1)}}),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"background-color":"#fff",padding:"20px","text-align":"left"}},[i("p",{staticStyle:{"margin-bottom":"30px"}},[t._v("您待体验订单：")]),t._v(" "),t._l(t.orderList,function(e,n){return i("div",{key:n,staticStyle:{"margin-bottom":"50px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","background-color":"#f5f5f5",padding:"10px",color:"#aaaaaa"}},[i("b",[t._v(t._s(e.create_time))]),t._v(" "),i("div",{staticStyle:{"font-size":"13px","margin-left":"10px"}},[t._v("订单号："+t._s(e.order_no))])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start",margin:"10px 0"}},[i("div",[i("LoadingImg",{staticStyle:{width:"200px",height:"120px"},attrs:{type:"3",src:e.cover.domain+e.cover.themb_url}})],1),t._v(" "),i("div",{staticStyle:{"font-size":"14px","margin-left":"10px","line-height":"30px",cursor:"pointer"},on:{click:function(i){t.checkOrder(e,n)}}},[i("h4",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.content))]),t._v(" "),i("div",[t._v("活动分类："),t._l(e.kind,function(e){return i("span",[i("span",[t._v(t._s(e.kind_name))]),t._v("/")])})],2),t._v(" "),i("div",[t._v("活动地点："),i("span",[t._v(t._s(e.country))]),t._v(" "),i("span",[t._v(t._s("上海"==e.province||"北京"==e.province||"重庆"==e.province||"天津"==e.province?e.province+"市":e.province+"省"))]),t._v(" "),i("span",[t._v(t._s(e.city+"市"))]),t._v(" "),i("span",[t._v(t._s(e.region))])]),t._v(" "),i("div",[t._v("\n            活动时间："+t._s(e.activ_begin_time)+"—"+t._s(e.activ_end_time)+"\n          ")])]),t._v(" "),i("div",{staticStyle:{"line-height":"30px","font-size":"14px","margin-left":"20px",position:"relative"}},[i("p",[t._v("活动总价："),i("b",[t._v(t._s(e.total_price))])]),t._v(" "),i("p",[t._v("基金抵扣："),i("b",[t._v("- "+t._s(e.balance))])]),t._v(" "),i("p",[t._v("支付价格："),i("b",{staticStyle:{color:"#008489","font-size":"15px"}},[t._v(t._s(e.pay_price))])]),t._v(" "),t._m(0,!0)])])])}),t._v(" "),t.orderList.length?t._e():i("None",{attrs:{type:"order"}}),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{transform:"rotate(-45deg)",display:"flex","justify-content":"flex-start","line-height":"50px",color:"#349397",position:"absolute",right:"-70px",top:"60px"},attrs:{onselectstart:"return false"}},[this._v("\n            — —\n            "),e("div",{staticStyle:{width:"50px",height:"50px","border-radius":"50% 50%",border:"1px solid #349397","text-align":"center","line-height":"50px"}},[this._v("\n              待体验\n            ")]),this._v("\n            — —\n          ")])}]};var s=i("VU/8")(r,o,!1,function(t){i("4y2L")},"data-v-b7771098",null);e.default=s.exports}});
//# sourceMappingURL=46.0784f354aaa6482cce34.js.map