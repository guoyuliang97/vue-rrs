webpackJsonp([66],{NG5j:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("4hmb"),a=i("/nBy"),s=i("DjrJ"),o=i("a20G"),l=i("ZKg9"),r=(s.a,a.a,o.a,l.a,n.a,{name:"classification",data:function(){return{api:this.GLOBAL.baseURL,date:"",person:"",addClick:!1,otherList:[{person:"成人+",adult:0}],imgUrl:"../../static/img/static/back.jpg",closeIndex:"",price:[0,0],pickerOptions2:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},searchList:[],left:0,pageIndex:0,activeList:[],AllactiveList:[],KindId:"",total:0,isLoading:!1,editSearch:"",content:"",tiyan:"",personNum:"",allprice:""}},components:{Head:s.a,Loading:a.a,None:o.a,loadingImg:l.a,Detail:n.a},watch:{content:function(){this.content||this.goOn()},date:function(){this.date?this.goOn():this.allprice[1]||this.personNum||this.closeIndex||this.tiyan?this.goOn():this.getAll(1)},personNum:function(){this.personNum?this.goOn():this.allprice[1]||this.date||this.closeIndex||this.tiyan?this.goOn():this.getAll(1)},allprice:function(){this.allprice?this.goOn():this.personNum||this.date||this.closeIndex||this.tiyan?this.goOn():this.getAll(1)},closeIndex:function(){this.closeIndex?this.goOn():this.personNum||this.date||this.allprice||this.tiyan?this.goOn():this.getAll(1)},tiyan:function(){this.tiyan?(this.KindId=this.tiyan,this.goOn(),this.getKind()):this.personNum||this.date||this.allprice||this.closeIndex?this.goOn():this.getAll(1)}},methods:{goOn:function(t){this.getSearch(t,this.date?this.date[0]/1e3:0,this.date?this.date[1]/1e3:0,this.allprice[0],this.allprice[1],this.personNum,this.closeIndex),this.getActive(t,this.date?this.date[0]/1e3:0,this.date?this.date[1]/1e3:0,this.allprice[0],this.allprice[1],this.personNum,this.closeIndex)},chooseMoney:function(t){1==t?this.personNum=this.person:this.allprice=this.price},getVal:function(t){this.content=t},change:function(){this.closeIndex?this.closeIndex="":this.closeIndex=1},show:function(){var t=this;this.$nextTick(function(){t.$refs.saveDateInput.focus()})},rejest:function(t,e){2==t?this.price=[0,0]:e.person=0},reduce:function(t,e){if(0==e){if(t.adult>0){this.addClick=!1,t.adult=t.adult-1;for(var i=0,n=0;n<this.otherList.length;n++)i+=this.otherList[n].adult;this.person=i}}else if(0!=t.adult){this.addClick=!1,t.adult=t.adult-1;for(var a=0,s=0;s<this.otherList.length;s++)a+=this.otherList[s].adult;this.person=a}else t.adult=0},add:function(t,e){if(this.person<16){this.addClick=!1,t.adult=t.adult+1;for(var i=0,n=0;n<this.otherList.length;n++)i+=this.otherList[n].adult;this.person=i}else this.addClick=!0},prev:function(){this.pageIndex>0&&(this.left+=240,this.pageIndex--)},next:function(){this.pageIndex<this.searchList.length-5&&(this.left-=240,this.pageIndex++)},getActive:function(t,e,i,n,a,s,o){var l=this;this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),kind_id:this.KindId,keywords:this.content,sort:1,page:t,activ_begin_time:e,activ_end_time:i,price_low:n,price_high:a,max_person_num:s,is_volunteen:o}).then(function(t){1==t.data.code?l.activeList=t.data.data.data:3==t.data.code?l.$http.post(l.api+"/home/Index/token").then(function(t){localStorage.setItem("token",t.data.data),l.getActive()}):alert(t.data.msg)})},handleCurrentChange:function(t){this.goOn(t)},toPublish:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})},toFenlei:function(t,e){this.$router.push({path:"/fenleiPage",query:{information:t.value,name:t.name,date:this.date,content:this.content,personNum:this.personNum,allprice:this.allprice,closeIndex:this.closeIndex,tiyan:this.tiyan}})},getKind:function(){var t=this;this.$http.post(this.api+"/SubKindList",{token:localStorage.getItem("token"),top_id:this.KindId}).then(function(e){if(1==e.data.code){for(var i=e.data.data,n=[],a=0;a<i.length;a++)n.push({img:i[a].image_id?i[a].domain+i[a].themb_url:t.imgUrl,name:i[a].kind_name,value:i[a].kind_id});t.searchList=n}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getKind()}):alert(e.data.msg)})},search:function(){this.isLoading=!0,this.goOn(1)},getSearch:function(t,e,i,n,a,s,o){var l=this;this.isLoading=!0,this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),keywords:this.content,kind_id:this.KindId,page:t,activ_begin_time:e,activ_end_time:i,price_low:n,price_high:a,max_person_num:s,is_volunteen:o}).then(function(r){1==r.data.code?(l.total=r.data.data.total,l.AllactiveList=r.data.data.data,l.isLoading=!1):3==r.data.code?l.$http.post(l.api+"/home/index/token").then(function(r){localStorage.setItem("token",r.data.data),l.getSearch(t,e,i,n,a,s,o)}):alert(r.data.msg)})}},mounted:function(){this.isLoading=!0,this.getKind()},created:function(){this.KindId=this.$route.query.information,this.tiyan=this.$route.query.information,this.editSearch=this.$route.query.name}}),c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Head",{attrs:{type:"classification",content:t.editSearch},on:{getVal:t.getVal,search:t.search}}),t._v(" "),i("div",{staticStyle:{width:"100%","background-color":"#fff","border-top":"1px solid #eee",padding:"10px 20px",position:"fixed",top:"82px","z-index":"99","text-align":"left"}},[i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"},on:{show:t.show}},[i("el-date-picker",{ref:"saveDateInput",staticStyle:{"margin-left":"20px"},attrs:{"value-format":"timestamp","picker-options":t.pickerOptions2,type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.date?"primary":""},slot:"reference"},[t._v("日期")])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"350",trigger:"click"}},[t._l(t.otherList,function(e,n){return i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px"}},[i("div",[i("b",[t._v(t._s(e.person))]),i("p",{staticStyle:{"font-size":"12px"}},[t._v(t._s(1==n?"2 - 12岁":2==n?"2岁以下":""))])]),t._v(" "),i("div",[i("el-button",{attrs:{icon:"el-icon-minus",size:"mini",circle:""},on:{click:function(i){t.reduce(e,n)}}}),t._v(" "),i("span",{staticStyle:{margin:"0 10px"}},[t._v(t._s(e.adult))]),t._v(" "),i("el-button",{attrs:{icon:"el-icon-plus",size:"mini",circle:"",disabled:t.addClick},on:{click:function(i){t.add(e,n)}}})],1)])}),t._v(" "),i("div",{staticStyle:{margin:"20px 12px 20px 12px",display:"flex","justify-content":"flex-end"}},[i("span",{on:{click:function(e){t.chooseMoney(1)}}},[t._v("确定")])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.personNum?"primary":""},slot:"reference"},[t._v(t._s(t.personNum?t.personNum+"人+":"体验人数"))])],2),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{width:"350px","margin-left":"20px"}},[i("el-slider",{attrs:{range:"",max:4e3},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}}),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("span",[t._v("￥"+t._s(t.price[0]))]),t._v(" "),i("span",[t._v("￥"+t._s(4e3==t.price[1]?"4000+":t.price[1]))])])],1),t._v(" "),i("div",{staticStyle:{margin:"20px 12px 20px 12px",display:"flex","justify-content":"space-between",cursor:"pointer"}},[i("span",{on:{click:function(e){t.rejest(2)}}},[t._v("重置")]),i("span",{on:{click:function(e){t.chooseMoney(2)}}},[t._v("确定")])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.allprice[1]?"primary":""},slot:"reference"},[t._v(t._s(t.allprice[1]?t.allprice[0]+"-"+t.allprice[1]:"价格"))])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",trigger:"click"}},[i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"1",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("户外活动")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"2",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("少数民族")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"3",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("本土文化")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.tiyan?"primary":""},slot:"reference"},[t._v(t._s(1==t.tiyan?"户外活动":2==t.tiyan?"少数民族":3==t.tiyan?"本土文化":"体验类型"))])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{padding:"20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("div",[i("h4",[t._v("是否需要志愿者")]),t._v(" "),i("p",[t._v("参与体验，帮助策划人与大家交流，沟通等")])]),t._v(" "),i("div",{staticStyle:{width:"70px"}},[i("div",{staticStyle:{transition:"width .5s",overflow:"hidden","border-top-right-radius":"20px","border-bottom-right-radius":"20px","border-top-left-radius":"20px","border-bottom-left-radius":"20px"},style:{width:t.closeIndex?"70px":"30px",backgroundColor:t.closeIndex?"#008489":"#fff"},on:{click:t.change}},[""==t.closeIndex?i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{"font-size":"30px",float:"left"}}):t._e(),t._v(" "),1==t.closeIndex?i("i",{staticClass:"el-icon-circle-check-outline",staticStyle:{"font-size":"30px","background-color":"#fff","border-radius":"50%",color:"#008489",float:"right"}}):t._e()])])])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.closeIndex?"primary":""},slot:"reference"},[t._v(t._s(1==t.closeIndex?"需要志愿者":"是否需要志愿者"))])],1)],1),t._v(" "),i("div",{staticStyle:{"text-align":"left",width:"1080px",margin:"155px auto 0"}},[t.searchList.length?i("div",[i("h3",[t._v("搜索体验")]),t._v(" "),i("div",{staticStyle:{"margin-top":"15px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between",width:"1080px",overflow:"hidden",height:"82px"}},[i("div",{staticStyle:{cursor:"pointer",width:"30px",margin:"25px 0",height:"30px",border:"1px solid #318184","border-radius":"50%","line-height":"30px","text-align":"center"},on:{click:t.prev}},[t._v("<")]),t._v(" "),i("div",{staticStyle:{width:"980px","margin-left":"20px",position:"relative",overflow:"hidden"}},[i("div",{staticStyle:{position:"absolute",transition:"all .3s linear",width:"auto"},style:{left:t.left+"px"}},t._l(t.searchList,function(e,n){return e.value!=t.KindId?i("div",{staticStyle:{float:"left",width:"225px",height:"80px","margin-right":"15px",border:"1px solid #E8E8E8"},on:{click:function(i){t.toFenlei(e,n)}}},[i("div",{staticStyle:{cursor:"pointer",display:"flex","justify-content":"flex-start"}},[i("div",{staticStyle:{width:"125px",height:"80px"}},[i("loadingImg",{staticStyle:{width:"100%",height:"100%"},attrs:{type:"3",src:e.img}})],1),t._v(" "),i("div",{staticStyle:{"line-height":"80px","margin-left":"10px"}},[t._v(t._s(e.name))])])]):t._e()}))]),t._v(" "),i("div",{staticStyle:{cursor:"pointer",width:"30px",margin:"25px 0",height:"30px",border:"1px solid #318184","border-radius":"50%","line-height":"30px","text-align":"center",color:"#318184"},on:{click:t.next}},[t._v(">")])])])]):t._e(),t._v(" "),t.activeList.length?i("div",[i("h3",{staticStyle:{"margin-top":"30px"}},[t._v("热门高分体验")]),t._v(" "),i("p",[t._v("集结最受欢迎和高分的体验")]),t._v(" "),i("div",{staticStyle:{"margin-top":"15px",display:"flex","flex-wrap":"wrap",width:"100%"}},t._l(t.activeList,function(e,n){return i("div",{key:n,staticClass:"marginR"},[i("Detail",{attrs:{type:"1",activity_id:e.activity_id,imgUrl:e.domain+e.image_url,city:e.city,total_time:e.total_time,activ_provite:e.activ_provite,comment_num:e.comment_num,name:e.title,score:e.score,english:e.main_laguage,money:e.price,kind:e.kind},on:{toPublish:function(i){t.toPublish(e,n)},consult:function(e){t.consult(n)}}})],1)}))]):t._e(),t._v(" "),i("h3",{staticStyle:{"margin-top":"30px"}},[t._v("所有"+t._s(1==t.tiyan?"户外活动":2==t.tiyan?"少数民族":3==t.tiyan?"本土文化":"体验"))]),t._v(" "),i("div",{staticStyle:{"margin-top":"15px",display:"flex","flex-wrap":"wrap",width:"100%"}},t._l(t.AllactiveList,function(e,n){return i("div",{key:n,staticClass:"marginR"},[i("Detail",{attrs:{type:"1",activity_id:e.activity_id,imgUrl:e.domain+e.image_url,city:e.city,total_time:e.total_time,activ_provite:e.activ_provite,comment_num:e.comment_num,name:e.title,score:e.score,english:e.main_laguage,money:e.price,kind:e.kind},on:{toPublish:function(i){t.toPublish(e,n)},consult:function(e){t.consult(n)}}})],1)})),t._v(" "),t.AllactiveList.length?t._e():i("div",[i("None",{attrs:{type:"ALLactive"}})],1),t._v(" "),i("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",bottom:"0",right:"0","background-color":"rgba(255,255,255,.8)","z-index":"999",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e()])],1)},staticRenderFns:[]};var d=i("VU/8")(r,c,!1,function(t){i("dXEZ")},"data-v-8c4c3d2c",null);e.default=d.exports},dXEZ:function(t,e){}});
//# sourceMappingURL=66.60c0afcf15c33aa82ae8.js.map