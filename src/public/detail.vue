<template>
	<div class="detail">
		<div>
			<a :href="pubLish" onclick="return false" style="color:#000;text-decoration: none"  target="_blank">
				<div class="detail_img" v-if="type=='1'" @click="toPublish">
					<loadingImg  type="2" :src="imgUrl" style="width:100%;height:100%"></loadingImg>
				</div>
				<div class="detail_top" v-if="type=='1'">
					<p><span v-for="items in kind">{{'/'+items.kind_name}}</span><span><b>·</b>{{city}}</span></p>
					<p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;font-size:14px;margin:5px 0;"><b>{{name}}</b></p>
					<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><b><span>{{language[english].label+'·'}}</span><span v-if="money">{{'每人￥'+money+'·'}}</span><span v-if="total_time">{{total_time+'·'}}</span><span>{{activ_provite}}</span></b></div>
					<p style="margin-top:5px;display: flex;justify-content: flex-start"><el-rate
					:value="parseFloat(score)"
					disabled
					show-score
					text-color="#008489"
					:colors="['#008489', '#008489', '#008489']"
					score-template="{value}">
					</el-rate>
					<span style="margin-left:15px;">评论({{comment_num}})</span>
					</p>
				</div>
			</a>
			<div class=" wonderful_img" v-if="type=='2'"  style="overflow: hidden;cursor: pointer" @click="toStory">
				<img :src="storyImg" width="260px" height="250px">
				<div style="color:#000;">故事</div>
			</div>
		</div>
		<div v-if="type == 'active'">
			<a :href="pubLish" onclick="return false" style="color:#000;text-decoration: none"  target="_blank">
				<loadingImg  class="detail_img" type="2" :src="activeData.domain+activeData.image_url" ></loadingImg>
				<p>四川成都</p>
				
			</a>
		</div>
		<div v-if="type=='2'" style="position:absolute; width:15px;height:15px;margin-top:-240px;margin-left:215px" @click="addZan">
			<i class="iconfont icon-zan" style="font-size:25px;" :style="{'color': zanIndex == 0? '#fff':'#008489'}"></i></div>
			<div v-if="type=='2'" style="margin-top: 10px;text-align: left;display: flex;justify-content: space-between;">
				<p class="fontweight">{{address}}</p>
				<p style="width: 150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: right">{{remark}}</p>
			</div>
			<div v-if="type=='2'" class="about_wonderful">
				<div @click="toperson" class="wonderful_avator" :style="{backgroundImage:avator?'url('+avator+')':'url('+userImg+')',backgroundSize:'100% 100%'}">
				</div>
				<div style="margin-left: 15px;display: flex;justify-content: flex-start;height: 16px;margin-top: 7px;color: #008489;font-size: 12px;line-height: 16px;">
					<p><img src="../../static/img/home/zans.png" /><p>
					<p style="margin-top: 2px;margin-left: 3px;">{{zan}}</p>
				</div>
				
				<div style="margin-left: 15px;display: flex;justify-content: flex-start;height: 16px;margin-top: 7px;color: #008489;font-size: 12px;line-height: 16px;">
					<p><img src="../../static/img/home/talk.png" /><p>
					<p style="margin-top: 2px;margin-left: 3px;">{{say}}</p>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
  import test from '../../static/js/language'
  import '../../static/css/zan/iconfont.css'
  import loadingImg from './loadingImg'
	export default {
		props:['data','activity_id','imgUrl','name','score','english','total_time','money','activ_provite','comment_num','remark','type','status','avator','zan','say','address','zanIndex','status','kind','city'],
    data(){
		  return {
		    language:[],
        pubLish:'/publishPage?information='+ this.activity_id,
        defutImg: '../../static/img/static/defult.png',
        userImg:'../../static/img/static/user.png',
		storyImg:'../../static/img/static/defult.png',
		activeData:''
      }
    },
    components:{
      loadingImg,
    },
    watch:{
      imgUrl:function(){
        this.change()
      }
    },
    methods:{
      toPublish(){
        this.$emit('toPublish')
      },
      toStory(){
		    this.$emit('toStory')
      },
      addZan(){
        this.$emit('addZan')
      },
      toperson(){
        this.$emit('toperson')
      },
      change(){
        if(this.type == 2){
          var newImg = new Image();
          newImg.src = this.imgUrl;
          var maxWidth = 260
          var maxHeight = 250
          if (newImg.width < maxWidth && newImg.height < maxHeight) {
            newImg.width = maxWidth
            newImg.height = maxHeight
          }
          else //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
          {
            if (maxWidth/ maxHeight  <= newImg.width / newImg.height) //原图片宽高比例 大于 图片框宽高比例
            {
              newImg.width = maxWidth ;   //以框的宽度为标准
              newImg.height = maxWidth* (newImg.height / newImg.width) ;
            }
            else {   //原图片宽高比例 小于 图片框宽高比例
              newImg.width = maxHeight  * (newImg.width / newImg.height) ;
              newImg.height = maxHeight ;   //以框的高度为标准
            }
          }
          newImg.onerror = () => {    // 图片加载错误时的替换图片
            newImg.src = this.storyImg;
          };
          newImg.onload = () => { // 图片加载成功后把地址给原来的img
            this.storyImg = newImg.src
          }
        }
      }
    },
    mounted(){
		  this.change()
		  this.activeData = this.data
    },
	created(){
		this.language = test()
		
	},
	}
</script>

<style>
	.detail{
		width: 100%;
	}
	.detail_img{
		width:330px;
		height:200px;
		overflow: hidden;
		cursor: pointer;
	}
	.detail_img img{
		width: 100%;
		height: 200px;
	}
	.detail_top{
    text-align: left;
		margin-top: 10px;
		font-size: 14px;
	}
	.detail_remark{
		font-size: 14px;
		margin-top: 10px;
		line-height: 22px;
		text-align: left;
	}
	.detail_btn{
		margin-top: 10px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
	}
	.detail_btn div{
		width: 80px;
		height:30px;
		border: 1px solid #008489;
		border-radius: 5px;
		line-height: 30px;
		color: #008489;
		cursor: pointer;
	}
	.wonderful_img{
		position: relative;
		height: 250px;
		border-radius: 10px;
	}
	.wonderful_img>div{
		width:50px;
		height: 30px;
		background-color: white;
		color: #008489;
		border-radius: 5px;
		position: absolute;
		right: 15px;
		bottom: 15px;
		line-height: 30px;
	}
	.about_wonderful{
		margin-top: 10px;
		display: flex;
		justify-content: flex-start;
		height: 30px;
	}
	.wonderful_avator{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>
