webpackJsonp([120],{Qkxy:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("mnKu"),s={data:function(){return{api:this.GLOBAL.baseURL,status:0,languages:[],main_laguage:"",other_laguage:[],complete:""}},watch:{main_laguage:function(){this.status=0}},methods:{changeRouter:function(){var t=this;this.main_laguage<0?this.status=1:this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{activity_id:this.active_id,token:localStorage.getItem("token"),main_laguage:this.main_laguage,other_laguage:this.other_laguage,step:0}).then(function(a){1==a.data.code?t.complete?t.$message({type:"success",message:"保存成功！"}):t.$emit("changeRouter",{id:1,router:"Type",information:t.active_id,complete:t.complete}):3==a.data.code?t.changeRouter():0==a.data.code&&t.$alert(a.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),main_laguage:this.main_laguage,other_laguage:this.other_laguage,step:0}).then(function(a){1==a.data.code?(t.$emit("saveId",a.data.data),t.$emit("changeRouter",{id:1,router:"Type",information:a.data.data,complete:t.complete})):3==a.data.code?t.changeRouter():0==a.data.code&&t.$alert(a.data.msg)})},getActive:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(a){if(1==a.data.code){var e=a.data.data;if(t.main_laguage=e.main_laguage,e.other_laguage){for(var i=[],s=0;s<e.other_laguage.split(",").length;s++)i.push(parseInt(e.other_laguage.split(",")[s]));t.other_laguage=i}}else 3==a.data.code?t.getActive():0==a.data.code&&alert(a.data.msg)})}},created:function(){window.scroll(0,0),this.languages=Object(i.a)(),this.active_id=this.$route.query.information,this.complete=this.$route.query.complete},mounted:function(){this.active_id&&this.getActive(),console.log(this.active_id)}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"exp_con animated fadeInde"},[e("p",{staticClass:"title"},[t._v("请选择体验页面显示的语言")]),t._v(" "),e("p",{staticClass:"language_txt"},[t._v("该语言将是您的体验页面显示的语言，也是您开展体验时所用的语言。它也将作为参与者搜索体验时使用的筛选条件之一。")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),e("p",{staticClass:"fontweight main_language"},[t._v("主要语言")]),t._v(" "),e("div",{staticClass:"language_select"},[e("el-select",{staticStyle:{width:"40%","border-radius":"6px"},style:{border:1==t.status?"1px solid red":"none"},attrs:{placeholder:"请选择"},model:{value:t.main_laguage,callback:function(a){t.main_laguage=a},expression:"main_laguage"}},t._l(t.languages,function(t){return e("el-option",{attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),e("p",{staticClass:"fontweight",staticStyle:{"margin-top":"20px"}},[t._v("其他所会语言(可多选)")]),t._v(" "),e("el-select",{staticStyle:{"margin-top":"20px",width:"300px"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择"},model:{value:t.other_laguage,callback:function(a){t.other_laguage=a},expression:"other_laguage"}},t._l(t.languages,function(a,i){return e("el-option",{attrs:{disabled:t.main_laguage===i,label:a.label,value:a.value}})})),t._v(" "),e("div",{staticClass:"exp_btn"},[e("el-button",{attrs:{type:"primary",plain:""},on:{click:t.changeRouter}},[t._v(t._s(t.complete?"保存":"下一步"))])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"language_title"},[a("span",{staticClass:"fontweight"},[this._v("小贴士")]),this._v(" "),a("i",{staticClass:"el-icon-arrow-up"})])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"title_con"},[a("p",[a("span",{staticClass:"fontweight"},[a("i",{staticClass:"el-icon-arrow-right"})]),this._v(" 您需要会用您选择的语言与参与者交流")]),this._v(" "),a("p",[a("span",{staticClass:"fontweight"},[a("i",{staticClass:"el-icon-arrow-right"})]),this._v(" 体验发布后，您还可以添加自己会说的其他语言")])])}]};var n=e("VU/8")(s,l,!1,function(t){e("rR+O")},null,null);a.default=n.exports},"rR+O":function(t,a){}});
//# sourceMappingURL=120.30d355696fd113fffcfa.js.map