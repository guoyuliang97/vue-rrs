<template>
    <div style="text-align:left;line-height:30px;font-size:18px;">
      <P @click="fanhui"><i class="el-icon-arrow-left"></i>返回</P>
      <p style="margin-top:20px;">发件人：<b>Allptop客服人员：</b>
     </p>
      <h4 style="font-size:18px;">{{title}}</h4>
      <p style="font-size:18px">{{create_time}}</p>
      <div style="font-size:12px" id="content">
      </div>
    </div>
</template>

<script>

    export default {
        name: "messagePage",
      data(){
        return{
          api:this.GLOBAL.baseURL,
          title:'',
          create_time:'',
          msg_id:''
        }
      },
      created:function(){
        this.msg_id = this.$route.query.information
      },
      methods:{
          fanhui(){
            this.$router.go(-1)
          },
        getParams(){
          this.$http.post(this.api + '/SysMsgD',{
            token: localStorage.getItem('token'),
            msg_id: this.msg_id
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.title = data.title
                this.create_time = data.send_time
                var div = document.getElementById('content')
                div.innerHTML = data.content
              }else if(res.data.code == 3){
                this.getParams()
              }else{
                alert(res.data.msg)
              }
            })
        },

      },
      mounted(){
          this.getParams()

      }
    }
</script>

<style scoped>

</style>
