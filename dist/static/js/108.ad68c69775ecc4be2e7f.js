webpackJsonp([108],{DiEB:function(t,e){},hsGX:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("/nBy"),n=i("mnKu"),s=i("ZQ6i"),o=i("DjrJ"),l=i("a20G"),r=(o.a,l.a,a.a,{name:"appliCation",data:function(){return{api:this.GLOBAL.baseURL,volunList:[],activity_id:"",total:0,content:"",languageList:[],sexArr:[],isLoading:!1}},components:{Head:o.a,None:l.a,Loading:a.a},methods:{goBack:function(){this.$router.go(-1)},getEroll:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/ErollL",{token:localStorage.getItem("token"),activity_id:this.activity_id,page:t}).then(function(t){1==t.data.code?(e.volunList=t.data.data.data,e.total=t.data.data.total,e.isLoading=!1):3==t.data.code?e.$http.post(e.api+"/home/Index/token").then(function(t){1==t.data.code&&localStorage.setItem("token",t.data.data)}):0==t.data.code&&(alert(t.data.msg),e.isLoading=!1)})},handleCurrentChange:function(t){this.getEroll(t)},takeUp:function(t,e){for(var i="",a=this.languageList[t.main_language].label+",",n=0;n<t.language.length;n++)i+=this.languageList[t.language[n]].label+",";i=i+"/"+t.skill,this.content=a+i},changeErollA:function(t,e){var i=this;this.isLoading=!0,this.$http.post(this.api+"/ErollA",{token:localStorage.getItem("token"),enroll_id:t.enroll_id,flag:e}).then(function(a){1==a.data.code?(t.audit=1==e?1:2,i.isLoading=!1):3==a.data.code?i.$http.post(i.api+"/home/index/token").then(function(a){1==a.data.code&&(localStorage.setItem("token",a.data.data),i.changeErollA(t,e))}):0==a.data.code&&(alert(a.data.msg),i.isLoading=!1)})}},mounted:function(){this.getEroll(1)},created:function(){this.languageList=Object(n.a)(),this.sexArr=Object(s.a)(),this.activity_id=this.$route.query.information}}),d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"margin-top":"10px"}},[i("Head",{attrs:{type:"myPlay"}}),t._v(" "),i("div",{staticStyle:{width:"1080px",margin:"106px auto"}},[i("h4",{staticStyle:{display:"flex","justify-content":"space-between"}},[t._v("我的策划>查看志愿者申请("+t._s(t.volunList.length)+")"),i("span",{staticStyle:{cursor:"pointer"},on:{click:t.goBack}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("返回")])]),t._v(" "),t._m(0),t._v(" "),t._l(t.volunList,function(e,a){return i("div",{key:a,staticStyle:{"border-bottom":"1px solid #E6E6E6"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between","font-size":"12px","text-align":"center"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start",width:"150px",padding:"19px 0"}},[i("img",{staticStyle:{"border-radius":"50%","margin-left":"40px"},attrs:{src:e.user.head_image?e.user.headimage.domain+e.user.headimage.image_url:"../../../static/img/static/user.png",width:"32px",height:"32px"}}),t._v(" "),i("div",{staticStyle:{"line-height":"32px","margin-left":"10px",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.user.family_name+e.user.middle_name+e.user.name?e.user.name:"匿名用户"))])]),t._v(" "),i("div",{staticClass:"width"},[t._v(t._s(t.sexArr[e.user.six].label))]),t._v(" "),i("div",[i("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"200",content:t.content},on:{show:function(i){t.takeUp(e,a)}}},[i("el-button",{staticClass:"width",staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(t.languageList[e.main_language].label)+","),t._l(e.language,function(e,a){return i("span",[t._v(t._s(t.languageList[e].label)+",")])}),t._v("/"+t._s(e.skill))],2)],1)],1),t._v(" "),i("div",[i("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"200",content:e.slot_id[0].begin_time+"—"+e.slot_id[0].end_time}},[i("el-button",{staticClass:"width",staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(e.slot_id[0].begin_time)+"-"+t._s(e.slot_id[0].end_time))])],1)],1),t._v(" "),i("div",[i("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"200",content:e.introduce}},[i("el-button",{staticClass:"width",staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(e.introduce))])],1)],1),t._v(" "),i("div",{staticStyle:{width:"150px",padding:"19px 0"}},[i("el-rate",t._b({attrs:{disabled:"","show-score":"",colors:["#008489","#008489","#008489"],"text-color":"#008489","score-template":"{value}"}},"el-rate",parseInt(e.score),!1))],1),t._v(" "),0==e.audit?i("div",{staticClass:"width"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.changeErollA(e,1)}}},[t._v("同意")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(i){t.changeErollA(e,2)}}},[t._v("谢绝")])],1):t._e(),t._v(" "),e.audit?i("div",{staticClass:"width"},[i("el-button",{style:{backgroundColor:2==e.audit?"#fff":"#008489",color:2==e.audit?"red":"#fff",borderColor:2==e.audit?"red":"#008489"},attrs:{type:"primary",size:"mini"}},[t._v(t._s(1==e.audit?"已同意":"已谢绝"))])],1):t._e()])])}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.volunList.length,expression:"!volunList.length"}]},[i("None",{attrs:{type:"application"}})],1),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e(),t._v(" "),i("div",{staticStyle:{margin:"20px 0"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],2)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex","justify-content":"space-between","background-color":"#F4F6F9",color:"#A8A8A8","font-size":"12px","margin-top":"20px","text-align":"center","line-height":"25px"}},[e("div",{staticClass:"miniwidth"},[this._v("头像/昵称")]),e("div",{staticClass:"miniwidth"},[this._v("性别")]),e("div",{staticClass:"miniwidth"},[this._v("语言/技能")]),e("div",{staticClass:"miniwidth"},[this._v("申请时间")]),e("div",{staticClass:"miniwidth"},[this._v("备注")]),e("div",{staticClass:"miniwidth"},[this._v("志愿人评分")]),e("div",{staticClass:"miniwidth"},[this._v("操作")])])}]};var c=i("VU/8")(r,d,!1,function(t){i("DiEB")},"data-v-41ccd125",null);e.default=c.exports}});
//# sourceMappingURL=108.ad68c69775ecc4be2e7f.js.map