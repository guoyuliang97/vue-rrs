webpackJsonp([9],{"6WAn":function(t,e){},NCYK:function(t,e){},bi2n:function(t,e){},kSyx:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("ZKg9"),a=i("Au9i"),r=i("0FxO"),o=(Boolean,Boolean,Boolean,String,String,Boolean,String,Object,Array,{name:"x-button",props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean,link:[String,Object],gradients:{type:Array,validator:function(t){return 2===t.length}}},methods:{onClick:function(){!this.disabled&&Object(r.a)(this.link,this.$router)}},computed:{noBorder:function(){return Array.isArray(this.gradients)},buttonStyle:function(){if(this.gradients)return{background:"linear-gradient(90deg, "+this.gradients[0]+", "+this.gradients[1]+")",color:"#FFFFFF"}},classes:function(){return[{"weui-btn_disabled":!this.plain&&this.disabled,"weui-btn_plain-disabled":this.plain&&this.disabled,"weui-btn_mini":this.mini,"vux-x-button-no-border":this.noBorder},this.plain?"":"weui-btn_"+this.type,this.plain?"weui-btn_plain-"+this.type:"",this.showLoading?"weui-btn_loading":""]}}}),s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"weui-btn",class:t.classes,style:t.buttonStyle,attrs:{disabled:t.disabled,type:t.actionType},on:{click:t.onClick}},[t.showLoading?i("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),t._t("default",[t._v(t._s(t.text))])],2)},staticRenderFns:[]};var l=i("VU/8")(o,s,!1,function(t){i("6WAn")},null,null).exports,c={mounted:function(){this.value>=0&&(this.currentIndex=this.value),this.updateIndex()},methods:{updateIndex:function(){if(this.$children&&this.$children.length){this.number=this.$children.length;for(var t=this.$children,e=0;e<t.length;e++)t[e].currentIndex=e,t[e].currentSelected&&(this.index=e)}}},props:{value:Number},watch:{currentIndex:function(t,e){e>-1&&this.$children[e]&&(this.$children[e].currentSelected=!1),t>-1&&this.$children[t]&&(this.$children[t].currentSelected=!0),this.$emit("input",t),this.$emit("on-index-change",t,e)},index:function(t){this.currentIndex=t},value:function(t){this.index=t}},data:function(){return{index:-1,currentIndex:this.index,number:this.$children.length}}},d={props:{selected:{type:Boolean,default:!1}},mounted:function(){this.$parent.updateIndex()},beforeDestroy:function(){var t=this.$parent;this.$nextTick(function(){t.updateIndex()})},methods:{onItemClick:function(t){var e=this;this.$parent.preventDefault?this.$parent.$emit("on-before-index-change",this.currentIndex):(void 0!==this.disabled&&!1!==this.disabled||(this.currentSelected=!0,this.$parent.currentIndex=this.currentIndex,this.$nextTick(function(){e.$emit("on-item-click",e.currentIndex)})),!0===t&&Object(r.a)(this.link,this.$router))}},watch:{currentSelected:function(t){t&&(this.$parent.index=this.currentIndex)},selected:function(t){this.currentSelected=t}},data:function(){return{currentIndex:-1,currentSelected:this.selected}}},u=(Number,String,String,String,String,Boolean,Function,String,Boolean,Number,String,{name:"tab",mixins:[c],mounted:function(){var t=this;this.$nextTick(function(){setTimeout(function(){t.hasReady=!0},0)})},props:{lineWidth:{type:Number,default:3},activeColor:String,barActiveColor:String,defaultColor:String,disabledColor:String,animate:{type:Boolean,default:!0},customBarWidth:[Function,String],preventDefault:Boolean,scrollThreshold:{type:Number,default:4},barPosition:{type:String,default:"bottom",validator:function(t){return-1!==["bottom","top"].indexOf(t)}}},computed:{barLeft:function(){if(this.hasReady){var t=this.$refs.nav,e=this.scrollable?t.offsetWidth/this.$children[this.currentIndex||0].$el.getBoundingClientRect().width:this.number;return this.currentIndex*(100/e)+"%"}},barRight:function(){if(this.hasReady){var t=this.$refs.nav,e=this.scrollable?t.offsetWidth/this.$children[this.currentIndex||0].$el.getBoundingClientRect().width:this.number;return(e-this.currentIndex-1)*(100/e)+"%"}},innerBarStyle:function(){return{width:"function"==typeof this.customBarWidth?this.customBarWidth(this.currentIndex):this.customBarWidth,background:this.barActiveColor||this.activeColor}},barStyle:function(){var t={left:this.barLeft,right:this.barRight,display:"block",height:this.lineWidth+"px",transition:this.hasReady?null:"none"};return this.customBarWidth?t.background="transparent":t.background=this.barActiveColor||this.activeColor,t},barClass:function(){return{"vux-tab-ink-bar-transition-forward":"forward"===this.direction,"vux-tab-ink-bar-transition-backward":"backward"===this.direction}},scrollable:function(){return this.number>this.scrollThreshold}},watch:{currentIndex:function(t,e){this.direction=t>e?"forward":"backward",this.$emit("on-index-change",t,e),this.hasReady&&this.scrollToActiveTab()}},data:function(){return{direction:"forward",right:"100%",hasReady:!1}},methods:{scrollToActiveTab:function(){var t=this;if(this.scrollable&&this.$children&&this.$children.length){var e=this.$children[this.currentIndex].$el,i=0;window.requestAnimationFrame(function n(){var a=t.$refs.nav;a.scrollLeft+=(e.offsetLeft-(a.offsetWidth-e.offsetWidth)/2-a.scrollLeft)/15,++i<15&&window.requestAnimationFrame(n)})}}}}),h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-tab-wrap",class:"top"===t.barPosition?"vux-tab-bar-top":""},[i("div",{staticClass:"vux-tab-container"},[i("div",{ref:"nav",staticClass:"vux-tab",class:[{"vux-tab-no-animate":!t.animate},{scrollable:t.scrollable}]},[t._t("default"),t._v(" "),t.animate?i("div",{staticClass:"vux-tab-ink-bar",class:t.barClass,style:t.barStyle},[t.customBarWidth?i("span",{staticClass:"vux-tab-bar-inner",style:t.innerBarStyle}):t._e()]):t._e()],2)])])},staticRenderFns:[]};var b=i("VU/8")(u,h,!1,function(t){i("bi2n")},null,null).exports,f=(String,Boolean,String,String,String,{name:"tab-item",mixins:[d],props:{activeClass:String,disabled:Boolean,badgeBackground:{type:String,default:"#f74c31"},badgeColor:{type:String,default:"#fff"},badgeLabel:String},computed:{style:function(){return{borderWidth:this.$parent.lineWidth+"px",borderColor:this.$parent.activeColor,color:this.currentSelected?this.$parent.activeColor:this.disabled?this.$parent.disabledColor:this.$parent.defaultColor,border:this.$parent.animate?"none":"auto"}}}}),g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-tab-item",class:[t.currentSelected?t.activeClass:"",{"vux-tab-selected":t.currentSelected,"vux-tab-disabled":t.disabled}],style:t.style,on:{click:t.onItemClick}},[t._t("default"),t._v(" "),void 0!==t.badgeLabel&&""!==t.badgeLabel?i("span",{staticClass:"vux-tab-item-badge",style:{background:t.badgeBackground,color:t.badgeColor}},[t._v("\n  "+t._s(t.badgeLabel))]):t._e()],2)},staticRenderFns:[]},v=i("VU/8")(f,g,!1,null,null,null).exports,p=(n.a,{name:"mOrder",data:function(){return{api:this.GLOBAL.baseURL,orderList:[]}},components:{Tab:b,TabItem:v,XButton:l,LoadingImg:n.a},methods:{LookMore:function(){a.MessageBox.alert("请前往APP或者客户端查看")},lookOrder:function(){a.MessageBox.alert("请前往APP或者客户端查看")},goBack:function(){this.$router.go(-1)},change:function(t){t<=1?this.getOrder(1,t,"",""):2==t?this.getOrder(1,1,1,2):3==t&&this.getRefun(1)},getRefun:function(t){var e=this;this.$http.post(this.api+"/RefundLUser",{token:localStorage.getItem("token"),page:t}).then(function(t){1==t.data.code?e.orderList=t.data.data.data:3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.getOrder()}):0==t.data.code&&a.MessageBox.alert(t.data.msg)})},getOrder:function(t,e,i,n){var r=this;this.$http.post(this.api+"/orderl",{token:localStorage.getItem("token"),page:t,flag:e,isevaluate:i,iscomplete:n}).then(function(t){1==t.data.code?r.orderList=t.data.data.data:3==t.data.code?r.$http.post(r.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),r.getOrder()}):0==t.data.code&&a.MessageBox.alert(t.data.msg)})},getRefund:function(){this.$http.post(this.api+"/RefundLUser",{})}},mounted:function(){this.getOrder(1,0,"","")}}),m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"background-color":"#eee"}},[i("div",{staticStyle:{padding:"1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[i("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})]),t._v(" "),i("p",{staticStyle:{"font-size":"2rem"}},[t._v("我的订单")])]),t._v(" "),i("tab",{staticStyle:{"font-weight":"bold"},attrs:{"line-width":2,"custom-bar-width":"30px","active-color":"#008489"}},[i("tab-item",{attrs:{selected:""},on:{"on-item-click":t.change}},[t._v("未支付")]),t._v(" "),i("tab-item",{on:{"on-item-click":t.change}},[t._v("已支付")]),t._v(" "),i("tab-item",{on:{"on-item-click":t.change}},[t._v("待评价")]),t._v(" "),i("tab-item",{on:{"on-item-click":t.change}},[t._v("退款订单")])],1),t._v(" "),i("div",{staticStyle:{"font-size":"1.5rem"}},[t._l(t.orderList,function(e,n){return i("div",{staticStyle:{"background-color":"white",padding:"1rem","margin-top":"1rem"}},[i("div",{staticStyle:{"padding-bottom":"1rem","border-bottom":"1px solid #eee"}},[i("span",[t._v(t._s(e.country))]),t._v("  "),i("span",[t._v(t._s(e.province))]),t._v("  "),i("span",[t._v(t._s(e.city))]),t._v("  "),i("span",[t._v(t._s(e.region))])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[i("div",[i("LoadingImg",{staticStyle:{width:"100px",height:"80px"},attrs:{type:"3",src:e.cover_image?e.cover.domain+e.cover.image_url:""}})],1),t._v(" "),i("div",{staticStyle:{"margin-left":"10px",display:"flex","align-content":"space-between","flex-wrap":"wrap"}},[i("div",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between",width:"100%"}},[i("div",[t._v("￥"+t._s(e.act_union_price))]),t._v(" "),i("div",[t._v("x"+t._s(e.num))])])])]),t._v(" "),i("div",{staticStyle:{"text-align":"right",margin:"1rem 0"}},[i("p",[t._v("共1人，合计￥"+t._s(e.total_price))])]),t._v(" "),i("div",{staticStyle:{"text-align":"right"}},[i("el-button",{staticStyle:{border:"1px solid #008489",color:"#008489"},attrs:{size:"mini",plain:""},on:{click:t.lookOrder}},[t._v("查看订单")])],1)])}),t._v(" "),10==t.orderList.length?i("div",[i("el-button",{staticStyle:{"background-color":"#F4F4F4",color:"#666666",width:"100%",border:"none"},on:{click:t.LookMore}},[t._v("查看更多订单>")])],1):t._e()],2)],1)},staticRenderFns:[]};var x=i("VU/8")(p,m,!1,function(t){i("NCYK")},"data-v-31516d13",null);e.default=x.exports}});
//# sourceMappingURL=9.be0bc9ddbc18150fa4ba.js.map