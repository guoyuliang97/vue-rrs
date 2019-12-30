<template>
    <div style="margin-top:10px;">
      <Head type="myPlay"></Head>
      <div style="width:1080px;margin: 106px auto;">
        <h4 style="display: flex;justify-content: space-between">我的策划&gt;查看志愿者申请({{volunList.length}})<span style="cursor: pointer" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span></h4>
        <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;">
          <div class="miniwidth">头像/昵称</div><div class="miniwidth">性别</div><div class="miniwidth">语言/技能</div><div class="miniwidth">申请时间</div><div class="miniwidth">备注</div><div class="miniwidth">志愿人评分</div><div class="miniwidth">操作</div>
        </div>
        <div v-for="(item,index) in volunList" :key="index" style="border-bottom: 1px solid #E6E6E6">
          <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
            <div style="display: flex;justify-content:flex-start;width:150px;padding:19px 0;">
              <img :src="item.user.head_image?item.user.headimage.domain + item.user.headimage.image_url:'../../../static/img/static/user.png'" width="32px" height="32px" style="border-radius: 50%;margin-left:40px;">
              <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.user.family_name+item.user.middle_name+ item.user.name)?(item.user.name):'匿名用户'}}</div>
            </div>
            <div class="width">{{sexArr[item.user.six].label}}</div>
            <div><el-popover
              placement="top-start"
              trigger="click"
              width="200"
              @show="takeUp(item,index)"
              :content="content"
             >
              <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{languageList[item.main_language].label}},<span v-for="(items,indexs) in item.language">{{languageList[items].label}},</span>/{{item.skill}}</el-button>
            </el-popover></div>
            <div><el-popover
              placement="top-start"
              trigger="click"
              width="200"
              :content="item.slot_id[0].begin_time+'—'+item.slot_id[0].end_time"
            >
              <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.slot_id[0].begin_time}}-{{item.slot_id[0].end_time}}</el-button>
            </el-popover></div>
            <div><el-popover
              placement="top-start"
              trigger="click"
              width="200"
              :content="item.introduce"
            >
              <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.introduce}}</el-button>
            </el-popover></div>
            <div  style="width:150px;padding:19px 0">
              <el-rate
                v-bind="parseInt(item.score)"
            disabled
            show-score
            :colors="['#008489','#008489','#008489']"
            text-color="#008489"
            score-template="{value}">
          </el-rate></div>
            <div class="width" v-if="item.audit == 0">
              <el-button type="primary"  size="mini" @click="changeErollA(item,1)" >同意</el-button>
              <el-button type="primary" size="mini" @click="changeErollA(item,2)" plain>谢绝</el-button>
            </div>
            <div class="width" v-if="item.audit">
              <el-button type="primary" size="mini" :style="{backgroundColor:item.audit == 2? '#fff':'#008489',color:item.audit == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'已同意':'已谢绝'}}</el-button>
            </div>
          </div>
        </div>
        <div v-show="!volunList.length">
          <None type='application'></None>
        </div>
        <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
          <Loading></Loading>
        </div>
        <div style="margin:20px 0;">
          <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import lan  from '../../../static/js/language'
  import test from '../../../static/js/sex'
  import Head from '../../public/head'
  import None from '../../public/noNumber'
    export default {
        name: "appliCation",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            volunList:[],
            activity_id:'',
            total:0,
            content:'',
            languageList:[
            ],
            sexArr:[],
            isLoading:false
          }
      },
      components:{
        Head,
        None,
        Loading
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        getEroll(val){
          this.isLoading = true
          this.$http.post(this.api + '/ErollL',{
            token: localStorage.getItem('token'),
            activity_id:this.activity_id,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.volunList = res.data.data.data
                this.total = res.data.data.total
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                    }
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        },
        handleCurrentChange(val){
          this.getEroll(val)
        },
        takeUp(item,index){
          let a = ''
          let b = this.languageList[item.main_language].label + ','
          for(let i = 0;i<item.language.length;i++){
            a += this.languageList[item.language[i]].label+','
          }
          a = a +'/'+ item.skill
          this.content =b+ a
        },
        changeErollA(item,val){
          this.isLoading = true
         this.$http.post(this.api + '/ErollA',{
           token: localStorage.getItem('token'),
           enroll_id: item.enroll_id,
           flag: val
         })
           .then(res=>{
             if(res.data.code == 1){
               item.audit = val == 1? 1:2
               this.isLoading = false
             }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   if(res.data.code == 1){
                     localStorage.setItem('token',res.data.data)
                     this.changeErollA(item,val)
                   }
                 })
             }else if(res.data.code == 0){
               alert(res.data.msg)
               this.isLoading = false
             }
           })
        }
      },
      mounted(){
        this.getEroll(1)
      },
      created(){
          this.languageList = lan()
        this.sexArr = test()
        this.activity_id = this.$route.query.information
      }
    }
</script>

<style scoped>
.miniwidth{
  width:150px;
  height:25px;
}
  .width{
    width:150px;
    height:70px;
    line-height:70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
