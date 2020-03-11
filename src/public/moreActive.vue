<template>
    <div style="text-align:left; ">
       <Head type="moreActive" v-on:getVal="getVal"  :content="editSearch"   v-on:search="searchHome"></Head>
      <div style="width:98%;background-color:#fff;border-top:1px solid #eee;padding:10px 1%;position:fixed;top:82px;z-index: 99;display:flex;justify-content:space-between;border-bottom: 1px solid #eee">
        <div>
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
        <div style="display:flex;justify-content:flex-end;">
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

      
       <!-- 第一版本活动内容-->
       <div v-show="!mapIndex">
        <div style="margin-top:142px;">
                <div style="height:380px;background-size:100% 100%;padding:50px 0;display: flex;align-items: center;justify-content: center" :style="{backgroundImage:cityData.top_image_url?' url('+cityData.top_image_url+')':'url('+imgUrl+')'}">
                    <div style="color:#fff;text-align: center;">
                      <div style="font-size:60px;padding:10px 0;">{{adress}}</div>
                      <div style="font-size:20px;">选择让您觉得不错的体验</div>
                    </div>
                </div>
            </div>
            <div  style="width:1080px;margin: 0 auto;">
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
                  <!-- &lt;!&ndash; <div style="display: flex;flex-wrap: wrap;width:100%;">
                    <div v-for="(item,index) in activeList" :key="index" style="width:19%;" class="activeMargin" v-if="index>4">
                      <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.price" :kind="item.kind" v-on:toPublish="toPublish(item,index)" v-on:consult="consult(index)"></Detail>
                    </div>
                  </div>&ndash;&gt; -->
                  <div style="margin:20px 0;text-align: center;width:100%;">
                    <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
                  </div>
                </div>
          </div>
       </div>
       

      <!--第二版本添加地图-->
     
      <div v-show="mapIndex" style="display:flex;">
        <div  class="activeList">
           <div class="title">有{{total}}个活动</div>
          <div v-for="(item,index) in activeList " @click="toPublish(item,index)" @mouseenter="changeColorIndex(item,index)" class="active_child">
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
                  <img :src="defultUserImg" style="margin-top: 80px;width:30px;height: 30px;border-radius:50%;">
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div class="mapStyle" id="mapStyle">
        
        </div>
      
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(255,255,255,0.8);z-index:999;display: flex;justify-content: center;align-items: center">
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
            defultUserImg:'../../static/img/static/user.png',
            defultImg:'../../static/img/static/default.png',
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
            cityData:'',
            mapIndex:1,
            westSouth:'',
            eastNorth: '',
            adreeList:[],
            map:'',
            markerIndex:'',
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
        },
        westSouth:function(){
          this.getActive(1)
        },
        adreeList:function (){
          this.map.clearOverlays()
          this.addMarker()
        }
      },
      methods:{
        changeColorIndex(item,index){
          this.markerIndex = index
          var markerList = document.getElementsByClassName('markerStyle');
          var arrowList = document.getElementsByClassName('arrowStyle');
          for(var i= 0; i< markerList.length ; i ++){
              if(i == this.markerIndex){
                markerList[i].style.backgroundColor = '#008489';
                markerList[i].style.zIndex = '2';
                markerList[i].style.color = 'white';
              }else{
                markerList[i].style.backgroundColor = 'white';
                markerList[i].style.zIndex = '1';
                markerList[i].style.color = '#000'
              }
          }
           for(var i= 0; i< arrowList.length ; i ++){
              if(i == this.markerIndex){
                arrowList[i].style.borderTopColor = '#008489'
              }else{
                arrowList[i].style.borderTopColor = 'rgba(255,255,255,1)'
              }
          }
        },
        Mwpchange(){
             var map = document.getElementsByClassName('mapStyle')[0]
             var active = document.getElementsByClassName('activeList')[0]
           if(this.mapIndex){
             this.mapIndex = 0
             map.style.display = 'none'
             active.style.width = '98%'
             window.scroll(0,0)
            this.getActive(1)
           }else{
             this.mapIndex = 1
             map.style.display = 'block'
             active.style.width = '48%'
              window.scroll(0,0)
              this.getActive(1)
           }
        },
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
              let b = 0
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
              b  += this.otherList[i].adult
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
            max_person_num: person,
            lat_begin: this.mapIndex? this.westSouth[1]:'',
            lat_end: this.mapIndex? this.eastNorth[1]:'',
            lng_begin: this.mapIndex? this.westSouth[0]:'',
            lng_end: this.mapIndex? this.eastNorth[0]:'',
          })
            .then(res=>{
              if(res.data.code == 1){
                this.total = res.data.data.total
                this.activeList = res.data.data.data
                this.isLoading = false
                var adreeList = [];
                this.activeList.forEach(function (item){
                  adreeList.push({'point':[item.set_address_lng,item.set_address_lat],'text':item.price})
                })
                this.adreeList = adreeList
              }else if(res.data.code == 3){             
                  this.getActive(val,price_low,price_high,begin_time,end_time,kind_id,is_volunteen,person)
              }else if(res.data.code == 0){
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
        },

        //获取屏幕高度
        getShowHigh(){
          var height = window.innerHeight
          var mapHeight = document.getElementsByClassName('mapStyle')[0]
          // var activeHeight = document.getElementsByClassName('activeList')[0]
          // mapHeight.style.height = activeHeight.style.height = height - 140 + 'px'
          mapHeight.style.height = height - 140 + 'px'
 
        },
        addMarker(){
          var markerIndex = this.markerIndex
          var map = this.map  // 获取地图
          var defultImg = this.defultImg
          var data = this.activeList
          this.adreeList.forEach((item,index) => {   //循环搜索的地点数组
                takePoint(item.point,item.text,data[index],defultImg)
          })

          function takePoint(point,text,item,defultImg){
             let _this = this
            var ggPoint = new BMap.Point(point[0],point[1]);
            var marker = new BMap.Marker(ggPoint);
            map.addOverlay(marker);
             var sContent = new CreatContent(item,defultImg,text)

            var information = new BMap.InfoWindow(sContent);
          
            marker.addEventListener('click',function(){
              this.openInfoWindow(information);
            })
            
            function CreatContent(item,defultImg,text){
              var div = document.createElement('div');
              div.style.width = '300px';
              var img = new Image();
              img.src = item.domain + item.image_url?item.domain + item.image_url : defultImg;
              img.style.width = '300px';
              img.style.height = '200px';
              var h = document.createElement('h4');
              h.innerHTML = item.title;
              var p = document.createElement('p');
              p.innerHTML = text? '价格：'+'￥'+ text +'/人':'已过期' ;
              div.append(img);
              div.appendChild(h);
              div.appendChild(p)
              return div
            }

            
            //定义自定义覆盖物
            function ComplexCustomOverlay(ggPoint,text){ //构造函数
           
              this._point = ggPoint;
              this._text = text; 
            }
            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function (map,markerIndex,doInfor) {
          
              this._map = map;
              var div = this._div = document.createElement('div');
              div.style.position = 'absolute';
              // div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
              div.style.zIndex = '1';
              div.style.backgroundColor = 'white';
              div.className = 'markerStyle';
              div.style.fontFamily = '黑体';
              div.style.height = '18px';
              div.style.padding = '4px';
              div.style.border = '1px solid gray';
              div.style.fontWeight = 'bold';
              div.style.color = '#000';
              div.style.fontSize = '14px';
              div.style.whiteSpace = 'nowrap';
              div.style.MozUserSlect = 'none';
              var span = this._span = document.createElement('span');
              div.appendChild(span);
              span.appendChild(document.createTextNode(this._text?'￥'+this._text:'已过期'));

              var arrow = this._arrow = document.createElement('div');
              arrow.style.position = 'absolute';
              arrow.className = 'arrowStyle';
              arrow.style.width = '0';
              arrow.style.height - '0';
              arrow.style.border = '10px solid rgba(255,255,255,0)';
              arrow.style.borderTopColor = 'rgba(255,255,255,1)';
              arrow.style.top = '22px';
              arrow.style.left = '15px';
              arrow.style.overflow = 'hidden';
              div.appendChild(arrow);
              map.getPanes().labelPane.appendChild(div);
              return div;
            }
            ComplexCustomOverlay.prototype.draw = function () {
              var map = this._map;
              var pixel = map.pointToOverlayPixel(this._point)
              this._div.style.left = pixel.x - parseInt(this._arrow.style.left)  - 11.5 + 'px';
              this._div.style.top = pixel.y - 34 + 'px'
            }
            var ComplexCustomOverlay = new ComplexCustomOverlay(ggPoint,text)
            map.addOverlay(ComplexCustomOverlay)

          }


        },
        creatMap(position){
         let _this = this
          // var x,y;
            var city = _this.adress
            var mp = new BMap.Map('mapStyle',{
              minZoom:5,
              maxZoom: 15
            })
            mp.centerAndZoom(city, 10);
            mp.disableDoubleClickZoom()
            function ZoomControl(){
              // 默认停靠位置和偏移量
              this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
              this.defaultOffset = new BMap.Size(10, 10);
            }
            // 通过JavaScript的prototype属性继承于BMap.Control
            ZoomControl.prototype = new BMap.Control();
            // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
            // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
            ZoomControl.prototype.initialize = function(mp){
                //创建DOM元素
              var div = document.createElement('div')
              var div1 = document.createElement('div');
              var div2 = document.createElement('div');
              //创建文字说明
              div1.appendChild(document.createTextNode('+'));
              div2.appendChild(document.createTextNode('-'));
              div.appendChild(div1);
              div.appendChild(div2);
              //添加控件属性
              div.style.display = 'flex';
              div.style.padding = '5px';
              div.style.border = '1px solid gray';
              div.style.borderRadius = '5px';
              div.style.flexWrap = 'wrap';
              div1.style.borderBottom = '1px dashed #000';
              div1.style.width = div2.style.width = '100%';
              div.style.fontSize = '18px';
              div1.style.cursor = div2.style.cursor =  'pointer';
              div1.style.textAlign = div2.style.textAlign = 'center';
              div.style.backgroundColor = 'white';
              //绑定点击事件，放大收缩地图
              div1.onclick = function () {
                if(mp.getZoom() <15){
                  mp.setZoom(mp.getZoom() + 1)
                  div2.style.color = '#000'
                }else{
                  div1.style.color = '#eee'
                }
                
              }
              div2.onclick = function () {
                if(mp.getZoom() > 5){
                   mp.setZoom(mp.getZoom() - 1)
                   div1.style.color = '#000'
                }else{
                  div2.style.color = '#eee'
                }
               
              }
              
              //添加DOM到地图中
              mp.getContainer().appendChild(div);
              //返回 DOM元素
              return div;
            }
            // 创建控件
            var myZoomCtrl = new ZoomControl();
            // 添加到地图当中
            mp.addControl(myZoomCtrl);
            
            // var west = bound.getSouthWest()  // 获取西南角经纬度
            // var east = bound.getNorthEast()  //获取东北角经纬度
            // _this.westSouth = [west.lng,west.lat];
            // _this.eastNorth = [east.lng,east.lat];

            mp.addEventListener('dragend',function(){
              var bounds = mp.getBounds();
              var westSouth = bounds.getSouthWest()  // 获取西南角经纬度
              var eastNorth = bounds.getNorthEast()  //获取东北角经纬度
              _this.westSouth = [westSouth.lng,westSouth.lat];
              _this.eastNorth = [eastNorth.lng,eastNorth.lat];
         
            })
            mp.addEventListener('zoomend',function () {
               var bounds = mp.getBounds();
              var westSouth = bounds.getSouthWest()  // 获取西南角经纬度
              var eastNorth = bounds.getNorthEast()  //获取东北角经纬度
              _this.westSouth = [westSouth.lng,westSouth.lat];
              _this.eastNorth = [eastNorth.lng,eastNorth.lat];
           
              
            })
          
            _this.map = mp
        },
        // error(error){
        //   console.log(error)
        //   switch(error.code){
        //     case 1:
        //       console.log('用户不允许获取定位')
        //       break;
        //     case 2:
        //       console.log('火星人，无法为您定位');
        //       break;
        //     case 3:
        //       console.log('超时');
        //       break;
        //   } 
        // }
        getCityImg(){
          this.$http.post(this.api + '/CityImage',{
            token: localStorage.getItem('token'),
            name: this.adress
          })
          .then(res=>{
            if(res.data.code == 1){
              this.cityData = res.data.data
        
            }else if(res.data.code == 3){
              this.getCityImg()
            }else if(res.data.cdoe == 0){
              alert(res.data.msg)
            }
          })
        }
      },
      mounted(){
          window.scroll(0,0)
          this.creatMap()
          this.getCityImg()
          this.getActive(1)
          this.getShowHigh()
      },
      created(){
          this.adress = this.$route.query.key
          document.title = this.$route.query.key
         
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
  top:140px;
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
</style>
