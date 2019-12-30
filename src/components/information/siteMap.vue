<template>
    <div>
      <Head type="siteMap"></Head>
      <el-tabs style="margin: 76px auto 100px;width: 1080px; " v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="目的地" name="first">目的地</el-tab-pane>
        <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
        <el-tab-pane label="心愿单" name="third">心愿单</el-tab-pane>
        <el-tab-pane label="各国人人游网站" name="fourth">各国人人游网站</el-tab-pane>
      </el-tabs>
      <div style="margin: 50px auto;width: 1080px;">
        <Foot></Foot>
      </div>
    </div>
</template>

<script>
  import Foot from "../../public/foot.vue"
  import Head from "../../public/head.vue"
  export default {
    name:'siteMap',
      components:{
        Head,
        Foot
      },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>

</style>
