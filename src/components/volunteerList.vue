<template>
  <div>
    <Head type="volunteerList"></Head>
    <div style="width:100%;height:400px; margin-top: 84px;font-size: 0;position: relative">
      <img src="../../static/img/static/voluun_1.png"  width="100%" height="33%">
      <img src="../../static/img/static/voluun_2.png"  width="100%" height="33%">
      <img src="../../static/img/static/voluun_3.png"  width="100%" height="33%">
    </div>
    <div style="text-align: left;width:1080px;margin: 25px auto;font-size: 12px;">
      <h2>关于志愿者</h2>
      <div style="display: flex;justify-content: flex-start;margin-top:15px;">
        <div>
          <loadingImg type="3" :src="imgUrl" style="width:250px;height:293px;"></loadingImg>
        </div>
        <div style="margin-left:15px;">
          <h4>何为志愿者</h4>
          <div style="line-height:30px;">
            志愿者（Volunteer）联合国定义为“自愿进行社会公共利益服务而不获取任何利益、金钱、名利的活动者”，
            具体指在不为任何物质报酬的情况下，能够主动承担社会责任而不获取报酬，奉献个人时间和行动的人。
          </div>
          <h4 style="margin-top:15px;">为何我们会推出志愿者服务</h4>
          <div style="line-height:30px;">
            因为我们的平台的服务会努力做到面向于全世界来自不同国家，不同语言环境下生活的人们。为了更方便大家的交
            流，同时也为了提升活动参加者们的体验感。我们特地推出了志愿者服务。无论是策划人还是活动参加者在未来都
            可以在我们平台上成为志愿者。
          </div>
          <h4 style="margin-top:15px;">我们对志愿者的唯一要求</h4>
          <div style="line-height:30px;">
            有一颗无私帮助他人的心。运用您的语言特长去帮助那些需要帮助的策划人和活动参加者们，包括我们平台也会异
            常感激你们。关于报名参加了某活动的志愿者，基本项目都将会免费受到活动策划人的接待，以尽地主之谊。我相
            信我们的策划人一定也不会让您白白忙活一趟的。而您也将因此而遇到很多来自世界各地的有趣人们。
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0px auto 100px;width: 1080px;text-align:left;padding-top: 1px;">
      <h2 style="margin: 35px 0px;">搜索志愿者</h2>
      <hr style="color: #00a2cf;margin-bottom: 20px;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="评分">
            <el-select v-model="formInline.score" placeholder="分数">
              <el-option
                v-for="item in scoreList"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言">
            <el-select v-model="formInline.language" style="width:200px;" placeholder="语言">
              <el-option
                v-for="item in languageArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区">
            <City type="1" v-on:selectXian="selectXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <div v-if="allVolunteer.length" class="volunteer">
          <div class="list"  v-for="(item,index) in allVolunteer" :key="index" style="">
            <div>
              <loadingImg type="3" :src="item.head_image?item.headimage.domain + item.headimage.image_url:'../../static/img/static/user.png'" style="width:100%;height:200px;" ></loadingImg>
            </div>
            <div style="width:188px;font-size:12px;line-height:20px;padding:15px 5px 10px 5px;border:1px solid #eee;border-top:none">
              <div style="display: flex;">
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{(item.family_name+item.middle_name+item.name)?item.family_name+'·'+item.middle_name+'·'+item.name:'匿名用户'}}</b></div>
              </div>
              <div style="display: flex;justify-content: flex-start;margin: 10px 0;">
                <div>{{item.score}}</div>
                <div style="margin-left:10px">  <el-rate
                  disabled
                  v-bind="parseInt(item.score)"
                  :colors="['#008489', '#008489', '#008489']">
                </el-rate></div>
              </div>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{sexArr[item.six].label}}</b>-<b>{{item.country !=0?item.country:'未知'}}</b>-<b>{{languageArr[item.language].label}}/<span  v-for="items in item.other_language.split(',')">{{items?items == 0?'中文,':items == 1?'English,':'日本语,':''}}</span></b></div>
              <div style="margin-top:10px;"><el-button type="primary" style="width:100%;" size="mini" @click="toPerson(item,index)">查看</el-button></div>
            </div>
          </div>
        </div>
        <div v-if="!allVolunteer.length" style="text-align: center">
          <None type="none"></None>
        </div>
        <div style="margin:20px 0;text-align: center">
          <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
      <Foot></Foot>
    </div>
  </div>
</template>

<script>
  import sexA from '../../static/js/sex'
  import test from '../../static/js/language'
  import Foot from "../public/foot.vue"
  import Head from "../public/head.vue"
  import City from "../public/city.vue"
  import None from '../public/noNumber'
  import loadingImg from '../public/loadingImg'
    export default {
        name: "volunteerList",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            formInline: {
              score: '',
              language: '',
              local: '',
              country:'',
              province:'',
              city:'',
              xian:''
            },
            imgUrl:'../../static/img/static/volunteer.png',
            total:0,
            allVolunteer: [],
            multipleSelection: [],
            sexArr:[],
            languageArr:[],
            scoreList:[
              {lable: '1分',value:1},
              {lable: '2分',value:2},
              {lable: '3分',value:3},
              {lable: '4分',value:4},
              {lable: '5分',value:5},
            ],
          }
      },
      components:{
        Head,
        Foot,
        City,
        None,
        loadingImg
      },
      methods: {
        onSubmit() {
          this.$http.post(this.api + '/home/User/user_list',{
            token: localStorage.getItem('token'),
            sort:1,
            page: 1,
            country: this.formInline.country,
            province: this.formInline.province,
            city: this.formInline.city,
            region: this.formInline.xian,
            language: this.formInline.language
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.allVolunteer = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.onSubmit()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getAllvolunter(val){
          this.$http.post(this.api + '/home/User/user_list',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.allVolunteer = res.data.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAllvolunter(val)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        toPerson(item,index){
          this.$router.push({
            path: '/userdata',
            query:{
              information: item.user_id
            }
          })
        },
        selectCountry(msg){
          this.formInline.country = msg[1]
        },
        selectProvince(msg){
          this.formInline.province = msg[1]
        },
        selectCity(msg){
          this.formInline.city = msg[1]
        },
        selectXian(msg){
          this.formInline.xian = msg[1]

        },
        handleCurrentChange(val){
          this.getAllvolunter(val)
        }
      },
      mounted() {
          window.scroll(0,0)
          this.getAllvolunter(1)
      },
      created(){
          this.languageArr = test()
        this.sexArr = sexA()
      }
    }
</script>

<style scoped>
.volunteer{
  width: 1080px;
  display: flex;
  flex-wrap: wrap;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

  .list{
    width:200px;
    margin-right:90px;
    margin-bottom:20px;
  }
  .list:nth-child(4n){
    margin-right: 0
  }
</style>
