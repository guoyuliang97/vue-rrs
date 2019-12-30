<template>
    <div style="text-align:left; ">
       <Head type="moreActive" v-on:getVal="getVal"  :content="editSearch"   v-on:search="searchHome"></Head>
      <div style="width:100%;background-color:#fff;border-top:1px solid #eee;padding:10px 20px;position:fixed;top:82px;z-index: 99">
        <el-popover
          placement="bottom"
          width="400"
          @show="show"
          trigger="click">
          <el-date-picker
            v-model="date"
            style="margin-left:20px;"
            value-format="timestamp"
            :picker-options="pickerOptions2"
            type="daterange"
            ref="saveDateInput"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button slot="reference" :type="date?'primary':''">日期</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          width="350"
          trigger="click">
          <div style="display: flex;justify-content: space-between;margin:20px;" v-for="(item,index) in otherList">
            <div><b>{{item.person}}</b><p style="font-size:12px;">{{index == 1?'2 - 12岁':index == 2?'2岁以下':''}}</p></div>
            <div>
              <el-button icon="el-icon-minus" size="mini" circle @click="reduce(item,index)" ></el-button>
              <span style="margin:0 10px">{{item.adult}}</span>
              <el-button icon="el-icon-plus" size="mini" circle @click="add(item,index)" :disabled="addClick"></el-button>
            </div>
          </div>
          <div style="margin:20px 20px 20px 12px;cursor: pointer;display: flex;justify-content: flex-end" ><span @click="chooseMoney(1)">确定</span></div>
          <el-button slot="reference" :type="allperson?'primary':''">{{allperson?allperson+'人+':'体验人数'}}</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          trigger="click">
          <div style="text-align: center"> <el-radio v-model="tiyan" label="1" border>户外活动</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="2" border>少数民族</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="3" border>本土文化</el-radio></div>
          <el-button slot="reference" :type="tiyan.length?'primary':''">体验类型</el-button>
        </el-popover>
          <el-popover
          placement="bottom"
          width="400"
          trigger="click">
            <div style="width:350px;margin-left:20px;">
              <el-slider
                v-model="price"
                range
                :max="4000">
              </el-slider>
              <div style="display: flex;justify-content: space-between;margin:20px 0;">
                <span>￥{{price[0]}}</span>
                <span>￥{{price[1]==4000?'4000+':price[1]}}</span>
              </div>
            </div>
            <div style="margin:20px 20px 20px 12px;cursor: pointer;display: flex;justify-content: space-between" ><span @click="rejest">重置</span><span @click="chooseMoney(2)">确定</span></div>
          <el-button slot="reference" :type="allprice[1]?'primary':''">{{allprice[1]?allprice[0]+'-'+allprice[1]:'价格'}}</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          width="400"
          trigger="click">
          <div style="padding:20px;">
            <div style="display: flex;justify-content: space-between;margin:20px 0;">
              <div>
                <h4>是否需要志愿者</h4>
                <p>参与体验，帮助策划人与大家交流，沟通等</p>
              </div>
              <div style="width:70px;" >
                <div style="transition:width .5s;overflow: hidden;border-top-right-radius:20px;border-bottom-right-radius: 20px;border-top-left-radius: 20px;border-bottom-left-radius: 20px;" :style="{width:closeIndex?'70px':'30px',backgroundColor:closeIndex?'#008489':'#fff'}" @click="change">
                  <i v-if="closeIndex == ''"  style="font-size:30px;float:left" class="el-icon-circle-close-outline"></i>
                  <i v-if="closeIndex == 1" style="font-size:30px;background-color:#fff;border-radius:50%;color:#008489;float:right" class="el-icon-circle-check-outline"></i>
                </div>
              </div>
            </div>
          </div>
          <el-button slot="reference" :type="closeIndex?'primary':''">{{closeIndex?'需要志愿者':'是否需要志愿者'}}</el-button>
        </el-popover>
      </div>
       <div style="margin-top:142px;">
          <div style="height:380px;background-size:100% 100%;padding:50px 0;display: flex;align-items: center;justify-content: center" :style="{backgroundImage:cityData.top_image_url?' url('+cityData.top_image_url+')':'url('+imgUrl+')'}">
              <div style="color:#fff;text-align: center;">
                <div style="font-size:60px;padding:10px 0;">{{adress}}</div>
                <div style="font-size:20px;">选择让您觉得不错的体验</div>
              </div>
          </div>
       </div>
       <div style="width:1080px;margin: 0 auto;">
         <h2 style="margin: 20px 0;">{{adress}}有{{activeList.length}}处可订的人人游体验</h2>
           <div style="display: flex;flex-wrap: wrap;">
             <div  v-for="(item,index) in activeList" :key="index" style="width:330px;" class="activeMargin">
               <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
             </div>
             <div style="width:100%;" v-if="!activeList.length">
               <None type="ALLactive"></None>
             </div>
             <div  style="width:100%;margin-bottom: 20px;background-size: 100% 100%;height:300px;display: flex;justify-content: space-around" :style="{backgroundImage:cityData.bottom_image_url?' url('+cityData.bottom_image_url+')':'url('+imgUrl+')'}">
               <div style="font-family: '华文楷体';margin-top:100px;">
                 <h1>更多的体验</h1>
                 <h1>体验可以满足您的所有需求</h1>
               </div>
             </div>
            <!-- <div style="display: flex;flex-wrap: wrap;width:100%;">
               <div v-for="(item,index) in activeList" :key="index" style="width:19%;" class="activeMargin" v-if="index>4">
                 <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
               </div>
             </div>-->
             <div style="margin:20px 0;text-align: center;width:100%;">
               <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
             </div>
           </div>
       </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(255,255,255,.8);z-index:999;display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Detail from './detail'
  import None from './noNumber'
  import Loading from './Loading'
  import Map from './map'
  import Head from './head.vue'
  import Bus from '../assets/eventBus'
  import loadingImg from './loadingImg'
    export default {
        name: "moreActive",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            date: '',
            person:'',
            addClick:false,
            otherList:[
              {person:'成人+',adult:0},
            ],
            tiyan:'',
            imgUrl: '../../static/img/static/back.jpg',
            false:false,
            adress:'',
            closeIndex: '',
            price:[0,0],
            activeList:[],
            pickerOptions2: {
              disabledDate:(time)=> {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            pageIndex:1,
            total:0,
            allprice:"",
            allperson:"",
            editSearch:'搜索',
            content:'',
            isLoading:false,
            cityData:''
          }
      },
      components:{
          Head,
        Map,
        loadingImg,
        Loading,
        None,
        Detail
      },
      watch:{
          content:function(){
            if(!this.content){
              this.getall()
            }
          },
        allperson:function(){
          if(this.allperson < 17){
            this.getall()
          }else{
            this.addClick = true
          }
        },
        date:function(){
            this.getall()
        },
        allprice:function(){
            this.getall()
        },
        tiyan:function(){
          this.getall()
        },
        closeIndex:function(){
            this.getall()
        }
      },
      methods:{
        chooseMoney(val){
          if(val == 1){
            this.allperson = this.person
          }else{
            this.allprice = this.price
          }
        },
          getall(){
            this.getActive(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1000:0,this.date?this.date[1]/1000:0,this.tiyan,this.closeIndex,this.allperson)
          },
        show(){
          this.$nextTick(() => {
            this.$refs.saveDateInput.focus()
          })
        },
        reduce(item,index){
          if(index == 0){
            if(item.adult > 0){
              this.addClick = false
              item.adult = item.adult -1
              let b =0
              for(let i = 0;i<this.otherList.length;i++){
                b = b + this.otherList[i].adult
              }
              this.person = b
            }
          }else{
            if(item.adult !=0){
              this.addClick = false
              item.adult=item.adult -1
              let b =0
              for(let i = 0;i<this.otherList.length;i++){
                b = b + this.otherList[i].adult
              }
              this.person = b
            }else{
              item.adult = 0
            }
          }
        },
        add(item,index){
          if(this.person < 16){
            this.addClick = false
            item.adult = item.adult + 1
            let b =0
            for(let i = 0;i<this.otherList.length;i++){
              b = b + this.otherList[i].adult
            }
            this.person = b
          }else{
            this.addClick = true
          }

        },
        rejest(){
          this.price = [0,0]
        },
        change(){
          if(this.closeIndex){
            this.closeIndex = ''
          }else{
            this.closeIndex = 1
          }
        },
        getActive(val,price_low,price_high,begin_time,end_time,kind_id,is_volunteen,person){
          this.isLoading = true
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            city: this.adress,
            keywords: this.content,
            page:val,
            price_low:price_low,
            price_high:price_high,
            activ_begin_time:	begin_time,
            activ_end_time:end_time,
            kind_id:kind_id,
            is_volunteen:is_volunteen,
            max_person_num: person
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.activeList = res.data.data.data
                this.isLoading = false
              }else if(res.data.code == 3){
               this.$http.post(this.api + '/home/index/token')
                 .then(res=>{
                   localStorage.setItem('token',res.data.data)

                 })
              }else{
                alert(res.data.msg)
              }
            })
        },
        handleCurrentChange(val){
          this.pageIndex = val
          this.getall()
        },
        getVal(msg){
          this.content = msg
        },
        searchHome(){
          this.getall()
        },
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id
            }
          })
        }
      },
      mounted(){
          window.scroll(0,0)
          this.getActive(1)
      },
      created(){
          this.adress = this.$route.query.key
        document.title = this.$route.query.key
        this.cityData = JSON.parse(this.$route.query.information)
      }
    }
</script>

<style scoped>
.activeMargin{
  margin-bottom: 20px;
  margin-right: 45px
}
.activeMargin:nth-child(3n){
  margin-right:0
}

</style>
