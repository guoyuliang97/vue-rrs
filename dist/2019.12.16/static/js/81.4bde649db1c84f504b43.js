webpackJsonp([81],{"6ouc":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{api:this.GLOBAL.baseURL,sampleList:[{img:"./static/img/static/story.jpg",title:"和铂金唱片制作人一起写歌"},{img:"./static/img/static/story.jpg",title:"巴黎大厨家里的私人晚餐"},{img:"./static/img/static/story.jpg",title:"和搜救犬一起徒步游览润宁峡谷"}],sampleIndex:0,leftDate:0,styleName:"",oneArr:["我将不提供任何东西"],complete:"",active_id:""}},methods:{addSample:function(){this.sampleIndex<this.sampleList.length-1&&(this.sampleIndex++,this.leftDate=this.leftDate-370)},delSample:function(){this.sampleIndex>0&&(this.sampleIndex--,this.leftDate=this.leftDate+370)},changeRouter:function(){var t=this;this.styleName?this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,title:this.styleName,step:7}).then(function(e){1==e.data.code?t.complete?t.$message({type:"success",message:"保存成功！"}):t.$emit("changeRouter",{id:8,router:"Photo",information:t.active_id,complete:t.complete}):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),title:this.styleName,step:7}).then(function(e){1==e.data.code?(t.$emit("saveId",e.data.data),t.$emit("changeRouter",{id:8,router:"Photo",information:e.data.data})):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}):this.$message({type:"info",message:"请完善体验名称"})},getActive:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){1==e.data.code?t.styleName=e.data.data.title:3==e.data.code?t.getActive():0==e.data.code&&t.$alert(e.data.msg)})}},created:function(){window.scroll(0,0),this.complete=this.$route.query.complete,this.active_id=this.$route.query.information},mounted:function(){this.active_id&&this.getActive()}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"exp_con"},[i("p",{staticClass:"title"},[t._v("给体验想个标题？")]),t._v(" "),i("p",{staticClass:"language_txt"},[t._v("告诉参与者您的体验有哪些不同之处，帮助他们设想将做些什么。 出色的体验标题应能凸显您自己的专长技能，重点说明您能带参与者去哪些他们自己去不到的地方，或者做他们自己做不到的事情。")]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"title_con"},[t._m(1),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"sample_con"},t._l(t.sampleList,function(e){return i("div",{staticClass:"sample_img",style:{backgroundImage:"url("+e.img+")",backgroundSize:"100% 100%"}},[i("p",{staticClass:"fontweight",staticStyle:{color:"white","margin-top":"130px",padding:"0 10px 0 10px"}},[t._v(t._s(e.title))])])}))]),t._v(" "),i("p",{staticClass:"fontweight main_language"},[t._v("请提供体验名称")]),t._v(" "),i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",autosize:{minRows:1,maxRows:3},placeholder:"例如舞动里约桑巴舞体验"},model:{value:t.styleName,callback:function(e){t.styleName=e},expression:"styleName"}}),t._v(" "),i("div",{staticClass:"exp_btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.changeRouter}},[t._v(t._s(t.complete?"保存":"下一步"))])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"language_title"},[e("span",{staticClass:"fontweight"},[this._v("小贴士")]),this._v(" "),e("i",{staticClass:"el-icon-arrow-up"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"about_advice"},[i("div",[i("p",{staticClass:"fontweight"},[t._v("建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 拼写和语法正确无误")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 主动动词")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 您的体验有何独特之处")])]),t._v(" "),i("div",[i("p",{staticClass:"fontweight"},[t._v("不建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 当地俚语")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 全部大写和标点符号")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 符号或表情符号")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"advice_sample"},[e("p",{staticClass:"fontweight"},[this._v("示例：")])])}]};var c=i("VU/8")(a,s,!1,function(t){i("ABXs")},null,null);e.default=c.exports},ABXs:function(t,e){}});
//# sourceMappingURL=81.4bde649db1c84f504b43.js.map