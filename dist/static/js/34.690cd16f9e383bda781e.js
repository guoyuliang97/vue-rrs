webpackJsonp([34],{CndL:function(t,i){},KjDO:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("ZKg9"),n=(a.a,{name:"refundFor",data:function(){return{api:this.GLOBAL.baseURL,refundId:"",orderInformation:"",order_id:""}},components:{LoadingImg:a.a},methods:{sendDis:function(){this.$router.push({path:"/dispute",query:{information:this.order_id}})},getRefund:function(){var t=this;this.$http.post(this.api+"/RefundDTwo",{token:localStorage.getItem("token"),refund_id:this.refundId,verson:2}).then(function(i){1==i.data.code?(t.orderInformation=i.data.data,t.order_id=i.data.data.order_id):3==i.data.code?t.getRefund():0==i.data.code&&alert(i.data.msg)})},goBack:function(){this.$router.go(-1)}},mounted:function(){this.getRefund()},created:function(){this.refundId=this.$route.query.information}}),s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.orderInformation?e("div",{staticStyle:{"text-align":"left","font-weight":"bold"}},[e("div",{staticStyle:{"background-color":"#fff",padding:"20px","font-size":"14px"}},[e("div",[e("el-button",{attrs:{icon:"el-icon-arrow-left",circle:""},on:{click:t.goBack}})],1),t._v(" "),e("div",{staticStyle:{"text-align":"center",padding:"30px 0","font-size":"16px"}},[0==t.orderInformation.type?e("div",[0==t.orderInformation.audit?e("p",{staticClass:"fontweight"},[t._v("您的订单正在退款申请中")]):t._e(),t._v(" "),1==t.orderInformation.audit?e("p",{staticClass:"fontweight"},[t._m(0),t._v("您的订单已退款成功")]):t._e(),t._v(" "),2==t.orderInformation.audit?e("p",{staticClass:"fontweight"},[t._m(1),t._v("您的订单已被拒绝退款")]):t._e(),t._v(" "),2==t.orderInformation.audit?e("p",{staticStyle:{color:"red","font-size":"14px","margin-top":"10px"}},[t._v("(拒绝原因:"+t._s(t.orderInformation.refund_reason)+")")]):t._e(),t._v(" "),1==t.orderInformation.audit?e("p",{staticClass:"mainColor contentTitle",staticStyle:{"background-color":"#fff","text-align":"center","margin-top":"10px"}},[t._v("（退款金额已原路退回，请注意查收）")]):t._e()]):t._e(),t._v(" "),1==t.orderInformation.type?e("div",[e("p",[t._v("您的订单已被策划人退款")]),t._v(" "),e("p",{staticStyle:{color:"red"}},[t._v("(退款原因："+t._s(t.orderInformation.refund_reason)+")")])]):t._e()]),t._v(" "),e("p",{staticClass:"contentTitle fontweight"},[t._v("订单详情"),1==t.orderInformation.is_refund?e("span",{staticStyle:{color:"red"}},[t._v("(有退款)")]):t._e()]),t._v(" "),e("div",[e("div",{staticClass:"flexStart marginBottom"},[e("LoadingImg",{staticStyle:{width:"100px",height:"70px",overflow:"hidden"},attrs:{type:"2",src:t.orderInformation.cover.domain+t.orderInformation.cover.image_url}}),t._v(" "),e("p",{staticClass:"elips"},[e("b",[t._v(t._s(t.orderInformation.title))])])],1),t._v(" "),e("div",{staticStyle:{"line-height":"30px"}},[e("p",[t._v("参与人数："+t._s(t.orderInformation.num)+"  人")]),t._v(" "),e("p",[t._v("体验地点："+t._s(t.orderInformation.place))]),t._v(" "),e("p",[t._v("体验时长："+t._s(t.orderInformation.total_time))]),t._v(" "),e("p",[t._v("体验时间："+t._s(t.orderInformation.activ_begin_time)+"—"+t._s(t.orderInformation.activ_end_time))])])]),t._v(" "),e("hr",{staticClass:"line"}),t._v(" "),e("div",{staticClass:"flexStart"},[e("div",[t._v("价格详情：")]),t._v(" "),e("div",t._l(t.orderInformation.detail,function(i,a){return e("div",{staticClass:"marginTop"},["1"==i.type||"2"==i.type?e("div",[t._v("\n            "+t._s("1"==i.type?"亲子":i.name)),e("span",{staticClass:"marginLeft"}),t._v(t._s(i.adult)+"成人"),"1"==i.type?e("span",[t._v(t._s(i.kids)+"儿童")]):t._e(),t._v(" "),e("span",{staticClass:"marginLeft"}),t._v("¥"+t._s(i.price)+"\n           ")]):t._e(),t._v(" "),"0"==i.type?e("div",[e("div",{staticClass:"marginTop"},[t._v("标准"),e("span",{staticClass:"marginLeft"}),t._v(t._s(i.adult)+"人"),e("span",{staticClass:"marginLeft"}),t._v("¥"+t._s(i.adult_price))]),t._v(" "),e("div",[t._v("儿童"),e("span",{staticClass:"marginLeft"}),t._v(t._s(i.kids)+"人"),e("span",{staticClass:"marginLeft"}),t._v("¥"+t._s(i.kids_price))])]):t._e()])}))]),t._v(" "),e("div",{staticClass:"flexStart"},[e("div",[t._v("住宿信息：")]),t._v(" "),e("div",t._l(t.orderInformation.house,function(i,a){return e("p",{staticClass:"marginTop"},[e("span",[t._v(t._s(i.title))]),t._v(" "),e("span",{staticClass:"marginLeft"}),t._v(" "),e("span",[t._v("房数"),e("i",{staticClass:"el-icon-close"}),t._v(t._s(i.num))]),t._v(" "),e("span",{staticClass:"marginLeft"}),t._v(" "),e("span",[t._v("总额￥ "+t._s(i.price))])])}))]),t._v(" "),e("hr",{staticClass:"line"}),t._v(" "),e("div",{staticStyle:{"line-height":"30px"}},[e("p",[t._v("退款方式："+t._s(t.orderInformation.flag?"全款":"非全款"))]),t._v(" "),e("div",{staticClass:"flexStart"},[e("div",[t._v("退款人数：")]),t._v(" "),e("div",t._l(t.orderInformation.refund_detail,function(i,a){return e("div",["0"==i.type?e("div",[e("span",[t._v("标准"+t._s(i.adult)+"人")]),e("span",{staticClass:"marginLeft"}),t._v(" "),e("span",[t._v("儿童"+t._s(i.kids)+"人"),e("span",{staticClass:"marginLeft"}),t._v("\n                ¥"+t._s(i.price))])]):t._e()])}))]),t._v(" "),e("div",{staticClass:"flexStart"},[e("div",[t._v("退订套餐：")]),t._v(" "),e("div",t._l(t.orderInformation.refund_detail,function(i,a){return e("div",["1"==i.type||"2"==i.type?e("div",[t._v("\n                "+t._s("1"==i.type?"亲子":i.name)),e("span",{staticClass:"marginLeft"}),t._v(t._s(i.adult)+"成人"),"1"==i.type?e("span",[t._v(t._s(i.kids)+"儿童")]):t._e(),t._v(" "),e("span",{staticClass:"marginLeft"}),t._v("¥"+t._s(i.price)+"\n              ")]):t._e()])}))]),t._v(" "),e("div",{staticClass:"flexStart"},[e("div",[t._v("退订住宿：")]),t._v(" "),e("div",t._l(t.orderInformation.refund_detail,function(i,a){return e("div",["3"==i.type?e("div",[t._v("\n                "+t._s(i.name)),e("span",{staticClass:"marginLeft"}),t._v("房数X"+t._s(i.house_num)),e("span",{staticClass:"marginLeft"}),t._v("¥"+t._s(i.price)+"\n              ")]):t._e()])}))])]),t._v(" "),e("hr",{staticClass:"line"}),t._v(" "),e("div",{staticStyle:{"line-height":"30px"}},[e("p",[t._v("订单编号："+t._s(t.orderInformation.order_no))]),t._v(" "),e("p",[t._v("退款总额："),e("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.orderInformation.refund_total_price))])])]),t._v(" "),e("hr",{staticClass:"line"}),t._v(" "),e("div",{staticClass:"flexEnd"},[e("div",{staticClass:"mainButton",on:{click:t.sendDis}},[t._v("提交纠纷")])])])]):t._e()},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("span",[i("i",{staticClass:"el-icon-success",staticStyle:{color:"#14C5CA","font-size":"20px"}}),this._v(" ")])},function(){var t=this.$createElement,i=this._self._c||t;return i("span",[i("i",{staticClass:"el-icon-warning",staticStyle:{color:"#DC4242","font-size":"20px"}}),this._v(" ")])}]};var r=e("VU/8")(n,s,!1,function(t){e("CndL")},"data-v-dd0fe386",null);i.default=r.exports}});
//# sourceMappingURL=34.690cd16f9e383bda781e.js.map