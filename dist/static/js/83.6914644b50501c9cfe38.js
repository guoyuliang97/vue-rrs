webpackJsonp([83],{"8T2H":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("4hmb"),n=i("a20G"),s=i("/nBy"),o=i("PhFL"),l=i("DjrJ"),r=(i("uTVu"),i("ZKg9")),c=(l.a,o.a,r.a,s.a,n.a,a.a,{name:"moreActive",data:function(){return{api:this.GLOBAL.baseURL,date:"",person:"",addClick:!1,otherList:[{person:"成人+",adult:0}],tiyan:"",imgUrl:"../../static/img/static/back.jpg",false:!1,adress:"",closeIndex:"",price:[0,0],activeList:[],pickerOptions2:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},pageIndex:1,total:0,allprice:"",allperson:"",editSearch:"搜索",content:"",isLoading:!1,cityData:""}},components:{Head:l.a,Map:o.a,loadingImg:r.a,Loading:s.a,None:n.a,Detail:a.a},watch:{content:function(){this.content||this.getall()},allperson:function(){this.allperson<17?this.getall():this.addClick=!0},date:function(){this.getall()},allprice:function(){this.getall()},tiyan:function(){this.getall()},closeIndex:function(){this.getall()}},methods:{chooseMoney:function(t){1==t?this.allperson=this.person:this.allprice=this.price},getall:function(){this.getActive(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1e3:0,this.date?this.date[1]/1e3:0,this.tiyan,this.closeIndex,this.allperson)},show:function(){var t=this;this.$nextTick(function(){t.$refs.saveDateInput.focus()})},reduce:function(t,e){if(0==e){if(t.adult>0){this.addClick=!1,t.adult=t.adult-1;for(var i=0,a=0;a<this.otherList.length;a++)i+=this.otherList[a].adult;this.person=i}}else if(0!=t.adult){this.addClick=!1,t.adult=t.adult-1;for(var n=0,s=0;s<this.otherList.length;s++)n+=this.otherList[s].adult;this.person=n}else t.adult=0},add:function(t,e){if(this.person<16){this.addClick=!1,t.adult=t.adult+1;for(var i=0,a=0;a<this.otherList.length;a++)i+=this.otherList[a].adult;this.person=i}else this.addClick=!0},rejest:function(){this.price=[0,0]},change:function(){this.closeIndex?this.closeIndex="":this.closeIndex=1},getActive:function(t,e,i,a,n,s,o,l){var r=this;this.isLoading=!0,this.$http.post(this.api+"/home/Activity/activ_list",{token:localStorage.getItem("token"),city:this.adress,keywords:this.content,page:t,price_low:e,price_high:i,activ_begin_time:a,activ_end_time:n,kind_id:s,is_volunteen:o,max_person_num:l}).then(function(t){1==t.data.code?(r.total=t.data.data.total,r.activeList=t.data.data.data,r.isLoading=!1):3==t.data.code?r.$http.post(r.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data)}):alert(t.data.msg)})},handleCurrentChange:function(t){this.pageIndex=t,this.getall()},getVal:function(t){this.content=t},searchHome:function(){this.getall()},toPublish:function(t,e){this.$router.push({path:"/publishPage",query:{information:t.activity_id}})}},mounted:function(){window.scroll(0,0),this.getActive(1)},created:function(){this.adress=this.$route.query.key,document.title=this.$route.query.key,this.cityData=JSON.parse(this.$route.query.information)}}),d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"text-align":"left"}},[i("Head",{attrs:{type:"moreActive",content:t.editSearch},on:{getVal:t.getVal,search:t.searchHome}}),t._v(" "),i("div",{staticStyle:{width:"100%","background-color":"#fff","border-top":"1px solid #eee",padding:"10px 20px",position:"fixed",top:"82px","z-index":"99"}},[i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"},on:{show:t.show}},[i("el-date-picker",{ref:"saveDateInput",staticStyle:{"margin-left":"20px"},attrs:{"value-format":"timestamp","picker-options":t.pickerOptions2,type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.date?"primary":""},slot:"reference"},[t._v("日期")])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"350",trigger:"click"}},[t._l(t.otherList,function(e,a){return i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px"}},[i("div",[i("b",[t._v(t._s(e.person))]),i("p",{staticStyle:{"font-size":"12px"}},[t._v(t._s(1==a?"2 - 12岁":2==a?"2岁以下":""))])]),t._v(" "),i("div",[i("el-button",{attrs:{icon:"el-icon-minus",size:"mini",circle:""},on:{click:function(i){t.reduce(e,a)}}}),t._v(" "),i("span",{staticStyle:{margin:"0 10px"}},[t._v(t._s(e.adult))]),t._v(" "),i("el-button",{attrs:{icon:"el-icon-plus",size:"mini",circle:"",disabled:t.addClick},on:{click:function(i){t.add(e,a)}}})],1)])}),t._v(" "),i("div",{staticStyle:{margin:"20px 20px 20px 12px",cursor:"pointer",display:"flex","justify-content":"flex-end"}},[i("span",{on:{click:function(e){t.chooseMoney(1)}}},[t._v("确定")])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.allperson?"primary":""},slot:"reference"},[t._v(t._s(t.allperson?t.allperson+"人+":"体验人数"))])],2),t._v(" "),i("el-popover",{attrs:{placement:"bottom",trigger:"click"}},[i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"1",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("户外活动")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"2",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("少数民族")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-radio",{attrs:{label:"3",border:""},model:{value:t.tiyan,callback:function(e){t.tiyan=e},expression:"tiyan"}},[t._v("本土文化")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.tiyan.length?"primary":""},slot:"reference"},[t._v("体验类型")])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{width:"350px","margin-left":"20px"}},[i("el-slider",{attrs:{range:"",max:4e3},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}}),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("span",[t._v("￥"+t._s(t.price[0]))]),t._v(" "),i("span",[t._v("￥"+t._s(4e3==t.price[1]?"4000+":t.price[1]))])])],1),t._v(" "),i("div",{staticStyle:{margin:"20px 20px 20px 12px",cursor:"pointer",display:"flex","justify-content":"space-between"}},[i("span",{on:{click:t.rejest}},[t._v("重置")]),i("span",{on:{click:function(e){t.chooseMoney(2)}}},[t._v("确定")])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.allprice[1]?"primary":""},slot:"reference"},[t._v(t._s(t.allprice[1]?t.allprice[0]+"-"+t.allprice[1]:"价格"))])],1),t._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"400",trigger:"click"}},[i("div",{staticStyle:{padding:"20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0"}},[i("div",[i("h4",[t._v("是否需要志愿者")]),t._v(" "),i("p",[t._v("参与体验，帮助策划人与大家交流，沟通等")])]),t._v(" "),i("div",{staticStyle:{width:"70px"}},[i("div",{staticStyle:{transition:"width .5s",overflow:"hidden","border-top-right-radius":"20px","border-bottom-right-radius":"20px","border-top-left-radius":"20px","border-bottom-left-radius":"20px"},style:{width:t.closeIndex?"70px":"30px",backgroundColor:t.closeIndex?"#008489":"#fff"},on:{click:t.change}},[""==t.closeIndex?i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{"font-size":"30px",float:"left"}}):t._e(),t._v(" "),1==t.closeIndex?i("i",{staticClass:"el-icon-circle-check-outline",staticStyle:{"font-size":"30px","background-color":"#fff","border-radius":"50%",color:"#008489",float:"right"}}):t._e()])])])]),t._v(" "),i("el-button",{attrs:{slot:"reference",type:t.closeIndex?"primary":""},slot:"reference"},[t._v(t._s(t.closeIndex?"需要志愿者":"是否需要志愿者"))])],1)],1),t._v(" "),i("div",{staticStyle:{"margin-top":"142px"}},[i("div",{staticStyle:{height:"380px","background-size":"100% 100%",padding:"50px 0",display:"flex","align-items":"center","justify-content":"center"},style:{backgroundImage:t.cityData.top_image_url?" url("+t.cityData.top_image_url+")":"url("+t.imgUrl+")"}},[i("div",{staticStyle:{color:"#fff","text-align":"center"}},[i("div",{staticStyle:{"font-size":"60px",padding:"10px 0"}},[t._v(t._s(t.adress))]),t._v(" "),i("div",{staticStyle:{"font-size":"20px"}},[t._v("选择让您觉得不错的体验")])])])]),t._v(" "),i("div",{staticStyle:{width:"1080px",margin:"0 auto"}},[i("h2",{staticStyle:{margin:"20px 0"}},[t._v(t._s(t.adress)+"有"+t._s(t.activeList.length)+"处可订的人人游体验")]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},[t._l(t.activeList,function(e,a){return i("div",{key:a,staticClass:"activeMargin",staticStyle:{width:"330px"}},[i("Detail",{attrs:{type:"1",activity_id:e.activity_id,imgUrl:e.domain+e.image_url,city:e.city,total_time:e.total_time,activ_provite:e.activ_provite,comment_num:e.comment_num,name:e.title,score:e.score,english:e.main_laguage,money:e.price,kind:e.kind},on:{toPublish:function(i){t.toPublish(e,a)},consult:function(e){t.consult(a)}}})],1)}),t._v(" "),t.activeList.length?t._e():i("div",{staticStyle:{width:"100%"}},[i("None",{attrs:{type:"ALLactive"}})],1),t._v(" "),i("div",{staticStyle:{width:"100%","margin-bottom":"20px","background-size":"100% 100%",height:"300px",display:"flex","justify-content":"space-around"},style:{backgroundImage:t.cityData.bottom_image_url?" url("+t.cityData.bottom_image_url+")":"url("+t.imgUrl+")"}},[t._m(0)]),t._v(" "),i("div",{staticStyle:{margin:"20px 0","text-align":"center",width:"100%"}},[i("el-pagination",{attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],2)]),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",bottom:"0",right:"0","background-color":"rgba(255,255,255,.8)","z-index":"999",display:"flex","justify-content":"center","align-items":"center"}},[i("Loading")],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"font-family":"'华文楷体'","margin-top":"100px"}},[e("h1",[this._v("更多的体验")]),this._v(" "),e("h1",[this._v("体验可以满足您的所有需求")])])}]};var p=i("VU/8")(c,d,!1,function(t){i("fGTA")},"data-v-5e5d459d",null);e.default=p.exports},fGTA:function(t,e){}});
//# sourceMappingURL=83.6914644b50501c9cfe38.js.map