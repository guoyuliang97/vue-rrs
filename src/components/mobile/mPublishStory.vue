<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">我发布的故事</p>
      </div>
      <div style="padding: 1rem;">
        <div v-for="(item,index) in recentList" @click="toPage(item,index)" style="display: flex;justify-content: space-between;margin-bottom:2rem;">
          <div style="width:45%;border-radius: 10px;overflow: hidden;height:8rem;;margin-right:10px;">
            <LoadingImg type="3" :src="item.cover_image?item.cover.domain+item.cover.image_url:''" style="width:100%;height:100%;"></LoadingImg>/
          </div>
          <div style="font-size: 1.5rem;width:50%;display: flex;flex-wrap: wrap;align-content: space-between">
            <div>
              <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-weight: bold">{{item.title}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;width:100%;align-items: center;font-size: 1.2rem;color:#999999">
              <div>{{item.create_time}}</div>
              <div>{{item.praise_num}}赞 &nbsp;&nbsp;{{item.leaving_num}}评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "mPublishStory",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            recentList:[]
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
          this.$http.post(this.api + '/storyc',{
            token: localStorage.getItem('token'),
            sort: 1,
            page: val,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.recentList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getStory(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toPage(item,index){
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
      },

    }
</script>

<style scoped>

</style>
