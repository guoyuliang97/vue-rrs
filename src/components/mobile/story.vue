<template>
    <div >
      <div>
        <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
          <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
          <p style="font-size: 2rem">故事列表</p>
        </div>
        <div style="display: flex;flex-wrap:wrap;justify-content: space-between;padding: 1rem">
          <div v-for="(item,index) in storyList" @click="toStory(item,index)" style="width:47%;margin-bottom: 2rem;">
            <div style="width:100%;overflow: hidden;border-radius: 5px;">
              <LoadingImg type="3" :src="item.cover_image?item.cover.domain+item.cover.image_url:''" style="width:100%;height:14rem;"></LoadingImg>
            </div>
            <div style="margin-top: 1rem;">
              <p>{{item.kind?item.kind[0].kind_name:''}}</p>
              <p style="margin: 1rem 0;"><b>{{item.title}}</b></p>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center">
              <div>
                <img :src="item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:userImg" style="width:3rem;height:3rem;border-radius: 50%;">
              </div>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:20%;">{{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'}}</div>
              <div >赞({{item.praise_num}})</div>
              <div>评论({{item.leaving_num}})</div>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "story",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            storyList:[],
            userImg:'../../../static/img/static/user.png'
          }
      },
      components:{
        LoadingImg,
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        getStory(val){
          this.$http.post(this.api+ '/home/Story/story_list',{
            token: localStorage.getItem('token'),
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.storyList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getStory(val)
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        toStory(item,index){
          this.$router.push({
            path: '/mStorypage',
            query:{
              information: item.story_id
            }
          })
        }
      },
      mounted() {
          this.getStory(1)
      }
    }
</script>

<style scoped>

</style>
