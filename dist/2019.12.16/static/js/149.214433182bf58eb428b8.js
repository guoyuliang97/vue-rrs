webpackJsonp([149],{LAzR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("mvHQ"),s=i.n(o),a=i("DjrJ"),c=(a.a,{name:"allHouse",data:function(){return{api:this.GLOBAL.baseURL,activeId:"",houseList:[],check:[],readyCheck:[],allPrice:0,lookImage:!1,imgList:"",left:0,pageIndex:0,slot_id:"",chooseTime:""}},components:{Head:a.a},methods:{lookPhoto:function(t,e){this.lookImage=!0,this.imgList=t.imgUrl},chooseHouse:function(t,e){if("#fff"==t.color)t.color="#008489",this.check.push(t),this.allPrice+=parseInt(t.price);else{t.color="#fff",this.allPrice-=parseInt(t.price);for(var i=0;i<this.check.length;i++)this.check[i].house_id==t.house_id&&this.check.splice(i,1)}},goBack:function(){this.$router.go(-1)},saveHouse:function(){this.check.push({activeId:this.activeId}),this.$router.push({name:"choose",query:{activeId:this.activeId,chooseTime:this.chooseTime,chooseHouse:s()(this.check)}})},reduce:function(){for(var t=0;t<this.houseList.length;t++)for(var e=0;e<this.check.length;e++)this.houseList[t].house_id==this.check[e].house_id&&(this.houseList[t].color="#fff",this.allPrice-=parseInt(this.check[e].price));this.check=[]},get_activity:function(){var t=this;this.$http.post(this.api+"/HouseUseNum",{token:localStorage.getItem("token"),activity_id:this.activeId,visit:0,slot_id:this.slot_id}).then(function(e){if(1==e.data.code){for(var i=e.data.data,o=0;o<i.length;o++)if(1==i[o].flag){for(var s=[],a=0;a<i[o].image.length;a++)s.push(i[o].image[a].domain+i[o].image[a].themb_url);t.houseList.push({number:1,imgUrl:s,houseType:"露营",color:"#fff",type:i[o].num,perNum:i[o].max_person,house_id:i[o].house_id,title:i[o].descript,price:i[o].price})}else if(2==i[o].flag){for(var c=[],n=0;n<i[o].image.length;n++)c.push(i[o].image[n].domain+i[o].image[n].themb_url);t.houseList.push({number:1,imgUrl:c,houseType:"民宿",color:"#fff",type:i[o].num,perNum:i[o].max_person,house_id:i[o].house_id,title:i[o].descript,price:i[o].price})}else if(3==i[o].flag){for(var l=[],r=0;r<i[o].image.length;r++)l.push(i[o].image[r].domain+i[o].image[r].themb_url);t.houseList.push({number:1,imgUrl:l,houseType:"酒店",color:"#fff",type:i[o].num,perNum:i[o].max_person,house_id:i[o].house_id,title:i[o].descript,price:i[o].price})}}else 3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.get_activity()}):0==e.data.code&&alert(e.data.msg)})},reduceNum:function(t,e){t.number>1?(t.number-=1,this.allPrice-=parseInt(t.price)):this.$message({type:"info",message:"最少预定1个房间!"})},addNum:function(t,e){t.number<t.type?(t.number+=1,this.allPrice+=parseInt(t.price)):this.$message({type:"info",message:"已超过房间数，请选择其他房源！"})},prev:function(){this.pageIndex>4?(this.pageIndex-=1,this.left-=105):this.pageIndex>0&&(this.pageIndex-=1)},next:function(){this.pageIndex<this.imgList.length-1&&(this.pageIndex+=1,this.pageIndex>4&&(this.left-=105))},closeLook:function(){this.lookImage=!1,this.pageIndex=0}},mounted:function(){this.activeId=this.$route.query.activeId,this.slot_id=this.$route.query.slot_id,console.log(this.slot_id),this.get_activity()},created:function(){this.chooseTime=this.$route.query.chooseTime}}),n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"text-align":"left"}},[i("Head"),t._v(" "),i("hr",{staticStyle:{"margin-top":"81px"}}),t._v(" "),i("div",{staticStyle:{margin:"20px 0"}},[i("span",{staticStyle:{cursor:"pointer","margin-left":"10%"},on:{click:t.goBack}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("返回")])]),t._v(" "),t._m(0),t._v(" "),i("div",{staticStyle:{width:"1080px",margin:"20px auto",display:"flex","flex-wrap":"wrap","font-size":"12px"}},[t._m(1),t._v(" "),t._l(t.houseList,function(e,o){return i("div",{key:o,staticStyle:{position:"relative",padding:"20px 0","text-align":"center","flex-wrap":"wrap",display:"flex","justify-content":"space-between","border-bottom":"1px solid #E6E6E6"}},[i("div",{staticStyle:{position:"absolute",left:"-50px","line-height":"80px"}},[i("i",{staticClass:"el-icon-circle-check",staticStyle:{"font-size":"25px","border-radius":"50%",cursor:"pointer"},style:{color:e.color,border:"#fff"==e.color?"1px solid #000":""},on:{click:function(i){t.chooseHouse(e,o)}}})]),t._v(" "),i("div",{staticStyle:{width:"180px","text-align":"center",position:"relative"}},[i("img",{attrs:{src:e.imgUrl[0],width:"150px",height:"80px"}}),t._v(" "),i("div",{staticStyle:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0","line-height":"80px",color:"#fff",cursor:"pointer"},on:{click:function(i){t.lookPhoto(e,o)}}},[t._v("\n          查看更多图片\n        ")])]),t._v(" "),i("div",{staticClass:"width"},[t._v(t._s(e.houseType))]),t._v(" "),i("el-popover",{attrs:{placement:"top-start",trigger:"hover",width:"200",content:e.title}},[i("el-button",{staticStyle:{width:"180px","line-height":"80px",border:"none",padding:"0","background-color":"white",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"},attrs:{slot:"reference"},slot:"reference"},[i("b",[t._v(t._s(e.title))])])],1),t._v(" "),i("div",{staticClass:"width"},[i("b",[t._v("房源数量:"+t._s(e.type)+" · 可住"+t._s(e.perNum)+"人")])]),t._v(" "),i("div",{staticClass:"width"},[t._v("\n        ￥"),i("b",[t._v(t._s(e.price)+"/晚")])]),t._v(" "),i("div",{staticClass:"width"},[i("el-button",{staticStyle:{border:"1px solid #008489",color:"#008489"},attrs:{icon:"el-icon-minus",size:"mini",circle:""},on:{click:function(i){t.reduceNum(e,o)}}}),t._v(" "),i("span",{staticStyle:{margin:"0 20px"}},[t._v(t._s(e.number))]),t._v(" "),i("el-button",{staticStyle:{border:"1px solid #008489",color:"#008489"},attrs:{icon:"el-icon-plus",size:"mini",circle:""},on:{click:function(i){t.addNum(e,o)}}})],1)],1)})],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.check.length,expression:"check.length"}],staticStyle:{position:"fixed",bottom:"0",width:"1080px",left:"50%","margin-left":"-540px","background-color":"#F4F4F4",padding:"10px 20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-end","line-height":"40px"}},[i("div",[t._v("\n        已选"),i("span",{staticStyle:{color:"#008489"}},[t._v(t._s(t.check.length))]),t._v("个房源\n      ")]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px","margin-right":"30px",color:"#008489"}},[t._v("\n        ￥"+t._s(t.allPrice)+"\n      ")]),t._v(" "),i("div",[i("el-button",{attrs:{type:"primary"},on:{click:t.saveHouse}},[t._v("保存")]),t._v(" "),i("el-button",{on:{click:t.reduce}},[t._v("取消")])],1)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.lookImage,expression:"lookImage"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"500px",height:"400px",padding:"10px","margin-top":"-210px","margin-left":"-260px"}},[i("div",{staticStyle:{"text-align":"right",position:"relative"}},[i("i",{staticClass:"el-icon-close",staticStyle:{position:"absolute","font-size":"40px",color:"#fff",cursor:"pointer",top:"-100px",right:"-140px"},on:{click:t.closeLook}})]),t._v(" "),i("div",{staticStyle:{width:"450px",height:"350px",margin:"auto"}},[i("img",{attrs:{src:t.imgList[t.pageIndex],width:"100%",height:"100%"}})]),t._v(" "),i("div",{staticStyle:{position:"relative"}},[i("i",{staticClass:"el-icon-arrow-left",staticStyle:{"font-size":"50px",color:"#fff",position:"absolute",left:"-150px",top:"-200px"},on:{click:t.prev}})]),t._v(" "),i("div",{staticStyle:{position:"relative"}},[i("i",{staticClass:"el-icon-arrow-right",staticStyle:{"font-size":"50px",color:"#fff",position:"absolute",right:"-150px",top:"-200px"},on:{click:t.next}})]),t._v(" "),i("div",{staticStyle:{width:"520px",height:"80px",overflow:"hidden","margin-top":"20px",position:"relative"}},[i("div",{staticStyle:{position:"absolute",display:"flex","justify-content":"space-between"},style:{left:t.left+"px"}},t._l(t.imgList,function(e,o){return i("div",{staticClass:"marginR",staticStyle:{width:"100px",height:"80px","margin-right":"5px"}},[i("img",{staticStyle:{border:"1px solid #000"},style:{borderColor:t.pageIndex===o?"#fff":""},attrs:{src:e,width:"98px",height:"78px"}})])}))])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"1080px",margin:"50px auto"}},[e("h3",[this._v("请选择您需要的房源")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"100%",display:"flex","flex-wrap":"wrap","justify-content":"space-between","text-align":"center"}},[i("div",{staticStyle:{width:"180px"}},[t._v("房源")]),t._v(" "),i("div",{staticStyle:{width:"180px"}},[t._v("类型")]),t._v(" "),i("div",{staticStyle:{width:"180px"}},[t._v("名称")]),t._v(" "),i("div",{staticStyle:{width:"180px"}},[t._v("可住人数")]),t._v(" "),i("div",{staticStyle:{width:"180px"}},[t._v("价格")]),t._v(" "),i("div",{staticStyle:{width:"180px"}},[t._v("预定房间数")])])}]};var l=i("VU/8")(c,n,!1,function(t){i("Lirw")},"data-v-0f5da7d1",null);e.default=l.exports},Lirw:function(t,e){}});
//# sourceMappingURL=149.214433182bf58eb428b8.js.map