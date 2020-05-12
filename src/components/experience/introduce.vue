<template>
	<div class="exp_con">
		<p class="title">介绍您自己</p>
		<p class="language_txt">向大家展示您的过往经历，以及您为什么热爱和了解这个主题，证明自己是开展该体验的不二人选。</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div>
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 突出您拥有的和体验相关的专业资质</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 说说您从事这项活动有多少年了</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 告诉大家您为什么热衷于组织这项活动</p>
				</div>
				<div>
					<p class="fontweight">不建议</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 围绕您新学的或了解不深的东西开展体验，因为参与者想找的是具备相关经验的达人</p>
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
		<p class="fontweight main_language">向大家介绍一下您自己以及您和这个主题之间的故事</p>
		<el-input
		  type="textarea"
		  :autosize="{ minRows: 6, maxRows: 6}"
		  placeholder="这是展现自我的时刻!不用谦虚"
		  v-model="aboutMe"
		  style="margin-top: 20px;">
		</el-input>
		<p class="fontweight main_language">请介绍一下你自己</p>
		<div class="aboutme_choice" v-for="(item,index) in questionList"  :key="index">
			<p class="fontweight">{{item.title}}</p>
			<el-radio-group v-model="item.answer"  @change="answerAdd(item,index)">
				<p class="chioce" v-for="items in item.option">
					<el-radio :label="items.option_id">{{items.name}}</el-radio>
				</p>
			</el-radio-group>
		</div>
		<p class="main_language">如果您有围绕该主题的社交媒体账号或相关网站，如微信公众号、博客、微博，或报道您的文章，请告诉我们。</p>
		<div class="link_con">
			<el-input v-model="link_1" style="width: 50%;margin-top: 15px;" placeholder="请输入相关链接"></el-input>
			<el-input v-model="link_2" style="width: 50%;margin-top: 15px;" placeholder="请输入相关链接"></el-input>
			<el-input v-model="link_3" style="width: 50%;margin-top: 15px;" placeholder="请输入相关链接"></el-input>
		</div>
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
		</div>
		<p style="margin-top: 15px;"><span class="fontweight">注意事项:</span>参与者想找的是在相关领域有特长的体验达人，了解我们对达人<span style="color: #008489;cursor: pointer;">专业知识</span>水平的介绍</p>
	</div>
</template>

<script>

	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
        sampleList:[
          {txt:"我是Amazing Brewing Company的创始人之一，是韩国7位拥有啤酒品酒师资格认证的职业品酒师之一。 我曾在亚洲、欧洲和美国生活过，品尝过世界各地超过100家啤酒厂酿造的啤酒。"},
          {txt:'我在旧金山的亚洲艺术中心教书法。 我最近在国际书法会议上发表了关于「数字时代的书法」的演讲。 我是一名程序员，我的体验主要与技术和书法的跨界领域有关。'},
          {txt:"我辞去了私人银行业务的工作，成为了倡导环保生活方式的旅行博主。 我创办了WaterThruSkin，到世界各地旅行推广环保时尚理念、以素食为主的健康饮食习惯以及自然生态旅游。"}
        ],
        sampleIndex:0,
        leftDate:0,
        aboutMe:"",
        questionList:[],
        replay:[],
        link_1:"",
        link_2:'',
			 	link_3:"",
        complete:'',
        active_id:''
			};
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
				if(!this.aboutMe){
					this.$message({type:'info',message:'请完善您与主题的故事'})
				}else if(!this.replay){
					this.$message({type:'info',message:'请完善介绍你自己'})
				}else{
          if(this.active_id){
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
              question: this.replay,
              introduce: this.aboutMe,
              link_1: this.link_1,
              link_2: this.link_2,
              link_3: this.link_3,
              step:3
            })
              .then(res=>{
                if(res.data.code == 1){
                    if(this.complete == '0'){
                      this.$emit('changeRouter',{id:4,router:"Feel",information:this.active_id,complete: this.complete})
				  	  				}else{
                        this.$message({
                          type: 'success',
                          message:'保存成功！'
                        })
                    }
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }else{
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: '',
              question: this.replay,
              introduce: this.aboutMe,
              link_1: this.link_1,
              link_2: this.link_2,
              link_3: this.link_3,
              step:3
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId', res.data.data)
                  this.$emit('changeRouter',{id:4,router:"Feel",information: res.data.data})
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }

				}
			},
      answerAdd(item,index){
        if(!this.replay[index]){
          this.replay[index] ={question_id:item.question_id,option_id:item.answer,other:''}
        }else{
          this.replay[index] ={answer_id:this.replay[index].answer_id,question_id:item.question_id,option_id:item.answer,other:''}
        }
      },
      getQeston(){
        this.$http.post(this.api + '/home/Activity/question',{
          token:localStorage.getItem('token'),
          flag:0,
          activity_id: this.active_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.questionList =  res.data.data
            }else if(res.data.code == 3){
              this.getQeston()
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
              for(let i = 0;i< this.questionList.length;i++){
                for(let j = 0; j< res.data.data.answer.length; j++){
                  if(this.questionList[i].question_id == res.data.data.answer[j].question_id){
                    this.questionList[i].answer = res.data.data.answer[j].option_id
                    this.replay.push(res.data.data.answer[j])
                  }
                }
                this.aboutMe = res.data.data.introduce
                this.link_1= res.data.data.link_1
                this.link_2 = res.data.data.link_2
                this.link_3 = res.data.data.link_3
              }
            }else if(res.data.code == 3){
              this.getActives()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
		},
		created(){
      window.scroll(0,0)
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
		},
    mounted() {
		  let _this = this
      _this.getQeston()
      if(_this.active_id){
        _this.getActives()
      }

    }
  }
</script>

<style>
.about_advice{
	display: flex;
	justify-content: space-between;
}
.about_advice>div{
	width: 48%;
	text-align: left;
}
.about_advice p .right{
	color: green;
}
.about_advice p .wrong{
	color: red;
}
.advice_list{
	margin-top: 10px;
}
.advice_list:nth-child(1){
	margin-top: 15px;
}
.advice_sample{
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
}
.sample_con{
	width: 100%;
	margin-top:15px;
	overflow: hidden;
}
.sample_li{
	width:30%;
	padding: 15px;
	background-color: white;
	float: left;
	margin-left: 10px;
}
.sample_li:nth-child(1){
	margin-left: 0;
}
.aboutme_choice{
	margin-top: 20px;
}
.aboutme_choice .chioce{
	margin-top: 15px;
}
</style>
