webpackJsonp([141],{fY5l:function(t,e){},"l+VA":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"msyMessage",data:function(){return{api:this.GLOBAL.baseURL,messList:[]}},methods:{goBack:function(){this.$router.go(-1)},getMess:function(t){var e=this;this.$http.post(this.api+"/sysmsgl",{token:localStorage.getItem("token"),page:t}).then(function(i){1==i.data.code?(console.log(i),e.messList=i.data.data.data):3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getMess(t)}):0==i.data.code&&alert(i.data.msg)})},toContent:function(t,e){this.$router.push({path:"/msysCon",query:{information:t.msg_id}})}},mounted:function(){this.getMess(1)}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[i("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})]),t._v(" "),i("p",{staticStyle:{"font-size":"2rem"}},[t._v("系统消息")])]),t._v(" "),i("div",{staticStyle:{padding:"1rem"}},t._l(t.messList,function(e,s){return i("div",{staticStyle:{display:"flex","justify-content":"flex-start","margin-bottom":"2rem"},on:{click:function(i){t.toContent(e,s)}}},[t._m(0,!0),t._v(" "),i("div",{staticStyle:{"margin-left":"1rem",width:"100%"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[t._v("通知")]),t._v(" "),i("div",[t._v(t._s(e.create_time))])]),t._v(" "),i("div",{staticStyle:{padding:"1rem 0","border-bottom":"1px solid #eee"}},[t._v(t._s(e.title))])])])}))])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{staticStyle:{width:"4rem",height:"4rem","border-radius":"50%"},attrs:{src:i("Sj6X")}})])}]};var o=i("VU/8")(s,a,!1,function(t){i("fY5l")},"data-v-24e8202a",null);e.default=o.exports}});
//# sourceMappingURL=141.efc24e5b1fa146ffb665.js.map