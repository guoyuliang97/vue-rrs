<template>
	<div class="exp_con">
		<p class="title">你提供的体验是什么类型的？</p>
		<p class="language_txt">请选择最能说明您的体验的类别。</p>
    <el-cascader placeholder="请选择" :props="props" style="width: 200px;margin-top: 20px;" v-model="typeVal" :options="types"  filterable clearable></el-cascader>
    <div v-for="(item,index) in questionList" :key="index">
      <p class="fontweight main_language">{{item.title}}</p>
      <div class="active_choice">
        <el-radio-group v-model="item.answer"  @change="answerAdd(item,index)">
          <p v-for="items in item.option">
            <el-radio :label="items.option_id">{{items.name}}</el-radio>
          </p>
        </el-radio-group>
      </div>
    </div>
		<div class="exp_btn">
			<el-button type="primary" plain @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
				typeVal:[],
				types:[],
        props: {
          value: 'kind_id',
          label: 'kind_name',
        },
				typeWay:'',
        replay:[],
        questionList:[],
        complete:'',
        active_id:''
			};
		},
		methods:{
			changeRouter(){
       /* if(!this.replay.length >= this.questionList.length){
          this.$message({type:'info',message:'问答请填写完整'})
        }else{*/
          if(this.active_id){
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              activity_id: this.active_id,
              question: this.replay,
              kind_id: this.typeVal[this.typeVal.length-1],
              step:1
            })
              .then(res=>{
                if(res.data.code == 1){
                  if(!this.complete){
                     this.$emit('changeRouter',{id:3,router:"Introduce",information: this.active_id,complete:this.complete})
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
          }else{
            this.$http.post(this.api + '/home/Activity/save_activity',{
              token: localStorage.getItem('token'),
              question: this.replay,
              kind_id: this.typeVal[this.typeVal.length-1],
              step:1
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$emit('saveId',  res.data.data)
                  this.$emit('changeRouter',{id:3,router:"Introduce",information:  res.data.data})
                }else if(res.data.code == 3){
                  this.changeRouter()
                }else if(res.data.code == 0){
                  this.$alert(res.data.msg)
                }
              })
          }
  /*      }*/
			},
      answerAdd(item,index){
			  if(!this.replay[index]){
          this.replay[index] ={question_id:item.question_id,option_id:item.answer,other:''}
        }else{
          this.replay[index] ={answer_id:this.replay[index].answer_id,question_id:item.question_id,option_id:item.answer,other:''}
        }
      },
      getKind(){
        this.$http.post(this.api + '/home/Kind/kindlist',{
          token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              for(let i in res.data.data){
                this.types.push(res.data.data[i])
              }
            }else if(res.data.code == 3){
              this.getKind()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      },
      getQuestion(){
        this.$http.post(this.api + '/home/Activity/question',{
          token: localStorage.getItem('token'),
          flag: 1,
          activity_id: this.active_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.questionList =  res.data.data
            }else if(res.data.code == 3){
              this.getQuestion()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getActive(){
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
              }
              for(let m = 0;m<res.data.data.kind_id.split(',').length;m++){
                this.typeVal.push(parseInt(res.data.data.kind_id.split(',')[m]))
              }
            }else if(res.data.code == 3){
              this.getActive()
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
		},
		created(){
      window.scroll(0,0)
      this.active_id = this.$route.query.information
		},
    mounted() {
		  let _this = this
      _this.complete = this.$route.query.complete
      _this.getKind()
      _this.getQuestion()
      if(this.active_id){
       _this.getActive()
      }
    }
  }
</script>

<style>
.active_choice p{
	margin-top: 15px;
}
.active_choice p:nth-child(1){
	margin-top:20px;
}
</style>
