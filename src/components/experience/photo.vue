<template>
	<div class="exp_con">
		<p class="title">为体验添加照片</p>
		<p class="language_txt">这些照片将会显示在体验页面的顶部，因此请尽量上传高品质的体验照片，给用户留下良好的第一印象。</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div>
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 展现大家在体验过程中如何投入地参与活动</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 展现体验环境与内容的照片，以及真实的活动抓拍</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 确保照片中光线良好。 自然光为最佳</p>
				</div>
				<div>
					<p class="fontweight">不建议</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 包括自拍或摆拍照</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 用了滤镜（比如黑白照）或加了文字和贴图的照片</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 上传含毒品、裸体、酒精、儿童元素的照片</p>
				</div>
			</div>
			<div class="advice_sample">
				<p class="fontweight">示例：</p>
				<p style="color: #008489;" class="fontweight"><span style="cursor: pointer;" @click="delSample"><i class="el-icon-arrow-left"></i></span> {{sampleIndex+1}}/{{sampleList.length-1}} <span style="cursor: pointer;" @click="addSample"><i class="el-icon-arrow-right"></i></span></p>
			</div>
			<div class="sample_con">
				<div :style="{width:'2000px',marginLeft:leftDate+'px',transition: 'all .3s linear'}">
					<div class="sample_img" v-for="item in sampleList" :style="{backgroundImage:'url('+item.img+')',backgroundSize:'100% 100%'}">
						<p v-if="item.type=='img'" style="color: white;margin-top: 130px;padding: 0 10px 0 10px;" class="fontweight">{{item.title}}</p>
					</div>
				</div>
			</div>
		</div>
		<p class="fontweight main_language">封面照片</p>
		<p style="margin-top: 20px;">请为体验挑选一张最具代表性的照片，这会是参与者浏览体验时看到的第一张照片</p>
		<div style="margin-top:30px;">
      <div style="margin-top: 30px;display: flex;justify-content: flex-start">
        <div class="formFile">
          <i style="font-size: 30px;" class="el-icon-plus"></i>
          <input type="file" class="upload"  @change="seletIA"  ref="fileA" />
        </div>
        <div style="margin-left:30px;">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
        </div>
      </div>
    </div>
    <p class="fontweight main_language">活动内容照片或视频</p>
    <p style="margin-top: 20px;">请为体验挑选活动照片或视频，这会是参与者浏览体验时看到的照片或视频</p>
    <div style="margin-top: 30px;">
      <div class="formFile">
        <i style="font-size: 30px;" class="el-icon-plus"></i>
        <input type="file" class="upload"  @change="seletI"  ref="file" multiple />
      </div>
    </div>
    <p v-if="fileAllList.length" style="font-size:12px;color:#008489;margin:10px 0;">（小贴士：可以对您的照片进行排序再保存）</p>
    <div v-if="fileAllList.length" style="display: flex;flex-wrap: wrap;">
      <div  v-for="(item,index) in fileAllList" :key="index" style="margin:20px 0;"  v-dragging="{ item: item, list: fileAllList, group: 'item' }">
        <div v-if="item.type == 'jpg'||item.type=='jpeg'||item.type=='png'"  style="width:150px;height:150px;background-size:100% 100%;margin-right:20px;" :style="{backgroundImage: 'url('+item.url+')'}">
          <div style="width:150px;height:150px;position:relative;background-color:rgba(0,0,0,.3);">
            <div style="position: absolute;top:50%;left:50%;width:50px;height:20px;display: flex;justify-content: flex-start;margin-left:-25px;margin-top:-10px;">
              <i @click="uploadLook(item,index)" style="font-size: 20px;color:white;cursor: pointer" class="el-icon-zoom-in"></i><i @click="uploadDelet(item,index)" style="font-size: 20px;color:white;margin-left:10px;cursor: pointer" class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div v-if="item.type =='mp4'||item.type=='rmvb'||item.type=='avi'||item.type=='wmv'||item.type=='rm'||item.type=='3GP'"  style="width:150px;margin-right:20px;position: relative">
          <div @click="deletVideo(item,index)" style="position:absolute;right:60px;top:50px;width:20px;height:20px;cursor: pointer;z-index:1">
            <i @click="uploadDelet(item,index)" class="el-icon-delete" style="color:white;font-size:20px"></i>
          </div>
          <video :src="item.url" width="150px" height="150px" controls="controls"></video>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogUrl" alt="">
    </el-dialog>
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
		</div>
    <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:990;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
      <div>
        <Loading></Loading>
        <p>上传中</p>
      </div>
    </div>
	</div>
</template>

<script>
  import Loading from '../../public/Loading'
  import Vue from "vue"
  import EXIF from "exif-js"
  Vue.use(EXIF)
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
        upData:{
			    token: localStorage.getItem('token')
        },
        imageUrl:'',
        imageId:'',
        image:[],
        sampleList: [
          {img: "./static/img/home/1.png", title: "和铂金唱片制作人一起写歌", type: 'img'},
          {img: "./static/img/home/2.png", title: "巴黎大厨家里的私人晚餐", type: 'img'},
          {img: "./static/img/home/3.png", title: "和搜救犬一起徒步游览润宁峡谷", type: 'img'},
          {img: "./static/img/home/2.png", title: "巴黎大厨家里的私人晚餐", type: 'img'},
          {img: "./static/img/home/3.png", title: "和搜救犬一起徒步游览润宁峡谷", type: 'img'},
          {img: "./static/img/home/2.png", title: "巴黎大厨家里的私人晚餐", type: 'img'},
          {img: "./static/img/home/3.png", title: "和搜救犬一起徒步游览润宁峡谷", type: 'img'},
        ],
        sampleIndex: 0,
        leftDate: 0,
        dialogUrl: '',
        dialogVisible:false,
        uploadList:[],
        fileAllList:[],
        upLoadIndex:1,
        complete:'',
        param:'',
        isLoading:false,
        uploadImg:'',
        index:0,
        active_id:''
      }
		},
    components:{
      Loading
    },
		methods:{
			addSample(){
          if(this.sampleIndex<this.sampleList.length-2){
            this.sampleIndex++;
            this.leftDate=this.leftDate-140;
          }
			},
			delSample(){
          if(this.sampleIndex>0){
            this.sampleIndex--
            this.leftDate=this.leftDate+140;
          }
			},
			changeRouter(){
			  if(!this.imageId){
			    this.$message({type:'info',message:'请上传封面照片'})
        }else if(!this.image.length){
			    this.$message({type:'info',message:'请上传内容照片或者视频'})
        }else{
			    if(this.active_id){
			      this.$http.post(this.api + '/home/Activity/save_activity',{
			        token: localStorage.getItem('token'),
              activity_id:this.active_id,
              cover_image: this.imageId,
              image: this.image,
              step: 8
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(!this.complete){
                    this.$emit('changeRouter',{id:10,router:"Feeladdress",information: this.active_id,complete:this.complete})
                  }else{
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })
                  }
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              cover_image: this.imageId,
              image: this.image,
              step: 8
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId',res.data.data)
                  this.$emit('changeRouter',{id:10,router:"Feeladdress",information: res.data.data})
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }
        }
			},
      look(item,index){
			  this.dialogVisible = true
        this.dialogUrl = item.url
      },
      delet(item,index){
        this.uploadList.splice(index,1)
      },
      deletVideo(item,index){
        this.uploadList.splice(index,1)
      },
      uploadLook(item,index){
        this.dialogVisible = true
        this.dialogUrl = item.url
      },
      uploadDelet(item,index){
        this.fileAllList.splice(index,1)
        for(let i = 0;i< this.image.length;i++){
          if(item.image_id == this.image[i].image_id){
            this.image.splice(i,1)
          }
        }

      },
      async seletIA(event){
        let _this = this
        _this.uploadImg = 1
        _this.isLoading = true
        await  _this.xunhuan(event)

      },
      async seletI(event){
			  let _this = this
        _this.uploadImg = 2
        _this.isLoading = true
        await  _this.xunhuan(event)

      },
      async xunhuan(event){
        var param = new FormData()
        if(event.target.files.length){
          if(event.target.files.length >10){
            this.$message({
              type: 'info',
              message: '最多一次上传10张!'
            })
            this.isLoading = false
            this.$refs.file.value = ''
            return false
          }else{
            this.panduan(event.target.files,param)
          }
        }
      },
      panduan(fileAll,param){
        var Orientation = null;
        let _this = this
        if(_this.index ==  fileAll.length ){
          _this.index = 0
          _this.param = param
          _this.upload()
          return;
        }else{
          var file = fileAll[this.index]
          const isJap = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
          const isVedio = file.type === 'video/mp4'
          if (!isJap && !isVedio) {
            alert('请上传图片格式IPEG/PNG/JPG或者视频格式MP4')
            _this.isLoading = false
            return false;
          }else if(isVedio) {
            var url = URL.createObjectURL(file)
            var audioElement = new Audio(url);
            var duration;
            audioElement.addEventListener("loadedmetadata", function () {
              duration = audioElement.duration;
              if (duration > 10) {
                _this.$message({
                  type: 'error',
                  message: '上传视频不能大于10s'
                })
                _this.isLoading = false
                return false
              } else {
                param.append('file[]', file)
                _this.index++;
                _this.panduan(fileAll,param)
              }1
            })
          } else {
            EXIF.getData(file, function () {
              EXIF.getAllTags(this);
              Orientation = EXIF.getTag(this, 'Orientation');
            });
            var oReader = new FileReader();
            oReader.onload = function (e) {

              var image = new Image();
              image.src = e.target.result;
              image.onload = function () {

                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                if (Orientation != "" && Orientation != 1) {

                  switch (Orientation) {
                    case 6://需要顺时针（向左）90度旋转
//                      alert('需要顺时针（向左）90度旋转');
                      _this.rotateImg(this, 'left', canvas);
                      break;
                    case 8://需要逆时针（向右）90度旋转
//                      alert('需要顺时针（向右）90度旋转');
                      _this.rotateImg(this, 'right', canvas);
                      break;
                    case 3://需要180度旋转
//                      alert('需要180度旋转');
                      /* /!*this.rotateImg(this,'right',canvas);//转两次*/
                      /*    this.rotateImg(this,'right',canvas);*!/*/
                      _this.rotateImg(this, 'turntwo', canvas);
                      break;
                  }
                  base64 = canvas.toDataURL("image/jpeg", 0.8);
                  param.append('file[]', base64)
                }else{
                  base64 = canvas.toDataURL("image/jpeg", 0.8);
                  param.append('file[]', base64)
                }
                _this.index++;
                _this.panduan(fileAll,param)
              }
            };
            oReader.readAsDataURL(file)
          }
        }
      },
      rotateImg(img, direction,canvas){
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');
        var step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      upload(){
        this.param.append('token', localStorage.getItem('token'))
        this.$http.post(this.api + '/home/Upload/upload_many', this.param)
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
          /*    this.fileAllList.push({url:data.domain + data.image_url,image_id:data.image_id,type:data.extension})*/
              if(this.uploadImg == 1){
                for(let i =0;i<data.length; i++){
                  this.imageUrl = data[i].domain + data[i].image_url
                  this.imageId = data[i].image_id
                }
                this.$message({
                  type: 'success',
                  message: '上传成功！'
                })
                this.$refs.fileA.value = ''
              }else{
                for(let i =0;i<data.length; i++){
                  this.fileAllList.push({url:data[i].domain + data[i].image_url,image_id:data[i].image_id,type:data[i].extension})
                  this.image.push({image_id:data[i].image_id})
                }
                this.$refs.file.value = ''
              }
              this.isLoading = false
            }else if(res.data.code == 3){
              this.upload()
            }else if(res.data.code == 0) {
              alert(res.data.msg)
              this.isLoading = false
              this.$refs.file.value = ''
              if (this.uploadImg == 1) {
                this.$refs.fileA.value = ''
              } else {
                this.$refs.file.value = ''
              }
            }else{
              if(this.uploadImg == 1){
                this.$refs.fileA.value = ''
              }else{
                this.$refs.file.value = ''
              }
              this.isLoading = false
            }
          })
          .catch(error=>{
            if(this.uploadImg == 1){
              this.$refs.fileA.value = ''
            }else{
              this.$refs.file.value = ''
            }
            this.isLoading = false
          })
      },
      getActives(){
        this.$http.post(this.api + '/ActivityE',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          visit: 0
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              for(let i = 0;i<data.image.length;i++){
                this.fileAllList.push({url:data.image[i].domain + data.image[i].image_url,image_id:data.image[i].image_id,type:data.image[i].extension})
                this.image.push({image_id:data.image[i].image_id})
              }
              if(data.cover_image){
                this.imageUrl = data.cover.domain + data.cover.themb_url
                this.imageId = data.cover.image_id
              }
            }else if(res.data.code == 3){
              this.getActives()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
		},
		created(){
      window.scroll(0,0)
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
		},
    mounted() {
		  let _this = this
      this.$dragging.$on('dragend', (val) => {
        let a = []
        for(let i = 0; i< _this.fileAllList.length; i++){
          a.push({image_id:_this.fileAllList[i].image_id})
        }
        _this.image = a
      })
      if(_this.active_id){
       _this.getActives()
      }

    }
  }
</script>

<style>
.sample_img{
	width: 130px;
	height: 180px;
	float: left;
	margin-left: 10px;
}
.sample_img:nth-child(1){
	margin-left: 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
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

.formFile{
  position:relative;
  width:178px;
  height:178px;
  border: 1px dashed #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.upload{
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
  right:0;
  bottom:0;
  opacity: 0;
  width:178px;
  height: 178px;
}
</style>
