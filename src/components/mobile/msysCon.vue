<template>
    <div>
      <div style="padding: 1rem;">
        <div style="display: flex;justify-content: flex-start;margin-bottom: 2rem; ">
          <div>
            <img src="../../../static/img/static/logo1.png" style="width:4rem;height:4rem;border-radius: 50%;">
          </div>
          <div style="margin-left:1rem;width:100%">
            <div style="display: flex;justify-content: space-between;">
              <div>通知</div>
              <div>{{create_time}}</div>
            </div>
            <div style="padding: 1rem 0;border-bottom: 1px solid #eee;width:100%;" id="content"></div>
          </div>
        </div>
      </div>
    </div>
</template>

  <script>
    import { MessageBox } from 'mint-ui'
    export default {
        name: "msysCon",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            messId:'',
            title:'',
            create_time:"",
          }
      },
      methods:{
          getMess(){
            this.$http.post(this.api + '/SysMsgD',{
              token: localStorage.getItem('token'),
              msg_id: this.messId
            })
              .then(res=>{
                if(res.data.code == 1){
          
                  let  data = res.data.data
                  this.title = data.title
                  this.create_time = data.send_time
                  var div = document.getElementById('content')
                  div.innerHTML = data.content
                }else if(res.data.code == 3){
                  this.getMess()
                }else if(res.data.code == 0){
                  MessageBox.alert(res.data.msg)
                }
              })
          },
      },
      mounted(){
          this.getMess()
      },
      created(){
         this.messId =  this.$route.query.information
      
      }
    }
</script>

<style scoped>

</style>
