<template>
	<div class="detail">
		<div>
			<a :href="pubLish" onclick="return false" style="color:#000;text-decoration: none"  target="_blank">
				<div class="detail_img" v-if="type=='1'" @click="toPublish" >
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
			
		</div>
		<div v-if="type == 'active'" style="width:330px;">
			<a :href="pubLish" class="fontweight" onclick="return false" style="text-align:left;color:#000;text-decoration: none;font-size:14px;"  target="_blank">
				<loadingImg  @toPublish="toPublish" class="detail_img" type="2" :src="data.domain + data.image_url?data.domain + data.image_url:''" ></loadingImg>
				<div style="margin: 15px 0;">
					<p>{{data.city}}</p>
					<p class="hiddenText" style="font-size:17px;margin-top: 4px;">{{data.title}}</p>
				</div>
				<div class="flexStart">
					<div class="delong" v-show="data.is_discount || Number(minDis)">{{Number(minDis)}}折</div>
					<div :class="[data.is_discount?'delong':'delongT']" v-show="data.is_differ" >返差价</div>
					<div class="delong" v-show="data.is_combine">套餐</div>
				</div>
				<div style="margin-top: 13px;">
					<i class="el-icon-star-on" :style="{color:Number( data.score)?'#14C5CA':'#CACBCB'}"></i>
					{{Number( data.score)?data.score:'暂无评星'}}<span style="margin-left:18px;color:#666666">{{data.comment_num?data.comment_num:'暂无'}}评论</span>
				</div>
				<div style="margin-top:14px;">{{data.price?'￥'+data.price+'/人起':''}}</div>
				
			</a>
		</div>
		<div v-if="type == 'mapActive'" class="flexStart">
			<div>
              <loadingImg type="2" :src="data.domain + data.image_url?data.domain + data.image_url:''" style="width:300px;height:200px;border-radius:10px;overflow:hidden"></loadingImg>
            </div>
            <div style="display:flex;justify-content:space-between;width:100%;padding: 10px;font-size:14px;font-weight:bold">
              <div style="width:70%;line-height: 40px;padding: 0 5px;border-right: 1px solid #eee">
                <div style="margin: 0 0;">
					<p>{{data.city}}</p>
					<p class="hiddenText" style="font-size:15px;margin-top: 4px;">{{data.title}}</p>
				</div>
				<div class="flexStart">
					<div class="delong" v-show="data.is_discount || Number(minDis)">{{Number(minDis)}}折</div>
					<div :class="[data.is_discount?'delong':'delongT']" v-show="data.is_differ" >返差价</div>
					<div class="delong" v-show="data.is_combine">套餐</div>
				</div>
				<div style="margin-top: 13px;">
					<i class="el-icon-star-on" :style="{color:Number( data.score)?'#14C5CA':'#CACBCB'}"></i>
					{{Number( data.score)?data.score:'暂无评星'}}<span style="margin-left:18px;color:#666666">{{data.comment_num?data.comment_num:'暂无'}}评论</span>
				</div>
		
              </div>
                <div style="width:20%;text-align:center;line-height:200px">
                  <div>
                    <h4 :style="{color:data.price?'black':'red'}">{{data.price? data.price + '/人起':'已过期'}}</h4>
                  </div>
                  <!-- <div >
                    <loadingImg type="user" :src="data.user.head_image?data.user.headimage.domain + data.user.headimage.image_url:'' " style="margin-top: 80px;width:30px;height: 30px;"></loadingImg>
                  </div> -->
                </div>  
            </div>
		</div>

		<div v-if="type == '2'" style="width:250px;">
			<loadingImg type="2" @toPublish="toStory" :src="data.cover_image?data.cover.domain+data.cover.image_url:''" style="width:250px;height:280px;"></loadingImg>
			<p class="hiddenText" style="margin-top:15px;font-size:18px;color:#333333;font-weight:bold;text-align:left;">{{data.title}}</p>
			<div  class="about_wonderful">
				<loadingImg @toPublish="toperson" type="user" :src="data.user.head_image?data.user.headimage.domain + data.user.headimage.image_url:''" style="width:30px;height:30px;"></loadingImg>
				<div class="flexStart marginLeft" style="height: 16px;margin-top: 7px;color: #008489;font-size: 12px;line-height: 16px;">
					<p><i class="iconfont icon-zan" @click="addZan" style="font-size:16px;" :style="{'color': data.is_praise == 0? '#B9B9B9':'#14C5CA'}"></i>
					<p>
					<p style="margin-top: 2px;margin-left: 3px;">{{data.praise_num}}</p>
				</div>
				
				<div class="flexStart marginLeft" style="height: 16px;margin-top: 7px;color: #008489;font-size: 12px;line-height: 16px;">
					<div>
						<div style="width:16px;height:16px;background-color:#B9B9B9;border-radius:50%;line-hieght:16px;text-align:center">
							<i style="color:#fff;font-size:12px;" class="el-icon-more-outline"></i>
						</div>
					</div>
					<div style="margin-top: 2px;margin-left: 3px;">{{data.leaving_num}}</div>
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
        pubLish:'',
        defutImg: '../../static/img/static/defult.png',
        userImg:'../../static/img/static/user.png',
		storyImg:'../../static/img/static/defult.png',
		minDis:'',
		
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
	  chengeActive(){
		  if(this.data.activity_id){
			
			  this.pubLish = '/publishPage?information=' + this.data.activity_id
		  }else{
			  this.pubLish = '/publishPage?information=' + this.data.table_id
		  }
	  },
      change(){
		  if(this.type  == 'active'){
			 let data = this.data
			 if(data.is_discount){
				var arr =  data.price_discount_concat.split(',')
				var val = []
				for(var i = 0; i< arr.length;i++){
					if(arr[i]){
						val.push(arr[i])
					}
				}
				if(val.length>1){
				 this.getMinDis(val)
				}else{
				 this.minDis = val[0]
				}
			}
		  }
        // if(this.type == 2){
        //   var newImg = new Image();
        //   newImg.src = this.imgUrl;
        //   var maxWidth = 260
        //   var maxHeight = 250
        //   if (newImg.width < maxWidth && newImg.height < maxHeight) {
        //     newImg.width = maxWidth
        //     newImg.height = maxHeight
        //   }
        //   else //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
        //   {
        //     if (maxWidth/ maxHeight  <= newImg.width / newImg.height) //原图片宽高比例 大于 图片框宽高比例
        //     {
        //       newImg.width = maxWidth ;   //以框的宽度为标准
        //       newImg.height = maxWidth* (newImg.height / newImg.width) ;
        //     }
        //     else {   //原图片宽高比例 小于 图片框宽高比例
        //       newImg.width = maxHeight  * (newImg.width / newImg.height) ;
        //       newImg.height = maxHeight ;   //以框的高度为标准
        //     }
        //   }
        //   newImg.onerror = () => {    // 图片加载错误时的替换图片
        //     newImg.src = this.storyImg;
        //   };
        //   newImg.onload = () => { // 图片加载成功后把地址给原来的img
        //     this.storyImg = newImg.src
        //   }
        // }
	  },
	  getMinDis(val){
		  var arr = val
		 var min = Math.min.apply(Math,arr)
		 this.minDis = min
	  }
    },
    mounted(){
		this.change()
		this.chengeActive()
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
		height: 280px;
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
	.delong{
		width:60px;
		height:29px;
		line-height:29px;
		text-align:center;
		margin-right: 12px;
		background:rgba(245,247,250,1);
	}
	.delongT{
		width:60px;
		height:29px;
		line-height:29px;
		text-align:center;
		background:rgba(245,247,250,1);
		margin-right:12px;
	}

	.delong:nth-child(3n-2){
		background-color: #E6FEFF;
	}
</style>
