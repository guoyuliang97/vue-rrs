webpackJsonp([127],{"G+BM":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("ZKg9"),o=e("/nBy"),n=e("L5G4"),a=e("mnKu"),r=e("DjrJ"),l=e("a20G"),d=(l.a,r.a,n.a,o.a,s.a,{name:"LookOrder",data:function(){return{api:this.GLOBAL.baseURL,volunList:[],activity_id:"",total:0,content:"",languageList:[],lookHouse:!1,houseList:[],houseHeight:"",activeName:"first",slot_id:"",isChat:!1,imgUrl:"",userid:"",to_user_id:"",userName:"",other_img:"",isLoading:!1,index:1,serchList:[{name:"全部"},{name:"已付款"},{name:"未付款"},{name:"已主动退款"},{name:"已完成"}],ListIndex:0,orderList:[{name:"活动时间从早到晚",index:1},{name:"活动时间从晚到早",index:-1},{name:"下单时间升序",index:2},{name:"下单时间降序",index:-2}],Isorder:!1,orderIndex:0,orderSort:1}},components:{None:l.a,Head:r.a,Chat:n.a,Loading:o.a,loadingImg:s.a},watch:{lookHouse:function(){var t=this;this.lookHouse&&this.$nextTick(function(){t.houseHeight=document.getElementById("houseA").offsetHeight})},orderSort:function(){"1"==this.ListIndex?(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort)):"0"==this.ListIndex?(this.index=1,this.getEroll(1,"",this.slot_id,this.orderSort)):"2"==this.ListIndex?(this.index=1,this.getEroll(1,0,this.slot_id,this.orderSort)):"3"==this.ListIndex?(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort,2,"",1)):(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort,0,2))}},methods:{changeOrder:function(t,i){this.orderIndex=i,this.orderSort=t.index},orderClick:function(){this.Isorder=!this.Isorder},changeClickList:function(t,i){this.ListIndex=i,"1"==this.ListIndex?(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort)):"0"==this.ListIndex?(this.index=1,this.getEroll(1,"",this.slot_id,this.orderSort)):"2"==this.ListIndex?(this.index=1,this.getEroll(1,0,this.slot_id,this.orderSort)):"3"==this.ListIndex?(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort,2,"",1)):(this.index=1,this.getEroll(1,1,this.slot_id,this.orderSort,0,2))},reload:function(t){var i=t.data.data[0];this.userid=i.user_id,this.imgUrl=i.head_image?i.headimage.domain+i.headimage.image_url:"../../../static/img/static/user.png"},lookXq:function(t,i){this.lookHouse=!this.lookHouse,this.houseList=t.house},goBack:function(){this.$router.go(-1)},getEroll:function(t,i,e,s,o,n,a){var r=this;this.isLoading=!0,this.$http.post(this.api+"/OrderLPlanner",{token:localStorage.getItem("token"),activity_id:this.activity_id,flag:i,page:t,slot_id:e,status:o,iscomplete:n,sort:s,type:a}).then(function(s){1==s.data.code?(r.volunList=s.data.data.data,r.total=s.data.data.total,r.isLoading=!1):3==s.data.code?r.$http.post(r.api+"/home/index/token").then(function(s){localStorage.setItem("token",s.data.data),r.getEroll(t,i,e)}):0==s.data.code&&alert(s.data.msg)})},handleCurrentChange:function(t){"1"==this.ListIndex?this.getEroll(1,1,this.slot_id,this.orderSort):"0"==this.ListIndex?this.getEroll(1,"",this.slot_id,this.orderSort):"2"==this.ListIndex?this.getEroll(1,0,this.slot_id,this.orderSort):"3"==this.ListIndex?this.getEroll(1,1,this.slot_id,this.orderSort,2,"",1):this.getEroll(1,1,this.slot_id,this.orderSort,0,2)},takeUp:function(t,i){this.content=t.activ_begin_time+"—"+t.activ_end_time},changeErollA:function(t,i){2==i?this.$router.push({path:"/playerReturn",query:{information:t.order_id}}):3==i?this.$router.push({path:"/refundDescirbe",query:{information:t.order_id,type:2}}):(this.isChat=!0,this.to_user_id=t.user.user_id,this.userName=t.user.family_name+t.user.middle_name+t.user.name?t.user.family_name+t.user.middle_name+t.user.name:"匿名用户",this.other_img=t.user.head_image?t.user.headimage.domain+t.user.headimage.image_url:"../../../static/img/static/user.png")},toRefundDes:function(t){this.$router.push({path:"/refundDescirbe",query:{information:t.order_id,type:1}})},chat:function(){this.isChat=!1}},mounted:function(){this.getEroll(1,"",this.slot_id,this.orderSort)},created:function(){this.activity_id=this.$route.query.activeId,this.slot_id=this.$route.query.slot_id,this.languageList=Object(a.a)()}}),c={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{"margin-top":"10px"}},[e("Head",{attrs:{type:"myPlay"},on:{reload:t.reload}}),t._v(" "),e("div",{staticStyle:{width:"1080px",margin:"106px auto"}},[e("h4",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[t._v("我的策划>查看预定("+t._s(t.volunList.length)+")"),e("span",{staticStyle:{cursor:"pointer"},on:{click:t.goBack}},[e("i",{staticClass:"el-icon-arrow-left"}),t._v("返回")])]),t._v(" "),e("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[e("div",{staticStyle:{"font-size":"13px",display:"flex","justify-content":"flex-start"}},t._l(t.serchList,function(i,s){return e("span",{staticClass:"aras",style:{backgroundColor:t.ListIndex==s?"#008489":"#F1F1F1",color:t.ListIndex==s?"#fff":"#000"},on:{click:function(e){t.changeClickList(i,s)}}},[t._v(t._s(i.name))])})),t._v(" "),e("div",{staticStyle:{"font-size":"13px",position:"relative"}},[e("span",{staticStyle:{cursor:"pointer"},on:{click:t.orderClick}},[t._v("排序"),e("i",{class:t.Isorder?"el-icon-arrow-up":"el-icon-arrow-down"})]),t._v(" "),t.Isorder?e("div",{staticStyle:{position:"absolute","background-color":"#F3F3F3",padding:"10px 20px",width:"100px",left:"-100px"}},t._l(t.orderList,function(i,s){return e("p",{staticStyle:{padding:"10px 0","font-size":"12px","font-weight":"bold",cursor:"pointer"},style:{color:t.orderIndex==s?"#008489":"#000"},on:{click:function(e){t.changeOrder(i,s)}}},[t._v(t._s(i.name))])})):t._e()])]),t._v(" "),t._m(0),t._v(" "),t._l(t.volunList,function(i,s){return e("div",{key:s,staticStyle:{"border-bottom":"1px solid #E6E6E6"}},[e("div",{staticStyle:{display:"flex","justify-content":"space-between","font-size":"12px","text-align":"center"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start",width:"150px",padding:"19px 0"}},[e("img",{staticStyle:{"border-radius":"50%","margin-left":"40px"},attrs:{src:i.user.head_image?i.user.headimage.domain+i.user.headimage.image_url:"../../../static/img/static/user.png",width:"32px",height:"32px"}}),t._v(" "),e("div",{staticStyle:{"line-height":"32px","margin-left":"10px",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(i.user.family_name+i.user.middle_name+i.user.name?i.user.name:"匿名用户"))])]),t._v(" "),e("div",{staticClass:"width"},[t._v(t._s(i.num))]),t._v(" "),e("div",[e("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"200",content:t.content},on:{show:function(e){t.takeUp(i,s)}}},[e("el-button",{staticClass:"width",staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(i.activ_begin_time)+"-"+t._s(i.activ_end_time))])],1)],1),t._v(" "),e("div",{staticStyle:{width:"150px",height:"70px"}},[e("el-button",{staticStyle:{border:"none",padding:"0","margin-top":"30px"},style:{color:i.house.length?"#008489":"#000"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(i.house.length?"已预定":"无"))]),t._v(" "),i.house.length?e("p",{staticStyle:{"margin-top":"5px","font-weight":"bold",cursor:"pointer"},on:{click:function(e){t.lookXq(i,s)}}},[t._v("查看详情>")]):t._e()],1),t._v(" "),e("div",[e("el-popover",{attrs:{placement:"top-start",trigger:"click",width:"200",content:i.introduce}},[e("el-button",{staticClass:"width",staticStyle:{border:"none",padding:"0"},attrs:{slot:"reference",plain:""},slot:"reference"},[t._v(t._s(i.user.mobile))])],1)],1),t._v(" "),e("div",{staticClass:"width",staticStyle:{color:"#008489"}},[e("span",[t._v(t._s(1==i.ispay?"￥"+i.total_price:"￥"+i.total_price+"(未)"))])]),t._v(" "),e("div",{staticClass:"width",staticStyle:{color:"#008489"}},[t._v("\n          "+t._s(i.create_time)+"\n        ")]),t._v(" "),0==i.status&&1==i.ispay?e("div",{staticClass:"width"},[e("span",{staticStyle:{cursor:"pointer"},on:{click:function(e){t.changeErollA(i,1)}}},[t._v("私信")]),t._v(" "),e("span",{staticStyle:{margin:"0 10px",cursor:"pointer"},on:{click:function(e){t.toRefundDes(i,1)}}},[t._v("查看详情")]),t._v(" "),e("span",{staticStyle:{cursor:"pointer"},attrs:{plain:""},on:{click:function(e){t.changeErollA(i,2)}}},[t._v("退款")])]):t._e(),t._v(" "),0==i.status&&0==i.ispay?e("div",{staticClass:"width"},[e("span",{staticStyle:{cursor:"pointer"},on:{click:function(e){t.changeErollA(i,1)}}},[t._v("私信")]),t._v(" "),e("span",{staticStyle:{cursor:"pointer"},attrs:{plain:""},on:{click:function(e){t.changeErollA(i,3)}}},[t._v("查看详情")])]):t._e(),t._v(" "),i.status?e("div",{staticClass:"width"},[e("el-button",{style:{backgroundColor:2==i.status?"#fff":"#008489",color:2==i.status?"red":"#fff",borderColor:2==i.audit?"red":"#008489"},attrs:{type:"primary",size:"mini"}},[t._v(t._s(1==i.audit?"申请中":"已退款"))]),t._v(" "),e("span",{staticStyle:{"margin-left":"10px",cursor:"pointer"},on:{click:function(e){t.toRefundDes(i,1)}}},[t._v("查看详情")])],1):t._e()])])}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.volunList.length,expression:"!volunList.length"}]},[e("None",{attrs:{type:"lookOrder"}})],1),t._v(" "),e("div",{staticStyle:{margin:"20px 0"}},[e("el-pagination",{attrs:{"page-count":t.index,"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.lookHouse,expression:"lookHouse"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(0,0,0,.5)"}},[e("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"500px",padding:"20px","background-color":"#fff","margin-left":"-270px","font-size":"12px","border-radius":"10px"},style:{marginTop:-t.houseHeight/2+"px"},attrs:{id:"houseA"}},[e("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[t._m(1),e("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"20px"},on:{click:function(i){t.lookHouse=!1}}})]),t._v(" "),t._l(t.houseList,function(i,s){return e("div",{staticStyle:{display:"flex","justify-content":"flex-start","margin-top":"20px"}},[e("div",{staticStyle:{width:"230px"}},[e("el-carousel",{attrs:{height:"150px"}},t._l(i.image,function(t,i){return e("el-carousel-item",{key:i,attrs:{height:"150px"}},[e("loadingImg",{staticStyle:{width:"230px",height:"150px",overflow:"hidden"},attrs:{type:"2",src:t?t.domain+t.image_url:"../../../static/img/static/defult.png"}})],1)}))],1),t._v(" "),e("div",{staticStyle:{"line-height":"50px","margin-left":"20px"}},[e("p",[e("b",[t._v(t._s(i.title))])]),t._v(" "),e("p",[t._v("可住"+t._s(i.max_person)+"人（"+t._s(i.num)+"）")]),t._v(" "),e("p",[e("b",[t._v("￥"+t._s(i.price))])])])])})],2)]),t._v(" "),t.isLoading?e("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"999","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[e("Loading")],1):t._e(),t._v(" "),t.isChat?e("Chat",{attrs:{userUrl:t.imgUrl,to_user_id:t.to_user_id,isOwer:t.userid,userName:t.userName,other_img:t.other_img},on:{chat:t.chat}}):t._e()],1)},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{display:"flex","justify-content":"space-between","background-color":"#F4F6F9",color:"#A8A8A8","font-size":"12px","margin-top":"20px","text-align":"center","line-height":"25px"}},[e("div",{staticClass:"miniwidth"},[t._v("预定用户")]),e("div",{staticClass:"miniwidth"},[t._v("参与人数")]),e("div",{staticClass:"miniwidth"},[t._v("预定活动时间")]),e("div",{staticClass:"miniwidth"},[t._v("预定住宿")]),e("div",{staticClass:"miniwidth"},[t._v("联系电话")]),e("div",{staticClass:"miniwidth"},[t._v("支付")]),e("div",{staticClass:"miniwidth"},[t._v("创建时间")]),e("div",{staticClass:"miniwidth"},[t._v("操作")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("span",[i("b",[this._v("预定住宿")])])}]};var h=e("VU/8")(d,c,!1,function(t){e("ZjW3")},"data-v-348d378e",null);i.default=h.exports},ZjW3:function(t,i){}});
//# sourceMappingURL=127.475da7f288c6370d52f1.js.map