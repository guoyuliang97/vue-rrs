webpackJsonp([89],{"1/v+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("/nBy"),i=a("ZKg9"),o=a("a20G"),d=(o.a,i.a,n.a,{name:"zanMessage",data:function(){return{api:this.GLOBAL.baseURL,ZanList:[],user_id:"",total:0,isLoading:!1,index:1}},components:{None:o.a,LoadingImg:i.a,Loading:n.a},methods:{getOwer:function(){var t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(e){if(1==e.data.code){var a=e.data.data[0];t.user_id=a.user_id,t.getZan(1)}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getOwer()}):0==e.data.code&&alert(e.data.msg)})},getZan:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/MyPraise",{token:localStorage.getItem("token"),user_id:this.user_id,page:t}).then(function(a){1==a.data.code?(e.ZanList=a.data.data.data,e.total=a.data.data.total,e.isLoading=!1):3==a.data.code?e.$http.post(e.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),e.getZan(t)}):0==a.data.code&&(e.isLoading=!1,alert(a.data.msg))})},handleCurrentChange:function(t){this.getZan(t)}},mounted:function(){this.getOwer()}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._l(t.ZanList,function(e,n){return a("div",{staticStyle:{display:"flex","justify-content":"flex-start",padding:"20px 0","border-bottom":"1px solid #eee","align-items":"center"}},[a("div",[a("div",{staticStyle:{width:"40px",height:"40px"}},[a("LoadingImg",{attrs:{type:"6",src:e.domain+e.image_url}})],1)]),t._v(" "),a("div",{staticStyle:{"text-align":"left","margin-left":"20px"}},[a("p",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(e.family_name+e.middle_name+e.name?e.family_name+e.middle_name+e.name:"匿名用户")+"   赞了我的《"+t._s(e.title)+"》")]),t._v(" "),a("p",{staticStyle:{color:"#999999"}},[t._v(t._s(e.create_time))])])])}),t._v(" "),t.ZanList.length?t._e():a("div",[a("None",{attrs:{type:"zan"}})],1),t._v(" "),a("div",{staticStyle:{margin:"20px 0"}},[a("el-pagination",{attrs:{"current-page":t.index,"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.index=e}}})],1),t._v(" "),t.isLoading?a("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[a("Loading")],1):t._e()],2)},staticRenderFns:[]};var r=a("VU/8")(d,s,!1,function(t){a("WF9G")},"data-v-5fdaaab7",null);e.default=r.exports},WF9G:function(t,e){}});
//# sourceMappingURL=89.a3a2b30267c44b2254ec.js.map