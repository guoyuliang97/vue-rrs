<template>
	<div class="exp_con">
		<p class="title">介绍体验内容</p>
		<p class="language_txt">生动的描述或许能够吸引浏览体验的人预订，不妨在这里突出您体验的独家亮点｡</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div>
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 写明参与者会在体验中做些什么</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 描述体验的行程，让参与者了解他们可以期待的内容</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 写出您的体验最独特的亮点</p>
				</div>
				<div>
					<p class="fontweight">不建议</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 笼统的行程或者模糊的信息</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 参与者自己可以轻松找到的地方或者完成的活动</p>
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
		<p class="fontweight main_language">描述体验的大致流程和独特之处</p>
		<el-input
		  type="textarea"
		  :autosize="{ minRows: 6, maxRows: 6}"
		  placeholder="按照您安排的活动顺序,为每项活动撰写简介"
		  v-model="aboutMe"
		  style="margin-top: 20px;">
		</el-input>
		<p class="fontweight main_language">请介绍一下体验内容</p>
		<div class="aboutme_choice" v-for="(item,index) in questionList" :key="index">
			<p class="fontweight">{{item.title}}</p>
			<el-radio-group v-model="item.answer" @change="answerAdd(item,index)">
				<p class="chioce" v-for="items in item.option">
					<el-radio :label="items.option_id">{{items.name}}</el-radio>
				</p>
			</el-radio-group>
		</div>
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
		</div>
		<p style="margin-top: 15px;"><span class="fontweight">注意事项:</span>参与者希望参加的是自己找不到的独特体验。 了解<span style="color: #008489;cursor: pointer;">专属体验</span>的相关标准。</p>
	</div>
</template>

<script>

	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
				sampleList:[
					{txt:"您将直接参与我们每周的篮球训练营，跟60个孩子共度两小时的训练和比赛时间。 这里只有我们三个人负责所有孩子（10岁到17岁之间的男孩和女孩），您将协助我们一起训练并指导孩子打篮球。 与孩子们一起共度欢乐时光，让您的活力无限释放，汗水激情飞扬，当然也要注意安全。"},
					{txt:'我的家乡是埃尔萨谷口村，距离佛罗伦萨以南大约1小时车程。我会带大家去村里的集市，向各位介绍我最喜欢的摊位。 我们将一起穿行在各色奶酪、海鲜店铺之间，和店老板聊聊天，到访我们家的老字号肉铺，见一见全托斯卡纳最棒的水果蔬菜商贩。'},
				],
				sampleIndex:0,
				leftDate:0,
				aboutMe:"",
				questionList:'',
        replay:[],
				four:'',
				certificate:"",
				linkOne:"",
				linkTwo:'',
				linkThree:"",
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
              this.$message({type:'info',message:'请完善体验的相关描述'})
          }else if(!this.replay.length>=1){
              this.$message({type:'info',message:'请完善体验内容'})
          }else{
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                question: this.replay,
                descripte: this.aboutMe,
                step:4
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(!this.complete){
                      this.$emit('changeRouter',{id:5,router:"Provide",information:this.active_id,complete: this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功！'
                      })
                    }
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$alert(res.data.msg)
                  }
                })
                .catch(error=>{
                  alert(error)
                })
            
          }
			},
      answerAdd(item,index){
        if(!this.replay[index]){
          this.replay[index] = {question_id:item.question_id,option_id:item.answer,other:''}
        }else{
          this.replay[index] = {answer_id:this.replay[index].answer_id,question_id:item.question_id,option_id:item.answer,other:''}
        }
      },
      getQestion(){
        this.$http.post(this.api + '/home/Activity/question',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          flag: 2
        })
          .then(res=>{
            if(res.data.code == 1){
              this.questionList = res.data.data
            }else if(res.data.code == 3){
              this.getQestion()
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
              for(let i = 0;i<this.questionList.length;i++){
                for(let j =0;j<res.data.data.answer.length;j++){
                  if(this.questionList[i].question_id == res.data.data.answer[j].question_id){
                    this.questionList[i].answer = res.data.data.answer[j].option_id
                    this.replay.push(res.data.data.answer[j])
                  }
                }
              }
              this.aboutMe = res.data.data.descripte
            }else if(res.data.code == 3){
              this.getActives()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      }
		},
    mounted(){
      window.scroll(0,0)
      this.getQestion()
      if(this.active_id){
       this.getActives()
      }
    },
		created(){
			window.scrollTo(0,0);
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information

		}
	}
</script>

<style>
</style>
