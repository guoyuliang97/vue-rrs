<template>
    <div>
      <div v-for="(item,index) in ZanList" style="display: flex;justify-content: flex-start;padding:20px 0;border-bottom: 1px solid #eee;align-items: center ">
         <div>
           <div style="width:40px;height:40px;">
             <LoadingImg type="6" style="width:100%;height: 100%;" :src="item.domain + item.image_url"></LoadingImg>
           </div>
         </div>
          <div style="text-align: left;margin-left:20px;">
            <p style="font-weight: bold">{{item.family_name+item.middle_name+item.name?item.family_name+item.middle_name+item.name:'匿名用户'}} &nbsp;&nbsp;赞了我的《{{item.title}}》</p>
            <p style="color:#999999">{{item.create_time}}</p>
          </div>
      </div>
      <div v-if="!ZanList.length">
        <None type="zan"></None>
      </div>
      <div style="margin:20px 0;">
        <el-pagination  @current-change="handleCurrentChange" :current-page.sync="index"   :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import LoadingImg from '../../public/loadingImg'
  import None from '../../public/noNumber'
    export default {
        name: "zanMessage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            ZanList: [],
            user_id:'',
            total:0,
            isLoading:false,
            index:1
          }
      },
      components:{
        None,
        LoadingImg,
        Loading
      },
      methods:{
          getOwer(){
            this.$http.post(this.api + '/home/User/get_user',{
              token: localStorage.getItem('token')
            })
              .then(res=>{
                if(res.data.code == 1){
                  let data = res.data.data[0]
                  this.user_id = data.user_id
                  this.getZan(1)
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOwer()
                  })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          },
          getZan(val){
            this.isLoading = true
            this.$http.post(this.api + '/MyPraise',{
              token: localStorage.getItem('token'),
              user_id: this.user_id,
              page:val
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.ZanList = res.data.data.data
                  this.total =  res.data.data.total
                  this.isLoading = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getZan(val)
                    })
                }else if(res.data.code == 0){
                  this.isLoading = false
                  alert(res.data.msg)
                }
              })
          },
        handleCurrentChange(val){
            this.getZan(val)
        }
      },
      mounted() {
          this.getOwer()
      }
    }
</script>

<style scoped>

</style>
