webpackJsonp([107],{YOiJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("uTVu"),o={data:function(){return{api:this.GLOBAL.baseURL,imgUrl:"../../../static/img/static/user.png",isSuccess:!1,isUpload:!1,upData:{token:localStorage.getItem("token")}}},methods:{handleAvatarSuccess:function(t,e){this.imgUrl=URL.createObjectURL(e.raw),localStorage.setItem("userImg",t.data.domain+t.data.image_url),this.savePhoto(t)},savePhoto:function(t){var e=this;this.$http.post(this.api+"/home/User/saveuser",{token:localStorage.getItem("token"),head_image:t.data.image_id}).then(function(t){1==t.data.code?s.a.$emit("userImage",e.imgUrl):3==t.data.code?e.$http.post(e.api+"/home/index/token").then(function(t){localStorage.setItem("token",t.data.data),e.savePhoto()}):alert(t.data.msg)})},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type,a=t.size/1024/1024<5;return e||this.$message.error("上传照片只能是jpg/png格式"),a||this.$message.error("上传图片大小不能超过5M"),e&&a},uploadProgress:function(){this.isSuccess=!0,this.isUpload=!1},delPhoto:function(){var t=this;"../../../static/img/static/user.png"!=this.imgUrl&&this.$confirm("确定要删除此照片?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.removePhoto()}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},removePhoto:function(){var t=this;this.$http.post(this.api+"/home/User/saveuser",{token:localStorage.getItem("token"),head_image:""}).then(function(e){1==e.data.code?(t.imgUrl="../../../static/img/static/user.png",t.$message({type:"success",message:"删除成功!"})):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.removePhoto()}):alert(e.data.msg)})}},mounted:function(){var t=this;this.$http.post(this.api+"/home/User/get_user",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?e.data.data[0].headimage?t.imgUrl=e.data.data[0].headimage.domain+e.data.data[0].headimage.image_url:t.imgUrl="../../../static/img/static/user.png":(e.data.code,t.$router.push("/"),localStorage.removeItem("isLogin"))}).catch(function(t){alert(t)})}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"mandatory"},[t._m(0),t._v(" "),a("div",{staticClass:"edit_datacon"},[a("div",{staticClass:"editphoto_con",style:{backgroundImage:"url("+t.imgUrl+")",backgroundSize:"100% 100%"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isUpload&&!t.isSuccess,expression:"isUpload&&!isSuccess"}],staticStyle:{position:"absolute",top:"0",right:"0",bottom:"0",left:"0","background-color":"rgba(0,0,0,.6)","z-index":"99","line-height":"180px",color:"#008489","font-size":"24px"}},[a("i",{staticClass:"el-icon-loading"})]),t._v(" "),a("p",{staticClass:"fontweight",staticStyle:{position:"absolute",top:"2px",right:"2px",color:"#333333","font-size":"18px","z-index":"98",cursor:"pointer"},on:{click:t.delPhoto}},[a("i",{staticClass:"el-icon-delete"})]),t._v(" "),a("div",{staticStyle:{position:"absolute",left:"0",right:"0",top:"0",bottom:"0","background-color":"rgba(255,255,255,.5)"}}),t._v(" "),a("div",{staticClass:"editphoto_head",style:{backgroundImage:"url("+t.imgUrl+")",backgroundSize:"100% 100%"}})]),t._v(" "),a("div",{staticClass:"editPhoto_txt"},[t._v("清晰的正面脸部照片是房东和房客互相认识对方的重要途径。您能想象把自己的房子租给一只猫吗？ 请确保使用能够清楚显示您面部的照片，并确认其中不包含任何您不希望其他房东或房客看到的个人或敏感信息。")]),t._v(" "),a("div",{staticClass:"editphoto_upload fontweight"},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.api+"/home/Upload/upload",data:t.upData,"show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload,"on-progress":t.uploadProgress}},[t.imgUrl?a("img",{staticClass:"avatar",attrs:{src:t.imgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v("\n\t\t\t\t上传照片\n\t\t\t\t")],1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"data_title"},[e("div",{staticClass:"edit_width"},[this._v("个人头像")])])}]};var n=a("VU/8")(o,i,!1,function(t){a("sAXM")},null,null);e.default=n.exports},sAXM:function(t,e){}});
//# sourceMappingURL=107.04a79501f760a315becb.js.map