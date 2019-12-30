<template>
  <div style="margin-top:15px;">
    <div v-for="(item,index) in activeList" v-if="item.audit == 1">
      <p style="padding:10px;background-color: #F4F6F9;font-size:10px;color:#A8A8A8">
        发布时间：{{item.create_time}}
      </p>
      <div v-if="item.status == 1" style="display: flex;justify-content: flex-start;margin-top:10px;">
        <div>
            <span style="width:265px;height:170px;color:#fff;position: absolute;font-size:12px;text-align: center;line-height:170px;background:rgba(133,133,133,.7)">
              已取消
            </span>
          <img :src="item.cover_image? item.cover.domain+ item.cover.image_url:'../../../static/img/static/back.jpg'" width="265px" height="170px">
        </div>
        <div style="line-height:35px;width:550px;margin-left:20px;color:#999999">
          <p style=";font-size:12px;"><span v-for="items in item.kind">/{{items.kind_name}}</span></p>
          <p>{{item.title}}</p>
          <div style="font-size:12px;display: flex;justify-content: flex-start;line-height:30px;">{{item.score}}&nbsp;
            <el-rate style="margin:4px;" :colors="['#999999','#999999','#999999']" disabled v-bind="parseInt(item.score)"></el-rate>
            <p >评论({{item.leaving_num}})</p>
          </div>
          <div style="font-size:12px; color:#999999">
            <span>￥{{item.price}}&nbsp;&nbsp;每人</span>
            <span >已有{{item.sale_num}}人预定</span>
          </div>
        </div>
        <div style="width:225px;text-align: right;color:#999999;line-height:170px">
          <div style="font-size:12px;"><span>无法邀请志愿者</span>&nbsp;&nbsp;<span>已取消活动</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "abolish",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        activeList:[]
      }
    },
    methods:{
      toApplication(item,index){
        this.$router.push({
          path:'/application',
          query:{
            information: item.activity_id
          }
        })
      },
      getActive(){
        this.$http.post(this.api + '/home/Activity/complete',{
          token: localStorage.getItem('token'),
          flag:3
        })
          .then(res=>{
            if(res.data.code == 1){
              this.activeList = res.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/Index/token')
                .then(res=>{
                  if(res.data.code == 1){
                    localStorage.setItem('token',res.data.data)
                    this.getActive()
                  }
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
      toInvite(item,index){
        localStorage.setItem('invite_id',item.activity_id)
        this.$router.push({
          path: '/invitVolunter'
        })
      }
    },
    mounted() {
      this.getActive()
    }
  }
</script>

<style scoped>

</style>
