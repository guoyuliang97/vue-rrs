webpackJsonp([18],{LDbu:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1MzYwMzQzQTEyODExRTlBOTVDRDA1RTQ4ODFGRUVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1MzYwMzQ0QTEyODExRTlBOTVDRDA1RTQ4ODFGRUVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzUzNjAzNDFBMTI4MTFFOUE5NUNEMDVFNDg4MUZFRUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzUzNjAzNDJBMTI4MTFFOUE5NUNEMDVFNDg4MUZFRUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JHRIKAAABGElEQVR42mL8//8/AwhcvXqVgUTAA8SngViDSPX9QFxEjEJtbW04m4mBfDCTBMeBQCEQx5BqCbkOzADiKDI9ZUyKBhYsYquI0OdHpse4gHgzEB/BoyaMkANDGWgLJEmxg4lhkANsIbh6sDswbDA5cNBH8bBwID8QTwXit0D8n4r4ERBX40hmeNMgMuAA4v1AbEiDwJEF4hZQzYav0CcUgok0chwyiARiS3Id6ESnpOZErgM56eRAntFiZtSBow4cdeCoA0cdOOrAUQeOOnDUgaMOHHXgUHTgVzq54wu5DtxHJwfuJteB84H4JI0dtwCIT5HrwF9A7MIAGaF/RkVH/QPi20BcAsQp+BSyEJk+ihiInEKgNgAIMACoyzcyleY1MAAAAABJRU5ErkJggg=="},kytd:function(t,e){},rB8L:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Au9i"),o=i("DRmq"),s=i("ZKg9"),n=(o.a,s.a,{name:"mSearch",data:function(){return{api:this.GLOBAL.baseURL,recentList:[],keywords:"",storyList:[],serachLate:[],chooseIndex:-1}},components:{Head:o.a,LoadingImg:s.a},methods:{toAbloish:function(){this.$router.go(-1)},deletSearch:function(){var t=this;a.MessageBox.confirm("确定删除搜索记录？").then(function(e){t.deleteLs()}).catch(function(t){})},deleteLs:function(){var t=this;this.$http.post(this.api+"/SearchC",{token:localStorage.getItem("token"),flag:1}).then(function(e){1==e.data.code?(a.MessageBox.alert("删除成功!"),t.getSearchLate()):3==e.data.code?t.deleteLs():0==e.data.code&&a.MessageBox.alert(e.data.msg)})},LookMore:function(){a.MessageBox.alert("请前往APP或者客户端查看更多!")},goBack:function(){this.$router.go(-1)},listenSend:function(){13===event.keyCode&&this.search(this.keywords)},search:function(t){var e=this;this.$http.post(this.api+"/home/Search/search",{token:localStorage.getItem("token"),keywords:t,page:1}).then(function(t){if(1==t.data.code){var i=t.data.data;if(i.activity.data.length){for(var o=[],s=0;s<i.activity.data.length;s++)o.push(i.activity.data[s]);e.recentList=o}if(i.story.data.length){var n=[];for(s=0;s<i.story.data.length;s++)n.push(i.story.data[s]);e.storyList=n}}else 3==t.data.code?e.search():0==t.data.code&&a.MessageBox.alert(t.data.msg)})},getSearchLate:function(){var t=this;this.$http.post(this.api+"/home/Index/search_lately",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?(console.log(e),t.serachLate=e.data.data):3==e.data.code||0==e.data.code&&a.MessageBox.alert(e.data.msg)})},chooseSearch:function(t,e){this.chooseIndex!=e&&(this.chooseIndex=e,this.search(t.keywords))},toPageT:function(t,e){this.$router.push({path:"/mPublishPage",query:{information:t.activity_id}})},toPageG:function(t,e){this.$router.push({path:"/mStorypage",query:{information:t.story_id}})}},mounted:function(){this.getSearchLate()}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{padding:"2rem 1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[a("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})])]),t._v(" "),a("Head"),t._v(" "),a("div",{staticStyle:{padding:"2rem 1rem"}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between","border-radius":"25px",padding:"1rem","background-color":"#F5F5F5",width:"100%"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],staticStyle:{border:"none","font-size":"1.5rem","background-color":"#F5F5F5"},domProps:{value:t.keywords},on:{keydown:t.listenSend,input:function(e){e.target.composing||(t.keywords=e.target.value)}}}),t._v(" "),a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-search",attrs:{type:"ios-search",size:"20",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 512 512"}},[a("path",{attrs:{d:"M448.3 424.7L335 311.3c20.8-26 33.3-59.1 33.3-95.1 0-84.1-68.1-152.2-152-152.2-84 0-152 68.2-152 152.2s68.1 152.2 152 152.2c36.2 0 69.4-12.7 95.5-33.8L425 448l23.3-23.3zM120.1 312.6c-25.7-25.7-39.8-59.9-39.8-96.3s14.2-70.6 39.8-96.3 59.9-40 96.2-40c36.3 0 70.5 14.2 96.2 39.9s39.8 59.9 39.8 96.3-14.2 70.6-39.8 96.3c-25.7 25.7-59.9 39.9-96.2 39.9-36.3.1-70.5-14.1-96.2-39.8z"}})])]),t._v(" "),a("div",{staticStyle:{width:"100px","text-align":"center","font-size":"1.5rem",color:"#666666"},on:{click:t.toAbloish}},[t._v("取消")])]),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("span",{staticStyle:{color:"#666666","font-size":"1.5rem"}},[t._v("搜索历史")]),t._v(" "),a("img",{staticStyle:{width:"1.5rem",height:"1.5rem"},attrs:{src:i("LDbu")},on:{click:t.deletSearch}})]),t._v(" "),a("div",{staticStyle:{display:"flex","flex-wrap":"wrap","margin-top":"20px"}},t._l(t.serachLate,function(e,i){return a("div",{staticStyle:{padding:"0.3rem 1rem","border-radius":"15px","margin-left":"1rem","margin-bottom":"1rem"},style:{backgroundColor:t.chooseIndex==i?"#008489":"#E7E7E7",color:t.chooseIndex==i?"#fff":"#000"},on:{click:function(a){t.chooseSearch(e,i)}}},[t._v(t._s(e.keywords))])}))])]),t._v(" "),a("div",[a("div",{staticStyle:{padding:"1rem"}},t._l(t.recentList,function(e,i){return a("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-bottom":"2rem"},on:{click:function(a){t.toPageT(e,i)}}},[a("div",{staticStyle:{"min-width":"55%","max-width":"55%","border-radius":"10px",overflow:"hidden",height:"10rem","margin-right":"10px"}},[a("LoadingImg",{staticStyle:{width:"100%",height:"100%"},attrs:{type:"3",src:e.domain+e.image_url}})],1),t._v(" "),a("div",{staticStyle:{"font-size":"1.5rem",width:"45%"}},[a("div",{staticStyle:{"justify-content":"flex-start",display:"flex"}},[t._m(0,!0),t._v(" "),a("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.title))])])])])})),t._v(" "),a("div",{staticStyle:{padding:"1rem"}},t._l(t.storyList,function(e,i){return a("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-bottom":"2rem"},on:{click:function(a){t.toPageG(e,i)}}},[a("div",{staticStyle:{"min-width":"55%","max-width":"55%","border-radius":"10px",overflow:"hidden",height:"10rem","margin-right":"10px"}},[a("LoadingImg",{staticStyle:{width:"100%",height:"100%"},attrs:{type:"3",src:e.cover_image?e.cover.domain+e.cover.image_url:""}})],1),t._v(" "),a("div",{staticStyle:{"font-size":"1.5rem",width:"45%"}},[a("div",{staticStyle:{"justify-content":"flex-start",display:"flex"}},[t._m(1,!0),t._v(" "),a("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.title))])])])])})),t._v(" "),10==t.recentList.length||10==t.storyList.length?a("el-button",{staticStyle:{"background-color":"#F4F4F4",color:"#666666",width:"100%",border:"none"},on:{click:t.LookMore}},[t._v("查看更多故事>")]):t._e()],1),t._v(" "),0==t.recentList.length&&0==t.storyList.length?a("div",[a("p",{staticStyle:{"text-align":"center",color:"#999999"}},[t._v("暂无数据")])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"min-width":"60px"}},[e("b",[this._v("【体验】")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"min-width":"60px"}},[e("b",[this._v("【故事】")])])}]};var r=i("VU/8")(n,c,!1,function(t){i("kytd")},"data-v-03012a53",null);e.default=r.exports}});
//# sourceMappingURL=18.b31fc1b8d848e3cfc9a6.js.map