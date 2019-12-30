<template>
    <div>
      <Head type="experienceCentre" :content="editSearch" v-on:getVal="getVal"  v-on:search="searchHome"></Head>
      <div style="width:100%;background-color:#fff;border-top:1px solid #eee;padding:10px 20px;position:fixed;top:82px;z-index: 99;text-align: left">
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
              <el-button icon="el-icon-minus" size="mini" circle @click="reduce(item,index)"></el-button>
              <span style="margin:0 10px">{{item.adult}}</span>
              <el-button icon="el-icon-plus" size="mini" circle @click="add(item,index)" :disabled="addClick"></el-button>
            </div>
          </div>
          <el-button slot="reference" :type="person?'primary':''">{{person?person+'人+':'体验人数'}}</el-button>
        </el-popover>
        <el-popover
          placement="bottom"
          trigger="click">
          <div style="text-align: center"> <el-radio v-model="tiyan" label="1" border>户外活动</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="2" border>少数民族</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="3" border>本土文化</el-radio></div>
          <el-button slot="reference" :type="tiyan.length?'primary':''">{{tiyan==1?'户外活动':tiyan == 2?'少数民族':tiyan == 3?'本土文化':'体验类型'}}</el-button>
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
          <el-button slot="reference" :type="price[1]?'primary':''">价格</el-button>
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
          <el-button slot="reference" :type="closeIndex?'primary':''">{{closeIndex==1?'需要志愿者':'是否需要志愿者'}}</el-button>
        </el-popover>
      </div>
      <!--筛选条件-->

      <!--筛选条件结束-->
      <div style="margin-top:142px;">
        <div style="height:380px;background-size:100% 100%;padding:50px 0;" :style="{backgroundImage:' url('+imgUrl+')'}">

        </div>
      </div>
      <div class="content">
        <h2>热门目的地体验</h2>
        <div style="width:970px;overflow: hidden;margin-top:15px;height:82px;position: relative">
          <div style="position:absolute;width:auto;overflow: hidden;transition: all .3s linear" :style="{left: left + 'px'}">
            <div v-for="(item,index) in localList" style="float:left;width:225px;height:80px;margin-right:14px;border:1px solid #E8E8E8;display: flex;justify-content: flex-start;" @click="moreActive(item,index)">
              <div><img :src="item.logo_image_url?item.logo_image_url:'../../static/img/static/all.jpg'" width="120px" height="80px"></div>
              <div style="width:105px;line-height:40px;font-size:12px;text-align: center;">
                <p>{{item.city}}</p>
                <p>{{item.create_num}}项体验</p>
              </div>
            </div>
          </div>
          <div class="prev">
            <el-button style="background-color:#fff;color:#008489;border: 2px solid #008489;"  v-show="isPrev" icon="el-icon-arrow-left" circle @click="prevIndex"></el-button>
          </div>
          <div class="next">
            <el-button v-if="localList.length > 4" style="background-color:#fff;color:#008489;border: 2px solid #008489;"  v-show="isNext" icon="el-icon-arrow-right" circle @click="nextIndex"></el-button>
          </div>
        </div>
      </div>
      <div v-if="hightList.length" class="content">
        <h2>热门高分体验</h2>
        <p style="font-size:12px;">集结最受欢迎和高分的体验</p>
        <div style="position:relative;display: flex;flex-wrap:wrap;font-size:12px;">
          <div class="list" v-for="(item,index) in hightList" >
            <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
          </div>
        </div>
      </div>
      <div class="content">
        <h2>更多体验</h2>
        <div style="display: flex;flex-wrap:wrap;justify-content: space-between;font-size:12px;">
          <div v-for="(item,index) in searchList" style="margin: 18px 0;cursor: pointer" @click="toptop(item,index)">
            <div>
              <span style="position:absolute;width:330px;height:203px;line-height:203px;text-align: center;font-size:18px;color:#fff;font-weight: bold;font-family: SourceHanSansCN-Bold;">{{item.title}}</span>
              <LoadingImg type="3" :src="item.img" style="width:330px;height:203px;"></LoadingImg>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <h2>体验中心</h2>
        <p style="font-size:12px;">欢迎参加您最喜欢的体验项目</p>
        <div  style="position:relative;display: flex;flex-wrap:wrap;font-size:12px;">
          <div class="list" v-for="(item,index) in experList" >
            <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
          </div>
        </div>
        <div v-if="!experList.length">
          <None type = 'local'></None>
        </div>
      </div>
      <div style="margin:20px 0;">
        <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading || HighLoading " style="text-align: center;position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.5)">
        <Loading style="position: absolute;top:50%;left:50%;margin-left:-25px;margin-top:-25px;"></Loading>
      </div>
    </div>
</template>

<script>
  import Detail from '../public/detail'
  import None from '../public/noNumber'
  import Loading from '../public/Loading'
  import Head from '../public/head'
  import LoadingImg from '../public/loadingImg'
    export default {
        name: "experienceCentre",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            imgUrl:'../../static/img/static/images/allptp.png',
            localList:[],
            left:0,
            isPrev:false,
            isNext:true,
            sliderIndex:0,
            hightList:[],
            experList:[],
            pickerOptions2: {
              disabledDate:(time)=> {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            date: '',
            person:'',
            addClick:false,
            otherList:[
              {person:'成人+',adult:0},
            ],
            tiyan:'',
            closeIndex:'',
            price:[0,0],
            total:0,
            HighLoading:false,
            isLoading:false,
            searchList:'',
            editSearch:'搜索',
            content:'',
            allprice:''
          }
      },
      components:{
          Head,
        Loading,
        LoadingImg,
        None,
        Detail
      },
      watch:{
        content:function(){
          if(!this.content){
            this.searchAll()
          }
        },
        person:function(){
          if(this.person < 17){
            this.searchAll()
          }else{
            this.addClick = true
          }
        },
        date:function(){
          this.searchAll()
        },
        allprice:function(){
          this.searchAll()
        },
        tiyan:function(){
          this.searchAll()
        },
        closeIndex:function(){
          this.searchAll()
        },
        sliderIndex:function(){
          if(this.sliderIndex > 0 && this.sliderIndex < this.localList.length - 4){
            this.isPrev = true
            this.isNext = true
          }else if(this.sliderIndex == this.localList.length - 4){
            this.isPrev = true
            this.isNext = false
          }else{
            this.isPrev = false
            this.isNext = true
          }
        }
      },
      methods:{
        moreActive(item,index){
          this.$router.push({
            path: 'moreActive',
            query:{
              key: item.city,
              information: JSON.stringify(item)
            }
          })
        },
        searchHome(){
          this.searchAll()
        },
        getVal(msg){
          this.content = msg
        },
        toptop(item){
          this.$router.push({
            path: '/classification',
            query:{
              information: item.value,
              name: item.title
            }
          })
        },
        getKind(){
          this.$http.post(this.api + '/home/Kind/kindlist',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                let a = []
                let b = []
                for(let j in data){
                  a.push(data[j])
                }
                for(let i =0;i<a.length;i++){
                  b.push({img:a[i].image_id?a[i].domain+a[i].image_url:'',title:a[i].kind_name,value:a[i].kind_id})
                }
                this.searchList = b
              }else if(res.data.code == 3){
                this.$http.post(this.api+ '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getKind()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
          //查看详情
        toPublish(item,index){
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id
            }
          })
        },
        searchAll(){
            this.getActive(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1000:0,this.date?this.date[1]/1000:0,this.tiyan,this.person,this.closeIndex)
            this.getAllHigh(this.pageIndex,this.price[0],this.price[1],this.date?this.date[0]/1000:0,this.date?this.date[1]/1000:0,this.tiyan,this.person,this.closeIndex)
        },
        getActive(val,price_low,price_high,begin_time,end_time,kind_id,person,volunteen){
          this.isLoading = true
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            keywords: this.content,
            page:val,
            price_low:price_low,
            price_high:price_high,
            activ_begin_time:	begin_time,
            activ_end_time:end_time,
            kind_id:kind_id,
            max_person_num:person,
            is_volunteen:volunteen
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.experList = res.data.data.data
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getActive(val,price_low,price_high,begin_time,end_time,kind_id)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
                this.isLoading = false
              }
            })
            .catch(error=>{
              this.isLoading = false
            })
        },
        toActivestep(){
          this.$router.push('/activeStep')
        },
        prevIndex(){
          this.sliderIndex -= 1
          this.left += 240
        },
        nextIndex(){
          this.sliderIndex += 1
          this.left -= 240
        },
        rejest(){
          this.price = [0,0]
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
        change(){
          if(this.closeIndex){
            this.closeIndex = ''
          }else{
            this.closeIndex = 1
          }
        },
        getHotPlace(){
          this.$http.post(this.api + '/PopularCity',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                this.localList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getHotPlace()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        getAllHigh(val,price_low,price_high,begin_time,end_time,kind_id,person,volunteen){
          this.HighLoading = true
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            page: val,
            sort: 1,
            price_low:price_low,
            price_high:price_high,
            keywords: this.content,
            activ_begin_time:	begin_time,
            activ_end_time:end_time,
            kind_id:kind_id,
            max_person_num:person,
            is_volunteen:volunteen
          })
            .then(res=>{
              if(res.data.code == 1){
                this.hightList = res.data.data.data
                this.total = res.data.data.total
                this.HighLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAllHigh(val,price_low,price_high,begin_time,end_time,kind_id,person,volunteen)
                  })
              }else if(res.data.code == 0){
                alert(res.data.data)
              }
            })
        },
        getAllSJ(val){
          this.isLoading = true
          this.$http.post(this.api + '/home/Activity/activ_list',{
            token: localStorage.getItem('token'),
            page: val,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.experList = res.data.data.data
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAllSJ(val)
                  })
              }else if(res.data.code == 0){
                alert(res.data.data)
              }
            })
        },
        handleCurrentChange(val){
          this.getAllHigh(val)
          this.getAllSJ(val)
          this.getHotPlace()
          window.scroll(0,0)
        },
        chooseMoney(){
          this.allprice = this.price
        }
      },
      mounted() {
          window.scroll(0,0)
        this.getHotPlace()
        this.getAllSJ(1)
        this.getAllHigh(1)
        this.getKind()
      },
      created() {
          this.content = this.$route.query.information
        if(this.$route.query.information){
          this.editSearch = this.$route.query.information
        }
      }
    }
</script>

<style scoped>
.content{
  text-align: left;
  width: 1080px;
  margin:50px  auto;
}
  .prev{
    position:absolute;
    top: 28%;
    left:0;
  }
  .next{
    position:absolute;
    top: 28%;
    right:0
  }
  .list{
    width:330px;
   margin: 20px 45px 20px 0;
  }
 .list:nth-child(3n){
   margin-right:0px
 }
</style>
