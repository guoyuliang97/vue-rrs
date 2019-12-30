<template>
    <div>
      <Head type="whyVolunteer"></Head>
      <div class="whyVolunteer">
        <h2>为何做志愿者</h2>
        <p><b>何为志愿者</b></p>
        <p>志愿者（Volunteer）联合国定义为“自愿进行社会公共利益服务而不获取任何利益、金钱、名利的活动者”，具体指在不为任何物质报酬的情况下，能够主动承担社会责任而不获取报酬，奉献个人时间和行动的人。</p>
        <p><b>关于为何我们平台会推出志愿者服务</b></p>
        <p>因为我们的平台的服务会努力做到面向于全世界来自不同国家，不同语言环境下生活的人们。为了更方便大家的交流，同时也为了提升活动参加者们的体验感。我们特地推出了志愿者服务。无论是策划人还是活动参加者在未来都可以在我们平台上成为志愿者。</p>
        <p><b>我们对志愿者的唯一要求就是：</b></p>
        <p>有一颗无私帮助他人的心。运用您的语言特长去帮助那些需要帮助的策划人和活动参加者们，包括我们平台也会异常感激你们。</p>
        <p>关于报名参加了某活动的志愿者，基本项目都将会免费受到活动策划人的接待，以尽地主之谊。我相信我们的策划人一定也不会让您白白忙活一趟的。而您也将因此而遇到很多来自世界各地的有趣人们。</p>
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
      components:{
        Head,
        Foot
      }
    }
</script>

<style scoped>
.whyVolunteer{
  margin: 76px auto 100px;
  width: 1080px;
  line-height: 40px;
  text-align: left;
}
</style>
