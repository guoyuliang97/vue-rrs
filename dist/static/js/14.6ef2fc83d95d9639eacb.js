webpackJsonp([14],{"3zaM":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"hotsearch",data:function(){return{api:this.GLOBAL.baseURL,hotList:[]}},methods:{toPublish:function(t,e){this.$router.push({path:"/mPublishPage",query:{information:t.activity_id}})},goBack:function(){this.$router.go(-1)},getHot:function(){var t=this;this.$http.post(this.api+"/PopularAct",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?t.hotList=e.data.data:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getHot()}):0==e.data.code&&alert(e.data.msg)})}},mounted:function(){this.getHot()}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",[o("div",{staticStyle:{padding:"1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[o("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[o("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})]),t._v(" "),o("p",{staticStyle:{"font-size":"2rem"}},[t._v("热搜体验")])]),t._v(" "),t._m(0),t._v(" "),o("p",{staticStyle:{"background-color":"#F0F0F0",color:"#999999",padding:"0.5rem 1rem","font-size":"1rem"}},[t._v("实时热点，每小时更新")]),t._v(" "),o("div",{staticStyle:{padding:"1rem"}},t._l(t.hotList,function(e,i){return o("div",{staticStyle:{"margin-bottom":"2rem",display:"flex","justify-content":"flex-start"},on:{click:function(o){t.toPublish(e,i)}}},[o("span",{staticStyle:{"font-size":"1.5rem","font-weight":"bold"},style:{color:i+1<=3?"#FF4848":"#FEBB52"}},[t._v(t._s(i+1))]),t._v(" "),o("span",{staticStyle:{"margin-left":"2rem","font-size":"1.5rem"},style:{color:i+1>3?"#666666":"#000"}},[t._v(t._s(e.title))])])}))])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:o("fU1B"),width:"100%"}})])}]};var n=o("VU/8")(i,a,!1,function(t){o("yktS")},"data-v-2df67bf2",null);e.default=n.exports},fU1B:function(t,e,o){t.exports=o.p+"static/img/hotBack.aa82630.png"},yktS:function(t,e){}});
//# sourceMappingURL=14.6ef2fc83d95d9639eacb.js.map