webpackJsonp([38],{"1drE":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),o=i("4hmb"),s=i("a20G"),l=i("/nBy"),r=i("DjrJ"),c=i("ZKg9"),d=(r.a,l.a,c.a,s.a,o.a,{name:"experienceCentre",data:function(){return{api:this.GLOBAL.baseURL,imgUrl:"../../static/img/static/images/allptp.png",localList:[],left:0,isPrev:!1,isNext:!0,sliderIndex:0,hightList:[],experList:[],pickerOptions2:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},date:"",person:"",addClick:!1,otherList:[{person:"成人+",adult:0}],tiyan:"",closeIndex:"",price:[0,0],total:0,HighLoading:!1,isLoading:!1,searchList:"",editSearch:"搜索",content:"",allprice:""}},components:{Head:r.a,Loading:l.a,LoadingImg:c.a,None:s.a,Detail:o.a},watch:{content:function(){this.content||this.searchAll()},person:function(){this.person<17?this.searchAll():this.addClick=!0},date:function(){this.searchAll()},allprice:function(){this.searchAll()},tiyan:function(){this.searchAll()},closeIndex:function(){this.searchAll()},sliderIndex:function(){this.sliderIndex>0&&this.sliderIndex<this.localList.length-4?(this.isPrev=!0,this.isNext=!0):this.sliderIndex==this.localList.length-4?(this.isPrev=!0,this.isNext=!1):(this.isPrev=!1,this.isNext=!0)}},methods:{moreActive:function(t,e){this.$router.push({path:"moreActive",query:{key:t.city,information:n()(t)}})},searchHome:function(){this.searchAll()},getVal:function(t){this.content=t},toptop:function(t){this.$router.push({path:"/classification",query:{information:t.value,name:t.title}})},getKind:function(){var t=this;this.$http.post(this.api+"/home/Kind/kindlist",{token:localStorage.getItem("token")}).then(function(e){if(1==e.data.code){var i=e.data.data,a=[],n=[];for(var o in i)a.push(i[o]);for(var s=0;s<a.length;s++)n.push({img:a[s].image_id?a[s].domain+a[s].image_url:"",title:a[s].kind_name,value:a[s].kind_id});t.searchList=n}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getKind()}):alert(e.data.msg)})},toPublish:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})},searchAll:function(){this.getActive(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1e3:0,this.date?this.date[1]/1e3:0,this.tiyan,this.person,this.closeIndex),this.getAllHigh(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1e3:0,this.date?this.date[1]/1e3:0,this.tiyan,this.person,this.closeIndex)},getActive:function(t,e,i,a,n,o,s,l){var r=this;this.isLoading=!0,this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),keywords:this.content,page:t,price_low:e,price_high:i,activ_begin_time:a,activ_end_time:n,kind_id:o,max_person_num:s,is_volunteen:l}).then(function(s){1==s.data.code?(r.total=s.data.data.total,r.experList=s.data.data.data,r.isLoading=!1):3==s.data.code?r.$http.post(r.api+"/home/index/token").then(function(s){localStorage.setItem("token",s.data.data),r.getActive(t,e,i,a,n,o)}):0==s.data.code&&(alert(s.data.msg),r.isLoading=!1)}).catch(function(t){r.isLoading=!1})},toActivestep:function(){this.$router.push("/activeStep")},prevIndex:function(){this.sliderIndex-=1,this.left+=240},nextIndex:function(){this.sliderIndex+=1,this.left-=240},rejest:function(){this.price=[0,0]},show:function(){var t=this;this.$nextTick(function(){t.$refs.saveDateInput.focus()})},reduce:function(t,e){if(0==e){if(t.adult>0){this.addClick=!1,t.adult=t.adult-1;for(var i=0,a=0;a<this.otherList.length;a++)i+=this.otherList[a].adult;this.person=i}}else if(0!=t.adult){this.addClick=!1,t.adult=t.adult-1;for(var n=0,o=0;o<this.otherList.length;o++)n+=this.otherList[o].adult;this.person=n}else t.adult=0},add:function(t,e){if(this.person<16){this.addClick=!1,t.adult=t.adult+1;for(var i=0,a=0;a<this.otherList.length;a++)i+=this.otherList[a].adult;this.person=i}else this.addClick=!0},change:function(){this.closeIndex?this.closeIndex="":this.closeIndex=1},getHotPlace:function(){var t=this;this.$http.post(this.api+"/PopularCity",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?t.localList=e.data.data:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getHotPlace()}):alert(e.data.msg)})},getAllHigh:function(t,e,i,a,n,o,s,l){var r=this;this.HighLoading=!0,this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),page:t,sort:1,price_low:e,price_high:i,keywords:this.content,activ_begin_time:a,activ_end_time:n,kind_id:o,max_person_num:s,is_volunteen:l}).then(function(c){1==c.data.code?(r.hightList=c.data.data.data,r.total=c.data.data.total,r.HighLoading=!1):3==c.data.code?r.$http.post(r.api+"/home/index/token").then(function(c){localStorage.setItem("token",c.data.data),r.getAllHigh(t,e,i,a,n,o,s,l)}):0==c.data.code&&alert(c.data.data)})},getAllSJ:function(t){var e=this;this.isLoading=!0,this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),page:t}).then(function(i){1==i.data.code?(e.experList=i.data.data.data,e.isLoading=!1):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getAllSJ(t)}):0==i.data.code&&alert(i.data.data)})},handleCurrentChange:function(t){this.getAllHigh(t),this.getAllSJ(t),this.getHotPlace(),window.scroll(0,0)},chooseMoney:function(){this.allprice=this.price}},mounted:function(){window.scroll(0,0),this.getHotPlace(),this.getAllSJ(1),this.getAllHigh(1),this.getKind()},created:function(){this.content=this.$route.query.information,this.$route.query.information&&(this.editSearch=this.$route.query.information)}}),p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Head",{attrs:{type:"experienceCentre",content:t.editSearch},on:{getVal:t.getVal,search:t.searchHome}}),t._v(" "),i("div",{staticStyle:{width:"100%","background-color":"#fff","border-top":"1px solid #eee",padding:"10px 20px",position:"fixed",top:"82px","z-index":"99","text-align":"left"}},[i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"},on:{show:t.show}},[i("el-date-picker",{ref:"saveDateInput",staticStyle:{"margin-left":"20px"},attrs:{"value-format":"timestamp","picker-options":t.pickerOptions2,type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.date?"primary":""},slot:"reference"},[t._v("日期")])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"350",trigger:"click"}},[t._l(t.otherList,function(e,a){return i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px"}},[i("div",[i("b",[t._v(t._s(e.person))]),i("p",{staticStyle:{"font-size":"12px"}},[t._v(t._s(1==a?"2 - 12岁":2==a?"2岁以下":""))])]),t._v(" "),i("div",[i("el-button",{attrs:{icon:"el-icon-minus",size:"mini",circle:""},on:{click:function(i){t.reduce(e,a)}}}),t._v(" "),i("span",{staticStyle:{margin:"0 10px"}},[t._v(t._s(e.adult))]),t._v(" "),i("el-button",{attrs:{icon:"el-icon-plus",size:"mini",circle:"",disabled:t.addClick},on:{click:function(i){t.add(e,a)}}})],1)])}),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.person?"primary":""},slot:"reference"},[t._v(t._s(t.person?t.person+"人+":"体验人数"))])],2),t._v(" "),i("el-popover",{attrs:{placement:"bottom",trigger:"click"}},[i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"1",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("户外活动")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"2",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("少数民族")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"3",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("本土文化")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.tiyan.length?"primary":""},slot:"reference"},[t._v(t._s(1==t.tiyan?"户外活动":2==t.tiyan?"少数民族":3==t.tiyan?"本土文化":"体验类型"))])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{width:"350px","margin-left":"20px"}},[i("el-slider",{attrs:{range:"",max:4e3},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}}),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("span",[t._v("￥"+t._s(t.price[0]))]),t._v(" "),i("span",[t._v("￥"+t._s(4e3==t.price[1]?"4000+":t.price[1]))])])],1),t._v(" "),i("div",{staticStyle:{margin:"20px 20px 20px 12px",cursor:"pointer",display:"flex","justify-content":"space-between"}},[i("span",{on:{click:t.rejest}},[t._v("重置")]),i("span",{on:{click:function(e){t.chooseMoney(2)}}},[t._v("确定")])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.price[1]?"primary":""},slot:"reference"},[t._v("价格")])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{padding:"20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("div",[i("h4",[t._v("是否需要志愿者")]),t._v(" "),i("p",[t._v("参与体验，帮助策划人与大家交流，沟通等")])]),t._v(" "),i("div",{staticStyle:{width:"70px"}},[i("div",{staticStyle:{transition:"width .5s",overflow:"hidden","border-top-right-radius":"20px","border-bottom-right-radius":"20px","border-top-left-radius":"20px","border-bottom-left-radius":"20px"},style:{width:t.closeIndex?"70px":"30px",backgroundColor:t.closeIndex?"#008489":"#fff"},on:{click:t.change}},[""==t.closeIndex?i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{"font-size":"30px",float:"left"}}):t._e(),t._v(" "),1==t.closeIndex?i("i",{staticClass:"el-icon-circle-check-outline",staticStyle:{"font-size":"30px","background-color":"#fff","border-radius":"50%",color:"#008489",float:"right"}}):t._e()])])])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.closeIndex?"primary":""},slot:"reference"},[t._v(t._s(1==t.closeIndex?"需要志愿者":"是否需要志愿者"))])],1)],1),t._v(" "),i("div",{staticStyle:{"margin-top":"142px"}},[i("div",{staticStyle:{height:"380px","background-size":"100% 100%",padding:"50px 0"},style:{backgroundImage:" url("+t.imgUrl+")"}})]),t._v(" "),i("div",{staticClass:"content"},[i("h2",[t._v("热门目的地体验")]),t._v(" "),i("div",{staticStyle:{width:"970px",overflow:"hidden","margin-top":"15px",height:"82px",position:"relative"}},[i("div",{staticStyle:{position:"absolute",width:"auto",overflow:"hidden",transition:"all .3s linear"},style:{left:t.left+"px"}},t._l(t.localList,function(e,a){return i("div",{staticStyle:{float:"left",width:"225px",height:"80px","margin-right":"14px",border:"1px solid #E8E8E8",display:"flex","justify-content":"flex-start"},on:{click:function(i){t.moreActive(e,a)}}},[i("div",[i("img",{attrs:{src:e.logo_image_url?e.logo_image_url:"../../static/img/static/all.jpg",width:"120px",height:"80px"}})]),t._v(" "),i("div",{staticStyle:{width:"105px","line-height":"40px","font-size":"12px","text-align":"center"}},[i("p",[t._v(t._s(e.city))]),t._v(" "),i("p",[t._v(t._s(e.create_num)+"项体验")])])])})),t._v(" "),i("div",{staticClass:"prev"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isPrev,expression:"isPrev"}],staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-left",circle:""},on:{click:t.prevIndex}})],1),t._v(" "),i("div",{staticClass:"next"},[t.localList.length>4?i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isNext,expression:"isNext"}],staticStyle:{"background-color":"#fff",color:"#008489",border:"2px solid #008489"},attrs:{icon:"el-icon-arrow-right",circle:""},on:{click:t.nextIndex}}):t._e()],1)])]),t._v(" "),t.hightList.length?i("div",{staticClass:"content"},[i("h2",[t._v("热门高分体验")]),t._v(" "),i("p",{staticStyle:{"font-size":"12px"}},[t._v("集结最受欢迎和高分的体验")]),t._v(" "),i("div",{staticStyle:{position:"relative",display:"flex","flex-wrap":"wrap","font-size":"12px"}},t._l(t.hightList,function(e,a){return i("div",{staticClass:"list"},[i("Detail",{attrs:{type:"1",activity_id:e.activity_id,imgUrl:e.domain+e.image_url,city:e.city,total_time:e.total_time,activ_provite:e.activ_provite,comment_num:e.comment_num,name:e.title,score:e.score,english:e.main_laguage,money:e.price,kind:e.kind},on:{toPublish:function(i){t.toPublish(e,a)},consult:function(e){t.consult(a)}}})],1)}))]):t._e(),t._v(" "),i("div",{staticClass:"content"},[i("h2",[t._v("更多体验")]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-wrap":"wrap","justify-content":"space-between","font-size":"12px"}},t._l(t.searchList,function(e,a){return i("div",{staticStyle:{margin:"18px 0",cursor:"pointer"},on:{click:function(i){t.toptop(e,a)}}},[i("div",[i("span",{staticStyle:{position:"absolute",width:"330px",height:"203px","line-height":"203px","text-align":"center","font-size":"18px",color:"#fff","font-weight":"bold","font-family":"SourceHanSansCN-Bold"}},[t._v(t._s(e.title))]),t._v(" "),i("LoadingImg",{staticStyle:{width:"330px",height:"203px"},attrs:{type:"3",src:e.img}})],1)])}))]),t._v(" "),i("div",{staticClass:"content"},[i("h2",[t._v("体验中心")]),t._v(" "),i("p",{staticStyle:{"font-size":"12px"}},[t._v("欢迎参加您最喜欢的体验项目")]),t._v(" "),i("div",{staticStyle:{position:"relative",display:"flex","flex-wrap":"wrap","font-size":"12px"}},t._l(t.experList,function(e,a){return i("div",{staticClass:"list"},[i("Detail",{attrs:{type:"1",activity_id:e.activity_id,imgUrl:e.domain+e.image_url,city:e.city,total_time:e.total_time,activ_provite:e.activ_provite,comment_num:e.comment_num,name:e.title,score:e.score,english:e.main_laguage,money:e.price,kind:e.kind},on:{toPublish:function(i){t.toPublish(e,a)},consult:function(e){t.consult(a)}}})],1)})),t._v(" "),t.experList.length?t._e():i("div",[i("None",{attrs:{type:"local"}})],1)]),t._v(" "),i("div",{staticStyle:{margin:"20px 0"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),t.isLoading||t.HighLoading?i("div",{staticStyle:{"text-align":"center",position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(255,255,255,.5)"}},[i("Loading",{staticStyle:{position:"absolute",top:"50%",left:"50%","margin-left":"-25px","margin-top":"-25px"}})],1):t._e()],1)},staticRenderFns:[]};var h=i("VU/8")(d,p,!1,function(t){i("8u1k")},"data-v-e3a2cd78",null);e.default=h.exports},"8u1k":function(t,e){}});
//# sourceMappingURL=38.3f1e5286cd3e9d16518c.js.map