webpackJsonp([97],{DVYb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("a20G"),n=(i.a,{name:"records",data:function(){return{api:this.GLOBAL.baseURL,beginMonth:"",beginYear:"",overMonth:"",overYear:"",monthList:[{label:"一月",value:"-01-01"},{label:"二月",value:"-02-01"},{label:"三月",value:"-03-01"},{label:"四月",value:"-04-01"},{label:"五月",value:"-05-01"},{label:"六月",value:"-06-01"},{label:"七月",value:"-07-01"},{label:"八月",value:"-08-01"},{label:"九月",value:"-09-01"},{label:"十月",value:"-10-01"},{label:"十一月",value:"-11-01"},{label:"十二月",value:"-12-01"}],yearList:[],btnIndex:"",btnList:[{name:"全部"},{name:"收入"},{name:"支出"}],recordList:[],firstYear:"",total:0,index:1}},components:{None:i.a},watch:{beginMonth:function(){this.getMoney()},beginYear:function(){this.getMoney()},overMonth:function(){this.getMoney()},overYear:function(){this.getMoney()}},methods:{getMoney:function(){this.beginMonth&&this.beginYear&&this.overMonth&&this.overYear&&(this.index=1,this.getOtherCord())},handleClick:function(t,e){},changeList:function(t,e){this.index=1,this.btnIndex!=e&&0!=e?(this.btnIndex=e,this.getOtherCord()):this.btnIndex!=e&&0==e&&(this.btnIndex=e,this.getRecord())},getOtherCord:function(){var t=this;this.$http.post(this.api+"/TradCenter",{token:localStorage.getItem("token"),begin_time:this.beginYear+this.beginMonth,end_time:this.overYear+this.overMonth,page:this.index,type:this.btnIndex}).then(function(e){1==e.data.code?(t.recordList=e.data.data.data,t.total=e.data.data.total):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getOtherCord(val)}):0==e.data.code&&alert(e.data.msg)})},getRecord:function(t){var e=this;this.$http.post(this.api+"/TradCenter",{token:localStorage.getItem("token"),begin_time:this.beginYear+this.beginMonth,end_time:this.overYear+this.overMonth,page:this.index}).then(function(t){1==t.data.code?(e.recordList=t.data.data.data,e.total=t.data.data.total):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.getRecord()}):0==t.data.code&&alert(t.data.msg)})},handleCurrentChange:function(t){this.index=t,this.btnIndex?this.getOtherCord():this.getRecord()},getUser:function(){var t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(e){if(1==e.data.code){var a=e.data.data[0];t.firstYear=a.create_time.split("-")[0];for(var i=(new Date).getFullYear()-parseInt(t.firstYear),n=0;n<=i;n++){var l=parseInt(t.firstYear)+n;t.yearList.push({label:l,value:l})}}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getUser()}):alert(e.data.msg)})}},mounted:function(){this.getUser(),this.getRecord()}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"background-color":"#fff",padding:"30px","border-radius":"10px"}},[a("div",{staticStyle:{width:"100%","text-align":"left"}},[t._m(0),t._v(" "),a("hr",{staticStyle:{border:"1px solid #eee",margin:"20px 0"}}),t._v(" "),a("p",{staticStyle:{"font-size":"25px","font-weight":"bold"}},[t._v("交易记录")]),t._v(" "),a("div",{staticStyle:{"margin-top":"50px"}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start",margin:"20px 0","font-size":"12px"}},[a("div",{staticStyle:{width:"45%",display:"flex","justify-content":"flex-start","line-height":"40px"}},[t._m(1),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.beginMonth,callback:function(e){t.beginMonth=e},expression:"beginMonth"}},t._l(t.monthList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:t.beginYear,callback:function(e){t.beginYear=e},expression:"beginYear"}},t._l(t.yearList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticStyle:{width:"45%",display:"flex","justify-content":"flex-start","line-height":"40px","margin-left":"30px"}},[t._m(2),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.overMonth,callback:function(e){t.overMonth=e},expression:"overMonth"}},t._l(t.monthList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:t.overYear,callback:function(e){t.overYear=e},expression:"overYear"}},t._l(t.yearList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("div",{staticStyle:{"font-size":"12px",display:"flex","justify-content":"flex-start"}},[t._m(3),t._v(" "),a("div",{staticStyle:{"margin-left":"20px"}},t._l(t.btnList,function(e,i){return a("el-button",{style:{backgroundColor:i==t.btnIndex?"#008489":"#F1F1F1",color:i==t.btnIndex?"#fff":"#333333"},attrs:{size:"mini"},on:{click:function(a){t.changeList(e,i)}}},[t._v(t._s(e.name))])}))]),t._v(" "),a("div",{staticStyle:{"margin-top":"15px"}},[t._m(4),t._v(" "),t._l(t.recordList,function(e,i){return a("div",{staticStyle:{display:"flex","justify-content":"space-around","font-size":"13px","text-align":"center",height:"60px","line-height":"60px","border-bottom":"1px solid #E6E6E6"}},[a("div",{staticStyle:{width:"140px"}},[a("span",[t._v(t._s(e.create_time))])]),t._v(" "),a("div",{staticStyle:{width:"140px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[a("b",[t._v(t._s(e.title))])]),t._v(" "),a("div",{staticStyle:{width:"140px"},style:{color:e.flag>0?"#008489":"#E29000"}},[t._v(t._s(e.flag?"+"+e.amount:"-"+e.amount))]),t._v(" "),a("div",{staticStyle:{width:"140px"}},[a("b",[t._v(t._s(e.type))])])])}),t._v(" "),t.recordList.length?t._e():a("div",[a("None",{attrs:{type:"jiaoYi"}})],1),t._v(" "),a("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[a("el-pagination",{attrs:{"current-page":t.index,"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.index=e}}})],1)],2)])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticStyle:{"font-size":"15px","font-weight":"bold"}},[e("span",{staticStyle:{color:"red","font-size":"13px"}},[this._v("new")]),this._v("欢迎查看全新的交易记录面板。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"120px"}},[e("b",[this._v("交易时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"60px"}},[e("b",[this._v("至")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b",[this._v("资金流向")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{padding:"10px 0","background-color":"#F4F6F9"}},[e("ul",{staticStyle:{display:"flex","justify-content":"space-around","font-size":"12px",color:"#A8A8A8"}},[e("li",[this._v("交易时间")]),this._v(" "),e("li",[this._v("交易名称")]),this._v(" "),e("li",[this._v("收入/支出")]),this._v(" "),e("li",[this._v("交易方式")])])])}]};var o=a("VU/8")(n,l,!1,function(t){a("exK0")},"data-v-530fe123",null);e.default=o.exports},exK0:function(t,e){}});
//# sourceMappingURL=97.3a2d793a887d7de269fc.js.map