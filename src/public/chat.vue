<template>
    <div>
      <div  style="position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(255,255,255,.5);z-index:999">
        <!--聊天-->
        <div style="position:fixed;right:0;bottom:0;max-width:440px;min-width:400px;background-color:#eee;border-left:1px solid #E8E8E8;border-right:1px solid #E8E8E8;" :style="{width:swidtd}">
          <div style="text-align: center;position: relative;padding:20px;background-color: #008489;color: #fff;">
            <div><b>{{userName?userName:'匿名用户'}}</b></div>
            <i style="font-size:20px;position: absolute;right:10px;top:20px;cursor: pointer" class="el-icon-close" @click="close('chat')"></i>
          </div>
          <div style="min-height:200px;max-height:350px;overflow: auto;padding:0 19px;" id="msg" :style="{height: sheight}">
            <p v-if="pageIndex<totalPage" @click="lookMore" style="font-size:12px;color:#008489;text-align: center;margin-bottom:10px;cursor: pointer">点击查看更多</p>
            <div v-for="(item,index) in replayList" >
              <div v-if="item.to_user_id ==to_user_id " style="display: flex;justify-content: flex-end;margin-bottom:30px;font-size:12px;">
                <div v-if="item.status != 1 " style="display: flex;justify-content: flex-end" >
                  <div v-if="item.isread == 0" style="text-align: center;line-height:30px;"><i class="el-icon-warning"></i><p>未读</p></div>
                  <div v-if="item.isread == 1" style="text-align: center;line-height:40px;color:#008489"><i class="el-icon-success"></i></div>
                  <div @mousedown="whitchButton(item,index)" style="position:relative;cursor:pointer;text-align:left;margin-right:10px;padding: 10px;background-color: #fff;border-radius: 10px;">
                    <div style="max-width: 270px;word-wrap:break-word;white-space:pre-wrap;">
                      <p>{{item.content}}</p>
                      <p style="text-align: right">{{item.create_time}}</p>
                    </div>
                    <div v-show="isadIndex == index&&item.isread == 0" style="border-left:1px solid #BFBFBF;border-bottom:1px solid #BFBFBF;border-radius:5px;border-right:1px solid #BFBFBF;z-index:9999;position: absolute;background-color: #fff;margin-top:15px;display: flex;justify-content: space-between">
                      <span  @click="chehui(item,index)" style="border-top:1px solid #BFBFBF;padding:2px 12px;cursor: pointer;border-top-left-radius: 5px;">撤回</span> <span style="border-top-right-radius: 5px;cursor:pointer;border-top:1px solid #BFBFBF;padding:2px 12px;margin-left:14px;">全撤</span>
                      <div style="border-top:1px solid #BFBFBF;border-left:1px solid #BFBFBF;background-color:#fff;width:10px;height:10px;transform:rotate(45deg);position:absolute;margin-top:-5px;margin-left:52px;">
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.status == 1">
                  <div  style="position:relative;text-align:left;margin-right:10px;padding: 10px;background-color: #fff;border-radius: 10px;">
                    <div style="max-width: 270px;word-wrap:break-word;white-space:pre-wrap;">
                      <p>该消息已经撤回！</p>
                    </div>
                  </div>
                </div>
                <div>
                  <img :src="userUrl" width="32px" height="32px" style="border-radius: 50%">
                </div>
              </div>
              <div v-if="item.to_user_id == isOwer" style="display: flex;justify-content: flex-start;margin-bottom: 30px;font-size:12px; ">
                <div>
                  <img :src="other_img" width="32px" height="32px" style="border-radius: 50%">
                </div>
                <div style="text-align:left;max-width: 270px;word-wrap:break-word;white-space:pre-wrap;margin-left:20px;padding:10px;background-color: #fff;border-radius: 10px;">
                  <p>{{item.content}}</p>
                  <p style="text-align: right">{{item.create_time}}</p>
                </div>
              </div>
            </div>
            <div style="height:0px;"><a id="msg_end" style="text-decoration: none" name="1" >&nbsp;</a></div>
          </div>
          <div style="bottom:0;background-color: #fff;padding: 20px;max-width: 400px;min-width: 360px;" :style="{width:swidtd}">
            <div style="text-align:left;">
                <textarea  style="width:100%;border:none;outline:none;font-size: 15px;" rows="5" placeholder="请输入" @keydown="enterL" id='textarea' v-model="review"></textarea>
            </div>
            <div style="text-align: right;width:100%;">
              <el-button style="background-color: #E8E8E8;color:#000;" :disabled="review == ''? true:false" @click="discuss">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "chat",
      props:['userUrl','userName','isOwer','other_img','to_user_id'],
      data(){
          return{
            api: this.GLOBAL.baseURL,
            websocket:'',
            pageIndex:1,
            totalPage:'',
            replayList:[],
            review:'',
            isadIndex:-1,
            scrollTop:0,
            webs: this.GLOBAL.webs,
            sheight:'',
            swidtd:''
          }
      },
      methods:{
        showText(){
          document.getElementById('msg').scrollTop = this.scrollTop
        },
        lookMore(){
          this.scrollTop = document.getElementById('msg').scrollHeight - this.scrollTop
          this.pageIndex +=1
          this.getMsgList(this.pageIndex)
        },
        close(val){
          this.$emit(val)
        },
        initWebsocket(wbUrl){
          this.websocket = new WebSocket(wbUrl);//连接服务器
          this.websocket.onopen = function(event){
          };
          this.websocket.onmessage = this.websocketMessage;

          this.websocket.onclose = function(event){};

          this.websocket.onerror = function(event){};

        },
        enterL(){
          if(event.keyCode == 13){
            if(this.review){
              this.pageIndex = 1
              this.discuss()
            }else{
              this.$message({
                type: 'info',
                message: '消息不能为空!'
              })
            }
          }
        },
        //滚动条
        ShowBottom(){
          var div = document.getElementById('msg_end')
          div.scrollIntoView()
          this.scrollTop = document.getElementById('msg').scrollTop
        },
        getMsgList(val){
          this.$http.post(this.api + '/MsgList',{
            token: localStorage.getItem('token'),
            to_user_id: this.to_user_id,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                this.totalPage = res.data.data.last_page
                if(this.pageIndex == 1){
                  if(res.data.data.data.length){
                    this.replayList = res.data.data.data.reverse()
                  }
                  setTimeout(()=>{
                    this.ShowBottom()
                  },5)
                }else{
                  let a = res.data.data.data.reverse()
                  this.replayList = a.concat(this.replayList )
                  this.showText()
                }
              }else if(res.data.code == 3){
                alert(res.data.msg)
              }else{
                alert(res.data.msg)
              }
            })
        },
        abolish(){
          this.review = ''
          this.isChat = false
        },
        discuss(){
          this.$http.post(this.api +'/SendMsg',{
            token: localStorage.getItem('token'),
            content:this.review,
            to_user_id:this.to_user_id
          })
            .then(res=>{
                this.review =''
                this.getMsgList(1)
            })
        },
        whitchButton(item,index){
          var btn = window.event
          setTimeout(()=>{
            if(btn.button == 0) {
              if (this.isadIndex == index) {
                this.isadIndex = -1
              } else {
                this.isadIndex = index
              }
            }
          },200)

        },
        //撤回
        chehui(item,index){
          this.$http.post(this.api + '/MsgCallBack',{
            token: localStorage.getItem('token'),
            msg_id: item.msg_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getMsgList(this.pageIndex)
                this.$message({
                  type:'success',
                  message: '撤回成功！'
                })
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.chehui(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        //websocket链接成功
        websocketMessage(event){
          var data = JSON.parse(event.data);
          var type = data.type || '';
          switch(type){
            // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
            case 'init':
              // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
              this.$http.post(this.api + '/RegisterC',{
                token: localStorage.getItem('token'),
                client_id: data.client_id,
              })
                .then(res=>{

                })
              break;
            case  'ping':
              break;
            case 'is_read':
              this.getMsgList(this.pageIndex)
              break;
            case 'msg':

              break;
            case 'send_msg':
              this.$http.post(this.api + '/ReadMsg',{
                token: localStorage.getItem('token'),
                msg_id: data.msg_id
              })
                .then(res=>{
                  this.getMsgList(this.pageIndex)
                })
              break;
            // 当mvc框架调用GatewayClient发消息时直接alert出来
            default :
              this.getMsgList(this.pageIndex)
          }
        },
      },
      created(){

        this.getMsgList(1)
        let a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let b = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.sheight = a*0.4+ 'px'
        this.swidtd = b*0.3 + 'px'
      },
      destroyed(){
        this.websocket.close()
      },
      mounted(){
        this.initWebsocket(this.webs)
      }
    }
</script>

<style scoped>

</style>
