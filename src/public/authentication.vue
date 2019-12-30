<template>
  <div>
    <Head type="authentication" ></Head>
    <div style="height:10px;background-color:#008489;margin-top:80px;	transition-property:width;transition-duration:0.5s;transition-timing-function:linear;transition-delay:0s;" :style="{width:stepNum}"></div>
    <div v-if="isStep == 1" style="width:850px;margin:80px auto;text-align:left;">
      <div>
        <i style="font-size:50px;color:#FF7F24" class="iconfont icon-jinggao"></i>
      </div>
      <h1 style="margin:20px 0;">添加由政府签发的有效身份证件</h1>
      <p style="margin:30px 0;"></p>
      <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 请再添加一张照片<i class="el-icon-arrow-right"></i></el-button>
    </div>
    <div v-if="isStep == 2" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">您想如何添加身份证件照片？</h1>
      <p style="margin:30px 0;">您可以从移动设备或电脑里上传一张已有的照片。</p>
      <p style="margin:30px 0;"><b>您的身份证件信息永远不会透露给任何人</b></p>
      <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
      <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
    </div>
    <div v-if="isStep == 3" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">您想要添加哪种身份证件？</h1>
      <p style="margin:30px 0;">只能添加由政府颁发的有效身份证件。</p>
      <div style="line-height:40px;">
        <p style=""><b>签发国家/地区</b></p>
        <el-select v-model="cuntry" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <p><b>身份证证件类型:</b></p>
        <div style="margin-left:20px;">
          <p><el-radio v-model="radio" label="1">身份证</el-radio></p>
          <p><el-radio v-model="radio" label="2">护照</el-radio></p>
        </div>
        <p><b>您的身份证件信息永远不会透露给任何人。</b></p>
      </div>
      <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
      <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 请再添加一张照片<i class="el-icon-arrow-right"></i></el-button>
    </div>
    <div v-if="isStep == 4" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">上传您的身份证的照片</h1>
      <p style="margin:30px 0;">上传您的身份证（中国）的照片。 确保您的照片不会模糊不清，能够清楚地显示您的脸部。</p>
      <div style="display: flex;justify-content: flex-start">
        <div style="position: relative">
          <el-upload
            style="border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;"
            :action="api + '/home/Upload/upload/home/Upload/upload'"
            :data="data"
            :show-file-list="false"
            :on-change="uploadLoading"
            :on-success="firstHandleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:15px;">添加头像面照片</i>
          </el-upload>
          <div v-if="isFirst" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.2);display: flex;align-items: center;justify-content: center">
            <Loading></Loading>
          </div>
        </div>
        <div style="margin-left:100px;position: relative">
          <el-upload
           style="border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;"
            :action="api + '/home/Upload/upload/home/Upload/upload'"
           :data="data"
            :show-file-list="false"
           :on-change="uploadScecond"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:15px;">添加国徽照片</i>
          </el-upload>
          <div v-if="isSeccond" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.2);display: flex;align-items: center;justify-content: center">
            <Loading></Loading>
          </div>
        </div>
      </div>
      <div style="margin-top:50px;">
        <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;margin-top:50px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
    <div v-if="isStep == 5" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">上传您的护照的照片</h1>
      <p style="margin:30px 0;">上传您的护照（中国）的照片。 确保您的照片不会模糊不清，能够清楚地显示您的信息。</p>
      <div style="display: flex;justify-content: flex-start">
        <div style="position:relative">
          <el-upload
            style="border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;line-height: 160px;text-align: center;  color: #8c939d;"
            :action="api + '/home/Upload/upload/home/Upload/upload'"
            :data="data"
            :show-file-list="false"
            :on-change="uploadScecond"
            :on-success="huzhaoSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:15px;">添加头像面护照</i>
          </el-upload>
          <div v-if="isSeccond" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.2);display: flex;align-items: center;justify-content: center">
            <Loading></Loading>
          </div>
        </div>
      </div>
      <div style="margin-top:50px;">
        <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;margin-top:50px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
    <div v-if="isStep == 6" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">请上传一张手持{{sd}}的照片</h1>
      <p><b>请选择上传类型:</b></p>
      <div style="margin-left:20px;margin-top:20px;line-height: 30px;">
        <p ><el-radio v-model="photo" label="1"  >拍照上传</el-radio></p>
        <p  ><el-radio v-model="photo" label="2"  >上传本地图片</el-radio></p>
      </div>
      <div v-if="photo == 1">
         <div style="border:1px solid #000;padding:30px;width:500px;margin:20px auto;">
           <div style="position: relative;" >
             <video  v-show="!isPhoto"  id="video"  autoplay  poster= '../../static/img/static/photo.png' width="500px" height="400px;"></video>
             <canvas  style="display:none;margin-left:50px;" id="canvas" width="400px" height="400px;" ></canvas>
           </div>
           <div style="margin-top:30px;position:relative">
             <div id="newPhoto" style="position: absolute;left:20px;top:10px;font-size:12px;display: none">是否需要重新拍？</div>
             <div  id="refalse" style="border:1px solid #008489;width:100px;padding:10px 20px;cursor: pointer;display:none;text-align: center;margin:0 auto;border-radius: 5px;">重拍</div>
             <div id="picture" style="display:block;border:1px solid #008489;width:100px;padding:10px 20px;cursor: pointer;text-align: center;margin:0 auto;border-radius: 5px;">拍照</div>
           </div>
         </div>
      </div>
      <div v-if="photo == 2">
        <div style="display: flex;justify-content: flex-start;margin-top: 20px;">
          <div class="formFile">
            <form id="videoForm">
              <i style="font-size: 30px;" class="el-icon-plus"></i>
              <input type="file" class="upload"  @change="uploadPhoto" />
            </form>
          </div>
         <!-- <div>
            <el-upload
              style="border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;"
              action=""
              :data="data"
              :show-file-list="false"
              :on-change="uploadPhoto"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:15px;">添加照片</i>
            </el-upload>
          </div>-->
        </div>
      </div>
      <el-button @click="goBack(isStep)" id="close" type="primary" style="font-size:18px;margin-top:20px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
      <el-button @click="changeStep(isStep)" id="closel" type="primary" style="font-size:18px;margin-top:50px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
    </div>
    <div v-if="isStep == 7" style="width:850px;margin:80px auto;text-align:left;">
      <h1 style="margin:20px 0;">照片上传成功</h1>
      <p style="margin:30px 0;">我们将会在2-3个工作日内给您回复!</p>
      <p style="margin:30px 0;"><b>欢迎加入人人耍策划者联盟！</b></p>
      <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 完成<i class="el-icon-arrow-right"></i></el-button>
    </div>
    <div v-if="isWait" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.5);display: flex;justify-content: center;align-items: center">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
   import '../../static/css/warn/iconfont.css'
  import Head from './head'
   import Loading from './Loading'
    export default {
        name: "authentication",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            data:{
             token: localStorage.getItem('token')
            },
            stepNum: '10' + '%',
            isStep:1,
            options:[
              {label:'中国',value:'0'}
            ],
            cuntry:'',
            radio:"",
            imageUrl1:'',
            imageUrl:'',
            firstId:'',
            secendId:'',
            huzhaoId:'',
            photo:"",
            isPhoto:'',
            isFirst:false,
            isSeccond:false,
            srcData:'',
            isWait:false,
            active_id:'',
            sd:''
          }
      },
      components:{
          Head,
        Loading
      },
      watch:{
        photo:function(){
          if(this.photo == '1'){
            this.$nextTick(()=>{
              this.takePhoto()
            })

          }
        }
      },
      methods:{
          //上传进度
        uploadLoading(file,fileList){
          console.log(file)
          if(file.status == 'ready'){
            this.isFirst = true
          }else if(file.status == 'success'){
            this.isFirst = false
          }
        },
        uploadScecond(file,fileList){
          console.log(file)
          if(file.status == 'ready'){
            this.isSeccond = true
          }else if(file.status == 'success'){
            this.isSeccond = false
          }
        },
        changeStep(val){
          if(val == 1){
            this.stepNum = '30' + '%'
            this.isStep = 2
          }else if(val == 2){
            this.stepNum = '50' + '%'
            this.isStep = 3
          }else if(val == 3){
            if(!this.cuntry.length){
              this.$message({
                type: 'error',
                message: '请选择国家!'
              })
            }else if(!this.radio){
              this.$message({
                type: 'error',
                message: '您还没有选择类型'
              })
            }else if(this.radio == '1'){
              this.stepNum = '70' + '%'
              this.isStep = 4
            }else{
              this.stepNum = '70' + '%'
              this.isStep = 5
            }
          }else if(val == 4){
            this.checkSfz()
          }else if(val == 5){
            this.checkHz()
          }else if(val == 6){
            this.isWait = true
            this.$http.post(this.api + '/UploadB',{
              token: localStorage.getItem('token'),
              file: this.photo == 1? this.isPhoto: this.srcData,
              flag:1,
              iswater:1
            })
              .then(res=>{
                if(res.data.code == 1){
                 let imageId = res.data.data.image_id
                  this.sendPlayer(imageId)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.changeStep(val)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                  this.isWait = false
                }
              })
          }else if(val == 7){
            if(this.active_id){
              this.$router.push('/publishList')
            }else{
              this.$router.push('/')
            }
          }
        },
        sendPlayer(msg){
          this.$http.post(this.api + '/IdentifyCardPlanner',{
            token: localStorage.getItem('token'),
            issubmit:1,
            face_image:msg,
            flag:3
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isWait = false
                if(this.active_id){
                  this.sendTIan()
                }
                this.isStep = 7
                this.stepNum = '100' + '%'
                this.$message({
                  type:'success',
                  message:'提交成功！'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.sendPlayer(msg)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isWait = false
              }
            })
            .catch(error=>{
              this.isWait = false
            })
        },
        sendTIan(){
          this.$http.post(this.api + '/home/Activity/save_activity',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            complete: 1,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type: 'success',
                  message: '体验提交成功！'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.sendTIan()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        goBack(val){
          if(val == 5){
            this.isStep = 3
            this.stepNum = '70' + '%'
          }else if(val == 1){
            this.isStep = 'volunteer'
            this.stepNum = '5' + '%'
          }else{
            this.isStep -= 1
            this.stepNum = parseInt(this.stepNum) - 20 +'%'
          }
        },
        firstHandleAvatarSuccess(res,file){
          if(res.code == 1){
            this.imageUrl1 = res.data.domain + res.data.image_url
            this.firstId = res.data.image_id
          }else{
            alert('上传失败！请重新上传')
          }
        },
        handleAvatarSuccess(res, file) {
          if(res.code == 1){
            this.imageUrl = res.data.domain + res.data.image_url
            this.secendId = res.data.image_id
          }else{
            alert('上传失败！请重新上传')
          }
        },
        uploadPhoto(file){
          let _this = this
          console.log(file.target.files[0])
          var File = file.target.files[0]
          var reader = new FileReader();
          reader.readAsDataURL(File);
          reader.onload = function (e) {
            _this.srcData = e.target.result;
            _this.changeStep(6)
          }
        },
        huzhaoSuccess(res){
          if(res.code == 1){
            this.imageUrl = res.data.domain + res.data.image_url
            this.huzhaoId = res.data.image_id
          }else{
            alert('上传失败！请重新上传')
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png' || file.type === 'image/jpg';
          const isLt10M = file.size / 1024 / 1024 < 10;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
            this.isFirst = false
            this.isSeccond = false
          }
          if (!isLt10M) {
            this.$message.error('上传头像图片大小不能超过 10MB!');
            this.isFirst = false
            this.isSeccond = false
          }
          return isJPG && isLt10M;
        },
        checkSfz(){
          this.isWait = true
          this.$http.post(this.api + '/IdentifyCardPlanner',{
            token: localStorage.getItem('token'),
            idcard_z: this.firstId,
            idcard_f: this.secendId,
            flag:1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.sd = '身份证'
                this.stepNum = '80' + '%'
                this.isStep = 6

                this.isWait = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                      this.checkSfz()
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isWait = false
              }
            })
            .catch(error=>{
              this.isWait = false
            })
        },
        checkHz(){
          this.isWait = true
          this.$http.post(this.api + '/IdentifyCardPlanner',{
            token: localStorage.getItem('token'),
            passport: this.huzhaoId,
            flag:2
          })
            .then(res=>{
              if(res.data.code == 1){
                this.sd = '护照'
                this.stepNum = '80' + '%'
                this.isStep = 6

                this.isWait = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                      this.checkSfz()
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isWait = false
              }
            })
            .catch(error=>{
              this.isWait = false
            })
        },
        takePhoto(){
          let _this = this
          var mediaStreamTrack;
            navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
          if (navigator.getUserMedia) {
              navigator.getUserMedia({ audio: true, video: { width: 500, height: 400 } },
                function(stream) {
                  mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                  video.srcObject = stream
                  video.play();
                },
                function(err) {
                  alert("The following error occurred: " + err.name)
                }
              );
            } else {
              alert('getUserMedia not supported')
            }
            document.getElementById("close").addEventListener("click", function () {
            mediaStreamTrack && mediaStreamTrack.stop();
            _this.photo = ''
          });
            document.getElementById("closel").addEventListener("click", function () {
            mediaStreamTrack && mediaStreamTrack.stop();
            _this.photo = ''
          });
          document.getElementById("picture").addEventListener("click", function () {
            var canvas = document.getElementById("canvas")
            canvas.style.display = 'block'
            var context = document.getElementById("canvas").getContext("2d")
            context.drawImage(video, 0, 0, 500, 400);
            _this.isPhoto = canvas.toDataURL("image/png");
             var newPhoto = document.getElementById('newPhoto')
            newPhoto.style.display = 'block'
             var refalse = document.getElementById('refalse')
            refalse.style.display = 'block'
            var picture = document.getElementById('picture')
            picture.style.display = 'none'
          });
          document.getElementById('refalse').addEventListener('click',function(){
            _this.isPhoto = ''
            var refalse = document.getElementById('refalse')
            var canvas = document.getElementById("canvas")
            var newPhoto = document.getElementById('newPhoto')
            var picture = document.getElementById('picture')
            picture.style.display = 'block'
            newPhoto.style.display = 'none'
            refalse.style.display = 'none'
            canvas.style.display = 'none'
          })
        },
      },
      mounted(){

      },
      created(){
          this.active_id = this.$route.query.active_id
      }
    }
</script>

<style scoped>
.avatar{
  width:260px;
  height:160px;
}
.formFile{
  position:relative;
  width:260px;
  height:160px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.upload{
  position: absolute;
  left: 0;
  top: 0;
  right:0;
  bottom:0;
  opacity: 0;
}
</style>
