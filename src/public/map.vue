<template>
  <div id="all">
<!--    <input type="hidden" id="suggestId" name="address_detail" placeholder="地址" v-model="address_detail" class="input_style">-->
    <div id="allmap"></div>
  </div>
</template>
<script>

  import Bus from '../assets/eventBus'
  export default {
    data(){
      return {
        userlocation: {lng: "", lat: ""},
        jionDress:[],
        type:1
      }
    },

    methods:{
      getUrl(){
        this.$nextTick(function () {
          var th = this
          // 创建Map实例
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(th.jionDress[0],th.jionDress[1])
          var marker = new BMap.Marker(point)
          map.centerAndZoom(point, 15);
          map.addOverlay(marker);
          if(th.type == 1){
            var opts = {
              width : 200,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              title : '标识地点' , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
              enableMapClick:true
            }
            var infoWindow = new BMap.InfoWindow("集合地点", opts);  // 创建信息窗口对象
            marker.addEventListener("click", function() {
              map.openInfoWindow(infoWindow, point); //开启信息窗口
            })
          }

          var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
          var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
          var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
          map.addControl(top_left_control)
          map.addControl(top_left_navigation)
          map.addControl(top_right_navigation)
        })
      }
    },
    mounted(){
      Bus.$on('jionDress',(msg)=>{
        this.getUrl()
        this.jionDress = msg
      })
      Bus.$on('tyas',(msg)=>{
        this.type = msg
      })
    },
  }
</script>
<style scoped>
  #allmap{
    width: 100%;
    height:100%;
    font-family: "微软雅黑";
  }

</style>


