<template>
    <div>
      <Head type="activities"></Head>
      <div class="activities">
        <h2>为何开展活动</h2>
        <p>随着社会的发展与进步，人们的经济水平的提高。这让更多的人会去选择更优质的生活方式，这其中也包括了旅行。以前习惯跟团出行的我们，特别是年轻人们无论去哪里玩都已经习惯了自己做攻略并制定计划，再跟小伙伴们一起结伴自由行。这是现目前大部分旅行者所愿意选择的旅行方式。</p>
        <p>如果大家回想一下自己曾经出行游玩的地方，有没有发现即使自己做过攻略，后来去到当地时却发现很多都与自己所想的不一样。</p>
        <p>大景点的打卡拍照，百度上所查资料更多的是广告与推销。虽然去到了自己想去的地方，但商业化的旅游区，没有跟当地人有过深层次的交流，其实也是一次旅行的遗憾。</p>
        <p>我个人出行的时候喜欢定一个大的方向，不会说做太多攻略，一路走着一路玩。</p>
        <p>走到一个地方感觉不错就休息一下，了解下当地风土人情，跟当地人聊天互动一番。行走的路上看到新奇的玩意我都会去尝试一番，比如敲锣打鼓，舞台互动等。如此的旅行方式让我接触到很多有趣的当地人，听他们讲他们的故事，学习他们所会的技能，一起品尝大家采摘食物后并做出来的饭菜。</p>
        <p>以一个过路旅行者的身份融入进当地社会.</p>
        <p>我相信这是未来旅行的大趋势，打破了传统的旅游，方便了你我。我们将为您提供一个活动策划的平台，让更多的外来者去实际接触并了解到你们。</p>
        <p>这在带动了你们当地的旅游产业的同时也增加了个人收入，更多的是让这个社会变得更加的融洽，给你我他都留下一段美好的回忆。</p>
      </div>
      <div style="margin: 50px auto;width: 1080px;">
        <Foot></Foot>
      </div>
    </div>
</template>

<script>
  import Foot from "../../public/foot.vue"
  import Head from "../../public/head.vue"
    export default {
        name: "activities",
        components:{
          Head,
          Foot
      }
    }
</script>

<style scoped>
.activities{
  width: 1080px;
  margin: 76px auto 100px;
  text-align: left;
  line-height: 40px;
}
</style>
