<template>
    <div>
      <div style="padding:1rem;background-color: #008489;color:#FFF;text-align: center;position: relative">
        <x-icon type="ios-arrow-back" size="30" @click="goBack" style="position: absolute;left:0;top:50%;margin-top:-15px;fill:#fff;"></x-icon>
        <p style="font-size: 2rem">志愿者</p>
      </div>
      <div style="padding: 0.5rem;display: flex;flex-wrap: wrap;">
        <div v-for="(item,index) in volunteerList" class="list">
          <div style="border-radius: 5px">
            <LoadingImg type="4" :src="item.head_image?item.headimage.domain+item.headimage.image_url:userImg" style="width:100%;height:12rem;"></LoadingImg>
          </div>
          <p style="margin: 0.5rem 0;font-size: 1.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{item.family_name+item.middle_name+item.name?item.family_name+item.middle_name+item.name:'匿名用户'}}</b></p>
          <p style="font-size: 1.2rem">参加({{item.volun_num}})次活动</p>
        </div>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
    export default {
      name: "volunteer",
      data(){
        return{
          api: this.GLOBAL.baseURL,
          volunteerList:[],
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
        getVolun(val){
          this.$http.post(this.api + '/home/User/user_list',{
            token: localStorage.getItem('token'),
            page:val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.volunteerList = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getVolun(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
        this.getVolun(1)
      }
    }
</script>

<style scoped>
.list{
  width:30%;
  margin-right:5%;
  margin-bottom: 2rem;
}
  .list:nth-child(3n){
    margin-right: 0;
  }
</style>
