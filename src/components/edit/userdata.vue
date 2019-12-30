<template>
	<div class="userdata">
		<Head type="edit" v-on:getVal="getVal"  :content="editSearch" v-on:search="searchHome"></Head>
		<div v-if="dataForm"  class="userdata_container">
			<div class="userdata_con title_flex">
				<div class="userdata_left">
					<div class="userdata_left_top">
						<div class="userdata_left_avator" :style="{backgroundImage:'url('+imgUrl +')',backgroundSize:'100% 100%'}"></div>
						<p class="userdata_left_username"><span>{{dataForm.family_name +dataForm.middle_name+dataForm.name?dataForm.family_name +dataForm.middle_name+dataForm.name:'匿名用户'}}</span></p>
            <p class="about_userdata"></p>
            <p class="about_userdata">{{sexA[parseInt(dataForm.six)].label}}&nbsp;&nbsp;<span v-if="dataForm.isplanner == 1 && dataForm.audit_face == 2" class="who">策划者</span><span v-if="dataForm.isvolunteer == 1 && dataForm.audit_idcard" class="who">志愿者</span><span v-if="dataForm.isplanner == 0&&dataForm.isvolunteer == 0" class="who">游客</span></p>
            <p class="about_userdata"></p>
            <p class="about_userdata">信誉分:{{dataForm.credit_score}}</p>
            <p class="about_userdata">
              <span v-if="statu == 0" style="text-decoration: none;color:#008489;cursor: pointer;font-size:10px">
               <span @click="toPlayer" v-if="dataForm.audit_face != 2 && dataForm.audit_face != 1">成为策划者 </span> <span  @click="sendVolun" v-if="dataForm.isvolunteer != 1 || dataForm.audit_idcard !=1">成为志愿者</span></span>
              <span v-show="isFriend" @click="addFriend = true" style="text-decoration: none;color:#008489;cursor: pointer"><i class="el-icon-plus"></i>加好友</span>
            </p>
						<ul class="userdata_lists">

							<li @click="lookZan(1)" style="cursor: pointer">获赞: {{dataForm.praise_num}}</li>
							<li  @click="lookZan(2)" style="cursor: pointer">粉丝: {{dataForm.fans_num}}</li>
      <li @click="lookZan(3)" style="cursor: pointer">关注: {{dataForm.attention_num}}</li>
							<li style="cursor: pointer">策划: {{dataForm.activ_num}}</li>
							<li style="cursor: pointer">志愿: {{dataForm.volun_num}}</li>
						</ul>
					</div>
					<div class="userdata_left_second">
						<div>
							<el-collapse v-model="activeNames" @change="handleChange" style="border-top: none;">
							  <el-collapse-item title="已验证消息" name="1" style="margin-top: 10px;line-height:40px;">
								  <p v-show="dataForm.audit_idcard">身份证<i class="el-icon-circle-check lr"></i></p>
                  <p v-show="dataForm.audit_face == 2">真人照片验证<i class="el-icon-circle-check lr"></i></p>
                  <p v-show="dataForm.audit_face == 2">策划人验证<i class="el-icon-circle-check lr"></i></p>
                  <p v-show="dataForm.audit_idcard && dataForm.audit_face != 2">普通身份验证<i class="el-icon-circle-check lr"></i></p>
								  <p v-show="dataForm.email">电子邮件<i class="el-icon-circle-check lr"></i></p>
                  <p v-show="dataForm.mobile">手机号<i class="el-icon-circle-check lr"></i></p>
                  <p v-show="dataForm.idcard_z">护照<i class="el-icon-circle-check lr"></i></p>
							  </el-collapse-item>
							  <el-collapse-item title="关于我" name="2">
							  	<h3>工作</h3>
                  <p>{{dataForm.work?dataForm.work:'私密'}}</p>
							  	<h3>语言</h3>
                  <p><span>{{langusgeList[dataForm.language].label}}</span>/<span v-if="other_laguage.length" v-for="(item,index) in other_laguage">{{item == langusgeList[item].value?langusgeList[item].label:''}},</span><span v-if="!other_laguage">私密</span></p>
							  </el-collapse-item>
							  <el-collapse-item title="问题反馈" name="3">
								 <p @click="toReturn">问题反馈</p>
							  </el-collapse-item>
							</el-collapse>
						</div>
					</div>
				</div>
        <div>
          <div v-if="!isProblem" class="userdata_right">
            <div style="line-height:40px;">
              <div style="font-size: 30px;font-weight: bold">
                {{dataForm.family_name +dataForm.middle_name+dataForm.name?'您好，我是'+dataForm.family_name +dataForm.middle_name+dataForm.name:'您好，我是匿名用户'}}
              </div>
              <p><b>{{dataForm.city?dataForm.city:''}},{{dataForm.country?dataForm.country+'·':''}}注册时间：{{dataForm.create_time}} </b></p>
              <div style="text-indent: 2rem">
                {{dataForm.introduce}}
              </div>
              <el-button v-if="who" type="text" @click="openInform">举报此用户</el-button>
              <el-button v-if="!who" type="text" @click="userData = true">点此编辑</el-button>
              <el-button type="text" @click=""><span style="background-color:#ffb400;color:#fff;padding:5px;border-radius:5px;"><b>{{playTotal + comAll}}</b></span>&nbsp;&nbsp;条评价</el-button>
              <el-button type="text" @click="" v-show="dataForm.idcard_f || dataForm.idcard_z"><img src="../../../static/img/story/ok.jpg" width="32" height="32" style="position:absolute;margin-top:-10px;"><span style="margin-left:40px;">已验证</span></el-button>
            </div>
            <div v-show="wishList.length">
              <h2>{{userId?'Ta':'我'}}的心愿单<span style="font-weight:normal;font-size:15px;">{{'('+ wishList.length+')'}}</span></h2>
              <div style="display:flex;flex-wrap: wrap;margin:20px 0;">
                <div class="wishMargin" v-for="(item,index) in wishList" style="position:relative;width:250px;height:200px;cursor: pointer" :style="{'background-color':item.cover == ''? 'rgba(0,0,0,.8)':''}">
                  <div @click="toList(item,index)" style="width:250px;height:200px;overflow: hidden"><LoadingImg type="3" :src="item.cover.domain + item.cover.image_url" style="width:250px;height:200px;overflow: hidden"></LoadingImg></div>
                  <div style="position:absolute;bottom:10px;left:10px">
                    <span style="color:#FFF;font-weight: bold">{{item.group_name}}</span><br>
                    <span style="color:#fff;font-weight:bold">{{item.count}}个心愿</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="experienceList.length">
              <h2>{{userId?'Ta':'我'}}创建的体验<span style="font-weight:normal;font-size:15px;">{{'(' + experienceList.length+ ')'}}</span></h2>
              <div style="display:flex;flex-wrap: wrap;margin:20px 0;line-height:20px;">
                <div v-for="(item,index) in experienceList" style="width:250px;margin:10px 10px 10px 0;position: relative;overflow: hidden" @click="toAlter(item,index)" >
                  <div>
                    <LoadingImg type="3" :src="item.cover?item.cover.domain + item.cover.image_url:''"   style="width:250px;height:200px;cursor: pointer;overflow: hidden"></LoadingImg>
                  </div>
                  <div style="font-size:14px;position: absolute;bottom:0;color:#fff;background-color: rgba(0,0,0,.8);width:240px;padding:0 0 0 10px;">
                    <span v-for="items in item.kind"><span>/{{items.kind_name}}</span></span>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.title}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="jionList.length">
              <h2>{{userId?'Ta':'我'}}参加过的体验<span style="font-weight:normal;font-size:15px;">{{'('+jionList.length+')'}}</span></h2>
              <div style="display:flex;justify-content: flex-start;margin:20px 0;line-height:20px;flex-wrap: wrap">
                <div v-for="(item,index) in jionList"  @click="toAlter(item,index)"  style="width:250px;margin: 10px 10px 10px 0;line-height:20px;font-size:14px;position: relative;overflow: hidden">
                  <div>
                    <LoadingImg type="3" :src="item.cover?item.cover.domain + item.cover.image_url:''" style="width:250px;height:200px;cursor: pointer;overflow: hidden"></LoadingImg>
                  </div>
                  <div style="font-size:14px;position: absolute;bottom:0;color:#fff;background-color: rgba(0,0,0,.8);width:240px;padding:0 0 0 10px;">
                    <span v-for="items in item.kind"><span>/{{items.kind_name}}</span></span>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.title}}</p>
                  </div>
                </div>
              </div>
              <div v-if="addMore" @click="lookMore">查看更多</div>
            </div>
            <div v-show="storyList.length">
              <h2>{{userId?'Ta':'我'}}的故事<span style="font-weight:normal;font-size:15px;">{{'('+storyList.length +')'}}</span></h2>
              <div style="display:flex;flex-wrap:wrap;margin:20px 0;">
                <div class="storyaList" v-for="(item,index) in storyList" @click="toStory(item,index)" >
                  <LoadingImg type="3" :src="item.cover?item.cover.domain + item.cover.image_url:''" style="width:250px;height:250px;border-radius: 10px;overflow: hidden"></LoadingImg>
                  <div style="position:absolute;margin-top:-40px;margin-left:197px;"><span style="padding:5px;background-color:#fff;border-radius:5px;">故事</span></div>
                  <p style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis">{{item.title}}</p>
                  <div style="font-size:14px;display: flex;justify-content: space-between">
                    <div>{{item.country +' '+item.province+ ' '}}</div>&nbsp;&nbsp;<div><span  v-for="(items,indexs) in item.kind">{{items.kind_name}}/</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>评价<span style="font-size:15px;">({{playTotal + comAll}})</span></h2>
              <!--<Person  style="padding-right:20px" type="discuss" :isLogin="isLogin"  :replay="replay" :imgUrl="imgUrl" :overflow="overflow" :review="review" :height="height" v-on:textareaFocus="textareaFocus" v-on:abolish="abolish" v-on:discuss="discuss"></Person>-->
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="游客评价" name="first">
                  <div v-for="(item,index) in commonetList" style="font-size:12px;padding:13px 0;border-bottom: 1px solid #E6E6E6">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;justify-content: flex-start">
                        <div>
                          <img @click="toPerson(item,index)" :src="item.image_url?item.domain+item.image_url:'../../../static/img/static/user.png'" width="48px" height="48px" style="border-radius: 50%">
                        </div>
                        <div style="margin-left:10px;line-height:24px;">
                          <p><b>{{(item.family_name+item.middle_name+item.name)?item.family_name+item.middle_name+item.name:'匿名用户'}}</b></p>
                          <p>{{item.long_ago}}</p>
                        </div>
                      </div>
                      <div>
                        <span style="color:#008489">赞({{item.praise_num}})</span>
                      </div>
                    </div>
                    <div style="margin-top:15px;display: flex;justify-content: space-between">
                      <div>{{item.content}}</div>
                      <div>{{userId?'Ta':'我'}}的{{item.flag == 1? '活动':item.flag == 2? '故事':''}}&laquo;{{item.title}}&raquo;</div>
                    </div>
                    <div v-if="item.leavemsg.length" style="background-color: #F4F4F4;padding:0 10px;line-height:25px;margin-top:10px;">
                      <div v-for="items in item.leavemsg">
                        <span style="color:#008489;font-weight: bold">{{items.user.family_name+items.user.middle_name+items.user.name?items.user.family_name+items.user.middle_name+items.user.name:'匿名用户'}}</span>回复<span style="color:#008489;font-weight: bold">{{items.topuser.family_name+items.topuser.middle_name+items.topuser.name?items.topuser.family_name+items.topuser.middle_name+items.topuser.name:'匿名用户'}}</span>：{{items.content}}
                      </div>
                    </div>
                  </div>
                  <None v-if="!commonetList.length" type="noCommen"></None>
                  <div style="text-align:center">
                    <el-pagination @current-change="comentChange" :current-page.sync="commentIndex"   :page-size="10" layout="total, prev, pager, next" :total="comAll"></el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="策划者评价" name="second">
                  <div v-for="(item,index) in playCommenList" style="font-size:12px;padding:13px 0;border-bottom: 1px solid #E6E6E6">
                    <div style="display: flex;justify-content: space-between">
                      <div style="display: flex;justify-content: flex-start">
                        <div>
                          <img @click="toPerson(item,index)" :src="item.image_url?item.domain+item.image_url:'../../../static/img/static/user.png'" width="48px" height="48px" style="border-radius: 50%">
                        </div>
                        <div style="margin-left:10px;line-height:24px;">
                          <p><b>{{(item.family_name+item.middle_name+item.name)?item.family_name+item.middle_name+item.name:'匿名用户'}}</b></p>
                          <p>{{item.long_ago}}</p>
                        </div>
                      </div>
                      <div>
                        <span style="color:#008489">赞({{item.praise_num}})</span>
                      </div>
                    </div>
                    <div style="margin-top:15px;display: flex;justify-content: space-between">
                      <div>{{item.content}}</div>
                      <div>{{userId?'Ta':'我'}}的{{item.flag == 1? '活动':item.flag == 2? '故事':''}}&laquo;{{item.title}}&raquo;</div>
                    </div>
                    <div v-if="item.leavemsg.length" style="background-color: #F4F4F4;padding:0 10px;line-height:25px;margin-top:10px;">
                      <div v-for="items in item.leavemsg">
                        <span style="color:#008489;font-weight: bold">{{items.user.family_name+items.user.middle_name+items.user.name?items.user.family_name+items.user.middle_name+items.user.name:'匿名用户'}}</span>回复<span style="color:#008489;font-weight: bold">{{items.topuser.family_name+items.topuser.middle_name+items.topuser.name?items.topuser.family_name+items.topuser.middle_name+items.topuser.name:'匿名用户'}}</span>：{{items.content}}
                      </div>
                    </div>
                  </div>
                  <None v-if="!playCommenList.length" type="noPlayCommen"></None>
                  <div style="text-align:center">
                    <el-pagination @current-change="playChange" :current-page.sync="playIndex"   :page-size="10" layout="total, prev, pager, next" :total="playTotal"></el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div v-if="isProblem" class="userdata_right">
          <div>
            <h3>问题反馈<span style="color:#008489;font-size: 15px;">（提交反馈后可在消息处查看回复消息）</span></h3>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:20px;">
            <div style="font-weight: bold">
              反馈类型<span style="color:red">*</span>
            </div>
            <div style="margin-left:20px;">
              <el-radio-group v-model="radio">
                <el-radio :label="1">功能异常</el-radio>
                <el-radio :label="2">产品建议</el-radio>
                <el-radio :label="3">其它</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:20px;">
            <div style="font-weight: bold">
              反馈内容<span style="color:red">*</span>
            </div>
            <div style="margin-left:20px;">
              <el-input type="textarea" v-model="retrnText" style="width:400px;" :autosize="{minRows:5}"></el-input>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:20px;">
            <div style="font-weight: bold">
              上传照片/视频
            </div>
            <div style="margin-left:20px;">
              <el-upload
                :action="api+ '/home/Upload/upload'"
                list-type="picture-card"
                :data="data"
                :on-success="uploadSucess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div style="margin-left:90px;margin-top: 20px;">
            <el-button type="primary" @click="toSend"> 提交反馈</el-button>
          </div>
        </div>
        </div>
		</div>
      <div class="back" v-if="addFriend">
        <div class="out">
          <div @click="addFriend = false" style="font-size:25px;float:left"><i class="el-icon-close"></i></div>
          <div style="display:flex;justify-content:flex-start;margin-top: 30px;">
            <img :src="imgUrl" width="48" height="48" style="border-radius:50%">
            <div  style="text-align:left;line-height:25px;margin-left:20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap"><span>{{dataForm.family_name+dataForm.middle_name+dataForm.name}}</span><br><span>{{sexA[(dataForm.six)].label}}</span>
            </div>
          </div>
          <p style="font-size:12px;margin:20px 0;">填写验证信息</p>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
          <el-button size="mini" :plain="true" @click="addFridends" round style="float:right;margin-top:20px;">发送</el-button>
        </div>
      </div>
    <div v-if="AllLoading" style="z-index:990;position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.8)">
      <Loading></Loading>
    </div>
    <Bounced v-show="userData"  type="userdata" v-on:sendContent="sendContent" v-on:closeUserdata="closeUserdata"></Bounced>
    <Bounced v-show="isInform" type="inform" v-on:closeInform="closeInform" :informList="informList" :changeReason="changeReason" v-on:informAblish="informAblish" :informReason="informReason" v-on:changeForm="changeForm" v-on:informSend="informSend"></Bounced>
    <Bounced v-show="isZan" v-on:toCheckUser="toCheckUser" :type="leixing" v-on:closeZan="closeZan" :zanList="zanList" :isOwer="owrId" :who="who" :isLoading="isLoading" v-on:handleCurrentChange="handleCurrentChange" :total="total"></Bounced>
	</div>
</template>

<script>
  import Loading from '../../public/Loading'
	import Head from "../../public/head.vue"
  import Person from "../../public/person.vue"
  import Bounced from '../../public/bounced.vue'
  import test from '../../../static/js/language'
  import None from '../../public/noNumber'
  import LoadingImg from '../../public/loadingImg'
  import sex from '../../../static/js/sex'
	export default {
	  name:'userdata',
		data() {
			return {
			  api: this.GLOBAL.baseURL,
        data:{
			    token: localStorage.getItem('token')
        },
        addFriend:false,
        dataForm:'',
        textarea:'',
        userData:false,
        isInform:false,
        changeReason:true,
        informReason:{
          text:''
        },
				imgUrl:'',
        userId:'',
				activeNames:['1','2'],
        experienceList:[],
        jionList:[],
        storyList:[],
        wishList:[],
        visitorList:[],
        plannerList:[],
        isFriend:false,
        statu:'',
        informList:[],
        zanList:[],
        isZan:false,
        owrId:'',
        leixing:'',
        who:'',
        isLoading:false,
        AllLoading:false,
        total:0,
        activeName:'first',
        commonetList:[],
        playCommenList:[],
        editSearch:'搜索',
        content:'',
        isProblem:false,
        radio:'',
        retrnText:'',
        dialogImageUrl: '',
        dialogVisible: false,
        image:[],
        langusgeList:[],
        other_laguage:[],
        sexA:[],
        pageIndex:1,
        addMore:false,
        comAll:0,
        playTotal:0,
        commentIndex:1,
        playIndex:1
			};
		},
		components:{
			Head,
      Person,
      Bounced,
      None,
      LoadingImg,
      Loading
		},
    created:function(){
	    window.scroll(0,0)
      this.getParams()
      this.langusgeList = test()
      this.sexA = sex()
    },
    watch:{
      '$route':'getParams',
      userId: function(){
        if(this.userId){
          this.checkUser()
          this.commentIndex = 1
            this.playIndex = 1
          this.getComment(1,this.userId)
          this.getPlaycomment(1,this.userId)

        }else{
          this.getOwer()
          this.who = false
          this.commentIndex = 1
          this.playIndex = 1
        }
        window.scroll(0,0)
      }
    },
		methods:{
      lookMore(){
        this.getJionActive(this.index)
      },
      comentChange(val){
        if(this.userId){
          this.getComment(val,this.userId)
        }else{
          this.getComment(val,this.owrId)
        }
      },
      playChange(val){
          if(this.userId){
            this.getPlaycomment(val,this.userId)
          }else{
            this.getPlaycomment(val,this.owrId)
          }
      },
      toReturn(){
        this.isProblem = !this.isProblem
      },
      toSend(){
        this.$http.post(this.api + '/FeedBackS',{
          token: localStorage.getItem('token'),
          content: this.retrnText,
          type: this.radio,
          image: JSON.stringify(this.image)
        })
          .then(res=>{
            if(res.data.code == 1){
              this.isProblem = false
              this.$message({
                type: 'success',
                message: '提交成功!'
              })
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.toSend()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      uploadSucess(file){
        this.image.push({image_id: file.data.image_id})
      },
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      toPlayer(){
        this.$router.push( '/authentication')
      },
      toPerson(item,index){
        /*this.userId = item.user_id*/
        this.$router.push({
          path: '/userdata',
          query: {
            information: item.user_id
          }
        })

      },
	    //申请志愿者
      sendVolun(){
        this.$router.push({
          path: '/Validation',
          query:{
            information: 'volunteer'
          }
        })
      },
	    //保存介绍
      sendContent(msg){
        this.$http.post(this.api + '/home/User/saveuser',{
          token: localStorage.getItem('token'),
          introduce: msg
        })
          .then(res=>{
            if(res.data.code == 1){
              this.userData = false
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.getOwer()
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendContent()
                })
            }else{

            }
          })
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
	    getPlaycomment(val,id){
	      this.$http.post(this.api + '/CommentPlanner',{
	        token: localStorage.getItem('token'),
          page:val,
          user_id:id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.playCommenList = res.data.data.data
              this.playTotal = res.data.data.total
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getPlaycomment(val,id)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      handleClick(val){
        this.commentIndex = 1
        this.playIndex = 1
	      if(val = 'second'){
	        if(this.userId){
            this.getPlaycomment(1,this.userId)
          }else{
            this.getPlaycomment(1,this.owrId)
          }
        }else{
          if(this.userId){
            this.getComment(1,this.userId)
          }else{
            this.getComment(1,this.owrId)
          }
        }
      },
	    toList(item,index){
	      this.$router.push({
          path:'/wishPage',
          query:{
            group_id: item.group_id,
            name: item.group_name
          }
        })
      },
			handleChange(){
				
			},
      show(){
			  this.$alert("hahhaha")
      },
      toAlter(item,index){
        this.$router.push({
          path:'/publishPage',
          query:{
            information: item.activity_id
          }
        })
      },
      toStory(item,index){
        this.$router.push({
          path: '/storyPage',
          query:{
            information: item.story_id
          }
        })
      },
      addFridends() {
			  this.$http.post(this.api + '/home/Friend/ask_friend',{
			    token: localStorage.getItem('token'),
          f_user_id: this.userId,
          msg: this.textarea
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                message: '消息已发送成功',
                type: 'success'
              });
              this.addFriend = false;
              this.textarea = ''
            }else if(res.data.code == 3){
              alert(res.data.msg)
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
          .catch(error=>{
            alert(error)
          })
      },
      closeUserdata(){
			  this.userData = false
      },
      changeForm(){
        this.changeReason = false
      },
      informAblish(){
        this.changeReason = true
      },
      getParams(){
        this.userId = this.$route.query.information
      },
      getOwer(){
        this.$http.post(this.api + '/home/User/get_user',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.statu = 0
              let data =  res.data.data[0]
              this.dataForm = res.data.data[0]
              if(data.head_image){
                this.imgUrl = data.headimage.domain + data.headimage.themb_url
              }else{
                this.imgUrl = '../../static/img/static/user.png'
              }
              if(data.other_language){
                var a = []
                for(let m = 0;m<data.other_language.split(',').length;m++){
                  a.push(parseInt(data.other_language.split(',')[m]))
                }
                this.other_laguage = a
              }
              this.owrId = data.user_id
              this.getOwerActive()
              this.getJionActive(this.pageIndex)
              this.getStory()
              this.getCollect()
              this.getComment(1,this.owrId)
              this.getPlaycomment(1,this.owrId)
            }else if(res.data.code == 3){
              this.$router.push('/')
              localStorage.removeItem('isLogin')
              localStorage.removeItem('userImg')
            }else{
              this.$router.push('/')
              localStorage.removeItem('isLogin')
              localStorage.removeItem('userImg')
            }
          })
      },
      getOther(){
        this.$http.post(this.api + '/home/User/get_otheruser',{
          token: localStorage.getItem('token'),
          user_id: this.userId
        })
          .then(res=>{
            if(res.data.code == 1){
              this.statu = 1
              let data =  res.data.data
              this.dataForm = res.data.data
              if(data.headimage){
                this.imgUrl = data.headimage.domain + data.headimage.themb_url
              }else{
                this.imgUrl = '../../static/img/static/user.png'
              }
                this.wishList = data.collect_group
                this.storyList = data.story_list
                this.isFriend = data.is_friend? false: true
                this.experienceList = data.create_activity
            }else if(res.data.code == 3){
                this.$router.push('/')
                localStorage.removeItem('isLogin')
                localStorage.removeItem('userImg')
              }else{
                this.$router.push('/')
                localStorage.removeItem('isLogin')
                localStorage.removeItem('userImg')
              }
          })
      },
      getOwerActive(){
			  this.$http.post(this.api + '/home/Activity/complete',{
			    token: localStorage.getItem('token'),
          flag:3
        })
          .then(res=>{
            if(res.data.code == 1){
              this.experienceList = res.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getOwerActive()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getJionActive(val){
			  this.$http.post(this.api + '/vipact',{
			    token: localStorage.getItem('token'),
          iscomplete: 1,
          page:val
        })
          .then(res=>{
            if(res.data.code == 1){
              if(res.data.data.data.length){
                this.addMore = true
                this.jionList.push(res.data.data.data)
                this.index ++
              }else{
                this.addMore = false
              }
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getJionActive(val)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getStory(){
			  this.$http.post(this.api + '/storyc',{
			    token: localStorage.getItem('token'),
          sort: 1,
          page:1
        })
          .then(res=>{
            if(res.data.code == 1){
              this.storyList = res.data.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getStory()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getCollect(){
			  this.$http.post(this.api + '/home/Comment/collegroup_list',{
			    token: localStorage.getItem('token'),
        })
          .then(res=>{
            if(res.data.code == 1){
              this.wishList = res.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getCollect()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      checkUser(){
        this.AllLoading = true
			  if(localStorage.getItem('isLogin')){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.owrId = res.data.data[0].user_id
                if(res.data.data[0].user_id == this.userId){
                  this.getOwer()
                  this.who = false
                }else{
                  this.getOther()
                  this.who = true
                }

              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.checkUser()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }else{
          this.getOther()
        }

      },
      getComment(val,id){
			  this.$http.post(this.api + '/CommentVisit',{
			    token: localStorage.getItem('token'),
          page:val,
          user_id:id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.commonetList = res.data.data.data
              this.comAll = res.data.data.total
              this.AllLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=> {
                  localStorage.setItem('token',res.data.data)
                  this.getComment(val)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      //举报用户
      openInform(index,item){
        this.isInform = true
        this.getInform()
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

      },
      informSend(){
        if(this.informReason.text.trim().length <= 0){
          this.$message({
            type:'error',
            message: '请填写您的理由'
          })
        }else{
          this.$http.post(this.api + '/ReportU',{
            token: localStorage.getItem('token'),
            flag: 6,
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

      },
      closeZan(){
			  this.isZan = false
        this.zanList = []
      },
      getMyPraise(val,num){
        this.$http.post(this.api + '/MyPraise',{
          token: localStorage.getItem('token'),
          user_id: val,
          page:num,
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.zanList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getMyPraise(val,num)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getAttentionL(val,num){
        this.$http.post(this.api + '/AttentionL',{
          token: localStorage.getItem('token'),
          user_id: val,
          page:num
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.zanList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getAttentionL(val,num)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      lookZan(val){
			  this.isLoading = true
        this.isZan = true
			  if(this.userId){
          if(val == 1){
            this.leixing = 'zan'
            this.getMyPraise(this.userId,1)
          }else if(val == 2){
            this.leixing = 'fen'
            this.getAttentionL(this.userId,1)
          }else{
            this.leixing = 'guan'
            this.getGuanzhu(this.userId,1)
          }
        }else{
          if(val == 1){
            this.leixing = 'zan'
            this.getMyPraise(this.owrId,1)
          }else if(val == 2){
            this.leixing = 'fen'
            this.getAttentionL(this.owrId,1)
          }else{
            this.leixing = 'guan'
            this.getGuanzhu(this.owrId,1)
          }
        }
      },
      getGuanzhu(user_id,val){
        this.$http.post(this.api + '/AttentionOL',{
          token: localStorage.getItem('token'),
          user_id: user_id,
          page: val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.zanList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.getGuanzhu(user_id,val)
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      handleCurrentChange(val){
        this.isLoading = true
        this.zanList = []
			  if(this.userId){
          if(this.leixing == 'zan'){
            this.getMyPraise(this.userId,val)
          }else if(this.leixing == 'fen'){
            this.getAttentionL(this.userId,val)
          }else{
            this.getGuanzhu(this.userId,val)
          }
        }else{
          if(this.leixing == 'zan'){
            this.getMyPraise(this.owrId,val)
          }else if(this.leixing == 'fen'){
            this.getAttentionL(this.owrId,val)
          }else{
            this.getGuanzhu(this.owrId,val)
          }
        }
      },
      toCheckUser(val){
        this.isZan = false
        this.$router.push({
          path: '/userdata',
          query: {
            information: val.user_id
          }
        })
      },
		},
    mounted(){

    },
	}
</script>

<style scoped>

.userdata{
	padding-bottom: 50px;
}
.userdata_container{
	position: fixed;
	top: 82px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: WhiteSmoke;
	overflow: auto;
	padding-bottom: 50px;
}
.userdata_con{
	width: 1080px;
	margin: 0 auto;
	margin-top: 22px;
}
.userdata_left{
	width: 240px;
}
.userdata_right{
	width: 790px;
	background-color: white;
	border-radius: 10px;
  text-align:left;
  padding:20px;
}
.userdata_left_top{
	width: 100%;
  padding: 10px 0;
	background-color: white;
	border-radius: 10px;
	overflow: hidden;
}
.userdata_left_avator{
	width: 100px;
	margin: 0 auto;
	height: 100px;
	border-radius: 50%;
	margin-top: 40px;
}
.userdata_left_username{
	margin-top: 10px;
  font-size:12px;
}
.about_userdata{
	font-size: 12px;
	margin-top: 10px;
}
.userdata_lists{
	width: 243px;
	margin: 0 auto;
	margin-top: 15px;
}
.userdata_lists li{
	width: 47px;
	height: 25px;
	float: left;
	border-right: 1px solid #dcdcdc;
	font-size: 12px;
	line-height: 25px;
	text-align: center;
}
.userdata_lists li:nth-child(5){
	border: none;
}
.userdata_left_second{
	width: 100%;
	background-color: white;
	border-radius: 10px;
	margin-top: 10px;
	padding-bottom: 20px;
	text-align: left;
}
.userdata_left_second>div{
	width: 210px;
	margin: 0 auto;
}
.lr{
  float:right;
}
.back{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:999;
  background-color:rgba(0,0,0,.6);
}
  .out{
    position:fixed;
    width:500px;
    height:270px;
    background-color:#fff;
    top:30%;
    left: 35%;
    text-align:left;
    padding:10px;
  }
  .who{
    padding:1px 2px;
    background-color:#008489;
    color:white;
    border-radius: 2px;
    margin-right:5px;
  }
.wishMargin{
  margin-top:10px
}
.wishMargin:nth-child(3n-1){
  margin-left:10px;
  margin-right:10px;
}
  .storyaList{
    width:250px;
    font-size:14px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .storyaList:nth-child(3n){
    margin-right: 0
  }
</style>
