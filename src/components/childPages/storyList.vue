<template>
    <div>
      <el-container>
        <el-header><Head type="storyList"></Head></el-header>
        <el-main style="width:800px;margin: 20px auto;text-align: left">
          <div style="display: flex;justify-content: space-between">
            <div>
              <p style="font-size:30px;font-weight:bold">欢迎回来</p>
              <p>查看并编辑您的全部故事。</p>
            </div>
            <div>
              <el-button type="primary" plain @click="toStory">新故事</el-button>
            </div>
          </div>
          <div v-for="(item,index) in publishList" style="display: flex;justify-content: space-around;margin-top:50px">
            <LoadingImg type="3" :src="item.cover.domain + item.cover.image_url" style="width:300px;height:200px"></LoadingImg>
            <div style="line-height:40px;width:300px;">
              <h4>{{item.title}}</h4>
              <div style="display: flex;justify-content: flex-start">
                <div v-for="(items,indexs) in item.kind" >
                  <span>/{{items.kind_name}}&nbsp;</span>
                </div>
              </div>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content }}</div>
              <el-button type="primary" plain @click="toPublish(item,index)">查看</el-button>
              <el-button type="primary" plain @click="toRemake(item,index)">修改</el-button>
            </div>
            <div>
              <el-popover
                placement="top"
                width="160"
                v-model="item.visible">
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="abolish(item,index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="delet(item,index)">确定</el-button>
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div>
            </div>
          <div v-if="!publishList.length" style="text-align: center" >
            <None type='story'></None>
            <p>还没有创建故事哦~</p>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
  import None from '../../public/noNumber'
  import Head from '../../public/head.vue'
    export default {
        name: "storyList",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            publishList:[],

          }
      },

      components:{
        Head,
        None,
        LoadingImg
      },
      methods:{
        toRemake(item,index){
          this.$router.push({
            name:'storyPublish',
            query:{
              storyId:item.story_id
            }
          })
        },
        toStory(){
          this.$router.push('/storyPublish')
        },
        toPublish(item,index){
          this.$router.push({
            name: 'storyPage',
            query:{
              information: item.story_id
            }
          })
        },
        delet(item,index){
          this.$http.post(this.api + '/home/Story/del_story',{
            token: localStorage.getItem('token'),
            story_id: item.story_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.visible2 = false
                this.publishList.splice(index,1)
              }else if(res.data.code == 3){

              }else{

              }
            })
        },
        abolish(item,index){
          item.visible = false
        }
      },
      mounted(){
          this.$http.post(this.api + '/storyc',{
            token: localStorage.getItem('token'),
            sort:1,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.publishList = res.data.data.data
                for(let i =0;i<this.publishList.length;i++){
                  this.publishList[i].push = ({visible:false})
                }
              }else if(res.data.code == 3){
                alert(res.data.msg)
              }else{
                alert(res.data.msg)
              }
            })
      }
    }
</script>

<style scoped>
  .experienceState{
    width:60px;
    text-align: center;
    height:30px;
    margin:10px 0 0 10px;
    border-radius:5px;
    line-height:30px;
    color:white;
  }
</style>
