<template>
    <div style="margin-top:15px;">
      <div style="display: flex;justify-content: flex-start;font-size:12px;">
        <div style="display: flex;justify-content: flex-start;line-height:40px">
          <span>评分</span>
          <div style="width:200px;margin-left:20px">
            <el-select v-model="score" clearable placeholder="分数">
              <el-option
                v-for="item in scoreList"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div style="display: flex;justify-content: flex-start;line-height:40px;margin-left:12px;">
          <span>语言</span>
          <div style="width:200px;margin-left:20px">
            <el-select v-model="language" placeholder="语言">
              <el-option
                v-for="item in languageList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div>
        <div style="display: flex;justify-content: flex-start;line-height:40px;font-size: 12px;margin:15px 0;">
          <span>地区</span>
          <City style="margin-left:20px;width:605px;" type="1" v-on:selectXian="selectXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
          <el-button @click="searchVolun" style="margin-left:20px" type="primary">查询</el-button>
        </div>
      </div>
      <div  style="display: flex;flex-wrap: wrap;">
        <div class="list" v-if="userId != item.user_id" v-for="(item,index) in volunteerList" :key="index" style="width:200px;margin-right:90px;margin-bottom:20px;">
          <div>
            <LoadingImg type="2" :src="item.head_image? item.headimage.domain + item.headimage.image_url:'../../../static/img/static/user.png'" style="width:200px;height:200px;"></LoadingImg>
          </div>
          <div style="width:188px;font-size:12px;line-height:20px;padding:15px 5px 10px 5px;border:1px solid #eee;border-top:none">
            <div style="display: flex;">
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{(item.family_name+item.middle_name+item.name)?(item.family_name+'·'+item.middle_name+'·'+item.name):'匿名用户'}}</b></div>
            </div>
            <div style="display: flex;justify-content: flex-start;margin: 10px 0;">
              <div>{{item.score}}</div>
              <div style="margin-left:10px">
                <el-rate
                disabled
                :value="parseFloat(item.score)"
                :colors="['#008489', '#008489', '#008489']">
              </el-rate></div>
            </div>
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis"><b>{{sexArr[item.six].label}}</b>-<b>{{item.country !=0?item.country:'未知'}}</b>-<b>{{languageList[item.language].label}}/<span  v-for="items in item.other_language.split(',')">{{items?items == 0?'中文,':items == 1?'English,':'日本语,':''}}</span></b></div>
            <div style="margin-top:10px;"><el-button type="primary" style="width:100%;" size="mini" @click="invite(item,index)">邀请</el-button></div>
          </div>
        </div>
      </div>
      <None v-if="isPerson"  type="person" :personThing="personThing"></None>
      <div style="margin:20px 0;text-align: center">
        <el-pagination  @current-change="handleCurrentChange"  :current-page.sync="index"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-show="isInvite" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.3);z-index:999;overflow: hidden">
        <div style="position:fixed;top:50%;left:50%;width:400px;height:350px;padding:20px;background-color:#fff;border-radius:10px;margin-top:-220px;margin-left:-220px;font-size:15px;">
          <div style="display: flex;justify-content: space-between">
            <el-checkbox v-model="checked">全选</el-checkbox>
            <i @click="isInvite = false" style="font-size:25px;cursor: pointer" class="el-icon-circle-close-outline"></i>
          </div>
          <p>选择您活动时间</p>
          <div style="margin:20px 0;">
            <el-select v-model="date" style="width:100%;" multiple collapse-tags placeholder="请选择" @change="changeTime">
              <el-option
                v-for="item in datePicker"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-if="timePicker.length">
            <p>请选择参加的时间段</p>
            <div style="margin-top:20px">
              <el-select v-model="time" style="width:100%" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in timePicker"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="senInvite" style="width:400px;position:absolute;bottom:20px;">确定</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import sex from '../../../static/js/sex'
  import City from '../../public/city.vue'
  import test from '../../../static/js/language'
  import None from '../../public/noNumber'
  import LoadingImg from '../../public/loadingImg'
  import Bus from '../../assets/eventBus'
    export default {
        name: "inviteList",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            score:'',
            scoreList:[
              {lable: '1分',value:1},
              {lable: '2分',value:2},
              {lable: '3分',value:3},
              {lable: '4分',value:4},
              {lable: '5分',value:5},
            ],
            languageList:[],
            language:'',
            country:'',
            province:'',
            city:'',
            xian:'',
            total:0,
            date:[],
            time:[],
            volunteerList:[],
            datePicker:[],
            timePicker:[],
            isInvite:false,
            active_id:'',
            Longday:false,
            pageIndex:1,
            timeAll:[],
            checked:false,
            personThing:'暂无该搜索的志愿者！',
            isPerson:false,
            sexArr:[],
            userId:'',
            index:1
          }
      },
      components:{
        City,
        None,
        LoadingImg
      },
      watch:{
        checked:function(){
          if(this.checked){
            this.getAlltime()
          }else{
            this.date = []
            this.time = []
          }
        },
        active_id:function(){
          if(this.active_id){
            Bus.$emit('invitId',this.active_id)
          }
        },
        userId:function(){
          if(this.userId){
            Bus.$emit('invitUser',this.userId)
          }
        }
      },
      methods:{
          //全选
        getAlltime(){
          let a = []
          let b = []
          let c = []
          for(let i = 0;i<this.datePicker.length;i++){
            a.push(this.datePicker[i].value)
          }
          for(let i = 0;i<this.timeAll.length;i++){
              for(let m = 0;m<this.timeAll[i].index.length;m++){
                c.push({label:this.timeAll[i].index[m].label,value:this.timeAll[i].index[m].value})
                b.push(this.timeAll[i].index[m].value)
              }
          }
          this.timePicker =  c
          this.date = a
          this.time = b
        },
        changeTime(){
          let a = []
          for(let j = 0;j<this.date.length;j++){
            for(let i = 0;i<this.timeAll.length;i++){
              if(this.date[j] == i){
                for(let m = 0;m<this.timeAll[i].index.length;m++){
                  a.push({label:this.timeAll[i].index[m].label,value:this.timeAll[i].index[m].value})
                }
              }
            }
          }
          this.timePicker = a
        },
        searchVolun(){
          this.getVolunteer(this.pageIndex,this.country,this.province,this.city,this.xian,this.language,this.score)
        },
        selectCountry(msg){
          this.country = msg[1]
        },
        selectProvince(msg){
          this.province = msg[1]
        },
        selectCity(msg){
          this.city = msg[1]
        },
        selectXian(msg){
          this.xian = msg[1]
        },
        getVolunteer(val,country,province,city,region,language,score){
          this.$http.post(this.api + '/home/User/user_list',{
            token: localStorage.getItem('token'),
            sort:1,
            page:val,
            country:country,
            province:	province,
            city:city,
            region:region,
            language:language,
            score:score
          })
            .then(res=>{
              if(res.data.code == 1){
                if(!res.data.data.data.length){
                  this.isPerson = true
                }else{
                  this.isPerson = false
                }
                this.volunteerList = res.data.data.data
                this.total = res.data.data.total
              }else if(res.data.code == 3){
                this.getVolunteer(val,country,province,city,region,language)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        handleCurrentChange(val){
          this.getVolunteer(val)
        },
        invite(item,index){
          this.user_id = item.user_id
          this.getTime(this.active_id)
        },
        getTime(val){
          this.$http.post(this.api + '/home/Activity/get_activity',{
            token: localStorage.getItem('token'),
            activity_id: val,
            visit:0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                if(data.long_day){
                  this.Longday = true
                  let a = []
                  let c = []
                  for(let i = 0;i<data.slot.length;i++){
                    c.push({index:i})
                    let b = []
                    for(let j = 0; j<data.slot[i].list.length;j++){
                      if(!data.slot[i].list[j].online && data.slot[i].list[j].status != 2 ){
                        b.push({label:data.slot[i].day +'  '+ data.slot[i].list[j].time[0]+'—'+data.slot[i].list[j].time[1],value:data.slot[i].list[j].slot_id})
                      }
                    }
                    if(b.length){
                      c[i].index = b
                      a.push({label:data.slot[i].day,value:i})
                    }
                  }
                  this.datePicker = a
                  this.timeAll = c
                }else{
                  this.Longday = false
                  let a = []
                  for(let i =0;i<data.slot.length;i++){
                    if(!data.slot[i].online && data.slot[i].status != 2){
                      a.push({label:data.slot[i].begin_date+' '+data.slot[i].begin_time+'—'+data.slot[i].end_date+' '+data.slot[i].end_time,value:data.slot[i].slot_id})
                    }
                  }
                  this.datePicker = a
                }
                if(this.datePicker.length){
                  this.isInvite = true
                }else{
                  this.$message({
                    type: 'error',
                    message: '您创建的体验时间已经过期！'
                  })
                }
              }else if(res.data.code == 3){
                this.getTime(val)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        senInvite(){
          this.$http.post(this.api + '/InviteS',{
            token: localStorage.getItem('token'),
            user_id: this.user_id,
            slot_id: this.Longday?this.time:this.date
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({
                  type:'success',
                  message:'邀请成功！敬请期待！'
                })
                this.isInvite = false
              }else if(res.data.code == 3) {
                this.senInvite()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted(){
        this.getVolunteer(this.pageIndex)
      },
      created(){
        this.active_id = this.$route.query.activeId
        this.userId = this.$route.query.information
        this.sexArr = sex()
        this.languageList  = test()
      }
    }
</script>

<style scoped>
.list:nth-child(4n){
  margin-right: 0 !important;
}
</style>
