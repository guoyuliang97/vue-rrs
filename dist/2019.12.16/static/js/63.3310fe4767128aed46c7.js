webpackJsonp([63],{VE2d:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("a20G"),n=a("uTVu"),i=a("/nBy"),s=a("4hmb"),d=(s.a,i.a,o.a,{data:function(){return{api:this.GLOBAL.baseURL,img:"./static/img/home/1.jpg",recommendedList:[],wonderfulList:[],isLoading:!1,loadingState:!1,page:1,request:!1}},components:{Detail:s.a,Loading:i.a,None:o.a},methods:{getStory:function(t){var e=this;this.$http.post(this.api+"/home/Story/story_list",{token:localStorage.getItem("token"),sort:2,page:t}).then(function(a){if(1==a.data.code){for(var o=a.data.data.data,n=0;n<o.length;n++){var i=o[n].user,s="",d="";o[n].cover_image&&(s=i.head_image?i.headimage.domain+i.headimage.image_url:"../../static/img/static/user.png",d=o[n].is_praise?1:0,e.wonderfulList.push({img:o[n].cover.domain+o[n].cover.image_url,address:o[n].province,remark:o[n].title,avator:s,zan:o[n].praise_num,say:o[n].leaving_num,zanIndex:d,story_id:o[n].story_id,userId:o[n].user_id}))}o.length?e.request=!1:e.request=!0,e.isLoading=!1,e.loadingState=!1}else 3==a.data.code?e.$http.post(e.api+"/home/Index/token").then(function(a){localStorage.setItem("token",a.data.data),e.getStory(t)}):alert(a.data.msg)})},toperson:function(t,e){this.$router.push({path:"/userdata",query:{information:t.userId}})},toStory:function(t,e){this.$router.push({path:"/storyPage",query:{information:t.story_id}})},addZan:function(t,e){var a=this;0==t.zanIndex?this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),flag:1,table_id:t.story_id,type:1}).then(function(o){1==o.data.code?(t.zanIndex=1,t.zan=t.zan+1):3==o.data.code?a.$http.post(a.api+"/home/index/token").then(function(o){localStorage.setItem("token",o.data.data),a.addZan(t,e)}):alert(o.data.msg)}):this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),flag:1,table_id:t.story_id,type:2}).then(function(o){1==o.data.code?(t.zan=t.zan-1,t.zanIndex=0):3==o.data.code?a.$http.post(a.api+"/home/index/token").then(function(o){localStorage.setItem("token",o.data.data),a.addZan(t,e)}):alert(o.data.msg)})},onScroll:function(){var t=document.documentElement.scrollTop||document.body.scrollTop,e=document.documentElement.clientHeight||document.body.clientHeight;(document.documentElement.scrollHeight||document.body.scrollHeight)==t+e&&(this.request||(this.loadingState=!0,this.page+=1,this.getStory(this.page)))},getHotLocal:function(){var t=this;this.$http.post(this.api+"/PopularCityStory",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?(t.recommendedList=e.data.data,n.a.$emit("hotPlace",e.data.data)):3==e.data.code||alert(e.data.msg)})},toSearch:function(t){this.$router.push({name:"homeSearch",query:{key:t.city,type:1}})}},mounted:function(){window.addEventListener("scroll",this.onScroll),this.isLoading=!0,this.getStory(this.page),this.getHotLocal()},destroyed:function(){window.removeEventListener("scroll",this.onScroll)}}),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wonderful_con"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.recommendedList.length,expression:"recommendedList.length"}]},[a("p",{staticClass:"title"},[t._v("推荐搜索")]),t._v(" "),a("div",{staticClass:"recommended_list"},t._l(t.recommendedList,function(e,o){return o<6?a("div",{staticClass:"recommended_detail",style:{backgroundImage:"url("+e.img+")",backgroundSize:"100% 100%"}},[a("div",{staticClass:"recommended_bg fontweight",on:{click:function(a){t.toSearch(e)}}},[a("p",{staticClass:"recommended_name"},[t._v(t._s(e.city))])])]):t._e()}))]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.wonderfulList.length,expression:"wonderfulList.length"}]},[a("p",{staticClass:"title"},[t._v("精选故事")]),t._v(" "),a("div",{staticClass:"select_list"},t._l(t.wonderfulList,function(e,o){return a("div",{staticClass:"select_detail"},[a("Detail",{attrs:{type:"2",zanIndex:e.zanIndex,status:e.status,address:e.address,remark:e.remark,imgUrl:e.img,avator:e.avator,zan:e.zan,say:e.say},on:{toperson:function(a){t.toperson(e,o)},toStory:function(a){t.toStory(e,o)},addZan:function(a){t.addZan(e,o)}}})],1)}))]),t._v(" "),a("Loading",{directives:[{name:"show",rawName:"v-show",value:t.loadingState,expression:"loadingState"}]}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"#fff","z-index":"999"}},[a("Loading",{staticStyle:{position:"fixed",top:"50%",left:"50%","z-index":"9999"}})],1),t._v(" "),t.wonderfulList.length?t._e():a("div",[a("None",{attrs:{type:"story"}})],1),t._v(" "),t.request?a("p",{staticStyle:{"font-size":"12px",margin:"30px 0"}},[t._v("············没有更多故事了！快去发布吧！············")]):t._e()],1)},staticRenderFns:[]};var c=a("VU/8")(d,r,!1,function(t){a("p+yO")},null,null);e.default=c.exports},"p+yO":function(t,e){}});
//# sourceMappingURL=63.3310fe4767128aed46c7.js.map