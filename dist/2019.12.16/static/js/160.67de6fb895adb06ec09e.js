webpackJsonp([160],{GF3j:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("ZKg9"),n=(a.a,{name:"reccently",data:function(){return{api:this.GLOBAL.baseURL,recentList:[]}},components:{LoadingImg:a.a},methods:{goBack:function(){this.$router.go(-1)},getReccent:function(t){var e=this;this.$http.post(this.api+"/home/Index/visit_lately",{token:localStorage.getItem("token"),page:t}).then(function(i){1==i.data.code?e.recentList=i.data.data.data:3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getReccent(t)}):0==i.data.code&&alert(i.data.msg)})},toPage:function(t,e){console.log(t),1==t.flag?this.$router.push("/mPublishPage"):this.$router.push("/mStorypage")}},mounted:function(){this.getReccent(1)}}),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[i("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})]),t._v(" "),i("p",{staticStyle:{"font-size":"2rem"}},[t._v("最近浏览")])]),t._v(" "),i("div",{staticStyle:{padding:"1rem"}},t._l(t.recentList,function(e,a){return i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-bottom":"2rem"},on:{click:function(i){t.toPage(e,a)}}},[i("div",{staticStyle:{"min-width":"55%","max-width":"55%","border-radius":"10px",overflow:"hidden",height:"10rem","margin-right":"10px"}},[i("LoadingImg",{staticStyle:{width:"100%",height:"100%"},attrs:{type:"3",src:e.domain+e.image_url}})],1),t._v(" "),i("div",{staticStyle:{"font-size":"1.5rem",width:"45%"}},[i("div",{staticStyle:{"justify-content":"flex-start",display:"flex"}},[i("div",{staticStyle:{"min-width":"60px"}},[i("b",[t._v("【"+t._s(1==e.flag?"体验":"故事")+"】")])]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.title))])]),t._v(" "),i("div",{staticStyle:{"margin-top":"7rem"}},[i("p",[t._v(t._s(e.create_time))])])])])}))])},staticRenderFns:[]};var s=i("VU/8")(n,o,!1,function(t){i("yMnH")},"data-v-08654788",null);e.default=s.exports},yMnH:function(t,e){}});
//# sourceMappingURL=160.67de6fb895adb06ec09e.js.map