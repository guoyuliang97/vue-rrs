webpackJsonp([40],{UfzZ:function(t,e){},f9AK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{api:this.GLOBAL.baseURL,activeNames:[],msgData:[],txData:[],userData:""}},methods:{change:function(){console.log(this.msgData)},handleChange:function(){},toEditdata:function(){this.$router.push("/edit")},saveNotice:function(){var t=this;this.$http.post(this.api+"/home/User/config_add",{token:localStorage.getItem("token"),mes:this.msgData,remind:this.txData}).then(function(e){1==e.data.code?t.$message({type:"success",message:"保存成功！"}):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.saveNotice()}):0==e.data.code&&alert(e.data.msg)})},getInformation:function(){var t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?t.userData=e.data.data[0]:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getInformation()}):0==e.data.code&&alert(e.data.msg)})},getNotice:function(){var t=this;this.$http.post(this.api+"/home/User/config_get",{token:localStorage.getItem("token")}).then(function(e){if(1==e.data.code){var a=e.data.data;if(a.mes){for(var i=[],n=0;n<a.mes.split(",").length;n++)i.push(parseInt(a.mes.split(",")[n]));t.msgData=i}if(a.remind){i=[];for(var o=0;o<a.remind.split(",").length;o++)i.push(parseInt(a.remind.split(",")[o]));t.msgData=i}}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getNotice()}):alert(e.data.msg)})}},mounted:function(){this.getInformation(),this.getNotice()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"edit_datacon"},[a("div",{staticStyle:{width:"740px",margin:"0 auto","text-align":"left"}},[a("el-collapse",{on:{change:t.handleChange},model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[a("el-collapse-item",{staticStyle:{"margin-top":"10px"},attrs:{title:"消息",name:"1"}},[a("div",[t._v("\n\t\t\t\t\t接收预订请求等来自房东和房客的消息。\n\t\t\t\t\t"),a("div",{staticStyle:{"margin-top":"10px"}},[a("el-checkbox-group",{on:{change:t.change},model:{value:t.msgData,callback:function(e){t.msgData=e},expression:"msgData"}},[a("el-checkbox",{key:"1",attrs:{label:"1"}},[t._v("电子邮件")]),t._v(" "),a("el-checkbox",{key:"2",attrs:{label:"2"}},[t._v("短信")])],1)],1)])]),t._v(" "),a("el-collapse-item",{attrs:{title:"联系方式",name:"2"}},[a("div",[t._v("\n\t\t\t\t   可在您的个人资料页面编辑此信息。"),a("span",{staticStyle:{cursor:"pointer",color:"#008489"},on:{click:t.toEditdata}},[t._v("编辑个人资料")]),t._v(" "),a("p",{staticStyle:{"margin-top":"10px"}},[t._v("电子邮件: "+t._s(t.userData.email))]),t._v(" "),a("p",{staticStyle:{"margin-top":"10px"}},[t._v("电话号码: "+t._s(t.userData.mobile))])])]),t._v(" "),a("el-collapse-item",{attrs:{title:"提醒",name:"3"}},[a("div",[t._v("\n\t\t\t\t   接收预订提醒、评论撰写提醒、价格提醒，以及与您使用人人游有关的其他提醒消息。\n\t\t\t\t   "),a("div",{staticStyle:{"margin-top":"10px"}},[a("el-checkbox-group",{model:{value:t.txData,callback:function(e){t.txData=e},expression:"txData"}},[a("el-checkbox",{attrs:{label:"1"}},[t._v("电子邮件")]),t._v(" "),a("el-checkbox",{attrs:{label:"2"}},[t._v("短信")])],1)],1)])])],1)],1)]),t._v(" "),a("div",{staticStyle:{"margin-top":"15px","text-align":"left"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveNotice}},[t._v("保存")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"data_title"},[e("div",{staticClass:"edit_width"},[this._v("通知")])])}]};var o=a("VU/8")(i,n,!1,function(t){a("UfzZ")},null,null);e.default=o.exports}});
//# sourceMappingURL=40.056e85211d533e194fca.js.map