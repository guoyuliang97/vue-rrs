<template>
    <div>
      <Head type="experienceCentre" :content="editSearch" v-on:getVal="getVal"  v-on:search="searchHome"></Head>
      <div class="flexBetween" style="width:98%;background-color:#fff;border-top:1px solid #eee;padding:10px 1%;position:fixed;top:82px;z-index: 99;display:flex;justify-content:space-between;border-bottom: 1px solid #eee">
        <div class="flexStart">
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
          style="margin-left:10px"
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
            style="margin-left:10px"
          placement="bottom"
          trigger="click">
          <div style="text-align: center"> <el-radio v-model="tiyan" label="1" border>户外活动</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="2" border>少数民族</el-radio></div>
          <div style="text-align: center"> <el-radio v-model="tiyan" label="3" border>本土文化</el-radio></div>
          <el-button slot="reference" :type="tiyan.length?'primary':''">{{tiyan==1?'户外活动':tiyan == 2?'少数民族':tiyan == 3?'本土文化':'体验类型'}}</el-button>
        </el-popover>
       
        <!-- 选择地区 -->
       
          <City style="margin-left:10px" type='3'  @selectXian="selectXian" @checkXian="checkXian" @selectCountry="selectCountry" @selectProvince="selectProvince" @selectCity="selectCity"></City>
 


        <el-popover
          style="margin-left:10px"
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
          style="margin-left:10px"
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
         <div v-if="mapIndex" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 10px;line-height: 40px;">
            显示地图
          </div>
          <div style="width:70px;margin-top: 5px;" >
            <div style="transition:width .5s;overflow: hidden;border-top-right-radius:20px;border-bottom-right-radius: 20px;border-top-left-radius: 20px;border-bottom-left-radius: 20px;" :style="{width:mapIndex?'70px':'30px',backgroundColor:mapIndex?'#008489':'#fff'}" @click="Mwpchange">
              <i v-if="mapIndex == 0"  style="font-size:30px;float:left" class="el-icon-circle-close-outline"></i>
              <i v-if="mapIndex == 1" style="font-size:30px;background-color:#fff;border-radius:50%;color:#008489;float:right" class="el-icon-circle-check-outline"></i>
            </div>
          </div>
        </div>
      </div>
      <!--筛选条件-->

      <!--筛选条件结束-->
      <!-- <div style="margin-top:142px;">
        <div style="height:380px;background-size:100% 100%;padding:50px 0;" :style="{backgroundImage:' url('+imgUrl+')'}">
        </div>
      </div> -->
      <div v-if="type == 'allActive'">
        <div v-show="!mapIndex" class="content">
          <h2>为您推荐</h2>
          <div class="content_margin flexStart">
            <div v-for="(item,index) in localList" v-show="index<6" class="content_list" @click="moreActive(item,index)">
                <div>
                  <LoadingImg type="2" :src="item.logo_image_url?item.logo_image_url:''" style="width:120px;height:140px;"></LoadingImg>
                </div>
                <div style="position:absolute;top:0;left:0;width:120px;height:140px;background:rgba(0,0,0,0.4);z-index:1"></div>
                <div style="z-index:2;color:#fff;font-size:12px;text-align: center;position:absolute;top:48px;left:35px">
                  <p>{{item.city}}</p>
                  <p>{{item.create_num}}项体验</p>
                </div>
              </div>
          </div>
        </div>
        <div  v-show="!mapIndex" class="content_all">
          <h2>所有体验</h2>
          <div style="position:relative;display: flex;flex-wrap:wrap;font-size:12px;">
            <div class="list" v-for="(item,index) in hightList" >
              <Detail type="active" :data="item"  @toPublish="toPublish(item,index)" @consult="consult(index)"></Detail>
            </div>
          </div>
        </div>
      </div>
      <div v-if="type == 'youhui'" class="content">
          <h2 style="font-size:24px;">特惠体验</h2>
          <div style="margin-top:20px;border-bottom:1px solid #D5D8DD" class="flexStart fontweight">
            <span class="marginR" @click="chooseDis()" :style="{borderColor: clickIndex == -1? '#14C5CA':'#fff'}" >节假日</span>
            <span v-for="(item,index) in discout" @click="chooseDis(item,index)" :style="{borderColor: clickIndex == index? '#14C5CA':'#fff'}" class="marginR">低至{{Number(item.price_discount)}}折</span>
          </div>
          <div v-if="clickIndex == -1" class="fontweight flexStart" style="margin: 30px 0;" >
            <div style="width:990px;height:60px;font-size:14px;position:relative;overflow:hidden">
              <div  style="position:absolute;width:1320px;transition: all .3s linear" :style="{left:left + 'px'}" class="flexStart">
                <div v-for="(item,index) in holidayL" @click="chooseDay(item,index)"  :class="[chooseIndex == index?'holidayHove':'holidate']">
                {{item.date}}
                </div>
              </div>
            </div>
            <div v-if="left<0" style="margin-left:20px;line-height:40px;">
              <el-button @click="go_left"  icon="el-icon-arrow-left" circle size="mini"></el-button>
            </div>
            <div v-if="left>-300" style="margin-left:20px;line-height:40px;">
              <el-button @click="go_right"  icon="el-icon-arrow-right" circle size="mini"></el-button>
            </div>
          </div>
          <div style="display: flex;flex-wrap:wrap;font-size:12px;">
            <div class="list" v-for="(item,index) in hightList" >
              <Detail type="active" :data="item"  @toPublish="toPublish(item,index)" @consult="consult(index)"></Detail>
            </div>
          </div>

      </div>
      
     
      <div v-if="!hightList.length">
        <None type = 'local'></None>
      </div>
      <!--第二版本添加地图-->
      <!-- <div v-show="mapIndex" style="display:flex;">
        <div  class="activeList">
           <div class="title">有{{total}}个活动</div>
          <div v-for="(item,index) in hightList " @click="toPublish(item,index)" @mouseenter="changeColorIndex(item,index)" class="active_child">
            <div >
              <img :src="item.domain + item.image_url?item.domain + item.image_url : defultImg" style="width:300px;height:200px;border-radius:10px">
            </div>
            <div style="display:flex;justify-content:space-between;width:100%;padding: 10px;">
              <div style="width:70%;border-right: 1px solid #eee;line-height: 40px;padding: 0 5px;">
                <p><span v-for="items in item.kind">{{'/'+items.kind_name}}</span><span><b>·</b>{{item.city}}</span></p>
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;font-size:15px;margin:5px 0;"><b>{{item.title}}</b></p>
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size:13px;"><b><span v-if="item.price">{{'每人￥'+item.price+'·'}}</span><span v-if="item.total_time">{{item.total_time+'·'}}</span><span>{{item.activ_provite}}</span></b></div>
                <p style="margin-top:5px;display: flex;justify-content: flex-start"><el-rate
                  :value="parseInt(item.score)"
                  disabled
                  show-score
                  text-color="#008489"
                  :colors="['#008489', '#008489', '#008489']"
                  score-template="{value}">
                </el-rate>
                  <span style="margin-left:15px;">评论({{item.comment_num}})</span>
                </p>
              </div>
              <div style="width:20%;text-align:center;">
                <div>
                  <h4 :style="{color:item.price?'black':'red'}">{{item.price? item.price + '/天':'已过期'}}</h4>
                </div>
                <div >
                  <LoadingImg :src="item.user" type="user" style="margin-top: 80px;width:30px;height: 30px;"></LoadingImg>
                </div>
              </div>   
            </div>
          </div>
        </div>
        <div class="mapStyle" id="mapStyle">
        
        </div>
      </div> -->
    
      <div style="margin:20px 0;">
        <el-pagination v-show="paginationShow" :current-page="pageIndex" @current-change="handleCurrentChange"  :page-size="9" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading || HighLoading " style="text-align: center;position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(255,255,255,.5)">
        <Loading style="position: absolute;top:50%;left:50%;margin-left:-25px;margin-top:-25px;"></Loading>
      </div>
    </div>
</template>

<script>
  import Map from '../public/map'
  import City from '../public/city'
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
            allprice:'',
            country:[],
            province:[],
            city:[],
            xian:[],
            xianList:[],
            mapIndex:0,
            westSouth:'',
            eastNorth: '',
            adreeList:[],
            map:'',
            markerIndex:'',
            type:'allActive',
            discout:[],
            clickIndex:-1,
            holidayL:[
              {date:'1月/元旦'},
              {date:'2月'},
              {date:'3月'},
              {date:'4月/清明'},
              {date:'5月/五一'},
              {date:'6月'},
              {date:'7月'},
              {date:'8月'},
              {date:'9月'},
              {date:'10月/国庆'},
              {date:'11月'},
              {date:'12月'},
            ],
            left:0,
            discountNum:'',
            paginationShow:true,
            pageIndex:1,
            chooseIndex:-1
          }
      },
      components:{
          Head,
        Loading,
        LoadingImg,
        None,
        Detail,
        City,
        Map
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
        chooseDay(item,index){
          var year,firstDay,lastDay;
          year = new Date().getFullYear()
         
          if(this.chooseIndex == index){
            this.chooseIndex = -1
            firstDay = ''
            lastDay = ''
          }else{
             if(index == 11){
                firstDay = new Date(year,index,1).getTime()/1000
                lastDay = new Date(year+1, 0,0).getTime()/1000
              }else{
                firstDay = new Date(year,index,1).getTime()/1000
                lastDay = new Date(year, index+1,0).getTime()/1000 
              }
            this.chooseIndex = index
          }
          this.getAllHigh(this.price[0],this.price[1],firstDay,lastDay,this.tiyan,this.person,this.closeIndex)
         

          
      
        },

        chooseDis(item,index){
          if(item){
            this.discountNum = item.price_discount
            this.clickIndex = index
          }else{
            this.clickIndex = -1
          }
          this.searchAll()
        },
        go_right(){
          this.left -= 110
        },
        go_left(){
          this.left += 110
        },
        //获取屏幕高度
        // getShowHigh(){
        //   var height = window.screen.availHeight
        //   var mapHeight = document.getElementById('mapStyle')
        //   // var activeHeight = document.getElementsByClassName('activeList')[0]
        //   // mapHeight.style.height = activeHeight.style.height = height - 140 + 'px'
        //   mapHeight.style.height = height - 204 + 'px'
        // },
        //  creatMap(position){
        //  let _this = this
        //   // var x,y;
        //     var city = _this.province[1]
        //     var mp = new BMap.Map('mapStyle',{
        //       minZoom:5,
        //       maxZoom: 15
        //     })
        //     mp.centerAndZoom(city, 10);
        //     mp.disableDoubleClickZoom()
        //     function ZoomControl(){
        //       // 默认停靠位置和偏移量
        //       this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        //       this.defaultOffset = new BMap.Size(10, 10);
        //     }
        //     // 通过JavaScript的prototype属性继承于BMap.Control
        //     ZoomControl.prototype = new BMap.Control();
        //     // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        //     // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        //     ZoomControl.prototype.initialize = function(mp){
        //       //创建DOM元素
        //       var div = document.createElement('div')
        //       var div1 = document.createElement('div');
        //       var div2 = document.createElement('div');
        //       //创建文字说明
        //       div1.appendChild(document.createTextNode('+'));
        //       div2.appendChild(document.createTextNode('-'));
        //       div.appendChild(div1);
        //       div.appendChild(div2);
        //       //添加控件属性
        //       div.style.display = 'flex';
        //       div.style.padding = '5px';
        //       div.style.border = '1px solid gray';
        //       div.style.borderRadius = '5px';
        //       div.style.flexWrap = 'wrap';
        //       div1.style.borderBottom = '1px dashed #000';
        //       div1.style.width = div2.style.width = '100%';
        //       div.style.fontSize = '18px';
        //       div1.style.cursor = div2.style.cursor =  'pointer';
        //       div1.style.textAlign = div2.style.textAlign = 'center';
        //       div.style.backgroundColor = 'white';
        //       //绑定点击事件，放大收缩地图
        //       div1.onclick = function () {
        //         if(mp.getZoom() <15){
        //           mp.setZoom(mp.getZoom() + 1)
        //           div2.style.color = '#000'
        //         }else{
        //           div1.style.color = '#eee'
        //         }  
        //       }
        //       div2.onclick = function () {
        //         if(mp.getZoom() > 5){
        //            mp.setZoom(mp.getZoom() - 1)
        //            div1.style.color = '#000'
        //         }else{
        //           div2.style.color = '#eee'
        //         }
        //       }
        //       //添加DOM到地图中
        //       mp.getContainer().appendChild(div);
        //       //返回 DOM元素
        //       return div;
        //     }
        //     // 创建控件
        //     var myZoomCtrl = new ZoomControl();
        //     // 添加到地图当中
        //     mp.addControl(myZoomCtrl);
        //     // var west = bound.getSouthWest()  // 获取西南角经纬度
        //     // var east = bound.getNorthEast()  //获取东北角经纬度
        //     // _this.westSouth = [west.lng,west.lat];
        //     // _this.eastNorth = [east.lng,east.lat];
        //     mp.addEventListener('dragend',function(){
        //       var bounds = mp.getBounds();
        //       var westSouth = bounds.getSouthWest()  // 获取西南角经纬度
        //       var eastNorth = bounds.getNorthEast()  //获取东北角经纬度
        //       _this.westSouth = [westSouth.lng,westSouth.lat];
        //       _this.eastNorth = [eastNorth.lng,eastNorth.lat]
        //     })
        //     mp.addEventListener('zoomend',function () {
        //        var bounds = mp.getBounds();
        //       var westSouth = bounds.getSouthWest()  // 获取西南角经纬度
        //       var eastNorth = bounds.getNorthEast()  //获取东北角经纬度
        //       _this.westSouth = [westSouth.lng,westSouth.lat];
        //       _this.eastNorth = [eastNorth.lng,eastNorth.lat];
        //     })
        //     _this.map = mp
        // },
        // addMarker(){
        //   var markerIndex = this.markerIndex
        //   var map = this.map  // 获取地图
        //   var defultImg = this.defultImg
        //   var data = this.hightList
        //   this.adreeList.forEach((item,index) => {   //循环搜索的地点数组
        //         takePoint(item.point,item.text,data[index],defultImg)
        //   })
        //   function takePoint(point,text,item,defultImg){
        //      let _this = this
        //     var ggPoint = new BMap.Point(point[0],point[1]);
        //     var marker = new BMap.Marker(ggPoint);
        //     map.addOverlay(marker);
        //      var sContent = new CreatContent(item,defultImg,text)
        //     var information = new BMap.InfoWindow(sContent);
          
        //     marker.addEventListener('click',function(){
        //       this.openInfoWindow(information);
        //     })
        //     function CreatContent(item,defultImg,text){
        //       var div = document.createElement('div');
        //       div.style.width = '300px';
        //       var img = new Image();
        //       img.src = item.domain + item.image_url?item.domain + item.image_url : defultImg;
        //       img.style.width = '300px';
        //       img.style.height = '200px';
        //       var h = document.createElement('h4');
        //       h.innerHTML = item.title;
        //       var p = document.createElement('p');
        //       p.innerHTML = text? '价格：'+'￥'+ text +'/人':'已过期' ;
        //       div.append(img);
        //       div.appendChild(h);
        //       div.appendChild(p)
        //       return div
        //     }
        //     //定义自定义覆盖物
        //     function ComplexCustomOverlay(ggPoint,text){ //构造函数
        //       this._point = ggPoint;
        //       this._text  = text; 
        //     }
        //     ComplexCustomOverlay.prototype = new BMap.Overlay();
        //     ComplexCustomOverlay.prototype.initialize = function (map,markerIndex,doInfor) {
        //       this._map = map;
        //       var div = this._div = document.createElement('div');
        //       div.style.position = 'absolute';
        //       // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        //       div.style.zIndex = '1';
        //       div.style.backgroundColor = 'white';
        //       div.className = 'markerStyle';
        //       div.style.fontFamily = '黑体';
        //       div.style.height = '18px';
        //       div.style.padding = '4px';
        //       div.style.border = '1px solid gray';
        //       div.style.fontWeight = 'bold';
        //       div.style.color = '#000';
        //       div.style.fontSize = '14px';
        //       div.style.whiteSpace = 'nowrap';
        //       div.style.MozUserSlect = 'none';
        //       var span = this._span = document.createElement('span');
        //       div.appendChild(span);
        //       span.appendChild(document.createTextNode(this._text?'￥'+this._text:'已过期'));
        //       var arrow = this._arrow = document.createElement('div');
        //       arrow.style.position = 'absolute';
        //       arrow.className = 'arrowStyle';
        //       arrow.style.width = '0';
        //       arrow.style.height - '0';
        //       arrow.style.border = '10px solid rgba(255,255,255,0)';
        //       arrow.style.borderTopColor = 'rgba(255,255,255,1)';
        //       arrow.style.top = '22px';
        //       arrow.style.left = '15px';
        //       arrow.style.overflow = 'hidden';
        //       div.appendChild(arrow);
        //       map.getPanes().labelPane.appendChild(div);
        //       return div;
        //     }
        //     ComplexCustomOverlay.prototype.draw = function () {
        //       var map = this._map;
        //       var pixel = map.pointToOverlayPixel(this._point)
        //       this._div.style.left = pixel.x - parseInt(this._arrow.style.left)  - 11.5 + 'px';
        //       this._div.style.top = pixel.y - 34 + 'px'
        //     }
        //     var ComplexCustomOverlay = new ComplexCustomOverlay(ggPoint,text)
        //     map.addOverlay(ComplexCustomOverlay)
        //   }     
        // },
        // // 新增
        // Mwpchange(){
        //      var map = document.getElementsByClassName('mapStyle')[0]
        //      var active = document.getElementsByClassName('activeList')[0]
        //    if(this.mapIndex){
        //      this.mapIndex = 0
        //      map.style.display = 'none'
        //      active.style.width = '98%'
        //      window.scroll(0,0)
        //     this.getActive(1)
        //    }else{
        //      this.mapIndex = 1
        //      map.style.display = 'block'
        //      active.style.width = '48%'
        //       window.scroll(0,0)
        //       this.getActive(1)
        //    }
        // },
        // changeColorIndex(item,index){
        //   this.markerIndex = index
        //   var markerList = document.getElementsByClassName('markerStyle');
        //   var arrowList = document.getElementsByClassName('arrowStyle');
        //   for(var i= 0; i< markerList.length ; i ++){
        //       if(i == this.markerIndex){
        //         markerList[i].style.backgroundColor = '#008489';
        //         markerList[i].style.zIndex = '2';
        //         markerList[i].style.color = 'white';
        //       }else{
        //         markerList[i].style.backgroundColor = 'white';
        //         markerList[i].style.zIndex = '1';
        //         markerList[i].style.color = '#000'
        //       }
        //   }
        //   for(var i= 0; i< arrowList.length ; i ++){
        //       if(i == this.markerIndex){
        //         arrowList[i].style.borderTopColor = '#008489'
        //       }else{
        //         arrowList[i].style.borderTopColor = 'rgba(255,255,255,1)'
        //       }
        //   }
        // },
        checkXian(msg){
          this.xianList = msg
          
        },
        selectCountry(msg){
          this.country = msg
          this.searchAll()
        },
        selectProvince(msg){
          this.province = msg
          this.searchAll()
          // this.creatMap()
          // this.getShowHigh()
        },
        selectCity(msg){
          this.city = msg
          this.searchAll()
        },
        selectXian(msg){
          this.xian = msg
          this.searchAll()
        },

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
          this.pageIndex = 1
            this.getAllHigh(this.price[0],this.price[1],this.date?this.date[0]/1000:0,this.date?this.date[1]/1000:0,this.tiyan,this.person,this.closeIndex)
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
        getAllHigh(price_low,price_high,begin_time,end_time,kind_id,person,volunteen){
          this.HighLoading = true
          
          this.hightList = []
          this.$http.post(this.api + '/ActivityListUserTwo',{
            token: localStorage.getItem('token'),
            page: this.pageIndex,
            sort: 1,
            price_low:price_low,
            price_high:price_high,
            keywords: this.content,
            activ_begin_time:	begin_time,
            activ_end_time:end_time,
            kind_id:kind_id,
            max_person_num:person,
            is_volunteen:volunteen,
            per_page: 9,
            country:this.country? this.country[1]:'',
            province: this.province? this.province[1]:'',
            city: this.city? this.city[1]:'',
            region: this.xian? this.xian[1]:'',
            discount: this.clickIndex >=0? this.discountNum:''
          })
            .then(res=>{
              if(res.data.code == 1){
                this.paginationShow = true
                this.hightList = res.data.data.data
                this.total = res.data.data.total
                this.HighLoading = false
                var adreeList = [];
                this.hightList.forEach(function (item){
                  adreeList.push({'point':[item.set_address_lng,item.set_address_lat],'text':item.price})
                })
                this.adreeList = adreeList
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getAllHigh(price_low,price_high,begin_time,end_time,kind_id,person,volunteen)
                  })
              }else if(res.data.code == 0){
                 this.HighLoading = false
                this.$message({type:'error',message:res.data.data})
              }
            })
            .catch(error=>{
                this.HighLoading = false
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
        getDiscount(){
          this.$http.post(this.api + "/DiscountTwo",{
            token: localStorage.getItem('token'),
            verson: 2.0
          })
          .then(res=>{
            if(res.data.code == 1){
              this.quchong(res.data.data)
            }else if(res.data.code == 3){
              this.getDiscount()
            }else if(res.data.code == 0){
              this.$message({type:'error',messages:res.data.msg})
            }
          })
        },
        quchong(arr){
          for(var i = 0; i< arr.length; i ++){
            for(var j = i +1; j < arr.length; j++){
              if(arr[i].price_discount === arr[j].price_discount){
                 arr.splice(j,1)
                 j--
              }
            }
          }
          this.discout = arr
        },
        handleCurrentChange(val){
          this.pageIndex = val
          this.paginationShow = false
          this.getAllHigh()
          // this.getAllSJ(val)
          // this.getHotPlace()
          
          window.scroll(0,0)
        },
        chooseMoney(){
          this.allprice = this.price
        }
      },
      mounted() {
        window.scroll(0,0)
        this.getHotPlace()
        this.getAllHigh()
        this.getKind()
        this.getDiscount()
      },
      created() {
          this.content = this.$route.query.information
        if(this.$route.query.information){
          this.editSearch = this.$route.query.information
        }
        this.type = this.$route.query.type
      }
    }
</script>

<style scoped>
.content{
  text-align: left;
  width: 1080px;
  margin:180px  auto 60px;
}
.content_all{
  width:1080px;
  margin: 27px auto 0;
  text-align: left
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
 .content_margin{
   width:1080px;
   margin-top: 27px;
 }
 .content_list{
   width:120px;
   height:140px;
   position: relative;
   margin-right:30px;
 }
.activeMargin{
  margin-bottom: 20px;
  margin-right: 45px
}
.activeMargin:nth-child(3n){
  margin-right:0
}
.activeList{
  width: 48%;
  overflow-y:scroll;
  margin-top: 140px;
  float:left;
  padding: 1%;
  min-width: 700px;
}
.active_child{
  width: 100%;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start
}
.mapStyle{
  position:fixed !important;
  width: 50%;
  top:154px;
  float:left;
  bottom: 0;
  right:0;
}
.active_child:hover{
  box-shadow: 0px 0px 2px 2px #eee;
}
.clickStyle{
  position: fixed;
  z-index: 999;
}
.marginR{
  margin-right: 58px;
  font-size:18px;
  padding: 12px 0;
  border-bottom: 2px solid #14C5CA;
  cursor: pointer;
}
.holidate{
  width:80px;
  height:40px;
  border:1px solid rgba(213,216,221,1);
  border-radius:4px;
  text-align: center;
  line-height: 40px;
  margin-right:30px;
  cursor: pointer;
}
.holidayHove{
  width:80px;
  height:40px;
  border:1px solid #14C5CA;
  border-radius:4px;
  text-align: center;
  line-height: 40px;
  margin-right:30px;
  cursor: pointer;
  background-color:#14C5CA;
  color:#fff;
}
</style>
