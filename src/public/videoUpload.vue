<template>
    <div>
      <div style="margin-top: 30px;">
        <div class="formFile">
          <i style="font-size: 30px;" class="el-icon-plus"></i>
          <input type="file" class="upload"  @change="seletI"  ref="file" multiple />
        </div>
      </div>
      <p  style="font-size:12px;color:#008489;margin:10px 0;">（小贴士：可以对您的照片进行排序再保存）</p>
      <div  style="display: flex;flex-wrap: wrap;">
        <div  v-for="(item,index) in fileAllList" :key="index" style="margin:20px 0;"  v-dragging="{ item: item, list: fileAllList, group: 'item' }">
          <div  style="width:150px;height:150px;background-size:auto 100%;margin-right:20px;" :style="{backgroundImage: 'url('+item.url+')'}">
            <div style="width:150px;height:150px;position:relative;background-color:rgba(0,0,0,.3);">
              <div style="position: absolute;top:50%;left:50%;width:50px;height:20px;display: flex;justify-content: flex-start;margin-left:-25px;margin-top:-10px;">
                <i @click="uploadLook(item,index)" style="font-size: 20px;color:white;cursor: pointer" class="el-icon-zoom-in"></i><i @click="uploadDelet(item,index)" style="font-size: 20px;color:white;margin-left:10px;cursor: pointer" class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from "vue"
  import EXIF from "exif-js"
  Vue.use(EXIF)
    export default {
        name: "videoUpload",
      data(){
          return{
            api: 'https://www.allptp.top/allptp',
            param:'',
            imageList:[],
            fileAllList:[],
            index:0,
            token: '9556d15c8fa0c8f5248a02d603cd3956'
          }
      },
      methods:{
        async seletI(event){
          let _this = this
          _this.isLoading = true
          _this.xunhuan(event)


        },
        async xunhuan(event){
          console.log(1)
          let _this = this
          var param = new FormData()
          if(event.target.files.length){
            this.panduan(event.target.files,param)
          }
        },
        panduan(fileAll,param){
          var Orientation = null;
          let _this = this
          if(fileAll.length>0&& this.index ==  fileAll.length ){
            this.index = 0
            this.param = param
            this.upload()
            return;
          }else{
            var file = fileAll[this.index]
            const isJap = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            const isVedio = file.type === 'video/mp4'
            if (!isJap && !isVedio) {
              alert('请上传图片格式IPEG/PNG/JPG或者视频格式mp4')
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
                }
              })
            }else {
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
                console.log(res)
                let data = res.data.data
                console.log(res)
                  for(let i =0;i< data.length; i++){
                    this.fileAllList.push({url:data[i].domain + data[i].image_url,image_id:data[i].image_id})
                  }
                  this.$refs.file.value = ''
              }else if(res.data.code == 3){
                console.log(3)
                this.token = localStorage.getItem('token')
                this.upload()
               /* this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.upload()
                  })*/
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
      },
      mounted(){

      }
    }
</script>

<style scoped>
  .formFile{
    position:relative;
    width:178px;
    height:178px;
    border: 1px solid #eee;
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
