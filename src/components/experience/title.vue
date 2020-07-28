<template>
	<div class="exp_con">
		<p class="title">给体验想个标题？</p>
		<p class="language_txt">告诉参与者您的体验有哪些不同之处，帮助他们设想将做些什么。 出色的体验标题应能凸显您自己的专长技能，重点说明您能带参与者去哪些他们自己去不到的地方，或者做他们自己做不到的事情。</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<div class="about_advice">
				<div>
					<p class="fontweight">建议</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 拼写和语法正确无误</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 主动动词</p>
					<p class="advice_list"><i class="el-icon-plus right"></i> 您的体验有何独特之处</p>
				</div>
				<div>
					<p class="fontweight">不建议</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 当地俚语</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 全部大写和标点符号</p>
					<p class="advice_list"><i class="el-icon-close wrong"></i> 符号或表情符号</p>
				</div>
			</div>
			<div class="advice_sample">
				<p class="fontweight">示例：</p>
			</div>
			<div class="sample_con">
				<div class="sample_img" v-for="item in sampleList" :style="{backgroundImage:'url('+item.img+')',backgroundSize:'100% 100%'}">
					<p style="color: white;margin-top: 130px;padding: 0 10px 0 10px;" class="fontweight">{{item.title}}</p>
				</div>
			</div>
		</div>
		<p class="fontweight main_language">请提供体验名称</p>
		<el-input
		type="textarea"
		:autosize="{ minRows:1, maxRows: 3}"
		placeholder="例如舞动里约桑巴舞体验"
		v-model="styleName"
		style="margin-top: 20px;">
		</el-input>
		<div class="exp_btn">
			<el-button type="primary" @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
        sampleList:[
          {img:"./static/img/static/story.jpg",title:"和铂金唱片制作人一起写歌"},
          {img:"./static/img/static/story.jpg",title:"巴黎大厨家里的私人晚餐"},
          {img:"./static/img/static/story.jpg",title:"和搜救犬一起徒步游览润宁峡谷"}
        ],
        sampleIndex:0,
        leftDate:0,
        styleName:"",
        oneArr:["我将不提供任何东西"],
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
          if(!this.styleName){
            this.$message({type:'info',message:'请完善体验名称'})
          }else{
              this.$http.post(this.api + '/home/Activity/save_activity',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                title: this.styleName,
                step: 7
              })
                .then(res=>{
                  if(res.data.code == 1){
                    if(!this.complete){
                      this.$emit('changeRouter',{id:8,router:"Photo",information: this.active_id,complete: this.complete})
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
              this.styleName = res.data.data.title
            }else if(res.data.code == 3){
              this.getActive()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      }
		},
		created(){
      window.scroll(0,0)
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
		},
    mounted() {
		  let _this = this
      if(_this.active_id){
       _this.getActive()
      }

    }
  }
</script>

<style>
.sample_img{
	width: 130px;
	height: 180px;
	float: left;
	margin-left: 10px;
}
.sample_img:nth-child(1){
	margin-left: 0;
}
</style>
