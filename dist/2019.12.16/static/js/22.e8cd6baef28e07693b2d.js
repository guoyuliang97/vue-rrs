webpackJsonp([22],{"64Sp":function(t,e){},k2Ii:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("/nBy"),o=i("L5G4"),s=i("a20G"),n=(i("svD4"),i("c18A")),l=i("DjrJ"),r=i("ZKg9"),d=(l.a,n.a,s.a,r.a,o.a,a.a,{name:"jouerney",data:function(){return{api:this.GLOBAL.baseURL,orderList:[],overList:[],goONList:[],activeIndex:-1,visible2:!1,visible3:!1,checkList:[],radio2:"",reason:"",idea:"",unsubscribe:!1,sliderIndex:0,goONIndex:0,left:0,goLeft:0,isOver:!1,isOrder:!1,isChat:!1,imgUrl:"",userId:"",userName:"",userImg:"",isGoIng:!0,isWill:!0,isPass:!0,goMore:!1,jionMore:!1,takeMore:!1,goindex:1,willIndex:1,overIndex:1}},components:{Head:l.a,Foot:n.a,None:s.a,loadingImg:r.a,Chat:o.a,Loading:a.a},methods:{lookMore:function(t){1==t?this.getJouney(this.goindex):2==t?this.getGon(this.willIndex):this.getoverJ(this.overIndex)},discuss:function(t,e){localStorage.setItem("dis","Orderevaluate"),this.$router.push({path:"/Orderevaluate",query:{order_id:t.order_id}})},look:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})},toPublish:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})},refer:function(){this.$message({message:"申请退订成功",type:"success"}),this.activeIndex=-1},disputes:function(){this.$router.push("/Disputes")},getoverJ:function(t){var e=this;this.$http.post(this.api+"/vipact",{token:localStorage.getItem("token"),iscomplete:2,page:t}).then(function(i){if(1==i.data.code){if(i.data.data.data.length){for(var a=0;a<i.data.data.data.length;a++)e.overList.push(i.data.data.data[a]);e.isOver=!1,e.takeMore=!0,e.overIndex++}else e.isOver=!0,e.takeMore=!1;e.isGoIng=!1,console.log(e.overList)}else 3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getoverJ(t)}):0==i.data.code&&(e.isGoIng=!1,alert(i.data.msg))})},getGon:function(t){var e=this;this.$http.post(this.api+"/vipact",{token:localStorage.getItem("token"),iscomplete:0,page:t}).then(function(i){if(1==i.data.code){if(i.data.data.data.length){for(var a=0;a<i.data.data.data.length;a++)e.orderList.push(i.data.data.data[a]);e.isOrder=!1,e.jionMore=!0,e.willIndex++}else e.isOrder=!0,e.jionMore=!1;e.isWill=!1}else 3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getGon(t)}):0==i.data.code&&(e.isWill=!1,alert(i.data.msg))})},getJouney:function(t){var e=this;this.$http.post(this.api+"/vipact",{token:localStorage.getItem("token"),iscomplete:1,page:t}).then(function(i){if(1==i.data.code){if(i.data.data.data.length){for(var a=0;a<i.data.data.data.length;a++)e.goONList.push(i.data.data.data[a]);e.isOrder=!1,e.goMore=!0,e.goindex++}else e.isOrder=!0,e.goMore=!1;e.isPass=!1}else 3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getJouney(t)}):0==i.data.code&&(e.isPass=!1,alert(i.data.msg))})},prevGoon:function(){this.goONIndex-=1,this.goLeft+=360},nextGoon:function(){this.goONIndex+=1,this.goLeft-=360},prevIndex:function(){this.sliderIndex-=1,this.left+=360},nextIndex:function(){this.sliderIndex+=1,this.left-=360},chat:function(){this.isChat=!1},contact:function(t,e){this.userName=t.act_user.family_name+t.act_user.middle_name+t.act_user.name,this.userId=t.act_user.user_id,this.userImg=t.act_user.head_image?t.act_user.headimage.domain+t.act_user.headimage.image_url:"../../static/img/static/user.png",this.isChat=!0},reload:function(t){var e=t.data.data[0];this.isOwer=e.user_id,this.imgUrl=e.head_image?e.headimage.domain+e.headimage.image_url:"../../static/img/static/user.png"}},mounted:function(){this.getJouney(this.goindex),this.getoverJ(this.overIndex),this.getGon(this.willIndex)}}),c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Head",{attrs:{type:"jouerney"},on:{reload:t.reload}}),t._v(" "),i("div",{staticStyle:{margin:"80px auto",width:"1080px"}},[t.goONList.length?i("div",[t._m(0),t._v(" "),i("hr",{staticStyle:{color:"#339da1"}}),t._v(" "),i("div",{staticStyle:{width:"1080px",overflow:"hidden",height:"340px",position:"relative"}},[i("div",{staticStyle:{position:"absolute",overflow:"hidden",transition:"all .3s linear"},style:{left:t.goLeft+"px",width:360*t.goONList.length+"px"}},t._l(t.goONList,function(e,a){return i("el-col",{staticStyle:{width:"300px",margin:"30px 30px","text-align":"left",float:"left"}},[i("el-card",{attrs:{"body-style":{padding:"0px"}}},[i("loadingImg",{staticClass:"image",attrs:{type:"3",src:e.cover.domain+e.cover.image_url},on:{toPublish:function(i){t.toPublish(e,a)}}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"}},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"button",on:{click:function(i){t.contact(e,a)}}},[t._v("联系策划人")])]),t._v(" "),i("div",{staticClass:"bottom clearfix"},[i("time",{staticClass:"time"},[t._v(t._s(e.activ_begin_time)+"—"+t._s(e.activ_end_time))])])])],1)],1)})),t._v(" "),i("div",{staticClass:"prev"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.goONIndex,expression:"goONIndex"}],staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-left",circle:""},on:{click:t.prevGoon}})],1),t._v(" "),i("div",{staticClass:"next"},[t.goONIndex<t.goONList.length-3?i("el-button",{staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-right",circle:""},on:{click:t.nextGoon}}):t._e()],1)]),t._v(" "),t.goMore&&t.goONList.length>=10?i("div",{staticStyle:{"text-align":"left"}},[i("span",{on:{click:function(e){t.lookMore(1)}}},[t._v("查看更多")])]):t._e()]):t._e(),t._v(" "),t.orderList.length?i("div",[t._m(1),t._v(" "),i("hr",{staticStyle:{color:"#339da1"}}),t._v(" "),i("div",{staticStyle:{width:"1080px",overflow:"hidden",height:"340px",position:"relative"}},[i("div",{staticStyle:{position:"absolute",overflow:"hidden",transition:"all .3s linear"},style:{left:t.left+"px",width:360*t.orderList.length+"px"}},t._l(t.orderList,function(e,a){return i("el-col",{staticStyle:{width:"300px",margin:"30px 30px","text-align":"left",float:"left"}},[i("el-card",{attrs:{"body-style":{padding:"0px"}}},[i("loadingImg",{staticClass:"image",attrs:{type:"3",src:e.cover.domain+e.cover.image_url},on:{toPublish:function(i){t.toPublish(e,a)}}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"}},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"button",on:{click:function(i){t.contact(e,a)}}},[t._v("联系策划人")])]),t._v(" "),i("div",{staticClass:"bottom clearfix"},[i("time",{staticClass:"time"},[t._v(t._s(e.activ_begin_time)+"—"+t._s(e.activ_end_time))])])])],1)],1)})),t._v(" "),i("div",{staticClass:"prev"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.sliderIndex,expression:"sliderIndex"}],staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-left",circle:""},on:{click:t.prevIndex}})],1),t._v(" "),i("div",{staticClass:"next"},[t.sliderIndex<t.orderList.length-3?i("el-button",{staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-right",circle:""},on:{click:t.nextIndex}}):t._e()],1)]),t._v(" "),t.jionMore&&t.orderList.length>=10?i("div",{staticStyle:{"text-align":"left"}},[i("span",{on:{click:function(e){t.lookMore(2)}}},[t._v("查看更多")])]):t._e()]):t._e(),t._v(" "),t.overList.length?i("div",[i("div",{staticStyle:{"text-align":"left",margin:"20px 0","font-size":"20px","font-weight":"bold"}},[t._v("已参加的体验")]),t._v(" "),i("hr",{staticStyle:{color:"#339da1"}}),t._v(" "),i("el-row",{staticStyle:{display:"flex","flex-wrap":"wrap"}},t._l(t.overList,function(e,a){return i("el-col",{staticStyle:{width:"300px",margin:"30px 30px","text-align":"left","font-size":"12px"}},[i("el-card",{attrs:{"body-style":{padding:"0px"}}},[i("loadingImg",{staticClass:"image",attrs:{type:"3",src:e.cover.domain+e.cover.image_url},on:{toPublish:function(i){t.look(e,a)}}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap"}},[t._v(t._s(e.title))]),i("div",{staticClass:"button",on:{click:function(i){1==e.isevaluate&&t.discuss(e,a)}}},[t._v(t._s(1==e.isevaluate?"立即评价":"已评价"))])]),t._v(" "),i("div",{staticClass:"bottom clearfix",staticStyle:{display:"flex","justify-content":"space-between"}},[i("time",{staticClass:"time"},[t._v(t._s(e.activ_begin_time)+"—"+t._s(e.activ_end_time))]),t._v(" "),i("div",{staticClass:"button",on:{click:function(i){t.contact(e,a)}}},[t._v("联系策划人")])])])],1)],1)})),t._v(" "),t.takeMore&&t.overList.length>=10?i("div",{staticStyle:{"text-align":"left"}},[i("span",{on:{click:function(e){t.lookMore(3)}}},[t._v("查看更多")])]):t._e()],1):t._e(),t._v(" "),t.isChat?i("Chat",{attrs:{userUrl:t.imgUrl,to_user_id:t.userId,isOwer:t.isOwer,userName:t.userName,other_img:t.userImg},on:{chat:t.chat}}):t._e(),t._v(" "),t.isGoIng&&t.isWill&&t.isPass?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(255,255,255,.8)","z-index":"1",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e(),t._v(" "),t.goONList.length||t.overList.length||t.orderList.length?t._e():i("div",[i("None",{attrs:{type:"jouney"}})],1),t._v(" "),i("Foot")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex","justify-content":"space-between","text-align":"left",margin:"20px 0","font-size":"20px"}},[e("div",{staticStyle:{"font-weight":"bold"}},[this._v("正在进行的体验")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex","justify-content":"space-between","text-align":"left",margin:"20px 0","font-size":"20px"}},[e("div",{staticStyle:{"font-weight":"bold"}},[this._v("即将参加的体验")])])}]};var v=i("VU/8")(d,c,!1,function(t){i("64Sp")},"data-v-deaf5c18",null);e.default=v.exports},svD4:function(t,e){}});
//# sourceMappingURL=22.e8cd6baef28e07693b2d.js.map