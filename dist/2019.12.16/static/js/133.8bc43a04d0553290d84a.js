webpackJsonp([133],{EsRQ:function(t,e){},ZbQ9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Au9i"),o=(a("Czhm"),a("ZKg9")),s=(o.a,{name:"mStorypage",data:function(){return{api:this.GLOBAL.baseURL,imageList:[],zanIndex:0,disList:[],storyData:""}},components:{LoadingImg:o.a},methods:{lookMore:function(){i.MessageBox.alert("请前往APP或者客户端查看!")},goBack:function(){this.$router.go(-1)},addPraise:function(){var t=this;this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),table_id:this.storyId,flag:1,type:this.storyData.is_praise?2:1}).then(function(e){1==e.data.code?t.getStory():3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.addPraise()}):0==e.data.code&&i.MessageBox.alert(e.data.msg)})},getStory:function(){var t=this;this.$http.post(this.api+"/home/Story/get_story",{token:localStorage.getItem("token"),story_id:this.storyId,visit:1}).then(function(e){1==e.data.code?t.storyData=e.data.data:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getStory()}):0==e.data.code&&i.MessageBox.alert(e.data.msg)})},getLeave:function(t){var e=this;this.$http.post(this.api+"/LeaveL",{token:localStorage.getItem("token"),table_id:this.storyId,flag:2,order:1,page:t}).then(function(a){1==a.data.code?e.disList=a.data.data.data:3==a.data.code?e.$http.post(e.api+"/home/index/token").then(function(a){localStorage.setItem("token",a.data.data),e.getLeave(t)}):0==a.data.code&&i.MessageBox.alert(a.data.msg)})},clickPrease:function(t,e){var a=this;this.$http.post(this.api+"/home/Comment/praise",{token:localStorage.getItem("token"),flag:4,table_id:t.msg_id,type:t.is_praise?2:1}).then(function(o){1==o.data.code?a.getLeave(1):3==o.data.code?a.$http.post(a.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),a.clickPrease(t,e)}):0==o.data.code&&i.MessageBox.alert(o.data.msg)})}},mounted:function(){this.getLeave(1)},created:function(){this.storyId=this.$route.query.information,this.getStory(),window.scroll(0,0),navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||this.$router.push({path:"/storyPage",query:{information:this.$route.query.information}})}}),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.storyData?a("div",[a("div",{staticStyle:{padding:"1rem","background-color":"#008489",color:"#FFF","text-align":"center",position:"relative"}},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-back",staticStyle:{position:"absolute",left:"0",top:"50%","margin-top":"-15px",fill:"#fff"},attrs:{type:"ios-arrow-back",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"},on:{click:t.goBack}},[a("path",{attrs:{d:"M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z"}})]),t._v(" "),a("p",{staticStyle:{"font-size":"2rem"}},[t._v("故事详情")])]),t._v(" "),a("div",{staticStyle:{padding:"1rem"}},[a("h2",[t._v(t._s(t.storyData.title))]),t._v(" "),a("div",{staticStyle:{margin:"1rem 0",display:"flex","justify-content":"flex-start"}},[a("div",{staticStyle:{color:"#008489",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis","max-width":"100px"}},[t._v(t._s(t.storyData.user.family_name+t.storyData.user.middle_name+t.storyData.user.name?t.storyData.user.family_name+t.storyData.user.middle_name+t.storyData.user.name:"匿名用户"))]),t._v(" "),a("div",{staticStyle:{"margin-left":"1rem"}},[t._v(t._s(t.storyData.create_time))])]),t._v(" "),t._l(t.storyData.image,function(t,e){return a("div",{staticStyle:{"margin-bottom":"1rem"}},[a("LoadingImg",{attrs:{type:"3",src:t.image_id?t.domain+t.image_url:""}})],1)}),t._v(" "),a("div",{staticStyle:{"font-size":"1.5rem"}},[a("p",[t._v(t._s(t.storyData.content))])]),t._v(" "),a("div",{staticStyle:{margin:"1rem 0",display:"flex","justify-content":"center"}},[a("div",{staticStyle:{width:"5rem",height:"5rem","border-radius":"50%",display:"flex","justify-content":"center","align-items":"center"},style:{border:0==t.storyData.is_praise?"1px solid #999999":"1px solid #008489"}},[a("i",{staticClass:"iconfont icon-zan",staticStyle:{"font-size":"25px"},style:{color:0==t.storyData.is_praise?"#999999":"#008489"},on:{click:t.addPraise}})])]),t._v(" "),a("p",{staticStyle:{"text-align":"center"},style:{color:0==t.storyData.is_praise?"#999999":"#008489"}},[t._v(t._s(0==t.storyData.is_praise?"赞一个":"已赞"))]),t._v(" "),t.disList.length?a("div",{staticStyle:{"margin-top":"1rem"}},[a("h3",[t._v("最新评论")]),t._v(" "),a("div",{staticStyle:{margin:"1rem 0"}},t._l(t.disList,function(e,i){return a("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-bottom":"2.5rem"}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},[a("div",[a("img",{staticStyle:{width:"4rem",height:"4rem","border-radius":"50%"},attrs:{src:e.user.head_image?e.user.headimage.domain+e.user.headimage.image_url:"../../../static/img/static/user.png"}})]),t._v(" "),a("div",{staticStyle:{"margin-left":"1rem"}},[a("p",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[a("b",[t._v(t._s(e.user.family_name+e.user.middle_name+e.user.name?e.user.family_name+e.user.middle_name+e.user.name:"匿名用户"))])]),t._v(" "),a("p",{staticStyle:{margin:"0.5rem 0"}},[t._v(t._s(e.create_time))]),t._v(" "),a("p",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.content))]),t._v(" "),a("p",{staticStyle:{color:"#008489"}},[t._v(t._s(e.leaving_num)+"条回复")])])]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"flex-end","margin-left":"10px"}},[a("span",{staticStyle:{"font-size":"1.5rem"}},[t._v(t._s(e.praise_num))]),t._v(" "),a("i",{staticClass:"iconfont icon-zan",staticStyle:{"margin-left":"0.5rem","font-size":"1.5rem"},style:{color:0==e.is_praise?"#999999":"#008489"},on:{click:function(a){t.clickPrease(e,i)}}})])])})),t._v(" "),a("el-button",{staticStyle:{"background-color":"#F4F4F4",color:"#666666",width:"100%",border:"none"},on:{click:t.lookMore}},[t._v("查看更多评论>")])],1):t._e()],2)]):t._e()},staticRenderFns:[]};var n=a("VU/8")(s,r,!1,function(t){a("EsRQ")},"data-v-2ac618bb",null);e.default=n.exports}});
//# sourceMappingURL=133.8bc43a04d0553290d84a.js.map