webpackJsonp([135],{"2x9k":function(t,e){},WNmM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),n=a.n(i),r=a("exGp"),o=a.n(r),l=a("7+uW"),s=a("sbrb"),d=a.n(s);l.default.use(d.a);l.default.use(d.a);var c={name:"videoUpload",data:function(){return{api:"https://www.allptp.top/allptp",param:"",imageList:[],fileAllList:[],index:0,token:"9556d15c8fa0c8f5248a02d603cd3956"}},methods:{seletI:function(t){var e=this;return o()(n.a.mark(function a(){var i;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:(i=e).isLoading=!0,i.xunhuan(t);case 3:case"end":return a.stop()}},a,e)}))()},xunhuan:function(t){var e=this;return o()(n.a.mark(function a(){var i;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:console.log(1),e,i=new FormData,t.target.files.length&&e.panduan(t.target.files,i);case 4:case"end":return a.stop()}},a,e)}))()},panduan:function(t,e){var a=null,i=this;if(t.length>0&&this.index==t.length)return this.index=0,this.param=e,void this.upload();var n=t[this.index],r="image/jpeg"===n.type||"image/jpg"===n.type||"image/png"===n.type,o="video/mp4"===n.type;if(!r&&!o)return alert("请上传图片格式IPEG/PNG/JPG或者视频格式mp4"),i.isLoading=!1,!1;if(o){var l=URL.createObjectURL(n),s=new Audio(l);s.addEventListener("loadedmetadata",function(){if(s.duration>10)return i.$message({type:"error",message:"上传视频不能大于10s"}),i.isLoading=!1,!1;e.append("file[]",n)})}else{d.a.getData(n,function(){d.a.getAllTags(this),a=d.a.getTag(this,"Orientation")});var c=new FileReader;c.onload=function(n){var r=new Image;r.src=n.target.result,r.onload=function(){var n=this.naturalWidth,r=this.naturalHeight,o=document.createElement("canvas"),l=o.getContext("2d");o.width=n,o.height=r,l.drawImage(this,0,0,n,r);var s=null;if(""!=a&&1!=a){switch(a){case 6:i.rotateImg(this,"left",o);break;case 8:i.rotateImg(this,"right",o);break;case 3:i.rotateImg(this,"turntwo",o)}s=o.toDataURL("image/jpeg",.8),e.append("file[]",s)}else s=o.toDataURL("image/jpeg",.8),e.append("file[]",s);i.index++,i.panduan(t,e)}},c.readAsDataURL(n)}},rotateImg:function(t,e,a){if(null!=t){var i=t.height,n=t.width,r=2;null==r&&(r=0),"right"==e?++r>3&&(r=0):--r<0&&(r=3);var o=90*r*Math.PI/180,l=a.getContext("2d");switch(r){case 0:a.width=n,a.height=i,l.drawImage(t,0,0);break;case 1:a.width=i,a.height=n,l.rotate(o),l.drawImage(t,0,-i);break;case 2:a.width=n,a.height=i,l.rotate(o),l.drawImage(t,-n,-i);break;case 3:a.width=i,a.height=n,l.rotate(o),l.drawImage(t,-n,0)}}},upload:function(){var t=this;this.param.append("token",localStorage.getItem("token")),this.$http.post(this.api+"/home/Upload/upload_many",this.param).then(function(e){if(1==e.data.code){console.log(e);var a=e.data.data;console.log(e);for(var i=0;i<a.length;i++)t.fileAllList.push({url:a[i].domain+a[i].image_url,image_id:a[i].image_id});t.$refs.file.value=""}else 3==e.data.code?(console.log(3),t.token=localStorage.getItem("token"),t.upload()):0==e.data.code&&(alert(e.data.msg),t.isLoading=!1)})}},mounted:function(){}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"margin-top":"30px"}},[a("div",{staticClass:"formFile"},[a("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"30px"}}),t._v(" "),a("input",{ref:"file",staticClass:"upload",attrs:{type:"file",multiple:""},on:{change:t.seletI}})])]),t._v(" "),a("p",{staticStyle:{"font-size":"12px",color:"#008489",margin:"10px 0"}},[t._v("（小贴士：可以对您的照片进行排序再保存）")]),t._v(" "),a("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},t._l(t.fileAllList,function(e,i){return a("div",{directives:[{name:"dragging",rawName:"v-dragging",value:{item:e,list:t.fileAllList,group:"item"},expression:"{ item: item, list: fileAllList, group: 'item' }"}],key:i,staticStyle:{margin:"20px 0"}},[a("div",{staticStyle:{width:"150px",height:"150px","background-size":"auto 100%","margin-right":"20px"},style:{backgroundImage:"url("+e.url+")"}},[a("div",{staticStyle:{width:"150px",height:"150px",position:"relative","background-color":"rgba(0,0,0,.3)"}},[a("div",{staticStyle:{position:"absolute",top:"50%",left:"50%",width:"50px",height:"20px",display:"flex","justify-content":"flex-start","margin-left":"-25px","margin-top":"-10px"}},[a("i",{staticClass:"el-icon-zoom-in",staticStyle:{"font-size":"20px",color:"white",cursor:"pointer"},on:{click:function(a){t.uploadLook(e,i)}}}),a("i",{staticClass:"el-icon-delete",staticStyle:{"font-size":"20px",color:"white","margin-left":"10px",cursor:"pointer"},on:{click:function(a){t.uploadDelet(e,i)}}})])])])])}))])},staticRenderFns:[]};var u=a("VU/8")(c,p,!1,function(t){a("2x9k")},"data-v-2b4995f7",null);e.default=u.exports}});
//# sourceMappingURL=135.82e1970b027b7f95d006.js.map