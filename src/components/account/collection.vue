<template>
	<div style="text-align: left;">
		<p class="fontweight">结算国家/地区</p>
		<div>
			<el-select v-model="country" placeholder="请选择" disabled style="width: 50%;margin-top: 20px;">
				<el-option
				  v-for="item in countryArr"
				  :key="item.value"
				  :label="item.label"
				  :value="item.value">
				</el-option>
			</el-select>
		</div>
		<p class="fontweight" style="margin-top: 30px;display: flex;justify-content: space-between"><span>收款方式</span>
      <span v-if="saveList.length"><i @click="delet" :style="{color:deletBank?'#008489':'#000'}" style="font-size:20px;cursor: pointer" :class="deletBank?'el-icon-remove':'el-icon-delete'"></i></span></p>
    <div style="display: flex;flex-wrap: wrap">
      <div v-for="(item,index) in saveList" style="border-radius: 5px;width:260px;padding:20px;height:110px;background-color:#008489;margin:20px 20px 20px 0">
        <div style="display: flex;justify-content: space-between;font-size:15px;">
          <p style="color:#fff">{{item.bank_name}}</p>
          <span style="color:#008489;background-color:#fff;padding:2px 5px;border-radius: 5px;">已验证</span>
        </div>
        <p style="margin:20px 0;color:#fff;font-size:20px;text-align: center">{{item.card_number.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")}}</p>
        <div v-show="deletBank">
          <i @click="deleteBnak(item,index)" style="color:#fff;font-size:20px;cursor: pointer" class="el-icon-delete"></i>
        </div>
      </div>
    </div>

		<p style="margin-top: 15px;color: #008489;">
			<span style="cursor: pointer;" @click="isAddcard=true"><i class="el-icon-plus"></i> 添加银行卡</span>
		</p>
		<div style="margin-top: 35px;text-align: left;">
			<el-button type="primary">保存</el-button>
		</div>
		<div class="collection_bg" v-show="isAddcard" @click="isAddcard=false"></div>
		<div class="collection_addCard animated flipInY" v-show="isAddcard">
			<div>
				<div class="collection_addCardtop">
					<p class="fontweight">添加银行卡</p>
					<p><i class="el-icon-close" style="cursor: pointer;"  @click="isAddcard=false"></i></p>
				</div>
				<el-form label-width="75px" label-position="left">
					<el-form-item label="银行卡号:" style="margin-top: 30px;">
						<el-input v-model="card"   placeholder="银行卡号"></el-input>
					</el-form-item>
					<el-form-item label="姓名:">
						<el-input v-model="name" placeholder="姓名:"></el-input>
					</el-form-item>
					<el-form-item label="银行:">
						<el-select v-model="bank" placeholder="请选择" filterable clearable style="width: 100%;">
						<el-option
						v-for="item in bankList"
						:key="item.name"
						:label="item.name"
						:value="item.name">
						</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-button type="primary" style="width:100%" @click="saveBank">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
  import test from '../../../static/js/apy.js'
	export default {
		data() {
			return {
			  api:this.GLOBAL.baseURL,
				country:"",
				countryArr:[],
				isAddcard:false,
					card:'',
					name:"",
					bank:'',
         bankList:[],
        saveList:[],
        deletBank:false
			};
		},
    watch:{
		    card:function(){
            var v = this.card;
            if(/\S{5}/.test(v)){
              this.card = v.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
            }
        }

    },
    methods:{
		  saveBank(){
        if(!this.card){
          this.$message({type:'info',message:'请填写银行卡号'})
        }else if(!this.name){
          this.$message({type:'info',message:'请填写用户姓名'})
        }else if(!this.bank){
          this.$message({type:'info',message:'请填写银行名称'})
        }else {
          this.$http.post(this.api + '/banks',{
            token: localStorage.getItem('token'),
            bank_name: this.bank,
            card_number: this.card,
            user_name: this.name
          })
            .then(res=>{
              if(res.data.code == 1){
                this.getBank()
                this.isAddcard = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/Index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.saveBank()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      getBank(){
		    this.$http.post(this.api + '/bankl',{
		      token: localStorage.getItem('token'),
        })
          .then(res=>{
            if(res.data.code == 1){
              this.saveList = res.data.data
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.getBank()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
      delet(){
		    this.deletBank = !this.deletBank
      },
      deleteBnak(item,index){
        this.$confirm('此操作将永久删除绑定银行卡, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.deleteAllA(item,index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteAllA(item,index){
        this.$http.post(this.api + '/bankd',{
          token: localStorage.getItem('token'),
          bank_id: item.bank_id
        })
          .then(res=>{
            if(res.data.code == 1){
              this.saveList.splice(index,1)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.deleteAllA(item,index)
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      }
    },
    mounted() {
		  this.bankList = test()
      this.getBank()
    }
  }
</script>

<style>
.collection_bg{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 998;
	background-color: rgba(0,0,0,.8);
}
.collection_addCard{
	width: 400px;
	height: 320px;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -200px;
	margin-top: -160px;
	background-color: white;
	border-radius: 10px;
	z-index: 999;
}
.collection_addCard>div{
	width: 360px;
	margin: 0 auto;
}
.collection_addCardtop{
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
}
</style>
