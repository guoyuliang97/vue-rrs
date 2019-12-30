<template>
    <div>
      <div  id="allmap"></div>
      <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
    </div>
</template>

<script>
    export default {
        name: "NewMap",
      data(){
          return{
            str:""
          }
      },
      methods:{
          createMap() {
            let _this = this
            var map = new BMap.Map("allmap");    // 创建Map实例
            var point = new BMap.Point(103.8506577175,30.0694995734); // 创建点坐标，汉得公司的经纬度坐标
            map.centerAndZoom(point, 18);
            var marker = new BMap.Marker(point);// 创建标注
            map.addOverlay(marker);             // 将标注添加到地图中

            marker.enableDragging()   //标点可拖拽
         /*   marker.disableDragging();           */  // 不可拖拽
            marker.addEventListener('click',()=>{
              var p = marker.getPosition() //获取定位经纬度

              alert(p.lng +','+ p.lat)
            })
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

            ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
              var str = "";
              var _value = e.fromitem.value;
              var value = "";
              if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              }
              str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

              value = "";
              if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              }
              str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
              _this.str = str;
            });

            var myValue;
            ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
              var _value = e.item.value;
              myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              _this.str = myValue;
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
                var infoWindow = new BMap.InfoWindow("地址："+ _this.str, opts);  // 创建信息窗口对象
                marker.addEventListener("click", function(){
                  map.openInfoWindow(infoWindow,pp); //开启信息窗口
                });
              }
              var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
              });
              local.search(myValue);
            }

          }
      },
      mounted(){
          this.createMap()
      }
    }
</script>

<style scoped>
  #allmap{
    width: 100%;
    height: 600px;
    font-family: "微软雅黑";
    border:1px solid green;
  }
</style>
