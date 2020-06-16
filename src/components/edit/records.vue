<template>
    <div>
      <div style="background-color:#fff;padding:30px;border-radius: 10px;">
        <div style="width:100%;text-align: left">
          <p style="font-size:15px;font-weight:bold;"> <span style="color:red;font-size:13px;">new</span>欢迎查看全新的交易记录面板。</p>
          <hr style="border:1px solid #eee;margin: 20px 0;">
          <p style="font-size:25px;font-weight:bold">交易记录</p>
          <div style="margin-top:50px;">
            <div style="display: flex;justify-content: flex-start;margin:20px 0;font-size:12px;">
              <div style="width:45%;display: flex;justify-content: flex-start;line-height: 40px;">
                <div style="width:120px;"><b>交易时间</b></div>
                <el-select  v-model="beginMonth" placeholder="请选择">
                  <el-option
                    v-for="item in monthList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select style="margin-left:10px;" v-model="beginYear" placeholder="请选择">
                  <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="width:45%;display: flex;justify-content: flex-start;line-height: 40px;margin-left:30px;">
                <div style="width:60px;"><b>至</b></div>
                <el-select  v-model="overMonth" placeholder="请选择">
                  <el-option
                    v-for="item in monthList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select style="margin-left:10px;" v-model="overYear" placeholder="请选择">
                  <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div style="font-size:12px;display: flex;justify-content: flex-start">
              <div><b>资金流向</b></div>
              <div style="margin-left:20px;">
                <el-button v-for="(item,index) in btnList" @click='changeList(item,index)' :style="{backgroundColor:index == btnIndex? '#14c5ca':'#F1F1F1',color:index == btnIndex?'#fff':'#333333'}" size="mini">{{item.name}}</el-button>
              </div>
            </div>
            <div style="margin-top:15px;">
              <div style="padding: 10px 0;background-color: #F4F6F9">
                <ul style="display: flex;justify-content: space-around;font-size:12px;color:#A8A8A8;">
                  <li>交易时间</li>
                  <li>交易名称</li>
                  <li>收入/支出</li>
                  <li>交易方式</li>
                </ul>
              </div>
              <div v-for="(item,index) in recordList" style="display: flex;justify-content: space-around;font-size:13px;text-align: center;height:60px;line-height: 60px;border-bottom: 1px solid #E6E6E6">
                <div style="width:140px;">
                  <span>{{item.create_time}}</span>
                </div>
                <div style="width:140px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap"><b>{{item.title}}</b></div>
                <div style="width:140px;" :style="{color:item.flag>0?'#14c5ca':'#E29000'}">{{item.flag?'+'+item.amount:'-'+item.amount}}</div>
                <div style="width:140px;"><b>{{item.type}}</b></div>
              </div>
              <div v-if="!recordList.length">
                <None type="jiaoYi"></None>
              </div>
                <div style="margin:20px 0;text-align:center">
                  <el-pagination  @current-change="handleCurrentChange"   :current-page.sync="index"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import None from '../../public/noNumber.vue'
    export default {
        name: "records",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            beginMonth:'',
            beginYear:'',
            overMonth:'',
            overYear:'',
            monthList:[
              {label:'一月',value:'-01-01'},
              {label:'二月',value:'-02-01'},
              {label:'三月',value:'-03-01'},
              {label:'四月',value:'-04-01'},
              {label:'五月',value:'-05-01'},
              {label:'六月',value:'-06-01'},
              {label:'七月',value:'-07-01'},
              {label:'八月',value:'-08-01'},
              {label:'九月',value:'-09-01'},
              {label:'十月',value:'-10-01'},
              {label:'十一月',value:'-11-01'},
              {label:'十二月',value:'-12-01'},
            ],
            yearList:[],
            btnIndex:'',
            btnList:[
              {name:'全部'},
              {name:'收入'},
              {name:'支出'},
            ],
            recordList:[
            ],
            firstYear:'',
            total:0,
            index:1
          }
      },
      components:{
        None,
      },
      watch:{
        beginMonth:function(){

          this.getMoney()
        },
        beginYear:function(){

          this.getMoney()
        },
        overMonth: function(){

          this.getMoney()
        },
        overYear:function(){

          this.getMoney()
        }
      },
      methods:{
          getMoney(){
            if(this.beginMonth && this.beginYear && this.overMonth && this.overYear){
              this.index = 1
              this.getOtherCord()
            }
          },
        handleClick(tab, event) {
        },
        changeList(item,index){
            this.index = 1
          if(this.btnIndex != index && index != 0){
            this.btnIndex = index
            this.getOtherCord()
          }else if(this.btnIndex != index && index == 0){
            this.btnIndex = index
            this.getRecord()
          }
        },
        getOtherCord(){
           this.$http.post(this.api + '/TradCenter',{
            token: localStorage.getItem('token'),
            begin_time:this.beginYear +this.beginMonth,
            end_time:this.overYear + this.overMonth,
            page:this.index,
            type: this.btnIndex
          })
            .then(res=>{
              if(res.data.code == 1){
                this.recordList = res.data.data.data,
                this.total = res.data.data.total
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getOtherCord(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getRecord(val){
          this.$http.post(this.api + '/TradCenter',{
            token: localStorage.getItem('token'),
            begin_time:this.beginYear +this.beginMonth,
            end_time:this.overYear + this.overMonth,
            page:this.index
          })
            .then(res=>{
              if(res.data.code == 1){
                this.recordList = res.data.data.data,
                this.total = res.data.data.total
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getRecord()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        handleCurrentChange(val){
          this.index = val
            if(this.btnIndex){
              this.getOtherCord()
            }else{
              this.getRecord()
            }
        },
        getUser(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data[0]
                this.firstYear = data.create_time.split('-')[0]
                var date = new Date()
                let a = date.getFullYear() - parseInt(this.firstYear)
                for(let i = 0;i<=a;i++){
                  let b = parseInt(this.firstYear) + i
                  this.yearList.push({label:b,value:b})
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getUser()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        }
      },
      mounted(){
        this.getUser()
        this.getRecord()
      }
    }
</script>

<style scoped>

</style>
