<template>
  <div style="text-align:left">
      <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item :title="'我的好友('+friendList.length+')'" name="1">
      <div v-for="(item,index) in friendList" style="margin:20px 0;border-bottom:1px solid #eee">
        <Person type="6" :imgUrl="item.imgUrl" v-on:toPerson="toPerson(item,index)" :name="item.name?item.name:'匿名用户'" v-on:totalk="toTalk(item,index)" v-on:deel="deel(item,index)"></Person>
      </div>
    </el-collapse-item>
  </el-collapse>
    <Chat v-if="isChat" :userName="userName" :to_user_id="to_user_id" :other_img="other_img" v-on:chat="chat" :userUrl="imgUrl" :isOwer="user_id"></Chat>
  </div>
</template>

<script>
  import Chat from '../../public/chat'
  import Person from '../../public/person.vue'
    export default {
        name: "friend",
      data() {
        return {
          api: this.GLOBAL.baseURL,
          activeNames: ['1'],
          friendList:[],
          isChat:false,
          replayList:[],
          user_id:'',
          imgUrl:'',
          to_user_id:'',
          other_img:'',
          pageIndex:1,
          totalPage:'',
          userName:''
        };
      },
      components:{
          Person,
        Chat
      },
      methods: {
        toPerson(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.to_user_id
            }
          })
        },
          //取消删除
        chat(){
          this.isChat = false
        },
          //删除好友
        deel(item,index){
          this.$confirm('此操作将删除该好友, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteFriend(item,index)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        deleteFriend(item,index){
          this.$http.post(this.api +'/home/Friend/del',{
            token: localStorage.getItem('token'),
            f_user_id: item.to_user_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.friendList.splice(index,1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deleteFriend(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        handleChange(val) {
        },
        toTalk(item,index){
          this.to_user_id = item.to_user_id
          this.other_img = item.imgUrl
          this.userName = item.name?item.name:'匿名用户'
          this.isChat = true
        },

      },
      mounted() {
          let _this = this
        this.$http.post(this.api + '/home/User/get_user',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.user_id = res.data.data[0].user_id
            }
          })
        this.$http.post(_this.api + '/home/Friend/myfriend',{
          token: localStorage.getItem('token'),
          page: 1
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              for(let i = 0;i<data.length;i++){
                let userImg = ''
                if(data[i].user.head_image){
                  userImg = data[i].user.headimage.domain + data[i].user.headimage.image_url
                }else{
                  userImg = '../../../static/img/static/user.png'
                }
                _this.friendList.push({
                  imgUrl: userImg,
                  name: data[i].user.family_name + data[i].user.middle_name + data[i].user.name,
                  to_user_id: data[i].f_user_id
                })
              }

            }
          })
      },
      created(){
          this.imgUrl = localStorage.getItem('userImg')
      }
    }
</script>

<style scoped>

</style>
