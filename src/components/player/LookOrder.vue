<template>
  <div style="margin-top:10px;">
    <Head type="myPlay" v-on:reload="reload"></Head>
    <div style="width:1080px;margin: 106px auto;">
      <h4 style="display: flex;justify-content: space-between;margin:20px 0;">我的策划&gt;查看预定({{volunList.length}})<span style="cursor: pointer" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span></h4>
      <div style="display:flex;justify-content: space-between">
        <div style="font-size: 13px;display: flex;justify-content: flex-start">
          <span @click="changeClickList(items,indexs)" v-for="(items,indexs) in serchList" class="aras" :style="{backgroundColor: ListIndex == indexs? '#008489':'#F1F1F1',color:ListIndex == indexs?'#fff':'#000'}">{{items.name}}</span>
        </div>
        <div  style="font-size: 13px;position: relative">
          <span @click="orderClick" style="cursor: pointer">排序<i :class=" Isorder ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          <div v-if="Isorder" style="position: absolute;background-color: #F3F3F3;padding:10px 20px;width:100px;left:-100px;">
            <p v-for="(items,indexs) in orderList" @click="changeOrder(items,indexs)" style="padding:10px 0;font-size: 12px;font-weight: bold;cursor: pointer" :style="{color:orderIndex == indexs?'#008489':'#000'}">{{items.name}}</p>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;">
        <div class="miniwidth">预定用户</div><div class="miniwidth">参与人数</div><div class="miniwidth">预定活动时间</div><div class="miniwidth">预定住宿</div><div class="miniwidth">联系电话</div><div class="miniwidth">支付</div><div class="miniwidth">创建时间</div><div class="miniwidth">操作</div>
      </div>
      <div v-for="(item,index) in volunList" :key="index" style="border-bottom: 1px solid #E6E6E6">
        <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
          <div style="display: flex;justify-content:flex-start;width:150px;padding:19px 0;">
            <loadingImg type="user" :src="item.user.head_image?item.user.headimage.domain + item.user.headimage.image_url:''" style="width:32px;height:32px;margin-left:40px;"></loadingImg>
            <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.user.family_name+item.user.middle_name+ item.user.name)?(item.user.name):'匿名用户'}}</div>
          </div>
          <div class="width">{{item.num}}</div>
          <div><el-popover
            placement="top-start"
            trigger="click"
            width="200"
            @show="takeUp(item,index)"
            :content="content"
          >
            <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.activ_begin_time}}-{{item.activ_end_time}}</el-button>
          </el-popover></div>
          <div style="width:150px;height: 70px;">
            <el-button  style="border:none;padding:0;margin-top:30px;" :style="{color:item.house.length?'#008489':'#000'}" slot="reference"  plain>{{item.house.length?'已预定':'无'}}</el-button>
            <p @click="lookXq(item,index)" style="margin-top:5px;font-weight:bold;cursor:pointer;" v-if="item.house.length">查看详情&gt;</p>
          </div>
          <div>
            <el-popover
            placement="top-start"
            trigger="click"
            width="200"
            :content="item.introduce"
            >
            <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.user.mobile}}</el-button>
          </el-popover></div>
          <div class="width" style="color:#008489">
            <span>{{item.ispay == 1?'￥'+item.total_price:'￥'+item.total_price +'(未)'}}</span>
          </div>
          <div class="width" style="color:#008489">
            {{item.create_time}}
          </div>
          <div class="width" v-if="item.status == 0 && item.ispay == 1" >
            <span  style="cursor: pointer"  @click="changeErollA(item,1)" >私信</span>
            <span  @click="toRefundDes(item,1)" style="margin: 0 10px;cursor: pointer">查看详情</span>
            <span  style="cursor: pointer"  @click="changeErollA(item,2)" plain>退款</span>
          </div>
          <div class="width" v-if="item.status == 0 && item.ispay == 0">
            <span style="cursor: pointer"    @click="changeErollA(item,1)" >私信</span>
            <span style="cursor: pointer"   @click="changeErollA(item,3)" plain>查看详情</span>
          </div>
          <div class="width" v-if="item.status">
            <el-button type="primary" size="mini" :style="{backgroundColor:item.status == 2? '#fff':'#008489',color:item.status == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'申请中':'已退款'}}</el-button>
            <span  @click="toRefundDes(item,1)" style="margin-left:10px;cursor: pointer">查看详情</span>
          </div>
        </div>
      </div>
        <div v-show="!volunList.length">
         <None type='lookOrder'></None>
        </div>
      <div style="margin:20px 0;">
        <el-pagination  @current-change="handleCurrentChange" :page-count="index"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
    <div v-show="lookHouse" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color:rgba(0,0,0,.5)">
      <div id="houseA" :style="{marginTop: -houseHeight/2 + 'px'}" style="position:fixed;top:50%;left:50%;width:500px;padding:20px;background-color:#fff;margin-left:-270px;font-size:12px;border-radius:10px;">
        <div style="display:flex;justify-content:space-between">
          <span><b>预定住宿</b></span><i @click="lookHouse = false" style="font-size:20px;" class="el-icon-close"></i>
        </div>
        <div v-for="(item,index) in houseList" style="display:flex;justify-content:flex-start;margin-top:20px;">
          <div style="width:230px;" >
            <el-carousel height="150px">
              <el-carousel-item v-for="(items,indexs) in item.image" :key="indexs" height="150px" >
                <loadingImg type="2" :src="items?items.domain + items.image_url:'../../../static/img/static/defult.png'" style="width:230px;height:150px;overflow: hidden"></loadingImg>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div style="line-height:50px;margin-left:20px;">
            <p><b>{{item.title}}</b></p>
            <p>可住{{item.max_person}}人（{{item.num}}）</p>
            <p><b>￥{{item.price}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
      <Loading></Loading>
    </div>
    <Chat v-if="isChat" v-on:chat="chat" :userUrl="imgUrl" :to_user_id="to_user_id" :isOwer="userid" :userName="userName" :other_img="other_img"></Chat>
  </div>
</template>

<script>
  import loadingImg from '../../public/loadingImg'
  import Loading from '../../public/Loading'
  import Chat from '../../public/chat'
  import test from '../../../static/js/language'
  import Head from '../../public/head'
import None from '../../public/noNumber'
  export default {
    name: "LookOrder",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        volunList:[],
        activity_id:'',
        total:0,
        content:'',
        languageList:[],
        lookHouse:false,
        houseList:[],
        houseHeight:'',
        activeName:'first',
        slot_id:'',
        isChat:false,
        imgUrl:'',
        userid:'',
        to_user_id:'',
        userName:'',
        other_img:'',
        isLoading:false,
        index:1,
        serchList:[
          {name: '全部'},
          {name: '已付款'},
          {name: '未付款'},
          {name: '已主动退款'},
          {name:'已完成'}
        ],
        ListIndex:0,
        orderList:[
          {name:'活动时间从早到晚',index:1},
          {name:'活动时间从晚到早',index:-1},
          {name:'下单时间升序',index:2},
          {name:'下单时间降序',index:-2},
        ],
        Isorder:false,
        orderIndex:0,
        orderSort:1
      }
    },
    components:{
      None,
      Head,
      Chat,
      Loading,
      loadingImg
    },
    watch:{
      lookHouse:function(){
        if(this.lookHouse){
          this.$nextTick(()=>{
           this.houseHeight = document.getElementById('houseA').offsetHeight
          })
        }
      },
      orderSort:function(){
        if(this.ListIndex == '1'){
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '0'){
          this.index = 1
          this.getEroll(1,'',this.slot_id,this.orderSort)
        }else if(this.ListIndex == '2'){
          this.index = 1
          this.getEroll(1,0,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '3'){
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort,2,'',1)
        }else{
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort,0,2)
        }
      },
    },
    methods:{
      changeOrder(items,indexs){
        this.orderIndex = indexs
        this.orderSort = items.index
      },
      orderClick(){
        this.Isorder = !this.Isorder
      },
      changeClickList(items,indexs){
        this.ListIndex = indexs
        if(this.ListIndex == '1'){
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '0'){
          this.index = 1
          this.getEroll(1,'',this.slot_id,this.orderSort)
        }else if(this.ListIndex == '2'){
          this.index = 1
          this.getEroll(1,0,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '3'){
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort,2,'',1)
        }else{
          this.index = 1
          this.getEroll(1,1,this.slot_id,this.orderSort,0,2)
        }
      },
      reload(res){
        let data = res.data.data[0]
        this.userid = data.user_id
        this.imgUrl = data.head_image?data.headimage.domain + data.headimage.image_url:'../../../static/img/static/user.png'
      },
      //查看住宿详情
      lookXq(item,index){
        this.lookHouse = !this.lookHouse
        this.houseList = item.house
      },
      goBack(){
        this.$router.go(-1)
      },
      getEroll(val,flag,slot,sort,status,iscomplete,type){
        this.isLoading = true
        this.$http.post(this.api + '/OrderLPlannerTwo',{
          token: localStorage.getItem('token'),
          activity_id: this.activity_id,
          flag: flag,
          page: val,
          slot_id:slot,
          status:status,
          iscomplete:iscomplete,
          sort:sort,
          type:type
        })
        .then(res=>{
          if(res.data.code == 1){
            this.volunList = res.data.data.data
            this.total = res.data.data.total
            this.isLoading = false
          }else if(res.data.code == 3){
             this.getEroll(val,flag,slot)
        }else if(res.data.code == 0){
          this.$message({type:'error',message:res.data.msg})
        }
        })
      },
      handleCurrentChange(val){
        if(this.ListIndex == '1'){
          this.getEroll(1,1,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '0'){
          this.getEroll(1,'',this.slot_id,this.orderSort)
        }else if(this.ListIndex == '2'){
          this.getEroll(1,0,this.slot_id,this.orderSort)
        }else if(this.ListIndex == '3'){
          this.getEroll(1,1,this.slot_id,this.orderSort,2,'',1)
        }else{
          this.getEroll(1,1,this.slot_id,this.orderSort,0,2)
        }
      },
      takeUp(item,index){
        this.content = item.activ_begin_time +'—'+ item.activ_end_time
      },
      changeErollA(item,val){
        if(val == 2){
          this.$router.push({
            path:'/playerReturn',
            query:{
              information: item.order_id
            }
          })
        }else if(val == 3){
          this.$router.push({
            path: '/refundDescirbe',
            query:{
              information: item.order_id,
              type:2
            }
          })
        }else{
          this.isChat = true
          this.to_user_id = item.user.user_id
          this.userName = item.user.family_name+item.user.middle_name+item.user.name?item.user.family_name+item.user.middle_name+item.user.name:'匿名用户'
          this.other_img = item.user.head_image?item.user.headimage.domain+item.user.headimage.image_url:'../../../static/img/static/user.png'
        }
      },
      toRefundDes(item){
        this.$router.push({
          path: '/refundDescirbe',
          query:{
            information: item.order_id,
            type:this.ListIndex == '3'?'5':'1'
          }
        })
      },
      chat(){
        this.isChat = false
      }
    },
    mounted(){

        this.getEroll(1,'',this.slot_id,this.orderSort)

    },
    created(){
      this.activity_id = this.$route.query.activeId
      this.slot_id = this.$route.query.slot_id
      this.languageList = test()
    }
  }
</script>

<style scoped>
  .miniwidth{
    width:135px;
    height:25px;
  }
  .width{
    width:135px;
    height:69px;
    line-height:69px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .aras{
    padding: 5px 20px;
    margin-right:20px;
  }
</style>
