<template>
  <div style="text-align:left">
    <div>
      <div v-for="(item,index) in messageList" style="display: flex;justify-content: space-between;padding: 10px 0;border-bottom: 1px solid #eee;" @click="toChact(item,index)">
        <div style="display: flex;justify-content: flex-start;">
          <div>
            <img :src="item.user.head_image? item.user.headimage.domain+ item.user.headimage.image_url:imgUrl" width="48px" height="48px" style="border-radius: 50%">
          </div>
          <div style="margin-left:10px;line-height: 24px;">
           <div style="font-weight: bold">
             {{item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+'·'+item.user.name:'匿名用户'}}
           </div>
            <div style="font-size: 12px;">
              {{item.content}}
            </div>
          </div>
        </div>
        <div style="font-size:12px;" :style="{lineHeight:item.noread_count?'25px':'50px'}">
          <p>{{item.create_time}}</p>
          <div v-if="item.noread_count" style="float:right;margin-top:10px;width:20px;height:20px;border-radius:50%;background-color:red;color:#fff;text-align: center;line-height:20px;">
            {{item.noread_count}}
          </div>
        </div>
      </div>
      <None v-if="!messageList.length" type="message"></None>
    </div>
    <div style="margin:20px 0;text-align: center">
      <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <Chat v-if="isChat" :userName="userName" :to_user_id="otherId" :other_img="otherImg" v-on:chat="chat" :userUrl="userImg" :isOwer="isOwer"></Chat>
    <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import Bus from '../../assets/eventBus'
  import None from '../../public/noNumber'
  import Person from '../../public/person.vue'
  import Chat from '../../public/chat'
  export default {
    name: "friendMessage",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        imgUrl:'../../../static/img/static/user.png',
        messageList:[],
        total:0,
        isChat:false,
        otherId:'',
        otherImg:"",
        userImg:'',
        userName:'',
        isOwer:'',
        isLoading:false,
        index:1
      }
    },
    components:{
      Person,
      None,
      Chat,
      Loading
    },
    methods: {

      getMsg(val){
        this.isLoading = true
        this.$http.post(this.api + '/MyMsg',{
          token: localStorage.getItem('token'),
          page: val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.messageList = res.data.data.data
              this.total = res.data.data.total
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getMsg()
                })
            }else if(res.data.code == 0){
              this.isLoading = false
              alert(res.data.msg)
            }
          })
      },
      handleCurrentChange(val){
        this.getMsg(val)
        this.index = val
      },
      toChact(item,index){
        this.otherId = item.user_id
        this.isOwer = item.to_user_id
        this.userName = item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+'·'+item.user.name:'匿名用户'
        this.otherImg =item.user.head_image ?item.user.headimage.domain+ item.user.headimage.image_url:this.imgUrl
        this.isChat = true
        if(item.noread_count){
          Bus.$emit('friendN',1)
        }
      },
      chat(){
        this.isChat = false
        this.getMsg(this.index)
      }
    },
    mounted() {
      this.getMsg(this.index)
      if(localStorage.getItem('userImg')){
        this.userImg =localStorage.getItem('userImg')
      }else{
        this.userImg = '../../../static/img/static/user.png'
      }
    }
  }
</script>

<style scoped>

</style>

