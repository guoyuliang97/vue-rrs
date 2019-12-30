<template>
    <div style="margin-top:15px;">
      <Head type="myPlay"></Head>
        <div style="margin:106px auto;width:1080px;">
            <h4 style="display: flex;justify-content: space-between">我的策划&gt;退款申请列表({{volunList.length}})<span style="cursor: pointer" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span></h4>
            <div style="display: flex;justify-content: space-between;background-color:#F4F6F9;color:#A8A8A8;font-size:12px;margin-top:20px;text-align: center;line-height:25px;padding:10px 0;">
                <div class="miniwidth">退款用户</div><div class="miniwidth">预定时间</div><div class="miniwidth">退款方式</div><div class="miniwidth">退款人数</div><div class="miniwidth">退款住宿</div><div class="miniwidth">退款金额</div><div class="miniwidth">操作</div>
            </div>
            <div v-for="(item,index) in volunList" :key="index" style="border-bottom: 1px solid #E6E6E6">
                <div style="display: flex;justify-content: space-between;font-size:12px;text-align: center;">
                <div style="display: flex;justify-content:flex-start;width:150px;padding:19px 0;">
                    <img :src="item.domain?item.domain + item.image_url:'../../../static/img/static/user.png'" width="32px" height="32px" style="border-radius: 50%;margin-left:40px;">
                    <div style="line-height:32px;margin-left:10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{(item.family_name+item.middle_name+ item.name)?(item.family_name+item.middle_name+ item.name):'匿名用户'}}</div>
                </div>
                <div><el-popover
                  placement="top-start"
                  trigger="click"
                  width="200"
                  @show="takeUp(item,index)"
                  :content="content"
                >
                  <el-button class="width" style="border:none;padding:0;" slot="reference"  plain>{{item.activ_begin_time}}-{{item.activ_end_time}}</el-button>
                </el-popover></div>
                <div class="width">{{item.flag? '全退':'非全退'}}</div>
                <div class="width">
                    {{item.person_num}}
                </div>
                <div class="width">
                    <p v-if="!item.house.length" >无</p>
                    <p @click="lookXq(item,index)"  v-if="item.house.length">查看详情&gt;</p>
                </div>
                <div class="width" style="color:#008489">
                {{'￥'+item.total_price}}
                </div>
                <div style="display: flex;justify-content: center;align-items: center;width:150px;cursor: pointer" v-if="item.audit == 0">
                  <span style="margin: 0 10px;"  @click="changeErollA(item,3)" >查看详情</span>
                </div>
                  <div  style="display: flex;justify-content: center;align-items: center;width:150px;cursor: pointer" v-if="item.audit != 0">
                    <el-button size="mini" type="primary">{{item.audit == 1? '已同意':'已拒绝'}}</el-button>
                    <span style="margin: 0 10px;"  @click="changeErollA(item,3)" >查看详情</span>
                  </div>
                <div class="width" v-if="item.status">
                    <el-button type="primary" size="mini" :style="{backgroundColor:item.status == 2? '#fff':'#008489',color:item.status == 2? 'red':'#fff',borderColor:item.audit==2?'red':'#008489'}">{{item.audit == 1?'已同意':'已拒绝'}}</el-button>
                </div>
                </div>
            </div>
          <div v-show="!volunList.length">
            <None type='refundPage'></None>
          </div>
            <div style="margin:20px 0;text-align:center">
                <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>
            <div v-show="lookHouse" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color:rgba(0,0,0,.5);display: flex;justify-content: center;align-items: center">
                <div id="houseA"  style="width:500px;padding:20px;background-color:#fff;font-size:12px;border-radius:10px;">
                    <div style="display:flex;justify-content:space-between">
                    <span><b>预定住宿</b></span><i @click="lookHouse = false" style="font-size:20px;" class="el-icon-close"></i>
                    </div>
                    <div v-for="(item,index) in houseList" style="display:flex;justify-content:flex-start;margin-top:20px;">
                    <div >
                      <LoadingImg type="2" :src="item.domain + item.image_url" style="width:230px;;height:150px;overflow: hidden;"></LoadingImg>
                    </div>
                    <div style="line-height:50px;margin-left:20px;">
                      <p><b>{{item.title}}</b></p>
                      <p>可住{{item.max_person}}人（{{item.house_num}}）</p>
                      <p><b>￥{{item.house_price}}</b></p>
                    </div>
                    </div>
                </div>
            </div>
          <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
            <Loading></Loading>
          </div>
        </div>
    </div>
</template>
<script>
  import Loading from '../../public/Loading'
  import LoadingImg from '../../public/loadingImg'
  import None from '../../public/noNumber'
  import Head from '../../public/head'
export default {
    name:'refundPage',
    data(){
        return{
            api: this.GLOBAL.baseURL,
            active_id:'',
            volunList:[],
            total:0,
            houseHeight:'',
            lookHouse:false,
            houseList:[],
          slot_id:'',
          content:'',
          isLoading:false
        }
    },
  components:{
      Head,
    None,
    LoadingImg,
    Loading
  },
    methods:{
      takeUp(item,index){
        this.content = item.activ_begin_time +'—'+ item.activ_end_time
      },
     goBack(){
        this.$router.go(-1)
      },
      handleCurrentChange(val){
        if(this.slot_id){
          this.getRefund(val,this.slot_id)
        }else{
          this.getRefund(val)
        }
      },
      changeErollA(item,val){
        if(val == 3){
          this.$router.push({
            path: '/refundDescirbe',
            query:{
              information: item.refund_id,
              type:3
            }
          })
        }
      },
      lookXq(item,index){

        this.lookHouse = !this.lookHouse
        this.houseList = item.house
      },
      getRefund(val,slot_id){
        this.isLoading = true
        this.$http.post(this.api + '/RefundLPlanner',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          page: val,
          slot_id:slot_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.volunList = res.data.data.data
              this.total = res.data.data.total
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getRefund(val,slot_id)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
              this.isLoading = false
            }
          })
      }
    },
  mounted(){
      if(this.slot_id){
        this.getRefund(1,this.slot_id)
      }else{
        this.getRefund(1)
      }

  },
    created(){
        this.active_id = this.$route.query.information
      this.slot_id = this.$route.query.slot_id
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
