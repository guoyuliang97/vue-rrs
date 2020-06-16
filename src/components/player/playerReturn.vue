<template>
  <div style="text-align: left">
    <Head type='refundDescirbe'></Head>
    <div v-if="house" class="fontweight " style="background-color: #fff;font-size:16px;padding:20px;width:1080px;margin: 85px auto">
      <p class="contentTitle">我的活动  > 查看预订>主动退款</p>
      <p class="marginT" style="font-size:18px;">我退款给</p>
      <div class="flexStart marginT">
        <LoadingImg type="user" :src="house.user.head_image?house.user.headimage.domain + house.user.headimage.image_url:''" style="width:92.04px;height:92.04px;" ></LoadingImg>
        <div style="margin-left:10px;line-height:92px;font-size:29px;">
            <b>{{house.user.family_name+house.user.middle_name+house.user.name?house.user.family_name+house.user.middle_name+house.user.name:'匿名用户'}}</b>
        </div>
      </div>
      <div style="margin-top: 25px;">
        <p>参与人数：{{house.num}}人</p>
        <p class="marginT">预定时间：{{house.activ_begin_time}}—{{house.activ_end_time}}</p>
      </div>
      <hr class="lineS">
      <div class="flexStart">
        <div>价格详情：</div>
        <div v-if="house.detail.length">
          <div class="marginTop" v-for="(item,index) in house.detail">
            <div v-if="item.type == '1'||item.type == '2'">
              {{item.type =='1'?'亲子':item.name}}<span class="marginLeft"></span>{{item.adult}}成人<span v-if="item.type == '1'">{{item.kids}}儿童</span>	<span class="marginLeft"></span>¥{{item.price}}
            </div>
            <div v-if="item.type == '0'">
              <div v-if="item.adult" class="marginTop">标准<span class="marginLeft"></span>{{item.adult}}人<span class="marginLeft"></span>¥{{item.adult_price}}</div>
              <div v-if="item.kids">儿童<span class="marginLeft"></span>{{item.kids}}人<span class="marginLeft"></span>¥{{item.kids_price}}</div>	
            </div>
          </div>
        </div>
        <div v-if="!house.detail.length">
          无
        </div>
      </div>
      <div class="flexStart marginT">
        <div>预订住宿：</div>
        <div v-if="house.house.length">
          <p class="marginTop" v-for="(item,index) in house.house"> 
            <span>{{item.title}}</span>
            <span class="marginLeft"></span>
            <span>房数<i class="el-icon-close"></i>{{item.num}}</span>
            <span class="marginLeft"></span>
            <span>总额￥&nbsp;{{item.price}}</span>
          </p>
        </div>
        <div v-if="!house.house.length">无</div>
      </div>
      <hr class="lineS">

      <div class="flexStart marginT">
        <p>退款方式：<span>{{house.is_refund?'非全款退':'全款退'}}</span></p>
      </div>
      <div class="flexStart marginT">
        <div style="line-height:40px;">退款原因：</div>
        <div style="margin-left:9px;">
          <el-input type="textarea" style="width:410px;" :rows="4" v-model="reson"></el-input>
        </div>
      </div>
      <hr class="lineS">
      <div class=" marginT">
        <p>支付总额&nbsp;&nbsp;&nbsp;￥{{house.pay_price}}</p>
      </div>
      <div class=" marginT"  >
        <p>退款总额&nbsp;&nbsp;&nbsp;<span style="color:#F73D3D">￥{{house.total_price}}</span></p>
      </div>
      <div class="marginT">
        <p>退款时间'&nbsp;&nbsp;&nbsp;{{house.create_time}}</p>
      </div>
      <div class="marginT">
        <p>订单编号&nbsp;&nbsp;&nbsp;{{house.order_no}}</p>
      </div>
      <hr class="lineS">
      <div class="flexEnd">
        <div @click="goBack" style="color:#999;font-size:13px;line-height:28px;cursor:pointer;">取消退款</div>
        <el-button size="mini" @click="sendRefund" style="margin-left:20px;border:1px solid rgba(102,102,102,1);">提交申请</el-button>
      </div>
    </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
      </div>
   
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg' 
  import Loading from '../../public/Loading'
  import Head from '../../public/head'
  export default {
    name: "playerReturn",
    data(){
      return{
        api: this.GLOBAL.baseURL,
        index:1,
        options:[
          {label:'全退',value:1},
        ],
        value:1,
        reson:'',
        houseList:[],
        house:'',
        order_id:"",
        isLoading:false
      }
    },
    components:{
      Head,
      Loading,
      LoadingImg
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      //提交申请
      sendRefund(){
        this.isLoading = true
        if(this.house.is_refund){
    
          var a = [],
            b = [],
            c=0,
            d=0;
          for(let i =0;i< this.house.house.length;i++){
            a.push({oh_id:this.house.house[i].oh_id,num:this.house.house[i].num})
          }
          for(let i = 0 ; i< this.house.detail.length;i++){
            if(this.house.detail[i].type == '1'|| this.house.detail[i].type == '2'){
               b.push(this.house.detail[i].combine_id)
            }else{
              c += Number(this.house.detail[i].adult)
              d += Number(this.house.detail[i].kids)
            }
           
          }
          this.$http.post(this.api + '/RefundSTwo',{
            token: localStorage.getItem('token'),
            order_id: this.house.order_id,
            person_num: c,
            house: JSON.stringify(a),
            combine: JSON.stringify(b),
            reason: this.reson,
            flag: 0,
            type: 1,
            kids_num: d,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.$message({type:'success',message:'退款成功！'})
                this.isLoading = false
                this.goBack()

              }else if(res.data.code == 3){
                 this.sendRefund()
              }else if(res.data.code == 0){
                
                this.isLoading = false
                this.$message({type:'error',messages:res.data.msg})
              }
            })
        }else{
          this.$http.post(this.api + '/RefundSTwo',{
            token: localStorage.getItem('token'),
            order_id: this.house.order_id,
            reason: this.reson,
            flag: 1,
            type: 1
          })
            .then(res=>{
              if(res.data.code == 1){
                this.index = 2
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.sendRefund()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
        }
      },
      getOrder(){
        this.isLoading = true
        this.$http.post(this.api + '/OrderRefundDTwo',{
          token: localStorage.getItem('token'),
          order_id: this.order_id,
          verson:2.0
        })
          .then(res=>{
            if(res.data.code == 1){
     
              this.house = res.data.data
              this.isLoading = false
          
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getOrder()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
              this.isLoading =false
            }
          })
      },
    },
    mounted(){
      this.getOrder()
    },
    created(){
      this.order_id = this.$route.query.information
    }
  }
</script>

<style scoped>
.marginT{
  margin-top: 32px;
}
.lineS{
  margin: 32px 0;
	border:none;
	border-top:1px solid #DFE1E4;
}
</style>
