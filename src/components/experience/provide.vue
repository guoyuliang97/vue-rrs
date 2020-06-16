<template>
	<div class="exp_con">
		<p class="title">请详细列出您提供的东西</p>
		<p class="language_txt">您可以提供食物、饮料、特殊器材、音乐会门票等特色物品，让参与者更享受体验。</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div style="width: 100%;">
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-arrow-right right"></i> 为参与者提供他们自己难以获取的特殊器材和装备</p>
					<p class="advice_list"><i class="el-icon-arrow-right right"></i> 了解参与者在饮食方面的特殊需求，考虑活动对参与者身体素质的要求，同时列出您将为参与者提供的所有物品</p>
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
		<!--<p class="fontweight" style="margin-top: 40px;color: #008489;cursor: pointer;" @click="addPro"><i class="el-icon-plus"></i> 添加项目</p>-->
    <div>
      <p class="fontweight" style="margin-top: 20px;">关于活动您提供什么东西 <span style="color:#008489">(免费提供)</span></p>

      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4}"
        placeholder="在这里撰写说明"
        v-model="proRemark" style="width: 100%;margin-top: 10px;">
      </el-input>
    </div>
		<hr style="margin-top: 50px;"/>
<!--		<div class="aboutme_choice" v-for="(item,index) in questionList" :key="index">
			<p class="fontweight">{{item.title}}</p>
			<el-radio-group v-model="item.answer" @change="answerAdd(item,index)">
				<p class="chioce" v-for="items in item.option">
					<el-radio :label="items.option_id" >{{items.name}}</el-radio>
				</p>
			</el-radio-group>
		</div>-->
		<p style="font-size: 12px;margin-top: 50px;">如果您使用独立的商家或其他的第三方供应商为体验提供交通服务或装备器材，您应该写明商家的名称以及其他可能对参与者有帮助的信息。 仅适用于交通服务和装备器材，您无需列出饮食供应商等其他信息（如果您愿意，当然也可以列明！）。</p>
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
		</div>

		<!--<el-dialog
		  title=""
		  :visible.sync="showDialog"
		  width="35%"
		  :before-close="handleClose">
		  <div>
			  <p class="fontweight" style="margin-top: 20px;">关于活动您提供什么东西</p>
			  <el-input
			  type="textarea"
			  :autosize="{ minRows: 3, maxRows: 4}"
			  placeholder="在这里撰写说明"
			  v-model="proRemark" style="width: 100%;margin-top: 10px;">
			</el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="showDialog = false">取 消</el-button>
			<el-button type="primary" @click="showDialog = false">确 定</el-button>
		  </span>
		</el-dialog>
-->
	</div>
</template>

<script>

	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
        sampleList:[
          {txt:"零食点心：欢迎分享您的口味偏好，我会尽量满足每一个人！"},
          {txt:'开胃小菜：如果您有特殊的饮食要求，比如纯素食或无麸质食品，请提前告诉我'},
          {txt:'海鲜晚餐：去老字号海鲜餐厅，围坐在面朝大海的野餐桌旁品海鲜、喝啤酒'}
        ],
        sampleIndex:0,
        leftDate:0,
        proType:"",
        proRemark:'',
        questionList:[],
        replay:[],
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
				if(!this.proRemark){
					this.$message({type:'info',message:'请完善您不为参与者提供任何东西吗'})
				}/*else if(!this.replay.length >= this.questionList.length){
				  this.$message({type:'info',message:'问答请填写完整'})
				}*/
        else{
       
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
         /*     question: this.replay,*/
              activ_provite: this.proRemark,
              step:5
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(!this.complete){
                  this.$emit('changeRouter',{id:6,router:"Bring",information:this.active_id,complete: this.complete})
                  }else{
                    this.$message({
                      type:'success',
                      message:'保存成功!'
                    })
                  }
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
   
        }
			},
      answerAdd(item,index){
        if(!this.replay[index]){
          this.replay[index] ={question_id:item.question_id,option_id:item.answer,other:''}
        }else{
          this.replay[index] ={answer_id:this.replay[index].answer_id,question_id:item.question_id,option_id:item.answer,other:''}
        }
      },
      getActive(){
        this.$http.post(this.api + '/ActivityE',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          visit: 0
        })
          .then(res=>{
            if(res.data.code == 1){
            /*  for(let i = 0;i< this.questionList.length;i++){
                for(let j = 0; j< res.data.data.answer.length; j++){
                  if(this.questionList[i].question_id == res.data.data.answer[j].question_id){
                    this.questionList[i].answer = res.data.data.answer[j].option_id
                    this.replay.push(res.data.data.answer[j])
                  }
                }
              }*/
              this.proRemark = res.data.data.activ_provite
            }else if(res.data.code == 3){
              this.getActive()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getQuestion(){
        this.$http.post( this.api + '/home/Activity/question',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          flag: 1
        })
          .then(res=>{
            if(res.data.code == 1){
              this.questionList = res.data.data
            }else if(res.data.code == 3){
              this.getQuestion()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      }
		},
    mounted(){
		  let _this = this
/*     _this.getQuestion()*/
		  if(this.active_id){
        _this.getActive()
      }
    },
		created(){
      window.scroll(0,0)
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
		}
	}
</script>

<style>

</style>
