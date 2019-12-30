<template>
  <div>
    <Head type="wish"></Head>
    <div style="margin:80px auto;width:1080px;">
      <p style="margin:20px 0;display: flex;justify-content: space-between;cursor: pointer"><span>心愿单名称:<b>{{Groupname}}</b></span><span v-if='!isXin' @click="isDeel=!isDeel">{{isDeel?'取消':'删除'}}</span></p>
      <hr style="color:#339da1;">
      <div style="width:100%;display:flex;flex-wrap:wrap;margin-top: 30px;" v-if="activeList.length">
        <div class="active" v-for="(item,index) in activeList" :key="index">
          <div v-show="isDeel" @click="deel(item,index)" style="position: absolute;cursor:pointer;right:10px;top:10px;z-index:9;font-size:20px;color:#fff;"><i class="el-icon-delete"></i></div>
          <div v-if="item.flag == 1">
            <div v-if="item.status == 1" style="position:absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(	169,169,169,.8);color:#fff;line-height:242px;">已删除</div>
            <div style="cursor: pointer" @click="toPublish(item,index)">
              <img alt="" width="100%" height="200px" :src="item.domain + item.image_url"/>
            </div>
            <div style="display: flex;justify-content: space-between;font-size:14px;">
              <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.title}}</p>
              <div style="margin-left:20px;width:100px;text-align: right">
                <p>{{item.create_time}}</p>
              </div>
            </div>
            <div style="display: flex;justify-content: space-between;font-size:14px;">
              <p><span v-for="items in item.kind"><span>{{items.kind_name}}/</span></span></p>
            </div>
          </div>
          <div v-if="item.flag == 2">
            <div class="detail_img wonderful_img" :style="{background:'url('+item.domain+item.image_url+') no-repeat',backgroundSize:'cover'}" @click="toStory(item,index)">
              <div style="color:#000;">故事</div>
            </div>
            <div  style="margin-top: 10px;text-align: left;">
              <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isXin">
        <None type="xin"></None>
      </div>
    </div>
  </div>
</template>
<script>
  import Detail from "../../public/detail.vue"
  import Head from "../../public/head.vue"
  import None from '../../public/noNumber'
  export default {
    name: "wishPage",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        activeList:[],
        group_id:'',
        Groupname:'',
        isDeel:false,
        isXin:false
      }
    },
    components:{
      Head,
      Detail,
      None
    },
    methods:{
      //移除
      deel(item,index){
        this.$confirm('此操作将移除您的心愿单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deelGroud(item,index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deelGroud(item,index){
        this.$http.post(this.api + '/home/Comment/collection',{
          token: localStorage.getItem('token'),
          table_id: item.table_id,
          group_id:this.group_id,
          flag: item.flag,
          type: 2
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.activeList.splice(index,1)
            }else if(res.data.code == 3){

            }else{
              alert(res.data.msg)
            }
          })
      },
      toPublish(item,index){
        this.$router.push({
          path: '/publishPage',
          query:{
            information:item.table_id
          }
        })
      },
      getGroup_id(){
        this.group_id = this.$route.query.group_id
        this.getCollect()
      },
      getCollect(){
        this.$http.post(this.api + '/collectional',{
          token: localStorage.getItem('token'),
          group_id: this.group_id
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data.data
              this.activeList = data
              if(!data.length){
                this.isXin = true
              }else{
                this.isXin = false
              }
            }else if(res.data.code == 3){
              alert(res.data.msg)
            }else{
              alert(res.data.msg)
            }
          })
          .catch(error=>{
            alert(error)
          })
      },
      toStory(item){
        this.$router.push({
          path: '/storyPage',
          query:{
            information: item.table_id
          }
        })
      }
    },
    mounted() {
      let _this = this
      _this.getGroup_id()
      _this.Groupname = this.$route.query.name
    }
  }
</script>

<style scoped>
  .active{
    width:330px;
    margin-right:45px;
    margin-bottom:20px;
    position: relative;
  }
.active:nth-child(3n){
   margin-right:0px
}
  .detail_img{
    width: 100%;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
  }
  .detail_img img{
    width: 100%;
    height: 200px;
  }
  .wonderful_img{
    position: relative;
    height: 200px;
    border-radius: 10px;
  }
  .wonderful_img>div{
    width:50px;
    height: 30px;
    background-color: white;
    color: #008489;
    border-radius: 5px;
    position: absolute;
    right: 15px;
    bottom: 15px;
    line-height: 30px;
  }
</style>
