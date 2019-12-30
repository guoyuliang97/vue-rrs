<template>
    <div class="exp_con">
      <p class="title">该活动是否包含住宿</p>
      <div style="font-size:20px;margin:20px 0;">
        <el-radio v-model="houseNot" label="0"><b>是</b></el-radio>
        <el-radio v-model="houseNot" label="1"><b>否</b></el-radio>
      </div>
      <div v-if="houseNot == '0'">
          <p class="language_txt fontweight">请上传您提供的住宿图片</p>
          <div style="margin:20px 0;">
            <div style="margin-top: 30px;">
              <div class="formFile">
                <i style="font-size: 30px;" class="el-icon-plus"></i>
                <input type="file" class="upload"  @change="seletI"  ref="file" multiple />
              </div>
            </div>
            <p v-if="fileAllList.length" style="font-size:12px;color:#008489;margin:10px 0;">（小贴士：可以对您的照片进行排序再保存）</p>
            <div v-if="fileAllList.length" style="display: flex;flex-wrap: wrap;">
              <div  v-for="(item,index) in fileAllList" :key="index" style="margin:20px 0;"  v-dragging="{ item: item, list: fileAllList, group: 'item' }">
                <div  style="width:150px;height:150px;background-size:100% 100%;margin-right:20px;" :style="{backgroundImage: 'url('+item.url+')'}">
                  <div style="width:150px;height:150px;position:relative;background-color:rgba(0,0,0,.3);">
                    <div style="position: absolute;top:50%;left:50%;width:50px;height:20px;display: flex;justify-content: flex-start;margin-left:-25px;margin-top:-10px;">
                      <i @click="uploadLook(item,index)" style="font-size: 20px;color:white;cursor: pointer" class="el-icon-zoom-in"></i><i @click="uploadDelet(item,index)" style="font-size: 20px;color:white;margin-left:10px;cursor: pointer" class="el-icon-delete"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <p></p>
      </div>
      <div v-if="houseNot == '1'" style="font-size:20px;margin:20px 0;">
        <p style="margin-bottom:20px;"><b>是否为旅客提供住宿</b></p>
        <el-radio v-model="radio" label="1"><b>提供</b></el-radio>
        <el-radio v-model="radio" label="0"><b>不提供</b></el-radio>
      </div>
      <div v-if="houseNot == '1' && radio == '1'" >
        <p style="color:#008489;cursor: pointer;margin:20px 0;"><span @click="isHouse = !isHouse"><i v-if="!isHouse" class="el-icon-plus"></i>{{isHouse?'取消':'添加房源'}}</span></p>
      </div>
      <div v-show="isHouse">
        <div v-if="XGHouse" style="display:flex;justify-content:space-between;color:#008489;margin-bottom:10px;"><span>您正在对添加的房源进行修改</span><span @click="closeHouse">取消</span></div>
        <p class="language_txt fontweight">请选择您提供的住宿类型</p>
        <div style="font-size:20px;margin:20px 0;">
          <el-radio v-model="house" label=1><b>露营</b></el-radio>
          <el-radio v-model="house" label=2><b>民宿</b></el-radio>
          <el-radio v-model="house" label=3><b>酒店</b></el-radio>
        </div>
        <p class="language_txt fontweight">请上传您提供的住宿图片</p>
        <div style="margin:20px 0;">
          <div style="margin:20px 0;">
            <div style="margin-top: 30px;">
              <div class="formFile">
                <i style="font-size: 30px;" class="el-icon-plus"></i>
                <input type="file" class="upload"  @change="seletI"  ref="fileA" multiple />
              </div>
            </div>
          </div>
          <p v-if="imageList.length" style="font-size:12px;color:#008489;margin:10px 0;">（小贴士：可以对您的照片进行排序再保存）</p>
          <div v-if="imageList.length" style="display: flex;flex-wrap: wrap;">
            <div  v-for="(item,index) in imageList" :key="index" style="margin:20px 0;"  v-dragging="{ item: item, list: imageList, group: 'item' }">
              <div  style="width:150px;height:150px;background-size:100% 100%;margin-right:20px;" :style="{backgroundImage: 'url('+item.url+')'}">
                <div style="width:150px;height:150px;position:relative;background-color:rgba(0,0,0,.3);">
                  <div style="position: absolute;top:50%;left:50%;width:50px;height:20px;display: flex;justify-content: flex-start;margin-left:-25px;margin-top:-10px;">
                    <i @click="uploadLook(item,index)" style="font-size: 20px;color:white;cursor: pointer" class="el-icon-zoom-in"></i><i @click="DeletImg(item,index)" style="font-size: 20px;color:white;margin-left:10px;cursor: pointer" class="el-icon-delete"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div v-show="XGHouse && backHouse.imgUrl.length">
           <p class="language_txt fontweight">已上传图片</p>
           <div style="display:flex;justify-content:flex-start;flex-wrap:wrap;margin: 20px 0;">
              <div v-for="(items,indexs) in backHouse.imgUrl" :key="indexs" v-dragging="{ item: items, list:  backHouse.imgUrl, group: 'items' }" style="position:relative;width:178px;height:178px;margin-right:10px;margin-bottom:10px;">
                <img :src="items.imgUrl" style="width:100%;height:100%;border-radius:10px;" >
                <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center">
                   <i @click="deletHouse(items,indexs)" style="font-size:20px;color:#fff;z-index:999;cursor:pointer" class="el-icon-delete"></i>
                </div>
              </div>
           </div>
        </div>
        <p class="language_txt fontweight">提供住宿名称</p>
        <el-input type="text" v-model="houseName" style="width:200px;margin:20px 0;" placeholder="请输入名称"></el-input>
        <p class="language_txt fontweight">请填写提供的{{house == '1'?'帐篷':'房间'}}数</p>
        <el-input type="text" v-model="houseNum" style="width:200px;margin:20px 0;" placeholder="请输入房间数"></el-input>
        <p class="language_txt fontweight">请简单介绍您的一个帐篷或者民宿房间或者酒店房间可住情况</p>
        <el-input type="text" v-model="perNum" style="width:200px;margin:20px 0;"  placeholder="请输入"></el-input>
        <p class="language_txt fontweight">请简单介绍您的住宿情况</p>
        <el-input style="margin:20px 0;width:600px;" type="textarea"  v-model="describe" :autosize="{minRows:4}" placeholder="请说明下..."></el-input>
        <p class="language_txt fontweight">输入住宿价格</p>
        <div style="display: flex;justify-content: flex-start;margin:20px 0;">
          <div style="height:40px;border:1px solid #008489;line-height:40px;padding:0 10px;border-right:none">APY(人民币)</div>
          <div style="line-height: 40px;text-align: center;width:200px;border:1px solid #008489;padding-left:10px;padding-right:10px;">
            <input style="width:200px;border:none;" v-model="price"  type="text"  placeholder="请输入价格...">
          </div>
        </div>
        <el-button type="primary" @click="addHouse" plain>添加</el-button>
        <el-button type="primary" @click="closeHouse" plain>取消</el-button>
      </div>
      <div v-if="houseNot == '1'&& radio == '1'" style="display: flex;flex-wrap: wrap;margin:20px 0;">
        <div style="margin: 20px 40px 20px 0;" v-for="(item,index) in houseList" :key="index">
          <div style="width:333px;height:222px;position:relative">
            <el-carousel :autoplay="false" indicator-position="none" trigger="click" height="222px">
              <el-carousel-item v-for="(items,indexs) in item.imgUrl " v-if="indexs < 4">
                <img :src="items.imgUrl" width="100%" height="100%">
              </el-carousel-item>
            </el-carousel>
            <div style="position:absolute;top:0;background-color:rgba(0,0,0,.5);color:#fff;text-align:right;width:100%;z-index:999;font-size:20px;cursor:pointer">
              <i @click="deletea(item,index,1)"  class="el-icon-edit"></i>
            <i @click="deletea(item,index,2)" class="el-icon-delete"></i>
            </div>
          </div>
          <div style="width:333px">
            <p class="language_txt" style="font-size:12px;display: flex;justify-content: space-between"><span><b>{{item.type}}·{{item.perNum}}</b></span>
              <span style="padding:2px 10px;background-color:#008489;color:#fff;border-radius: 5px;">{{item.houseType}}</span></p>
              <p class="language_txt" style="font-size:12px;"><b>{{item.name}}</b></p>
            <p class="language_txt" style="font-size:12px;"><b>{{item.title}}</b></p>
            <p class="language_txt" style="font-size:12px;"><b>{{item.price}}</b></p>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" style="margin:20px 0;" plain @click="changeRouter">{{complete? '保存':'下一步'}}</el-button>
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
        name: "accommodation",
      data(){
          return{
            houseNot:'',
            radio:'0',
            api:this.GLOBAL.baseURL,
            upData:{
              token: localStorage.getItem('token')
            },
            dialogImageUrl: '',
            dialogVisible: false,
            house:'',
            houseNum:'',
            perNum:'',
            describe:'',
            price:'',
            imageList:[],
            imageIdList:[],
            isHouse:false,
            houseList:[],
            sendList:[],
            normal:[],
            currency:[
              {value:0,label:'人民币-￥'},
              {value:1,label:'美元-$'},
              {value:2,label:'日元-J.￥ '}
            ],
            houseName:'',
            XGHouse:false,
            remakeIndex:'',
            houseID:'',
            backHouse:'',
            backHOuseId:[],
            saveHouse:[],
            saveHouseId:[],
            houseIndex:'',
            complete:'',
            houseImgList:[],
            false:false,
            sendImgList:[],
            fileAllList:[],
            image:[],
            upLoadIndex:1,
            uploadList:[],
            isLoading:false,
            param: '',
            index:0,
            active_id:''
          }
      },
      components:{
        Loading,
      },
      watch:{
        radio:function(){
          if(this.radio == '0'){
            this.isHouse = false
            this.closeHouse()
          }
        },
        houseNot:function(){
          if(this.houseNot == '0'){
            this.isHouse = false
            this.closeHouse()
          }
        },
      },
      methods:{
        async seletI(event){
          this.isLoading = true
          await  this.xunhuan(event)

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
              if(this.houseNot === '0'){
                this.$refs.file.value = ''
              }else{
                this.$refs.fileA.value = ''
              }
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
                if(this.houseNot === '0'){
                  for(let i =0;i< data.length; i++){
                    this.fileAllList.push({url:data[i].domain + data[i].image_url,image_id:data[i].image_id})
                  }
                  this.$refs.file.value = ''
                }else{
                  for(let i =0;i< data.length; i++){
                    this.imageList.push({url:data[i].domain + data[i].image_url,image_id:data[i].image_id})
                    this.imageIdList.push(data[i].image_id)
                  }
                  this.$refs.fileA.value = ''
                }
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.upload()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                if(this.houseNot === '0'){
                  this.$refs.file.value = ''
                }else{
                  this.$refs.fileA.value = ''
                }
                this.isLoading = false
              }
            })
            .catch(error=>{
              if(this.houseNot === '0'){
                this.$refs.file.value = ''
              }else{
                this.$refs.fileA.value = ''
              }
              this.isLoading = false
            })
        },
        closeHouse(){
            this.isHouse = false
            this.houseIndex = ''
            this.isHouse = false
            this.XGHouse = false
            this.remakeIndex = ''
            this.houseID = ''
            this.backHouse = []
            this.house = '',
              this.houseName = '',
              this.houseNum = '',
              this.perNum = '',
              this.describe = '',
              this.price = ''
            this.backHOuseId = []
          },
        uploadLook(item,index){
          this.dialogVisible = true
          this.dialogImageUrl = item.url
        },
        uploadDelet(item,index){
          this.fileAllList.splice(index,1)
        },
        DeletImg(item,index){
          this.imageList.splice(index,1)
        },
        checkl(){
          if(this.upLoadIndex  == this.uploadList.length+1){
            this.upLoadIndex = 1
            this.uploadList = []
            if(this.houseNot === '0'){
              this.$refs.firstupload.clearFiles()
            }else{
              this.$refs.upload.clearFiles()
            }
          }
        },
        //删除照片
        deletHouse(item,index){
          if(this.backHOuseId.length>1||this.imageList.length>1){
            for(let i = 0;i<this.backHOuseId.length;i++){
                if(this.backHOuseId[i].image_id == item.imageId){
                  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.saveHouseId.push(this.backHOuseId[i])
                    this.backHOuseId.splice(i,1)
                    this.saveHouse.push(this.backHouse.imgUrl[index])
                    this.backHouse.imgUrl.splice(index,1)
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });
                  });
                }
              }
          }else{
            this.$alert('房源至少一张照片')
          }
        },
        //删除房源照片
        deletHouseImage(imgId,val){
          this.$http.post(this.api+ '/ImageD',{
            token: localStorage.getItem('token'),
            flag: 1,
            image_id:imgId,
            table_id:this.active_id
          })
            .then(res=>{
              if(res.data.code == 1){
                 this.houseImgList.splice(val,1)
                  this.sendImgList.splice(val,1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api+ '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deletHouseImage(imgId,val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        //删除和修改
        deletea(item,index,val){
          if(this.houseNot == '1'){
            if(val ==1){
              this.houseIndex = index
              this.isHouse = true
              this.XGHouse = true
              this.remakeIndex = index
              this.houseID = item.house_id
              this.backHouse = item
              this.house = item.houseType == '露营'?'1':item.houseType == '民宿'?'2':'3',
                this.houseName = item.name,
                this.houseNum = item.type,
                this.perNum = item.perNum,
                this.describe = item.title,
                this.price = parseInt(item.price.slice(3))
              this.backHOuseId = this.sendList[index].image
            }else{
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if(this.issatay == 1){
                  this.deleteHouse(item,index)
                }else{
                  this.houseList.splice(index,1)
                  this.sendList.splice(index,1)
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          }else{
              this.$confirm('此操作将永久删除该房源信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if(this.issatay == 2){
                  this.deletHouseImage(this.sendImgList[index].image_id,index)
                }else{
                  this.houseImgList.splice(index,1)
                  this.sendImgList.splice(index,1)
                }

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
          }
        },
        deleteHouse(item,index){
          this.$http.post(this.api + '/HouseD',{
            token: localStorage.getItem('token'),
            house_id: item.house_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.houseList.splice(index,1)
                this.sendList.splice(index,1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deleteHouse(item)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        addHouse(){
            if(!this.houseName){
              this.$message({type:'info',message:'请输入名称'})
            }else if(!this.house){
              this.$message({type:'info',message:'请选择类型'})
            }else if(!this.imageList.length && !this.backHouse.imgUrl.length){
              this.$message({type:'info',message:'请上传照片'})
            }else if(!this.houseNum || !(/^[1-9]\d*$/).test(this.houseNum)){
              this.$message({type:'info',message:'请填写正确房间数！'})
            }else if(!this.describe){
              this.$message({type:'info',message:'请描述房源'})
            }else if(!this.perNum || !(/^[1-9]\d*$/).test(this.perNum)){
              this.$message({type:'info',message:'请填写房间可住人数(数字)'})
            }else if(!this.price || !( /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/).test(this.price)){
              this.$message({type:'info',message:'请填写正确金额！（最多保留两位小数的正数）'})
            }else{
              this.sendImgList = []
              this.houseImgList = []
              if(this.house == 1){
                let a = '露营'
                this.aHouse(a);
              }else if(this.house == 2){
                let a = '民宿'
                this.aHouse(a);
              }else{
                let a = '酒店'
                this.aHouse(a);
              }
            }
        },
        aHouse(a){
         if(this.XGHouse){
           let c = []
           let b = []
           let d = []
           let image = []
           let f = []
           for(let j = 0;j<this.imageList.length;j++){
             d.push({imgUrl:this.imageList[j].url,imageId:this.imageList[j].image_id})
             image.push({image_id:this.imageList[j].image_id})
           }
           for(let i =0;i<this.backHouse.imgUrl.length;i++){
            b.push({imgUrl:this.backHouse.imgUrl[i].imgUrl,imageId:this.backHouse.imgUrl[i].imageId})
             f.push({image_id:this.backHouse.imgUrl[i].imageId })
           }
             c = b.concat(d)
         this.houseList[this.remakeIndex] = (
            {imgUrl:c,houseType:a,type:this.houseNum,perNum:this.perNum,title:this.describe,price:'APY '+this.price,name:this.houseName}
          )
          image = f.concat(image)
          this.sendList[this.remakeIndex]=({house_id:this.houseID,num:this.houseNum,max_person:this.perNum,price:this.price,descript:this.describe,image:image,flag:this.house,title:this.houseName})
         }else{
             let d = []
           for(let j = 0;j<this.imageList.length;j++){
             d.push({imgUrl:this.imageList[j].url,imageId: this.imageList[j].image_id})
           }
         this.houseList.push(
            {imgUrl:d,houseType:a,type:this.houseNum,perNum:this.perNum,title:this.describe,price:'APY '+this.price,name:this.houseName}
          )
          let image = []
          for(let i = 0; i< this.imageList.length;i++){
            image.push({image_id:this.imageList[i].image_id})
          }
          this.sendList.push({num:this.houseNum,max_person:this.perNum,price:this.price,descript:this.describe,image:image,flag:this.house,title:this.houseName})
         }
          this.houseNum = ''
          this.perNum = ''
          this.describe = ''
          this.price = ''
          this.imageList = []
          this.imageIdList = []
          this.normal = []
          this.saveHouse = []
          this.saveHouseId = []
          this.houseName = ''
          this.house = ''
          this.isHouse = false
          this.XGHouse = false
        },
        changeRouter(){
          if(this.houseNot == '1'){
            if(this.radio == 1){
              if(this.sendList.length && this.fileAllList.length){
                this.$confirm('此操作将覆盖包含住宿添加的房源图片, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.check()
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              }else if(this.sendList.length && !this.fileAllList.length) {
                this.check()
              }else{
                this.$message({
                  type: 'info',
                  message: '请添加房源!'
                })
              }
            }else{
              this.check()
            }
          }else{
            if(this.sendList.length){
              this.$confirm('此操作将覆盖未包含住宿里面单独提供的房源, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.sendHouse()
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }else{
              if(this.fileAllList.length){
                this.sendHouse()
              }else{
                this.$message({
                  type: 'info',
                  message: '请添加住宿照片'
                })
              }

            }
          }
        },
        sendHouse(){
          if(this.active_id){
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
              issatay:2,
              house_image: this.fileAllList,
              step:12
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(!this.complete){
                    this.$emit('changeRouter',{id:13,router:'attation',information: this.active_id,complete: this.complete})
                  }else{
                    this.$message({
                      type:'success',
                      message: '保存成功!'
                    })
                  }
                }else if(res.data.code == 3){
                      this.sendHouse()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              issatay:2,
              house_image: this.fileAllList,
              step:12
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId',res.data.data)
                  this.$emit('changeRouter',{id:13,router:'attation',information: res.data.data})
                }else if(res.data.code == 3){
                  this.sendHouse()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }
        },
        check(){
          if(this.active_id){
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
              issatay:this.radio,
              house: this.radio?this.sendList:'',
              step:12
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(!this.complete){
                    this.$emit('changeRouter',{id:13,router:'attation',information: this.active_id,complete: this.complete})
                  }else{
                    this.$message({
                      type:'success',
                      message: '保存成功!'
                    })
                  }
                }else if(res.data.code == 3){
                  this.check()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              issatay:this.radio,
              house: this.radio?this.sendList:'',
              step:12
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId',res.data.data)
                  this.$emit('changeRouter',{id:13,router:'attation',information:res.data.data})
                }else if(res.data.code == 3){
                  this.check()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }
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
                if(data.issatay == 1){
                  this.issatay = 1
                  this.houseNot = '1'
                  this.radio = '1'
                  for(let i = 0;i<data.house.length;i++){
                    if(data.house[i].flag == 1){
                      let image=[]
                      let imageId = []
                      for(let j =0;j<data.house[i].image.length;j++){
                        image.push({imgUrl:data.house[i].image[j].domain + data.house[i].image[j].themb_url,imageId:data.house[i].image[j].image_id})
                        imageId.push({image_id:data.house[i].image[j].image_id})
                      }
                      this.houseList.push({
                        imgUrl:image,houseType:'露营',type:data.house[i].num,perNum:data.house[i].max_person,house_id:data.house[i].house_id,title:data.house[i].descript,price:'APY'+data.house[i].price,name:data.house[i].title
                      })
                      this.sendList.push({house_id:data.house[i].house_id,num:data.house[i].num,max_person:data.house[i].max_person,price:data.house[i].price,descript:data.house[i].descript,image:imageId,flag:data.house[i].flag,title:data.house[i].title})
                    }else if(data.house[i].flag == 2){
                      let image=[]
                      let imageId = []
                      for(let j =0;j<data.house[i].image.length;j++){
                        image.push({imgUrl:data.house[i].image[j].domain + data.house[i].image[j].themb_url,imageId:data.house[i].image[j].image_id})
                        imageId.push({image_id:data.house[i].image[j].image_id})
                      }
                      this.houseList.push({
                        imgUrl:image,houseType:'民宿',type:data.house[i].num,perNum:data.house[i].max_person,house_id:data.house[i].house_id,title:data.house[i].descript,price:'APY'+data.house[i].price,name:data.house[i].title
                      })
                      this.sendList.push({house_id:data.house[i].house_id,num:data.house[i].num,max_person:data.house[i].max_person,price:data.house[i].price,descript:data.house[i].describe,image:imageId,flag:data.house[i].house,title:data.house[i].title})
                    }else if(data.house[i].flag == 3){
                      let image=[]
                      let imageId = []
                      for(let j =0;j<data.house[i].image.length;j++){
                        image.push({imgUrl:data.house[i].image[j].domain + data.house[i].image[j].themb_url,imageId:data.house[i].image[j].image_id})
                        imageId.push({image_id:data.house[i].image[j].image_id})
                      }
                      this.houseList.push({
                        imgUrl:image,houseType:'酒店',type:data.house[i].num,perNum:data.house[i].max_person,house_id:data.house[i].house_id,title:data.house[i].descript,price:'APY'+ data.house[i].price,name:data.house[i].title
                      })
                      this.sendList.push({house_id:data.house[i].house_id,num:data.house[i].num,max_person:data.house[i].max_person,price:data.house[i].price,descript:data.house[i].describe,image:imageId,flag:data.house[i].house,title:data.house[i].title})
                    }
                  }
                }else if(data.issatay == 2){
                  this.issatay = 2
                  this.houseNot = '0'
                  if(data.houseimage.length){
                    for(let i = 0;i<data.houseimage.length;i++){
                      this.fileAllList.push({url:data.houseimage[i].domain+data.houseimage[i].image_url,image_id:data.houseimage[i].image_id})
                    }
                  }
                }else{
                  this.issatay = 0
                  this.houseNot = '1'
                  this.radio = '0'
                }
              }else if(res.data.code == 3){
                this.getActives()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        }

      },
      mounted(){
          window.scroll(0,0)
          let _this = this
        if(_this.active_id){
          _this.getActives()
        }
      },
      created(){
          this.active_id = this.$route.query.information
          this.complete = this.$route.query.complete
      }
    }
</script>

<style scoped>
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
