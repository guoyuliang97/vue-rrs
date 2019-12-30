<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handClick">
			<el-tab-pane label="对您的评价" name="first">
          <div  style="width: 740px;margin: 0 auto;text-align: left;">
            <Person  style="padding-right:20px" type="discuss" :isLogin="isLogin"  :replay="replay" :imgUrl="imgUrl" :overflow="overflow" :review="review" :height="height" v-on:textareaFocus="textareaFocus" v-on:abolish="abolish" v-on:discuss="discuss"></Person>
          </div>
				<div class="data_title" style="margin-top: 15px;">
					<div class="edit_width">过往的评价</div>
				</div>
				<div >
					<div style="width: 740px;margin: 0 auto;text-align: left;">
            <div v-for="(item,index) in otherList" style="font-size:12px;padding:13px 0;border-bottom: 1px solid #E6E6E6">
              <div style="display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: flex-start">
                  <div>
                    <img :src="item.domain?item.domain+item.image_url:commenImg" width="48px" height="48px" style="border-radius: 50%">
                  </div>
                  <div style="margin-left:10px;line-height:50px;">
                    <p><b>{{item.family_name+item.middle_name+item.name? item.family_name+item.middle_name+item.name:'匿名用户'}}</b></p>
                  </div>
                </div>
                <div>
                  <span style="color:#008489">赞({{item.praise_num}})</span>
                </div>
              </div>
              <div style="margin-top:15px;display: flex;justify-content: space-between">
                <div>回复我：{{item.content}}<span @click="sendReplay(item,index)" style="color:#008489;margin-left:10px;">回复</span></div>
                <div>&laquo;{{item.title}}&raquo;</div>
              </div>
              <div v-if="item.top_content" style="background-color: #F4F4F4;padding:0 10px;line-height:25px;margin-top:10px;">
                我的评论：{{item.top_content}}
              </div>
            </div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="您写的评价" name="second">
				<div class="data_title" style="margin-top: 15px;">
					<div class="edit_width">您过往写的评论</div>
				</div>
				<div >
					<div style="width: 740px;margin: 0 auto;text-align: left;">
            <div  v-for="(item,index) in myConment" style="font-size:12px;padding:13px 0;border-bottom: 1px solid #E6E6E6">
              <div style="display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: flex-start">
                  <div>
                    <img :src="imgUrl" width="48px" height="48px" style="border-radius: 50%">
                  </div>
                  <div style="margin-left:10px;line-height:50px;">
                    <p><b>{{item.name}}</b></p>
                  </div>
                </div>
                <div>
                  <span style="cursor: pointer" @click="deleteCo(item,index)">删除</span><span style="margin-left:10px;color:#008489;cursor: pointer">赞({{item.leaving_num}})</span>
                </div>
              </div>
              <div style="margin-top:15px;display: flex;justify-content: space-between">
                <div>{{item.content}}</div>
                <div>&laquo;{{item.title}}&raquo;</div>
              </div>
            </div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
    <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
      <Loading></Loading>
    </div>
	</div>
</template>

<script>
  import Loading from '../../public/Loading'
  import Person from "../../public/person.vue"
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
				activeName:"first",
        replay:'说点什么...',
        overflow:'hidden',
        height:'82px',
        review:{
          text:''
        },
        isLogin:true,
        imgUrl:'',
        isReplay:false,
        otherList:[],
        commenImg:'../../../static/img/static/user.png',
        replayId:'',
        flag:'',
        myConment:[],
        isLoading:false
			}
    },
    components:{
      Person,
      Loading
    },
    methods:{
		  getToMe(val){
		    this.isLoading = true
		    this.$http.post(this.api + '/msgreply',{
		      token: localStorage.getItem('token'),
          page: val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.otherList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getToMe(val)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      abolish(){
        this.review.text = ''
        this.height = '82px'
        this.overflow= 'hidden'
        this.replay = '说点什么...'
      },
      textareaFocus(){
        this.height = 'auto'
        this.overflow = 'none'
      },
      discuss(){
		    if(this.replayId){
          this.$http.post(this.api + '/home/Comment/save_leavemsg',{
            token: localStorage.getItem('token'),
            flag: this.flag == 2||this.flag == 5?5:this.flag == 4?4:3,
            content: this.review.text,
            table_id: this.replayId
          })
            .then(res=>{
              if(res.data.code == 1){
                this.review.text = ''
                this.$message({
                  message:'评论成功',
                  type:'success'
                })
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
      sendReplay(item){
		    console.log(item)
        document.getElementById('textarea').focus()
        this.replayId = item.say_id
        this.flag = item.flag_comm
        this.replay = '回复给' + item.family_name+item.middle_name+item.name
      },
      getMy(val){
		    this.$http.post(this.api + '/msgsay',{
		      token:localStorage.getItem('token'),
          page:val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.myConment = res.data.data.data
            }else if(res.data.code == 3){
              this.$http.post(rhis.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getMy(val)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      handClick(){
		    if(this.activeName == 'second'){
		      this.getMy(1)
        }else{
          this.getToMe(1)
        }
      },
      //删除
      deleteCo(item,index){
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.reduceComment(item,index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      reduceComment(item,index){
		    if(item.flag == 1||item.flag == 6){
          this.$http.post(this.api + '/home/Comment/del_comment',{
            token:localStorage.getItem('token'),
            comment_id: item.say_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getMy(1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this. reduceComment(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
          })
        }else if(item.flag == 4||item.flag == 7) {
          this.$http.post(this.api + '/home/Comment/del_leavemsg', {
            token: localStorage.getItem('token'),
            msg_id: item.say_id
          })
            .then(res => {
              if (res.data.code == 1) {
                this.getMy(1)
              } else if (res.data.code == 3) {
                this.$http.post(this.api + '/home/index/token')
                  .then(res => {
                    localStorage.setItem('token', res.data.data)
                    this.reduceComment(item, index)
                  })
              } else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      }
    },
    mounted() {
		  this.getToMe(1)
		  if(localStorage.getItem('userImg')){
		    this.imgUrl = localStorage.getItem('userImg')
      }else{
        this.imgUrl = this.commenImg
      }
    }
  }
</script>

<style>

</style>
