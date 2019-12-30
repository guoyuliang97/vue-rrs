<template>
    <div>
      <div style="padding:2rem 1rem;background-color: #008489;color:#FFF;text-align: center;position: relative;">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
      </div>
      <Head></Head>
      <div style="padding: 2rem 1rem;">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div style="display: flex;justify-content: space-between;border-radius:25px;padding: 1rem;background-color: #F5F5F5;width:100%;">
            <input @keydown="listenSend" v-model="keywords" style="border: none;font-size: 1.5rem;background-color: #F5F5F5;">
            <x-icon type="ios-search" size="20"></x-icon>
          </div>
          <div @click="toAbloish" style="width:100px;text-align: center;font-size: 1.5rem;color:#666666">取消</div>
        </div>
        <div style="margin-top:20px;">
          <div style="display: flex;justify-content: space-between">
            <span style="color:#666666;font-size: 1.5rem;">搜索历史</span>
            <img @click="deletSearch" src="../../../static/img/static/wap/delete.png" style="width:1.5rem;height:1.5rem;">
          </div>
          <div style="display: flex;flex-wrap: wrap;margin-top:20px;">
            <div v-for="(item,index) in serachLate" @click="chooseSearch(item,index)" style="padding: 0.3rem 1rem;border-radius: 15px;margin-left:1rem;margin-bottom: 1rem" :style="{backgroundColor:chooseIndex == index?'#008489':'#E7E7E7',color:chooseIndex == index? '#fff':'#000' }">{{item.keywords}}</div>
          </div>
        </div>
      </div>
      <div>
        <div style="padding: 1rem;">
          <div v-for="(item,index) in recentList" @click="toPageT(item,index)" style="display: flex;justify-content: space-between;margin-bottom:2rem;">
            <div style="min-width:55%;max-width:55%;border-radius: 10px;overflow: hidden;height:10rem;;margin-right:10px;">
              <LoadingImg type="3" :src="item.domain+item.image_url" style="width:100%;height:100%;"></LoadingImg>
            </div>
            <div style="font-size: 1.5rem;width:45%;">
              <div style="justify-content: flex-start;display: flex">
                <div style="min-width:60px;"><b>【体验】</b></div>
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</div>
              </div>
           <!--   <div style="margin-top:7rem;">
                <p>{{item.update_time}}</p>
              </div>-->
            </div>
          </div>
        </div>
        <div style="padding: 1rem;">
          <div v-for="(item,index) in storyList" @click="toPageG(item,index)" style="display: flex;justify-content: space-between;margin-bottom:2rem;">
            <div style="min-width:55%;max-width:55%;border-radius: 10px;overflow: hidden;height:10rem;;margin-right:10px;">
              <LoadingImg type="3" :src="item.cover_image?item.cover.domain+item.cover.image_url:''" style="width:100%;height:100%;"></LoadingImg>
            </div>
            <div style="font-size: 1.5rem;width:45%;">
              <div style="justify-content: flex-start;display: flex">
                <div style="min-width:60px;"><b>【故事】</b></div>
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</div>
              </div>
           <!--   <div style="margin-top:7rem;">
                <p>{{item.update_time}}</p>
              </div>-->
            </div>
          </div>
        </div>
        <el-button v-if="recentList.length == 10 || storyList.length == 10" @click="LookMore" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多故事&gt;</el-button>
      </div>
      <div v-if="recentList.length ==0 && storyList.length ==0">
        <p style="text-align: center;color:#999999">暂无数据</p>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import Head from '../../public/mobilePublic/mobileHead'
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "mSearch",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            recentList:[],
            keywords:'',
            storyList:[],
            serachLate:[],
            chooseIndex:-1
          }
      },
      components:{
          Head,
        LoadingImg
      },
      methods:{
        toAbloish(){
          this.$router.go(-1)
        },
        deletSearch(){
          MessageBox.confirm('确定删除搜索记录？')
            .then(action => {
              this.deleteLs()
          })
          .catch(action => {

          })
        },
        deleteLs(){
          this.$http.post(this.api + '/SearchC',{
            token: localStorage.getItem('token'),
            flag:1
          })
            .then(res=>{
              if(res.data.code == 1){
                MessageBox.alert('删除成功!')
                this.getSearchLate()
              }else if(res.data.code == 3){
                this.deleteLs()
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        LookMore(){
          MessageBox.alert('请前往APP或者客户端查看更多!')
        },
        goBack(){
          this.$router.go(-1)
        },
        listenSend(){
          if(event.keyCode === 13){
            this.search(this.keywords)
          }
        },
        search(val){
          this.$http.post(this.api + '/home/Search/search',{
            token: localStorage.getItem('token'),
            keywords: val,
            page: 1
          })
            .then(res=>{
              if(res.data.code == 1){

                let data = res.data.data
                if(data.activity.data.length){
                  var a = []
                  for(var i = 0; i< data.activity.data.length;i++){
                    a.push(data.activity.data[i])
                  }
                  this.recentList = a
                }

                if(data.story.data.length){
                  var b = []
                  for(var i = 0; i< data.story.data.length;i++){
                    b.push(data.story.data[i])
                  }
                  this.storyList = b
                }
              }else if(res.data.code == 3){
                this.search()
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        getSearchLate(){
          this.$http.post(this.api + '/home/Index/search_lately',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                console.log(res)
                this.serachLate = res.data.data
              }else if(res.data.code == 3){

              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        chooseSearch(item,index){
          if(this.chooseIndex != index){
            this.chooseIndex = index
            this.search(item.keywords)
          }
        },
        toPageT(item,index){
          this.$router.push({
            path: '/mPublishPage',
            query:{
              information: item.activity_id
            }
          })
        },
        toPageG(item,index){
          this.$router.push({
            path: '/mStorypage',
            query:{
              information: item.story_id
            }
          })
        }
      },
      mounted(){
          this.getSearchLate()
      }
    }
</script>

<style scoped>

</style>
