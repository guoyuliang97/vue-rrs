<template>
	<div>
		<div class="data_title">
			<div class="edit_width">通知</div>
		</div>
		<div class="edit_datacon">
			<div style="width: 740px;margin: 0 auto;text-align: left;">
				<el-collapse v-model="activeNames" @change="handleChange">
				  <el-collapse-item title="消息" name="1" style="margin-top: 10px;">
					<div>
						接收预订请求等来自房东和房客的消息。
						<div style="margin-top: 10px;">
							<el-checkbox-group v-model="msgData" @change="change">
								<el-checkbox label="1" key="1">电子邮件</el-checkbox>
								<el-checkbox label="2" key="2">短信</el-checkbox>
							  </el-checkbox-group>
						</div>
					</div>
				  </el-collapse-item>
				  <el-collapse-item title="联系方式" name="2">
				   <div>
					   可在您的个人资料页面编辑此信息。<span style="cursor: pointer;color: #14c5ca;" @click="toEditdata">编辑个人资料</span>
					   <p style="margin-top: 10px;">电子邮件: {{userData.email}}</p>
					   <p style="margin-top: 10px;">电话号码: {{userData.mobile}}</p>
				   </div>
				  </el-collapse-item>
				  <el-collapse-item title="提醒" name="3">
				   <div>
					   接收预订提醒、评论撰写提醒、价格提醒，以及与您使用人人游有关的其他提醒消息。
					   <div style="margin-top: 10px;">
					   	<el-checkbox-group v-model="txData">
					   		<el-checkbox label="1" >电子邮件</el-checkbox>
					   		<el-checkbox label="2"  >短信</el-checkbox>
					   	</el-checkbox-group>
					   </div>
					</div>
				  </el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<div style="margin-top: 15px;text-align: left;">
			<el-button type="primary" @click="saveNotice">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
				activeNames:[],
				msgData:[],
        txData:[],
        userData:''
			};
		},
		methods:{
      change(){

      },
			handleChange(){
				
			},
			toEditdata(){
				this.$router.push('/edit')
			},
      saveNotice(){
			  this.$http.post(this.api + '/home/User/config_add',{
			    token: localStorage.getItem('token'),
          mes: this.msgData ,
          remind: this.txData ,
        })
          .then(res=>{
            if(res.data.code == 1){
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.saveNotice()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      getInformation(){
			  this.$http.post(this.api + '/home/User/get_user',{
			    token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              this.userData = res.data.data[0]
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getInformation()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg )
            }
          })
      },
      getNotice(){
			  this.$http.post(this.api + '/home/User/config_get',{
			    token: localStorage.getItem('token')
        })
          .then(res=>{
            if(res.data.code == 1){
              let data = res.data.data
              if(data.mes){
                var a = []
                for(let m = 0;m<data.mes.split(',').length;m++){
                  a.push(parseInt(data.mes.split(',')[m]))
                }
                this.msgData = a
              }
              if(data.remind){
                var a = []
                for(let m = 0;m<data.remind.split(',').length;m++){
                  a.push(parseInt(data.remind.split(',')[m]))
                }
                this.msgData = a
              }
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getNotice()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
		},
    mounted(){
		  this.getInformation()
      this.getNotice()
    }
	}
</script>

<style>

</style>
