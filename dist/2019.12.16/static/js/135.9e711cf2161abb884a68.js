webpackJsonp([135],{NaXL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"lianxi",data:function(){return{api:this.GLOBAL.baseURL,fileList:[],aa:[],data:{token:localStorage.getItem("token")}}},methods:{asd:function(t,e){this.fileList.push(e)},handleProgress:function(t){},asdasd:function(){this.$refs.upload.submit()},hangdle:function(t){},handleRemove:function(t,e,a){},handlePreview:function(t){},handleSuccess:function(t,e){"image/jpeg"===t.raw.type||(this.$message.error("上传头像图片只能是 JPG 格式!"),e.pop()),e.slice(0,e.length-1).find(function(e){return e.name===t.name})&&(this.$message.error("当前文件已经存在!"),e.pop()),this.aa.push(t)}},watch:{fileList:function(){}},mounted:function(){this.$dragging.$on("dragged",function(t){}),this.$dragging.$on("dragend",function(t){})}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:t.api+"/home/Upload/upload_many","list-type":"picture-card","on-change":t.handleSuccess,"on-success":t.asd,data:t.data,multiple:"","file-list":t.fileList,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[t._v("选取文件")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:t.asdasd}},[t._v("上传到服务器")]),t._v(" "),t._l(t.aa,function(e,i){return a("div",{directives:[{name:"dragging",rawName:"v-dragging",value:{item:e,list:t.aa,group:"item"},expression:"{ item: item, list: aa, group: 'item' }"}]},[a("img",{attrs:{src:e.url,width:"150px",height:"150px"}})])})],2)},staticRenderFns:[]};var s=a("VU/8")(i,n,!1,function(t){a("SsG4")},"data-v-28325cb7",null);e.default=s.exports},SsG4:function(t,e){}});
//# sourceMappingURL=135.9e711cf2161abb884a68.js.map