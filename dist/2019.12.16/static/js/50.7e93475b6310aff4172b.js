webpackJsonp([50],{"4phs":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("/nBy"),n=i("ZKg9"),s=i("a20G"),o=(s.a,n.a,a.a,{name:"overInvite",data:function(){return{api:this.GLOBAL.baseURL,volunList:[],total:0,isLoading:!1}},components:{None:s.a,LoadingImg:n.a,Loading:a.a},methods:{toPublish:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})},handleCurrentChange:function(t){this.getOverlist(t)},getOverlist:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/CompleteMy",{token:localStorage.getItem("token"),page:t}).then(function(i){1==i.data.code?(e.volunList=i.data.data.data,e.total=i.data.data.total,e.isLoading=!1):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getOverlist(t)}):0==i.data.code&&(alert(i.data.msg),e.isLoading=!1)})}},mounted:function(){this.getOverlist(1)}}),l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"margin-top":"15px"}},[i("div",{staticStyle:{"margin-top":"17px"}},t._l(t.volunList,function(e,a){return i("div",{key:a,staticStyle:{padding:"18px 0","border-bottom":"1px solid #E8E8E8"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","font-size":"14px","line-height":"48px"}},[i("div",[i("img",{staticStyle:{"border-radius":"50%"},attrs:{src:e.head_image?e.head_domain+e.head_image_url:"../../../static/img/static/user.png",width:"48px",height:"48px"}})]),t._v(" "),i("div",{staticStyle:{margin:"0 10px"}},[t._v("\n         "+t._s(e.family_name+e.middle_name+e.name?e.family_name+e.middle_name+e.name:"匿名用户")+"\n        ")]),t._v(" "),i("div",{staticStyle:{color:"#999999"}},[t._v("\n          "+t._s(e.create_time)+"\n        ")])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[i("LoadingImg",{staticStyle:{width:"200px",height:"135px",overflow:"hidden",cursor:"pointer"},attrs:{type:"3",src:e.act_domian+e.act_image_url},on:{toPublish:function(i){t.toPublish(e,a)}}})],1),t._v(" "),i("div",{staticStyle:{width:"750px","font-size":"12px","line-height":"30px"}},[i("p",{staticStyle:{color:"#999999"}},t._l(e.kind,function(e){return i("span",[t._v(t._s("/"+e.kind_name))])})),t._v(" "),i("p",[i("b",[t._v(t._s(e.title))])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[i("span",[t._v(t._s(e.score))]),t._v(" "),i("div",{staticStyle:{"margin-left":"10px"}},[i("el-rate",{staticStyle:{"margin-top":"5px"},attrs:{disabled:"",value:parseInt(e.score),colors:["#008489","#008489","#008489"]}})],1),t._v(" "),i("div",{staticStyle:{"margin-left":"15px"}},[t._v("\n              评论("+t._s(e.comment_num)+")\n            ")])]),t._v(" "),i("div",{staticStyle:{"margin-top":"15px"}},[i("span",[t._v("￥"+t._s(e.price))]),t._v(" "),i("span",{staticStyle:{color:"#008489","margin-left":"10px"}},[t._v("邀请时间："+t._s(e.begin_time+"—"+e.end_time))])])]),t._v(" "),i("div",[i("div",[i("el-button",{attrs:{type:"primary"}},[t._v("已完成")])],1)])])])})),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.volunList.length,expression:"!volunList.length"}]},[i("None",{attrs:{type:"myInvite"}})],1),t._v(" "),i("div",{staticStyle:{margin:"20px 0"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"990","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e()])},staticRenderFns:[]};var r=i("VU/8")(o,l,!1,function(t){i("EfOZ")},"data-v-bc7db03c",null);e.default=r.exports},EfOZ:function(t,e){}});
//# sourceMappingURL=50.7e93475b6310aff4172b.js.map