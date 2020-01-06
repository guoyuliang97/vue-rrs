
import axios from 'axios'
import globalVariable from '../../src/api/global_variable.js'


function getJSSDk(url,shareData){
  axios.post(globalVariable.baseURL + '/WechaShare',{
    token: localStorage.getItem('token'),
    url:url
  })
    .then(res=>{
      if(res.data.code == 1){
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature,// 必填，签名
          jsApiList: [
            "updateAppMessageShareData",//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            "updateTimelineShareData",//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            ]//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
        });
      }
    })
  wx.ready(function(){
     wx.updateAppMessageShareData({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.linkurl,
      imgUrl: shareData.img,
      trigger: function trigger(res) { },
      success: function success(res) {

      },
      cancel: function cancel(res) {

      },
      fail: function fail(res) {

      }
    });
    wx.updateTimelineShareData({
      title: shareData.title,
      desc: shareData.desc,
      link: shareData.linkurl,
      imgUrl: shareData.img,
      trigger: function trigger(res) { },
      success: function success(res) {

      },
      cancel: function cancel(res) {

      },
      fail: function fail(res) {

      }
    })
  })
  wx.error(function(res){

//config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}

export default getJSSDk
