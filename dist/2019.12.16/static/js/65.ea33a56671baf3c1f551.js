webpackJsonp([65],{"5+X0":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{api:this.GLOBAL.baseURL,bringData:1,bringArr:[{label:"参与者不需要携带任何东西",value:1},{label:"参与者需要东西",value:2}],needThing:"",rplayThing:"",complete:"",active_id:""}},methods:{changeRouter:function(){this.bringData>1?this.needThing?this.save():this.$message({type:"info",message:"请填写参与者需要带的物品"}):this.save()},save:function(){var t=this;this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,activ_bring:this.needThing,step:6}).then(function(e){1==e.data.code?t.complete?t.$message({type:"success",message:"保存成功！"}):t.$emit("changeRouter",{id:7,router:"Title",information:t.active_id,complete:t.complete}):3==e.data.code?t.save():0==e.data.code&&t.$alert(e.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activ_bring:this.needThing,step:6}).then(function(e){1==e.data.code?(t.$emit("saveId",e.data.data),t.$emit("changeRouter",{id:7,router:"Title",information:e.data.data})):3==e.data.code?t.save():0==e.data.code&&t.$alert(e.data.msg)})},changeTxt:function(){1==this.bringData?(this.rplayThing=this.needThing,this.needThing=""):this.needThing=this.rplayThing},getActives:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){1==e.data.code?e.data.data.activ_bring&&(t.bringData=2,t.needThing=e.data.data.activ_bring):3==e.data.code?t.getActives():0==e.data.code&&t.$alert(e.data.msg)})}},created:function(){window.scrollTo(0,0),this.complete=this.$route.query.complete,this.active_id=this.$route.query.information},mounted:function(){window.scroll(0,0);this.active_id&&this.getActives()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"exp_con"},[a("p",{staticClass:"title"},[t._v("参与者需自带哪些东西？")]),t._v(" "),a("p",{staticClass:"language_txt"},[t._v("请仔细考虑，在开展体验过程中，除了您提供的东西，参与者还需要自带什么。 参与者预订体验后，我们将通过邮件告知他们这些信息。")]),t._v(" "),a("p",{staticClass:"fontweight",staticStyle:{"margin-top":"30px"}},[t._v("参与者需要自带任何物品吗？")]),t._v(" "),a("p",{staticClass:"language_txt"},[t._v("如果是这样的话，请确保您会向参与者提供他们可能需要的所有东西。")]),t._v(" "),a("el-radio-group",{staticStyle:{"margin-top":"20px"},on:{change:t.changeTxt},model:{value:t.bringData,callback:function(e){t.bringData=e},expression:"bringData"}},t._l(t.bringArr,function(e){return a("p",{staticClass:"chioce"},[a("el-radio",{attrs:{label:e.value}},[t._v(t._s(e.label))])],1)})),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==t.bringData,expression:"bringData == 2"}]},[a("p",{staticClass:"fontweight",staticStyle:{margin:"20px 0"}},[t._v("参与者要带些什么东西？")]),t._v(" "),a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"在此输入项目"},model:{value:t.needThing,callback:function(e){t.needThing=e},expression:"needThing"}})],1),t._v(" "),a("div",{staticClass:"exp_btn"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:t.changeRouter}},[t._v(t._s(t.complete?"保存":"下一步"))])],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,n,!1,function(t){a("6vKk")},null,null);e.default=s.exports},"6vKk":function(t,e){}});
//# sourceMappingURL=65.ea33a56671baf3c1f551.js.map