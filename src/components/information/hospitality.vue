<template>
    <div>
      <Head type="hospitality"></Head>
      <div class="hospitality">
        <div class="hospitality_list">
          <router-link to="/basic"><h4>基本要求</h4></router-link>
          <router-link to="/evaluation"><h4>评价</h4></router-link>
          <router-link to="/religious"><h4>宗教和饮食习惯</h4></router-link>
        </div>
        <div class="hospitality_content">
          <router-view></router-view>
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
        name: "hospitality",
      components:{
          Head,
        Foot
      }
    }
</script>

<style scoped>
  a{
    color:#000;
    text-decoration: none;
  }
.hospitality{
  width: 1080px;
  margin: 76px auto 100px;
  padding: 20px;
  display: flex;
  line-height: 40px;
  justify-content: flex-start;
}
.hospitality_list{
  display: flex;
  width: 270px;
  flex-direction: column;
}
  .hospitality_content{
    width: 790px;
    line-height: 40px;
    text-align: left;

  }
</style>
