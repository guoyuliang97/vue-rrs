<template>
    <div>
      <Head type="publishPage" v-on:onreload="reload" ></Head>
      <hr style="margin-top:82px;border: 1px solid #eee;">

      <!-- 第二版本活动详情 -->
      <div class="content">
        <div class="contentImg" >
           <div class="top_img2" v-if="Number(photoList.length)  + Number(videoList.length)  == 2">
              <div class="hidden" v-if="videoList.length && index < 1" v-for="(item,index) in videoList" style="width:480px;height:480px">
                <video  controls="controls" autoplay loop muted :src="item.img"  style="width:100%;height:100%;object-fit: cover;"></video>
              </div>
              <div class="hidden" v-if="!videoList.length" style="width:480px;height:480px">
                <loadingImg class="hidden" v-show="index == 0"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:100%;height:100%"></loadingImg>
              </div>
              <loadingImg class="hidden"  @toPublish="looKingP" v-show="!videoList.length?index >= 1:index >= 0" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:594px ;height:480px;"></loadingImg>
          </div>
          <div class="top_img2" v-if="Number(photoList.length)  + Number(videoList.length)  == 3">
            <div class="hidden" v-if="videoList.length && index < 1" v-for="(item,index) in videoList" style="width:330px;height:480px">
                <video controls="controls" autoplay loop muted :src="item.img"  style="width:100%;height:100%;object-fit: cover;"></video>
            </div>
            <div class="hidden" v-if="!videoList.length" style="width:330px;height:480px">
                <loadingImg class="hidden" v-show="index == 0"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:100%;height:100%"></loadingImg>
            </div>
            <div v-for="(item,index) in photoList"> 
            <loadingImg class="hidden" @toPublish="looKingP" v-show="!videoList.length?index>=1:index>=0"  type="new2" :src="item.img" style="height:480px" :style="{width:index == 1? '330px':'408px'}"></loadingImg>
            </div>
          </div>
          <div class="top_img2" v-if="Number(photoList.length)  + Number(videoList.length)  == 4">
            <div class="top_img4_1">
              <div class="hidden" v-if="videoList.length && index < 1" v-for="(item,index) in videoList" style="width:330px; height:480px">
                <video controls="controls" autoplay loop muted :src="item.img"  style="width:100%;height:100%;object-fit: cover;"></video>
              </div>
              <div class="hidden" v-if="!videoList.length" style="width:330px;height:480px">
                <loadingImg class="hidden" v-show="index == 0"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:100%;height:100%"></loadingImg>
              </div>
              <loadingImg v-show="!videoList.length? index==1:index<1" class="hidden"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="margin-left:6px;width:330px;height:480px;"></loadingImg>
            </div>
            <div class="top_img4_2">
              <loadingImg class="hidden" @toPublish="looKingP" v-if="!videoList.length?index > 1:index>=1" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:408px;height:237px;"></loadingImg>
            </div>
          </div>
          <div class="top_img2" v-if="Number(photoList.length)  + Number(videoList.length)  == 5">
            <div class="top_img4_1">
              <div class="hidden" v-if="videoList.length && index < 1" v-for="(item,index) in videoList" >
                <video controls="controls" autoplay loop muted :src="item.img" style="width:330px;height:480px;border-radius:4px;object-fit:cover" ></video>
              </div>
              <div class="hidden" v-if="!videoList.length" style="width:330px;height:480px">
                <loadingImg class="hidden" v-show="index == 0"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:100%;height:100%"></loadingImg>
              </div>
              <loadingImg v-show="!videoList.length? index==1:index<1" class="hidden"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:330px;height:480px;margin-left:6px;"></loadingImg>
            </div>
            <div class="top_img4_2">
              <loadingImg class="hidden" @toPublish="looKingP" v-show="!videoList.length?index == 2:index == 1" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:408px;height:237px;"></loadingImg>
              <div class="flexBetween" style="height:50%">
                <loadingImg  class="hidden" @toPublish="looKingP" v-if="!videoList.length?index > 2:index>1" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:201px;height:237px;"></loadingImg>
              </div>
            </div>
          </div>
          <div class="top_img2" v-if="Number(photoList.length)  + Number(videoList.length)  >= 6">
            <div class="top_img4_1">
              <div class="hidden" v-if="videoList.length && index < 1" v-for="(item,index) in videoList" >
                <video controls="controls" autoplay loop muted :src="item.img" style="width:330px;height:480px;border-radius:4px;object-fit:cover" ></video>
              </div>
              <div class="hidden" v-if="!videoList.length" style="width:330px;height:480px">
                <loadingImg class="hidden" v-show="index == 0"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:100%;height:100%"></loadingImg>
              </div>
              <loadingImg v-show="!videoList.length? index==1:index==0" class="hidden"  @toPublish="looKingP" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:330px;height:480px;margin-left:6px;"></loadingImg>
            </div>
            <div class="top_img4_2" style="width:408px;height:480px">
              <div class="flexBetween">
                <loadingImg class="hidden" @toPublish="looKingP" v-show="!videoList.length?index >= 2 && index <=3:index>=1&&index<=2" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:200px;height:236px;"></loadingImg>
              </div>
              <div class="flexBetween" >
                <loadingImg  class="hidden" @toPublish="looKingP" v-if="!videoList.length?index >=4 && index <= 5:index>=3&&index<=4" v-for="(item,index) in photoList" type="new2" :src="item.img" style="width:200px;height:236px;"></loadingImg>
              </div>
            </div>
          </div>
        </div>
        <div class="marginBottom" style="width:1080px;margin: 0 auto;display: flex;justify-content: flex-end">
              <el-row  ><el-button icon="el-icon-star-off" circle @click="like" :style="{backgroundColor:is_collection? '#FF5A5F':'#fff'}"></el-button></el-row>
              <el-row  class="marginLeft"><el-button icon="el-icon-share" circle @click="share"></el-button></el-row>
        </div>
        <div style="width:1080px;margin: 16px auto">
          <div >
            <h1  style="text-align:left">{{title}}</h1>
            <div class="flexStart marginBottom" style="color:#2C3E50;font-weight:bold;" >
              <div class="marginBottom firstCOntent">
                  <div  style="margin-left:50px">{{score}}</div>
                  <div style="">
                    <el-rate  disabled
                      :colors="['#000','#000','#000']"
                      :value="parseInt(score)">
                    </el-rate>
                  </div>
                  <div class="marginBottom" style="min-width:150px;">
                    <div><span  style="cursor: pointer" @click="tiYan=true">翻译体验内容</span></div>
                    <div style="margin-top:20px;"><span @click="toTranslation" style="cursor: pointer">查看体验翻译</span></div>
                  </div>
              </div>
              <div class="flexBetween"  style="width:77%;">
                  <div class="marginBottom" style="text-align:left;">
                    <div>
                      
                      <div><img :src="arr[0].img">&nbsp;&nbsp;<span style="color:#83919E">地点</span></div>
                      <p class="marginBottom">{{province}}</p>
                    </div>
                    <div class="marginBottom">
                      <p><img :src="arr[2].img">&nbsp;&nbsp;<span style="color:#83919E">体验时长</span></p>
                      <p class="marginBottom">{{total_time}}</p>
                    </div>
                </div>
              <div class="marginBottom" style="text-align:left">
                  <div>
                    <p><img :src="arr[4].img">&nbsp;&nbsp;<span style="color:#83919E">语言</span></p>
                    <p class="marginBottom">{{main_language}}(主要) , <span v-for="(item,index) in other_laguage">&nbsp;&nbsp;{{language[item].label}}</span>(其他)</p>
                  </div>
                  <div class="marginBottom">
                    <p><img :src="arr[3].img">&nbsp;&nbsp;<span style="color:#83919E">提供</span></p>
                    <p class="marginBottom">{{activ_provite}}</p>
                  </div>
              </div>
              <div class="marginBottom" style="text-align:left;">
                <div>
                    <p><img :src="arr[3].img">&nbsp;&nbsp;<span style="color:#83919E">准备</span></p>
                    <p class="marginBottom">{{activ_bring}}</p>
                  </div>
                  <div class="marginBottom" >
                    <p><img :src="arr[1].img">&nbsp;&nbsp;<span style="color:#83919E">房源</span></p>
                    <p class="marginBottom">{{long_day == '1'?'该体验包含住宿':'该体验单独提供住宿'}}</p>
                  </div>
              </div>
              </div>
            </div>
              <div v-if="is_volunteen"  class="flexStart" >
                <div class="mainFont firstCOntent">
              
                </div>
                <div class="flexStart secendWidth"  style="line-height:40px;height:40px;margin-top: 49px;">
                  <span  class="mainButton"  size="medium"  @click="orderVolunter">志愿者报名></span>
                  <span  style="color:#666666;font-size: 14px; margin-left:19px;">报名需知：需要会<span v-for="(item,index) in needLanguage">{{language[item].label+ '、'}}</span>&nbsp;|&nbsp;其他要求：{{volun_require}}</span>
                </div>
              </div>
              <hr class="line">
              <div class="flexStart">
                <div class=" mainFont firstWidth" >
                  体验优惠
                </div>
                <div class="secendWidth">
                  <div class="flexStart">
                    <div style="height:24px;width:50px;background:rgba(243,247,250,1);text-align:center" class="mainColor" >折扣</div>
                    <div  style="margin-left:15px;width:100%;">
                      <div class="flexWrap" >
                        <div class="marginRight marginTop" style="" v-for="(item,index) in discount" v-show="isDiscount? index < 4:true">{{item.date}} {{item.begin_time}}—{{item.end_time}}时间内标准价{{Number(item.price_discount)}}折儿童价{{Number(item.kids_price_discount)}}折</div>
                        <div v-if="!discount.length">该活动没有折扣!</div>
                      </div>
                      <div class='mainButton' style="height:20px;width:80px;cursor:pointer" @click="isDiscount = !isDiscount" v-if="discount.length > 4">{{isDiscount?'查看更多':'收起查看'}}</div>
                    </div>
                  </div>
                  <div class="flexStart">
                      <div style="height:24px;background:rgba(243,247,250,1);text-align:center;width:80px;" class="mainColor" >返差价</div>
                      <div  style="margin-left:15px;">
                        <div class="flexWrap">
                          时间段内体验结束时满
                          <div class="marginTop"  v-for="(item,index) in Differ">
                            {{item.num}}人返预付的{{Number(item.refund_rate)}}%;
                          </div>
                        </div>
                        <div v-if="!Differ.length">该活动没有折扣!</div>
                      </div>
                    </div>
                  <div class="flexStart">
                    <div style="height:24px;width:48px;background:rgba(243,247,250,1);font-size:14px;text-align:center" class="mainColor">套餐</div>
                    <div  style="margin-left:15px;">
                      <p>{{is_combine?'该活动包含亲子套餐和综合套餐':'该活动未包含亲子和组合套餐'}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="line">
              <div class="flexStart">
                <div class=" mainFont firstWidth" >
                  关于策划人
                </div>
                <div class="secendWidth">
                  <div style="min-width:150px">
                    <div><img @click="toPerson(userId)" :src="userImg" width="48px" height="48px" style="border-radius:50%;margin-bottom: 10px;"></div>
                    <p style="font-size:18px;font-weight:bold;">{{userName?userName:'匿名用户'}}</p>
                    <p v-if="userId != isOwer " @click="contactPlanner" style="font-size:14px;color:#000;cursor: pointer;margin-top:15px;">联系策划人</p>
                  </div>
                  <div>
                    <div style="margin-top:20px;line-height:40px;word-wrap:break-word;white-space:pre-wrap;line-height:30px;" v-html="Xss(userintroduce)"></div>
                    <span v-if="best_introduce" style="color:#008489;">最佳翻译：{{best_introduce}}！</span>
                  </div>
                </div>
              </div>
              <hr class="line">
              <div class="flexStart">
                <div class=" mainFont firstWidth" >
                  体验内容
                </div>
                <div class="secendWidth">
                  <div style="margin-top:20px;word-wrap:break-word;white-space:pre-wrap;line-height:30px" v-html="Xss(content)"></div>
                  <span v-if="best_descripte" style="color:#008489;">最佳翻译：{{best_descripte}}！</span>
                </div>
              </div>
              <hr class="line">
              <div class="flexStart">
                <div class=" mainFont firstWidth" >
                  体验地点
                </div>
                <div class="secendWidth flexStart" style="text-align:left;">
                  <div>
                    <p class="fontweight marginTop">体验地点</p>
                    <p class="marginTop">{{province}}</p>
                    <p class="fontweight marginTop">体验路线</p>
                    <div style="word-wrap:break-word;white-space:pre-wrap;">{{goPlace}}</div>
                  </div>
                  <div style="margin-left:100px;">
                    <p class="fontweight marginTop">集合地点</p>
                    <p class="marginTop">{{set_address}}</p>
                  </div>
                </div>
              </div>
          </div>
          <div style="margin-top: 56px;">
            <Map style="height:300px;"></Map>
          </div>
          <hr class="line">
          <div class="flexStart">
            <div class="firstWidth mainFont">
              <p>评论列表</p>
            </div>
            <div class="secendWidth">
              <div>
                <Person  type="discuss" :isLogin="isLogin"  :replay="replay" :imgUrl="imgUrl" :overflow="overflow" :review="review" :height="height" v-on:textareaFocus="textareaFocus" v-on:abolish="abolish" v-on:discuss="discuss"></Person>
                <div v-if="personList.length == 0" style="text-align:center;margin:20px 0;border:1px solid #eee;padding:10px;">
                  暂无评论！期待您的参与！
                </div>
                <div style="margin:20px 0;" v-show="pager==1? index<4:true" v-for="(item,index) in personList">
                  <Person style="margin-bottom: 35px;" type='2' v-on:toPerson="toPersonA(item,index)" v-on:lookImage="clickImage" :is_report="item.is_report" :image="item.image" :isLogin="isLogin" :isOwer="item.user_id == isOwer? delet:isdelet" :imgUrl="item.user.head_image? item.user.headimage.domain + item.user.headimage.image_url: '../../../static/img/static/user.png'" :name="item.user.name?item.user.name:'匿名用户'" :time="item.create_time" :mess="item.content" :parseNum="item.praise_num" :is_praise="item.is_praise" v-on:parise="parise(item,1)" v-on:talk="talk(item,index)" v-on:openInform="openInform(item,1)"></Person>
                  <div v-if="item.leavemsg.length" style="background-color:rgba(0,0,0,.05);padding:10px" >
                    <div v-for="(items,indexs) in item.leavemsg" style="border-bottom: 1px solid #000;">
                      <Person type="replay" :isLogin="isLogin" :is_report="items.is_report" :replayChoose="replayChoose" v-on:openInform="openInform(items,2)" v-on:talk="leaveTalk(items,index)"  :name="items.user.name?items.user.name:'匿名用户'" :isOwer="items.user_id == isOwer?delet:isdelet" :otherName="items.topuser.name" :mess="items.content"  :parseNum="items.praise_num"  v-on:parise="parise(items,2)" ></Person>
                    </div>
                    <p  style="text-align: left;font-size:14px;color:#008489;padding:10px 0;"><span @click="toAllLeave(item)" style="cursor: pointer">共{{item.leaving_num}}条回复</span></p>
                  </div>
                </div>
              </div>
              <div v-if="(pager*10) < total" >
                  <span class="mainButton" @click="handleCurrentChange">查看更多评论</span>
              </div>
            </div>
            <el-dialog v-if="videoIMg" :visible.sync="viedio">
              <img style="width:50%;"   :src="videoIMg" alt="" />
            </el-dialog>
          </div>
          <hr class="line">
          <div class="flexStart">
              <div class=" mainFont firstWidth" >
                房源图片
              </div>
              <div class="secendWidth">
                <div style="display: flex;flex-wrap: wrap;">
                  <div v-for="(item,index) in houseImage"  style="position: relative;margin: 20px 0;">
                    <div v-if="isflag">
                      <loadingImg :src="item.domain+item.image_url" type="3" style="width:250px;height:200px;margin-right:10px;"></loadingImg>
                      <span style="position: absolute;bottom:0;left:0;padding:1px 10px ;background-color: rgba(0,0,0,.5);color:#fff;">{{item.flag == 1?'露营':item.flag == 2?'民宿':'酒店'}}</span>
                      <span @click="lookHouseImg(item,index)" style="cursor:pointer;position: absolute;left:50%;top:50%;padding:1px 10px ;background-color: rgba(0,0,0,.5);color:#fff;margin-left:-42px;margin-top:-10px;border-radius: 5px;">查看更多</span>
                    </div>
                    <div v-if="!isflag && index <1">
                      <loadingImg :src="item.domain+item.image_url" type="3" style="width:250px;height:200px;margin-right:10px;"></loadingImg>
                      <span @click="lookHouseImg(item,index)" style="cursor:pointer;position: absolute;left:50%;top:50%;padding:1px 10px ;background-color: rgba(0,0,0,.5);color:#fff;margin-left:-42px;margin-top:-10px;border-radius: 5px;">查看更多</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <hr class="line">
          <div class="flexStart">
              <div class=" mainFont firstWidth" >
                注意事项
              </div>
              <div class="secendWidth">
                <div class="secendWidth flexStart" style="text-align:left;">
                  <div>
                    <p class="fontweight marginTop">退订政策</p>
                    <p class="marginTop">
                      <span v-if="return_DL == 1||return_DL == 2">活动开始</span>{{return_policy}} 
                      <span v-if="return_DL == 1||return_DL == 2">取消可全额退款</span>
                    </p>
                    <p class="marginTop">{{return_content}}</p>
                    <p class="fontweight marginTop">年龄要求</p>
                    <p class="marginTop">{{age_limit}}岁以上</p>
                  </div>
                  <div style="margin-left:100px;">
                    <p class="fontweight marginTop">团体人数</p>
                    <p class="marginTop" v-if="orderNum">这个体验最近举办时间活动有<span style="color:#008489">{{orderNum}}</span>个名额。</p>
                    <p class="marginTop" v-if="!orderNum">这个体验最近没有举办时间。</p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="line">
            <div v-show="listA.length">
              <div  class="flexStart">
                <div class="firstWidth mainFont">
                  类似体验
                </div>
                <div  style="width:860px;height:300px;overflow:hidden;position:relative;">
                  <div id="b" :style="{width:listA.length * 300 + 'px'}" style="height:300px;position:absolute;left:0px;transition: all .3s linear">
                    <div v-for="item in listA" style="width:280px;margin:0 10px;float:left" >
                      <Detail type="1" :activity_id="item.activity_id" :imgUrl="item.domain + item.image_url" :city="item.city" :total_time="item.total_time" :activ_provite="item.activ_provite" :comment_num="item.comment_num" :name="item.title" :score="item.score" :english="item.main_laguage" :money="item.money" :kind="item.kind" v-on:toPublish="toPublish(item)" v-on:consult="consult(index)"></Detail>
                    </div>
                  </div>
                  <div class="prev">
                    <el-button type="warning" icon="el-icon-arrow-left" circle v-show="prevOver" @click="prevIndex"></el-button>
                  </div>
                  <div class="next">
                    <el-button type="warning" icon="el-icon-arrow-right" circle v-show="listA.length>3?nextOver:false" @click="nextIndex"></el-button>
                  </div>
                </div>
              </div>
            </div>
      
        </div>
      </div>
      <div style="position: fixed;bottom:0;background:rgba(245,247,250,1);height:98px;width:100%;z-index:99">
        <div class="flexBetween" style="margin:6px 18% 30px;">
          <div class="flexStart">
            <div><img :src="userImg" width="62" height="62" style="border-radius:50%;margin-top: 6px;"></div>
          
              <div style="margin-left:24px;line-height:40px;margin-top: 28px;">
               <el-rate void-color="#000"  :colors="['#000', '#000', '#000']" :value="parseInt(score)" disabled></el-rate>
              </div>
           
          </div>
          <div style="display: flex;align-items: center;font-size:18px;">
            <span v-if="price" style="margin-right:20px;font-weight: bold;color:##14C5CA"><span>￥</span>{{price}}+/人</span>
            <span class="mainClick" @click="toDate" v-if="orderNum&&userId != isOwer">查看日期</span>
            <el-button v-if="!orderNum&&userId != isOwer" style="border:1px solid red;color:red" plain >已过期/已满</el-button>
          </div>
        </div>
      </div>


      <!--翻译弹窗-->
      <div v-show="tiYan" style="position: fixed;top:0;left:0;right:0;bottom: 0;background-color: rgba(0,0,0,.5);z-index:999;font-size:13px;">
        <div class="transition-tiyan">
          <div class="transition-content">
            <div style="font-size: 25px;text-align: right" @click="tiYan=false"><i class="el-icon-close"></i></div>
            <h3>志愿者翻译</h3>
            <div :model="first">
              <el-select style="margin:10px 0;" v-model="first.language" clearable placeholder="请选择翻译语言">
                <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <p><b>关于策划人</b></p>
              <div style="margin:10px 0;">{{userintroduce}}。&nbsp;<span style="color:#008489;cursor: pointer" @click="isIntroduce = !isIntroduce">{{isIntroduce?'收起':'翻译'}}</span></div>
              <el-input v-show="isIntroduce" type="textarea" style="margin:10px 0;" :rows="4" placeholder="请翻译此内容" v-model="first.textarea"></el-input>
              <p><b>关于体验内容</b></p>
              <div style="margin:10px 0;">{{content}}。&nbsp;<span style="color:#008489;cursor: pointer" @click="isContent = !isContent">{{isContent?'收起':'翻译'}}</span></div>
              <el-input v-show="isContent" type="textarea" style="margin:10px 0;" :rows="4" placeholder="请翻译此内容" v-model="first.content"></el-input>
            </div>
            <el-button style="margin: 20px 0;" type="primary" icon="el-icon-check" @click="saveTranslate">提交</el-button>
          </div>
        </div>
      </div>
      <!--翻译弹窗结束-->
     

      <div v-if="looKing" style="position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(0,0,0,.8);z-index:999">
          <div style="position: absolute;right:20%;top:10%;width:30px;height:30px;border:1px solid #fff;border-radius: 50%;font-size:30px;cursor: pointer;color:#fff;" @click="closeLook"><i class="el-icon-close"></i></div>
          <div style="position:fixed;width:60%;left:20%;top:15%;height:70%;">
              <div style="display: flex;justify-content: space-between;width:100%;height:70%;margin-top: 30px;">
                <div style="color:#fff;font-size:50px;display: flex;align-items: center;margin-right:50px;">
                  <i @click="prev" class="el-icon-arrow-left"></i>
                </div>
                <div style="position: relative;width:90%;height:100%" >
                  <loadingImg type="2" :src="lookImage[photoIndex].domain + lookImage[photoIndex].image_url" style="height:100%;max-width:100%;overflow: hidden"></loadingImg>
                  <span v-if="isflag" style="position: absolute;bottom:0;left:0;padding:1px 10px ;background-color: rgba(0,0,0,.5);color:#fff;">{{flag == 1?'露营':flag == 2?'民宿':'酒店'}}</span>
                </div>
                <div style="color:#fff;font-size:50px;display: flex;align-items: center;margin-left:50px;">
                  <i @click="next" class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div style="width:530px;position: relative;height:80px;overflow: hidden;margin: 20px auto;">
                <div style="position: absolute;transition:.3s all linear;display: flex;justify-content: flex-start;align-items: center" :style="{marginLeft:left+'px'}">
                  <div  v-for="(item,index) in lookImage" @click="lookclick(item,index)" style="width:100px;height:75px;border:2px solid;margin-right:10px;"  :style="{borderColor:photoIndex == index? '#FFF':''}" >
                    <loadingImg type="3"  :src="item.domain + item.image_url" style="width:100px;height:75px"  ></loadingImg>
                  </div>
                </div>
              </div>
          </div>
      </div>   
      
      <div v-if="NowChat" style="z-index:990;position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(0,0,0,.8)">
        <div style="width:500px;padding: 30px;background-color: #fff;border-radius: 10px;">
          <Person type="discuss" :isLogin="isLogin" :replay="replay" :imgUrl="imgUrl" :review="review"  v-on:abolish="abolish" v-on:discuss="discuss"></Person>
        </div>
      </div>
      <!-- <div style="width: 1080px;margin: 80px auto;">
        <Foot></Foot>
      </div> -->
      <div v-if="isLoading" style="z-index:990;position:fixed;top:0;left:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,.8)">
        <Loading></Loading>
      </div>
      <Bounced v-show="isLike" type="like" v-on:addWish="addwish" v-on:addWishName="addWishName" v-on:save="save" :wishList="wishList"  :newWish="newWish" @getName="getName" v-on:closeWish="closeWish"></Bounced>
      <Bounced v-show="isWeixin" v-on:closeWeixin="closeWeixin" :weixin="weixin" type="weixin" ></Bounced>
      <Bounced v-show="isLooking" :changeColor="changeColor" v-on:changeIndex="changeIndex"  :imgList="lookList" v-on:closeLookImg="closeLookImg" type="lookImg" ></Bounced>
      <Bounced v-show="isInform" type="inform" v-on:closeInform="closeInform" :informList="informList" :changeReason="changeReason" v-on:informAblish="informAblish" :informReason="informReason" v-on:changeForm="changeForm" v-on:informSend="informSend"></Bounced>
      <Chat v-if="isChat"  v-on:chat="chat" :userUrl="imgUrl"  :to_user_id="userId" :isOwer="isOwer" :userName="userName" :other_img="userImg"></Chat>
      <Bounced v-if="isShare" v-on:toEmail="toEmail" :userId="isOwer" v-on:toWeixin="toWeixin" v-on:toWeiBo="toWeiBo" type="share" v-on:closeShare="closeShare"></Bounced>
      <div v-if="isEmail" style="position: fixed;top:0;left:0;right:0;bottom:0;background: rgba(0,0,0,.5);display: flex;justify-content: center;align-items: center;z-index:999">
        <div style="background-color: white;width:500px;padding: 20px;">
          <div style="display: flex;justify-content: flex-start;margin:20px 0;">
            <p style="width:100px;line-height:40px;">收件人：</p><el-input v-model="reacetWho" placeholder=""></el-input>
          </div>
          <div style="display: flex;justify-content: flex-start;margin:20px 0;">
            <p style="width:100px;line-height:40px;">邮件主题：</p><el-input v-model="emailCenter" placeholder=""></el-input>
          </div>
          <div style="display: flex;justify-content: flex-start;margin:20px 0;">
            <p style="width:100px;line-height:40px;">邮件内容：</p>
            <el-input type="textarea" v-model="shareContent" :autosize="{minRows:5}" placeholder="说说你要分享的内容" ></el-input>
          </div>
          <div style="text-align: right">
            <el-button  @click="isEmail = false" style="margin-top:20px">取消</el-button>
          <el-button type="primary" @click="shreEmail" style="margin-top:20px">分享</el-button>
        </div>

          <!--            <a href="mailto:1464153279@qq.com?&Subject=Hello&Body=你好">给我发邮件</a>-->
        </div>
      </div>
    </div>
</template>

<script>
/*  import wx from 'weixin-js-sdk'*/
  import Chat from '../../public/chat'
  import Loading from '../../public/Loading'
  import Bounced from '../../public/bounced.vue'
  import Foot from '../../public/foot.vue'
  import Detail from '../../public/detail.vue'
  import Map from '../../public/map.vue'
  import Person from '../../public/person.vue'
  import Head from '../../public/head.vue'
  import test from '../../../static/js/language'
  import policy from '../../../static/js/returnPolicy'
  import Bus from '../../assets/eventBus'
  import loadingImg from '../../public/loadingImg'
    export default {
      name: "publishPage",
      data() {
        return {
          api: this.GLOBAL.baseURL,
          imgList: [],
          activeList:[],
          options: [
            {value: 1, label: 'English'},
            {value: 2, label: '中文'},
            {value: 3, label: '日本语'}
          ],
          listA:[],
          personList:[],
          policy:[],
          title:'',
          userImg:'',
          userName:'',
          userintroduce:'',
          is_volunteen:'',
          content:'',
          attation:'',
          goPlace:'',
          activ_bring:'',
          province:'',
          total_time:'',
          activ_provite:'',
          main_language:'',
          return_policy:'',
          return_content:'',
          language:[],
          overflow:'hidden',
          informReason:{
            text:''
          },
          age_limit:'',
          height:'80px',
          status:0,
          review:{
            text:''
          },
          isLogin:true,
          replay:'说点什么...',
          score:0,
          tiYan: false,
          pageIndex:0,
          prevOver:false,
          nextOver:true,
          isLike:false,
          isShare:false,
          changeReason:true,
          isInform:false,
          introduce:'',
          skill:'',
          star:5,
          sliderNum:'0',
          first: {
            language: '',
            textarea: '',
            content:''
          },
          onFetching: false, //防止页面滑动时多次加载
          page: 0,  //滑动次数or加载数据的页数
          imgUrl:'',
          routerParams:'',
          userId:'',
          dayList:'',
          weekDay:'',
          is_collection:'',
          wishList:[],
          newWish:false,
          wishNamea:'',
          wishIndex:0,
          orderNum:'',
          informList:[],
          total:0,
          isOwer:'',
          delet:true,
          isdelet: false,
          pager:1,
          saveLeave:'',
          saveInfor:'',
          replayChoose:false,
          isIntroduce:true,
          isContent:true,
          isWeixin:false,
          weixin:'',
          translate_id:'',
          isLoading:false,
          long_day:"",
          houseImage:[],
          looKing:false,
          lookImg:"",
          lookIndex:false,
          lookImage:[],
          topH:0,
          isLooking:false,
          lookList:'',
          changeColor:1,
          photoIndex:0,
          left:0,
          flag:'',
          photoList:[],
          videoList:[],
          isflag:'',
          viedio:false,
          videoIMg:'',
          isChoose:'',
          isChat:false,
          Chat:'',
          jionDress:[],
          set_address:'',
          languageID:'',
          best_introduce:"",
          best_descripte:"",
          isvolunteer:'',
          needLanguage:'',
          volun_require:'',
          price:'',
          other_laguage:'',
          NowChat:false,
          isEmail:false,
          reacetWho:'',
          emailCenter:'',
          return_DL:'',
          max_height:'',
          discount:[],
          isDiscount:true,
          Differ:[],
          is_combine:'',
          arr:[
            {img:"../../../static/img/publish/icon_1(1).png"},
            {img:"../../../static/img/publish/icon_1(2).png"},
            {img:"../../../static/img/publish/icon_1(3).png"},
            {img:"../../../static/img/publish/icon_1(4).png"},
            {img:"../../../static/img/publish/icon_1(5).png"},

          ]
        }
      },
      components: {
        Head,
        Person,
        Map,
        Detail,
        Foot,
        Bounced,
        Loading,
        loadingImg,
        Chat
      },
      mounted(){
        let _this = this
        _this.nextOver = true
        if(localStorage.getItem('isLogin')){
          _this.getOwers()
        }
         _this.ScrollContent()
        _this.sendBuidu()
        _this.getComment(1)
        _this.getActls()
        _this.imgUrl = localStorage.getItem('userImg')
       
      },
      created:function(){
        this.language = test()
        this.policy = policy()
        this.getParams()
        window.scroll( 0 ,0)
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        if(flag){
          this.$router.push({
            path: '/mPublishPage',
            query:{
              information: this.$route.query.information
            }
          })
        }
      },
      watch:{
        '$route':'getParams',
        wishNamea:function(){
          Bus.$emit('returnName',this.wishNamea)
        },
        routerParams:function(){
          window.scroll(0,0)
          this.imgList = []
          this.personList = []
          this.activeList = []
          this.dayList = []
        },
        province:function(){
          Bus.$emit('jionDress',this.jionDress)
          Bus.$emit('tyas',1)
        },
        imgList:function(){
          var a = []
          var b = []
          for(let i =0;i<this.imgList.length;i++){
            if(this.imgList[i].extension != 'mp4'){
              a.push({img:this.imgList[i].domain + this.imgList[i].image_url})
            }else{
              b.push({img:this.imgList[i].domain + this.imgList[i].image_url})
            }
          }
          this.photoList = a
          this.videoList = b
        }
      },
      methods:{
        sendBuidu(){
          if(window.location.href.indexOf('.top') == -1 && window.location.href.indexOf('localhost') == -1){
            this.$http.post(this.api + '/BaiduPush',{
              token: localStorage.getItem('token'),
              url: encodeURIComponent(window.location.href)
            })
              .then(res=>{
                if(res.data.code == 1){
                }else if(res.data.code == 3){
                  this.sendBuidu()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
     
        //联系策划人
        chat(){
          this.isChat = false
        },
        lookclick(item,index){
          this.photoIndex = index
        },
        closeLook(){
          this.looKing = false
          this.photoIndex = 0
          this.left = 0
        },
        prev(){
          if(this.photoIndex > 3){
            this.photoIndex --
            this.left += 114
          }else if(this.photoIndex >0&& this.left <0){
            this.photoIndex --
            this.left += 114
          }else if(this.photoIndex >0&& this.left >=0){
            this.photoIndex --
          }
        },
        next(){
          if(this.photoIndex < this.lookImage.length -1){
            this.photoIndex ++
            if(this.photoIndex > 3){
              this.left -= 114
            }
          }
        },
        changeIndex(val){
          if(val==1){
            this.changeColor = 1
            this.lookList = this.photoList
          }else{
            this.changeColor = 2
            this.lookList =  this.videoList
          }
        },
        closeLookImg(){
          this.isLooking = false

        },
        clickImage(val){
          this.videoIMg = val
          this.viedio = true
        },
        //滚动
        ScrollContent(){
          let a = window.screen.availHeight
    
          this.max_height = a*0.6
        
        },
        looKingP(){
          this.isLooking = true
          if( this.changeColor = 1){
            this.lookList = this.photoList
          }else{
            this.lookList = this.videoList
          }
        },
        //
        lookHouseImg(item,index){
          this.looKing = !this.looKing
          if(this.isflag){
            this.flag = item.flag
          }
           this.lookImage = this.houseImage
        },
        //查看照片
        lookIng(item,index){
          this.lookImg = item.domain + item.image_url
          this.lookIndex = true
        },
        closeWeixin(){
          this.isWeixin = false
        },
        //分享微信
        toWeixin(){
          var url =window.location.href + '&'+ 'userId' +'='+this.isOwer
          this.$http.post(this.api + '/home/Upload/getqrcode',{
            token: localStorage.getItem('token'),
            url:url
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isShare = false
                this.isWeixin = true
                this.weixin = res.data.data.src
               
              }
            })
        },
        //分享微博
        toWeiBo(){
          var p = {
            //将页面地址转成短域名， 并显示在内容文字后面。(可选， 允许为空)
            url: window.location.href + '&'+'userId' +'='+this.isOwer,
            //分享时所示的文字内容， 为空则自动抓取分享页面的title值(可选， 允许为空)
            title: '分享活动'+ this.title,
            //自定义图片地址， 作为微博配图(可选， 允许为空)
            pic: '',
            //语言设置(zh_cn | zh_tw)(可选)
            language: 'zh_cn'
          };
          var s = [];
          for(var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''));
          }
          var url = "http://service.weibo.com/share/share.php?" + s.join('&');
          window.open(url);
        },
        //查看翻译
        toTranslation(){
          this.$router.push({
            path: '/translation',
            query:{
              activeId: this.routerParams
            }
          })
        },
        toEmail(){
          this.isEmail = true
          this.isShare = false
        },
        shreEmail(){
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
          if(!reg.test(this.reacetWho)){
            this.$message({type:'info',message:'请输入正确邮箱账号'})
          }else{
            this.$http.post(this.api + '/EmailShare',{
              token: localStorage.getItem('token'),
              toemail: this.reacetWho,
              title: this.emailCenter,
              content: this.shareContent,
              url:window.location.href + '&'+'userId' +'='+this.isOwer,
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({type:'success',message:'分享成功'})
                  this.isEmail = false
                }else if(res.data.code == 3){
                  this.toEmail()
                }else{
                  this.$message({type:'error',message:res.data.msg})
                }
              })
          }

        },
        //保存翻译
        saveTranslate(){
          this.$http.post(this.api + '/TranslateS',{
            token: localStorage.getItem('token'),
            activity_id: this.routerParams,
            t_introduce: this.first.textarea,
            t_descripte: this.first.content,
            user_id: this.isOwer,
            language: this.first.language
          })
            .then(res=>{
              if(res.data.code == 1){
                this.tiYan = false
                this.first = {
                  textarea:'',
                  content:'',
                  language:''
                }
                this.$message({
                  type:'success',
                  message: '翻译提交成功！'
                })
              }else if(res.data.code == 3 || res.data.code == 4){
                this.saveTranslate()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        //志愿者报名
        orderVolunter(){
          if(localStorage.getItem('isLogin') && this.isvolunteer){
            this.$router.push({
              path: '/order',
              query:{
                information: this.routerParams,
                orderVolunteer: 1
              }
            })
          }else{
            alert('您还没有登陆或者您还不是志愿者！')
          }
        },
        getName(data){
          this.wishNamea = data
        },
        addWishName(){
          if(this.wishNamea == ' '||this.wishNamea.split(' ').join("").length == 0){
            this.$message({
              type:'error',
              message: '保存心愿单的过程中遇到了问题，请重试。'
            })
          }else{
            this.$http.post(this.api + '/home/Comment/add_collegroup',{
              token: localStorage.getItem('token'),
              group_name: this.wishNamea
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.wishNamea = ''
                  this.getRevie();
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.addWishName()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },

        prevIndex(){
          if(this.pageIndex > 0 ){
            this.pageIndex --
            this.nextOver = true
            let list = document.getElementById('b')
            list.style.left = parseInt(list.style.left) + 300 +'px'
            if(this.pageIndex == 0){
              this.prevOver = false
            }
          }
          },
          nextIndex(){
          if(this.pageIndex < this.listA.length - 3){
            this.prevOver = true
            this.pageIndex ++
            let list = document.getElementById('b')
            list.style.left = parseInt(list.style.left) - 300 + 'px'
            if(this.pageIndex == this.listA.length - 3){
              this.nextOver = false
            }
          }
          },
        toDate(){
          if(localStorage.getItem('isLogin')){
            this.$router.push({
              path: '/order',
              query:{
                information: this.routerParams,
                isflag: this.isflag
              }
            })
          }else{
            alert('您还没有登陆！')
          }
        },
        toChoose(item,index){
          if(localStorage.getItem('isLogin')){
            if(this.isChoose){
              if(this.long_day == '2'){
                this.$confirm('该体验为顾客提供了房源, 是否预定?', '提示', {
                  confirmButtonText: '去预定',
                  cancelButtonText: '不预定',
                  type: 'warning'
                }).then(() => {
                  var a = []
                  if(item.list){
                    for(let i = 0;i<item.list.length;i++){
                      if(i == index){
                        a=[{day:item.day,list:item.list[i],status:item.status}]
                      }
                    }
                  }else{
                    a.push(item)
                  }
                  this.$router.push({
                    name: 'allHouse',
                    query:{
                      activeId: this.routerParams,
                      slot_id:!item.list?item.slot_id:item.list[index].slot_id,
                      chooseTime:JSON.stringify(a)
                    }
                  })
                }).catch(() => {
                  var a = []
                  if(item.list){
                    for(let i = 0;i<item.list.length;i++){
                      if(i == index){
                        a=[{day:item.day,list:item.list[i],status:item.status}]
                      }
                    }
                  }else{
                    a.push(item)
                  }
                  this.$router.push({
                    name: 'choose',
                    query:{
                      activeId: this.routerParams,
                      chooseTime: JSON.stringify(a)
                    }
                  })
                });
              }else{
                var a = []
                if(item.list){
                  for(let i = 0;i<item.list.length;i++){
                    if(i == index){
                      a=[{day:item.day,list:item.list[i],status:item.status}]
                    }
                  }
                }else{
                  a.push(item)
                }
                this.$router.push({
                  name: 'choose',
                  query:{
                    activeId: this.routerParams,
                    chooseTime: JSON.stringify(a)
                  }
                })
              }
            }else{
              this.$message({
                type: 'info',
                message: '你还没有验证身份，请验证后再预定！'
              })
              localStorage.setItem('editRouter','editcheck')
              localStorage.setItem('editIndex',2)
              this.$router.push({
                path: '/editcheck'
              })
            }
          }else{
            alert('您还没有登陆！')
          }
        },
        contactPlanner(){
          if(localStorage.getItem('isLogin')){
            this.isChat = true
          }else{
            alert('你还没有登陆哦!')
          }

        },
        handleCurrentChange(){
          this.pager += 1 
          this.getComment(this.pager)
          
        },

        textareaFocus(){
          this.height = 'auto'
          this.overflow = 'none'
        },
        abolish(){
          this.review.text = ''
          this.height = '80px'
          this.overflow= 'hidden'
          this.replay = '说点什么...'
          this.NowChat = false
        },
        toAllLeave(a){
          localStorage.setItem('leave',JSON.stringify(a))
          this.$http.post(this.api + '/LeaveL',{
            token: localStorage.getItem('token'),
            flag: 4,
            order:1,
            page: 1,
            table_id: a.comment_id
          })
            .then(res=>{
              if(res.data.code == 1){
                a.leavemsg = res.data.data.data
                this.replayChoose = true
              }else if(res.data.code == 3 || res.data.code == 4){
                this.toAllLeave(a)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        discuss(){
          if(!this.review.text){
            this.$message({
              type: 'info',
              message: '请填写评论内容'
            })
          }else{
            if(this.replay == '说点什么...'){
              this.$http.post(this.api + '/CommentS',{
                token: localStorage.getItem('token'),
                flag: 1,
                table_id: this.routerParams,
                content:  this.review.text
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.review.text = ''
                    this.$message({
                      message:'评论成功',
                      type:'success'
                    })
                    this.getComment(1)
                  }else if(res.data.code == 3 || res.data.code == 4){
                    this.discuss()
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              let flag = ''
              if(this.saveLeave){
                flag = 5
              }else {
                flag = 4
              }
                this.$http.post(this.api + '/home/Comment/save_leavemsg',{
                  token: localStorage.getItem('token'),
                  flag: flag,
                  content: this.review.text,
                  table_id: localStorage.getItem('comment_id')
                })
                  .then(res=>{
                    if(res.data.code == 1){
                      localStorage.removeItem('comment_id')
                      this.review.text = ''
                      this.$message({
                        message:'评论成功',
                        type:'success'
                      })
                      this.NowChat = false
                      this.replay = '说点什么...'
                      if(this.replayChoose){
                        let a = JSON.parse(localStorage.getItem('leave'))
                        this.toAllLeave(a)
                      }else{
                        this.getComment(this.pager)
                      }
                      this.saveLeave = false
                    }else if(res.data.code == 3 || res.data.code == 4){
                      this.discuss()
                    }else if(res.data.code == 0){
                      alert(res.data.msg)
                    }
                  })
              }
          }
        },
        getParams:function(){
          this.routerParams = this.$route.query.information
          if(this.$route.query.translate_id){
            this.translate_id = this.$route.query.translate_id
          }
          var userLanguage = navigator.language.substr(0,2)
          for(let i = 0; i< this.language.length;i++){
            if(this.language[i].name == userLanguage){
              this.languageID = i
            }
          }
          this.getActive(this.translate_id )
          this.getDiscount()
          this.getDiffer()
          this.getHouseImg()
          this.getSlot()
        },
        getSlot(){
          this.$http.post(this.api + '/ActivitySlotUserTwo',{
            token: localStorage.getItem('token'),
            verson: 2.0,
            activity_id: this.routerParams
          })
          .then(res=>{
            if(res.data.code == 1){
              let data  = res.data.data
              if(data.length){
                this.orderNum = data[0].max_person_num
              }
              
            }else if(res.data.code == 3){
              this.getSlot()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        getHouseImg(){
          this.$http.post(this.api + '/ActivityHouseImageTwo',{
            token: localStorage.getItem('token'),
            verson: 2.0,
            activity_id: this.routerParams,
          })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              this.houseImage = data
            }else if(res.data.code == 3){
              this.getHouseImg()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        getDiffer(){
          this.$http.post(this.api + '/DifferListTwo',{
            token: localStorage.getItem('token'),
            verson: 2.0,
            activity_id: this.routerParams
          })
          .then(res=>{
            if(res.data.code == 1){
             
              this.Differ = res.data.data
            }else if(res.data.code == 3){
              this.getDiffer()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        getDiscount(){
          this.$http.post(this.api + '/ActivityDiscountTwo',{
            token: localStorage.getItem('token'),
            verson: 2.0,
            activity_id: this.routerParams
          })
          .then(res=>{
            if(res.data.code == 1){
              this.discount = res.data.data
            }else if(res.data.code == 3){
              this.getDiscount()
            }else if(res.data.code == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        getActive(val){
          this.isLoading = true
          this.$http.post(this.api + '/ActivityDetailTwo',{
            token: localStorage.getItem('token'),
            activity_id: this.routerParams,
            translate_id:val,
            language:this.languageID,
            visit: 1,
            verson:2.0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                this.imgList.push(data.cover)
            
                for(let i =0;i<data.image.length;i++){
                    this.imgList.push(data.image[i])
                }
                this.title = data.title
                document.title = data.title
                if(data.user.head_image){
                  this.userImg = data.user.headimage?data.user.headimage.domain + data.user.headimage.themb_url:'../../../static/img/static/user.png'
                }else{
                  this.userImg = '../../../static/img/static/user.png'
                }
                this.userintroduce = data.introduce
                this.content = data.descripte
                this.attation = data.activ_notice
                this.goPlace = data.go_place
                this.is_volunteen = data.is_volunteen
                this.activ_bring = data.activ_bring
                this.province = data.province+' ' +data.city+' '+ data.region
                this.jionDress = [data.set_address_lng,data.set_address_lat]
                this.total_time = data.total_time
                this.userName =data.user.name
                this.activ_provite = data.activ_provite
                this.main_language = this.language[data.main_laguage].label
                this.score = parseInt(data.score)
                this.return_policy = this.policy[data.return_policy].label
                this.return_DL = data.return_policy
                this.return_content = data.return_content
                this.age_limit = data.age_limit
                this.userId = data.user.user_id
                this.set_address = data.set_address
                this.best_descripte = data.best_descripte
                this.best_introduce = data.best_introduce
                this.price = data.price
                this.is_combine = data.is_combine
                if(data.volun_laguage){
                  var a = []
                  for(let m = 0;m<data.volun_laguage.split(',').length;m++){
                    a.push(parseInt(data.volun_laguage.split(',')[m]))
                  }
                  this.needLanguage = a
                }
                if(data.other_laguage){
                  var a = []
                  for(let m = 0;m<data.other_laguage.split(',').length;m++){
                    a.push(parseInt(data.other_laguage.split(',')[m]))
                  }
                  this.other_laguage = a
                }
                this.volun_require =  data.volun_require
                if(data.issatay == 2){
                  this.long_day = '1'
                  // this.houseImage = data.houseimage
                  this.isflag = false
                }else if(data.issatay == 1){
                  this.isflag = true
                  this.long_day = '2'
                  // var a = []
                  // for(let i=0;i<data.house.length;i++){
                  //   a.push({img:data.house[i].image,flag:data.house[i].flag})
                  // }
                  // this.houseImage = a
                }else{
                  this.long_day = ''
                }
                // if(data.long_day == 1){
                //   if(data.slot.length){
                //     let a = []
                //     for(let i= 0;i<data.slot.length;i++ ){
                //       var b = []
                //       for(let j =0;j<data.slot[i].list.length;j++){
                //         if(data.slot[i].list[j].personNum > data.slot[i].list[j].order_person_num && data.slot[i].list[j].status == 0){
                //           b.push(data.slot[i].list[j])
                //         }
                //       }
                //       if(b.length){
                //         a.push({day:data.slot[i].day,list:b})
                //       }
                //     }
                //     this.dayList = a
                //     if(this.dayList.length){
                //       this.orderNum =this.dayList[0].list[0].personNum
                //     }
                //     this.weekDay = this.getWeekDay(data.slot[0].day)
                //   }
                // }else{
                //   if(data.slot.length){
                //     for(let i =0;i<data.slot.length;i++){
                //       if(data.slot[i].status == 0 && data.slot[i].max_person_num> data.slot[i].order_person_num){
                //         this.activeList.push({
                //           beginTime:data.slot[i].begin_date,
                //           endTime: data.slot[i].end_date,
                //           begin_time: data.slot[i].begin_time,
                //           end_time: data.slot[i].end_time,
                //           active_id: data.slot[i].activity_id,
                //           max_person_num: data.slot[i].max_person_num,
                //           order_person_num: data.slot[i].order_person_num,
                //           price: data.slot[i].price,
                //           slot_id: data.slot[i].slot_id,
                //         })
                //       }
                //     }
                //     if(this.activeList.length){
                //       this.orderNum = this.activeList[0].max_person_num
                //     }
                //   }
                // }
                this.is_collection = data.is_collection
                if(localStorage.getItem('isLogin')){
                  if(data.is_order || this.userId == this.isOwer){
                    this.isLogin = true
                  }else{
                    this.isLogin = false
                  }
                }else{
                  this.isLogin = false
                }
                this.isLoading = false
               
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getParams()
              }else if(res.data.code == 0 ){
                alert(res.data.msg)
              }
            })
        },
        getRevie(){
          this.$http.post(this.api + '/home/Comment/collegroup_list',{
              token: localStorage.getItem('token'),
              table_id: this.routerParams,
              flag: 1
            })
              .then(res=>{
                if(res.data.code == 1){
                this.wishList = res.data.data
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.getRevie()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              }) 
        },
        like(){
          if(localStorage.getItem('isLogin')){
            this.isLike = !this.isLike
            this.getRevie()
          }else{
            this.$message({
              type: 'error',
              message: '您还没有登陆！'
            })
          }
        },
        closeWish(){
          this.isLike = false
        },
        share(){
          this.isShare = !this.isShare
        },
        closeShare(){
          this.isShare = false
        },
        openInform(item,b){
          if(b == 1){
            localStorage.setItem('comment_id',item.comment_id)
          }else{
            this.saveInfor = true
            localStorage.setItem('comment_id',item.msg_id)
          }
          this.isInform = true
          this.getInform()
        },
        changeForm(){
          this.changeReason = false
        },
        informSend(){
          if(this.informReason.text.trim().length <= 0){
            this.$message({
              type:'error',
              message: '请填写您的理由'
            })
          }else{
            this.$http.post(this.api + '/ReportU',{
              token: localStorage.getItem('token'),
              flag: 2,
              table_id: localStorage.getItem('comment_id'),
              content: this.informReason.text
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.isInform = false
                  this.informReason.text = ''
                  this.changeReason = true
                  this.$message({
                    type:'success',
                    message:'提交成功'
                  })
                  localStorage.removeItem('comment_id')
                  this.getComment(this.pager)
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.informSend()
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        informAblish(){
          this.changeReason = true
        },
        closeInform(item){
          if(item){
            let flag = ''
            if(this.saveInfor){
              flag = 4
            }else{
              flag = 2
            }
            this.$http.post(this.api + '/ReportU',{
              token: localStorage.getItem('token'),
              flag: flag,
              table_id: localStorage.getItem('comment_id'),
              option_id: item.option_id
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.isInform = false
                  localStorage.removeItem('comment_id')
                  this.getComment(this.pager)
                  this.$message({
                    type:'success',
                    message: '您已举报成功！'
                  })
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.closeInform(item)
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.isInform = false
            localStorage.removeItem('comment_id')
          }

        },
        leaveTalk(a,b){
          if(a.user_id == this.isOwer){
            this.$http.post(this.api + '/home/Comment/del_leavemsg',{
              token: localStorage.getItem('token'),
              msg_id: a.msg_id
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message:'删除评论成功！'
                  })
                  this.getComment(this.pager)
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.leaveTalk(a,b)
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.NowChat = true
            this.replay = '回复给' + a.user.name
            localStorage.setItem('comment_id',a.msg_id)
            this.saveLeave = true
          }
        },
        talk(a,b){
          if(a.user_id == this.isOwer){
            this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post(this.api + '/home/Comment/del_comment',{
                token: localStorage.getItem('token'),
                comment_id: a.comment_id
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.personList.splice(b,1)
                    this.$message({
                      type: 'success',
                      message:'删除评论成功！'
                    })
                  }else if(res.data.code == 3 || res.data.code == 4){
                    this.talk(a,b)
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else{
            this.NowChat = true
            this.replay = '回复给' + a.user.name
            localStorage.setItem('table_id',this.personList[b].table_id)
            localStorage.setItem('comment_id',a.comment_id)
          }
        },
        toPerson(item){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item
            }
          })
        },
        toPersonA(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.user.user_id
            }
          })
        },
        getWeekDay(str){
          var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          var myDate = new Date(Date.parse(str));
          return weekDay[myDate.getDay()]
        },
        save(item,index){
          if(item.is_this_colle == 1){
            this.$http.post(this.api + '/home/Comment/collection',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: this.routerParams,
              group_id: item.group_id,
              type: 2
            })
              .then(res=>{
                if(res.data.code == 1){
                  let a=[]
                  item.is_this_colle = 0
                  for(let i =0;i<this.wishList.length;i++){
                    if(this.wishList[i].is_this_colle == 0){
                      a.push(i)
                      if(a.length == this.wishList.length){
                        this.is_collection = 0
                      }
                    }
                  }
                }else if(res.data.code == 3 || res.data.code == 4){
                  this.save(item,index)
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Comment/collection',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: this.routerParams,
              group_id: item.group_id,
              type: 1
            })
              .then(res=>{
                if(res.data.code == 1){
                  item.is_this_colle = 1
                  this.is_collection = 1
                }else if(res.data.code == 1){
                  this.$http.post(this.api + '/home/Index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.save(item,index)
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        addwish(){
          if(this.wishIndex == 0){
            this.newWish = true
            this.wishIndex = -1
          }else{
            this.newWish = false
            this.wishIndex = 0
          }
        },
        getComment(val){
          this.$http.post(this.api + '/home/Comment/comment_list',{
            token: localStorage.getItem('token'),
            table_id:this.routerParams,
            flag: 1,
            order: 1,
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                data.forEach((item,index)=>{
                  this.personList.push(item)
                })
                
                this.total =  res.data.data.total
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getComment(val)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        parise(a,b){
          let table_id = ''
          let flag = ''
          let type=''
          if(b == 1){
            table_id = a.comment_id
            flag = 3
          }else{
            table_id = a.msg_id
            flag = 4
          }
          if(a.is_praise){
            type = 2
          }else{
            type = 1
          }
          this.$http.post(this.api + '/home/Comment/praise',{
            token: localStorage.getItem('token'),
            flag: flag,
            table_id: table_id,
            type: type
          })
            .then(res=>{
              if(res.data.code == 1){
                a.is_praise = type == 2? 0 : 1
                a.praise_num = type == 2? a.praise_num - 1 : a.praise_num +1
                this.$message({
                  type:'success',
                  message: '点赞成功！'
                })
              }else if(res.data.code == 3 || res.data.code == 4){
                this.parise(a,b)
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        getInform(){
          this.$http.post(this.api + '/home/Activity/question',{
            token: localStorage.getItem('token'),
            flag: 6
          })
            .then(res=>{
              if(res.data.code == 1){
                this.informList = []
               for(let i = 0;i<res.data.data[0].option.length;i++){
                 let a = res.data.data[0].option[i].name.split('/')
                 this.informList.push({name: a[0],content:a[1],option_id:res.data.data[0].option[i].option_id})
               }
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getInform()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        //查看相似体验
        getActls(){
          this.$http.post(this.api + '/actls',{
            token: localStorage.getItem('token'),
            activity_id: this.routerParams
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                this.listA = data
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getActls()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        reload(res){
          if(res){
            let data = res.data.data
            this.isOwer = res.data.data.user_id
            this.isvolunteer = res.data.data.isvolunteer
            if(data.audit_idcard){
              this.isChoose = true
            }else{
              this.isChoose = false
            }
          }
        },
        getOwers(){
          this.$http.post(this.api + '/home/User/get_user',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data[0]
                this.isOwer = data.user_id
                this.isvolunteer = data.isvolunteer
                if(data.audit_idcard){
                  this.isChoose = true
                }else{
                  this.isChoose = false
                }
              }else if(res.data.code == 3 || res.data.code == 4){
                this.getOwers()
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toPublish(item){
          this.$router.push({
            path: '/publishPage',
            query: {
              information: item.activity_id
            }
          })
        }
      },
      // destroyed() {
      //   window.removeEventListener('scroll',this.ScrollContent)
      // },
    }
</script>

<style scoped>

.transition-tiyan{
  position:fixed;
  left: 50%;
  top:50%;
  width: 440px;
  height:460px;
  margin-top: -240px;
  margin-left: -220px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding:10px 0;
  overflow:hidden;
  text-align: left;
}
.transition-content{
  width:417px;
  height:420px;
  padding:0 20px;
  overflow-y:scroll;
}
.prev{
  position:absolute;
  z-index:1;
  left:0;
  top: 100px;
}
.next{
  position:absolute;
  z-index:3;
  right:0;
  top:100px;
}
.content{
  margin: 40px auto 110px;
  width: 80%;
  font-size: 16px !important
}
.hidden{
  overflow:hidden;
  border-radius:10px;
}
.contentImg{
  width:1080px;
  overflow: hidden;
  margin: 0 auto;
}
.top_img2{
  display: flex;
  justify-content: space-between;
}
.top_img4_1{
  display: flex;
  justify-content: space-between;
}
.top_img4_2{
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-left:6px
}
.firstCOntent{
  width:248px;
  text-align: left;
}
.firstWidth{
  
  padding-right: 144px;
  padding-top: 87px;
}
.secendWidth{
  width:75%;
  text-align: left;
}
.line{
margin: 52px 0;
border:none;
border-top:1px solid #F3F5FA;
}
</style>
