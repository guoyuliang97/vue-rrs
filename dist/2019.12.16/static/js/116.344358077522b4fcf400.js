webpackJsonp([116],{V7mn:function(t,e){},xpjW:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("DjrJ"),o=n("uTVu"),r=(i.a,{name:"invitVolunter",data:function(){return{activeID:"",UserID:"",colorIndex:0,list:[{name:"邀请志愿者",router:"/inviteList"},{name:"已邀请",router:"/sucessInvit"}]}},components:{Head:i.a},watch:{colorIndex:function(){this.colorIndex?this.$router.push({name:"sucessInvit",query:{activeId:this.activeID}}):this.$router.push({name:"inviteList",query:{activeId:this.activeID,information:this.UserID}})}},methods:{changeRouter:function(t,e){e!=this.colorIndex&&(this.colorIndex=e,this.$router.push(t.router))},goBack:function(){this.$router.push("/myPlay")}},created:function(){var t=this;o.a.$on("invitId",function(e){t.activeID=e}),o.a.$on("invitUser",function(e){t.UserID=e})}}),s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Head",{attrs:{type:"invitVolunter"}}),t._v(" "),n("div",{staticStyle:{width:"1080px",margin:"106px auto","text-align":"left"}},[t._m(0),t._v(" "),n("p",{staticStyle:{margin:"15px 0","font-size":"15px","font-weight":"bold",display:"flex","justify-content":"space-between"}},[t._v("邀请志愿者"),n("span",{staticStyle:{cursor:"pointer"},on:{click:t.goBack}},[n("i",{staticClass:"el-icon-arrow-left"}),t._v("返回")])]),t._v(" "),n("div",[n("ul",{staticStyle:{display:"flex","justify-content":"flex-start","border-bottom":"1px solid #eee"}},t._l(t.list,function(e,i){return n("li",{staticStyle:{"font-weight":"bold",width:"80px","margin-right":"10px","font-size":"12px",padding:"10px 0","text-align":"center"},style:{borderBottom:i==t.colorIndex?"2px solid #008489":"none",color:i==t.colorIndex?"#008489":"#000"},on:{click:function(n){t.changeRouter(e,i)}}},[t._v(t._s(e.name))])}))]),t._v(" "),n("router-view")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticStyle:{"font-size":"12px"}},[e("b",[this._v("我的策划 > 邀请志愿者")])])}]};var a=n("VU/8")(r,s,!1,function(t){n("V7mn")},"data-v-46006891",null);e.default=a.exports}});
//# sourceMappingURL=116.344358077522b4fcf400.js.map