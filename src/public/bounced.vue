<template>
    <div>
        <div  style="position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.8);z-index:999">
        <!--添加到心愿单-->
          <div  v-if="type=='like'" class="animated fadeIn" style="width:500px;padding:20px;height:500px;margin-top:-270px;background-color:#fff;border-radius:10px;position:fixed;top:50%;left:50%;margin-left:-270px;" >
            <div style="font-size:25px;width:25px;" @click="close('closeWish')"><i class="el-icon-close"></i></div>
            <div style="display: flex;justify-content: space-between;margin:10px 0;">
              <div style="line-height:20px;height:20px;font-size:15px;">选一个心愿单</div>
              <div style="font-size:20px;width:20px;color:#008489" @click="addWish"><i v-if="newWish == false" class="el-icon-plus"></i><i v-if="newWish == true" class="el-icon-minus"></i></div>
            </div>
            <div v-show="newWish" style="text-align:left">
              <p style="color:#008489;margin:5px 0;font-size:12px">名称:</p>
              <el-input type="text" v-model="wishName" placeholder="请输入心愿单名称"></el-input>
              <el-button type="primary" style="margin-top:10px;" plain @click="addWishName">创建</el-button>
            </div>
            <div v-if="wishList != ''" style="height:300px;overflow-y: scroll;margin-top:20px;text-align:left;border-top:1px solid #eee">
              <div style="border-bottom: 1px solid #eee;padding:20px;display: flex;justify-content: space-between;" v-for="(item,index) in wishList">
                <div>{{item.group_name}}</div><div style="font-size:25px;cursor: pointer" :style="{'color':item.is_this_colle == 1? '#FF5A5F':'#eee'}" @click="save(item,index)"><i class="el-icon-star-on"></i></div>
              </div>
            </div>
          </div>
         <!-- 分享活动-->
          <div v-if=" type=='share' " class="animated fadeIn" style="position:fixed;top:50%;left:50%;width:320px;height:450px;padding:20px;margin-left:-180px;margin-top:-225px;background-color:#fff">
            <div style="font-size:25px;width:25px;" @click="close('closeShare')"><i class="el-icon-close"></i></div>
            <div style="margin-top:20px;text-align: left">
              <h1>分享</h1>
              <p style="border-bottom: 1px solid #eee;padding:20px 0;">去看看爱彼迎的这个超棒的房源: A1丽江古城干净舒适两居一厅大床家庭房—免费停车 - 丽江市的公寓型住宅 出租</p>
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
               <i class="iconfont icon-weixin"></i><span class="left" @click="toWeixin">微信</span>
              </div>
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-weibo"></i> <span class="left" @click="toWeiBo">微博</span>
              </div>
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-dianziyouxiang"></i> <span @click="toEmail" class="left">电子邮件</span>
              </div>
            <!--  <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-Facebook"></i> <span class="left">Facebook</span>
              </div>
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-twitter"></i> <span class="left">Twitter</span>
              </div>
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-facebookmessenger"></i> <span class="left">Messenger</span>
              </div>-->
              <div style="padding:20px 10px;border-bottom:1px solid #eee">
                <i class="iconfont icon-fuzhicopy20"></i><button  class="left" v-clipboard:copy="asd" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
              </div>
            </div>
          </div>
          <!--创建心愿单-->
          <div v-if="type=='create'" class="animated fadeIn" :model="wishCreate" style="width:500px;height:460px;padding:20px;background-color:#fff;border-radius:10px;position:fixed;top:50%;left:50%;margin-left:-270px;margin-top:-250px;text-align: left">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer" @click="close('closeCreat')"><i class="el-icon-close"></i></div>
            <div>
              <h2 class="marginTop">创建心愿单</h2>
              <h4 style="margin-top:50px">名称</h4>
              <el-input class="marginTop" type="text" v-model="wishCreate.wishCreat" placeholder="为心愿单命名"></el-input>
              <h4 class="marginTop">隐私设置</h4>
              <el-select v-model="wishCreate.wishChoose" clearable placeholder="请选择" style="width:500px">
                <el-option style="width:500px" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="marginTop">
                <el-button type="primary" @click="saveWish">保存</el-button>
                <el-button  style="color:#008489;border:1px solid #008489" @click="close('closeCreat')">取消</el-button>
              </div>
            </div>
          </div>
         <!-- 举报内容-->
          <div v-if="type=='inform'" class="animated fadeIn" style="width:520px;height:280px;background-color:#fff;position:fixed;left:50%;top:50%;margin-left:-260px;margin-top:-140px;">
            <div style="display: flex;justify-content: space-between;background-color:#eee;padding:10px 20px" ><span>您要匿名举报此故事吗？</span><i @click="close('closeInform')" style="font-size:25px;cursor: pointer" class="el-icon-close"></i></div>
            <div style="background-color:#fff;padding:10px 20px;text-align:left;" v-show="changeReason">
              <p style="font-size:14px;margin:10px 0;">如果是这样，请选择下列原因之一。<span style="color:#008489">了解更多&raquo;</span></p>
              <div class="inform" v-for="(item,index) in informList" >
                <el-button plain class="inform_btn"  @click="close('closeInform',item)">{{item.name}}</el-button>
                <el-popover class="inform_pop"  placement="top-start" title="" width="100" trigger="hover" :content="item.content">
                  <el-button class="inform_ptn"  slot="reference" size="mini" icon="el-icon-question"></el-button>
                </el-popover>
              </div>
              <div class="inform">
                <el-button plain class="inform_btn"  @click="changeForm">其他原因</el-button>
                <el-popover class="inform_pop"  placement="top-start" title="" width="100" trigger="hover" content="此文章因其他原因而被举报">
                  <el-button class="inform_ptn"  slot="reference" size="mini" icon="el-icon-question"></el-button>
                </el-popover>
              </div>
            </div>
            <div style="text-align: left;padding:0 20px;" :model="informReason" v-if="changeReason == false">
              <p style="margin:20px 0;">其他原因:</p>
              <el-input type="textarea" :autosize="{minRows:4}" v-model="informReason.text" placeholder="请填写您的举报内容" ></el-input>
              <div style="display: flex;justify-content: space-between;margin:20px 0">
                <el-button plain @click="informAblish">上一步</el-button><el-button palin @click="informSend">提交</el-button>
              </div>
            </div>
          </div>
         <!-- 喜欢故事的人-->
          <div  v-if="type=='love'" class="animated fadeIn" style="width:400px;height:500px;border-radius:10px;padding:20px;position:fixed;left:50%;margin-left:-220px;background-color:#fff;top:50%;margin-top:-270px;">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer" @click="close('closeLove')"><i class="el-icon-close"></i></div>
            <h1 style="margin:20px 0;text-align: left">喜欢这篇故事的人</h1>
            <div v-for="(item,index) in loveList"  style="border-bottom:1px solid #eee;padding:20px 0;">
              <div style="display:flex;justify-content:space-between">
                <div style="display: flex;justify-content: flex-start">
                  <div><img @click="toPerson(item,index)" :src="item.domain? item.domain+item.image_url:'../../static/img/static/user.png'" width="40" height="40" style="border-radius:50%"></div>
                  <div style="padding:5px 0 0 10px;"><span>{{item.name?item.name:'匿名用户'}}</span></div>
                </div>
                <div v-if="item.user_id != isOwer" >
                  <el-button v-if="item.is_attention == 0" plain @click="takeAttention(item,index)">关注</el-button>
                  <el-button v-if="item.is_attention == 1" @click="takeAttention(item,index)" type="primary">已关注</el-button>
                </div>
              </div>
            </div>
          </div>
         <!-- 个人资料说明-->
          <div v-if="type=='userdata'" class="animated fadeIn" style="width:500px;height:400px;padding:20px;text-align:left;border-radius:5px;position:fixed;top:50%;left:50%;margin-left:-270px;margin-top:-220px;background-color: white;">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer" @click="close('closeUserdata')"><i class="el-icon-close"></i></div>
            <p class="marginTop">您自己的个人介绍</p>
            <el-input type="textarea" rows="10" v-model="introduce" placeholder="请输入介绍..."></el-input>
            <el-button type="primary" @click="sendContent" class="marginTop" plain style="width:100%;">确定</el-button>
          </div>
          <!--赞我的列表-->
          <div v-if="type == 'zan'||type == 'fen'|| type == 'guan'" class="animated fadeIn" style="width:420px;height:400px;padding:20px;text-align:left;border-radius:5px;position:fixed;top:50%;left:50%;margin-left:-220px;margin-top:-270px;background-color: white;overflow: hidden">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer" @click="close('closeZan')"><i class="el-icon-close"></i></div>
            <p class="marginTop">{{type == 'zan'? who?'赞Ta的列表':'赞我的列表':type == 'guan'?who?'Ta的关注列表':'我的关注列表':who?'Ta的粉丝列表':'我的粉丝列表'}}</p>
            <div style=" width:440px;overflow-y:scroll;padding-right:18px;height:260px">
              <Loading v-if="isLoading" style="text-align: center"></Loading>
              <div v-for="(item,index) in zanList" :key="index" style="display: flex;justify-content: space-between;padding:10px 0;border-bottom: 1px solid #eee">
                <div style="display: flex;justify-content: flex-start" >
                  <img  @click="checkUser(item)" :src="item.domain? item.domain + item.image_url : '../../../static/img/static/user.png'" style="width:48px;height:48px;border-radius: 50%;">
                  <div style="line-height:48px;margin-left:20px;font-size:12px;" >{{item.family_name +item.middle_name+item.name?item.family_name +item.middle_name+item.name:'匿名用户'}}</div>
                </div>
                <div v-if="item.user_id !=isOwer">
                  <div v-if="type == 'guan'">
                    <el-button  @click="reAtention(item,index)" type="primary"><i class="el-icon-check"></i>已关注</el-button>
                  </div>
                  <div v-if="type != 'guan'">
                    <el-button v-if="item.is_mutualatt == 0" @click="atention(item,index)" style="width:98px;" plain>关注</el-button>
                    <el-button v-if="item.is_mutualatt == 1" @click="reAtention(item,index)" type="primary"><i class="el-icon-check"></i>已关注</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin:20px 0">
              <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>
          </div>
          <!--微信分享-->
          <div v-if="type == 'weixin'" class="animated fadeIn" style="position:fixed;top:50%;left:50%;padding:20px;background-color: #fff;margin-left:-160px;margin-top:-150px">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer" @click="close('closeWeixin')"><i class="el-icon-close"></i></div>
            <div style="padding: 20px 40px;">
              <p><b>分享到微信</b></p>
              <img :src="weixin" width="200px" height="200px">
            </div>
          </div>
          <!--查看更多照片或视频-->
          <div v-if="type=='lookImg'" class="animated fadeIn" style="position:relative;top:15%;width:60%;left:20%;height:70%;">
            <div style="width:25px;height:25px;font-size:25px;cursor: pointer;position: absolute;right:0;color:#fff;" @click="close('closeLookImg')"><i class="el-icon-close"></i></div>
            <div style="display: flex;justify-content: center">
              <div @click="changeIndex(1)" :style="{borderBottom:changeColor == 1? '1px solid #fff':''}" style="color:#fff;padding:10px 20px;cursor: pointer">图片</div>
              <div @click="changeIndex(2)" :style="{borderBottom:changeColor == 2? '1px solid #fff':''}" style="color:#fff;margin-left:30px;padding:10px 20px;cursor: pointer">视频</div>
            </div>
            <div v-if="imgList.length" style="width:100%;height:70%;margin-top: 30px;">
              <div style="display: flex;justify-content: space-between;width:100%;height:100%">
                <div style="color:#fff;display: flex;align-items: center;">
                  <i style="font-size: 40px;cursor: pointer" @click="prev" class="el-icon-arrow-left"></i>
                </div>
                <div v-if="changeColor == 1" style="width:90%;height:100%">
                  <LoadingImg type="3" :src="imgList[photoIndex].img" style="height:100%;width:100%;overflow:hidden"></LoadingImg>
                </div>
                <div v-if="changeColor == 2&& imgList.length" style="width:90%;height:100%;position: relative">
                  <video id="videoI" controls :src="imgList[photoIndex].img" style="max-width:90%;height:100%; object-fit: fill"  ></video>
                  <img id="player" @click="lookVideo" src="../../static/img/static/video.png" style="position: absolute;z-index:999;top:50%;left:50%;margin-left:-43px;margin-top:-43px;cursor: pointer" />
                </div>
                <div style="color:#fff;display: flex;align-items: center;">
                  <i style="font-size: 40px;cursor: pointer" @click="next" class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="width:530px;position: relative;height:80px;overflow: hidden;margin: 20px auto;">
                <div style="position: absolute;transition:.3s all linear;display: flex;justify-content: flex-start;align-items: center" :style="{marginLeft:left+'px'}">
                  <div v-if="changeColor == 1" v-for="(item,index) in imgList" @click="lookclick(item,index)" style="width:100px;height:75px;border:2px solid;margin-right:10px;"  :style="{borderColor:photoIndex == index? '#FFF':''}" >
                    <LoadingImg type="3"  :src="item.img" style="width:100px;height:75px;overflow:hidden"  ></LoadingImg>
                  </div>
                  <div  v-if="changeColor == 2" v-for="(item,index) in imgList" @click="lookclick(item,index)" style="width:100px;height:75px;border:2px solid;margin-right:10px;position: relative"  :style="{borderColor:photoIndex == index? '#FFF':''}" >
                    <video :src="item.img"  style="width:100%; height:100%; object-fit: fill"></video>
                    <img src="../../static/img/static/videoS.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-10px;" />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!imgList.length" style="display: flex;justify-content: center;align-items: center;color:#fff;margin-top:20%">
              <p>该体验没有上传视频介绍</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import Loading from './Loading'
  import Bus from '../assets/eventBus'
  import '../../static/css/share/iconfont.css'
  import Person from './person.vue'
  import LoadingImg from './loadingImg'
    export default {
        name: "bounced",
      props:['userId','type','wishCreate','loveList','changeReason','informReason','wishList','newWish','informList','zanList','isOwer','who','isLoading','total','weixin','imgList','changeColor'],
      data(){
          return{
            api:this.GLOBAL.baseURL,
            marginTop:'-270px',
            height:'500px',
            wishName:'',
            wishIndex:0,
            options:[
              {value:0,label:'共享'},
              {value:1,label:'私密'}
            ],
            imgUrl:'../../static/img/static/back.jpg',
            left:0,
            photoIndex:0,
            viedio:false,
            videoIMg:'',
            statrPlay:1,
            introduce:'',
            websocket:'',
            pageIndex:1,
            totalPage:'',
            replayList:[],
            review:'',
            isadIndex:-1,
            asd: ''
          }
      },
      components:{
        Person,
        Loading,
        LoadingImg
      },
      watch:{
        wishName:function(){
          this.$emit('getName',this.wishName)
        },
      },
      methods:{
        checkUser(val){
          this.$emit('toCheckUser',val)
        },
        toEmail(){
          this.$emit('toEmail')
        },
        sendContent(){
          this.$emit('sendContent',this.introduce)
        },
        lookclick(item,index){

          this.photoIndex = index
        },
        lookVideo(){
        var vide =  document.getElementById('videoI')
          var player = document.getElementById('player')
          vide.play()
          player.style.display = 'none'
          this.getPasue()
        },
        getPasue(){
          var vide =  document.getElementById('videoI')
          var player = document.getElementById('player')
          vide.addEventListener('ended',function(){
            player.style.display = 'block'

          })
        },
        prev(){
          if(this.photoIndex > 3){
            this.photoIndex --
            this.left += 114
          }else if(this.photoIndex >0&& this.left <0){
            this.photoIndex --
            this.left += 114
          }else if(this.photoIndex >0&& this.left >=0){
            this.photoIndex --
          }
        },
        next(){
          if(this.photoIndex < this.imgList.length -1){
            this.photoIndex ++
            if(this.photoIndex > 3){
              this.left -= 114
            }
          }
        },
        changeIndex(val){
          this.photoIndex = '0'
          this.left = 0
         this.$emit('changeIndex',val)
        },
        addWish(){
          this.$emit('addWish')
        },
        addWishName(){
         this.$emit('addWishName')
        },
        getGroup(){

        },
        save(item,index){
          this.$emit('save',item,index)
        },
        close(el,msg){
          this.$emit(el,msg)
        },
        saveWish(){
          this.$emit('saveWish')
        },
        changeForm(){
          this.$emit('changeForm')
        },
        informSend(){
          this.$emit('informSend')
        },
        informAblish(){
          this.$emit('informAblish')
        },
        takeAttention(item,index){
          this.$emit('takeAttention',item,index)
        },
        toPerson(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.user_id
            }
          })
        },
        handleCurrentChange(val){
          this.$emit('handleCurrentChange',val)

        },
        toWeixin(){
          this.$emit('toWeixin')
        },
        toWeiBo(){
          this.$emit('toWeiBo')
        },
        atention(item,index){
          this.$http.post(this.api + '/home/Comment/attention',{
            token: localStorage.getItem('token'),
            att_user_id: item.user_id,
            type: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                item.is_mutualatt = 1
                this.$message({
                  type: 'success',
                  message: '关注成功！'
                })
              }else if(res.data.code == 3){
                this.atention(item,index)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        reAtention(item,index){
          this.$http.post(this.api + '/home/Comment/attention',{
            token: localStorage.getItem('token'),
            att_user_id: item.user_id,
            type: 2
          })
            .then(res=>{
              if(res.data.code == 1){
                item.is_mutualatt = 0
                this.$message({
                  type: 'success',
                  message: '取消关注！'
                })
              }else if(res.data.code == 3){
                this.reAtention(item,index)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
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
        }
      },
      created() {
          Bus.$on('returnName',(msg)=>{
            this.wishName = msg
          })
        this.asd = location.href + '&userId='+this.userId
      },
    }
</script>

<style scoped>
.left{
  margin-left:10px;
  cursor: pointer;
  color:#008489
}
  .marginTop{
    margin:20px 0;
  }
  .inform{
    display: flex;
    justify-content: flex-start
  }
  .inform_btn{
    width:440px;
    margin:10px 0;
    font-weight:bold
  }
  .inform_pop{
    margin-left:10px;line-height:60px
  }
  .inform_ptn{
    border:none;
    font-size:20px;
    padding:5px;
  }
</style>
