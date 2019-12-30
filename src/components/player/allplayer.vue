<template>
    <div style="margin-top:15px;">
      <div v-for="(item,index) in activeList" v-if="item.audit == 1">
          <p style="padding:10px;background-color: #F4F6F9;font-size:10px;color:#A8A8A8">
            发布时间：{{item.create_time}}
          </p>
          <div v-if="item.status == 0" style="display: flex;justify-content: flex-start;margin-top:10px;">
            <div>
            <span style="padding:5px 10px;color:#fff;position: absolute;font-size:12px;" :style="{backgroundColor:item.is_doing ==0? '#008489':'#FA9F00'}">
              {{item.is_doing == 0? '已发布':'进行中'}}
            </span>
              <img :src="item.cover_image? item.cover.domain+ item.cover.themb_url:'../../../static/img/static/back.jpg'" width="265px" height="170px">
            </div>
            <div style="line-height:35px;width:450px;margin-left:20px;">
              <p style="color:#767676;font-size:12px;"><span v-for="items in item.kind">/{{items.kind_name}}</span></p>
              <p>{{item.title}}</p>
              <div style="font-size:12px;color:#008489;display: flex;justify-content: flex-start;line-height:30px;">{{item.score}}&nbsp;
                <el-rate style="margin:4px;" :colors="['#008489','#008489','#008489']" disabled v-bind="parseInt(item.score)"></el-rate>
                <p style="color:#000">评论({{item.leaving_num}})</p>
              </div>
              <div style="font-size:12px;">
                <span>￥{{item.price}}&nbsp;&nbsp;每人</span>
                <span style="color:#008489">已有{{item.sale_num}}人预定</span>
              </div>
            </div>
            <div style="width:325px;text-align: right">
              <el-button :type="item.enroll_count?'primary':''" style="font-size:12px;margin-top:50px;" @click="toApplication(item,index)">志愿者申请({{item.enroll_count}})</el-button>
              <div style="font-size:12px;cursor: pointer;margin-top:50px;"><span @click="backMoney(item,index)">查看退款</span>&nbsp;&nbsp;<span v-if="item.sale_num" @click="lookOrder(item,index)">查看预定</span>&nbsp;&nbsp;<span @click="toInvite(item,index)">邀请志愿者</span>&nbsp;&nbsp;<span @click="abolish(item,index)">取消活动</span></div>
            </div>
          </div>
          <div v-if="item.status == 1" style="display: flex;justify-content: flex-start;margin-top:10px;">
            <div>
            <span style="width:265px;height:170px;color:#fff;position: absolute;font-size:12px;text-align: center;line-height:170px;background:rgba(133,133,133,.7)">
              已取消
            </span>
              <img :src="item.cover_image? item.cover.domain+ item.cover.themb_url:'../../../static/img/static/back.jpg'" width="265px" height="170px">
            </div>
            <div style="line-height:35px;width:550px;margin-left:20px;color:#999999">
              <p style=";font-size:12px;"><span v-for="items in item.kind">/{{items.kind_name}}</span></p>
              <p>{{item.title}}</p>
              <div style="font-size:12px;display: flex;justify-content: flex-start;line-height:30px;">{{item.score}}&nbsp;
                <el-rate style="margin:4px;" :colors="['#999999','#999999','#999999']" disabled v-bind="parseInt(item.score)"></el-rate>
                <p >评论({{item.leaving_num}})</p>
              </div>
              <div style="font-size:12px; color:#999999">
                <span>￥{{item.price}}&nbsp;&nbsp;每人</span>
                <span >已有{{item.sale_num}}人预定</span>
              </div>
            </div>
            <div style="width:225px;text-align: right;color:#999999;line-height:170px">
              <div style="font-size:12px;"><span>无法邀请志愿者</span>&nbsp;&nbsp;<span>已取消活动</span></div>
            </div>
          </div>
      </div>
      <div v-show="isInvite" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.3);z-index:999;overflow: hidden">
        <div style="position:fixed;top:50%;left:50%;width:400px;height:350px;padding:20px;background-color:#fff;border-radius:10px;margin-top:-220px;margin-left:-220px;font-size:15px;">
          <div style="display: flex;justify-content: space-between">
            <el-checkbox v-model="checked">全选</el-checkbox>
            <i @click="isInvite = false" style="font-size:25px;cursor: pointer" class="el-icon-circle-close-outline"></i>
          </div>
          <div>
            <p>选择您活动时间</p>
            <div style="margin:20px 0;">
              <el-select v-model="date" style="width:100%" multiple collapse-tags placeholder="请选择" @change="changeTime">
                <el-option
                  v-for="item in datePicker"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
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
            <el-button type="primary" @click="abolishInvite" :disabled="date.length&&time.length?false:true" style="width:400px;position:absolute;bottom:20px;">确定</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "allplayer",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            activeList:[],
            isInvite:false,
            date:[],
            datePicker:[],
            timePicker:[],
            time:[],
            active_id:'',
            checked: false,
            slotTime:[],
            timeAll:[],
            Longday:false,
          }
      },
      watch:{
          isInvite:function() {
            if (!this.isInvite) {
              this.date = []
              this.time = []
            }
          },
        checked:function(){
          if(this.checked){
            this.getAlltime()
          }else{
            this.date = []
            this.time = []
          }
        }
      },
      methods:{
        //查看退款
        backMoney(item,index){
          this.$router.push({
            path: '/refundPage',
            query:{
              information: item.activity_id
            }
          })
        },
          //查看预定
        lookOrder(item,index){
          this.$router.push({
            path:'/LookOrder',
            query:{
              activeId: item.activity_id
            }
          })
        },
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
        changeTime(event){
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
        toApplication(item,index){
          this.$router.push({
            path:'/application',
            query:{
              information: item.activity_id
            }
          })
        },
        getActive(){
          this.$http.post(this.api + '/home/Activity/complete',{
            token: localStorage.getItem('token'),
          })
            .then(res=>{
              if(res.data.code == 1){
                this.activeList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.setItem('token',res.data.data)
                      this.getActive()
                    }
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        toInvite(item,index){
          localStorage.setItem('invite_id',item.activity_id)
          this.$router.push({
            path: '/invitVolunter'
          })
        },
        //取消活动
        abolish(item,index){
          this.isInvite = true
          this.active_id = item.activity_id
          this.getTime(item.activity_id)
        },
        getTime(val,a){
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
                      if(!data.slot[i].list[j].online){
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
                    if(!data.slot[i].online){
                      a.push({label:data.slot[i].begin_date+' '+data.slot[i].begin_time+'—'+data.slot[i].end_date+' '+data.slot[i].end_time,value:data.slot[i].slot_id})
                    }
                  }
                  this.datePicker = a
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{

                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        abolishInvite(){
          this.$http.post(this.api + '/SlotC',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            flag: 2,
            is_all: this.checked? 1:0,
            slot_id: this.Longday?JSON.stringify(this.time):JSON.stringify(this.date)
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isInvite = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.abolishInvite()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
          this.getActive()
      }
    }
</script>

<style scoped>

</style>
