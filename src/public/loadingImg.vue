<template>
    <div>
      <img v-if="type == '1'" :src="imgUrl"  class="img2" >
      <img v-if="type == '2'" :src="imgUrl" @click="toPublish" class="img2">
      <img v-if="type == '3'" :src="imgUrl" @click="toPublish" class="img2">
      <img v-if="type == '4'" :src="imgUrl" @click="toPublish" style="height:100%;width:100%;border-radius: 10px">
      <div v-if="type == '5'" :style="{background: 'url('+imgUrl+')'}" ></div>
      <img v-if="type == '6'" :src="imgUrl" @click="toPublish" class="user">
    
    
      <!-- 第二版本新增 -->
      <img class="img" @click="toPublish" v-if="type == 'new2'" :src="imgUrl">
    

      <!-- 头像图片 -->
      <img class="user" @click="toPublish" v-if="type == 'user'" :src="imgUrl">

    </div>
</template>

<script>
    export default {
        name: "loadingImg",
      props:['src','type'],
      data(){
          return{
            imgUrl:'../../static/img/static/defult.png',
            userImg: '../../static/img/static/user.png',
            loading:true
          }
      },
      watch:{
        src:function(){
         this.change()
        }
      },
      methods:{
        toPublish(){
          this.$emit('toPublish')
        },
          change(){
            var newImg = new Image();
            newImg.src = this.src;
            newImg.onerror = () => {    // 图片加载错误时的替换图片
              if(this.type == '6'){
                newImg.src = this.userImg
              }else{
                newImg.src = this.imgUrl;
              }
              this.loading = true
            };
            newImg.onload = () => { // 图片加载成功后把地址给原来的img
              this.imgUrl = newImg.src;
              this.loading = false
            }
          }
      },
      mounted() {
      this.change()
      }
    }
</script>

<style scoped>
.img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img2{
   width: 100%;
  height: 100%;
  object-fit: cover;
}
.img:hover{
       transition: all 0.6s;  
  transform: scale(1.1);  
}
.user{
  width:100%;
  height:100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
