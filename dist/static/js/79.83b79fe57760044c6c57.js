webpackJsonp([79],{"8SA5":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("vqGK"),o=i("c18A"),s=i("4hmb"),n=i("DjrJ"),l=i("a20G"),r=i("ZKg9"),c=(n.a,s.a,o.a,a.a,l.a,r.a,{name:"wish",data:function(){return{api:this.GLOBAL.baseURL,isCreate:!1,wishCreate:{wishCreat:"",wishChoose:""},wishList:[],deelIndex:!1,cancel:"删除",isXin:!1,reName:"",newChoose:"",options:[{value:0,label:"共享"},{value:1,label:"私密"}],isRena:!1,group_id:""}},components:{Head:n.a,Detail:s.a,Foot:o.a,Bounced:a.a,None:l.a,loadingImg:r.a},methods:{createWish:function(){this.isCreate=!0},closeCreat:function(){this.isCreate=!1},saveWish:function(){var e=this;""==this.wishCreate.wishCreat||0==this.wishCreate.wishCreat.split(" ").join("").length?this.$message({type:"error",message:"保存心愿单失败"}):this.$http.post(this.api+"/home/Comment/add_collegroup",{token:localStorage.getItem("token"),group_name:this.wishCreate.wishCreat,hide:this.wishCreate.wishChoose}).then(function(t){1==t.data.code?(e.getGroup(),e.wishCreate.wishCreat="",e.wishCreate.wishChoose="",e.isCreate=!1):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.saveWish()}):0==t.data.code&&alert(t.data.msg)})},toList:function(e,t){this.$router.push({path:"/wishPage",query:{group_id:e.group_id,name:e.group_name}})},deel:function(e,t){var i=this;this.$http.post(this.api+"/GroupD",{token:localStorage.getItem("token"),group_id:e.group_id}).then(function(a){1==a.data.code?i.wishList.splice(t,1):3==a.data.code?i.$http.post(i.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),i.deel(e,t)}):alert(a.data.msg)})},deelList:function(){this.deelIndex=!this.deelIndex},getGroup:function(){var e=this;this.$http.post(this.api+"/home/Comment/collegroup_list",{token:localStorage.getItem("token")}).then(function(t){1==t.data.code?(t.data.data.length?e.isXin=!1:e.isXin=!0,e.wishList=t.data.data):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.getGroup()}):alert(t.data.msg)})},toRename:function(e,t){console.log(e,t),this.group_id=e.group_id,this.isRena=!0},abolishName:function(){this.isRena=!1,this.reName="",this.newChoose=""},reNameCheck:function(){var e=this;this.$http.post(this.api+"/home/Comment/add_collegroup",{token:localStorage.getItem("token"),group_id:this.group_id,group_name:this.reName,hide:this.newChoose}).then(function(t){1==t.data.code?(e.isRena=!1,e.reName="",e.newChoose="",e.$message({type:"success",message:"修改成功！"}),e.getGroup()):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.reNameCheck()}):0==t.data.code&&alert(t.data.msg)})}},watch:{deelIndex:function(){1==this.deelIndex?this.cancel="取消":this.cancel="删除"}},mounted:function(){this.getGroup()}}),h={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-container",[i("el-header",[i("Head",{attrs:{type:"wish"}})],1),e._v(" "),i("el-main",[i("div",{staticStyle:{margin:"20px auto",width:"1080px","text-align":"left"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",{staticStyle:{"font-size":"30px","font-weight":"bold"}},[e._v("心愿单")]),e._v(" "),i("el-button",{staticStyle:{color:"#008489","font-weight":"bold","font-size":"15px",cursor:"pointer"},on:{click:e.createWish}},[e._v("创建心愿单")])],1),e._v(" "),i("hr",{staticStyle:{border:"1px  solid #eee",margin:"20px 0"}}),e._v(" "),e.wishList.length?i("div",{staticStyle:{"text-align":"right"}},[i("span",{staticStyle:{color:"#008489",cursor:"pointer"},on:{click:e.deelList}},[e._v(e._s(e.cancel))])]):e._e(),e._v(" "),i("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},e._l(e.wishList,function(t,a){return i("div",{staticClass:"wishMargin",staticStyle:{position:"relative",width:"330px",height:"250px",cursor:"pointer","border-radius":"10px",overflow:"hidden"},style:{"background-color":""==t.cover?"rgba(0,0,0,.8)":""}},[i("div",{staticStyle:{width:"330px",height:"250px",overflow:"hidden"},on:{click:function(i){e.toList(t,a)}}},[i("loadingImg",{directives:[{name:"show",rawName:"v-show",value:""!=t.cover,expression:"item.cover == ''? false:true"}],staticStyle:{width:"330px",height:"250px"},attrs:{type:"3",src:t.cover.domain+t.cover.image_url}})],1),e._v(" "),i("div",{staticStyle:{position:"absolute",bottom:"10px",left:"10px",display:"flex","justify-content":"space-between",width:"90%"}},[i("div",[i("span",{staticStyle:{color:"#FFF","font-weight":"bold"}},[e._v(e._s(t.group_name))]),i("br"),e._v(" "),i("span",{staticStyle:{color:"#fff","font-weight":"bold"}},[e._v(e._s(t.count)+"个心愿")])]),e._v(" "),i("div",[i("i",{staticClass:"el-icon-edit",staticStyle:{color:"#fff"},on:{click:function(i){e.toRename(t,a)}}})])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.deelIndex,expression:"deelIndex"}],staticClass:"animated fadeIn",staticStyle:{width:"25px",height:"25px","font-size":"25px",position:"absolute",top:"10px",right:"10px",color:"#fff"},on:{click:function(i){e.deel(t,a)}}},[i("i",{staticClass:"el-icon-delete"})])])})),e._v(" "),e.isXin?i("div",[i("None",{attrs:{type:"xin"}})],1):e._e(),e._v(" "),i("Foot")],1)])],1),e._v(" "),i("Bounced",{directives:[{name:"show",rawName:"v-show",value:e.isCreate,expression:"isCreate"}],attrs:{type:"create",wishCreate:e.wishCreate},on:{saveWish:e.saveWish,closeCreat:e.closeCreat}}),e._v(" "),e.isRena?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",bottom:"0",right:"0","background-color":"rgba(0,0,0,.5)",display:"flex","justify-content":"center","align-items":"center","z-index":"999"}},[i("div",{staticStyle:{width:"400px",padding:"20px","border-radius":"10px","background-color":"#fff","z-index":"999"}},[i("h3",[e._v("修改心愿单")]),e._v(" "),i("div",{staticStyle:{margin:"20px 0","text-align":"left"}},[e._m(0),e._v(" "),i("el-input",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{placeholder:"输入新名称"},model:{value:e.reName,callback:function(t){e.reName=t},expression:"reName"}})],1),e._v(" "),i("div",{staticStyle:{margin:"20px 0","text-align":"left"}},[e._m(1),e._v(" "),i("el-select",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.newChoose,callback:function(t){e.newChoose=t},expression:"newChoose"}},e._l(e.options,function(e){return i("el-option",{key:e.value,staticStyle:{width:"100%"},attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-button",{on:{click:e.abolishName}},[e._v("取消")]),e._v(" "),i("el-button",{on:{click:e.reNameCheck}},[e._v("确定")])],1)])]):e._e()],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("b",[this._v("修改心愿单名称")]),this._v(":")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("b",[this._v("隐私设置")]),this._v(":")])}]};var d=i("VU/8")(c,h,!1,function(e){i("gMSc")},"data-v-66dcc092",null);t.default=d.exports},gMSc:function(e,t){}});
//# sourceMappingURL=79.83b79fe57760044c6c57.js.map