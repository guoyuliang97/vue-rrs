webpackJsonp([62],{Arzs:function(t,e){},BJvy:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{api:this.GLOBAL.baseURL,sampleList:[{txt:"您将直接参与我们每周的篮球训练营，跟60个孩子共度两小时的训练和比赛时间。 这里只有我们三个人负责所有孩子（10岁到17岁之间的男孩和女孩），您将协助我们一起训练并指导孩子打篮球。 与孩子们一起共度欢乐时光，让您的活力无限释放，汗水激情飞扬，当然也要注意安全。"},{txt:"我的家乡是埃尔萨谷口村，距离佛罗伦萨以南大约1小时车程。我会带大家去村里的集市，向各位介绍我最喜欢的摊位。 我们将一起穿行在各色奶酪、海鲜店铺之间，和店老板聊聊天，到访我们家的老字号肉铺，见一见全托斯卡纳最棒的水果蔬菜商贩。"}],sampleIndex:0,leftDate:0,aboutMe:"",questionList:"",replay:[],four:"",certificate:"",linkOne:"",linkTwo:"",linkThree:"",complete:"",active_id:""}},methods:{addSample:function(){this.sampleIndex<this.sampleList.length-1&&(this.sampleIndex++,this.leftDate=this.leftDate-370)},delSample:function(){this.sampleIndex>0&&(this.sampleIndex--,this.leftDate=this.leftDate+370)},changeRouter:function(){var t=this;this.aboutMe?!this.replay.length>=1?this.$message({type:"info",message:"请完善体验内容"}):this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,question:this.replay,descripte:this.aboutMe,step:4}).then(function(e){1==e.data.code?t.complete?t.$message({type:"success",message:"保存成功！"}):t.$emit("changeRouter",{id:5,router:"Provide",information:t.active_id,complete:t.complete}):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}).catch(function(t){alert(t)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),question:this.replay,descripte:this.aboutMe,step:4}).then(function(e){1==e.data.code?(t.$emit("saveId",e.data.data),t.$emit("changeRouter",{id:5,router:"Provide",information:e.data.data})):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}):this.$message({type:"info",message:"请完善体验的相关描述"})},answerAdd:function(t,e){this.replay[e]?this.replay[e]={answer_id:this.replay[e].answer_id,question_id:t.question_id,option_id:t.answer,other:""}:this.replay[e]={question_id:t.question_id,option_id:t.answer,other:""}},getQestion:function(){var t=this;this.$http.post(this.api+"/home/Activity/question",{token:localStorage.getItem("token"),activity_id:this.active_id,flag:2}).then(function(e){1==e.data.code?t.questionList=e.data.data:3==e.data.code?t.getQestion():0==e.data.code&&t.$alert(e.data.msg)})},getActives:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){if(1==e.data.code){for(var i=0;i<t.questionList.length;i++)for(var a=0;a<e.data.data.answer.length;a++)t.questionList[i].question_id==e.data.data.answer[a].question_id&&(t.questionList[i].answer=e.data.data.answer[a].option_id,t.replay.push(e.data.data.answer[a]));t.aboutMe=e.data.data.descripte}else 3==e.data.code?t.getActives():0==e.data.code&&t.$alert(e.data.msg)})}},mounted:function(){window.scroll(0,0),this.getQestion(),this.active_id&&this.getActives()},created:function(){window.scrollTo(0,0),this.complete=this.$route.query.complete,this.active_id=this.$route.query.information}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"exp_con"},[i("p",{staticClass:"title"},[t._v("介绍体验内容")]),t._v(" "),i("p",{staticClass:"language_txt"},[t._v("生动的描述或许能够吸引浏览体验的人预订，不妨在这里突出您体验的独家亮点｡")]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"title_con"},[t._m(1),t._v(" "),i("div",{staticClass:"advice_sample"},[i("p",{staticClass:"fontweight"},[t._v("示例：")]),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{color:"#008489"}},[i("span",{staticStyle:{cursor:"pointer"},on:{click:t.delSample}},[i("i",{staticClass:"el-icon-arrow-left"})]),t._v(" "+t._s(t.sampleIndex+1)+"/"+t._s(t.sampleList.length)+" "),i("span",{staticStyle:{cursor:"pointer"},on:{click:t.addSample}},[i("i",{staticClass:"el-icon-arrow-right"})])])]),t._v(" "),i("div",{staticClass:"sample_con"},[i("div",{staticStyle:{width:"1100px",transition:"all .3s linear"},style:{width:"1100px",transition:"all .3s linear",marginLeft:t.leftDate+"px"}},t._l(t.sampleList,function(e){return i("div",{staticClass:"sample_li"},[t._v("\n\t\t\t\t\t"+t._s(e.txt)+"\n\t\t\t\t")])}))])]),t._v(" "),i("p",{staticClass:"fontweight main_language"},[t._v("描述体验的大致流程和独特之处")]),t._v(" "),i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",autosize:{minRows:6,maxRows:6},placeholder:"按照您安排的活动顺序,为每项活动撰写简介"},model:{value:t.aboutMe,callback:function(e){t.aboutMe=e},expression:"aboutMe"}}),t._v(" "),i("p",{staticClass:"fontweight main_language"},[t._v("请介绍一下体验内容")]),t._v(" "),t._l(t.questionList,function(e,a){return i("div",{key:a,staticClass:"aboutme_choice"},[i("p",{staticClass:"fontweight"},[t._v(t._s(e.title))]),t._v(" "),i("el-radio-group",{on:{change:function(i){t.answerAdd(e,a)}},model:{value:e.answer,callback:function(i){t.$set(e,"answer",i)},expression:"item.answer"}},t._l(e.option,function(e){return i("p",{staticClass:"chioce"},[i("el-radio",{attrs:{label:e.option_id}},[t._v(t._s(e.name))])],1)}))],1)}),t._v(" "),i("div",{staticClass:"exp_btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.changeRouter}},[t._v(t._s(t.complete?"保存":"下一步"))])],1),t._v(" "),t._m(2)],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"language_title"},[e("span",{staticClass:"fontweight"},[this._v("小贴士")]),this._v(" "),e("i",{staticClass:"el-icon-arrow-up"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"about_advice"},[i("div",[i("p",{staticClass:"fontweight"},[t._v("建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 写明参与者会在体验中做些什么")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 描述体验的行程，让参与者了解他们可以期待的内容")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 写出您的体验最独特的亮点")])]),t._v(" "),i("div",[i("p",{staticClass:"fontweight"},[t._v("不建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 笼统的行程或者模糊的信息")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 参与者自己可以轻松找到的地方或者完成的活动")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticStyle:{"margin-top":"15px"}},[e("span",{staticClass:"fontweight"},[this._v("注意事项:")]),this._v("参与者希望参加的是自己找不到的独特体验。 了解"),e("span",{staticStyle:{color:"#008489",cursor:"pointer"}},[this._v("专属体验")]),this._v("的相关标准。")])}]};var n=i("VU/8")(a,s,!1,function(t){i("Arzs")},null,null);e.default=n.exports}});
//# sourceMappingURL=62.140368c22e4394d1de10.js.map