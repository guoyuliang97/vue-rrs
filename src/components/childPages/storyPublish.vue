<template>
    <div>
      <Head type="storyPublish"></Head>
      <div style="width:700px;text-align:left;margin: 130px auto;">
        <div style="margin:20px 0"><h3>创建我的故事</h3></div>
        <el-form ref="form"  label-width="80px">
          <el-form-item label="故事标题">
            <el-input type="text" v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="故事地区">
            <div v-show="local" style="display: flex;justify-content: flex-start">
              <el-input type="text" v-model="local"></el-input>
              <el-button @click="remakeLocal" style="margin-left:10px;">修改</el-button>
            </div>
            <City v-show="!local" type="1"  v-on:selectXian="selectXian" v-on:checkXian="checkXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
          </el-form-item>
          <el-form-item label="故事地点">
            <el-input type="text" v-model="address" style="width:215px"></el-input>
          </el-form-item>
          <el-form-item label="故事类型">
            <el-cascader :props="props" change-on-select :options="options"  v-model="region" filterable clearable ></el-cascader>
          </el-form-item>
          <el-form-item label="故事照片">
            <div>
              <div class="formFile">
                <i style="font-size: 30px;" class="el-icon-plus"></i>
                <input type="file" class="upload"  @change="seletI"  ref="file" multiple />
              </div>
            </div>
            <div v-if="fileAllList.length" style="display: flex;flex-wrap: wrap;">
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
          </el-form-item>
          <el-form-item v-show="imgList.length" label="已传图片">
            <div style="display: flex;flex-wrap:wrap;">
              <div v-for="(item,index) in imgList" @mouseover="choosePhoto(item,index)" @mouseleave="leavePhoto(item,index)" style="width:150px;height:150px;position: relative;margin:0 20px 20px 0 ">
                <img :src="item.imgUrl" style="width:100%;height:100%;border-radius: 5px">
                <div v-show="clickIndex == index" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.5);z-index:999;display: flex;justify-content: center;align-items: center">
                  <i @click="lookImg(item,index)" style="color:#fff;font-size: 20px;" class="el-icon-zoom-in"></i><i @click="deleteImg(item,index)" style="color:#fff;font-size: 20px;margin-left:10px;" class="el-icon-delete"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="故事内容">
            <el-input type="textarea" style="text-indent: 2rem" v-model="content" :autosize="{minRows:10}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" plain>{{storyId?'立即修改':'立即创建'}}</el-button>
            <el-button type="primary" @click="onRest" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:1080px;margin: 0 auto">
        <Foot></Foot>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogUrl" alt="">
      </el-dialog>
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
  import Head from "../../public/head.vue"
  import Foot from "../../public/foot.vue"
  import City from '../../public/city.vue'
  import Vue from "vue"
  import EXIF from "exif-js"
  Vue.use(EXIF)
  export default {
        name: "storyPublish",
      components:{
          Head,
        Foot,
        City,
        Loading
      },
      data() {
        return {
          country:'',
          province:'',
          city:'',
          xian:'',
          title: '',
          content: '',
          address: '',
          region:[],
          cover_image:[],
          dialogImageUrl: '',
          dialogVisible: false,
          dialogUrl:'',
          api:this.GLOBAL.baseURL,
          options:[],
          props: {
            value: 'kind_id',
            label: 'kind_name',
          },
          storyId:'',
          local:'',
          imgList:[],
          clickIndex:-1,
          xianList:[],
          fileAllList:[],
          isLoading:false,
          param:'',
          index:0
        }
      },
      methods: {
        async seletI(event){
          this.uploadImg = 2
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
                    this.fileAllList.push({url:data[i].domain + data[i].image_url})
                    this.cover_image.push({image_id:data[i].image_id})
                  }
                  this.$refs.file.value = ''
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.upload()
                  })
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
        uploadDelet(item,index){
          let c = []
          this.fileAllList.splice(index,1)
          for(let i = 0;i<  this.cover_image.length;i++){
            c.push( this.cover_image[i].image_id)
          }
          let b = c.indexOf(item.image_Id)
          this.cover_image.splice(b,1)
        },
        uploadLook(item,index){
          this.dialogVisible = true
          this.dialogUrl = item.url
        },
        remakeLocal(){
          this.local = ''
          this.country = ''
          this.province = ''
          this.city= ''
          this.xian= ''
        },
        deleteImg(item,index){
          this.imgList.splice(index,1)
        },
        lookImg(item,index){
          this.dialogImageUrl = item.imgUrl;
          this.dialogVisible = true;
        },
        leavePhoto(item,index){
          this.clickIndex = -1
        },
        choosePhoto(item,index){
          if(this.clickIndex != index){
            this.clickIndex = index
          }
        },
        onSubmit(){
          if(!this.title){
            this.$message({type:'info',message:'请填写标题'})
          }else if(!this.content){
            this.$message({type:'info',message:'请填写故事内容'})
          }else if(!this.cover_image.length&&!this.imgList.length){
            this.$message({
              type:'info',
              message: '请上传照片'
            })
          }else if(this.xianList.length){
            if(!this.xian[1]){
              this.$message({
                type: 'info',
                message: '请填写故事区域完整'
              })
            }else{
              if(this.storyId){
                if(this.imgList.length){
                  for(let i =0;i<this.imgList.length;i++){
                    this.cover_image.push({image_id:this.imgList[i].image_id})
                  }
                }
                this.remakeStory()
              }else{
                this.createStory()
              }
            }
          }else{
            if(!this.city[1]){
              this.$message({
                type: 'info',
                message: '请填写故事区域完整'
              })
            }else{
              if(this.storyId){
                if(this.imgList.length){
                  for(let i =0;i<this.imgList.length;i++){
                    this.cover_image.push({image_id:this.imgList[i].image_id})
                  }
                }
                this.remakeStory()
              }else{
                this.createStory()
              }
            }
          }
        },
        remakeStory(){
          this.$http.post(this.api + '/home/Story/save_story',{
            token:localStorage.getItem('token'),
            title: this.title,
            content: this.content,
            country: this.country[1],
            province: this.province[1],
            city: this.city[1],
            region:this.xian[1],
            country_id:this.country[0],
            province_id:this.province[0],
            city_id:this.city[0],
            region_id:this.xian[0],
            kind_id: this.region[this.region.length-1],
            image:this.cover_image,
            cover_image: this.cover_image[0].image_id,
            address:this.address,
            story_id:this.storyId
          }).then(res=>{
            if(res.data.code == 1){
              this.$router.push('/storyList')
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.remakeStory()
                })
            }else{
              alert(res.data.msg)
            }
          })
        },
        onRest(){

        },
        createStory(){
          this.$http.post(this.api + '/home/Story/save_story',{
            token:localStorage.getItem('token'),
            title: this.title,
            content: this.content,
            country: this.country[1],
            province: this.province[1],
            city: this.city[1],
            region:this.xian[1],
            country_id:this.country[0],
            province_id:this.province[0],
            city_id:this.city[0],
            region_id:this.xian[0],
            kind_id: this.region[this.region.length-1],
            image:this.cover_image,
            cover_image: this.cover_image[0].image_id,
            address:this.address,
          }).then(res=>{
            if(res.data.code == 1){
              this.$router.push('/storyList')
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.createStory()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
        },

        checkXian(msg){
          this.xianList = msg
        },
        selectCountry(msg){
          this.country = msg

        },
        selectProvince(msg){
          this.province = msg

        },
        selectCity(msg){
          this.city = msg

        },
        selectXian(msg){
          this.xian = msg

        },
        creatStory(){
          this.$http.post(this.api + '/home/Kind/kindlist',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                for(let i in res.data.data){
                  this.options.push(res.data.data[i])
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.creatStory()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        getStory(){
          this.$http.post(this.api + '/home/Story/get_story',{
            token: localStorage.getItem('token'),
            story_id: this.storyId,
            visit:0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.title = data.title
                this.country=[data.country_id,data.country]
                this.province=[data.province_id,data.province]
                this.city=[data.city_id,data.city]
                this.xian=[data.region_id,data.region]
                if(data.province == data.city){
                  this.local = data.country +' '+ data.province + '市'+' '+ data.city + '市'+' '+ data.region
                }else{
                  this.local = data.country +' '+ data.province + '省'+' '+ data.city + '市'+' '+ data.region
                }
                this.address = data.address
                for(let m = 0;m<data.kind_id.split(',').length;m++){
                  this.region.push(parseInt(data.kind_id.split(',')[m]))
                }
                for(let i = 0;i<data.image.length;i++){
                  this.imgList.push({imgUrl:data.image[i].domain+data.image[i].image_url,image_id: data.image[i].image_id})
                }
                this.content = data.content
              }else if(res.data.code == 3){

              }else{
                alert(res.data.msg)
              }
            })
        }
      },
    mounted() {
      let _this = this
      _this.creatStory()
      if(this.storyId){
        _this.getStory()
      }
    },
    created(){
          this.storyId = this.$route.query.storyId
    }
  }
</script>

<style scoped>
  .upload{
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    right:0;
    bottom:0;
    opacity: 0;
    width:150px;
    height: 150px;
  }
  .formFile{
    position:relative;
    width:150px;
    height:150px;
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>
