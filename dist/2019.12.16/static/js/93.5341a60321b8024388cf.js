webpackJsonp([93],{"9CTt":function(t,e){},JH0Y:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("a20G"),n=a("mnKu"),s=(i.a,{name:"sucessInvit",data:function(){return{api:this.GLOBAL.baseURL,options:[{label:"待处理",value:"0"},{label:"已同意",value:"1"},{label:"已拒绝",value:"2"}],value:"",sucessList:[],active_id:"",total:0,language:[],asdasdasd:"",index:1}},components:{None:i.a},watch:{value:function(){this.getList(1)}},methods:{timeNow:function(t){for(var e="",a=0;a<t.slot.length;a++)e+=t.slot[a].begin_time+"—"+t.slot[a].end_time+" ||  ";this.asdasdasd=e},open:function(t,e){var a=this;this.$confirm("您正在撤回对该志愿者的邀请, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.returnInvit(t,e)}).catch(function(){a.$message({type:"info",message:"已取消撤回"})})},returnInvit:function(t,e){var a=this;this.$http.post(this.api+"/InviteD",{token:localStorage.getItem("token"),invite_id:t.invite_id}).then(function(i){1==i.data.code?(a.sucessList.splice(e,1),a.$message({type:"success",message:"撤回成功!"})):3==i.data.code?a.$http.post(a.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),a.returnInvit(t,e)}):alert(i.data.msg)})},getList:function(t){var e=this;this.$http.post(this.api+"/InviteListMy",{token:localStorage.getItem("token"),audit:this.value,activity_id:this.active_id,page:t}).then(function(a){1==a.data.code?(e.total=a.data.data.total,e.sucessList=a.data.data.data):3==a.data.code?e.$http.post(e.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),e.getSucess(t)}):0==a.data.code&&alert(a.data.msg)})},getSucess:function(t){var e=this;this.$http.post(this.api+"/InviteListMy",{token:localStorage.getItem("token"),activity_id:this.active_id,page:t}).then(function(a){1==a.data.code?(e.total=a.data.data.total,e.sucessList=a.data.data.data):3==a.data.code?e.$http.post(e.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),e.getSucess(t)}):alert(a.data.msg)})},handleCurrentChange:function(t){this.value?this.getList(t):this.getSucess(t)}},mounted:function(){this.getSucess(1)},created:function(){this.active_id=this.$route.query.activeId,this.language=Object(n.a)()}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"margin-top":"15px"}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start","font-size":"12px","line-height":"40px"}},[a("div",[t._v("筛选")]),t._v(" "),a("div",{staticStyle:{"margin-left":"15px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("div",{staticStyle:{"margin-top":"15px"}},t._l(t.sucessList,function(e,i){return a("div",{key:i,staticStyle:{display:"flex",padding:"15px 0","justify-content":"space-between","border-bottom":"1px solid #E8E8E8"}},[a("div",[a("img",{attrs:{src:e.domain?e.domain+e.image_url:"../../../static/img/static/user.png",width:"200px",height:"200px"}})]),t._v(" "),a("div",{staticStyle:{width:"750px","font-size":"15px","line-height":"40px","margin-left":"20px"}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[a("div",[t._v(t._s(e.family_name+e.middle_name+e.name?e.family_name+"·"+e.middle_name+"·"+e.name:"匿名用户"))]),t._v(" "),a("div",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(e.score))]),t._v(" "),a("div",{staticStyle:{"margin-left":"10px","padding-top":"10px"}},[a("el-rate",{attrs:{disabled:"",value:parseFloat(e.score),colors:["#008489","#008489","#008489"]}})],1)]),t._v(" "),a("div",[a("span",[a("b",[t._v(t._s(0==e.six?"私密":1==e.six?"男":"女"))])]),t._v(" "),a("span",{staticStyle:{"margin-left":"13px"}},[a("b",[t._v(t._s(0!=e.country?e.country:"未知"))])])]),t._v(" "),a("div",[a("p",[t._v(t._s(t.language[e.language].label)+"/"),t._l(e.other_language.split(","),function(e){return a("span",[t._v(t._s(e?0==e?"中文,":1==e?"English,":"日本语,":""))])})],2)]),t._v(" "),a("div",[t._v("\n          "+t._s(e.introduce?e.introduce:"这个人很懒！什么都没留下")+"\n        ")]),t._v(" "),e.slot.length<2?a("div",[t._v("\n          邀请志愿者时间："),a("span",[t._v(t._s(e.slot[0].begin_time+"—"+e.slot[0].end_time))])]):t._e(),t._v(" "),e.slot.length>1?a("div",[a("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"500",content:t.asdasdasd},on:{show:function(a){t.timeNow(e)}}},[a("el-button",{staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v("邀请志愿者时间：多个时间段(点击查看)")])],1)],1):t._e()]),t._v(" "),a("div",{staticStyle:{"text-align":"right",width:"68px"},style:{lineHeight:e.audit?"200px":"100px"}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[t._v(t._s(e.audit?1==e.audit?"已同意":"已拒绝":"待处理"))]),t._v(" "),0==e.status&&0==e.audit?a("el-button",{staticStyle:{width:"68px",margin:"0","border-color":"#008489",color:"#008489","background-color":"#fff"},attrs:{size:"mini"},on:{click:function(a){t.open(e,i)}}},[t._v("撤回")]):t._e()],1)])})),t._v(" "),t.sucessList.length?t._e():a("None",{attrs:{type:"suceeIvit"}}),t._v(" "),a("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[a("el-pagination",{attrs:{"current-page":t.index,"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.index=e}}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(s,o,!1,function(t){a("9CTt")},"data-v-57459371",null);e.default=l.exports}});
//# sourceMappingURL=93.5341a60321b8024388cf.js.map