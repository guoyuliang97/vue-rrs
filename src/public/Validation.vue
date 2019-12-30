<template>
    <div>
      <Head type="authentication" v-on:reload="reload"></Head>
      <div style="height:10px;background-color:#008489;margin-top:80px;	transition-property:width;transition-duration:0.5s;transition-timing-function:linear;transition-delay:0s;" :style="{width:stepNum + '%'}"></div>
      <div style="margin:20px auto 0;width:850px;text-align: right;cursor: pointer"><span @click="goBackHome">退出</span></div>
      <div style="width:850px;margin:80px auto;text-align:left;" v-if="isStep == 'volunteer'">
        <h1 style="margin:20px 0;">成为志愿者</h1>
        <p><b>选择您主要的语言</b></p>
        <el-select style="margin:20px 0;width:300px;" v-model="firstlanguage" placeholder="请选择语言">
          <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <p><b>其他所会语言<span style="font-size: 12px;">(可多选)</span></b></p>
        <el-select style="margin:20px 0;width:300px;" v-model="language" multiple filterable allow-create default-first-option placeholder="请选择语言">
          <el-option v-for="(item,index) in languageList" :disabled="index === firstlanguage? true:false" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <p><b>自我介绍</b></p>
        <el-input type="textarea" :autosize="{minRows:5}" style="margin:20px 0;width:300px;" v-model="introduceText"></el-input>
        <div>
          <el-button @click="nextStep" type="primary">{{audit_idcard? '提交志愿者申请':'下一步实名认证'}}&gt;</el-button>
        </div>
      </div>
      <div v-if="isStep == 1" style="width:850px;margin:80px auto;text-align:left;">
        <div>
          <i style="font-size:50px;color:#FF7F24" class="iconfont icon-jinggao"></i>
        </div>
        <h1 style="margin:20px 0;">添加由政府签发的有效身份证件</h1>
        <p style="margin:30px 0;"></p>
        <el-button v-if="isVolunteer" @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
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
        <p style="margin:30px 0;">上传您的身份证（中国）正面的照片。 确保您的照片不会模糊不清，能够清楚地显示您的脸部。</p>
        <div style="display: flex;justify-content: flex-start">
          <div style="position: relative">
            <el-upload
              style="border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;overflow: hidden"
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
              style="overflow:hidden;border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;"
              :action="api + '/home/Upload/upload/home/Upload/upload'"
              :data="data"
              :show-file-list="false"
              :on-change="uploadScecond"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:15px;">添加国徽面照片</i>
            </el-upload>
            <div v-if="isSeccond" style="position: absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.2);display: flex;align-items: center;justify-content: center">
              <Loading></Loading>
            </div>
          </div>
        </div>
        <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;margin-top:50px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
      </div>
      <div v-if="isStep == 5" style="width:850px;margin:80px auto;text-align:left;">
        <h1 style="margin:20px 0;">上传您的护照的照片</h1>
        <p style="margin:30px 0;">上传您的护照（中国）的照片。 确保您的照片不会模糊不清，能够清楚地显示您的信息。</p>
        <div style="display: flex;justify-content: flex-start">
          <div style="position: relative">
            <el-upload
              style="overflow:hidden;border: 1px dashed #d9d9d9; border-radius: 6px;cursor: pointer;width: 260px; height: 160px;display: block;  line-height: 160px;text-align: center;  color: #8c939d;"
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
        <el-button @click="goBack(isStep)" type="primary" style="font-size:18px;"><i class="el-icon-arrow-left"> 上一步</i></el-button>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;margin-top:50px;"> 下一步<i class="el-icon-arrow-right"></i></el-button>
      </div>
      <div v-if="isStep == 6" style="width:850px;margin:80px auto;text-align:left;">
        <h1 style="margin:20px 0;">您的用户身份验证成功!</h1>
        <p style="margin:30px 0;"><b>欢迎加入人人耍！</b></p>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 完成<i class="el-icon-arrow-right"></i></el-button>
      </div>
      <div v-if="isStep == 8" style="width:850px;margin:80px auto;text-align:left;">
        <h1 style="margin:20px 0;">志愿者申请提交成功</h1>
        <p style="margin:30px 0;"><b>欢迎加入人人耍志愿者！</b></p>
        <el-button @click="changeStep(isStep)" type="primary" style="font-size:18px;"> 完成<i class="el-icon-arrow-right"></i></el-button>
      </div>
      <div v-if="isWait" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.5);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import lan from '../../static/js/language'
  import Head from './head'
  import Loading from './Loading'
    export default {
        name: "Validation",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            data:{
              token: localStorage.getItem('token')
            },
            stepNum: '',
            isStep:'1',
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
            firstlanguage:'',
            language:'',
            languageList:[],
            introduceText:'',
            isVolunteer:false,
            audit_idcard:'',
            isSeccond:false,
            isFirst: false,
            addStep:'',
            isWait:false
          }
      },
      components:{
        Head,
        Loading,
      },
      methods:{
        changeStep(val){
          if(val == 1){
            this.stepNum += this.addStep
            this.isStep = 2
          }else if(val == 2){
            this.stepNum += this.addStep
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
              this.stepNum += this.addStep
              this.isStep = 4
            }else{
              this.stepNum += this.addStep
              this.isStep = 5
            }
          }else if(val == 4){
            if(this.firstId && this.secendId){
              this.checkSfz()
            }else{
              this.$message({
                type:'info',
                message:'您的图片还没上传完整！'
              })
            }
          }else if(val == 5){
            if(!this.huzhaoId){
              this.$message({
                type: 'info',
                message: '请上传您的护照正面'
              })
            }else{
              this.checkHz()
            }
          }else if(val == 6 || val == 8){
            this.$router.push('/')
          }
        },
        goBack(val){
          if(val == 5){
            this.isStep = 3
            this.stepNum = this.stepNum - (2*this.addStep)
          }else if(val == 1){
            this.isStep = 'volunteer'
            this.stepNum -= this.addStep
          }else{
            this.isStep -= 1
            this.stepNum -= this.addStep
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
          this.$http.post(this.api + '/IdentifyCard',{
            token: localStorage.getItem('token'),
            idcard_z: this.firstId,
            idcard_f: this.secendId,
            flag:1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.stepNum = 100
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
        },
        checkHz(){
          this.isWait = true
          this.$http.post(this.api + '/IdentifyCard',{
            token: localStorage.getItem('token'),
            passport: this.huzhaoId,
            flag:2
          })
            .then(res=>{
              if(res.data.code == 1){
                this.stepNum = 100
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
        },
        goBackHome(){
          this.$router.go(-1)
        },
        nextStep(){
          if(this.firstlanguage !== '' && this.introduceText && this.language.length){
            this.beComeVolun()
          }else{
            this.$message({
              type: 'error',
              message: '您还没有填写完整!'
            })
          }
        },
        beComeVolun(){
          this.$http.post(this.api + '/VolunteerB',{
            token: localStorage.getItem('token'),
            other_language: JSON.stringify(this.language),
            main_language: this.firstlanguage,
            introduce: this.introduceText,
          })
            .then(res=>{
              if(res.data.code == 1){
                if(this.audit_idcard){
                  this.isStep = 8
                  this.stepNum = 100
                }else{
                  this.isStep = 1
                  this.stepNum += this.addStep
                  this.$message({
                    type: 'success',
                    message:'已提交，请继续完成身份验证！'
                  })
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.beComeVolun()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        reload(res){
          let data = res.data.data[0]
          this.audit_idcard = data.audit_idcard
          if(this.$route.query.information){
            if(this.audit_idcard){
              this.isStep = this.$route.query.information
              this.stepNum = 50
              this.isVolunteer = true
            }else{
              this.isStep = this.$route.query.information
              this.addStep = 50/3
              this.stepNum = 50/3
              this.isVolunteer = true
            }
          }else{
            this.isStep = '1'
            this.addStep = 20
            this.stepNum = 20
          }
        },
        uploadLoading(file,fileList){
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
      },
      created(){
        this.languageList = lan()
      }
    }
</script>

<style scoped>
  .avatar{
    width:260px;
    height:160px;
  }
</style>
