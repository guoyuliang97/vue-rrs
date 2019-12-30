<template>
    <div v-if="storyData">
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">故事详情</p>
      </div>
      <div style="padding: 1rem;">
        <h2>{{storyData.title}}</h2>
        <div style="margin: 1rem 0;display: flex;justify-content: flex-start">
          <div style="color:#008489;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:100px;">{{storyData.user.family_name+storyData.user.middle_name+storyData.user.name?storyData.user.family_name+storyData.user.middle_name+storyData.user.name:'匿名用户'}}</div>
          <div style="margin-left:1rem;">{{storyData.create_time}}</div>
        </div>
        <div v-for="(item,index) in storyData.image" style="margin-bottom: 1rem">
          <LoadingImg type="3" :src="item.image_id?item.domain + item.image_url:''"  ></LoadingImg>
        </div>
        <div style="font-size: 1.5rem;">
          <p>{{storyData.content}}</p>
        </div>
        <div style="margin: 1rem 0;display: flex;justify-content: center">
          <div style="width:5rem;height:5rem;border-radius: 50%;display: flex;justify-content: center;align-items: center" :style="{border:storyData.is_praise == 0?'1px solid #999999':'1px solid #008489'}">
            <i @click="addPraise" class="iconfont icon-zan" style="font-size:25px;" :style="{'color': storyData.is_praise == 0? '#999999':'#008489'}"></i>
          </div>
        </div>
        <p style="text-align: center;" :style="{color:storyData.is_praise == 0?'#999999':'#008489'}">{{storyData.is_praise == 0?'赞一个':'已赞'}}</p>
        <div v-if="disList.length" style="margin-top:1rem;">
          <h3>最新评论</h3>
          <div style="margin: 1rem 0;">
            <div v-for='(item,index) in disList' style="display: flex;justify-content: space-between;margin-bottom: 2.5rem;">
              <div style="display: flex;justify-content: flex-start;">
                <div >
                  <img :src="item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:'../../../static/img/static/user.png'" style="width:4rem;height:4rem;border-radius: 50%;">
                </div>
                <div style="margin-left:1rem;">
                  <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap"><b>{{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'}}</b></p>
                  <p style="margin: 0.5rem 0;">{{item.create_time}}</p>
                  <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.content}}</p>
                  <p style="color:#008489;">{{item.leaving_num}}条回复</p>
                </div>
              </div>
              <div style="display: flex;justify-content: flex-end;margin-left:10px">
                <span style="font-size: 1.5rem">{{item.praise_num}}</span>
                <i @click="clickPrease(item,index)" class="iconfont icon-zan" style="margin-left:0.5rem;font-size: 1.5rem;" :style="{'color': item.is_praise == 0? '#999999':'#008489'}"></i>
              </div>
            </div>
          </div>
          <el-button @click="lookMore" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多评论&gt;</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import '../../../static/css/zan/iconfont.css'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "mStorypage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            imageList:[],
            zanIndex:0,
            disList:[],
            storyData:''
          }
      },
      components:{
        LoadingImg,
      },
      methods:{
        lookMore(){
          MessageBox.alert('请前往APP或者客户端查看!')
        },
        goBack(){
          this.$router.go(-1)
        },
        //点赞
        addPraise(){
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            table_id: this.storyId,
            flag: 1,
            type: this.storyData.is_praise?2:1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getStory()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addPraise()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        getStory(){
          this.$http.post(this.api + '/home/Story/get_story',{
            token: localStorage.getItem('token'),
            story_id: this.storyId,
            visit: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.storyData = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getStory()
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        getLeave(val){
          this.$http.post(this.api + '/LeaveL',{
            token: localStorage.getItem('token'),
            table_id: this.storyId,
            flag: 2,
            order: 1,
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.disList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getLeave(val)
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        clickPrease(item,index){
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: 4,
            table_id: item.msg_id,
            type: item.is_praise?2:1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getLeave(1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.clickPrease(item,index)
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        }

      },
      mounted(){
        this.getLeave(1)
      },
      created(){
        this.storyId = this.$route.query.information
        this.getStory()
        window.scroll(0,0)
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(!flag){
          this.$router.push({
            path: '/storyPage',
            query:{
              information: this.$route.query.information
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
