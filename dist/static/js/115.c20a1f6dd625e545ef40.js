webpackJsonp([115],{BAzR:function(t,e){},uzTE:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{isEnd:!1,endForm:{},reason:1,otherTextarea:"",canGet:"",visible2:!1}},methods:{endAccount:function(){this.isEnd||(this.isEnd=!0)},settingRouter:function(t,e){this.$router.push(e),localStorage.setItem("accountNav",t),localStorage.setItem("accountRouter",e),this.$emit("changesetting",t)}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"setting"},[t._m(0),t._v(" "),i("div",{staticClass:"edit_datacon"},[i("div",{staticStyle:{width:"740px",margin:"0 auto","text-align":"left"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isEnd,expression:"isEnd"}]},[i("div",{staticClass:"end_top"},[i("div",[i("p",{staticClass:"fontweight detail_p",staticStyle:{"font-size":"16px"}},[t._v("请告诉我们您为什么要注销账号")]),t._v(" "),i("div",[i("el-radio-group",{model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}},[i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:1}},[t._v("我有安全顾虑。")])],1),t._v(" "),i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:2}},[t._v("我有隐私顾虑。")])],1),t._v(" "),i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:3}},[t._v("我觉得这个没有用。")])],1),t._v(" "),i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:4}},[t._v("我不知道如何使用它。")])],1),t._v(" "),i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:5}},[t._v("只是暂时的。我会回来。")])],1),t._v(" "),i("p",{staticClass:"radio_margin"},[i("el-radio",{attrs:{label:6}},[t._v("其他")])],1)])],1),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"15px"}},[t._v("有什么其他想告诉我们的吗？")]),t._v(" "),i("el-input",{staticStyle:{"margin-top":"15px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:4},placeholder:"请输入内容"},model:{value:t.otherTextarea,callback:function(e){t.otherTextarea=e},expression:"otherTextarea"}}),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"15px"}},[t._v("我们可以联系您以获取更多详细信息吗？")]),t._v(" "),i("el-radio-group",{staticStyle:{"margin-top":"15px"},model:{value:t.canGet,callback:function(e){t.canGet=e},expression:"canGet"}},[i("el-radio",{attrs:{label:1}},[t._v("可以")]),t._v(" "),i("el-radio",{attrs:{label:2}},[t._v("不可以")])],1),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"15px"}},[t._v("将会发生什么情况")]),t._v(" "),i("p",{staticClass:"detail_p"},[t._v("1.注销账号前您在爱彼迎平台上所有活动所对应的权利和义务仍将保留")]),t._v(" "),i("p",{staticClass:"detail_p"},[t._v("2.您的个人资料和所有房源都会被隐藏")]),t._v(" "),t._m(1),t._v(" "),t._m(2)],1),t._v(" "),i("div",[i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"15px"}},[t._v("注销账号的替代方案")]),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"20px",color:"#008489",cursor:"pointer"},on:{click:function(e){t.settingRouter("3","/privacy")}}},[t._v("修改我的隐私设置")]),t._v(" "),i("p",{staticClass:"detail_p"},[t._v("关闭您房源的搜索索引功能，您的房源便不会出现在谷歌、必应等搜索引擎的搜索结果中。")]),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{"margin-top":"20px",color:"#008489",cursor:"pointer"},on:{click:function(e){t.settingRouter("0","/notice")}}},[t._v("变更通知偏好")]),t._v(" "),i("p",{staticClass:"detail_p"},[t._v("我们是否给您发送了过多的邮件？您可以修改您的通知偏好设置。")])])])]),t._v(" "),0==t.isEnd?i("div",{staticStyle:{"text-align":"left","margin-top":"20px"}},[i("el-button",{attrs:{type:"danger"},on:{click:t.endAccount}},[t._v("停用账号")])],1):t._e(),t._v(" "),1==t.isEnd?i("div",{staticStyle:{"text-align":"left","margin-top":"20px"}},[i("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.visible2,callback:function(e){t.visible2=e},expression:"visible2"}},[i("p",[t._v("这是一段内容这是一段内容确定删除吗？")]),t._v(" "),i("div",{staticStyle:{"text-align":"right",margin:"0"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.visible2=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.visible2=!1}}},[t._v("确定")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference",type:"danger"},on:{click:t.endAccount},slot:"reference"},[t._v("确定")])],1)],1):t._e()])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"data_title"},[e("div",{staticClass:"edit_width"},[this._v("停用账号")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"detail_p"},[this._v("3.您可以随时"),e("span",{staticStyle:{cursor:"pointer",color:"#008489"}},[this._v("联系我们")]),this._v("以重新启用您的账号")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"detail_p"},[this._v("4."),e("span",{staticStyle:{cursor:"pointer",color:"#008489"}},[this._v("了解关于账号停用的更多信息")])])}]};var n=i("VU/8")(a,s,!1,function(t){i("BAzR")},null,null);e.default=n.exports}});
//# sourceMappingURL=115.c20a1f6dd625e545ef40.js.map