<template>
  <div>
    <Head type="about"></Head>
    <div class="about-text">
      <div style="background-image:url('../../../static/img/static/aboutUs.png');padding: 50px 0;color:#fff;background-size: cover">
        <h2 style="text-align: center;letter-spacing:10px">关于我们</h2>
        <p style="text-align: center">ABOUT US</p>
        <div style="line-height: 40px;width:60%;margin:40px auto 0;text-indent: 2rem;">人耍公司成立于2018年10月19日。公司的创始人是一名90后的年轻人，我们公司的团队成员也都是一批年轻，有想法的年轻人们。
          .
          我司注重让国内外的游客们体验到当地的风土人情，实实在在的与不同国家与地区的人一起度过愉快而又值得回忆的一段时光。达到更深层次旅行意义的体验。

          我们会在今后与未来里不断的去提供更优质和贴心的服务给一直热爱我们的顾客们。

          关于我们平台推出的活动策划人和志愿者服务：活动策划人美名其曰是整个活动的负责人和发起人，有了他们才有了参加活动的机会。因为我们的平台的方针是把中国国内的客人带出国，把国外的客人带进来。国内外的客人去到国外旅行时，特别是参加当地人举办的活动，自然会遇到语言障碍。为了能够很好的解决这个问题，我们推出了志愿者服务，让会多国语言的志愿者去帮助我们的策划人和旅行者，让双方都能有一次愉快的，更深的一次异文化交流。

          如有任何问题或者商业上的合作，请您联系我们，我们会在最短的时间（12小时内）给您答复。</div>
      </div>
      <div style="text-align: center;margin-top:50px;">
        <h2 style="letter-spacing:10px">公司创始人</h2>
        <p>COMPANY FOUNDER</p>
      </div>
      <div style="width:1080px;margin: 0 auto;;display: flex;justify-content: center">
        <div style="width:134px;height:134px;border-radius: 50%;background-image: url('../../../static/img/static/boss.png');background-size: cover">
        </div>
        <div style="width:750px;margin-left:50px;font-weight: bold">
          <h2 style="color:#008489">陈浩明</h2>
          <p>人人耍创始人</p>
          <p style="margin-top: 30px;">陈浩明，xxxx年出生于xxxx，xxx岁留学xxx大学，走遍多个国家，于2018年10月19日创立人人耍。</p>
          <p style="margin: 20px 0;">于为何会想到创立人人游这个公司还得追溯到3年前，我第一次去欧洲旅行的时候。通过airbnb预定了住宿，那时才第一次开始有了跟不同国家的当地人深入交流的机会。但离开住处去往其它地方时都是一个人独自行走着，没有陪同的人。有一瞬间我至今都还记得，我坐在去往伯尔尼的火车上，看到窗外有一位英姿飒爽的小姐姐骑着骏马在森林里穿梭着，当时我心里一动，如果我也能与她骑马并行聊天，那会是一件多么充满回忆的体验。</p>
          <p> 那时候的airbnb貌似还没有开展体验这一项目，而我已经有了想法想一番与之相关的事业。历经多年后我终于算是踏出了我创业的第一步。将美好的体验和服务带给参与者就是我们的目标将美好的体验和服务带给参与者就是我们的目标</p>
        </div>
      </div>
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
    name: "about",
    components:{
      Head,
      Foot
    },
    mounted() {
      window.scroll(0,0)
    }
  }
</script>

<style scoped>
  .about-text{
    line-height: 40px;
    text-align: left;
    margin: 76px auto 100px;
  }
</style>
