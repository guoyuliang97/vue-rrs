webpackJsonp([160],{"633R":function(t,e){},DfI5:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Au9i"),s=i("DRmq"),r=(s.a,a.MessageBox,{name:"editOwer",data:function(){return{btnList:[{img:"../../../static/img/static/wap/mes.png",title:"我的通知",router:"/myMessage"},{img:"../../../static/img/static/wap/order.png",title:"我的订单",router:"/mOrder"},{img:"../../../static/img/static/wap/Pstory.png",title:"我发布的故事",router:"/mPublishStory"},{img:"../../../static/img/static/wap/sysMes.png",title:"系统消息",router:"/msyMessage"},{img:"../../../static/img/static/wap/sheZ.png",title:"设置",router:"/mSetting"}],otherList:[{img:"../../../static/img/static/wap/tranvel.png",title:"旅行基金"},{img:"../../../static/img/static/wap/invitF.png",title:"邀请好友"},{img:"../../../static/img/static/wap/adress.png",title:"收货地址"},{img:"../../../static/img/static/wap/report.png",title:"反馈"}],hieght:"",userName:"",userImg:""}},components:{Head:s.a,MessageBox:a.MessageBox},methods:{toReport:function(){a.MessageBox.alert("请前往客户端或者APP查看更多内容")},toPage:function(t,e){this.$router.push(t.router)},getHeight:function(){var t=window.screen.height;this.hieght=.2*t},mobileReload:function(t){var e=t.data.data[0];this.userName=e.family_name+e.middle_name+e.name,this.userImg=e.head_image?e.headimage.domain+e.headimage.image_url:"../../../static/img/static/user.png"}},created:function(){window.scroll(0,0),this.getHeight()}}),n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Head",{on:{mobileReload:t.mobileReload}}),t._v(" "),i("div",{staticStyle:{padding:"4rem 1rem",background:"url('../../../static/img/home/1.png') no-repeat","background-size":"cover"},style:{height:t.hieght+"px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center","font-size":"1.6rem","font-weight":"bold",color:"#fff",height:"100%"}},[i("img",{staticStyle:{width:"5rem",height:"5rem","border-radius":"50%","margin-right":"1rem"},attrs:{src:t.userImg}}),t._v(" "),i("span",[t._v(t._s(t.userName?t.userName:"匿名用户"))])])]),t._v(" "),i("div",t._l(t.btnList,function(e,a){return i("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center","font-size":"1.5rem","border-bottom":"1px solid #eee",padding:"1rem"},on:{click:function(i){t.toPage(e,a)}}},[i("div",[i("img",{staticStyle:{width:"3rem"},attrs:{src:e.img}})]),t._v(" "),i("div",[t._v("\n        "+t._s(e.title)+"\n      ")])])})),t._v(" "),i("div",{staticStyle:{padding:"0.3rem","background-color":"#eee"}}),t._v(" "),i("div",{staticStyle:{padding:"2rem",display:"flex","flex-wrap":"wrap","justify-content":"space-between"}},t._l(t.otherList,function(e,a){return i("div",{staticStyle:{"text-align":"center"},on:{click:t.toReport}},[i("img",{staticStyle:{width:"5rem"},attrs:{src:e.img}}),t._v(" "),i("p",[t._v(t._s(e.title))])])}))],1)},staticRenderFns:[]};var o=i("VU/8")(r,n,!1,function(t){i("633R")},"data-v-034013af",null);e.default=o.exports}});
//# sourceMappingURL=160.6bcd8d7027a69eedb39c.js.map