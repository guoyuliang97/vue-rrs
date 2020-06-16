<template>
	<div class="exp_con">
		<p class="title">介绍行程涉及到的所有地点</p>
		<p class="language_txt">您不需要在这里输入地址，房客稍后会收到一封包含详情的电子邮件。 <span style="color: #008489;cursor: pointer;">了解如何开展达人特色体验的更多信息</span></p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div>
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 提一提你们将到访的、对您个人有特殊意义的地方</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 带参与者去只有当地人才知道的地方</p>
				</div>
				<div>
					<p class="fontweight">不建议</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 在热门地点举办稀松平常的活动</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 过多地描述场地细节。 向参与者简要说明即可</p>
				</div>
			</div>
			<div class="advice_sample">
				<p class="fontweight">示例：</p>
				<p style="color: #008489;" class="fontweight"><span style="cursor: pointer;" @click="delSample"><i class="el-icon-arrow-left"></i></span> {{sampleIndex+1}}/{{sampleList.length}} <span style="cursor: pointer;" @click="addSample"><i class="el-icon-arrow-right"></i></span></p>
			</div>
			<div class="sample_con">
				<div :style="{width:'1100px',transition: 'all .3s linear',marginLeft:leftDate+'px'}" style="width: 1100px;transition: all .3s linear;">
					<div class="sample_li" v-for="item in sampleList">
						{{item.txt}}
					</div>
				</div>
			</div>
		</div>
		<p class="fontweight main_language">介绍行程的体验地点</p>
    <div v-show="local" style="display:flex;justify-content: flex-start;margin: 10px 0;">
      <el-input type="text" v-model="local" style="width:300px;margin-right:20px" readonly="readonly"></el-input>
      <el-button type="primary" plain @click="changeLocal">{{text}}</el-button>
    </div>

    <div v-if="isLocal == 1">
      <City type="1" style="margin-top:20px" v-on:selectXian="selectXian" v-on:checkXian="checkXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
    </div>
    <p style="font-weight:bold;margin-top:20px">集合地点</p>
    <el-input
      type="text"
      id="suggestId"
      placeholder="集合地点"
      v-model="aboutMe"
      style="margin-top: 20px;width:650px">
    </el-input>

    <div style="margin-top:20px;">
      <p style="font-size: 12px;color:#999999">请移动地图确认集合地点</p>
      <div  id="allmap"></div>
    </div>
		<div class="aboutme_choice">
			<p class="fontweight">体验期间，参与者将前往哪些地方？</p>
			<el-input type="textarea" :autosize="{minRows:4}" style="margin-top:20px;width:650px" v-model="goPlace" placeholder="请简单介绍您的行程路线"></el-input>
		</div>
	<!--	<div class="aboutme_choice" v-for="(item,index) in questionList" :key="index">
			<p class="fontweight">{{item.title}}</p>
			<el-radio-group v-model="item.answer" @change="answerAdd(item,index)">
				<p class="chioce" v-for="items in item.option">
					<el-radio :label="items.option_id">{{items.name}}</el-radio>
				</p>
			</el-radio-group>
		</div>-->
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
		</div>
		<p style="margin-top: 15px;"><span class="fontweight">注意事项:</span>参与者想找的是在相关领域有特长的体验达人，了解我们对达人<span style="color: #008489;cursor: pointer;">专业知识</span>水平的介绍。</p>
	</div>
</template>

<script>
  import City from '../../public/city.vue'
	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
			  country:[],
        province:[],
        city:[],
        xian:[],
        goPlace:'',
        sampleList:[
          {txt:"我们会在由校车改造成的漂亮微型住宅中开展活动。 房子里的所有物品均符合可持续发展的环保理念。 这是个值得好好参观和体验的特别去处。"},
          {txt:'我们应该会先去Kloof Corner Ridge，看看那一路延绵至山上空中索道的壮丽山脊线。 不过，我们也可以根据天气情况和参与者的能力对路线稍作更改。 下山后洗个澡，我们就可以一起去我最爱的餐厅吃顿丰盛的晚餐。'},
        ],
        sampleIndex:0,
        leftDate:0,
        aboutMe:"",
        isLocal:1,
        questionList:[],
        replay:[],
        local:'',
        text: '修改',
        complete:'',
        str:'',
        point:[],
        xianList:[],
        active_id:''
			};
		},
    components:{
		  City
    },
		methods:{
			addSample(){
          if(this.sampleIndex<this.sampleList.length-1){
            this.sampleIndex++;
            this.leftDate=this.leftDate-370;
          }
			},
			delSample(){
          if(this.sampleIndex>0){
            this.sampleIndex--
            this.leftDate=this.leftDate+370;
          }
			},
			changeRouter(){
			  if(this.xianList.length){
          if(!this.xian[1]){
            this.$message({type:'info',message:'请完善体验地点'})
          }else if(!this.aboutMe){
            this.$message({type:'info',message:'请完善参与者集合地点'})
          }else if(!this.goPlace){
            this.$message({type:'info',message:'请完善体验前往哪些地方'})
          }else{
        
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                country_id: this.country[0],
                country: this.country[1],
                province_id: this.province[0],
                province: this.province[1],
                city_id: this.city[0],
                city: this.city[1],
                region_id: this.xian[0],
                region: this.xian[1],
                set_address: this.aboutMe,
                go_place: this.goPlace,
           /*     question: this.replay,*/
                set_address_lng:this.point[0],
                set_address_lat:this.point[1],
                step: 10
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(!this.complete){
                      this.$emit('changeRouter',{id:11,router:"activeTime",information: this.active_id,complete: this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
                      })
                    }
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
        
          }
        }else{
          if(!this.city[1]){
            this.$message({type:'info',message:'请完善体验地点'})
          }else if(!this.aboutMe){
            this.$message({type:'info',message:'请完善参与者集合地点'})
          }else if(!this.goPlace){
            this.$message({type:'info',message:'请完善体验前往哪些地方'})
          }else{
        
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id:  this.active_id,
                country_id: this.country[0],
                country: this.country[1],
                province_id: this.province[0],
                province: this.province[1],
                city_id: this.city[0],
                city: this.city[1],
                region_id: this.xian[0],
                region: this.xian[1],
                set_address: this.aboutMe,
                go_place: this.goPlace,
     /*           question: this.replay,*/
                set_address_lng:this.point[0],
                set_address_lat:this.point[1],
                step: 10
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(this.complete == '0'){
                      this.$emit('changeRouter',{id:11,router:"activeTime",information:  this.active_id,complete: this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
                      })
                    }
                  }else if(res.data.code == 3){
                        this.changeRouter()
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
        
          }
        }

			},
      checkXian(msg){
			  this.xianList = msg
      },
      selectCountry(msg){
        this.country = msg

      },
      selectProvince(msg){
			  this.province = msg

      },
      selectCity(msg){
			  this.city = msg

      },
      selectXian(msg){
			  this.xian = msg

      },
      answerAdd(item,index){
        if(!this.replay[index]){
          this.replay[index] ={question_id:item.question_id,option_id:item.answer,other:''}
        }else{
          this.replay[index] ={answer_id:this.replay[index].answer_id,question_id:item.question_id,option_id:item.answer,other:''}
        }
      },
      changeLocal(){
        if(this.isLocal == 1){
          this.isLocal = 0
          this.text = '修改'
        }else{
          this.isLocal = 1
          this.text = '取消'
        }
      },
      createMap() {
        let _this = this
        var map = new BMap.Map("allmap");    // 创建Map实例
        var point = new BMap.Point(_this.point[0],_this.point[1]);
        map.centerAndZoom(point, 18);
       /* var marker = new BMap.Marker(point);// 创建标注
        map.addOverlay(marker);             // 将标注添加到地图中
        marker.enableDragging()   //标点可拖拽*/
        /*   marker.disableDragging();           */  // 不可拖拽
        //默认定位
        if(_this.point[0]||_this.point[1]){
            var a = new BMap.Point(_this.point[0],_this.point[1]);
            map.centerAndZoom(a, 18);
            var marker = new BMap.Marker(a);// 创建标注
             map.addOverlay(marker);
           }else{
             var geolocation = new BMap.Geolocation();
             geolocation.getCurrentPosition(function(r){
               if(this.getStatus() == BMAP_STATUS_SUCCESS){
                 var mk = new BMap.Marker(r.point);
                 map.addOverlay(mk);
                 map.panTo(r.point);
               }
               else {
                 alert('failed'+this.getStatus());
               }
             },{enableHighAccuracy: true})
           }

           map.addEventListener("click",function(e){
            
             _this.point = [e.point.lng,e.point.lat]
             map.clearOverlays();
             var point = new BMap.Point(e.point.lng,e.point.lat)
             var marker = new BMap.Marker(point);// 创建标注
             map.addOverlay(marker);             // 将标注添加到地图中
             getLocal(point)
           });
           /* //搜索
            var local = new BMap.LocalSearch(map, {
              renderOptions:{map: map}
            });
            local.search("景点");*/
        /*  map.addEventListener('click',(e)=>{  //添加新标注
            var pa = e.point
            console.log(pa)
            var marker = new BMap.Marker(pa)
            map.addOverlay(marker)
          })*/
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
        map.addControl(top_left_control)
        map.addControl(top_left_navigation)
        map.addControl(top_right_navigation)
        //添加定位功能
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);
        //添加定位事件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
          // 定位成功事件
          var address = '';
          address += e.addressComponent.province;
          address += e.addressComponent.city;
          address += e.addressComponent.district;
          address += e.addressComponent.street;
          address += e.addressComponent.streetNumber;
        });
        geolocationControl.addEventListener("locationError",function(e){
          // 定位失败事件
          alert(e.message);
        });
        map.addControl(geolocationControl);


        //提示输入搜索
        function G(id) {
          return document.getElementById(id);
        }
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {"input" : "suggestId"
            ,"location" : map
          });
        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          _this.aboutMe = myValue;
          setPlace();
        });

        function setPlace(){
          map.clearOverlays();    //清除地图上所有覆盖物
          function myFun(){
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            var marker = new BMap.Marker(pp)
            map.centerAndZoom(pp, 18);
            map.addOverlay(marker);    //添加标注
            var opts = {
              width : 200,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              title : '标识地点' , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
            }
            var infoWindow = new BMap.InfoWindow("地址："+ _this.aboutMe, opts);  // 创建信息窗口对象
            marker.addEventListener("click", function(){
              map.openInfoWindow(infoWindow,pp); //开启信息窗口
            });
            _this.point = [pp.lng,pp.lat]
          }
          var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);

        }
        function getLocal(e){
          var gc = new BMap.Geocoder();
          gc.getLocation(e, function(rs) {
            var addComp = rs.addressComponents;
            var mapAddress = addComp.province+addComp.city + addComp.district
              + addComp.street + addComp.streetNumber;
            _this.aboutMe = mapAddress
          });
        }
      },
      getQestion(){
        this.$http.post(this.api + '/home/Activity/question',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          flag: 1
        })
          .then(res=>{
            if(res.data.code == 1){
              this.questionList = res.data.data
            }else if(res.data.code == 3){
              this.getQestion()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      },
      getActives(){
        this.$http.post(this.api + '/ActivityE',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          visit: 0
        })
          .then(res=>{
            if(res.data.code == 1){
              this.goPlace = res.data.data.go_place
              this.country.push(res.data.data.country_id,res.data.data.country)
              this.province.push(res.data.data.province_id,res.data.data.province)
              this.city.push(res.data.data.city_id,res.data.data.city)
              this.xian.push(res.data.data.region_id,res.data.data.region)
              if(res.data.data.region){
                if(this.province[1] == '上海' || this.province[1] == '重庆' || this.province[1] == '北京' || this.province[1] == '天津'){
                  this.local = this.country[1]+'  '+ this.province[1]+'市'+' '+this.city[1]+ '市'+' '+this.xian[1]+ '区'
                  this.isLocal = 0
                }else{
                  this.local = this.country[1]+'  '+ this.province[1]+'省'+' '+this.city[1]+ '市'+' '+this.xian[1]
                  this.isLocal = 0
                }
              }
              if(res.data.data.set_address_lng||res.data.data.set_address_lat){
                this.point = [res.data.data.set_address_lng,res.data.data.set_address_lat]
              }
              this.createMap()
                this.aboutMe = res.data.data.set_address
                 console.log(this.aboutMe)
  
            }else if(res.data.code == 3){
              this.getActives()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      }
		},
		created(){
    
  
		},
    mounted() {
      let _this = this
        window.scroll(0,0)
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
  /*    _this.getQestion()*/
      if(_this.active_id){
        _this.getActives()
      }
    }
  }
</script>

<style scoped>
  #allmap{
    width: 100%;
    height: 400px;
    font-family: "微软雅黑";
    border:1px solid green;
  }
</style>
