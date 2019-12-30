<template>
  <div style="margin-top:15px;">
    <div v-for="(item,index) in activeList" v-if="item.audit == 1">
      <p style="padding:10px;background-color: #F4F6F9;font-size:10px;color:#A8A8A8">
        发布时间：{{item.create_time}}
      </p>
      <div v-if="item.status == 0" style="display: flex;justify-content: flex-start;margin-top:10px;">
        <div>
            <span style="padding:5px 10px;color:#fff;position: absolute;font-size:12px;" :style="{backgroundColor:item.is_doing ==0? '#008489':'#FA9F00'}">
              {{item.is_doing == 0? '已发布':'进行中'}}
            </span>
          <img :src="item.cover_image? item.cover.domain+ item.cover.image_url:'../../../static/img/static/back.jpg'" width="265px" height="170px">
        </div>
        <div style="line-height:35px;width:550px;margin-left:20px;">
          <p style="color:#767676;font-size:12px;"><span v-for="items in item.kind">/{{items.kind_name}}</span></p>
          <p>{{item.title}}</p>
          <div style="font-size:12px;color:#008489;display: flex;justify-content: flex-start;line-height:30px;">{{item.score}}&nbsp;
            <el-rate style="margin:4px;" :colors="['#008489','#008489','#008489']" disabled v-bind="parseInt(item.score)"></el-rate>
            <p style="color:#000">评论({{item.leaving_num}})</p>
          </div>
          <div style="font-size:12px;">
            <span>￥{{item.price}}&nbsp;&nbsp;每人</span>
            <span style="color:#008489">已有{{item.sale_num}}人预定</span>
          </div>
        </div>
        <div style="width:225px;text-align: right">
          <el-button :type="item.enroll_count?'primary':''" style="font-size:12px;margin-top:50px;" @click="toApplication(item,index)">志愿者申请({{item.enroll_count}})</el-button>
          <div style="font-size:12px;cursor: pointer;margin-top:50px;"><span @click="toInvite(item,index)">邀请志愿者</span>&nbsp;&nbsp;<span>取消活动</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "publish",
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
          flag:2
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
