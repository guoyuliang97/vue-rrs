<template>
    <div>
      <Head type="translation"></Head>
      <div style="width:1080px;margin:106px auto;text-align: left">
        <h4 style="display: flex;justify-content: space-between">活动名称>查看体验翻译<span @click="goBack"><i class="el-icon-arrow-left"></i>返回</span></h4>
        <div>
          <ul style="display: flex;justify-content: flex-start;border-bottom: 1px solid #eee;margin-top:40px;">
            <li v-for="(item,index) in list" @click="changeRouter(item,index)" style="font-weight:bold;width:80px;margin-right:10px;padding: 10px 0;text-align: center;font-size:12px;" :style="{borderBottom:index == colorIndex? '2px solid #008489':'none',color:index == colorIndex? '#008489':'#000' }">{{item.label}}</li>
          </ul>
        </div>
        <Loading v-show="isLoading" style="position: fixed;top:210px;left:0;right:0;bottom:0;background-color:#fff;text-align: center"></Loading>
        <div style="padding:20px 20px;border-bottom: 1px solid #E6E6E6;display: flex;justify-content: space-between" v-for="(item,index) in transList">
          <div style="display: flex;justify-content: flex-start;">
            <img :src="item.user.head_image? item.user.headimage.domain + item.user.headimage.image_url:'../../../static/img/static/user.png'" width="30px" height="30px" style="border-radius: 50%;margin-top:15px;">
            <div style="font-size:12px;margin-top:15px;margin-left:10px;width:500px;">
              <p><b>{{item.user.name?item.user.name:'匿名用户'}}</b></p>
              <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><span>{{languageId == 0?'关于策划人：':languageId == 1? 'Experience the talent show：':'体験の达人chefについて：'}}</span><b>{{item.t_introduce}}</b></p>
              <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><span>{{languageId == 0?'关于体验内容：':languageId == 1? 'Experience class capacity：':'実験内容：'}}</span><b>{{item.t_descripte}}</b></p>
            </div>
          </div>
          <div style="line-height:60px;font-size:12px;;cursor: pointer">
            <span @click="addPrase(item)" :style="{color:item.is_praise?'#008489':'#000'}"><i class="iconfont icon-zan" ></i>{{item.praise_num}}</span>
            <span @click="lookTranslate(item)" style="margin-left:20px;color:#008489;">翻译详情</span>
            <span v-if="item.user_id == owerId" @click="deleteTrans(item,index)" style="margin-left:20px;color:#008489;cursor: pointer">删除</span>
          </div>
        </div>
        <div v-if="!transList.length">
          <None type="local"></None>
        </div>
        <div style="margin:20px 0;">
          <el-pagination  @current-change="handleCurrentChange" :current-page.sync="index"   :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import None from '../../public/noNumber'
  import '../../../static/css/zan/iconfont.css'
  import Head from '../../public/head'
  import Loading from '../../public/Loading'
  import test from '../../../static/js/language'
    export default {
        name: "translation",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            colorIndex:'0',
            list:[],
            transList:[],
            activeId:'',
            languageId:0,
            isLoading:false,
            owerId:'',
            total:0,
            index:1
          }
      },
      components:{
          Head,
        Loading,
        None
      },
      watch:{
        languageId:function(){
          this.gettrans(this.languageId,1)
        }
      },
      methods:{
        handleCurrentChange(val){
          this.gettrans(this.languageId,val)
        },
        changeRouter(item,index){
          if(index != this.colorIndex){
            this.colorIndex = index
            this.languageId = item.value
          }
        },
        goBack(){
          this.$router.go(-1)
        },
        gettrans(val,page){
          this.isLoading = true
          this.$http.post(this.api + '/TranslateL',{
            token: localStorage.getItem('token'),
            activity_id: this.activeId,
            language: val,
            sort: 2,
            page: page
          })
            .then(res=>{
              if(res.data.code == 1){
                this.transList = res.data.data.data
                this.total = res.data.data.total
                this.isLoading = false
              }else if(res.data.code == 3){

              }else{
                alert(res.data.msg)
              }
            })
        },
        addPrase(item){
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: 2,
            table_id: item.translate_id,
            type: item.is_praise? 2:1
          })
            .then(res=>{
              if(res.data.code == 1){
                if(item.is_praise){
                  item.praise_num -= 1
                  this.$message({
                    type:'success',
                    message:'取消点赞！'
                  })
                }else{
                  item.praise_num += 1
                  this.$message({
                    type:'success',
                    message:'点赞成功！'
                  })
                }
                item.is_praise = item.is_praise?0:1
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.addPrase(item)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        lookTranslate(item){
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id,
              translate_id:item.translate_id
            }
          })
        },
        deleteTrans(item,index){
          this.$confirm('此操作将删除该翻译, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteT(item,index)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        deleteT(item,index){
          this.$http.post(this.api + '/TranslateD',{
            token: localStorage.getItem('token'),
            translate_id: item.translate_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type:'success',
                  message: '删除成功!'
                })
                this.transList.splice(index,1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deleteT(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getOwer(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.owerId =res.data.data[0].user_id
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOwer()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
      },
      mounted(){
          this.gettrans(this.languageId,1)
          this.getOwer()
      },
      created(){
          this.activeId = this.$route.query.activeId
          this.list = test()
      }
    }
</script>

<style scoped>

</style>
