<template>
    <div>
      <div style="background-color: #eee;">
        <Head type="viewExperience"></Head>
        <el-carousel :interval="4000" type="card" height="500px">
          <el-carousel-item v-for="item in imgList" >
            <img :src="item.dialogImageUrl" width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
        <div style="width:1080px;margin: 0 auto;text-align: left;">
          <div style="display: flex;justify-content: space-between">
            <div style="width:280px;margin-top:20px;min-width:300px;border:1px solid #eee;padding:20px;border-radius:10px;background-color: white;">
              <el-badge :value="num" class="item">
                <h2 style="margin-bottom:20px;">住宿申请</h2>
              </el-badge>
              <div v-for="(item,index) in houseApply"  style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
                <div style="display: flex;justify-content: flex-start">
                  <div style="">
                    <img :src="item.imgUrl" width="48px" height="48px" style="border-radius: 50%;cursor: pointer;" @click="toPerson">
                  </div>
                  <div style="line-height:48px;margin-left:10px;">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div style="line-height:48px;">
                  <el-button type="primary" plain>接受</el-button>
                  <el-button type="primary" plain>拒绝</el-button>
                </div>
              </div>

              <el-badge :value="num" class="item">
                <h2 style="margin-bottom:20px;">志愿者申请</h2>
              </el-badge>
              <div v-for="(item,index) in volunteerApply"  style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
                <div style="display: flex;justify-content: flex-start">
                  <div style="">
                    <img :src="item.imgUrl" width="48px" height="48px" style="border-radius: 50%;cursor: pointer" @click="toPerson">
                  </div>
                  <div style="line-height:48px;margin-left:10px;">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div style="line-height:48px;">
                  <el-button type="primary" plain>接受</el-button>
                  <el-button type="primary" plain>拒绝</el-button>
                </div>
              </div>
              <el-badge :value="num" class="item">
                <h2 style="margin-bottom:20px;">预定列表</h2>
              </el-badge>
              <div v-for="(item,index) in Apply"  style="display: flex;justify-content: space-between;padding:10px 0;border-bottom:1px solid #eee;">
                <div style="display: flex;justify-content: flex-start">
                  <div style="">
                    <img :src="item.imgUrl" width="48px" height="48px" style="border-radius: 50%;cursor: pointer" @click="toPerson">
                  </div>
                  <div style="line-height:48px;margin-left:10px;">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div style="line-height:48px;font-size:14px;">
                  <span v-if="item.type == 1" style="padding:5px 10px;background-color:#00777b;color:#fff;border-radius: 5px;">志愿者</span>
                  <span v-if="item.type == 0" style="padding:5px 10px;background-color:#00777b;color:#fff;border-radius: 5px;">旅客</span>
                  <span v-if="item.stay == 1" style="padding:5px 10px;background-color:#00777b;color:#fff;border-radius: 5px;">住宿</span>
                </div>
              </div>
            </div>
            <div style="width:700px;margin-left:20px;margin-top:20px;border:1px solid #eee;padding:20px;border-radius: 10px;background-color: white" >
              <h2 style="margin-bottom:20px;">活动详情</h2>
              <el-form label-position="left" label-width="80px" :model="active" >
                <el-form-item label="名称">
                  <el-input v-model="active.name"  ></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-cascader :props="props" :options="options"  v-model="active.typeVal" filterable clearable ></el-cascader>
                </el-form-item>
                <el-form-item label="主要语言">
                  <el-select v-model="active.language" placeholder="请选择" >
                    <el-option
                      v-for="item in languages"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他语言">
                  <el-select v-model="active.otherlanguage" placeholder="请选择" >
                    <el-option
                      v-for="item in languages"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="自我介绍">
                  <el-input type="textarea" v-model="active.introduce"  readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="体验内容">
                  <el-input type="textarea" v-model="active.descripte" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="我会提供">
                  <el-input type="textarea" v-model="active.activ_provite"  readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="旅客自带">
                  <el-input type="textarea" v-model="active.activ_bring"  readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="封面照片">
                    <img v-if="active.cover_image" :src="active.cover_image"  class="avatar">
                </el-form-item>
                <el-form-item label="照片或视频" v-if="videoList.length >0">
                  <div v-if="videoList" style="display: flex;flex-wrap: wrap;margin:20px 0;">
                    <div v-for="(item,index) in videoList" :key="index"  style="width:150px;margin-right:20px;position: relative">
                      <div @click="deletVideo(item,index)" style="position:absolute;right:10px;top:10px;width:20px;height:20px;cursor: pointer;z-index:1">
                        <i class="el-icon-delete" style="color:white;font-size:20px"></i>
                      </div>
                      <video :src="item.videoUrl" width="150px" controls="controls"></video>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="体验地点">
                  <el-input type="text" v-model="active.address"  readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="集合地点">
                  <el-input type="text" placeholder="集合地点" v-model="active.aboutMe" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="旅游路线">
                  <el-input type="textarea" placeholder="旅游路线" v-model="active.goPlace" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-collapse >
                    <el-collapse-item :title="item.time" v-for="(item,index) in active.time" :name="index">
                      <div>{{item.price}}</div>
                    </el-collapse-item>
                  </el-collapse>
                </el-form-item>
                <el-form-item label="活动人数">
                  <el-input type="text" placeholder="活动人数" v-model="active.person" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="退订政策">
                  <el-input type="text" placeholder="退订政策" v-model="active.return_policy" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="退订内容" v-show="active.return_content">
                  <el-input type="text" placeholder="退订内容" v-model="active.return_content" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="年龄限制">
                  <el-input type="text" v-model="active.age_limit" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="注意事项">
                  <el-input type="textarea" v-model="active.activ_notice" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="预定设置">
                  <el-input type="text" v-model="active.end_order" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="无人取消">
                  <el-input type="text" v-model="active.no_order" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="体验包场">
                  <el-input type="text" v-model="active.book_whole" readonly="readonly"></el-input>
                </el-form-item>
              </el-form>
              <p></p>
            </div>
          </div>
          <div style="width:350px;border:1px solid #eee;margin-top:5px;height:auto">
            <h2>志愿者翻译</h2>
          </div>
        </div>
       <div></div>
      </div>

    </div>
</template>

<script>
  import City from '../../public/newCity.vue'
  import Head from '../../public/head'
    export default {
        name: "viewExperience",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            houseApply:[
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
            ],
            volunteerApply:[
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha'},
            ],
            Apply:[
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:1,stay:1},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:0,stay:0},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:1,stay:0},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:0,stay:1},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:1,stay:1},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:0,stay:0},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:0,stay:1},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:1,stay:0},
              {imgUrl: '../../../static/img/home/1.jpg',name: 'haha',type:1,stay:1},
            ],
            num:5,
            active:{
              name:'',
              type:'',
              typeVal:[],
              otherlanguage:'',
              language:'',
              introduce:'',
              descripte:'',
              activ_provite:'',
              activ_bring:'',
              cover_image:'',
              image:'',
              address:'',
              aboutMe:'',
              goPlace:'',
              time:[],
              person:'',
              return_policy:'',
              return_content:'',
              age_limit:'',
              activ_notice:'',
              end_order:'',
              no_order:'',
              book_whole:''
            },
            country:[],
            province:[],
            city:[],
            xian:[],
            videoList:[],
            imgList:[],
            options:[],
            props: {
              value: 'kind_id',
              label: 'kind_name',
            },
            languages: [{
              value: 0,
              label: '中文'
            }, {
              value: 1,
              label: '英文'
            }, {
              value: 2,
              label: '日文'
            }],
            currency:[
              {value:0,label:'￥'},
              {value:1,label:'$'},
              {value:2,label:'J.￥ '}
            ],
            tuiDing: [
              {value: 0, label: '随时退款 '},
              {value: 1, label: '24小时前'},
              {value: 2, label: '7天前'}
            ],
            orderList:[
              {value:0,label:'体验开始时'},
              {value:3600,label:'体验开始1个小时前'},
              {value:7200,label:'体验开始2个小时前'},
              {value:10800,label:'体验开始3个小时前'},
              {value:14400,label:'体验开始4个小时前'},
              {value:28800,label:'体验开始8个小时前'},
              {value:43200,label:'体验开始12个小时前'},
              {value:86400,label:'体验开始1天前'},
              {value:172800,label:'体验开始2天前'},
              {value:259200,label:'体验开始3天前'},
              {value:345600,label:'体验开始4天前'},
              {value:432000,label:'体验开始5天前'},
              {value:518400,label:'体验开始6天前'},
              {value:604800,label:'体验开始一周前'},
            ],
            cancelList:[
              {value:0,label:'体验开始时'},
              {value:172800,label:'体验开始2天前'},
              {value:259200,label:'体验开始3天前'},
              {value:345600,label:'体验开始4天前'},
              {value:432000,label:'体验开始5天前'},
              {value:518400,label:'体验开始6天前'},
              {value:604800,label:'体验开始1周前'},
            ]
          }
      },
      components:{
          Head,
        City
      },
      methods:{
        toPerson(){
          this.$router.push('/userdata')
        },
      },
      mounted() {
          let _this = this
        this.$http.post(_this.api + '/home/Kind/kindlist',{
          token: localStorage.getItem('token'),
        })
          .then(res=>{
            if(res.data.code == 1){
              let b = []
             for(let i in res.data.data){
                _this.options.push(res.data.data[i])
             }
            }else if(res.data.code == 3){

            }else{

            }
          })
        this.$http.post(_this.api + '/home/Activity/get_activity',{
          token: localStorage.getItem('token'),
          activity_id: 3,
          visit:0
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              _this.active.name = data.title
              _this.active.typeVal = data.kindpath
              _this.active.language = data.main_laguage
              _this.active.otherlanguage = data.other_laguage
              _this.active.introduce = data.introduce
              _this.active.descripte = data.descripte
              _this.active.activ_provite = data.activ_provite
              if(data.activ_bring){
                _this.active.activ_bring = data.activ_bring
              }else{
                _this.active.activ_bring = '参与者不需要带任何东西'
              }
              _this.active.cover_image = data.cover.domain + data.cover.image_url
              for(let i = 0;i<data.image.length;i++){
                if(data.image[i].extension == 'mp4'||data.image[i].extension =='rmvb'||data.image[i].extension == 'avi'||data.image[i].extension == '3GP'||data.image[i].extension == 'wmv'||data.image[i].extension == 'rm'){
                  _this.videoList.push({videoUrl:data.image[i].domain + data.image[i].image_url,image_Id:data.image[i].image_id})
                }else{
                  _this.imgList.push({dialogImageUrl:data.image[i].domain + data.image[i].image_url,image_Id:data.image[i].image_id})
                }
              }
              _this.country.push(data.country_id,data.country)
              _this.province.push(data.province_id,data.province)
              _this.city.push(data.city_id,data.city)
              _this.xian.push(data.region_id,data.region)
              _this.active.address =  _this.country[1]+'  '+ _this.province[1]+'省'+_this.city[1]+_this.xian[1]
              _this.active.aboutMe = data.set_address
              _this.active.goPlace = data.go_place
              _this.active.time.push({time:data.activ_begin_time + '——' + data.activ_end_time,price:_this.currency[data.currency].label + data.price})
              _this.active.person = data.max_person_num
              _this.active.return_policy = _this.tuiDing[data.return_policy].label
              _this.active.return_content = data.return_content
              _this.active.age_limit = data.age_limit
              _this.active.activ_notice = data.activ_notice
              for(let i = 0;i< _this.orderList.length;i++){
                if(_this.orderList[i].value == data.end_order){
                  _this.active.end_order = _this.orderList[i].label
                }
              }
              if(data.no_order == 1){
                for(let i = 0; i<_this.cancelList.length;i++){
                  if(_this.cancelList[i].value == data.no_end_order){
                    _this.active.no_order = _this.cancelList[i].label
                  }
                }
              }else{
                _this.active.no_order = '不用了'
              }
              if(data.book_whole == 1){
                _this.active.book_whole = _this.currency[data.currency].label + data.low_price
              }else{
                _this.active.book_whole = '不可以'
              }

            }else if(res.data.code == 3){
              this.$alert(res.data.msg)
            }else{
              this.$alert(res.data.msg)
            }
          })
          .catch(error=>{
            alert(error)
          })
      }
    }
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
