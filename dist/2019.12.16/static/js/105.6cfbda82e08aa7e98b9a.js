webpackJsonp([105],{V9L6:function(t,e){},XEjR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("/nBy"),o=i("DjrJ"),s=i("a20G"),n=(o.a,a.a,s.a,{name:"publishList",data:function(){return{api:this.GLOBAL.baseURL,publishList:[],loadingState:!1,user:"",activeName:"2",audit_face:"",isLook:!1,idCard:"",name:"",isLoading:!1,refuse_reason:""}},components:{Head:o.a,Loading:a.a,None:s.a},methods:{handleClick:function(t){this.getPublish(this.activeName)},toExperience:function(){this.$router.push("/experience")},deelActive:function(t,e){var i=this;this.$http.post(this.api+"/home/Activity/del_activity",{token:localStorage.getItem("token"),activity_id:t.active_id}).then(function(t){1==t.data.code?(i.$message({type:"success",message:"删除成功!"}),i.getPublish()):3==t.data.code?alert(t.data.msg):i.$alert(t.data.msg)})},active:function(t,e){this.$router.push({name:"Experience",query:{information:t.active_id,complete:t.complete}})},abolish:function(t,e){t.visible=!1},getPublish:function(){var t=this;this.$http.post(this.api+"/home/Activity/complete",{token:localStorage.getItem("token"),flag:this.activeName}).then(function(e){if(1==e.data.code){for(var i=e.data.data,a=[],o=0;o<i.length;o++)i[o].cover_image?a.push({backUrl:i[o].cover.domain+i[o].cover.themb_url,complete:i[o].complete,active_id:i[o].activity_id,title:i[o].title,step:15-i[o].step.replace(/[^0-9]/gi," ").trim().split(/\s+/).length,audit:i[o].audit,status:i[o].status,visible:!1,reason:i[o].reason}):a.push({backUrl:"../../../static/img/static/defult.png",complete:i[o].complete,active_id:i[o].activity_id,title:i[o].title,step:15-i[o].step.replace(/[^0-9]/gi," ").trim().split(/\s+/).length,audit:i[o].audit,status:i[o].status,visible:!1,reason:i[o].reason});t.publishList=a}else 3==e.data.code&&t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getPublish()})})},tocheck:function(){this.$router.push("/authentication")},getUser:function(){var t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(e){if(1==e.data.code){console.log(e);var i=e.data.data[0];t.audit_face=i.audit_face,t.name=i.family_name+i.middle_name+i.name,t.idCard=i.idcard_n.slice(0,5),t.refuse_reason=i.refuse_reason,t.isLoading=!1}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getUser()}):0==e.data.code&&alert(e.data.msg)})},lookYan:function(){this.isLook=!this.isLook}},mounted:function(){localStorage.removeItem("active_id");this.isLoading=!0,this.handleClick(),this.getUser(),this.$route.query.information&&(this.activeName=this.$route.query.information)}}),l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-container",[i("el-header",[i("Head",{attrs:{type:"publishList"}})],1),t._v(" "),i("el-main",{staticStyle:{width:"900px",margin:"20px auto","text-align":"left"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[i("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[i("p",{staticStyle:{"font-size":"30px","font-weight":"bold"}},[t._v("欢迎回来")]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px"}},[0==t.audit_face?i("div",{staticStyle:{margin:"10px 0",color:"red"}},[i("el-button",{staticStyle:{border:"1px solid red",color:"red"},attrs:{size:"mini"}},[t._v("未验证身份证信息")]),i("span",{staticStyle:{"border-bottom":"1px solid red","font-size":"13px","margin-left":"10px",cursor:"pointer"},on:{click:t.tocheck}},[t._v("去验证")])],1):t._e(),t._v(" "),1==t.audit_face?i("el-button",{staticStyle:{margin:"10px 0",color:"#008489",border:"1px solid #008489"},attrs:{size:"mini"}},[t._v("验证身份已提交")]):t._e(),t._v(" "),2==t.audit_face?i("div",{staticStyle:{margin:"10px 0",color:"#008489"}},[i("el-button",{staticStyle:{margin:"10px 0",color:"#008489",border:"1px solid #008489"},attrs:{size:"mini"}},[t._v("身份验证已通过")]),i("span",{staticStyle:{"border-bottom":"1px solid #008489","font-size":"13px","margin-left":"10px",cursor:"pointer"},on:{click:t.lookYan}},[t._v(t._s(t.isLook?"收起":"查看"))])],1):t._e(),t._v(" "),3==t.audit_face?i("div",{staticStyle:{color:"red","font-size":"13px"}},[i("el-button",{staticStyle:{margin:"10px 0",color:"red",border:"1px solid red"},attrs:{size:"mini"}},[t._v("身份审核不通过，原因："+t._s(t.refuse_reason))]),t._v(" "),i("span",{staticStyle:{"margin-left":"20px","border-bottom":"1px solid red",cursor:"pointer"},on:{click:t.tocheck}},[t._v("去验证")])],1):t._e()],1)]),t._v(" "),t.isLook?i("div",{staticStyle:{display:"flex","justify-content":"flex-start","background-color":"#F2F2F2",padding:"5px","font-size":"13px"}},[i("div",[t._v("姓名："+t._s(t.name.slice(0,4))+"*")]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px"}},[t._v("身份证号："+t._s(t.idCard)+"*********")])]):t._e(),t._v(" "),i("p",[t._v("查看并编辑您的全部体验。祝您体验之旅愉快！")])]),t._v(" "),i("div",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.toExperience}},[t._v("新体验")])],1)]),t._v(" "),i("div",{staticStyle:{"margin-top":"15px"}},[i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"待审核",name:"2"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"已通过",name:"3"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"未通过",name:"4"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"未提交",name:"1"}})],1)],1),t._v(" "),i("Loading",{directives:[{name:"show",rawName:"v-show",value:t.loadingState,expression:"loadingState"}],staticStyle:{"text-align":"center"}}),t._v(" "),t._l(t.publishList,function(e,a){return 0==e.status?i("div",{staticStyle:{display:"flex","justify-content":"space-around",padding:"20px 0","border-bottom":"1px solid #E6E6E6"}},[i("div",{staticStyle:{width:"300px",height:"200px","background-size":"100% 100%","font-size":"14px"},style:{backgroundImage:e.backUrl?"url("+e.backUrl+")":"url(../../../static/img/static/defult.png)"}},[1==e.complete&&0==e.audit?i("div",{staticClass:"experienceState",staticStyle:{backgroundColor:"rgba(\t255,255,255,1)",width:"90px",color:"#000"}},[t._v("体验已提交")]):t._e(),t._v(" "),0==e.complete&&0==e.audit?i("div",{staticClass:"experienceState",staticStyle:{backgroundColor:"rgba(255,165,0,.8)",width:"60px"}},[t._v("进行中")]):t._e(),t._v(" "),1==e.complete&&2==e.audit?i("div",{staticClass:"experienceState",staticStyle:{backgroundColor:"rgba(255,0,0,.5)",width:"60px"}},[t._v("已拒绝")]):t._e(),t._v(" "),1==e.complete&&1==e.audit?i("div",{staticClass:"experienceState",staticStyle:{backgroundColor:"rgba(0,255,0,.5)",width:"60px"}},[t._v("通过")]):t._e()]),t._v(" "),i("div",{staticStyle:{"line-height":"40px",width:"400px"}},[i("h2",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.title))]),t._v(" "),""==e.title?i("h2",[t._v("体验")]):t._e(),t._v(" "),0!=e.step?i("p",[t._v("在您提交体验前，还需要完成"+t._s(e.step)+"步骤。")]):t._e(),t._v(" "),0==e.step&&0==e.complete&&1!=e.audit?i("p",[t._v("您的体验未提交,快去提交吧!")]):t._e(),t._v(" "),1==e.complete&&0==e.audit?i("p",{staticStyle:{color:"red"}},[t._v("您的体验已提交，将在2-4天内给予审核结果。")]):t._e(),t._v(" "),1==e.audit?i("p",[t._v("您的体验已通过审核，快去组织您的体验吧！")]):t._e(),t._v(" "),1==e.complete&&2==e.audit?i("p",{staticStyle:{color:"red"}},[t._v("提示："),i("span",[t._v(t._s(e.reason))])]):t._e(),t._v(" "),0==e.complete?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.active(e,a)}}},[t._v("继续")]):t._e(),t._v(" "),1==e.complete?i("el-button",{attrs:{type:"primary"},on:{click:function(i){t.active(e,a)}}},[t._v("查看")]):t._e()],1),t._v(" "),i("div",[i("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(i){t.$set(e,"visible",i)},expression:"item.visible"}},[i("p",[t._v("这是一段内容这是一段内容确定删除吗？")]),t._v(" "),i("div",{staticStyle:{"text-align":"right",margin:"0"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.abolish(e,a)}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.deelActive(e,a)}}},[t._v("确定")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference",icon:"el-icon-delete"},slot:"reference"})],1)],1)]):t._e()}),t._v(" "),t.publishList.length?t._e():i("div",[i("None",{attrs:{type:"publish"}})],1)],2)],1),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"990","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e()],1)},staticRenderFns:[]};var c=i("VU/8")(n,l,!1,function(t){i("V9L6")},"data-v-4c6408fd",null);e.default=c.exports}});
//# sourceMappingURL=105.6cfbda82e08aa7e98b9a.js.map