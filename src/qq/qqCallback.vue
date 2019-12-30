<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "qqCallback",
    data(){
      return{
        api:this.GLOBAL.baseURL
      }
    },
    mounted(){
       this.$router.push('/publishList')

    }
  }
</script>

<style scoped>

</style>
