<template>
  <div style="padding: 30px 0px;">
    <div class="outdoor">
      <div class="outdoor_detail" v-for="item in outdoorList">
        <Detail type="2" v-on:toperson="toperson(item,index)" v-on:toStory="toStory(item,index)" :zanIndex="item.zanIndex" :status="item.status" :address="item.address" :remark="item.remark" :imgUrl="item.img" :avator="item.avator" :zan="item.zan" :say="item.say" v-on:addZan="addZan(item,index)"></Detail>
      </div>
    </div>
    <Loading v-show="loadingState" ></Loading>
    <div v-show="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:999;">
      <Loading style="position:fixed;top:50%;left:50%;z-index:9999"></Loading>
    </div>
    <div v-if="!outdoorList.length">
      <None type='story'></None>
    </div>
    <p v-if="request" style="font-size:12px;">············没有更多故事了！快去发布吧！············</p>
  </div>
</template>

<script>
  import None from '../../public/noNumber'
  import Loading from '../../public/Loading'
  import Detail from "../../public/detail.vue"
  export default {
    data() {
      return {
        api:this.GLOBAL.baseURL,
        outdoorList:[],
        isLoading:false,
        loadingState:false,
        page:1,
        request:false,
      };
    },
    components:{
      Detail,
      Loading,
      None
    },
    methods:{
      getStory(val){
        this.$http.post(this.api + '/home/Story/story_list',{
          token: localStorage.getItem('token'),
          kind_id:3,
          sort:2,
          page:val,
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              for(let i = 0;i<data.length;i++){
                let user = data[i].user
                let avator = ''
                let zan = ''
                if(data[i].cover_image){
                  if(user.head_image){
                    avator = user.headimage.domain + user.headimage.image_url
                  }else{
                    avator =  '../../static/img/static/user.png'
                  }
                  if(data[i].is_praise){
                    zan = 1
                  }else{
                    zan = 0
                  }
                  this.outdoorList.push({
                    img:data[i].cover.domain + data[i].cover.image_url,
                    address:data[i].province,
                    remark: data[i].title,
                    avator:avator,
                    zan: data[i].praise_num,
                    say: data[i].leaving_num,
                    zanIndex:zan,
                    story_id: data[i].story_id,
                    userId: data[i].user_id
                  })
                }
              }
              if(!data.length){
                this.request = true
              }else{
                this.request = false
              }
              this.isLoading = false
              this.loadingState = false

            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/Index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getStory(val)
                })
            }else{
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
      toStory(item,index){
        this.$router.push({
          path: '/storyPage',
          query:{
            information: item.story_id
          }
        })
      },
      //点赞
      addZan(item,index){
        if(item.zanIndex == 0){
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: 1,
            table_id: item.story_id,
            type: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                item.zanIndex = 1
                item.zan = item.zan + 1
              }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   localStorage.setItem('token',res.data.data)
                   this.addZan(item,index)
                 })
              }else{
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
                console.log(res)
                item.zan = item.zan - 1
                item.zanIndex = 0
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addZan(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        }
      },
      onScroll(){
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollHeight == scrollTop+windowHeight){
          //写后台加载数据的函数
          if(!this.request){
            this.loadingState = true
            this.page += 1
            this.getStory(this.page)
          }
        }
      }
    },
    mounted(){
      window.scroll(0,0)
      this.getStory(this.page)
      window.addEventListener('scroll',this.onScroll)
    },
    destroyed(){
      window.removeEventListener('scroll',this.onScroll)
    }
  }
</script>

<style>
  .outdoor{
    display: flex;
    flex-wrap:wrap
  }
  .outdoor_detail{
    width: 260px;
    margin-left: 13px;
    margin-top: 20px;
  }
  .outdoor_detail:nth-child(4n+1){
    margin-left: 0;
  }
</style>
