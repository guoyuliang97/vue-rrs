<template>
	<div class="exp_con">
		<p class="title">参与者需自带哪些东西？</p>
		<p class="language_txt">请仔细考虑，在开展体验过程中，除了您提供的东西，参与者还需要自带什么。 参与者预订体验后，我们将通过邮件告知他们这些信息。</p>
			<p class="fontweight" style="margin-top: 30px;">参与者需要自带任何物品吗？</p>
			<p class="language_txt">如果是这样的话，请确保您会向参与者提供他们可能需要的所有东西。</p>
			<el-radio-group v-model="bringData" style="margin-top: 20px;" @change="changeTxt">
				<p class="chioce" v-for="item in bringArr">
					<el-radio :label="item.value" >{{item.label}}</el-radio>
				</p>
			</el-radio-group>
    <div v-show="bringData == 2">
      <p class="fontweight" style="margin: 20px 0;">参与者要带些什么东西？</p>
      <el-input type="textarea" :autosize="{minRows:3,maxRows:5}" v-model="needThing" placeholder="在此输入项目"></el-input>
    </div>
			<div class="exp_btn">
				<el-button type="primary" plain @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
			</div>

		</div>
</template>

<script>

	export default {
		data() {
			return {
			  api: this.GLOBAL.baseURL,
				bringData:1,
				bringArr:[
				  {label:'参与者不需要携带任何东西',value:1},
				  {label:'参与者需要东西',value:2},
				  ],
        needThing:'',
        rplayThing:'',
        complete:'',
        active_id:''
			};
		},
		methods:{
			changeRouter(){
			  if(this.bringData > 1) {
          if (!this.needThing) {
            this.$message({type: 'info', message: '请填写参与者需要带的物品'})
          }else{
            this.save()
          }
        }else{
          this.save()
          }
        },
      save(){

          this.$http.post(this.api + '/home/Activity/save_activity',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            activ_bring: this.needThing,
            step:6
          })
            .then(res=>{
              if(res.data.code == 1){
                if(!this.complete){
                  this.$emit('changeRouter',{id:7,router:"Title",information: this.active_id,complete: this.complete})
                }else{
                  this.$message({
                    type: 'success',
                    message: '保存成功！'
                  })
                }
              }else if(res.data.code == 3){
                this.save()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        
      },
      changeTxt(){
			  if(this.bringData == 1){
          this.rplayThing = this.needThing
          this.needThing = ''
        }else{
          this.needThing =  this.rplayThing
        }
      },
      getActives(){
        this.$http.post(this.api + '/ActivityE',{
          token: localStorage.getItem('token'),
          activity_id: this.active_id,
          visit: 0
        })
          .then(res=>{
            if(res.data.code == 1){
              if(res.data.data.activ_bring){
                this.bringData = 2
                this.needThing = res.data.data.activ_bring
              }
            }else if(res.data.code == 3){
              this.getActives()
            }else if(res.data.code == 0){
              this.$alert(res.data.msg)
            }
          })
      }
		},
		created(){
      window.scrollTo(0,0);
      this.complete = this.$route.query.complete
      this.active_id = this.$route.query.information
		},
    mounted() {
      window.scroll(0,0)
		  let _this = this
      if(_this.active_id){
        _this.getActives()
      }
    }
  }
</script>

<style>

</style>
