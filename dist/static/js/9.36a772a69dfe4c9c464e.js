webpackJsonp([9],{"0UX2":function(t,e){},"6csY":function(t,e){},GGWd:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("uTVu"),s=i("DjrJ"),n=(i("6csY"),{props:["navindex","overType"],data:function(){return{navlist:[{name:"语言",type:"",router:"Language"},{name:"类别",type:"",router:"Type"},{name:"关于此次体验",type:"1",router:""},{name:"介绍您自己",type:"",router:"Introduce"},{name:"体验内容",type:"",router:"Feel"},{name:"我会提供什么",type:"",router:"Provide"},{name:"参与者需要自带的东西",type:"",router:"Bring"},{name:"标题",type:"",router:"Title"},{name:"照片",type:"",router:"Photo"},{name:"设置",type:"1",router:"",suo:"1"},{name:"体验地点",type:"",router:"Feeladdress"},{name:"活动时间",type:"",router:"activeTime"},{name:"是否提供住宿",type:"",router:"accommodation"},{name:"注意事项",type:"",router:"attation"},{name:"预定设置",type:"",router:"bookSet"},{name:"体验包场",type:"",router:"makeBlock"},{name:"志愿者",type:"",router:"needVolunter"},{name:"提交体验",type:"1",router:"subExperience"}],clickSub:!1,activeId:"",complete:""}},methods:{changeNav:function(t,e){this.activeId&&(2!=t&&9!=t&&17!=t?(this.$router.push({name:e,query:{information:this.activeId,complete:this.complete}}),this.$emit("changenavf",t)):17==t&&this.clickSub&&this.$router.push({name:e,query:{information:this.activeId,complete:this.complete}}))}},created:function(){var t=this;a.a.$on("change",function(e){for(var i=0;i<e.length;i++)t.navlist[e[i]].type="0";15==e.length?t.clickSub=!0:t.clickSub=!1}),a.a.$on("changeAC",function(e){t.activeId=e}),this.complete=this.$route.query.complete},mounted:function(){window.scroll(0,0)}}),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"experience_navcon"},[i("div",{staticClass:"left_nav"},[i("p",{staticClass:"small_title fontweight"},[t._v("基本信息")]),t._v(" "),t._l(t.navlist,function(e,a){return i("div",{staticClass:"leftnav_list",class:{small_title:"1"==e.type,fontweight:"1"==e.type,leftnav_two:"0"==e.type},on:{click:function(i){t.changeNav(a,e.router)}}},[i("p",[i("span",{style:{borderBottom:t.navindex==a&&"1"!=e.type?"2px solid #008489":"none"}},[t._v(t._s(e.name))]),"1"==e.suo?i("i",{staticClass:"iconfont icon-suo",staticStyle:{"margin-left":"20px","font-size":"16px"}}):t._e()]),t._v(" "),"0"==e.type?i("p",[i("i",{staticClass:"el-icon-check",staticStyle:{color:"#008489","font-size":"16px","font-weight":"bold"}})]):t._e()])}),t._v(" "),i("div",{staticStyle:{"margin-top":"120px"}})],2)])},staticRenderFns:[]};var r=i("VU/8")(n,o,!1,function(t){i("0UX2")},null,null).exports,c=(s.a,{data:function(){return{api:this.GLOBAL.baseURL,navindex:"",topData:"",num:15,stepNum:"",overType:"",isCheck:!0,price:"",priceall:"",personNumber:"",data:"",userImg:"",time:"",server_fee:"",getMoney:"",prideNum:"",howprice:"",activeId:""}},components:{Head:s.a,Experiencenav:r},methods:{changenavf:function(t){this.navindex=t},changeRouter:function(t){this.navindex=t.id,this.$router.push({name:t.router,query:{information:t.information,complete:t.complete}}),this.overType=t.id-1,this.step()},step:function(){var t=this;this.activeId?this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.activeId,visit:0}).then(function(e){if(1==e.data.code){a.a.$emit("change",e.data.data.step.replace(/[^0-9]/gi," ").trim().split(/\s+/));var i=e.data.data.step.replace(/[^0-9]/gi," ").trim().split(/\s+/).length;i<15?(t.isCheck=!0,t.num=15-i,t.stepNum=Number(i/15*100).toFixed(2)+"%"):(t.isCheck=!1,t.stepNum=Number(i/15*100).toFixed(2)+"%"),t.data=e.data.data,t.time=e.data.data.total_time}else 3==e.data.code?t.step():0==e.data.code&&t.$alert(e.data.msg)}):this.stepNum=0},getConfig:function(){var t=this;this.$http.post(this.api+"/Config",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?t.server_fee=e.data.data.server_fee+"%":3==e.data.code?t.getConfig():0==e.data.code&&alert(e.data.msg)})},saveActive:function(t){this.activeId=t}},watch:{price:function(){this.priceall=3*this.price},howprice:function(){this.howprice&&!/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.howprice)?this.$message({type:"error",message:"请输入正确金额"}):this.prideNum&&this.howprice&&(this.getMoney=parseInt(this.prideNum)*parseInt(this.howprice)-parseInt(this.prideNum)*parseInt(this.howprice)*(this.server_fee.replace("%","")/100))},prideNum:function(){this.prideNum&&!/^[1-9]\d*$/.test(this.prideNum)?this.$message({type:"error",message:"请输入正确数量!"}):this.prideNum&&this.howprice&&(this.getMoney=parseInt(this.prideNum)*parseInt(this.howprice)-parseInt(this.prideNum)*parseInt(this.howprice)*(this.server_fee.replace("%","")/100))},activeId:function(){a.a.$emit("changeAC",this.activeId)}},mounted:function(){localStorage.getItem("userImg")?this.userImg=localStorage.getItem("userImg"):this.userImg="../../../static/img/static/user.png",this.step(),this.getConfig()},destroyed:function(){localStorage.removeItem("complete")},created:function(){this.activeId=this.$route.query.information}}),l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"experience"},[i("Head",{attrs:{type:"experience"}}),t._v(" "),i("div",{staticClass:"experience_content"},[i("div",{staticClass:"experience_nav"},[i("Experiencenav",{attrs:{navindex:t.navindex,overType:t.overType},on:{changenavf:t.changenavf}}),t._v(" "),i("div",{staticStyle:{width:"12.5%","min-width":"133px","font-size":"14px",height:"100px","text-align":"left","border-top":"1px solid #eee",color:"#008489","font-weight":"bold",position:"fixed",bottom:"0",left:"0","background-color":"#fff"}},[i("div",{staticStyle:{margin:"10px 10px",padding:"10px 0"}},[1==t.isCheck?i("p",{staticStyle:{margin:"10px 0"}},[t._v("您还需要填写"),i("span",[t._v(t._s(t.num))]),t._v("项")]):t._e(),t._v(" "),0==t.isCheck?i("p",{staticStyle:{margin:"10px 0"}},[t._v("您可以提交体验了！"),i("i",{staticClass:"el-icon-check",staticStyle:{color:"#008489","font-size":"20px","font-weight":"bold"}})]):t._e(),t._v(" "),i("div",{staticStyle:{width:"100%",height:"10px","background-color":"#eee"}},[i("div",{staticStyle:{"background-color":"#008489",height:"10px"},style:{width:t.stepNum}})])])])],1),t._v(" "),i("div",{staticClass:"experience_container"},[i("router-view",{on:{changeRouter:t.changeRouter,saveId:t.saveActive}})],1),t._v(" "),i("div",{staticClass:"experience_last"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0!=t.navindex&&1!=t.navindex&&7!=t.navindex&&11!=t.navindex&&12!=t.navindex&&15!=t.navindex,expression:"navindex!=0&&navindex!=1&&navindex!=7&&navindex != 11&&navindex != 12 && navindex != 15"}]},[i("div",{staticClass:"last_top"},[i("img",{style:{marginTop:t.data.cover_image?"100px":"300px"},attrs:{alt:"",src:t.data.cover_image?t.data.cover.domain+t.data.cover.themb_url:"../../static/img/exprerience/photo.png"}}),t._v(" "),i("div",{staticClass:"last_con"},[i("p",{staticClass:"fontweight",staticStyle:{"font-size":"22px",color:"white","margin-top":"200px"}},[t._v(t._s(t.data.title?t.data.title:"体验"))]),t._v(" "),i("div",{staticStyle:{"border-top":"2px solid rgba(255,255,255,.4)","margin-top":"20px"}}),t._v(" "),i("p",{staticClass:"last_detail"},[i("i",{staticClass:"el-icon-location"}),t._v(" "+t._s(t.data.city?t.data.city:"地点"))]),t._v(" "),i("p",{staticClass:"last_detail"},[i("i",{staticClass:"el-icon-time"}),t._v(" "+t._s(t.time?t.time:"未知"))]),t._v(" "),i("p",{staticClass:"last_detail"},[i("i",{staticClass:"el-icon-menu"}),t._v("主要语言（"+t._s(0==t.data.main_laguage?"中文":1==t.data.main_laguage?"English":"日语")+"）,其他语言（"+t._s(t.data.other_laguage)+"）开展体验")])])]),t._v(" "),i("div",{staticClass:"about_user",on:{click:function(e){t.changeRouter({id:3,router:"introduce"})}}},[i("div",{staticClass:"user_top"},[i("p",{staticClass:"user_topleft"},[t._v("体验达人User")]),t._v(" "),i("img",{staticStyle:{width:"48px",height:"48px","border-radius":"50%"},attrs:{src:t.userImg}})]),t._v(" "),i("div",{staticStyle:{"font-size":"12px","line-height":"20px"}},[t._v(t._s(t.data.introduce?t.data.introduce:"写点您与该体验主题之间的故事吧！"))])]),t._v(" "),i("div",{staticClass:"exp_lastDetail",on:{click:function(e){t.changeRouter({id:4,router:"feel"})}}},[i("div",{staticClass:"last_con exp_lastTopline"},[i("p",{staticClass:"fontweight"},[t._v("体验内容")]),t._v(" "),i("p",{staticStyle:{"margin-top":"10px","font-size":"12px"}},[t._v(t._s(t.data.descripte?t.data.descripte:"写一段概述，告诉参与者他们在这项体验当中会做些什么。"))])]),t._v(" "),i("div",{staticClass:"detail_whitebg",style:{display:4==t.navindex?"none":"block"}})]),t._v(" "),i("div",{staticClass:"exp_lastDetail",on:{click:function(e){t.changeRouter({id:6,router:"provide"})}}},[i("div",{staticClass:"last_con exp_lastTopline"},[i("p",{staticClass:"fontweight"},[t._v("我会提供什么")]),t._v(" "),i("div",{staticStyle:{"margin-top":"10px","font-size":"12px","line-height":"20px"}},[t._v(t._s(t.data.activ_provite?t.data.activ_provite:"让参与者知道您这项体验都包含些什么内容。"))])]),t._v(" "),i("div",{staticClass:"detail_whitebg",style:{display:6==t.navindex?"none":"block"}})]),t._v(" "),i("div",{staticClass:"exp_lastDetail",on:{click:function(e){t.changeRouter({id:10,router:"feeladdress"})}}},[i("div",{staticClass:"last_con exp_lastTopline"},[i("p",{staticClass:"fontweight"},[t._v("体验地点")]),t._v(" "),i("p",{staticStyle:{"margin-top":"10px","font-size":"12px"}},[t._v(t._s(t.data.go_place?t.data.go_place:"告诉参与者您的这项体验将带他们去哪里。"))])]),t._v(" "),i("div",{staticClass:"detail_whitebg",style:{display:10==t.navindex?"none":"block"}})]),t._v(" "),i("div",{staticClass:"exp_lastDetail",on:{click:function(e){t.changeRouter({id:13,router:"attation"})}}},[i("div",{staticClass:"last_con exp_lastTopline"},[i("p",{staticClass:"fontweight"},[t._v("注意事项")]),t._v(" "),i("p",{staticStyle:{"margin-top":"10px","font-size":"12px"}},[t._v(t._s(t.data.activ_notice?t.data.activ_notice:"在参与者预订前，还有什么他们需要知道的吗?"))])]),t._v(" "),i("div",{staticClass:"detail_whitebg",style:{display:13==t.navindex?"none":"block"}})]),t._v(" "),i("div",{staticClass:"exp_lastDetail",on:{click:function(e){t.changeRouter({id:10,router:"feeladdress"})}}},[i("div",{staticClass:"last_con exp_lastTopline"},[i("p",{staticClass:"fontweight"},[t._v("集合地点")]),t._v(" "),i("p",{staticStyle:{"margin-top":"10px","font-size":"12px"}},[t._v(t._s(t.data.set_address?t.data.set_address:"我们会在您预订之后与您分享确切的集合地址。"))])]),t._v(" "),i("div",{staticClass:"detail_whitebg",style:{display:10==t.navindex?"none":"block"}})])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:11==t.navindex||12==t.navindex||15==t.navindex,expression:"navindex == 11||navindex == 12 || navindex == 15"}],staticStyle:{width:"300px",border:"1px solid #eee",padding:"20px","margin-bottom":"50px"}},[i("h3",[t._v("价格计算器")]),t._v(" "),i("p",{staticStyle:{"font-weight":"bold","font-size":"12px",color:"#008489"}},[t._v("(小贴士:APY 代表人民币)")]),t._v(" "),i("div",{staticClass:"price"},[i("div",[t._v(t._s(11==t.navindex?"活动":"12"==t.navindex?"住宿":"包场")+"价格")]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center",border:"1px solid #eee",padding:"10px"}},[i("div",{staticStyle:{"border-right":"1px solid #eee",width:"30px","padding-right":"10px"}},[t._v("\n                APY\n              ")]),t._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.howprice,expression:"howprice"}],staticStyle:{width:"80px",border:"none","margin-left":"10px","font-size":"15px"},attrs:{type:"text",placeholder:"输入价格"},domProps:{value:t.howprice},on:{input:function(e){e.target.composing||(t.howprice=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"price"},[i("div",[t._v("提供数量")]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center",border:"1px solid #eee",padding:"10px"}},[i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.prideNum,expression:"prideNum"}],staticStyle:{width:"80px",border:"none","margin-left":"10px","font-size":"15px"},attrs:{type:"text",placeholder:"输入数量"},domProps:{value:t.prideNum},on:{input:function(e){e.target.composing||(t.prideNum=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"price"},[t._m(0),t._v(" "),i("div",{staticStyle:{"font-weight":"bold"}},[i("span",[t._v("￥")]),t._v(" "),i("span",[t._v(t._s(t.getMoney))])])]),t._v(" "),i("p",[t._v("这是扣除"+t._s(t.server_fee)+"allptp的服务费后，您可以\n            赚到的金额")])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b",[this._v("您将赚取")])])}]};var d=i("VU/8")(c,l,!1,function(t){i("OfWH")},null,null);e.default=d.exports},OfWH:function(t,e){}});
//# sourceMappingURL=9.36a772a69dfe4c9c464e.js.map