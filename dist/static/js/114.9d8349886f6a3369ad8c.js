webpackJsonp([114],{"+wYb":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("ZKg9"),s=i("a20G"),a=i("DjrJ"),o=(a.a,s.a,n.a,{name:"storyList",data:function(){return{api:this.GLOBAL.baseURL,publishList:[]}},components:{Head:a.a,None:s.a,LoadingImg:n.a},methods:{toRemake:function(t,e){this.$router.push({name:"storyPublish",query:{storyId:t.story_id}})},toStory:function(){this.$router.push("/storyPublish")},toPublish:function(t,e){this.$router.push({name:"storyPage",query:{information:t.story_id}})},delet:function(t,e){var i=this;this.$http.post(this.api+"/home/Story/del_story",{token:localStorage.getItem("token"),story_id:t.story_id}).then(function(t){1==t.data.code?(i.visible2=!1,i.publishList.splice(e,1)):t.data.code})},abolish:function(t,e){t.visible=!1}},mounted:function(){var t=this;this.$http.post(this.api+"/storyc",{token:localStorage.getItem("token"),sort:1}).then(function(e){if(1==e.data.code){t.publishList=e.data.data.data;for(var i=0;i<t.publishList.length;i++)t.publishList[i].push={visible:!1}}else e.data.code,alert(e.data.msg)})}}),r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-container",[i("el-header",[i("Head",{attrs:{type:"storyList"}})],1),t._v(" "),i("el-main",{staticStyle:{width:"800px",margin:"20px auto","text-align":"left"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[i("p",{staticStyle:{"font-size":"30px","font-weight":"bold"}},[t._v("欢迎回来")]),t._v(" "),i("p",[t._v("查看并编辑您的全部故事。")])]),t._v(" "),i("div",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.toStory}},[t._v("新故事")])],1)]),t._v(" "),t._l(t.publishList,function(e,n){return i("div",{staticStyle:{display:"flex","justify-content":"space-around","margin-top":"50px"}},[i("LoadingImg",{staticStyle:{width:"300px",height:"200px"},attrs:{type:"3",src:e.cover.domain+e.cover.image_url}}),t._v(" "),i("div",{staticStyle:{"line-height":"40px",width:"300px"}},[i("h4",[t._v(t._s(e.title))]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start"}},t._l(e.kind,function(e,n){return i("div",[i("span",[t._v("/"+t._s(e.kind_name)+" ")])])})),t._v(" "),i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[t._v(t._s(e.content))]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(i){t.toPublish(e,n)}}},[t._v("查看")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(i){t.toRemake(e,n)}}},[t._v("修改")])],1),t._v(" "),i("div",[i("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(i){t.$set(e,"visible",i)},expression:"item.visible"}},[i("p",[t._v("这是一段内容这是一段内容确定删除吗？")]),t._v(" "),i("div",{staticStyle:{"text-align":"right",margin:"0"}},[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.abolish(e,n)}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.delet(e,n)}}},[t._v("确定")])],1),t._v(" "),i("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("删除")])],1)],1)],1)}),t._v(" "),t.publishList.length?t._e():i("div",{staticStyle:{"text-align":"center"}},[i("None",{attrs:{type:"story"}}),t._v(" "),i("p",[t._v("还没有创建故事哦~")])],1)],2)],1)],1)},staticRenderFns:[]};var l=i("VU/8")(o,r,!1,function(t){i("rdNv")},"data-v-3df5681a",null);e.default=l.exports},rdNv:function(t,e){}});
//# sourceMappingURL=114.9d8349886f6a3369ad8c.js.map