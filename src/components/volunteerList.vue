<template>
  <div>
    <Head type="volunteerList"></Head>
    <div style="width:100%;height:400px; margin-top: 84px;font-size: 0;position: relative">
      <img src="../../static/img/static/voluun_1.png"  width="100%" height="33%">
      <img src="../../static/img/static/voluun_2.png"  width="100%" height="33%">
      <img src="../../static/img/static/voluun_3.png"  width="100%" height="33%">
    </div>
    <div style="text-align: left;width:1080px;margin: 25px auto;font-size: 15px;">
      <h2>{{allText.content[0][Lan]}}</h2>
      <div style="display: flex;justify-content: flex-start;margin-top:15px;">
        <div>
          <loadingImg type="3" :src="imgUrl" style="width:250px;height:293px;"></loadingImg>
        </div>
        <div style="margin-left:15px;">
          <h4>{{allText.content[1][Lan]}}</h4>
          <div style="line-height:30px;">
           {{allText.content[2][Lan]}}
          </div>
          <h4 style="margin-top:15px;">{{allText.content[3][Lan]}}</h4>
          <div style="line-height:30px;">
            {{allText.content[4][Lan]}}
          </div>
          <h4 style="margin-top:15px;">{{allText.content[5][Lan]}}</h4>
          <div style="line-height:30px;">
            {{allText.content[6][Lan]}}
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0px auto 100px;width: 1080px;text-align:left;padding-top: 1px;">
      <h2 style="margin: 35px 0px;">{{allText.content[7][Lan]}}</h2>
      <hr style="color: #00a2cf;margin-bottom: 20px;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item :label="allText.search[0][Lan]">
            <el-select v-model="formInline.score" :placeholder="allText.search[0][Lan]">
              <el-option
                v-for="item in scoreList"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="allText.search[1][Lan]">
            <el-select v-model="formInline.language" style="width:200px;" :placeholder="allText.search[1][Lan]">
              <el-option
                v-for="item in languageArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="allText.search[2][Lan]">
            <City type="1" v-on:selectXian="selectXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{allText.search[3][Lan]}}</el-button>
          </el-form-item>
        </el-form>
        <div v-if="allVolunteer.length" class="volunteer">
          <div class="list"  v-for="(item,index) in allVolunteer" :key="index" style="">
            <div>
              <loadingImg type="2" :src="item.head_image?item.headimage.domain + item.headimage.image_url:'../../static/img/static/user.png'" style="width:100%;height:200px;" ></loadingImg>
            </div>
            <div style="width:188px;font-size:12px;line-height:20px;padding:15px 5px 10px 5px;border:1px solid #eee;border-top:none">
              <div style="display: flex;">
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{(item.family_name+item.middle_name+item.name)?item.family_name+' '+item.middle_name+' '+item.name:'匿名用户'}}</b></div>
              </div>
              <div style="display: flex;justify-content: flex-start;margin: 10px 0;">
                <div>{{item.score}}</div>
                <div style="margin-left:10px">  <el-rate
                  disabled
                  v-bind="parseInt(item.score)"
                  :colors="['#14c5ca', '#14c5ca', '#14c5ca']">
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
            allText:{
              content:[
                {
                  'zh':'关于志愿者',
                  'en':'About volunteers',
                  'ja':'ボランティアについて'
                },
                {
                  'zh':'何为志愿者',
                  'en':'What is a volunteer',
                  'ja':'ボランティアとは'
                },
                {
                  'zh':'志愿者（Volunteer）联合国定义为“自愿进行社会公共利益服务而不获取任何利益、金钱、名利的活动者”， 具体指在不为任何物质报酬的情况下，能够主动承担社会责任而不获取报酬，奉献个人时间和行动的人。',
                  'en':'Volunteer is defined by the United Nations as "an activist who voluntarily provides services in the public interest without obtaining any benefits, money, fame or fortune", specifically refers to being able to take social responsibility without receiving remuneration without any material remuneration , People who dedicate their time and actions.',
                  'ja':'ボランティアは、国連により「利益、金銭、名声、財産を獲得することなく公共の利益のために自発的にサービスを提供する活動家」と定義され、具体的には実質的な報酬なしに報酬を受け取ることなく社会的責任を取ることができることを指します 、自分の時間と行動を捧げる人々。'
                },
                {
                  'zh':'为何我们会推出志愿者服务',
                  'en':'Why we will launch volunteer services',
                  'ja':'ボランティアサービスを開始する理由'
                },
                {
                  'zh':'因为我们的平台的服务会努力做到面向于全世界来自不同国家，不同语言环境下生活的人们。为了更方便大家的交 流，同时也为了提升活动参加者们的体验感。我们特地推出了志愿者服务。无论是策划人还是活动参加者在未来都 可以在我们平台上成为志愿者。',
                  'en':'Because the service of our platform will strive to be for people from different countries and different languages in the world. In order to make it easier for everyone to communicate, but also to enhance the sense of experience of the participants. We specially launched a volunteer service. Both planners and event participants can become volunteers on our platform in the future.',
                  'ja':'私たちのプラットフォームのサービスは、世界のさまざまな国や異なる言語の人々を対象とするよう努めるからです。 誰もがコミュニケーションしやすいようにするだけでなく、参加者の体験感を高めるためにも。 特別ボランティアサービスを開始しました。 プランナーとイベント参加者の両方が、将来、私たちのプラットフォームでボランティアになることができます。'
                },
                {
                  'zh':'我们对志愿者的唯一要求',
                  'en':'Our only requirement for volunteers',
                  'ja':'ボランティアのための私たちの唯一の要件'
                },
                 {
                  'zh':'有一颗无私帮助他人的心。运用您的语言特长去帮助那些需要帮助的策划人和活动参加者们，包括我们平台也会异 常感激你们。关于报名参加了某活动的志愿者，基本项目都将会免费受到活动策划人的接待，以尽地主之谊。我相 信我们的策划人一定也不会让您白白忙活一趟的。而您也将因此而遇到很多来自世界各地的有趣人们。',
                  'en':'Have a selfless heart to help others. Using your language expertise to help planners and event participants who need help, including our platform, will also be very grateful to you. Regarding volunteers who sign up for an event, all basic projects will be received by the event planner free of charge, to the best of the landlord’s friendship. I believe that our planners will definitely not let you go for free. And you will meet many interesting people from all over the world.',
                  'ja':'他人を助ける無私の心を持ちなさい。 言語の専門知識を使用して、プラットフォームを含め、支援を必要とするプランナーやイベント参加者を支援することも、非常に感謝しています。 イベントにサインアップするボランティアに関して、すべての基本的なプロジェクトは、家主の友情の範囲内で、イベントプランナーが無料で受け取ります。 私たちのプランナーは、あなたが無料で行くことを絶対に許さないと思います。 そして、あなたは世界中から多くの興味深い人々に会います。'
                },
                {
                  'zh':'搜索志愿者',
                  'en':'Search volunteers',
                  'ja':'ボランティアを検索'
                }
              ],
              search:[
                {
                  'zh':'评分',
                  "en":'score',
                  "ja":'スコア'
                },
                {
                  'zh':'语言',
                  "en":'Language',
                  "ja":'言語'
                },
                {
                  'zh':'地区',
                  "en":'area',
                  "ja":'範囲'
                },
                {
                  'zh':'查询',
                  "en":'search',
                  "ja":'検索する'
                },
               
              ]
            }
          }
      },
      components:{
        Head,
        Foot,
        City,
        None,
        loadingImg
      },
      computed:{
        Lan(){
       
          return this.Store.getters.getValue
        }
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
                    this.getAllvolunter(val)
              }else{
                this.$message({type:'error',message:res.data.msg})
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
