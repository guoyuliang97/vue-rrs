webpackJsonp([95],{"0bi6":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("a20G"),a=o("/nBy"),i=o("4hmb"),d=(i.a,a.a,n.a,{data:function(){return{api:this.GLOBAL.baseURL,outdoorList:[],isLoading:!1,loadingState:!1,page:1,request:!1}},components:{Detail:i.a,Loading:a.a,None:n.a},methods:{getStory:function(t){var e=this;this.$http.post(this.api+"/home/Story/story_list",{token:localStorage.getItem("token"),kind_id:1,sort:2,page:t}).then(function(o){if(1==o.data.code){for(var n=o.data.data.data,a=0;a<n.length;a++)e.outdoorList.push(n[a]);n.length?e.request=!1:e.request=!0,e.isLoading=!1,e.loadingState=!1}else 3==o.data.code?e.$http.post(e.api+"/home/Index/token").then(function(o){localStorage.setItem("token",o.data.data),e.getStory(t)}):alert(o.data.msg)})},toperson:function(t,e){this.$router.push({path:"/userdata",query:{information:t.userId}})},toStory:function(t,e){this.$router.push({path:"/storyPage",query:{information:t.story_id}})},addZan:function(t,e){var o=this;0==t.zanIndex?this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),flag:1,table_id:t.story_id,type:1}).then(function(n){1==n.data.code?(t.zanIndex=1,t.zan=t.zan+1):3==n.data.code?o.$http.post(o.api+"/home/index/token").then(function(n){localStorage.setItem("token",n.data.data),o.addZan(t,e)}):alert(n.data.msg)}):this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),flag:1,table_id:t.story_id,type:2}).then(function(n){1==n.data.code?(t.zan=t.zan-1,t.zanIndex=0):3==n.data.code?o.$http.post(o.api+"/home/index/token").then(function(n){localStorage.setItem("token",n.data.data),o.addZan(t,e)}):alert(n.data.msg)})},onScroll:function(){var t=document.documentElement.scrollTop||document.body.scrollTop,e=document.documentElement.clientHeight||document.body.clientHeight;(document.documentElement.scrollHeight||document.body.scrollHeight)==t+e&&(this.request||(this.loadingState=!0,this.page+=1,this.getStory(this.page)))}},mounted:function(){window.scroll(0,0),this.getStory(this.page),window.addEventListener("scroll",this.onScroll)},destroyed:function(){window.removeEventListener("scroll",this.onScroll)}}),s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticStyle:{padding:"30px 0px"}},[o("div",{staticClass:"outdoor"},t._l(t.outdoorList,function(e){return o("div",{staticClass:"outdoor_detail"},[o("Detail",{attrs:{type:"2",data:e},on:{toperson:function(o){t.toperson(e,t.index)},toStory:function(o){t.toStory(e,t.index)},addZan:function(o){t.addZan(e,t.index)}}})],1)})),t._v(" "),o("Loading",{directives:[{name:"show",rawName:"v-show",value:t.loadingState,expression:"loadingState"}]}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"#fff","z-index":"999"}},[o("Loading",{staticStyle:{position:"fixed",top:"50%",left:"50%","z-index":"9999"}})],1),t._v(" "),t.outdoorList.length?t._e():o("div",[o("None",{attrs:{type:"story"}})],1),t._v(" "),t.request?o("p",{staticStyle:{"font-size":"12px"}},[t._v("············没有更多故事了！快去发布吧！············")]):t._e()],1)},staticRenderFns:[]};var r=o("VU/8")(d,s,!1,function(t){o("nYPp")},null,null);e.default=r.exports},nYPp:function(t,e){}});
//# sourceMappingURL=95.80fd3a51fbbd8536bbd1.js.map