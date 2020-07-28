<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">我的通知</p>
      </div>
      <div style="display: flex;justify-content: space-around;padding:0 1rem;background-color: #F4F4F4">
        <div @click="choose(1)" style="padding: 1rem 0;" :style="{color: clickIndex == 1?'#008489':'#000',borderBottom: clickIndex == 1? '1px solid #008489':''}">赞我的</div>
        <div @click="choose(2)" style="padding: 1rem 0;" :style="{color: clickIndex == 2?'#008489':'#000',borderBottom: clickIndex == 2? '1px solid #008489':''}">回复我的</div>
      </div>
      <div v-if="clickIndex == 1" style="padding: 2rem 1rem;">
        <div v-for="(item,index) in zanList" style="display: flex;justify-content: flex-start;margin-bottom: 2rem;">
          <div>
            <div>
              <LoadingImg type="6" :src="item.domain + item.image_url" style="width:4rem;height:4rem;" ></LoadingImg>
            </div>
          </div>
          <div style="border-bottom: 1px solid #eee;margin-left:10px;;width:100%;">
            <div style="display: flex;justify-content: space-between;">
              <div style="font-size: 1.5rem">
                <span style="color:#4F91BF;">{{item.family_name + item.middle_name + item.name?item.family_name + item.middle_name + item.name:'匿名用户'}}</span>
                <span style="margin-left:1rem;color:#999999 ">赞了我</span>
              </div>
              <div style="color:#999999">
                {{item.create_time}}
              </div>
            </div>
            <div style="padding: 0.5rem;background-color: #F4F4F4;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top:20px;font-size:1.3rem">
              <p>{{item.flag == 1?'我的故事：':item.flag == 2?'我的翻译：':item.flag == 3?'我的留言/评论：':''}}<span>{{item.title}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="clickIndex == 2" style="padding: 2rem 1rem;">
        <div v-for="(item,index) in replayList" style="display: flex;justify-content: space-between;margin-bottom: 2rem;">
          <div>
            <div>
              <LoadingImg type="6" :src="item.domain + item.image_url" style="width:4rem;height:4rem;" ></LoadingImg>
            </div>
          </div>
          <div style="border-bottom: 1px solid #eee;margin-left:10px;width:100%">
            <div style="display: flex;justify-content: space-between;">
              <div style="font-size: 1.5rem">
                <p style="color:#4F91BF;">{{item.family_name + item.middle_name + item.name? item.family_name + item.middle_name + item.name:'匿名用户'}}</p>
                <p style="margin-top:10px;font-size: 1.3rem">评论我：{{item.content}}</p>
              </div>
              <div style="color:#999999">
                20:00
              </div>
            </div>
         <!--   1评论活动 2评论志愿者 4 留言故事 5留言用户 6留言评论 7留言留言（回复）-->
            <div style="font-size:1rem;padding: 0.5rem;background-color: #F4F4F4;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top:20px;">
              <p>{{item.flag == 1?'我的活动：':item.flag == 4?'我的故事：':item.flag == 6||item.flag == 7?'我的留言/评论：':''}}<span>{{item.title}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "myMessage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            clickIndex:1,
            zanList:[],
            userId:'',
            index:1,
            replayList:[],

          }
      },
      components:{
        LoadingImg,
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        choose(val){
        this.clickIndex = val
          if(val == 1){
            this.getZan(1)
          }else{
            this.getReplay(1)
          }
        },
        getUser(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.userId = res.data.data[0].user_id
                this.getZan(1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getUser()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getZan(val){
          this.$http.post(this.api + '/MyPraise',{
            token: localStorage.getItem('token'),
            user_id: this.userId,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.zanList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getZan(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getReplay(val){
          this.$http.post(this.api + '/msgreply',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
              
                this.replayList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getReplay(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
          this.getUser()
      }
    }
</script>

<style scoped>

</style>
