webpackJsonp([118],{"7BS/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Xxa5"),s=i.n(a),l=i("exGp"),n=i.n(l),o=i("/nBy"),r=i("7+uW"),c=i("sbrb"),g=i.n(c);r.default.use(g.a);o.a;r.default.use(g.a);var d={data:function(){return{api:this.GLOBAL.baseURL,upData:{token:localStorage.getItem("token")},imageUrl:"",imageId:"",image:[],sampleList:[{img:"./static/img/home/1.png",title:"和铂金唱片制作人一起写歌",type:"img"},{img:"./static/img/home/2.png",title:"巴黎大厨家里的私人晚餐",type:"img"},{img:"./static/img/home/3.png",title:"和搜救犬一起徒步游览润宁峡谷",type:"img"},{img:"./static/img/home/2.png",title:"巴黎大厨家里的私人晚餐",type:"img"},{img:"./static/img/home/3.png",title:"和搜救犬一起徒步游览润宁峡谷",type:"img"},{img:"./static/img/home/2.png",title:"巴黎大厨家里的私人晚餐",type:"img"},{img:"./static/img/home/3.png",title:"和搜救犬一起徒步游览润宁峡谷",type:"img"}],sampleIndex:0,leftDate:0,dialogUrl:"",dialogVisible:!1,uploadList:[],fileAllList:[],upLoadIndex:1,complete:"",param:"",isLoading:!1,uploadImg:"",index:0,active_id:""}},components:{Loading:o.a},methods:{addSample:function(){this.sampleIndex<this.sampleList.length-2&&(this.sampleIndex++,this.leftDate=this.leftDate-140)},delSample:function(){this.sampleIndex>0&&(this.sampleIndex--,this.leftDate=this.leftDate+140)},changeRouter:function(){var t=this;this.imageId?this.image.length?this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,cover_image:this.imageId,image:this.image,step:8}).then(function(e){1==e.data.code?t.complete?t.$message({type:"success",message:"保存成功!"}):t.$emit("changeRouter",{id:10,router:"Feeladdress",information:t.active_id,complete:t.complete}):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),cover_image:this.imageId,image:this.image,step:8}).then(function(e){1==e.data.code?(t.$emit("saveId",e.data.data),t.$emit("changeRouter",{id:10,router:"Feeladdress",information:e.data.data})):3==e.data.code?t.changeRouter():0==e.data.code&&t.$alert(e.data.msg)}):this.$message({type:"info",message:"请上传内容照片或者视频"}):this.$message({type:"info",message:"请上传封面照片"})},look:function(t,e){this.dialogVisible=!0,this.dialogUrl=t.url},delet:function(t,e){this.uploadList.splice(e,1)},deletVideo:function(t,e){this.uploadList.splice(e,1)},uploadLook:function(t,e){this.dialogVisible=!0,this.dialogUrl=t.url},uploadDelet:function(t,e){this.fileAllList.splice(e,1);for(var i=0;i<this.image.length;i++)t.image_id==this.image[i].image_id&&this.image.splice(i,1)},seletIA:function(t){var e=this;return n()(s.a.mark(function i(){var a;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return(a=e).uploadImg=1,a.isLoading=!0,i.next=5,a.xunhuan(t);case 5:case"end":return i.stop()}},i,e)}))()},seletI:function(t){var e=this;return n()(s.a.mark(function i(){var a;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return(a=e).uploadImg=2,a.isLoading=!0,i.next=5,a.xunhuan(t);case 5:case"end":return i.stop()}},i,e)}))()},xunhuan:function(t){var e=this;return n()(s.a.mark(function i(){var a;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(a=new FormData,!t.target.files.length){i.next=10;break}if(!(t.target.files.length>10)){i.next=9;break}return e.$message({type:"info",message:"最多一次上传10张!"}),e.isLoading=!1,e.$refs.file.value="",i.abrupt("return",!1);case 9:e.panduan(t.target.files,a);case 10:case"end":return i.stop()}},i,e)}))()},panduan:function(t,e){var i=null,a=this;if(a.index==t.length)return a.index=0,a.param=e,void a.upload();var s=t[this.index],l="image/jpeg"===s.type||"image/jpg"===s.type||"image/png"===s.type,n="video/mp4"===s.type;if(!l&&!n)return alert("请上传图片格式IPEG/PNG/JPG或者视频格式MP4"),a.isLoading=!1,!1;if(n){var o=URL.createObjectURL(s),r=new Audio(o);r.addEventListener("loadedmetadata",function(){if(r.duration>10)return a.$message({type:"error",message:"上传视频不能大于10s"}),a.isLoading=!1,!1;e.append("file[]",s),a.index++,a.panduan(t,e)})}else{g.a.getData(s,function(){g.a.getAllTags(this),i=g.a.getTag(this,"Orientation")});var c=new FileReader;c.onload=function(s){var l=new Image;l.src=s.target.result,l.onload=function(){var s=this.naturalWidth,l=this.naturalHeight,n=document.createElement("canvas"),o=n.getContext("2d");n.width=s,n.height=l,o.drawImage(this,0,0,s,l);var r=null;if(""!=i&&1!=i){switch(i){case 6:a.rotateImg(this,"left",n);break;case 8:a.rotateImg(this,"right",n);break;case 3:a.rotateImg(this,"turntwo",n)}r=n.toDataURL("image/jpeg",.8),e.append("file[]",r)}else r=n.toDataURL("image/jpeg",.8),e.append("file[]",r);a.index++,a.panduan(t,e)}},c.readAsDataURL(s)}},rotateImg:function(t,e,i){if(null!=t){var a=t.height,s=t.width,l=2;null==l&&(l=0),"right"==e?++l>3&&(l=0):--l<0&&(l=3);var n=90*l*Math.PI/180,o=i.getContext("2d");switch(l){case 0:i.width=s,i.height=a,o.drawImage(t,0,0);break;case 1:i.width=a,i.height=s,o.rotate(n),o.drawImage(t,0,-a);break;case 2:i.width=s,i.height=a,o.rotate(n),o.drawImage(t,-s,-a);break;case 3:i.width=a,i.height=s,o.rotate(n),o.drawImage(t,-s,0)}}},upload:function(){var t=this;this.param.append("token",localStorage.getItem("token")),this.$http.post(this.api+"/home/Upload/upload_many",this.param).then(function(e){if(1==e.data.code){var i=e.data.data;if(1==t.uploadImg){for(var a=0;a<i.length;a++)t.imageUrl=i[a].domain+i[a].image_url,t.imageId=i[a].image_id;t.$message({type:"success",message:"上传成功！"}),t.$refs.fileA.value=""}else{for(var s=0;s<i.length;s++)t.fileAllList.push({url:i[s].domain+i[s].image_url,image_id:i[s].image_id,type:i[s].extension}),t.image.push({image_id:i[s].image_id});t.$refs.file.value=""}t.isLoading=!1}else 3==e.data.code?t.upload():0==e.data.code?(alert(e.data.msg),t.isLoading=!1,t.$refs.file.value="",1==t.uploadImg?t.$refs.fileA.value="":t.$refs.file.value=""):(1==t.uploadImg?t.$refs.fileA.value="":t.$refs.file.value="",t.isLoading=!1)}).catch(function(e){1==t.uploadImg?t.$refs.fileA.value="":t.$refs.file.value="",t.isLoading=!1})},getActives:function(){var t=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(e){if(1==e.data.code){for(var i=e.data.data,a=0;a<i.image.length;a++)t.fileAllList.push({url:i.image[a].domain+i.image[a].image_url,image_id:i.image[a].image_id,type:i.image[a].extension}),t.image.push({image_id:i.image[a].image_id});i.cover_image&&(t.imageUrl=i.cover.domain+i.cover.themb_url,t.imageId=i.cover.image_id)}else 3==e.data.code?t.getActives():0==e.data.code&&alert(e.data.msg)})}},created:function(){window.scroll(0,0),this.complete=this.$route.query.complete,this.active_id=this.$route.query.information},mounted:function(){var t=this;this.$dragging.$on("dragend",function(e){for(var i=[],a=0;a<t.fileAllList.length;a++)i.push({image_id:t.fileAllList[a].image_id});t.image=i}),t.active_id&&t.getActives()}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"exp_con"},[i("p",{staticClass:"title"},[t._v("为体验添加照片")]),t._v(" "),i("p",{staticClass:"language_txt"},[t._v("这些照片将会显示在体验页面的顶部，因此请尽量上传高品质的体验照片，给用户留下良好的第一印象。")]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"title_con"},[t._m(1),t._v(" "),i("div",{staticClass:"advice_sample"},[i("p",{staticClass:"fontweight"},[t._v("示例：")]),t._v(" "),i("p",{staticClass:"fontweight",staticStyle:{color:"#008489"}},[i("span",{staticStyle:{cursor:"pointer"},on:{click:t.delSample}},[i("i",{staticClass:"el-icon-arrow-left"})]),t._v(" "+t._s(t.sampleIndex+1)+"/"+t._s(t.sampleList.length-1)+" "),i("span",{staticStyle:{cursor:"pointer"},on:{click:t.addSample}},[i("i",{staticClass:"el-icon-arrow-right"})])])]),t._v(" "),i("div",{staticClass:"sample_con"},[i("div",{style:{width:"2000px",marginLeft:t.leftDate+"px",transition:"all .3s linear"}},t._l(t.sampleList,function(e){return i("div",{staticClass:"sample_img",style:{backgroundImage:"url("+e.img+")",backgroundSize:"100% 100%"}},["img"==e.type?i("p",{staticClass:"fontweight",staticStyle:{color:"white","margin-top":"130px",padding:"0 10px 0 10px"}},[t._v(t._s(e.title))]):t._e()])}))])]),t._v(" "),i("p",{staticClass:"fontweight main_language"},[t._v("封面照片")]),t._v(" "),i("p",{staticStyle:{"margin-top":"20px"}},[t._v("请为体验挑选一张最具代表性的照片，这会是参与者浏览体验时看到的第一张照片")]),t._v(" "),i("div",{staticStyle:{"margin-top":"30px"}},[i("div",{staticStyle:{"margin-top":"30px",display:"flex","justify-content":"flex-start"}},[i("div",{staticClass:"formFile"},[i("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),t._v(" "),i("input",{ref:"fileA",staticClass:"upload",attrs:{type:"file"},on:{change:t.seletIA}})]),t._v(" "),i("div",{staticStyle:{"margin-left":"30px"}},[t.imageUrl?i("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):t._e()])])]),t._v(" "),i("p",{staticClass:"fontweight main_language"},[t._v("活动内容照片或视频")]),t._v(" "),i("p",{staticStyle:{"margin-top":"20px"}},[t._v("请为体验挑选活动照片或视频，这会是参与者浏览体验时看到的照片或视频")]),t._v(" "),i("div",{staticStyle:{"margin-top":"30px"}},[i("div",{staticClass:"formFile"},[i("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),t._v(" "),i("input",{ref:"file",staticClass:"upload",attrs:{type:"file",multiple:""},on:{change:t.seletI}})])]),t._v(" "),t.fileAllList.length?i("p",{staticStyle:{"font-size":"12px",color:"#008489",margin:"10px 0"}},[t._v("（小贴士：可以对您的照片进行排序再保存）")]):t._e(),t._v(" "),t.fileAllList.length?i("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},t._l(t.fileAllList,function(e,a){return i("div",{directives:[{name:"dragging",rawName:"v-dragging",value:{item:e,list:t.fileAllList,group:"item"},expression:"{ item: item, list: fileAllList, group: 'item' }"}],key:a,staticStyle:{margin:"20px 0"}},["jpg"==e.type||"jpeg"==e.type||"png"==e.type?i("div",{staticStyle:{width:"150px",height:"150px","background-size":"100% 100%","margin-right":"20px"},style:{backgroundImage:"url("+e.url+")"}},[i("div",{staticStyle:{width:"150px",height:"150px",position:"relative","background-color":"rgba(0,0,0,.3)"}},[i("div",{staticStyle:{position:"absolute",top:"50%",left:"50%",width:"50px",height:"20px",display:"flex","justify-content":"flex-start","margin-left":"-25px","margin-top":"-10px"}},[i("i",{staticClass:"el-icon-zoom-in",staticStyle:{"font-size":"20px",color:"white",cursor:"pointer"},on:{click:function(i){t.uploadLook(e,a)}}}),i("i",{staticClass:"el-icon-delete",staticStyle:{"font-size":"20px",color:"white","margin-left":"10px",cursor:"pointer"},on:{click:function(i){t.uploadDelet(e,a)}}})])])]):t._e(),t._v(" "),"mp4"==e.type||"rmvb"==e.type||"avi"==e.type||"wmv"==e.type||"rm"==e.type||"3GP"==e.type?i("div",{staticStyle:{width:"150px","margin-right":"20px",position:"relative"}},[i("div",{staticStyle:{position:"absolute",right:"60px",top:"50px",width:"20px",height:"20px",cursor:"pointer","z-index":"1"},on:{click:function(i){t.deletVideo(e,a)}}},[i("i",{staticClass:"el-icon-delete",staticStyle:{color:"white","font-size":"20px"},on:{click:function(i){t.uploadDelet(e,a)}}})]),t._v(" "),i("video",{attrs:{src:e.url,width:"150px",height:"150px",controls:"controls"}})]):t._e()])})):t._e(),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogUrl,alt:""}})]),t._v(" "),i("div",{staticClass:"exp_btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.changeRouter}},[t._v(t._s(t.complete?"保存":"下一步"))])],1),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"990","background-color":"rgba(255,255,255,.8)",display:"flex","justify-content":"center","align-items":"center"}},[i("div",[i("Loading"),t._v(" "),i("p",[t._v("上传中")])],1)]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"language_title"},[e("span",{staticClass:"fontweight"},[this._v("小贴士")]),this._v(" "),e("i",{staticClass:"el-icon-arrow-up"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"about_advice"},[i("div",[i("p",{staticClass:"fontweight"},[t._v("建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 展现大家在体验过程中如何投入地参与活动")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 展现体验环境与内容的照片，以及真实的活动抓拍")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-plus right"}),t._v(" 确保照片中光线良好。 自然光为最佳")])]),t._v(" "),i("div",[i("p",{staticClass:"fontweight"},[t._v("不建议")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 包括自拍或摆拍照")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 用了滤镜（比如黑白照）或加了文字和贴图的照片")]),t._v(" "),i("p",{staticClass:"advice_list"},[i("i",{staticClass:"el-icon-close wrong"}),t._v(" 上传含毒品、裸体、酒精、儿童元素的照片")])])])}]};var m=i("VU/8")(d,p,!1,function(t){i("apR5")},null,null);e.default=m.exports},apR5:function(t,e){}});
//# sourceMappingURL=118.f1a7de7df276fc111900.js.map