webpackJsonp([116],{TU8K:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"paizhao",data:function(){return{imgUrl:"",MediaStreamTrack:""}},methods:{},mounted:function(){var t;document.getElementById("start").addEventListener("click",function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,navigator.getUserMedia?navigator.getUserMedia({audio:!0,video:{width:320,height:320}},function(e){t="function"==typeof e.stop?e:e.getTracks()[1],video.srcObject=e,video.play()},function(t){console.log("The following error occurred: "+t.name)}):console.log("getUserMedia not supported")}),document.getElementById("stop").addEventListener("click",function(){t&&t.stop()})}},n={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"contentHolder"}},[a("video",{attrs:{id:"video",autoplay:""}}),t._v(" "),a("button",{staticStyle:{display:"block"},attrs:{id:"start"}},[t._v("拍照上传")]),t._v(" "),a("button",{staticStyle:{display:"block"},attrs:{id:"picture"}},[t._v("paizhao")]),t._v(" "),a("canvas",{staticStyle:{display:"block"},attrs:{id:"canvas",width:"320",height:"320"}}),t._v(" "),a("button",{staticStyle:{display:"block"},attrs:{id:"sc"}},[t._v("shangchuan")]),t._v(" "),a("button",{staticStyle:{display:"block"},attrs:{id:"stop"}},[t._v("stop")])])}]};var o=a("VU/8")(i,n,!1,function(t){a("n0Ip")},"data-v-4245fe56",null);e.default=o.exports},n0Ip:function(t,e){}});
//# sourceMappingURL=116.c420b4228bf43c984df2.js.map