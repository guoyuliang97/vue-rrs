<template>
    <div style="margin-top:15px;">
      <div style="margin-top:17px">
        <div v-for="(item,index) in volunList" :key="index" style="padding:18px 0;border-bottom: 1px solid #E8E8E8">
          <div style="display: flex;justify-content: flex-start;;font-size:14px;line-height:48px;">
            <div>
              <img :src="item.head_image? item.head_domain + item.head_image_url: '../../../static/img/static/user.png'" width="48px" height="48px" style="border-radius: 50%">
            </div>
            <div style="margin:0 10px;">
             {{item.family_name+item.middle_name+item.name?item.family_name+item.middle_name+item.name:'匿名用户'}}
            </div>
            <div style="color:#999999">
              {{item.create_time}}
            </div>
          </div>
          <div style="display: flex;justify-content: space-between">
            <div>
              <LoadingImg type="3" v-on:toPublish="toPublish(item,index)" :src="item.act_domian + item.act_image_url" style="width:200px;height:135px;overflow: hidden;cursor: pointer"></LoadingImg>
            </div>
            <div style="width:750px;font-size:12px;line-height:30px;">
              <p style="color:#999999"><span v-for="items in item.kind">{{'/'+items.kind_name}}</span></p>
              <p><b>{{item.title}}</b></p>
              <div style="display: flex;justify-content: flex-start">
                <span>{{item.score}}</span>
                <div style="margin-left:10px">
                  <el-rate
                    style="margin-top:5px;"
                    disabled
                    :value="parseInt(item.score)"
                    :colors="['#008489', '#008489', '#008489']">
                  </el-rate>
                </div>
                <div style="margin-left:15px;">
                  评论({{item.comment_num}})
                </div>
              </div>
              <div style="margin-top:15px;">
                <span>￥{{item.price}}</span>
                <span style="color:#008489;margin-left:10px;">邀请时间：{{item.begin_time+'—'+item.end_time}}</span>
              </div>
            </div>
            <div >
              <div><el-button type="primary">已完成</el-button></div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!volunList.length">
        <None type="myInvite"></None>
      </div>
      <div style="margin:20px 0;">
        <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:990;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import  LoadingImg from '../../public/loadingImg'
  import None from '../../public/noNumber'
    export default {
        name: "overInvite",
      data() {
          return{
            api: this.GLOBAL.baseURL,
            volunList:[],
            total:0,
            isLoading:false
          }
      },
      components:{
        None,
        LoadingImg,
        Loading
      },
      methods:{
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query:{
              information: item.activity_id
            }
          })
        },
        handleCurrentChange(val){
          this.getOverlist(val)
        },
        getOverlist(val){
          this.isLoading = true
          this.$http.post(this.api + '/CompleteMy',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.volunList = res.data.data.data
                this.total = res.data.data.total
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOverlist(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        }
      },
      mounted(){
          this.getOverlist(1)
      }
    }
</script>

<style scoped>

</style>
