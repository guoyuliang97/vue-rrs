webpackJsonp([68],{dG3G:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mnKu"),o={name:"needVolunter",data:function(){return{api:this.GLOBAL.baseURL,radio:"",complete:"",needLanguage:"",lang:[],needOther:"",active_id:"",prodeHouse:""}},methods:{sendActive:function(){var t=this;"1"==this.radio?this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,is_volunteen:this.radio,volun_laguage:this.needLanguage,volun_require:this.needOther,house_volunteen:this.prodeHouse,step:16}).then(function(e){1==e.data.code?1==t.complete?t.$router.push("/publishList"):t.check():3==e.data.code?t.sendActive():0==e.data.code&&t.$alert(e.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),is_volunteen:this.radio,volun_laguage:this.needLanguage,volun_require:this.needOther,house_volunteen:this.prodeHouse,step:16}).then(function(e){1==e.data.code?(t.active_id=e.data.data,t.$emit("saveId",e.data.data),t.check()):3==e.data.code?t.sendActive():0==e.data.code&&t.$alert(e.data.msg)}):this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,is_volunteen:this.radio,step:16}).then(function(e){1==e.data.code?1==t.complete?t.$router.push("/publishList"):t.check():3==e.data.code?t.sendActive():0==e.data.code&&t.$alert(e.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),is_volunteen:this.radio,step:16}).then(function(e){1==e.data.code?(t.active_id=e.data.data,t.$emit("saveId",e.data.data),t.check()):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.sendActive()}):t.$alert(e.data.msg)})},check:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){1==e.data.code?15==e.data.data.step.replace(/[^0-9]/gi," ").trim().split(/\s+/).length?t.$emit("changeRouter",{id:17,router:"subExperience",information:t.active_id,complete:t.complete}):(t.$emit("changeRouter",{id:16,router:"needVolunter",information:t.active_id,complete:t.complete}),t.$alert("您还有步骤未填写完整")):3==e.data.code?t.check():0==e.data.code&&t.$alert(e.data.msg)})},getActive:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){if(1==e.data.code){if(t.radio=e.data.data.is_volunteen.toString(),t.complete=e.data.data.complete,e.data.data.volun_laguage){for(var a=[],i=0;i<e.data.data.volun_laguage.split(",").length;i++)a.push(parseInt(e.data.data.volun_laguage.split(",")[i]));t.needLanguage=a}t.needOther=e.data.data.volun_require}else 3==e.data.code?t.getActive():0==e.data.code&&alert(e.data.msg)})}},mounted:function(){this.active_id&&this.getActive()},created:function(){this.lang=Object(i.a)(),window.scroll(0,0),this.active_id=this.$route.query.information}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"exp_con"},[a("h2",{staticClass:"title"},[t._v("邀请志愿者")]),t._v(" "),a("p",{staticClass:"language_txt"},[t._v("针对您创建的体验，根据您的需求，是否需要志愿者来参与活动，并且帮助您与参与者之间的沟通。但是您必须向志愿者免单。")]),t._v(" "),a("div",{staticStyle:{margin:"20px 0"}},[a("el-radio",{attrs:{label:"0"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("不需要")]),t._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("需要")])],1),t._v(" "),"1"==t.radio?a("div",{staticStyle:{margin:"20px 0"}},[a("div",[a("div",[t._v("是否为志愿者提供住宿")]),t._v(" "),a("el-radio",{attrs:{label:"0"},model:{value:t.prodeHouse,callback:function(e){t.prodeHouse=e},expression:"prodeHouse"}},[t._v("提供")]),t._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:t.prodeHouse,callback:function(e){t.prodeHouse=e},expression:"prodeHouse"}},[t._v("不提供")])],1),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center"}},[a("div",[t._v("选择需要的语言：")]),t._v(" "),a("div",{staticStyle:{"margin-left":"20px"}},[a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{multiple:"","collapse-tags":"",placeholder:"语言"},model:{value:t.needLanguage,callback:function(e){t.needLanguage=e},expression:"needLanguage"}},t._l(t.lang,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("div",{staticStyle:{margin:"20px 0"}},[a("div",[t._v("其他要求：")]),t._v(" "),a("div",{staticStyle:{margin:"10px 0"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:5},placeholder:"请输入您的其他要求"},model:{value:t.needOther,callback:function(e){t.needOther=e},expression:"needOther"}})],1)])]):t._e(),t._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:t.sendActive}},[t._v(t._s(1==this.complete?"保存":"下一步"))])],1)},staticRenderFns:[]};var d=a("VU/8")(o,n,!1,function(t){a("j9q9")},"data-v-713f137d",null);e.default=d.exports},j9q9:function(t,e){}});
//# sourceMappingURL=68.86ba32ead7053d59d13e.js.map