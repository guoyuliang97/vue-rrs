webpackJsonp([81],{RX64:function(t,e){},jrkM:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("ZQ6i"),l=i("dbwY"),s=i("mnKu"),n=i("a20G"),o=i("ZKg9"),r=i("uTVu"),c=(l.default,n.a,o.a,{name:"inviteList",data:function(){return{api:this.GLOBAL.baseURL,score:"",scoreList:[{lable:"1分",value:1},{lable:"2分",value:2},{lable:"3分",value:3},{lable:"4分",value:4},{lable:"5分",value:5}],languageList:[],language:"",country:"",province:"",city:"",xian:"",total:0,date:[],time:[],volunteerList:[],datePicker:[],timePicker:[],isInvite:!1,active_id:"",Longday:!1,pageIndex:1,timeAll:[],checked:!1,personThing:"暂无该搜索的志愿者！",isPerson:!1,sexArr:[],userId:"",index:1}},components:{City:l.default,None:n.a,LoadingImg:o.a},watch:{checked:function(){this.checked?this.getAlltime():(this.date=[],this.time=[])},active_id:function(){this.active_id&&r.a.$emit("invitId",this.active_id)},userId:function(){this.userId&&r.a.$emit("invitUser",this.userId)}},methods:{getAlltime:function(){for(var t=[],e=[],i=[],a=0;a<this.datePicker.length;a++)t.push(this.datePicker[a].value);for(var l=0;l<this.timeAll.length;l++)for(var s=0;s<this.timeAll[l].index.length;s++)i.push({label:this.timeAll[l].index[s].label,value:this.timeAll[l].index[s].value}),e.push(this.timeAll[l].index[s].value);this.timePicker=i,this.date=t,this.time=e},changeTime:function(){for(var t=[],e=0;e<this.date.length;e++)for(var i=0;i<this.timeAll.length;i++)if(this.date[e]==i)for(var a=0;a<this.timeAll[i].index.length;a++)t.push({label:this.timeAll[i].index[a].label,value:this.timeAll[i].index[a].value});this.timePicker=t},searchVolun:function(){this.getVolunteer(this.pageIndex,this.country,this.province,this.city,this.xian,this.language,this.score)},selectCountry:function(t){this.country=t[1]},selectProvince:function(t){this.province=t[1]},selectCity:function(t){this.city=t[1]},selectXian:function(t){this.xian=t[1]},getVolunteer:function(t,e,i,a,l,s,n){var o=this;this.$http.post(this.api+"/home/User/user_list",{token:localStorage.getItem("token"),sort:1,page:t,country:e,province:i,city:a,region:l,language:s,score:n}).then(function(n){1==n.data.code?(n.data.data.data.length?o.isPerson=!1:o.isPerson=!0,o.volunteerList=n.data.data.data,o.total=n.data.data.total):3==n.data.code?o.getVolunteer(t,e,i,a,l,s):0==n.data.code&&alert(n.data.msg)})},handleCurrentChange:function(t){this.getVolunteer(t)},invite:function(t,e){this.user_id=t.user_id,this.getTime(this.active_id)},getTime:function(t){var e=this;this.$http.post(this.api+"/home/Activity/get_activity",{token:localStorage.getItem("token"),activity_id:t,visit:0}).then(function(i){if(1==i.data.code){var a=i.data.data;if(a.long_day){e.Longday=!0;for(var l=[],s=[],n=0;n<a.slot.length;n++){s.push({index:n});for(var o=[],r=0;r<a.slot[n].list.length;r++)a.slot[n].list[r].online||2==a.slot[n].list[r].status||o.push({label:a.slot[n].day+"  "+a.slot[n].list[r].time[0]+"—"+a.slot[n].list[r].time[1],value:a.slot[n].list[r].slot_id});o.length&&(s[n].index=o,l.push({label:a.slot[n].day,value:n}))}e.datePicker=l,e.timeAll=s}else{e.Longday=!1;for(var c=[],d=0;d<a.slot.length;d++)a.slot[d].online||2==a.slot[d].status||c.push({label:a.slot[d].begin_date+" "+a.slot[d].begin_time+"—"+a.slot[d].end_date+" "+a.slot[d].end_time,value:a.slot[d].slot_id});e.datePicker=c}e.datePicker.length?e.isInvite=!0:e.$message({type:"error",message:"您创建的体验时间已经过期！"})}else 3==i.data.code?e.getTime(t):0==i.data.code&&alert(i.data.msg)})},senInvite:function(){var t=this;this.$http.post(this.api+"/InviteS",{token:localStorage.getItem("token"),user_id:this.user_id,slot_id:this.Longday?this.time:this.date}).then(function(e){1==e.data.code?(t.$message({type:"success",message:"邀请成功！敬请期待！"}),t.isInvite=!1):3==e.data.code?t.senInvite():0==e.data.code&&alert(e.data.msg)})}},mounted:function(){this.getVolunteer(this.pageIndex)},created:function(){this.active_id=this.$route.query.activeId,this.userId=this.$route.query.information,this.sexArr=Object(a.a)(),this.languageList=Object(s.a)()}}),d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"margin-top":"15px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","font-size":"12px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","line-height":"40px"}},[i("span",[t._v("评分")]),t._v(" "),i("div",{staticStyle:{width:"200px","margin-left":"20px"}},[i("el-select",{attrs:{clearable:"",placeholder:"分数"},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}},t._l(t.scoreList,function(t){return i("el-option",{attrs:{label:t.lable,value:t.value}})}))],1)]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start","line-height":"40px","margin-left":"12px"}},[i("span",[t._v("语言")]),t._v(" "),i("div",{staticStyle:{width:"200px","margin-left":"20px"}},[i("el-select",{attrs:{placeholder:"语言"},model:{value:t.language,callback:function(e){t.language=e},expression:"language"}},t._l(t.languageList,function(t){return i("el-option",{attrs:{label:t.label,value:t.value}})}))],1)])]),t._v(" "),i("div",[i("div",{staticStyle:{display:"flex","justify-content":"flex-start","line-height":"40px","font-size":"12px",margin:"15px 0"}},[i("span",[t._v("地区")]),t._v(" "),i("City",{staticStyle:{"margin-left":"20px",width:"605px"},attrs:{type:"1"},on:{selectXian:t.selectXian,selectCountry:t.selectCountry,selectProvince:t.selectProvince,selectCity:t.selectCity}}),t._v(" "),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.searchVolun}},[t._v("查询")])],1)]),t._v(" "),i("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},t._l(t.volunteerList,function(e,a){return t.userId!=e.user_id?i("div",{key:a,staticClass:"list",staticStyle:{width:"200px","margin-right":"90px","margin-bottom":"20px"}},[i("div",[i("LoadingImg",{staticStyle:{width:"200px",height:"200px"},attrs:{type:"3",src:e.head_image?e.headimage.domain+e.headimage.image_url:"../../../static/img/static/user.png"}})],1),t._v(" "),i("div",{staticStyle:{width:"188px","font-size":"12px","line-height":"20px",padding:"15px 5px 10px 5px",border:"1px solid #eee","border-top":"none"}},[i("div",{staticStyle:{display:"flex"}},[i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[i("b",[t._v(t._s(e.family_name+e.middle_name+e.name?e.family_name+"·"+e.middle_name+"·"+e.name:"匿名用户"))])])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start",margin:"10px 0"}},[i("div",[t._v(t._s(e.score))]),t._v(" "),i("div",{staticStyle:{"margin-left":"10px"}},[i("el-rate",{attrs:{disabled:"",value:parseFloat(e.score),colors:["#008489","#008489","#008489"]}})],1)]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[i("b",[t._v(t._s(t.sexArr[e.six].label))]),t._v("-"),i("b",[t._v(t._s(0!=e.country?e.country:"未知"))]),t._v("-"),i("b",[t._v(t._s(t.languageList[e.language].label)+"/"),t._l(e.other_language.split(","),function(e){return i("span",[t._v(t._s(e?0==e?"中文,":1==e?"English,":"日本语,":""))])})],2)]),t._v(" "),i("div",{staticStyle:{"margin-top":"10px"}},[i("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",size:"mini"},on:{click:function(i){t.invite(e,a)}}},[t._v("邀请")])],1)])]):t._e()})),t._v(" "),t.isPerson?i("None",{attrs:{type:"person",personThing:t.personThing}}):t._e(),t._v(" "),i("div",{staticStyle:{margin:"20px 0","text-align":"center"}},[i("el-pagination",{attrs:{"current-page":t.index,"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.index=e}}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isInvite,expression:"isInvite"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.3)","z-index":"999",overflow:"hidden"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"400px",height:"350px",padding:"20px","background-color":"#fff","border-radius":"10px","margin-top":"-220px","margin-left":"-220px","font-size":"15px"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-checkbox",{model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("全选")]),t._v(" "),i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{"font-size":"25px",cursor:"pointer"},on:{click:function(e){t.isInvite=!1}}})],1),t._v(" "),i("p",[t._v("选择您活动时间")]),t._v(" "),i("div",{staticStyle:{margin:"20px 0"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},on:{change:t.changeTime},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},t._l(t.datePicker,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),t.timePicker.length?i("div",[i("p",[t._v("请选择参加的时间段")]),t._v(" "),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}},t._l(t.timePicker,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]):t._e(),t._v(" "),i("div",[i("el-button",{staticStyle:{width:"400px",position:"absolute",bottom:"20px"},attrs:{type:"primary"},on:{click:t.senInvite}},[t._v("确定")])],1)])])],1)},staticRenderFns:[]};var u=i("VU/8")(c,d,!1,function(t){i("RX64")},"data-v-6b9517e3",null);e.default=u.exports}});
//# sourceMappingURL=81.ac8e32e1b6c2b74870b5.js.map