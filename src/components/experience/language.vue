<template>
	<div class="exp_con animated fadeInde">
		<p class="title">请选择体验页面显示的语言</p>
		<p class="language_txt">该语言将是您的体验页面显示的语言，也是您开展体验时所用的语言。它也将作为参与者搜索体验时使用的筛选条件之一。</p>
		<p class="language_title"><span class="fontweight">小贴士</span> <i class="el-icon-arrow-up"></i></p>
		<div class="title_con">
			<p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 您需要会用您选择的语言与参与者交流</p>
			<p><span class="fontweight"><i class="el-icon-arrow-right"></i></span> 体验发布后，您还可以添加自己会说的其他语言</p>
		</div>
		<p class="fontweight main_language">主要语言</p>
		<div class="language_select">
			<el-select v-model="main_laguage" placeholder="请选择" style="width: 40%;border-radius: 6px;" :style="{border:status == 1? '1px solid red':'none'}">
				<el-option
				  v-for="item in languages"
				  :label="item.label"
				  :value="item.value">
				</el-option>
			</el-select>
		</div>
		<p class="fontweight" style="margin-top: 20px;">其他所会语言(可多选)</p>
    <el-select v-model="other_laguage" multiple filterable allow-create default-first-option  placeholder="请选择" style="margin-top:20px;width:300px;">
      <el-option  v-for="(item,index) in languages" :disabled="main_laguage === index" :label="item.label" :value="item.value"></el-option>
    </el-select>
		<div class="exp_btn">
			<el-button type="primary" plain @click="changeRouter">{{complete?'保存':'下一步'}}</el-button>
		</div>
	</div>
</template>

<script>
import test from '../../../static/js/language'
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
        status:0,
				languages: [],
        main_laguage:"",
        other_laguage:[],
        complete:''
			};
		},
    watch:{
      main_laguage:function () {
        this.status = 0
      }
    },
		methods:{
			changeRouter(){
			  if(this.main_laguage < 0){
			    this.status = 1
        }else{
          if( this.active_id){
            this.$http.post(this.api + '/home/Activity/save_activity',{
              activity_id: this.active_id,
              token: localStorage.getItem('token'),
              main_laguage: this.main_laguage,
              other_laguage: this.other_laguage,
              step: 0
            }).then(res=>{
              if(res.data.code == 1){
                if(!this.complete){
                  this.$emit('changeRouter',{id:1,router:"Type",information: this.active_id,complete: this.complete})
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
              main_laguage: this.main_laguage,
              other_laguage: this.other_laguage,
              step: 0
            }).then(res=>{
              if(res.data.code == 1){
                this.$emit('saveId',  res.data.data)
                this.$emit('changeRouter',{id:1,router:"Type",information:res.data.data,complete: this.complete})
              }else if(res.data.code == 3){
                this.changeRouter()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
          }
        }
			},
      getActive(){
        this.$http.post(this.api + '/ActivityE',{
          token: localStorage.getItem('token'),
          activity_id:  this.active_id,
          visit: 0
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              this.main_laguage = data.main_laguage
              if(data.other_laguage){
                var a = []
                for(let m = 0;m<data.other_laguage.split(',').length;m++){
                  a.push(parseInt(data.other_laguage.split(',')[m]))
                }
                this.other_laguage = a
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
      this.languages = test()
      this.active_id = this.$route.query.information
      this.complete = this.$route.query.complete
		},
    mounted(){
		  if( this.active_id ){
		   this.getActive()
      }
		  console.log(this.active_id)
    },
  }
</script>

<style>




.title_con p:nth-child(2){
	margin-top: 10px;
}
.title_con span{
	color: #008489;
}

.language_select{
	margin-top: 20px;
}

</style>
