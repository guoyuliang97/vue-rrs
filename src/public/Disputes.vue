<template>
      <el-container>
        <el-header><Head type="Disputes"></Head></el-header>
        <el-main style="text-align: left;width:600px;margin: 0 auto;">
          <h2>联系电话：1111111111111111111</h2>
          <p>输入您的问题：</p>
          <el-input type="textarea" :autosize="{minRows:4}" ></el-input>
          <el-button type="primary" plain @click="back">返回</el-button><el-button type="primary" plain>提交</el-button>
        </el-main>
      </el-container>
</template>

<script>
  import Head from './head.vue'
    export default {
        name: "Disputes",
      components:{
          Head
      },
      methods:{
        back(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
h2,p,input,button{
  margin:20px 0;
}
</style>
