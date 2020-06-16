<template>
    <div>
      <el-container>
        <el-header><Head type="storyPage"></Head></el-header>
        <el-main>
          <div style="width:660px;margin:30px auto;">
            <div style="display:flex;justify-content: space-between;">
              <div style="display:flex;justify-content: flex-start;">
                <div><loadingImg type="6" :src="user.head_image? user.headimage.domain + user.headimage.image_url:''"  style="width:48px;height:48px;" v-on:toPublish="ALltoperson"></loadingImg></div>
                <div style="text-align:left;line-height:25px;margin-left:10px;"><span>{{(user.family_name+user.middle_name+user.name)?(user.family_name+user.middle_name+user.name):'匿名用户'}}</span><br><span style="font-size:13px;">{{create_time}}</span></div>
              </div>
              <div v-if="user.user_id != isOwer">
                <el-button v-if="attation == 0" style="width:98px;" @click="addAtention" plain>关注</el-button>
                <el-button v-if="attation == 1" style="width:98px;" type="primary" @click="addAtention" >已关注<i class="el-icon-check"></i></el-button>
              </div>
            </div>
            <div style="margin:30px 0;" v-for="item in imgList">
              <loadingImg type="2" :src="item.img" style="width:100%;height:100%"></loadingImg>
            </div>
            <div style="text-align:left;line-height:30px;">
              <h2 style="text-align: center" v-html="Xss(title)"></h2>
              <div style=" word-wrap:break-word;white-space:pre-wrap;text-indent: 2rem" v-html="Xss(content)"></div >
            </div>
            <div class="flexBetween" style="margin:30px 0 0;">
              <div>
                <el-button type="text" @click="getLove">{{loveList.length}}人已点赞</el-button>
              </div>
              <div>
                <el-button type="text" @click="openInform(1)">{{is_report?'已举报':'举报'}}</el-button>
              </div>
            </div>
            <div style="text-align:left;margin:30px 0;">
              <p style="border-bottom:1px solid #eee;margin: 20px 0;"></p>
              <div style="display:flex;justify-content: center;">
                <div class="share" @click="zan" style="line-height:105px;"><i  :style="{color:is_praise?'#008489':'#000'}" class="ad iconfont icon-dianzan"></i></div>
                <div class="share" @click="like"><i  :style="{color:is_collection?'red':'#000'}" class="shareI el-icon-star-on"></i></div>
              </div>
            </div>
            <div style="text-align:left;">
              <p><b>{{total}}条评论</b></p>
              <Person type="discuss" :isLogin="isLogin" :replay="firstreplay" :imgUrl="imgUrl" :overflow="firstoverflow" :review="review" :height="firstheight" v-on:textareaFocus="firsttextareaFocus" v-on:abolish="firstabolish" v-on:discuss="firstdiscuss"></Person>
              <div v-if="personList.length == 0" style="margin:20px 0;text-align: center">
                暂无评论！期待您的参与！
              </div>
              <div style="margin:20px 0;" v-for="(item,index) in personList">
                <Person type='story' v-on:toPerson="toPerson(item,index)" :isLogin="isLogin"  :is_report="item.is_report" :isOwer="item.user_id == isOwer? delet:isdelet" :imgUrl="item.user.head_image?item.user.headimage.domain + item.user.headimage.image_url:'../../../static/img/static/user.png'" :name="item.user.name?item.user.name:'匿名用户'" :time="item.create_time" :mess="item.content" :parseNum="item.praise_num" :is_praise="item.is_praise" v-on:parise="parise(item,index)" v-on:talk="talk(item,index)" v-on:openInform="openInform(item,index)"></Person>
                <div v-if="item.leavemsg.length" style="padding:10px;background-color:rgba(0,0,0,.05)" >
                  <div v-for="(items,indexs) in item.leavemsg"  style="border-bottom: 1px solid #000;">
                    <Person type="replay" v-on:openInform="openInform(items,indexs)" :isOwer="items.user_id == isOwer? delet:isdelet"  :isLogin="isLogin" v-on:talk="talk(items,index)" :jion="jion" :name="items.user.name?items.user.name:'匿名用户'" :otherName="items.topuser.name?items.topuser.name:'匿名用户'" :mess="items.content"  :replayChoose="replayChoose" v-on:enter="enter(indexs,items)" v-on:leave="leave(indexs,items)"></Person>
                  </div>
                  <p style="text-align: left;font-size:13px;color:#008489;padding:10px 0;"><span @click="toAllLeave(item,index)" style="cursor: pointer">共{{item.leaving_num}}条回复</span></p>
                </div>
                <hr style="margin:10px 0;border-bottom:1px solid #eee">
              </div>
              <div>
                <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
              </div>
            </div>
            <div v-show="storyList.length">
              <h3 class="marginBottom" style="text-align:left">相关故事</h3>
              <div class="flexWrap flexBetween">
                <div class="marginBottom" v-for="(item,index) in storyList">
                  <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :data="item" v-on:addZan="addZan(item,index)"></Detail>
                </div>
              </div>

            </div>
            <div v-if="isChat" style="z-index:999;position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.7)">
              <div style="box-shadow:0px 0px 21px 0px rgba(232,235,238,1);width:500px;padding: 30px;background-color: #fff;border-radius: 10px;">
                <Person type="discuss" :isLogin="isLogin" :replay="replay" :imgUrl="imgUrl" :review="review"  v-on:abolish="abolish" v-on:discuss="discuss"></Person>
              </div>
            </div>
            <div v-if="isLoading" style="z-index:990;position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.8)">
              <Loading></Loading>
            </div>
            <Bounced v-show="isInform" type="inform" v-on:closeInform="closeInform" :informList="informList" :changeReason="changeReason" v-on:informAblish="informAblish" :informReason="informReason" v-on:changeForm="changeForm" v-on:informSend="informSend"></Bounced>
            <Bounced v-show="isLike" type="like" v-on:addWish="addwish" v-on:addWishName="addWishName" v-on:save="save" :wishList="wishList"  :newWish="newWish" @getName="getName" v-on:closeWish="closeWish" ></Bounced>
            <Bounced v-show="isLove" type="love" :isOwer="isOwer"  v-on:closeLove="closeLove" :loveList="loveList" v-on:takeAttention="takeAttention" ></Bounced>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import Detail from "../../public/detail.vue"
  import Person from "../../public/person.vue"
  import Head from "../../public/head.vue"
  import Bounced from '../../public/bounced.vue'
  import Bus from '../../assets/eventBus'
  import '../../../static/css/praise/iconfont.css'
  import Loading from '../../public/Loading'
  import loadingImg from '../../public/loadingImg'
    export default {
        name: "storyPage",
      components:{
          Head,
        Person,
        Detail,
        Bounced,
        Loading,
        loadingImg
      },
      data(){
          return{
            api: this.GLOBAL.baseURL,
            attation:0,
            user:'',
            imgList:[],
            create_time:'',
            value:5,
            imgUrl:'',
            firstoverflow:'hidden',
            overflow:'hidden',
            height:'75px',
            status:0,
            review:{
              text:'',
            },
            title:'',
            content:'',
            isLike:false,
            isLogin:true,
            isInform:false,
            changeReason:true,
            informReason:{
              text:''
            },
            isLove:false,
            changeTime:'',
            replay:'说点什么...',
            firstreplay:'说点什么...',
            firstheight:'75px',
            time:2,
            storyId:'',
            loveList:[],
            personList:[],
            storyList:[],
            wishList:[],
            newWish:false,
            wishNamea:'',
            wishIndex:0,
            saveIndex:-1,
            is_praise:'',
            informList:[],
            is_collection:'',
            jion:'1',
            total:0,
            isOwer:'',
            delet:true,
            isdelet:false,
            is_report:'',
            isLoading:false,
            replayChoose:'',
            isChat:false,
          }
      },
      watch:{
        wishNamea:function(){
          Bus.$emit('returnName',this.wishNamea)
        },
        storyId:function(){
          this.replayChoose = ''
          window.scroll(0,0)
          this.getComment(1)
          this.onLoading()
          this.getStory()
          this.lookStory()
          this.sendBuidu()
        }
      },
      methods:{
        sendBuidu(){
          if(window.location.href.indexOf('.top') == -1 && window.location.href.indexOf('localhost') == -1){
            this.$http.post(this.api + '/BaiduPush',{
              token: localStorage.getItem('token'),
              url: encodeURIComponent(window.location.href)
            })
              .then(res=>{
                if(res.data.code == 1){
                }else if(res.data.code == 3){
                  this.sendBuidu()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        toPerson(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.user.user_id
            }
          })
        },
        toAllLeave(a){
          localStorage.setItem('leave',JSON.stringify(a))
          this.$http.post(this.api + '/LeaveL',{
            token: localStorage.getItem('token'),
            flag: 5,
            order:1,
            page: 1,
            table_id: a.msg_id
          })
            .then(res=>{
              if(res.data.code == 1){
                a.leavemsg = res.data.data.data
                this.replayChoose = true
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.toAllLeave(a)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toStory(item,index){
          this.storyId = item.story_id
        },
        closeLove(){
          this.isLove = false
        },
        zan(){
          if(localStorage.getItem('isLogin')){
            let type= ''
            if(this.is_praise){
              type = 2
            }else{
              type = 1
            }
            this.$http.post(this.api + '/home/Comment/praise',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: this.storyId,
              type: type
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.is_praise = type == 2? 0:1
                  this.onLoading()
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.zan()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.$message({
              type: 'error',
              message: '您还没有登陆！'
            })
          }

          },
        closeWish(){
          this.isLike = false
        },
        openInform(item,index){
          if(localStorage.getItem('isLogin')){
            if(item != 1){
              if(item.is_report){
                alert('您已经举报了！')
              }else{
                localStorage.setItem('msg_id',item.msg_id)
                this.isInform = true
                this.getInform()
              }
            }else{
              if(this.is_report){
                alert('您已经举报了！')
              }else{
                this.isInform = true
                this.getInform()
              }
            }
          }else{
            this.$message({
              type: 'error',
              message: '您还没有登陆！'
            })
          }

        },
        //点赞
        addZan(item,index){
          if(item.is_praise == 0){
            this.$http.post(this.api + '/home/Comment/praise',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: item.story_id,
              type: 1
            })
              .then(res=>{
                if(res.data.code == 1){
                  item.is_praise = 1
                  item.zan = item.zan + 1
                }else if(res.data.code == 3){

                     this.addZan(item,index)
      
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })

          }else{
            this.$http.post(this.api + '/home/Comment/praise',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: item.story_id,
              type: 2
            })
              .then(res=>{
                if(res.data.code == 1){
                  item.zan = item.zan - 1
                  item.is_praise = 0
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.addZan(item,index)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        firsttextareaFocus(){
          this.firstheight = 'auto'
          this.firstoverflow= 'none'
        },
        firstabolish(){
          this.review.text = ''
          this.firstheight = '75px'
          this.firstoverflow= 'hidden'
          this.firstreplay = '说点什么...'
        },
        abolish(){
          this.isChat = false
          this.review.text = ''
          this.height = '75px'
          this.overflow= 'hidden'
          this.replay = '说点什么...'
        },
        getLove(){
          this.isLove = true
          this.onLoading()
        },
        onLoading(){
          this.$http.post(this.api + '/storyp',{
            token: localStorage.getItem('token'),
            story_id: this.storyId
          })
            .then(res=>{
              if(res.data.code == 1){
                this.loveList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.onLoading()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        deleteLeave(a,b){
          this.$http.post(this.api + '/home/Comment/del_leavemsg',{
            token: localStorage.getItem('token'),
            msg_id: a.msg_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type: 'success',
                  message:'删除评论成功！'
                })
                this.getComment(this.pager)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deleteLeave(a,b)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        talk(a,b){
          if(a.user_id == this.isOwer){
            this.$confirm('此操作将删除您的留言, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteLeave(a,b)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else{
            this.isChat = true
            this.replay = '回复给' + a.user.name
            localStorage.setItem('msg_id',a.msg_id)
          }
        },
        firstdiscuss(){
          if(!this.review.text){
            this.$message({
              type: 'info',
              message: '请填写评论内容'
            })
          }else{
            this.$http.post(this.api + '/home/Comment/save_leavemsg',{
              token: localStorage.getItem('token'),
              flag: 2,
              table_id: this.storyId,
              content:  this.review.text
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.review.text = ''
                  this.$message({
                    message:'评论成功',
                    type:'success'
                  })
                  this.getComment(1)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.firstdiscuss()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        discuss(){
          if(!this.review.text){
            this.$message({
              type: 'info',
              message: '请填写评论内容'
            })
          }else{
              this.$http.post(this.api + '/home/Comment/save_leavemsg',{
                token: localStorage.getItem('token'),
                flag: 5,
                content: this.review.text,
                table_id: localStorage.getItem('msg_id')
              })
                .then(res=>{
                  if(res.data.code == 1){
                    localStorage.removeItem('msg_id')
                    this.isChat = false
                    this.review.text = ''
                    this.$message({
                      message:'评论成功',
                      type:'success'
                    })
                    this.getComment(this.pager)
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.discuss()
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
          }
        },
        changeForm(){
          this.changeReason = false
        },
        informAblish(){
          this.changeReason = true
        },
        lookStory(){
          this.isLoading = true
          this.$http.post(this.api + '/home/Story/get_story',{
            token: localStorage.getItem('token'),
            story_id: this.storyId,
            visit: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                let b = [];
                for(let i =0;i<data.image.length;i++){
                  b.push({img:data.image[i].domain + data.image[i].image_url})
                }
                this.imgList = b
                this.user = data.user
                this.is_praise = data.is_praise
                this.create_time = data.create_time
                this.content = data.content
                this.title = data.title
                this.is_collection = data.is_collection
                if(data.user.is_attention){
                  this.attation = 1
                }else{
                  this.attation = 0
                }
                this.is_report = data.is_report
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/hoem/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.lookStory()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        addAtention(){
          if(localStorage.getItem('isLogin')){
            let type = ''
            if(this.attation){
              type = 2
            }else{
              type = 1
            }
            this.$http.post(this.api + '/home/Comment/attention',{
              token: localStorage.getItem('token'),
              att_user_id: this.user.user_id,
              type: type,
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.attation = type == 2? 0:1
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.addAtention()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            alert('您还没有登陆')
          }
        },
        like(){
          if(localStorage.getItem('isLogin')){
            this.isLike = !this.isLike
            this.getRevie()
          }else{
            this.$message({
              type: 'error',
              message: '您还没有登陆！'
            })
          }
        },
        getRevie(){
          this.$http.post(this.api + '/home/Comment/collegroup_list',{
            token: localStorage.getItem('token'),
            table_id: this.storyId,
            flag: 2
          })
            .then(res=>{
              if(res.data.code == 1){
                this.wishList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getRevie()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })

        },
        addwish(){
          if(this.wishIndex == 0){
            this.newWish = true
            this.wishIndex = -1
          }else{
            this.newWish = false
            this.wishIndex = 0
          }
        },
        addWishName(){
          if(this.wishNamea == ' '||this.wishNamea.split(' ').join("").length == 0){
            this.$message({
              type:'error',
              message: '保存心愿单的过程中遇到了问题，请重试。'
            })
          }else{
            this.$http.post(this.api + '/home/Comment/add_collegroup',{
              token: localStorage.getItem('token'),
              group_name: this.wishNamea
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.wishNamea = ''
                  this.getRevie();
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.addWishName()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })

          }
        },
        save(item,index){
          if(item.is_this_colle == 1){
            this.$http.post(this.api + '/home/Comment/collection',{
              token: localStorage.getItem('token'),
              flag: 2,
              table_id: this.storyId,
              group_id: item.group_id,
              type: 2
            })
              .then(res=>{
                if(res.data.code == 1){
                  let a=[]
                  item.is_this_colle = 0
                  for(let i =0;i<this.wishList.length;i++){
                    if(this.wishList[i].is_this_colle == 0){
                      a.push(i)
                      if(a.length == this.wishList.length){
                        this.is_collection = 0
                      }
                    }
                  }
                }else if(res.data.code == 1){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.save(item,index)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Comment/collection',{
              token: localStorage.getItem('token'),
              flag: 2,
              table_id: this.storyId,
              group_id: item.group_id,
              type: 1
            })
              .then(res=>{
                if(res.data.code == 1){
                  item.is_this_colle = 1
                  this.is_collection = 1
                }else if(res.data.code == 1){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        getName(data){
          this.wishNamea = data
        },
        getInform(){
          this.$http.post(this.api + '/home/Activity/question',{
            token: localStorage.getItem('token'),
            flag: 6
          })
            .then(res=>{
              if(res.data.code == 1){
                this.informList = []
                for(let i = 0;i<res.data.data[0].option.length;i++){
                  let a = res.data.data[0].option[i].name.split('/')
                  this.informList.push({name: a[0],content:a[1],option_id:res.data.data[0].option[i].option_id})
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getInform()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        closeInform(item){
          let a = localStorage.getItem('msg_id')
          if(a){
            if(item){
              this.$http.post(this.api + '/ReportU',{
                token: localStorage.getItem('token'),
                flag: 4,
                table_id: a,
                option_id: item.option_id
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.isInform = false
                    this.$message({
                      type:'success',
                      message:'提交成功'
                    })
                    this.getComment(this.pager)
                    localStorage.removeItem('msg_id')
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.closeInform(item)
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              this.isInform = false
              localStorage.removeItem('msg_id')
            }
          }else{
            if(item){
              this.$http.post(this.api + '/ReportU',{
                token: localStorage.getItem('token'),
                flag: 3,
                table_id: this.storyId,
                option_id: item.option_id
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.isInform = false
                    this.$message({
                      type:'success',
                      message:'提交成功'
                    })
                    this.is_report = '1'
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.closeInform(item)
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              this.isInform = false
            }
          }
        },
        informSend(){
          let a = localStorage.getItem('msg_id')
          if(a){
            if(this.informReason.text.trim().length <= 0){
              this.$message({
                type:'error',
                message: '请填写您的理由'
              })
            }else{
              this.$http.post(this.api + '/ReportU',{
                token: localStorage.getItem('token'),
                flag: 4,
                table_id: a,
                content: this.informReason.text
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.isInform = false
                    this.informReason.text = ''
                    this.changeReason = true
                    this.$message({
                      type:'success',
                      message:'提交成功'
                    })
                    localStorage.removeItem('msg_id')
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.informSend()
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }
          }else{
            if(this.informReason.text.trim().length <= 0){
              this.$message({
                type:'error',
                message: '请填写您的理由'
              })
            }else{
              this.$http.post(this.api + '/ReportU',{
                token: localStorage.getItem('token'),
                flag: 3,
                table_id: this.storyId,
                content: this.informReason.text
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.isInform = false
                    this.informReason.text = ''
                    this.changeReason = true
                    this.$message({
                      type:'success',
                      message:'提交成功'
                    })
                  }else if(res.data.code == 3){
                    this.$http.post(this.api + '/home/index/token')
                      .then(res=>{
                        localStorage.setItem('token',res.data.data)
                        this.informSend()
                      })
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }
          }

        },
        takeAttention(item,index){
          if(localStorage.getItem('isLogin')){
            let type = ''
            if(item.is_attention){
              type = 2
            }else{
              type = 1
            }
            this.$http.post(this.api + '/home/Comment/attention',{
              token: localStorage.getItem('token'),
              att_user_id: item.user_id,
              type: type,
            })
              .then(res=>{
                if(res.data.code == 1){
                  item.is_attention = type == 2? 0:1
                  if(this.user.user_id == item.user_id){
                    this.attation = type == 2? 0:1
                  }
                }else if(res.data.code == 3){
                 this.$http.post(this.api + '/home/index/token')
                   .then(res=>{
                     localStorage.setItem('token',res.data.data)
                     this.takeAttention(item,index)
                   })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        //获取评论
        getComment(val){
          this.$http.post(this.api + '/LeaveL',{
            token: localStorage.getItem('token'),
            table_id:this.storyId,
            flag: 2,
            order: 1,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                this.personList = data
                this.total = res.data.data.total
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getComment(val)
                  })
              }else if(res.data.cdoe == 0){
                alert(res.data.msg)
              }
            })
        },
        handleCurrentChange(val){
          this.pager = val
          this.getComment(val)
        },
        //相似故事
        getStory(){
          this.$http.post(this.api + '/storys',{
            token: localStorage.getItem('token'),
            story_id: this.storyId
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.storyList = data
              }else if(res.data.code == 3){

         
                    this.getStory()
 
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })

        },
        //评论点赞
        parise(item,index){
          let type=''
          if(item.is_praise){
            type = 2
          }else{
            type = 1
          }
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: 4,
            table_id: item.msg_id,
            type: type
          })
            .then(res=>{
              if(res.data.code == 1){
                item.is_praise = type == 2? 0 : 1
                item.praise_num = type == 2? item.praise_num - 1 : item.praise_num +1
              }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   localStorage.setItem('token',res.data.data)
                   this.parise(item,index)
                 })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        //查询用户
        getOwer(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data[0]
                this.imgUrl = data.head_image? data.headimage.domain + data.headimage.image_url : '../../../static/img/static/user.png'
                this.isOwer = data.user_id
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOwer()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toperson(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.userId
            }
          })
        },
        ALltoperson(){
          this.$router.push({
            path: '/userdata',
            query: {
              information: this.user.user_id
            }
          })
        }
      },
      mounted(){
          window.scroll(0,0)
          let _this = this
          if(localStorage.getItem('isLogin')){
            _this.isLogin = true
            _this.getOwer()
          }else{
            _this.isLogin = false
          }
      },
      created() {

        this.storyId = this.$route.query.information
        window.scroll(0,0)
      }
    }
</script>

<style scoped>
  a{
    color:#008489;
  }
  .share{
    width:105px;
    height:105px;
    border-radius:50%;
    background-color:#f9f9f9;
    cursor: pointer
  }
  .shareI{
    font-size:24px;margin:40px;color:#000
  }
  .ad{
    font-size:24px;margin:0 40px;color:#000
  }
</style>
