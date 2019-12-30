<template>
    <div>
      <div style="text-align: center;padding:100px;">
        <div v-if="type== 'xin'">
          <img src="../../static/img/static/none/xin.png">
          <p style="color:#D1D0D6">您还没有创建心愿单哦~</p>
        </div>
        <div v-if="type== 'jouney'">
          <img src="../../static/img/static/none/jouney.png">
          <p style="color:#D1D0D6">您还没有旅程计划哦~</p>
        </div>
        <div v-if="type== 'active'||type=='ALLactive'">
          <img src="../../static/img/static/none/active.png">
          <p style="color:#D1D0D6">{{type=='active'?'您还没有创建体验哦~':'没有您搜索的体验哦~，换个词试试吧！'}}</p>
        </div>
        <div v-if="type== 'order'">
          <img src="../../static/img/static/none/order.png">
          <p style="color:#D1D0D6">您还没有添加订单哦~</p>
        </div>
        <div v-if="type== 'lookOrder'||type=='refundPage'||type=='application'">
          <img src="../../static/img/static/none/order.png">
          <p  style="color:#D1D0D6;margin: 40px 0;">{{type=='lookOrder'?'so sorry,您的体验还没有人预定哦~':type == 'application'?'您的体验还没有人来报名志愿者哟~':'您的体验很不错哟！没有退订'}}</p>
        </div>
        <div v-if="type== 'person'">
          <img src="../../static/img/static/none/person.png">
          <p style="color:#D1D0D6">{{personThing}}</p>
        </div>
        <div v-if="type == 'local'">
          <img src="../../static/img/static/none/local.png">
          <p style="color:#D1D0D6">i am sorry，暂无您搜索的数据！</p>
        </div>
        <div v-if="type == 'story'">
          <img src="../../static/img/static/none/story.png">
        </div>
        <div v-if="type == 'jiaoYi'">
          <img src="../../static/img/static/none/jiaoYi.png">
          <p style="color:#D1D0D6">没找到您的交易流水，快花点吧!QAQ</p>
        </div>
        <div v-if="type == 'message'">
          <img src="../../static/img/static/none/message.png">
          <p style="color:#D1D0D6">您没有收到任何消息，待会再来看看哦~</p>
        </div>
        <div v-if="type == 'none'||type=='publish'|| type =='myPlay'||type=='invite'||type == 'myInvite'|| type == 'noCommen'|| type == 'noPlayCommen'||type=='suceeIvit'|| type == 'zan'">
          <img src="../../static/img/static/none/none.png">
          <p>{{type == 'none'?'暂无志愿者，快去成为志愿者吧！':type == 'myPlay'?'您还没有创建体验喔~':type=='invite'?'您还没有策划者邀请你喔~':type == 'myInvite'?'你还没有去参加报名体验呢~':type == 'noCommen'?'暂无游客评论!':type == 'noPlayCommen'?'暂无策划者评论!':type=='suceeIvit'?'还没有邀请志愿者喔！':type == 'zan'?'没得赞你的用户哟！':'您还没有创建这一类的体验哦~'}}</p>

        </div>
        <div v-if="type == 'myPlay2'">
          <img src="../../static/img/static/none/comment.png">
          <p>还没有顾客参与并完成您的体验喔~</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "noNumber",
      props:['type','personThing']
    }
</script>

<style scoped>

</style>
