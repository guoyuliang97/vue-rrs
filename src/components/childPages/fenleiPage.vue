<template>
  <div>
    <Head type="fenleiPage" v-on:getVal="getVal" :content="editSearch"  v-on:search="search"></Head>
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
        <div style="margin:20px 12px 20px 12px;display: flex;justify-content: flex-end" ><span @click="chooseMoney(1)">确定</span></div>
        <el-button slot="reference" :type="personNum?'primary':''">{{personNum?personNum+'人+':'体验人数'}}</el-button>
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
        <div style="margin:20px 12px 20px 12px;display: flex;justify-content: space-between;cursor: pointer" ><span @click="rejest(2)">重置</span><span @click="chooseMoney(2)">确定</span></div>
        <el-button slot="reference" :type="allprice[1]?'primary':''">{{allprice[1]?allprice[0]+'-'+allprice[1]:'价格'}}</el-button>
      </el-popover>
      <el-popover
        placement="bottom"
        trigger="click">
        <div style="text-align: center"> <el-radio v-model="tiyan" label="1" border>户外活动</el-radio></div>
        <div style="text-align: center"> <el-radio v-model="tiyan" label="2" border>少数名族</el-radio></div>
        <div style="text-align: center"> <el-radio v-model="tiyan" label="3" border>本土文化</el-radio></div>
        <el-button slot="reference" :type="tiyan?'primary':''">{{tiyan==1?'户外活动':tiyan == 2?'少数民族':tiyan == 3?'本土文化':'体验类型'}}</el-button>
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
        <el-button slot="reference" :type="closeIndex?'primary':''">{{closeIndex == 1?'需要志愿者':'是否需要志愿者'}}</el-button>
      </el-popover>
    </div>
    <div  style="text-align: left;width:1080px;margin: 155px auto 0;">
      <div  v-show="searchList.length">
        <h3>搜索体验</h3>
        <div style="margin-top:15px;">
          <div style="display:flex;justify-content:space-between;width:1080px;overflow: hidden;height:82px;">
            <div @click="prev"  style="cursor:pointer;width:30px;margin:25px 0 ;height:30px;border:1px solid #318184;border-radius: 50%;line-height:30px;text-align: center;">&lt;</div>
            <div style="width:980px;margin-left:20px;position: relative;overflow: hidden;" >
              <div   style="position:absolute;transition: all .3s linear;width:auto;" :style="{left:left + 'px'}" >
                <div  style="float:left;width:225px;height:80px;margin-right:15px;border:1px solid #E8E8E8" v-for="(item,index) in searchList" @click="toFenlei(item,index)" v-if="item.value != KindId">
                  <div style="cursor: pointer;display: flex;justify-content: flex-start" >
                    <div style="width:125px;height:80px;">
                      <loadingImg type="3" :src="item.img" style="width:100%;height:100%;"></loadingImg>
                    </div>
                    <div style="line-height:80px;margin-left:10px;" >{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div @click="next" style="cursor:pointer;width:30px;margin: 25px 0;height:30px;border:1px solid #318184;border-radius: 50%;line-height:30px;text-align: center;color:#318184;">&gt;</div>
          </div>
        </div>
      </div>
      <h3 style="margin-top:30px;">所有户外体验</h3>
      <div style="margin-top:15px;display: flex;flex-wrap: wrap;width:100%;">
        <div v-for="(item,index) in AllactiveList" :key="index"  class="marginR">
          <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
        </div>
      </div>
      <div v-if="!AllactiveList.length">
        <None type="ALLactive"></None>
      </div>
      <div style="margin:20px 0;text-align: center">
        <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(255,255,255,.8);z-index:999;display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
  import Detail from '../../public/detail'
  import Loading from '../../public/Loading'
  import Head from '../../public/head'
  import None from '../../public/noNumber'
  import loadingImg from '../../public/loadingImg'
  export default {
    name: "fenleiPage",
    data(){
      return {
        api: this.GLOBAL.baseURL,
        date: [],
        person: '',
        addClick: false,
        otherList: [
          {person: '成人+', adult: 0},
        ],
        imgUrl: '../../static/img/static/back.jpg',
        closeIndex:'',
        price: [0, 0],
        pickerOptions2: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        AllactiveList:[],
        KindId:'',
        total:0,
        searchList:[],
        left:0,
        isLoading:false,
        pageIndex:0,
        editSearch:'',
        content:'',
        clickSearch:false,
        tiyan:'',
        personNum:'',
        allprice:''
      }
    },
    components:{
      Head,
      Loading,
      None,
      loadingImg,
      Detail
    },
    watch:{
      content:function(){
        if(!this.content&&this.clickSearch){
          this.clickSearch = false
          this.goOn()
        }
      },
      date:function(){
        if(this.date){
          this.goOn()
        }else if(!this.allprice[1]&&!this.personNum&&!this.closeIndex&&!this.tiyan){
          this.clickSearch = false
          this.getAll(1)
        }else{
          this.goOn()
        }
      },
      personNum:function(){
        if(this.personNum){
          this.goOn()
        }else if(!this.allprice[1]&&!this.date&&!this.closeIndex&&!this.tiyan){
          this.clickSearch = false
          this.getAll(1)
        }else{
          this.goOn()
        }
      },
      allprice:function(){
        if(this.allprice){
          this.goOn()
        }else if(!this.personNum&&!this.date&&!this.closeIndex&&!this.tiyan){
          this.clickSearch = false
          this.getAll(1)
        }else{
          this.goOn()
        }
      },
      closeIndex:function(){
        if(this.closeIndex){
          this.goOn()
        }else if(!this.personNum&&!this.date&&!this.allprice&&!this.tiyan){
          this.clickSearch = false
          this.getAll(1)
        }else{
          this.goOn()
        }
      },
      tiyan:function(){
        if(this.tiyan){
          if(!this.content){
            this.editSearch = this.tiyan==1?'户外活动':this.tiyan == 2?'少数民族':'本土文化'
          }
          this.KindId  = this.tiyan
          this.goOn()
        }else if(!this.personNum&&!this.date&&!this.allprice&&!this.closeIndex){
          this.clickSearch = false
          this.getAll(1)
        }else{
          this.goOn()
        }
      }

    },
    methods:{
      chooseMoney(val){
        if(val == 1){
          this.personNum = this.person
        }else{
          this.allprice = this.price
        }
      },
      goOn(){
        this.getSearch(1,this.date?this.date[0]/1000:0,this.date?this.date[1]/1000:0,this.allprice[0],this.allprice[1],this.personNum,this.closeIndex)
      },
      getVal(msg){
        this.content = msg
      },
      prev(){
        if(this.pageIndex > 0){
          this.left += 240
          this.pageIndex --
        }
      },
      next(){
        if(this.pageIndex < this.searchList.length - 5){
          this.left -= 240
          this.pageIndex++
        }
      },
      toFenlei(item,index){
        this.$router.push({
          path: '/classification',
          query:{
            information: item.value,
            name: item.name
          }
        })
      },
      getKind(){
        this.$http.post(this.api + '/SubKindList',{
          token: localStorage.getItem('token'),
          top_id: this.KindId
        })
          .then(res=>{
            if(res.data.code == 1){
              let a = res.data.data
              var b = []
              for(let i=0;i<a.length;i++){
                b.push({img:a[i].image_id?a[i].domain+a[i].themb_url:this.imgUrl,name:a[i].kind_name,value:a[i].kind_id})
              }
              this.searchList = b
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getKind()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
/*      Xunhuan(a){
        for(let i = 0;i<a.length;i++){
          this.searchList.push({img:a[i].image_id?a[i].domain+a[i].themb_url:this.imgUrl,name:a[i].kind_name,value:a[i].kind_id})
          if(a[i].children){
            this.Xunhuan(a[i].children)
          }
        }
      },*/
      change(){
        if(this.closeIndex){
          this.closeIndex = ''
        }else{
          this.closeIndex = 1
        }
      },
      show(){
        this.$nextTick(() => {
          this.$refs.saveDateInput.focus()
        })
      },
      rejest(){
        this.price = [0,0]
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
      getActive(){
        this.$http.post(this.api + '/home/Activity/activ_list',{
          token: localStorage.getItem('token'),
          kind_id: this.KindId ,
          sort:1,
          page: 1
        })
          .then(res=>{
            if(res.data.code == 1){
              this.activeList = res.data.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/Index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getActive()
                })
            }else{
              alert(res.data.msg)
            }
          })
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
      getAll(val){
        this.isLoading = true
        this.$http.post(this.api + '/home/Activity/activ_list',{
          token: localStorage.getItem('token'),
          kind_id: this.KindId ,
          page: val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.AllactiveList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.getAll(val)
            }else{
              alert(res.data.msg)
            }
          })
      },
      handleCurrentChange(val){
       this.goOn(val)
      },
      toPublish(item,index) {
        this.$router.push({
          path: '/publishPage',
          query: {
            information: item.activity_id
          }
        })
      },
      search(val){
        this.isLoading = true
        if(this.content){
          this.clickSearch = true
        }else{
          this.clickSearch = false
        }
        this.$http.post(this.api + '/home/Activity/activ_list',{
          token: localStorage.getItem('token'),
          keywords: this.content,
          kind_id:this.KindId,
          page:val
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.AllactiveList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.search(msg)
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
      getSearch(val,data1,data2,price1,price2,person,volunteen){
        this.isLoading = true
        this.clickSearch = true
        this.$http.post(this.api + '/home/Activity/activ_list',{
          token: localStorage.getItem('token'),
          keywords: this.content,
          kind_id:this.KindId,
          page:val,
          activ_begin_time: data1,
          activ_end_time: data2,
          price_low:price1,
          price_high: price2,
          max_person_num:person,
          is_volunteen:volunteen
        })
          .then(res=>{
            if(res.data.code == 1){
              this.total = res.data.data.total
              this.AllactiveList = res.data.data.data
              this.isLoading = false
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.search(msg)
                })
            }else{
              alert(res.data.msg)
            }
          })
      }
    },
    mounted(){
      this.getKind()
      this.goOn()
    },
    created(){
      this.KindId = this.$route.query.information
      this.date = this.$route.query.date,
       this.personNum = this.$route.query.personNum,
        this.allprice = this.$route.query.allprice,
        this.closeIndex = this.$route.query.closeIndex,
        this.tiyan = this.$route.query.tiyan,
        this.content = this.$route.query.content,
        this.editSearch= this.$route.query.content
    }
  }
</script>

<style scoped>
  .marginR{
    width:330px;
    margin-right:45px;
    margin-bottom: 20px;
  }
  .marginR:nth-child(3n){
    margin-right:0
  }
</style>
