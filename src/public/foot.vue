<template>
    <div>
      <p style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div class="box">
        <div v-if="type=='home'">
          <ul>
            <li> <el-select v-model="value" placeholder="语言(language)" style="width:150px;border: 2px solid #008489;border-radius:5px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select></li>
            <li style="margin:20px 0;"><el-select v-model="value2" placeholder="货币(currency)" style="width:150px;border: 2px solid #008489;border-radius:5px">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select></li>
          </ul>
        </div>
        <div>
          <h4>人人游：</h4>
          <router-link :to="item.name"  v-for="item in personList" ><p style="margin: 20px 0px;">{{item.value}}</p></router-link>
        </div>
        <div>
          <h4>策划人：</h4>
          <router-link :to="item.name" v-for="item in plannerList" ><p  style="margin: 20px 0px;">{{item.value}}</p></router-link>
        </div>
        <div>
          <h4>志愿者：</h4>
          <router-link :to="item.name" v-for="item in volunteerList" ><p  style="margin: 20px 0px;">{{item.value}}</p></router-link>
        </div>
        <div>
          <h4>微信图标：</h4>
          <router-link :to="item.name" v-for="item in weChatList" ><p  style="margin: 20px 0px;">{{item.value}}</p></router-link>
        </div>
      </div>
      <p style="border-bottom: 2px solid #eee;margin: 30px 0px;"></p>
      <div style="text-align: left">
        <p style="margin:20px 0;">蜀ICP备19001672号</p>
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
              {name:"/about",value:"关于我们"},
              {name:"/policy",value:"政策"},
            ],
            plannerList:[
              {name:"/activities",value:"为何开展活动"},
              {name:"/hospitality",value:"待客之道"},
            ],
            volunteerList:[
              {name:"/whyVolunteer",value:"为何做志愿者"},
              {name:"/d",value:"联系方式"}
            ],
            weChatList:[
              {name:"/privacyS",value:"隐私政策"},
              {name:"/siteMap",value:"网站地图"}
            ],
            options: [],
            value: '',
            options2:[
              {value:'1',label:'CNY - ￥人民币'},
              {value:'2',label:'USD - $ United States dollar'},
              {value:'3',label:'JPY - ¥ 日本円'}
            ],
            value2:''
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
}
 a{
   text-decoration: none;
   color: #008489;
 }
</style>
