webpackJsonp([100],{pWd6:function(e,t){},rctP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("/nBy"),i=n("a20G"),o=n("Lt3X"),s=n("uTVu"),r=(o.a,i.a,a.a,{name:"friendsNotice",data:function(){return{api:this.GLOBAL.baseURL,friendList:[],noThing:"",total:0,isLoading:!1}},components:{Person:o.a,None:i.a,Loading:a.a},methods:{handleCurrentChange:function(e){this.getFrideng(e)},agree:function(e,t){var n=this;this.$http.post(this.api+"/home/Friend/agree",{token:localStorage.getItem("token"),notice_id:e.notice_id,status:1}).then(function(t){1==t.data.code?(n.sendNumber(),e.isShow=!e.isShow,e.activeIndex=1):(t.data.code,alert(t.data.msg))})},refuse:function(e,t){var n=this;this.$http.post(this.api+"/home/Friend/agree",{token:localStorage.getItem("token"),notice_id:e.notice_id,status:2}).then(function(a){1==a.data.code?(n.sendNumber(),e.isShow=!e.isShow,e.activeIndex=2):3==a.data.code?n.$http.post(n.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),n.refuse(e,t)}):0==a.data.code&&alert(a.data.msg)})},ignore:function(e,t){var n=this;this.$http.post(this.api+"/home/Friend/agree",{token:localStorage.getItem("token"),notice_id:e.notice_id,status:3}).then(function(a){1==a.data.code?(n.sendNumber(),e.isShow=!e.isShow,n.friendList.splice(t,1)):3==a.data.code?n.$http.post(n.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),n.ignore(e,t)}):0==a.data.code&&alert(a.data.msg)})},toPerson:function(e,t){this.$router.push({path:"/userdata",query:{information:e.userId}})},sendNumber:function(){s.a.$emit("reduceNotice",1)},getFrideng:function(e){var t=this;this.isLoading=!0,this.$http.post(this.api+"/home/Friend/getlist",{token:localStorage.getItem("token"),page:e}).then(function(n){if(1==n.data.code){var a=n.data.data.data;if(a.length){for(var i=[],o=0;o<a.length;o++){var s="";s=a[o].fuser.head_image?a[o].fuser.headimage.domain+a[o].fuser.headimage.image_url:"../../../static/img/static/user.png",0==a[o].status?i.push({imgUrl:s,name:a[o].fuser.family_name+a[o].fuser.middle_name+a[o].fuser.name,content:a[o].msg,isShow:!0,userId:a[o].fuser.user_id,activeIndex:a[o].status,notice_id:a[o].notice_id}):i.push({imgUrl:s,name:a[o].fuser.family_name+a[o].fuser.middle_name+a[o].fuser.name,content:a[o].msg,isShow:!1,userId:a[o].fuser.user_id,activeIndex:a[o].status,notice_id:a[o].notice_id})}t.friendList=i}else t.noThing="暂无数据";t.isLoading=!1}else 3==n.data.code?t.$http.post(t.api+"/home/index/token").then(function(n){localStorage.setItem("token",n.data.data),t.getFrideng(e)}):0==n.data.code&&(t.isLoading=!1,alert(n.data.msg))})}},mounted:function(){this.getFrideng(1)}}),d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.friendList,function(t,a){return n("div",{staticStyle:{"text-align":"left","margin-bottom":"20px","border-bottom":"1px solid #eee"}},[n("Person",{attrs:{type:"9",imgUrl:t.imgUrl,name:t.name?t.name:"匿名用户",content:t.content,activeIndex:t.activeIndex,isShow:t.isShow},on:{toPerson:function(n){e.toPerson(t,a)},agree:function(n){e.agree(t,a)},refuse:function(n){e.refuse(t,a)},ignore:function(n){e.ignore(t,a)}}})],1)}),e._v(" "),e.friendList.length?e._e():n("None",{attrs:{type:"message"}}),e._v(" "),n("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[n("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),e.isLoading?n("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[n("Loading")],1):e._e()],2)},staticRenderFns:[]};var c=n("VU/8")(r,d,!1,function(e){n("pWd6")},"data-v-4c64ebad",null);t.default=c.exports}});
//# sourceMappingURL=100.1203f60c2113d09f6d61.js.map