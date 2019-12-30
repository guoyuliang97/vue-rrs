<template>
	<div>
		<div class="mandatory">
			<div class="data_title">
				<div class="edit_width">个人头像</div>
			</div>
			<div class="edit_datacon" >
				<div class="editphoto_con" :style="{backgroundImage:'url('+imgUrl+')',backgroundSize:'100% 100%'}">
					<div v-show="isUpload&&!isSuccess" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,.6);z-index: 99;line-height: 180px;color: #008489;font-size: 24px;">
						<i class="el-icon-loading"></i>
					</div>
					<p style="position: absolute;top: 2px;right: 2px;color: #333333;font-size:18px;z-index: 98;cursor: pointer;" class="fontweight" @click="delPhoto"><i class="el-icon-delete"></i></p>
					<div style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;background-color: rgba(255,255,255,.5);">
					</div>
					<div class="editphoto_head" :style="{backgroundImage:'url('+imgUrl+')',backgroundSize:'100% 100%'}"></div>
				</div>
				<div class="editPhoto_txt">清晰的正面脸部照片是房东和房客互相认识对方的重要途径。您能想象把自己的房子租给一只猫吗？ 请确保使用能够清楚显示您面部的照片，并确认其中不包含任何您不希望其他房东或房客看到的个人或敏感信息。</div>
				<div class="editphoto_upload fontweight">
				<el-upload
				  class="avatar-uploader"
				  :action="api + '/home/Upload/upload'"
          :data="upData"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload"
				  :on-progress="uploadProgress">
				  <img v-if="imgUrl" :src="imgUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				上传照片
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import Bus from '../../assets/eventBus'
	export default {
		data() {
			return {
        api:this.GLOBAL.baseURL,
				imgUrl:"../../../static/img/static/user.png",
				isSuccess:false,
				isUpload:false,
        upData:{
          token:localStorage.getItem('token')
        }
			};
		},
		methods:{
			handleAvatarSuccess(res, file){
				this.imgUrl = URL.createObjectURL(file.raw);
        localStorage.setItem('userImg',res.data.domain+res.data.image_url)
        this.savePhoto(res)
			},
      savePhoto(res){
        this.$http.post(this.api + '/home/User/saveuser',{
          token: localStorage.getItem('token'),
          head_image: res.data.image_id
        })
          .then(res=>{
            if(res.data.code  == 1){
              Bus.$emit('userImage',this.imgUrl )
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.savePhoto()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
			beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if(!isJPG){
          this.$message.error('上传照片只能是jpg/png格式');
        }
        if(!isLt5M){
          this.$message.error('上传图片大小不能超过5M');
        }
        return isJPG && isLt5M
			},
			uploadProgress(){
        this.isSuccess=true;
        this.isUpload=false
			},
			delPhoto(){
				if(this.imgUrl!="../../../static/img/static/user.png"){
					this.$confirm('确定要删除此照片?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
					 this.removePhoto()
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
					});
				}
			},
      removePhoto(){
        this.$http.post(this.api + '/home/User/saveuser',{
          token: localStorage.getItem('token'),
          head_image:''
        }).then(res=>{
          if(res.data.code == 1){
            this.imgUrl ="../../../static/img/static/user.png"
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else if(res.data.code == 3){
            this.$http.post(this.api + '/home/index/token')
              .then(res=>{
                localStorage.setItem('token',res.data.data)
                this.removePhoto()
              })
          }else{
            alert(res.data.msg)
          }
        })
      },
		},
    mounted(){
		  let _this = this
      this.$http.post(_this.api + '/home/User/get_user',{
        token: localStorage.getItem('token')
      })
        .then(res=>{
          if(res.data.code == 1){
            if(res.data.data[0].headimage){
              this.imgUrl = res.data.data[0].headimage.domain + res.data.data[0].headimage.image_url
            }else{
              this.imgUrl = '../../../static/img/static/user.png'
            }
          }else if(res.data.code == 3){
            this.$router.push('/')
            localStorage.removeItem('isLogin')
          }else{
            this.$router.push('/')
            localStorage.removeItem('isLogin')
          }
        })
        .catch(error=>{
          alert(error)
        })
    }
	}
</script>

<style>
.editphoto_head{
	width: 180px;
	height: 180px;
	border-radius: 50%;
	background-color:none;
	position:absolute ;top: 0;right: 0;left: 0;bottom: 0;
}
.editphoto_con{
	width: 180px;
	height: 180px;
	margin: 0 auto;
	margin-top: 25px;
	background-color: #dcdcdc;
	position: relative;
}
.editPhoto_txt{
	width: 740px;
	margin: 0 auto;
	text-align: left;
	line-height: 25px;
	margin-top: 20px;
}
.editphoto_upload{
	width: 180px;
	height:40px;
	border: 1px solid #dcdcdc;
	border-radius: 10px;
	margin: 0 auto;
	margin-top: 20px;
	position: relative;
	overflow: hidden;
	line-height: 40px;
	color: #333333;
}
.avatar-uploader{
	opacity: 0;
	position: absolute;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
