<template>
	<div class="travelfunds">
		<Head type="edit" v-on:reload="reload" v-on:getVal="getVal"  :content="editSearch"  v-on:search="searchHome"></Head>
		<div class="funds_con">
      <img src="../../static/img/static/tran/tranvel_1.png" width="100%" height="33%">
      <img src="../../static/img/static/tran/tranvel_2.png" width="100%" height="33%">
      <img src="../../static/img/static/tran/tranvel_3.png" width="100%" height="33%">
			<div class="funds_container">
				<p class="funds_title">分享你对旅行的热爱</p>
				<p class="funds_txt">您可以通过微信、微博、邮箱等方式，把你的专属链接分享给朋友</p>
			</div>
		</div>
		<div style="width: 1080px;margin: 20px auto;display: flex;justify-content: space-between">
			<div style="width:600px;text-align: left">
        <h2>分享方式</h2>
        <div style="display: flex;justify-content: space-between;margin-top:30px;">
          <div v-for="(item,index) in shreList" style="position: relative">
            <img :src="item.img" style="width:50px;height:50px;margin-left:5px;">
            <div v-if="index <3" style="display: flex;justify-content: flex-start;margin-top:15px;">
              <div @click="chooseShare(item,index)" style="width:15px;height:15px;border-radius: 50%;border:1px solid #008489;display: flex;justify-content: center;align-items: center;margin-top:3px;cursor: pointer">
                <div style="width:10px;height:10px;border-radius: 50%;" :style="{backgroundColor:clickIndex == index? '#008489':'#fff'}"></div>
              </div>
              <div style="margin-left:10px;">
                {{item.name}}
              </div>
            </div>
            <!--<div v-if="index == 3" style="margin-top:12px;padding:2px 5px; background-color: #F0F0F0">
              {{item.name}}
            </div>-->
            <div v-if="index == 3">
              <button   style="position: absolute;width: 70px;bottom:0; left:-5px;border:none;margin-top:12px;padding:2px 5px; background-color: #F0F0F0;cursor: pointer" v-clipboard:copy="asd" v-clipboard:success="onCopy" v-clipboard:error="onError">
                复制链接
              </button>
            </div>
          </div>
        </div>
        <div>
          <div v-if="clickIndex == 0" style="display: flex;justify-content: flex-start;margin-top:50px;">
            <div style="width: 200px;">
              <p class='funds_sharetxt'>第1步 微信扫描二维码</p>
              <img :src="WXurl" width="200px" style="margin-top:10px;" >
            </div>
            <div style="width: 200px;margin-left:50px;">
              <p class='funds_sharetxt'>第2步 点击···分享页面</p>
              <p>
                <img alt="" style="width: 130px;margin-top: 10px;" src="https://z1.muscache.cn/airbnb/static/referrals/wechat_share/step-image-sm-a1929a67bf7c1e4b31c1b77549702c35.png"/>
              </p>
            </div>
          </div>
          <div v-if="clickIndex == 1" style="margin-top:50px;">
            <!--<div style="margin: 20px 0;">
              <p style="margin: 20px 0;">上传图片作为微博配图(可选)</p>
              <el-upload
                class="avatar-uploader"
                :action="api + '/home/Upload/upload'"
                :data="updata"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>-->
            <!--<p style="margin: 20px 0;">上传一张图片作为微博配图(可选)</p>
            <div style="margin-top: 30px;display: flex;justify-content: flex-start">
              <div class="formFile">
                <i style="font-size: 30px;" class="el-icon-plus"></i>
                <input type="file" class="upload"  @change="seletI"  ref="file" />
              </div>
              <div style="margin-left:30px;">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
              </div>
            </div>-->
            <p style="margin: 20px 0;">说说你想分享的内容：</p>
            <el-input type="textarea" v-model="shareContent" :autosize="{minRows:5}" placeholder="说说你要分享的内容"></el-input>
            <el-button type="primary" @click="share(1)" style="margin-top:20px">分享</el-button>
          </div>
          <div v-if="clickIndex == 2" style="margin-top:50px;">
            <div style="display: flex;justify-content: flex-start;margin:20px 0;">
              <p style="width:100px;line-height:40px;">收件人：</p><el-input v-model="reacetWho" placeholder=""></el-input>
            </div>
            <div style="display: flex;justify-content: flex-start;margin:20px 0;">
              <p style="width:100px;line-height:40px;">邮件主题：</p><el-input v-model="emailCenter" placeholder=""></el-input>
            </div>
            <div style="display: flex;justify-content: flex-start;margin:20px 0;">
              <p style="width:100px;line-height:40px;">邮件内容：</p>
              <el-input type="textarea" v-model="shareContent" :autosize="{minRows:5}" placeholder="说说你要分享的内容" ></el-input>
            </div>
            <el-button type="primary" @click="share" style="margin-top:20px">分享</el-button>
<!--            <a href="mailto:1464153279@qq.com?&Subject=Hello&Body=你好">给我发邮件</a>-->
          </div>
        </div>
			</div>
			<div style="width:300px;margin-left:40px;padding:20px;border: 1px solid #B9B9B9;text-align: left;margin-top:20px;">
        <h2>简单入门</h2>
        <div class="List">
          <p>  当任何用户通过您的分享链接注册成功，则该用户会成为您的亲密好友。</p>
          <p>该亲密好友只要在我们平台上预定了任何体验活动，您不但可以得到50元的基金而且还可以得到平台对该体验活动收取的10%服务费中的20%提成。</p>
          <p>该基金必须在您的亲密好友参加过他所预定的活动后，这些基金才会出现在您账户可用余额上，该活动未结束前这笔基金为不可用余额。</p>
          <p>该余额可以用于提现和在本平台上消费使用。</p>
        </div>
        <p @click="toYUedu" style="color:#008489;width:65px;border-bottom: 1px solid #B9B9B9;padding: 10px 0;font-weight: bold">阅读条款</p>
        <p style="color:#000;margin-top:20px;">了解如何通过邀请好友加入allptp赚取旅行基金</p>
			</div>
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
  import Loading from '../public/Loading'
	import Head from "../public/head.vue"
  import Vue from "vue"
  import EXIF from "exif-js"
  Vue.use(EXIF)
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
        updata:{
			    token: localStorage.getItem('token')
        },
				imgUrl:"",
				interInvite:"",
				emailInvite:"",
        WXurl:'',
        shreList:[
          {img:'../../static/img/static/tran/weixin.png',name:'微信'},
          {img:'../../static/img/static/tran/weibo.png',name:'微博'},
          {img:'../../static/img/static/tran/youx.png',name:'邮箱'},
          {img:'../../static/img/static/tran/copy.png',name:'复制连接'},
        ],
        clickIndex:0,
        shareContent:'',
        user:'',
        cover_image:[],
        YXnumber:'',
        imageUrl:"",
        editSearch:'搜索',
        asd:'',
        radio:'',
        reacetWho:'',
        emailCenter:'',
        isLoading:false,
        param:'',
        index:0
			};
		},
		components:{
			Head,
      Loading
		},
    methods:{
		  getImg(){
        if(localStorage.getItem('userImg')){
          this.imgUrl = localStorage.getItem('userImg')
        }else{
          this.imgUrl = '../../static/img/static/user.png'
        }
      },
      getEWM(){
		    this.$http.post(this.api + '/home/Upload/getqrcode',{
		      token: localStorage.getItem('token'),
          url: this.asd
        })
          .then(res=>{
           if(res.data.code == 1){
             this.WXurl = res.data.data.src
           }
          })
      },
      chooseShare(item,index){
		    if(this.clickIndex != index){
		      this.clickIndex = index
        }
      },
      share(val){
        if(val == 1){
          var p = {
            //将页面地址转成短域名， 并显示在内容文字后面。(可选， 允许为空)
            url: this.asd+'?'+'userId' +'='+this.user.user_id ,
            //分享时所示的文字内容， 为空则自动抓取分享页面的title值(可选， 允许为空)
            title: this.shareContent,
            //自定义图片地址， 作为微博配图(可选， 允许为空)
            pic: this.imageUrl,
            //语言设置(zh_cn | zh_tw)(可选)
            language: 'zh_cn'
          };

          var s = [];
          for(var i in p) {
              s.push(i + '=' + encodeURIComponent(p[i] || ''));
          }
          var url = "http://service.weibo.com/share/share.php?" + s.join('&');
          window.open(url);
        }else{
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
          if(!reg.test(this.reacetWho)){
            this.$message({type:'info',message: '请输入正确邮箱'})
          }else{
            this.$http.post(this.api + '/EmailShare',{
              token: localStorage.getItem('token'),
              toemail: this.reacetWho,
              title: this.emailCenter,
              content: this.shareContent,
              url: this.asd
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message: '分享成功'
                  })
                  this.reacetWho = ''
                  this.emailCenter = ''
                  this.shareContent = ''
                }else if(res.data.code == 3){
                  this.share(val)
                }else{
                  alert(res.data.msg)
                }
              })
          }
        }
      },
      reload(res){
        console.log(res)
        this.user = res.data.data[0]
        this.asd =location.host + '/share?userId='+res.data.data[0].user_id
        this.getEWM()
      },
      handleAvatarSuccess(res, file) {
		    console.log(res)
        this.imageUrl = res.data.domain + res.data.image_url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type ==='jpg'||'jpeg'||'png';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      searchHome(){
        this.$router.push({
          name: 'homeSearch',
          query:{
            key: this.content,
            type:0
          }
      })
      },
      getVal(msg){
        this.content = msg
      },
      toYUedu(){
		    this.$router.push('/policy')
      },
      onCopy () {
        this.$message({
          message: `复制成功！`,
          type: 'success'
        });
      },
      onError () {
        this.$message({
          message: `复制失败！`,
          type: 'error'
        });
      },
      async seletI(event){
        this.isLoading = true
        await  this.xunhuan(event)

      },
      async xunhuan(event){
        var param = new FormData()
        if(event.target.files.length){
          if(event.target.files.length > 10){
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
          if (!isJap) {
            alert('请上传图片格式IPEG/PNG/JPG')
            _this.isLoading = false
            return false;
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
              for(let i =0;i<data.length; i++){
                this.imageUrl = data[i].domain + data[i].image_url
              }
              this.$refs.file.value = ''
              this.isLoading = false
            }else if(res.data.code == 3){
              this.upload()
            }else if(res.data.code == 0){
              alert(res.data.msg)
              this.isLoading = false
              this.$refs.file.value = ''
            }
          })
          .catch(error=>{
            this.$refs.file.value = ''
            this.isLoading = false
          })
      },
    },
    mounted() {
		  this.getImg()
  
    },
  }
</script>

<style>
.travelfunds{
	padding-bottom: 80px;
}
.funds_con{
	margin-top: 82px;
	height: 480px;
	border-top: 1px solid white;
  font-size: 0;
  position: relative;
}
.funds_container{
	text-align: center;
  position: absolute;
  color:#fff;
  z-index: 1;
  top:180px;
  left:30%;
}

.funds_headbg>div{
	width: 110px;
	height: 110px;
	margin-left: 5px;
	margin-top: 5px;
	border-radius: 50%;
}
.funds_title{
	margin-top: 20px;
	font-size: 32px;
	color: white;
}
.funds_txt{
	font-size: 18px;
	color: white;
	width: 700px;
	margin: 0 auto;
	margin-top: 20px;
}
.funds_txt span{
	border-bottom: 2px solid white;
	cursor: pointer;
}

.wechat_share>div{
	width: 420px;
	margin: 0 auto;
}

.friend_share>div{
	width: 420px;
	margin: 0 auto;
}
  .List{
    line-height: 30px;
    font-weight: bold;
    margin: 10px 0;
    text-indent: 2rem;
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
