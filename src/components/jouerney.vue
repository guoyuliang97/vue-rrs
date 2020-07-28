<template>
    <div>
      <Head type="jouerney"  v-on:reload="reload" ></Head>
      <div style="margin: 80px auto;width:1080px;">
        <div v-if="goONList.length">
          <div style="display: flex;justify-content: space-between;text-align: left;margin:20px 0;font-size:20px;">
            <div style="font-weight: bold">正在进行的体验</div>
          </div>
          <hr style="color:#339da1;">
          <div style="width:1080px;overflow: hidden;height:340px;position: relative" >
            <div style="position:absolute;overflow: hidden;transition: all .3s linear;" :style="{left:goLeft + 'px',width:goONList.length * 360 + 'px'}">
              <el-col style="width:300px;margin:30px 30px;text-align:left;float:left"  v-for="(item,index) in goONList" >
                <el-card :body-style="{ padding: '0px'}" >
                  <loadingImg  type="2" :src="item.cover.domain+item.cover.image_url" class="image" v-on:toPublish="toPublish(item,index)" ></loadingImg>
                  <div style="padding: 14px;">
                    <div style="display: flex;justify-content: space-between">
                      <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">{{item.title}}</div>  <div class="button" @click="contact(item,index)">联系策划人</div>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">{{ item.activ_begin_time }}—{{item.activ_end_time}}</time>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="prev">
              <el-button style="background-color:#fff;color:#14c5ca;border: 2px solid #14c5ca;" v-show="goONIndex"   icon="el-icon-arrow-left" circle @click="prevGoon"></el-button>
            </div>
            <div class="next">
              <el-button style="background-color:#fff;color:#14c5ca;border: 2px solid #14c5ca;" v-if="goONIndex<goONList.length -3" icon="el-icon-arrow-right" circle @click="nextGoon"></el-button>
            </div>
          </div>
          <div v-if="goMore && goONList.length>=10" style="text-align: left"><span @click="lookMore(1)">查看更多</span></div>
        </div>
        <div v-if="orderList.length">
          <div style="display: flex;justify-content: space-between;text-align: left;margin:20px 0;font-size:20px;">
            <div style="font-weight: bold">即将参加的体验</div>
          </div>
          <hr style="color:#339da1;">
          <div style="width:1080px;overflow: hidden;height:340px;position: relative" >
            <div style="position:absolute;overflow: hidden;transition: all .3s linear;" :style="{left:left + 'px',width:orderList.length * 360 + 'px'}">
              <el-col style="width:300px;margin:30px 30px;text-align:left;float:left"  v-for="(item,index) in orderList" >
                <el-card :body-style="{ padding: '0px'}" >
                  <loadingImg  type="2" :src="item.cover.domain+item.cover.image_url" class="image" v-on:toPublish="toPublish(item,index)" ></loadingImg>
                  <div style="padding: 14px;">
                    <div style="display: flex;justify-content: space-between">
                      <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">{{item.title}}</div>  <div class="button" @click="contact(item,index)">联系策划人</div>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">{{ item.activ_begin_time }}—{{item.activ_end_time}}</time>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="prev">
              <el-button style="background-color:#fff;color:#14c5ca;border: 2px solid #14c5ca;" v-show="sliderIndex"   icon="el-icon-arrow-left" circle @click="prevIndex"></el-button>
            </div>
            <div class="next">
              <el-button style="background-color:#fff;color:#14c5ca;border: 2px solid #14c5ca;" v-if="sliderIndex<orderList.length -3" icon="el-icon-arrow-right" circle @click="nextIndex"></el-button>
            </div>
          </div>
          <div v-if="jionMore && orderList.length >= 10" style="text-align: left"><span @click="lookMore(2)">查看更多</span></div>
        </div>
        <div v-if="overList.length">
          <div style="text-align:left;margin: 20px 0;font-size:20px;font-weight:bold">已参加的体验</div>
          <hr style="color:#339da1;">
          <el-row style="display:flex;flex-wrap:wrap;">
            <el-col style="width:300px;margin:30px 30px;text-align:left;font-size:12px;"  v-for="(item,index) in overList" >
              <el-card :body-style="{ padding: '0px'}">
                <loadingImg type="2"  v-on:toPublish="look(item,index)" :src="item.cover.domain + item.cover.image_url" class="image" ></loadingImg>
                <div style="padding: 14px;">
                  <div style="display: flex;justify-content: space-between">
                    <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">{{item.title}}</div><div class="button" @click="item.isevaluate == 1?discuss(item,index):''">{{item.isevaluate == 1? '立即评价':'已评价'}}</div>
                  </div>
                  <div class="bottom clearfix" style="display: flex;justify-content: space-between">
                    <time class="time">{{ item.activ_begin_time }}—{{item.activ_end_time}}</time> <div class="button" @click="contact(item,index)">联系策划人</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div v-if="takeMore && overList.length>=10" style="text-align: left"><span @click="lookMore(3)">查看更多</span></div>
        </div>
        <Chat v-if="isChat"  v-on:chat="chat" :userUrl="imgUrl"  :to_user_id="userId" :isOwer="isOwer" :userName="userName" :other_img="userImg"></Chat>
        <div v-if="isGoIng && isWill && isPass" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.8);z-index:1;display: flex;justify-content: center;align-items: center">
          <Loading></Loading>
        </div>
        <div v-if="!goONList.length&& !overList.length && !orderList.length ">
          <None type="jouney"></None>
        </div>
        <Foot></Foot>
      </div>
    </div>
</template>

<script>
  import Loading from '../public/Loading'
  import Chat from '../public/chat'
  import None from '../public/noNumber'
  import '../../static/css/warn/iconfont.css'
  import Foot from "../public/foot.vue"
  import Head from "../public/head.vue"
  import loadingImg from '../public/loadingImg'
    export default {
        name: "jouerney",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            orderList:[],
            overList:[],
            goONList:[],
            activeIndex: -1,
            visible2: false,
            visible3: false,
            checkList:[],
            radio2:'',
            reason:"",
            idea:'',
            unsubscribe:false,
            sliderIndex:0,
            goONIndex:0,
            left:0,
            goLeft:0,
            isOver:false,
            isOrder:false,
            isChat:false,
            imgUrl:'',
            userId:'',
            userName:'',
            userImg:'',
            isGoIng:true,
            isWill:true,
            isPass: true,
            goMore:false,
            jionMore:false,
            takeMore:false,
            goindex:1,
            willIndex:1,
            overIndex:1
          }
      },
      components:{
          Head,
        Foot,
        None,
        loadingImg,
        Chat,
        Loading
      },
      methods:{
        lookMore(val){
          if(val == 1){
            this.getJouney(this.goindex)
          }else if(val == 2){
            this.getGon(this.willIndex)
          }else{
            this.getoverJ(this.overIndex)
          }
        },
          //立即评价
        discuss(item,index){
          localStorage.setItem('dis','Orderevaluate')
          this.$router.push({
            path: '/Orderevaluate',
            query:{
              order_id: item.order_id
            }
          })
        },
        look(item,index){
          this.$router.push({
            path:'/publishPage',
            query:{
              information: item.activity_id
            }
          })
        },
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query:{
              information: item.activity_id
            }
          })
        },
        refer(){
          this.$message({
            message:'申请退订成功',
            type:'success'
          })
          this.activeIndex = -1
        },
        disputes(){
          this.$router.push('/Disputes')
        },
        getoverJ(val){
          this.$http.post(this.api + '/vipact',{
            token: localStorage.getItem('token'),
            iscomplete: 2,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.data.length){
                  for(let i = 0;i<res.data.data.data.length;i++){
                    this.overList.push(res.data.data.data[i])
                  }
                  this.isOver = false
                  this.takeMore = true
                    this.overIndex++
                }else{
                  this.isOver = true
                  this.takeMore = false
                }
                this.isGoIng = false
              }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   localStorage.setItem('token',res.data.data)
                   this.getoverJ(val)
                 })
              }else if(res.data.code == 0){
                this.isGoIng = false
                alert(res.data.msg)
              }
            })
        },
        getGon( val){
          this.$http.post(this.api + '/vipact',{
            token: localStorage.getItem('token'),
            iscomplete: 0,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.data.length){
                  for(let i = 0;i<res.data.data.data.length;i++){
                    this.orderList.push(res.data.data.data[i])
                  }

                  this.isOrder = false
                  this.jionMore = true
                   this.willIndex++
                }else{
                  this.isOrder = true
                  this.jionMore = false
                }
                this.isWill = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getGon(val)
                  })
              }else if(res.data.code == 0){
                this.isWill = false
                alert(res.data.msg)
              }
            })
        },
        getJouney( val){
          this.$http.post(this.api + '/vipact',{
            token: localStorage.getItem('token'),
            iscomplete: 1,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.data.length){
                  for(let i = 0;i<res.data.data.data.length;i++){
                    this.goONList.push(res.data.data.data[i])
                  }
                  this.isOrder = false
                  this.goMore = true
                  this.goindex++
                }else{
                  this.isOrder = true
                  this.goMore = false
                }
                this.isPass = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getJouney(val)
                  })
              }else if(res.data.code == 0){
                this.isPass = false
                alert(res.data.msg)
              }
            })
        },
        prevGoon(){
          this.goONIndex -= 1
          this.goLeft += 360
        },
        nextGoon(){
          this.goONIndex += 1
          this.goLeft -= 360
        },
        prevIndex(){
          this.sliderIndex -= 1
          this.left += 360
        },
        nextIndex(){
          this.sliderIndex += 1
          this.left -= 360
        },
        //联系策划人
        chat(){
          this.isChat = false
        },
        contact(item,index){
          this.userName = item.act_user.family_name + item.act_user.middle_name + item.act_user.name
          this.userId = item.act_user.user_id
          this.userImg = item.act_user.head_image? item.act_user.headimage.domain + item.act_user.headimage.image_url:'../../static/img/static/user.png'
          this.isChat = true
        },
        reload(res){
          let data = res.data.data[0]
          this.isOwer = data.user_id
          this.imgUrl = data.head_image?data.headimage.domain + data.headimage.image_url:'../../static/img/static/user.png'
        }
      },
      mounted(){
          this.getJouney(this.goindex)
        this.getoverJ( this.overIndex)
        this.getGon( this.willIndex)
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    color:#246e71;
    font-size:12px;
    cursor: pointer;
    width:75px;
    text-align: center;
  }

  .image {
    width: 100%;
    height:200px;
    display: block;
    cursor: pointer;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .prev{
    position:absolute;
    top: 40%;
    left:10px;
  }
  .next{
    position:absolute;
    top: 40%;
    right:10px
  }


</style>
