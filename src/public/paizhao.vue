<template>
  <div id="contentHolder">
    <video id="video"  autoplay></video>
    <button id="start" style="display:block" >拍照上传</button>
    <button id="picture" style="display:block" >paizhao</button>
    <canvas style="display:block" id="canvas" width="320" height="320"></canvas>
    <button id="sc" style="display:block" >shangchuan</button>
    <button id="stop" style="display:block" >stop</button>
  </div>

</template>

<script>
    export default {
      name: "paizhao",
      data() {
        return {
          imgUrl:'',
          MediaStreamTrack:''
        }
      },
      methods: {
      },
      mounted() {
        var mediaStreamTrack;
        document.getElementById("start").addEventListener("click", function () {
          navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
          if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true, video: { width: 320, height: 320 } },
              function(stream) {
                mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                video.srcObject = stream
                video.play();
                /*  var video = document.getElementById("video");
                   video.src = window.URL.createObjectURL(stream);
                   video.onloadedmetadata = function(e) {
                       console.log('nihao44eee4aaaaddda');
                       video.play();
                   }; */
              },
              function(err) {
                console.log("The following error occurred: " + err.name);
              }
            );
          } else {
            console.log("getUserMedia not supported");
          }
        });
        document.getElementById("stop").addEventListener("click", function () {
          mediaStreamTrack && mediaStreamTrack.stop();
        });
        /*document.getElementById("picture").addEventListener("click", function () {
          var context = document.getElementById("canvas").getContext("2d");
          context.drawImage(video, 0, 0, 320, 320);
        });
        document.getElementById("sc").addEventListener("click", function () {
          var imgData=document.getElementById("canvas").toDataURL("image/png");
          var mmmd=getBase64Image(document.getElementById("mmm"));
          var data=imgData.substr(22);
          console.log(mmmd)
          debugger
          $.post('recorder/target/sc',{'sj':data});
        });
        function getBase64Image(img) {
          var canvastemp = document.createElement("canvas");
          canvastemp.width = img.width;
          canvastemp.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var dataURL = canvas.toDataURL("image/png");
          return dataURL
          // return dataURL.replace("data:image/png;base64,", "");
        }*/
      }
    }
</script>

<style scoped>

</style>
