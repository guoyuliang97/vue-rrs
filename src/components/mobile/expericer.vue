<template>
    <div>
      <div>
        <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
          <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
          <p style="font-size: 2rem">体验列表</p>
        </div>
        <div style="padding: 1rem;display: flex;justify-content: space-between;flex-wrap: wrap">
          <div v-for="(item,index) in highgScore" @click="toPublish(item,index)" style="width:47%;margin: 1rem 0;">
            <div style="width:100%;overflow: hidden;border-radius: 5px;">
              <loadingImg type="2" :src="item.cover_image?item.domain+item.image_url:''" style="width:100%;height:14rem;"></loadingImg>
            </div>
            <div style="margin-top:1rem;">
              <p>{{item.kind?item.kind[0].kind_name:''}}</p>
              <p style="margin: 0.5rem 0;font-size: 1.3rem"><b>{{item.title}}</b></p>
              <div style="display: flex;justify-content: flex-start;font-size: 1rem;align-items: center">
                <cell :title="item.score" style="padding:1rem 0;align-items: center">
                  <rater v-model="item.score" active-color="#008489" :font-size="15" disabled></rater>
                </cell>
                <div style="margin-left:0.5rem">
                  评论({{item.comment_num}})
                </div>
              </div>
              <p v-if="item.price"><b>￥{{item.price}}</b>&nbsp;每人</p>
            </div>
          </div>
        </div>
        <el-button @click="LookMore(1)" style="background-color: #F4F4F4;color:#666666;width:100%;border: none">查看更多体验&gt;</el-button>
      </div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import {Rater,Cell} from 'vux'
  import loadingImg from '../../public/loadingImg'
    export default {
        name: "expericer",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            highgScore:[],
            activeIndex:1
          }
      },
      components:{
        loadingImg,
        Rater,
        Cell,
      },
      methods:{
        LookMore(){
            this.activeIndex += 1
          this.getExperce()
        },
        goBack(){
          this.$router.go(-1)
        },
        getExperce(){
          this.$http.post(this.api +'/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            page: this.activeIndex
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.data.length){
                  for(var i = 0;i< res.data.data.data.length;i++){
                    this.highgScore.push(res.data.data.data[i])
                  }
                }else{
                  MessageBox.alert('没有更多体验了哟！')
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getExperce(val)
                  })
              }else if(res.data.code == 0){
                MessageBox.alert(res.data.msg)
              }
            })
        },
        toPublish(item,index){
          this.$router.push({
            path: '/mPublishPage',
            query:{
              information: item.activity_id
            }
          })
        }
      },
      mounted(){
          this.getExperce()
      }
    }
</script>

<style scoped>

</style>
