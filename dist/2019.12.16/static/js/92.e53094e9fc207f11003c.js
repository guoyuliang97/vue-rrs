webpackJsonp([92],{LB6j:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("/nBy"),s=a("uTVu"),n=a("a20G"),r=a("Lt3X"),o=a("L5G4"),d=(r.a,n.a,o.a,i.a,{name:"friendMessage",data:function(){return{api:this.GLOBAL.baseURL,imgUrl:"../../../static/img/static/user.png",messageList:[],total:0,isChat:!1,otherId:"",otherImg:"",userImg:"",userName:"",isOwer:"",isLoading:!1,index:1}},components:{Person:r.a,None:n.a,Chat:o.a,Loading:i.a},methods:{getMsg:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/MyMsg",{token:localStorage.getItem("token"),page:t}).then(function(t){1==t.data.code?(e.messageList=t.data.data.data,e.total=t.data.data.total,e.isLoading=!1):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.getMsg()}):0==t.data.code&&(e.isLoading=!1,alert(t.data.msg))})},handleCurrentChange:function(t){this.getMsg(t),this.index=t},toChact:function(t,e){this.otherId=t.user_id,this.isOwer=t.to_user_id,this.userName=t.user.family_name+t.user.middle_name+t.user.name?t.user.family_name+t.user.middle_name+"·"+t.user.name:"匿名用户",this.otherImg=t.user.head_image?t.user.headimage.domain+t.user.headimage.image_url:this.imgUrl,this.isChat=!0,t.noread_count&&s.a.$emit("friendN",1)},chat:function(){this.isChat=!1,this.getMsg(this.index)}},mounted:function(){this.getMsg(this.index),localStorage.getItem("userImg")?this.userImg=localStorage.getItem("userImg"):this.userImg="../../../static/img/static/user.png"}}),g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"text-align":"left"}},[a("div",[t._l(t.messageList,function(e,i){return a("div",{staticStyle:{display:"flex","justify-content":"space-between",padding:"10px 0","border-bottom":"1px solid #eee"},on:{click:function(a){t.toChact(e,i)}}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[a("div",[a("img",{staticStyle:{"border-radius":"50%"},attrs:{src:e.user.head_image?e.user.headimage.domain+e.user.headimage.image_url:t.imgUrl,width:"48px",height:"48px"}})]),t._v(" "),a("div",{staticStyle:{"margin-left":"10px","line-height":"24px"}},[a("div",{staticStyle:{"font-weight":"bold"}},[t._v("\n           "+t._s(e.user.family_name+e.user.middle_name+e.user.name?e.user.family_name+e.user.middle_name+"·"+e.user.name:"匿名用户")+"\n         ")]),t._v(" "),a("div",{staticStyle:{"font-size":"12px"}},[t._v("\n            "+t._s(e.content)+"\n          ")])])]),t._v(" "),a("div",{staticStyle:{"font-size":"12px"},style:{lineHeight:e.noread_count?"25px":"50px"}},[a("p",[t._v(t._s(e.create_time))]),t._v(" "),e.noread_count?a("div",{staticStyle:{float:"right","margin-top":"10px",width:"20px",height:"20px","border-radius":"50%","background-color":"red",color:"#fff","text-align":"center","line-height":"20px"}},[t._v("\n          "+t._s(e.noread_count)+"\n        ")]):t._e()])])}),t._v(" "),t.messageList.length?t._e():a("None",{attrs:{type:"message"}})],2),t._v(" "),a("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[a("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),t.isChat?a("Chat",{attrs:{userName:t.userName,to_user_id:t.otherId,other_img:t.otherImg,userUrl:t.userImg,isOwer:t.isOwer},on:{chat:t.chat}}):t._e(),t._v(" "),t.isLoading?a("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[a("Loading")],1):t._e()],1)},staticRenderFns:[]};var l=a("VU/8")(d,g,!1,function(t){a("rgs0")},"data-v-5e40adfd",null);e.default=l.exports},rgs0:function(t,e){}});
//# sourceMappingURL=92.e53094e9fc207f11003c.js.map