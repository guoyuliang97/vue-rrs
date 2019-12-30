<template>
    <div style="text-align:left">
      <div style="text-align: right;font-size: 13px;font-weight: bold;cursor: pointer" :style="{color:clearNum?'#008489':'#8e8e8e'}"><span @click="clearNum?readall():''">{{clearNum?'全部标为已读':'全部为已读'}}</span></div>
      <div v-for="(item,index) in messageList" @click="check(item,index)" style="margin-bottom:20px;line-height:30px;cursor: pointer;display: flex;justify-content: space-between;border-bottom:1px solid #eee">
        <div>
          <p>{{item.title}}</p>
          <p style="font-size:12px">{{item.send_time}}</p>
        </div>
       <div>
         <el-badge :value="item.read_user_list.indexOf(userId) !== -1? '':'1' " class="item">
         </el-badge>
       </div>
      </div>
      <None v-if="!messageList.length" type="message"></None>
      <div style="margin:20px 0;text-align: center">
        <el-pagination  @current-change="handleCurrentChange"  :current-page.sync="index"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import Bus from '../../assets/eventBus'
  import None from '../../public/noNumber'
  import Person from '../../public/person.vue'
    export default {
        name: "SystemMessage",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            messageList:[],
            total:0,
            isLoading:false,
            userId:'',
            index:1,
            page:1,
            clearNum:''
          }
      },
      components:{
          Person,
        None,
        Loading
      },
      methods:{
          readall(){
            this.$http.post(this.api + '/SysMsgReadAll',{
              token: localStorage.getItem('token')
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.clearNum = ''
                  this.getMessage()
                  Bus.$emit('clearAll',1)
                }else if(res.data.code == 3){
                  this.readall()
                }else{
                  alert(res.data.msg)
                }
              })
          },
        handleCurrentChange(val){
          this.page = val
          this.getMessage()
        },
          check(item,index){
            if(!item.read_user_list.length){
              this.sendNumber()
            }
              this.$router.push({
              path:'/messagePage',
              query:{
                information:item.msg_id
              }
            })
          },
        getMessage(){
          this.isLoading = true
            this.$http.post(this.api + '/sysmsgl',{
              token: localStorage.getItem('token'),
              page:  this.page
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.total = res.data.data.total
                  this.messageList = res.data.data.data
                  this.isLoading = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.getMessage(val)
                    })
                }else if(res.data.code == 0){
                  this.isLoading = false
                  alert(res.data.msg)
                }
              })
        },
        sendNumber(){
          Bus.$emit('reduce',1)
        }
      },
      mounted() {
          this.getMessage(1)
      },
      created(){
          this.userId = this.$route.query.information
        this.clearNum = this.$route.query.clearNum
        Bus.$on('alearAll',msg =>{
          if(msg){
            this.clearNum = 0
          }
        })
      }
    }
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
