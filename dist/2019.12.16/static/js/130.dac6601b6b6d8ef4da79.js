webpackJsonp([130],{seEQ:function(e,t){},xy6K:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("L5G4"),n=a("Lt3X"),s=(n.a,i.a,{name:"friend",data:function(){return{api:this.GLOBAL.baseURL,activeNames:["1"],friendList:[],isChat:!1,replayList:[],user_id:"",imgUrl:"",to_user_id:"",other_img:"",pageIndex:1,totalPage:"",userName:""}},components:{Person:n.a,Chat:i.a},methods:{toPerson:function(e,t){this.$router.push({path:"/userdata",query:{information:e.to_user_id}})},chat:function(){this.isChat=!1},deel:function(e,t){var a=this;this.$confirm("此操作将删除该好友, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.deleteFriend(e,t)}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},deleteFriend:function(e,t){var a=this;this.$http.post(this.api+"/home/Friend/del",{token:localStorage.getItem("token"),f_user_id:e.to_user_id}).then(function(i){1==i.data.code?(a.friendList.splice(t,1),a.$message({type:"success",message:"删除成功!"})):3==i.data.code?a.$http.post(a.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),a.deleteFriend(e,t)}):alert(i.data.msg)})},handleChange:function(e){},toTalk:function(e,t){this.to_user_id=e.to_user_id,this.other_img=e.imgUrl,this.userName=e.name?e.name:"匿名用户",this.isChat=!0}},mounted:function(){var e=this,t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(t){1==t.data.code&&(e.user_id=t.data.data[0].user_id)}),this.$http.post(t.api+"/home/Friend/myfriend",{token:localStorage.getItem("token"),page:1}).then(function(e){if(1==e.data.code)for(var a=e.data.data.data,i=0;i<a.length;i++){var n="";n=a[i].user.head_image?a[i].user.headimage.domain+a[i].user.headimage.image_url:"../../../static/img/static/user.png",t.friendList.push({imgUrl:n,name:a[i].user.family_name+a[i].user.middle_name+a[i].user.name,to_user_id:a[i].f_user_id})}})},created:function(){this.imgUrl=localStorage.getItem("userImg")}}),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"text-align":"left"}},[a("el-collapse",{on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"我的好友("+e.friendList.length+")",name:"1"}},e._l(e.friendList,function(t,i){return a("div",{staticStyle:{margin:"20px 0","border-bottom":"1px solid #eee"}},[a("Person",{attrs:{type:"6",imgUrl:t.imgUrl,name:t.name?t.name:"匿名用户"},on:{toPerson:function(a){e.toPerson(t,i)},totalk:function(a){e.toTalk(t,i)},deel:function(a){e.deel(t,i)}}})],1)}))],1),e._v(" "),e.isChat?a("Chat",{attrs:{userName:e.userName,to_user_id:e.to_user_id,other_img:e.other_img,userUrl:e.imgUrl,isOwer:e.user_id},on:{chat:e.chat}}):e._e()],1)},staticRenderFns:[]};var r=a("VU/8")(s,o,!1,function(e){a("seEQ")},"data-v-306b3b56",null);t.default=r.exports}});
//# sourceMappingURL=130.dac6601b6b6d8ef4da79.js.map