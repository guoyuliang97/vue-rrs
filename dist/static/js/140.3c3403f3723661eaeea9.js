webpackJsonp([140],{Ddrk:function(t,e){},g4GC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Au9i"),n={name:"msysCon",data:function(){return{api:this.GLOBAL.baseURL,messId:"",title:"",create_time:""}},methods:{getMess:function(){var t=this;this.$http.post(this.api+"/SysMsgD",{token:localStorage.getItem("token"),msg_id:this.messId}).then(function(e){if(1==e.data.code){var i=e.data.data;t.title=i.title,t.create_time=i.send_time,document.getElementById("content").innerHTML=i.content}else 3==e.data.code?t.getMess():0==e.data.code&&s.MessageBox.alert(e.data.msg)})}},mounted:function(){this.getMess()},created:function(){this.messId=this.$route.query.information}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"1rem"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","margin-bottom":"2rem"}},[t._m(0),t._v(" "),i("div",{staticStyle:{"margin-left":"1rem",width:"100%"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[t._v("通知")]),t._v(" "),i("div",[t._v(t._s(t.create_time))])]),t._v(" "),i("div",{staticStyle:{padding:"1rem 0","border-bottom":"1px solid #eee",width:"100%"},attrs:{id:"content"}})])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{staticStyle:{width:"4rem",height:"4rem","border-radius":"50%"},attrs:{src:i("Sj6X")}})])}]};var d=i("VU/8")(n,a,!1,function(t){i("Ddrk")},"data-v-0e5f0e10",null);e.default=d.exports}});
//# sourceMappingURL=140.3c3403f3723661eaeea9.js.map