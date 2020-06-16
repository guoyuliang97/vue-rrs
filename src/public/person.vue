<template>
  <div >
    <!-- 故事页面评论-->
    <div v-if="type=='2'" >
      <div class="flexStart" style="font-size:12px;">
        <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>
        <div style="width:100%;margin-left:20px;">
          <div class="flexBetween">
            <div  style="text-align:left;line-height:25px;color:#000"><span >{{name}}</span><br><span>{{time}}</span>
            </div>
            <div  style="margin: 10px 0;font-size:12px;color:#8A8F95"><span class="marginRight" style="cursor: pointer" :style="{color:is_report?'#14c5ca':'#8A8F95'}" v-show="!isOwer"  @click="openInform">{{is_report? '已举报':'举报'}}</span><span class="marginRight" style="cursor: pointer"  @click="talk" v-if="isLogin == true">{{isOwer? '删除':'回复'}}</span> <span @click="parise" style="cursor:pointer" :style="{'color':is_praise?'#14c5ca':'#8A8F95'}">赞{{parseNum}}<i class="el-icon-caret-top"></i></span></div>
          </div>
          <div class="marginBottom">
            <span>{{mess}}</span>
            <div v-if="image.length" style="display: flex;flex-wrap: wrap;margin-top:20px;">
              <div v-for="(item,index) in image" @mouseover="lookImg(item,index)" @mouseleave="leaveImg(item,index)"  style="width:200px;height:150px;margin-right:10px;position: relative;margin-bottom:10px;">
                <LoadingImage type="3" :src="item.domain + item.image_url" style="width:200px;height:150px;"></LoadingImage>
                <div v-if="imgIndex == index" style="position: absolute;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(0,0,0,.5);z-index:999;color:#fff;font-size:20px;">
                  <i style="cursor: pointer" class="el-icon-search" @click="lookImage(item,index)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type=='story'" style="display:flex;justify-content: space-between;">
      <div style="display:flex;justify-content:flex-start">
        <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>
        <div  style="text-align:left;line-height:25px;margin-left:20px;color:#14c5ca"><span >{{name}}</span><br><span>{{time}}</span>
        </div>
      </div>
      <div  style="margin: 10px 0;font-size:14px;"><span style="cursor: pointer" :style="{color:is_report?'#14c5ca':'#000'}" v-show="!isOwer"  @click="openInform">{{is_report? '已举报':'举报'}}·</span><span style="margin: 0 0;cursor: pointer"  @click="talk" v-if="isLogin == true">{{isOwer? '删除':'回复'}}·</span><i class="iconfont icon-zan" style="width:16px;height:16px;" @click="parise" :style="{'color':is_praise?'#14c5ca':'#000'}"></i>{{parseNum}}</div>
    </div>
    <div v-if="type=='story'"  style="text-align:left;margin:10px 0;">
      <span v-html="Xss(mess)"></span>
    </div>
    <!-- 个人资料页面游客评论-->
    <div v-if="type=='3'" style="display:flex;justify-content: flex-start">
      <div > <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>
      </div>
      <div  style="text-align:left;line-height:25px;margin-left:20px;"><span>{{name}}</span><br><span>{{local}}</span>·<span>{{time}}</span></div>
      <div  style="margin-left:400px;"><el-button type="text" @click="openInform">举报</el-button>·<span><img src="../../static/img/story/zan.png" width="16px" height="16px">0</span></div>
    </div>
    <div v-if="type=='3'">
      <span>{{mess}}</span>
      <el-button type="text" @click="talk">回复</el-button>
      <span style="margin-left:200px;cursor: pointer" @click="toRouter"><i class="iconfont icon-huodong"></i>{{activeName}}</span>
    </div>
    <!-- 故事人头像-->
    <div v-if="type=='1'" style="display:flex;justify-content: flex-start">
      <div v-if="type=='1'">
        <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>
      </div>
      <div v-if="type=='1'"><el-button type="primary" plain>关注</el-button></div>
    </div>
    <!-- 个人资料页面策划人评论-->
    <div v-if="type=='4'" style="display:flex;justify-content: flex-start">
      <div >
        <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>

      </div>
      <div  style="text-align:left;line-height:25px;margin-left:20px;"><span>{{name}}</span><br><span>{{local}}</span>·<span>{{time}}</span>·<i class="iconfont icon-huodong"></i></div>
      <div  style="margin-left:400px;"><el-button type="text" @click="openInform">举报</el-button>·<span><img src="../../static/img/story/zan.png" width="16px" height="16px" alt="">0</span></div>
    </div>
    <div v-if="type=='4'">
      <span>{{mess}}</span>
      <el-button type="text" @click="talk">回复</el-button>
    </div>

    <!--好友-->
    <div v-if="type=='6'" style="display: flex;justify-content: space-between">
      <div style="display:flex;justify-content: flex-start">
        <div v-if="type=='6'"><img @click="toPerson" :src="imgUrl" width="40" height="40" style="border-radius:50%"></div>
        <div v-if="type=='6'" style="padding:5px 0 0 10px;"><span>{{name}}</span></div>
      </div>
     <div style="cursor: pointer">
       <span  @click="totalk">聊天</span>
       <span @click="deel" style="margin-left:20px;">删除好友</span>
     </div>
    </div>
    <!--加好友-->
    <div v-if="type=='9'" style="display:flex;justify-content: space-between;">
      <div>
        <div  style="display:flex;justify-content: flex-start;margin-bottom:10px;">
          <div ><img @click="toPerson" :src="imgUrl" width="40" height="40" style="border-radius:50%"></div>
          <div  style="padding:5px 0 0 10px;"><span>{{name}}</span></div>
        </div>
        <div style="margin-bottom:10px;">
          <span>附加消息:</span><span>{{content}}</span>
        </div>
      </div>
      <div v-show="isShow" style="line-height:88px;">
        <el-button type="primary" plain @click="agree">同意</el-button>
        <el-button type="primary" plain @click="refuse">拒绝</el-button>
        <el-button type="primary" plain @click="ignore">忽略</el-button>
      </div>
      <div v-show="!isShow" style="line-height:88px;color:#14c5ca">
        <span v-if="activeIndex == 1">已同意</span>
        <span v-if="activeIndex == 2">已拒绝</span>
      </div>
    </div>

    <!--评论-->
    <div v-if="type=='discuss'" v-show="isLogin"  style="margin:20px 0;" :style="{height:height,overflow:overflow}">
      <div style="text-align:left;display: flex;justify-content: flex-start">
        <div style="padding-top:10px;">
                 <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>

        </div>
        <div style="width:100%;margin-left:20px;" :model="review">
          <el-input  type="textarea"  :placeholder="replay" id='textarea' v-model="review.text" :autosize="{ minRows: 2}" @focus="textareaFocus" ></el-input>
        </div>
      </div>
      <div style="text-align: right;padding-right:20px;margin-top:20px;">
        <el-button type="primary" plain @click="abolish">取消</el-button><el-button type="primary"  plain :disabled="review.text == ''? true:false" @click="discuss">提交</el-button>
      </div>
    </div>

    <!--关注的人-->
    <div v-if="type=='love'" style="display:flex;justify-content: flex-start">
      <div >
        <LoadingImage type="user" @toPublish="toPerson" :src="imgUrl" style="width:48px;height:48px;"></LoadingImage>

      </div>
      <div style="padding:5px 0 0 10px;"><span>{{name}}</span></div>
      <div style="margin-left:400px;"><el-button type="primary" plain>关注</el-button></div>
    </div>

    <!--回复-->
    <div v-if="type=='replay'" style="display:flex;justify-content: space-between;font-size:14px;padding:10px 0;" @mouseenter="enter" @mouseleave="leave">
      <div style="display:flex;justify-content: flex-start">
        <div style="display: flex;justify-content: flex-start">
          <p style="color:#14c5ca"><b>{{name}}</b></p>&nbsp;回复给&nbsp;<p style="color:#14c5ca"><b>{{otherName}}</b></p>：
        </div>
        <div style="max-width:430px">{{mess}}</div>
      </div>
      <div style="display: flex;justify-content: flex-start">
        <p v-if="replayChoose && !isOwer" style="cursor: pointer" :style="{color:is_report?'#14c5ca':'#000'}"  @click="openInform">{{is_report? '已举报':'举报'}}·</p>
        <p style="margin: 0 0;cursor: pointer"  @click="talk" v-if="isLogin == true">{{isOwer? '删除':'回复'}}</p>
        <p v-if="replayChoose" >·<i class="iconfont icon-zan" style="width:16px;height:16px;" @click="parise" :style="{'color':is_praise?'#14c5ca':'#000'}"></i>{{parseNum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingImage from './loadingImg'
  import '../../static/css/zan/iconfont.css'
    export default {
        name: "person",
      props:['image','imgUrl','name','time','mess','type','activeName','local','address','content','isShow','activeIndex','replayChoose','review','height','overflow','isLogin','replay','otherName','parseNum','is_praise','isOwer','is_report'],
      data(){
          return {
            textarea: '',
            imgIndex:-1
          }
      },
      components:{
        LoadingImage
      },
      methods:{
        lookImage(item,index){
          this.$emit('lookImage',item.domain + item.image_url)
        },
        leaveImg(){
          this.imgIndex = -1
        },
        lookImg(item,index){
          if(this.imgIndex != index){
            this.imgIndex = index
          }
        },
        openInform(){
            this.$emit('openInform')
          },
        talk(){
            this.$emit('talk')
        },
        deel(){
            this.$emit('deel')
        },
        agree(){
            this.$emit('agree')
        },
        refuse(){
            this.$emit('refuse')
        },
        ignore(){
            this.$emit('ignore')
        },
        toRouter(){
            this.$router.push('/publishPage')
        },
        textareaFocus(){
          this.$emit('textareaFocus')
        },
        abolish(){
          this.$emit('abolish')
        },
        discuss(){
          this.$emit('discuss')
        },
        enter(){

        },
        leave(){

        },
        toPerson(){
          this.$emit('toPerson')
        },
        parise(){
          this.$emit('parise')
        },
        totalk(){
          this.$emit('totalk')
        },
      }
    }
</script>

<style scoped>
@import url('../../static/css/iconfont/iconfont.css');

</style>
