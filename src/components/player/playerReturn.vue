<template>
  <div style="text-align: left">
    <Head type='refundDescirbe'></Head>
    <div v-if="house"  style="background-color: #fff;padding:20px;width:960px;font-size:12px;margin: 106px auto">
      <div style="display: flex;justify-content: space-between">
        <div style="line-height:40px;font-size:14px;">
          <h4>查看预定>退款</h4>
        </div>
        <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
      </div>
      <div style="display: flex;justify-content: space-between;margin-top:15px;">
        <div :style="{backgroundColor:index == 1? '#008489':'#F4F6F9',color:index == 1?'#fff':'#A8A8A8'}" style="height:25px;width:50%;text-align: center;line-height:25px;font-size:12px;" >退款申请</div>
        <div :style="{backgroundColor:index == 2? '#008489':'#F4F6F9',color:index == 2?'#fff':'#A8A8A8'}" style="text-align: center;width:50%;line-height:25px;font-size:12px;">退款成功</div>
      </div>
      <div v-if="index == 1">
        <div   style="margin-top:15px;">
          <div style="display: flex;justify-content: flex-start;height:90px;">
            <div style="height:90px;line-height: 90px;">
              <b>退款活动</b>
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left:15px;margin-top:10px;">
              <img :src="house.user.head_image?house.user.headimage.domain+house.user.headimage.image_url:'../../../static/img/static/user.png'" width="70px" height="70px" style="border-radius: 50%;">
              <div style="line-height: 25px;margin-left:12px;height:70px;">
                <p><b>{{house.user.family_name + house.user.middle_name+house.user.name?house.user.family_name +'·'+ house.user.middle_name+'·'+house.user.name:'匿名用户'}}</b></p>
                <p><span>参与人数:{{house.num - house.refund_num}}人</span></p>
                <p v-if="house.refund_total_price">已支付：￥{{parseInt(house.total_price) - parseInt(house.refund_total_price)}}</p>
                <p >已支付：￥{{parseInt(house.total_price)}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="house.house.length" style="margin-top:25px;display: flex;justify-content: flex-start">
          <div style="line-height:40px;">
            <b>预定住宿</b>
          </div>
          <div style="margin-left:15px;display:flex;justify-content:flex-start">
            <div v-for="(item,index) in house.house" style="display:flex;justify-content:flex-start;margin-right:15px;">
              <div>
                <img :src="item.image[0].domain + item.image[0].image_url" width="100px" height="70px">
              </div>
              <div style="margin-left:10px;">
                <p>{{item.title}}</p>
                <p style="margin: 10px 0;">标准间({{item.max_person}})</p>
                <p><span>房数:{{item.num - item.refund_num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
              </div>
            </div>
          </div>
        </div>
          <div style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款方式&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:9px;">
              <el-select v-model="value"  style="width:410px;" placeholder="请选择退款方式">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款人数&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:9px;line-height:40px;">
             <b>{{house.num - house.refund_num}}人</b>
            </div>
          </div>
          <div v-if="house.house.length" style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款住宿&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="display:flex;flex-direction:column;margin-left:9px;">
                <div v-for="item in house.house" style="display:flex;justify-content:flex-start;margin-bottom:15px;">
                  <div>
                      <img :src="item.image[0].domain+ item.image[0].image_url" width="100px" height="70px">
                  </div>
                  <div style="margin-left:10px;">
                    <p>{{item.title}}</p>
                    <p style="margin: 10px 0;">标准间({{item.max_person}})</p>
                    <p><span>房数:{{item.num - item.refund_num}}</span><span style="margin-left:10px;">单价:<b>￥{{item.union_price}}</b></span></p>
                  </div>
                </div>
            </div>
          </div>
          <div style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款原因&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:9px;">
              <el-input type="textarea" style="width:410px;" :rows="4" v-model="reson"></el-input>
            </div>
          </div>
          <div style="margin-top:25px;display: flex;justify-content: flex-start">
            <div style="line-height:40px;"><b>退款金额&nbsp;<span style="color:#F73737;">*</span></b></div>
            <div style="margin-left:9px;">
              <div style="color:#F73737;width:390px;height:40px;line-height:40px;border:1px solid #eee;padding:0 10px " v-if="house.is_refund">￥{{parseInt(house.total_price) - parseInt(house.refund_total_price)}}</div>
              <div style="color:#F73737;width:390px;height:40px;line-height:40px;border:1px solid #eee;padding:0 10px " v-if="!house.is_refund">￥{{parseInt(house.total_price)}}</div>
            </div>
          </div>
          <div>
            <el-button @click="sendRefund" type="primary" size="mini" style="margin-left:65px;margin-top:25px;">提交申请</el-button>
          </div>
        </div>
        <div v-if="index == 2" style="margin-top:50px;">
          <div style="display: flex;justify-content: space-around">
            <div style="display: flex;justify-content: flex-start;color:#008489">
              <div>
                <i style="font-size:24px" class="el-icon-circle-check"></i>
              </div>
              <div style="font-size:12px;margin-left:11px;line-height:24px;">
                退款成功
              </div>
            </div>
          </div>
          <div style="margin-top:16px;color:#999999;text-align: center;font-size:8px;">
            <p>您的金额已退回用户钱包中</p>
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
      Loading
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      //提交申请
      sendRefund(){
        this.isLoading = true
        if(this.house.is_refund){
          let a = []
          for(let i =0;i< this.house.house.length;i++){
            a.push({oh_id:this.house.house[i].oh_id,num:this.house.house[i].num - this.house.house[i].refund_num})
          }
          this.$http.post(this.api + '/RefundS',{
            token: localStorage.getItem('token'),
            order_id: this.house.order_id,
            person_num: this.house.num - this.house.refund_num,
            house: JSON.stringify(a),
            reason: this.reson,
            flag: 0,
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
        }else{
          this.$http.post(this.api + '/RefundS',{
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
        this.$http.post(this.api + '/OrderD',{
          token: localStorage.getItem('token'),
          order_id: this.order_id,
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
</style>
