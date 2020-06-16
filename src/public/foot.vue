<template>
    <div>
      <p v-if="type != 'home'" style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div class="box">
        
        <div>
          <h4>{{allText[0][Lan]}}</h4>
          <router-link :to="item.name"  v-for="item in personList" ><p style="margin: 20px 0px;">{{item.value[0][Lan]}}</p></router-link>
        </div>
        <div>
          <h4>{{allText[1][Lan]}}</h4>
          <router-link :to="item.name" v-for="item in plannerList" ><p  style="margin: 20px 0px;">{{item.value[0][Lan]}}</p></router-link>
        </div>
        <div>
          <h4>{{allText[2][Lan]}}</h4>
          <router-link :to="item.name" v-for="item in volunteerList" ><p  style="margin: 20px 0px;">{{item.value[0][Lan]}}</p></router-link>
        </div>
        <div>
          <h4>{{allText[3][Lan]}}</h4>
          <router-link :to="item.name" v-for="item in weChatList" ><p  style="margin: 20px 0px;">{{item.value[0][Lan]}}</p></router-link>
        </div>
      </div>
      <p v-if="type != 'home'" style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div v-if="type != 'home'" style="text-align: left">
        <p style="margin:20px 0;"><a href="http://www.beian.miit.gov.cn" target="_blank">蜀ICP备19001672号</a></p>
        <p style="">眉山市人人游网络科技有限公司</p>
      </div>

    </div>
</template>

<script>
 import test from '../../static/js/language'
    export default {
        name: "foot",
      props:['type'],
        data(){
          return{
            personList:[
              {
                name:"/about",
                value:[
                  {
                    'zh':'关于我们',
                    'en':'About us',
                    'ja':'私たちに関しては'
                  }
                ]
              },
              {
                name:"/policy",
                value:[
                  {
                    'zh':'政策',
                    'en':'Policy',
                    'ja':'方針'
                  }
                ]
              },
            ],
            plannerList:[
              {
                name:"/activities",
                value:[
                  {
                    'zh':'为何开展活动',
                    'en':'Why carry out activities',
                    'ja':'なぜ活動を行うのか'
                  }
                ]
              },
              {
                name:"/hospitality",
                value:[
                  {
                    'zh':'待客之道',
                    'en':'Hospitality',
                    'ja':'おもてなし'
                  }
                ]
              },
            ],
            volunteerList:[
              {
                name:"/whyVolunteer",
                value:[
                  {
                    'zh':'为何做志愿者',
                    'en':'Why volunteer',
                    'ja':'なぜボランティアなのか'
                  }
                ]
              },
              // {
              //   name:"/d",
              //   value:[
              //     {
              //       'zh':'联系方式',
              //       'en':'Contact details',
              //       'ja':'連絡先の詳細'
              //     }
              //   ]
              // }
            ],
            weChatList:[
              {
                name:"/privacyS",
                value:[
                  {
                    'zh':'隐私政策',
                    'en':'Privacy Policy',
                    'ja':'個人情報保護方針'
                  }
                ]
              },
              // {
              //   name:"/siteMap",
              //   value:[
              //     {
              //       'zh':'网站地图',
              //       'en':'',
              //       'ja':''
              //     }
              //   ]
              // }
            ],
            options: [],
            value: this.Store.getters.getValue,
            value2:this.Store.getters.getValue2,
            options2:[
              {value:'1',label:'CNY - ￥人民币',sT:'CNY-￥'},
              {value:'2',label:'USD - $ United States dollar',sT:'USD-$'},
              {value:'3',label:'JPY - ¥ 日本円',sT:'JPY-￥'}
            ],
            allText:[
              {
                'zh':'人人耍',
                'en':'Allptp',
                'ja':'Allptp'
              },
              {
                'zh':'策划人',
                'en':'Planner',
                'ja':'プランナー'
              },
              {
                'zh':'志愿者',
                'en':'Volunteer',
                'ja':'ボランティア'
              },
              {
                'zh':'关于隐私',
                'en':'About privacy',
                'ja':'プライバシーについて'
              }
            ]
           
          }
        },
        computed:{
          Lan(){
            return this.Store.getters.getValue
          }
        },
        methods:{
          chooseLan(){
            this.$emit('scoll')
            this.Store.commit('setValue',this.value)
          },
          chooseCurr(){
            this.$emit('scoll')
            this.Store.commit('setValue2',this.value2)
          }
        },
      created(){
          this.options = test()
      }
    }
</script>

<style scoped>
.box{
  display:flex;
  justify-content: space-between;
  width:100%;
}
 a{
   text-decoration: none;
   color: #008489;
 }
</style>
