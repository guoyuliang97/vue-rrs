<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">最近浏览</p>
      </div>
      <div style="padding: 1rem;">
        <div v-for="(item,index) in recentList" @click="toPage(item,index)" style="display: flex;justify-content: space-between;margin-bottom:2rem;">
          <div style="min-width:55%;max-width:55%;border-radius: 10px;overflow: hidden;height:10rem;;margin-right:10px;">
            <LoadingImg type="3" :src="item.domain+item.image_url" style="width:100%;height:100%;"></LoadingImg>
          </div>
          <div style="font-size: 1.5rem;width:45%;">
            <div style="justify-content: flex-start;display: flex">
              <div style="min-width:60px;"><b>【{{item.flag == 1? '体验':'故事'}}】</b></div>
              <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</div>
            </div>
            <div style="margin-top:7rem;">
              <p>{{item.create_time}}</p>
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
        name: "reccently",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            recentList:[]
          }
      },
      components:{
        LoadingImg
      },
      methods: {
        goBack(){
          this.$router.go(-1)
        },
        getReccent(val){
          this.$http.post(this.api + '/home/Index/visit_lately',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.recentList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getReccent(val)
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        toPage(item,index){
     
          if(item.flag == 1){
            this.$router.push({
              path: '/mPublishPage',
              query:{
                information: item.table_id
              }
            })
          }else{
            this.$router.push({
              path: '/mStorypage',
              query:{
                information: item.table_id
              }
            })
          }
        }
      },
      mounted(){
          this.getReccent(1)
      }
    }
</script>

<style scoped>

</style>
