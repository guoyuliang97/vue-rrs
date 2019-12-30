<template>
	<div>
		<div class="mandatory">
			<div class="data_title">
				<div class="edit_width">必填</div>
			</div>
			<div class="edit_datacon">
				<el-form ref="form" style="width: 700px;margin: 0 auto;" label-position="left" :model="dataForm" label-width="90px">
					<el-form-item label="名:" style="margin-top: 30px;">
					 <el-input  v-model="dataForm.name" placeholder="名字"></el-input>
            <p class="data_smalltxt">您的公开个人资料将仅显示您的名字。申请预订时，房东会看到您的名字</p>
				   </el-form-item>
				   <el-form-item label="姓氏:">
				    <el-input v-model="dataForm.family_name" placeholder="姓氏"></el-input>
					<p class="data_smalltxt">您的公开个人资料将仅显示您的名字。申请预订时，房东会看到您的姓氏。</p>
				   </el-form-item>
          <el-form-item label="中间名">
            <el-input  v-model="dataForm.middle_name" placeholder="middlename"></el-input>
            <p class="data_smalltxt">您的公开个人资料将仅显示您的名字。申请预订时，房东会看到您的middlename。</p>
          </el-form-item>
				   <el-form-item  label="性别:" style="margin-top: -5px;">
				   <el-select  v-model="dataForm.six" placeholder="请选择" style="width: 100%;">
			 			<el-option v-for="item in sexArr"  :label="item.label" :value="item.value"></el-option>
					   </el-select>
					<p class="data_smalltxt">此数据仅用于分析，我们不会透露给其它用户。</p>
				   </el-form-item>
				   <el-form-item label="出生日期:" style="margin-top: -5px;">
             <el-input  v-model="dataForm.birthday" placeholder="出生日期 xxxx-xx-xx"></el-input>
						<p class="data_smalltxt">此数据将帮助我们更好地为您提供服务，除必要的内部使用外，我们不会将您的信息透露给房东或其他用户。您必须年满 18 周岁才能使用人人游的网站和服务。</p>
				   </el-form-item>
          <el-form-item label="宗教:">
            <el-input  v-model="dataForm.religion" placeholder="宗教"></el-input>
            <p class="data_smalltxt">您的公开个人资料将显示您的宗教。申请预订时，策划人会看到您的宗教。</p>
          </el-form-item>
          <el-form-item label="饮食习惯:">
            <el-input  v-model="dataForm.habits" placeholder="饮食习惯"></el-input>
            <p class="data_smalltxt">您的公开个人资料将显示您的饮食习惯。申请活动时，策划人会看到您的饮食习惯。</p>
          </el-form-item>
				   <el-form-item label="电子邮件:" style="margin-top: -5px;"> 
				   <el-input  v-model="dataForm.email" placeholder="绑定电子邮件" :disabled="notEmail == 0? true:false"></el-input><span class="alter" @click="toReturn" style="color:red"><i class="el-icon-edit"></i></span>
					<p class="data_smalltxt">我们不会向其他人人游用户透露您的个人邮箱地址。<span style="cursor: pointer;color: #008489;" @click="openTerms">了解更多</span>。</p>
				   </el-form-item>
				   <el-form-item label="电话号码:" style="margin-top: -5px;"> 
				   <el-input v-model="dataForm.mobile" placeholder="绑定电话号码" :disabled="notPhone == 0? true:false"></el-input><span class="alter" @click="toReturn" style="color:red"><i class="el-icon-edit"></i></span>
				   <p class="data_smalltxt">我们会给您发送预订申请、提醒以及其他事项的通知。</p>
				   </el-form-item>
				   <el-form-item label="首选语言:" style="margin-top: -5px;">
				   <el-select  v-model="dataForm.language" placeholder="请选择" style="width: 100%;">
				   	<el-option
				   	v-for="item in languageArr"
				   	:key="item.value"
				   	:label="item.label"
				   	:value="item.value">
				   	</el-option>
				   </el-select>
				   <p class="data_smalltxt">我们将会使用此语言给您发消息。</p>
				   </el-form-item>
				   <el-form-item label="其他语言:" style="margin-top: -5px;">
             <el-select v-model="dataForm.other_language" multiple filterable allow-create default-first-option  placeholder="请选择" style="width:100%;">
               <el-option v-for="item in languageArr"  :label="item.label" :value="item.value"></el-option>
             </el-select>
					</el-form-item>
				   <el-form-item label="首选货币:">
				   <el-select  v-model="dataForm.currency" placeholder="请选择" style="width: 100%;">
				   <el-option
				   v-for="item in moneyArr"
				   :key="item.value"
				   :label="item.label"
				   :value="item.value">
				   </el-option>
				   </el-select>
				   <p class="data_smalltxt">我们将会使用此货币为您显示价格。</p>
				   </el-form-item>
				   <el-form-item label="居住地址:" style="margin-top: -5px;">
             <div v-show="dataForm.address" style="display: flex;justify-content: flex-start;">
               <el-input  v-model="dataForm.address" style="width:300px;margin-right:20px;"></el-input><el-button type="primary" @click="isAdress = !isAdress" plain>{{isAdress?'取消':'修改'}}</el-button>
             </div>
             <City type="1" v-show="isAdress" :style="{marginTop:dataForm.address?'20px':'0'}"  v-on:selectXian="selectXian" v-on:selectCountry="selectCountry" v-on:selectProvince="selectProvince" v-on:selectCity="selectCity"></City>
           </el-form-item>
				   <el-form-item label="自我介绍:"> 
				    <el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 4}"
					  placeholder="自我介绍"
					  v-model="dataForm.introduce">
					</el-input>
					<p class="data_smalltxt">人人游是建立在相互关系上的，请帮助其他人了解您。</p>
					<p class="data_smalltxt" style="margin-top: 10px;">告诉他们您喜欢什么，您离开了哪几样东西就不能活？分享您最喜爱的旅游目的地丶书籍丶电影丶电视节目丶音乐以及食物。</p>
					<p class="data_smalltxt" style="margin-top: 10px;">告诉他们您会是个什么样的房东或房客，您旅游的风格是怎样的？您作为人人游房东的风格又是怎样呢？</p>
					<p class="data_smalltxt" style="margin-top: 10px;">向大家介绍一下自己吧，您有什么人生格言吗？</p>
				   </el-form-item>
				</el-form>
			</div>
		</div>
		<div class="mandatory" style="margin-top: 20px;">
			<div class="data_title">
				<div class="edit_width">选填</div>
			</div>
			<div class="edit_datacon">
				<el-form style="width: 700px;margin: 0 auto;" label-position="left" :model="dataForm" label-width="90px">
					<el-form-item label="学校:" style="margin-top: 30px;">
						<el-input  v-model="dataForm.school" placeholder="学校"></el-input>
					</el-form-item>
					<el-form-item label="工作:">
						<el-input   v-model="dataForm.work" placeholder="工作"></el-input>
					</el-form-item>
					<el-form-item label="时区:">
						<el-select  v-model="dataForm.time_zone" placeholder="请选择" style="width: 100%;">
						<el-option
						v-for="item in timeZoneArr"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
						</el-select>
						<p class="data_smalltxt">你所在的时区。</p>
					</el-form-item>

					<el-form-item label="紧急联系人:" style="margin-top: -5px;">
            <el-checkbox-group style="display: flex;flex-wrap: wrap" v-model="contactForm.deelContact" @change="checkContact">
              <el-checkbox  style="text-align: left;" :key="index" :label="item.contacts_id" v-for="(item,index) in contactForm.contact">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div style="text-align: right" v-if="contactForm.contact != ''">
              <el-button type="primary" @click="deleteContact">删除</el-button>
            </div>
						<p v-if="dataForm.contact==''" style="color: #008489;margin-top: -5px;text-align: left;"><span style="cursor: pointer;" @click="isContact=true"><i class="el-icon-plus"></i> 添加紧急联系人</span></p>
						<p class="data_smalltxt">请提供一个您信任的联系人，如果出现紧急情况，我们的客户体验团队可以通知该联系人。</p>
					</el-form-item>

					<el-form-item label="收货地址:" style="margin-top: -5px;">
            <el-checkbox-group style="display: flex;flex-wrap: wrap" v-model="addressForm.deeladress">
              <el-checkbox  style="text-align: left;" :key="index" :label="item.address_id" v-for="(item,index) in addressForm.address">{{item.address}}</el-checkbox>
            </el-checkbox-group>
            <div style="text-align: right" v-if="addressForm.deeladress.length">
              <el-button type="primary" @click="deleteSome">删除</el-button>
            </div>
						<p v-if="dataForm.buyAddress==''" style="color: #008489;margin-top: -5px;text-align: left;"><span style="cursor: pointer;" @click="isAddress=true"><i class="el-icon-plus"></i> 添加收货地址</span></p>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="contact_bg" v-show="isContact" @click="isContact=false"></div>
		<div class="contact_con animated fadeIn"  v-show="isContact">
			<div class="contact_dialog">
				<div class="contact_dialogtitle">
					<p class="fontweight">添加紧急联系人</p>
					<p><i class="el-icon-close" style="cursor: pointer;" @click="isContact=false"></i></p>
				</div>
				<el-form :model="contactForm" style="width: 100%;margin-top: 15px;" label-width="90px" label-position="left">
					<el-form-item label="姓名:" style="margin-top: 30px;" >
						<el-input v-model="contactForm.name" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item label="与你的关系:">
						<el-input v-model="contactForm.relation" placeholder="与你的关系"></el-input>
					</el-form-item>
					<el-form-item label="电话:">
            <div  style="display: flex;justify-content: flex-start">
              <el-select v-model="contactForm.m_code" placeholder="请选择"  >
                <el-option v-for="item in countryNumber" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="contactForm.mobile" placeholder="电话"></el-input>
            </div>
						<!--<p class="data_smalltxt">请输入对应的区号。</p>-->
					</el-form-item>
					<el-form-item label="电子邮件:" style="margin-top: -5px;">
						<el-input v-model="contactForm.email" placeholder="电子邮件"></el-input>
					</el-form-item>
					<el-form-item label="首选语言:" style="margin-top: -5px;">
						<el-select v-model="contactForm.language" placeholder="请选择" style="width: 100%;">
						<el-option
						v-for="item in languageArr"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="sendContact" style="width: 100%;">确定</el-button>
			</div>
		</div>
		<div class="contact_bg" v-show="isAddress" @click="isAddress=false"></div>
		<div class="add_address animated fadeIn" v-show="isAddress">
			<div class="contact_dialog">
				<div class="contact_dialogtitle">
					<p class="fontweight">添加收货地址</p>
					<p><i class="el-icon-close" style="cursor: pointer;" @click="isAddress = false"></i></p>
				</div>
				<el-form :model="addressForm" style="width: 100%;margin-top: 15px;" label-width="90px" label-position="left">
          <el-form-item label="姓名:" >
            <el-input v-model="addressForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" >
            <el-input v-model="addressForm.mobile" placeholder="联系电话"></el-input>
          </el-form-item>
					<City type="2" v-on:selectXian="selectXian2" v-on:selectCountry="selectCountry2" v-on:selectProvince="selectProvince2" v-on:selectCity="selectCity2"></City>
          <el-form-item label="街道:" >
            <el-input v-model="addressForm.street" placeholder="填写具体位置"></el-input>
          </el-form-item>
					<el-form-item label="邮政编码:" >
						<el-input v-model="addressForm.p_code" placeholder="邮政编码"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="sendAddress" style="width: 100%;">确定</el-button>
			</div>
		</div>
		<div style="text-align: left;margin-top: 30px;">
			<el-button type="primary" @click="ban">保存</el-button>
		</div>
	</div>
</template>

<script>
  import test from '../../../static/js/address.js'
  import City from '../../public/city.vue'
	export default {
		data() {
			return {
        api:this.GLOBAL.baseURL,
        isAdress: true,
				addressForm:{
          deeladress:[],
          address:[],
          country:'',
          province:"",
          city:"",
          region:"",
          street:'',
          p_code:'',
          name:'',
          mobile:''
				},
				countryArr:[
					{value:'0',label:'中国'},
				],
				dataForm:{
          family_name:"",
          middle_name:"",
          name:"1",
          six:'',
          birthday:"",
          religion:"",
          habits:"",
				  	email:"",
          mobile:"",
				  	language:"1",
          other_language:[],
          currency:"1",
          address:"",
          introduce:"",
				  	school:"",
          work:"",
          time_zone:"1",
				  	contact:"",
          buyAddress:"",
          country:[],
          province:[],
          city:[],
          xian:[],
				},
				contactForm:{
          deelContact:[],
          contact:[],
					name:'',
          m_code:'',
          relation:"",
          mobile:"",
					email:"",
					language:1
				},
				sexArr:[
					{
					value: 0,
					label: '不显示'
					}, {
					value: 1,
					label: '男'
					}, {
				  value: 2,
          label: '女'
          }
				],
        countryNumber:[
          {value:0,label:'+86'}
        ],
				languageArr:[
					{
					value: 0,
					label: '中文'
					}, {
					value: 1,
					label: 'English'
					},{
					value: 2,
					label: '日本语'
					}
				],
				moneyArr:[{
					value: 1,
					label: '人民币'
					}, {
					value: 2,
					label: '美元'
					}, {
					value: 3,
					label: '日元'
					}
				],
				timeZoneArr:[
					{
					value: 1,
					label: '(GMT + 08:00) China'
					}, {
					value: 2,
					label: '(GMT + 08:00) America'
					},
          {
					value: 3,
					label: '(GMT + 08:00) Japan'
					}
				],
				isContact:false,
				isAddress:false,
        notEmail:1,
        notPhone:1,
        h:false,
        email:'',
        password:'',
        p:false,
        value8:'',
        addresList:[],
        phone:'',
        fobid:0,
        changeTime:'',
        smsTime:60,
        sms:'发送验证码',
        sms_code:''
			}
		},
    components:{
      City
    },
		methods:{
		  //修改电话
      sendSMS(){
        this.$http.post(this.api + '/home/User/send_msg',{
          token: localStorage.getItem('token'),
          m_code: parseInt(this.value8),
          mobile: this.phone,
          flag: 3
        })
          .then(res=>{
            if(res.data.code == 1){
              this.changeTime = setInterval(()=>{
                this.smsTime--
                this.sms = '重新发送（'+this.smsTime+ '）'
                this.fobid = 1
                if(this.smsTime <= 0){
                  this.fobid = 0
                  this.smsTime = 60
                  this.sms = '重新发送'
                  clearInterval(this.changeTime)
                }
              },1000)
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendSMS()
                })
            }else{
              alert(res.data.msg)
            }
          })
      },
      //删除联系人
      deleteContact(){
        this.$http.post(this.api + '/home/User/del_contacts',{
          token:localStorage.getItem('token'),
          contacts_id: this.contactForm.deelContact
        }).then(res=>{
          if(res.data.code == 1){
            this.contactForm.deelContact = []
            this.loadingData()
          }else if(res.data.code == 3){
            this.$http.post(this.api + '/home/index/token')
              .then(res=>{
                localStorage.setItem('token',res.data.data)
                this.deleteContact()
              })
          }else{

          }
        })
      },
      //选择联系人
      checkContact(){

      },
      //添加联系人
      sendContact(){
        this.$http.post(this.api + '/home/User/save_contacts',{
          token:localStorage.getItem('token'),
          name:this.contactForm.name,
          m_code:this.contactForm.m_code,
          relation:this.contactForm.relation,
          mobile:this.contactForm.mobile,
          email:this.contactForm.email,
          language:this.contactForm.language
        }).then(res=>{
          if(res.data.code == 1){
            this.isContact = false
            this.$message({
              type:'success',
              message:res.data.msg
            })
          }else{
            this.$alert(res.data.msg)
          }
        })
      },
		  //删除地址
      deleteSome(){
         this.$http.post(this.api + '/home/User/del_address',{
           token: localStorage.getItem('token'),
           address_id:this.addressForm.deeladress
         }).then(res=>{
             if(res.data.code == 1){0
               this.addressForm.deeladress = []
                  this.loadingData()
             }else{
               this.$alert(res.data.msg)
             }
         })

      },
			openTerms(){
				let routeData = this.$router.resolve({
					 name: "terms",
					 query: 1,
					 params:{catId:1}
				});
				window.open(routeData.href, '_blank');
			},
      ban(){
			  this.$http.post(this.api + '/home/User/saveuser',{
			    token: localStorage.getItem('token'),
          family_name: this.dataForm.family_name,
          middle_name: this.dataForm.middle_name,
          name: this.dataForm.name,
          six: this.dataForm.six,
          birthday: this.dataForm.birthday,
          religion: this.dataForm.religion,
          habits: this.dataForm.habits,
          email: this.dataForm.email,
          mobile: this.dataForm.mobile,
          language: this.dataForm.language,
          other_language: JSON.stringify(this.dataForm.other_language) ,
          currency: this.dataForm.currency,
          introduce: this.dataForm.introduce,
          school: this.dataForm.school,
          work: this.dataForm.work,
          time_zone: this.dataForm.time_zone,
          contact: this.dataForm.contact,
          buyAddress: this.dataForm.buyAddress,
          country: this.dataForm.country[1],
          country_id: this.dataForm.country[0],
          province: this.dataForm.province[1],
          province_id: this.dataForm.province[0],
          city: this.dataForm.city[1],
          city_id: this.dataForm.city[0],
          region: this.dataForm.xian[1],
          region_id: this.dataForm.xian[0]
        }).then(res=>{
          if(res.data.code == 1){
            this.notEmail = 0
            this.notPhone = 0
             this.$message({
               type:'success',
               message: res.data.msg
             })
            this.loadingData()
          }else{
            this.$alert(res.data.msg)
          }
        })
      },
      loadingData(){
			  this.$http.post(this.api + '/home/User/get_user',{
			    token: localStorage.getItem('token')
        }).then(res=>{
          if(res.data.code == 1){
            let data = res.data.data[0]
            console.log(data)
            this.dataForm.family_name = data.family_name
            this.dataForm.middle_name = data.middle_name
            this.dataForm.name = data.name
            this.dataForm.six = data.six
            this.dataForm.birthday = data.birthday?data.birthday:''
            this.dataForm.religion = data.religion
            this.dataForm.habits = data.habits
            this.dataForm.email = data.email_link
            this.dataForm.mobile = data.mobile_link
            this.dataForm.language = data.language
            if(data.other_language){
              var a = []
                for(let m = 0;m<data.other_language.split(',').length;m++){
                  a.push(parseInt(data.other_language.split(',')[m]))
                }
              this.dataForm.other_language = a
            }
            this.dataForm.currency = data.currency?data.currency:''
            this.dataForm.introduce = data.introduce
            this.dataForm.school = data.school
            this.dataForm.work = data.work
            this.dataForm.time_zone = data.time_zone
            this.notEmail = 0
            this.notPhone = 0
            if(data.useraddress.length > 0){
              let a = []
              for(let i =0;i< data.useraddress.length;i++){
                let b =  data.useraddress[i].province =='北京'||data.useraddress[i].province=='天津'||data.useraddress[i].province == '上海'|| data.useraddress[i].province == '重庆'? data.useraddress[i].province+'市':data.useraddress[i].province + '省'
                let address =data.useraddress[i].name +' '+ data.useraddress[i].country+' '+b+' '+ data.useraddress[i].city + '市'+' ' + data.useraddress[i].region
                let address_id = data.useraddress[i].address_id
                a.push({address,address_id})
              }
              this.addressForm.address = a
            }else{
              this.addressForm.address = []
            }
            if(data.usercontacts.length>0){
              let a =[]
              for(let i = 0;i< data.usercontacts.length;i++){
                a.push(data.usercontacts[i])
              }
              this.contactForm.contact = a
            }else{
              this.contactForm.contact = []
            }
            if(data.province){
              if(data.province == '北京'||data.province=='上海'||data.province == '重庆'||data.province=='天津'){
                this.dataForm.address = data.country +' '+data.province +'市'+' ' + data.city + '市'+' ' + data.region + data.street
                this.isAdress = false
              }else{
                this.dataForm.address = data.country +' '+ data.province +'省'+' ' + data.city + '市'+' ' + data.region + data.street
                this.isAdress = false
              }
            }
          }else if(res.data.code == 3){
            this.$http.post(this.api + '/home/index/token')
              .then(res=>{
                localStorage.setItem('token',res.data.data)
                this.loadingData()
              })
          }else if(res.data.code == 0){
            this.$alert(res.data.msg)
          }
        })
      },
      sendAddress(){
        this.$http.post(this.api + '/home/User/save_address',{
          token: localStorage.getItem('token'),
          country: this.addressForm.country,
          province:this.addressForm.province,
          city:this.addressForm.city,
          region:this.addressForm.region,
          p_code:this.addressForm.p_code,
          name: this.addressForm.name,
          street:this.addressForm.street,
          mobile: this.addressForm.mobile
        })
          .then(res=>{
            if(res.data.code == 1){
              this.isAddress = false
              this.addressForm = {
                deeladress:[],
                address:[],
                country:'',
                province:"",
                city:"",
                region:"",
                p_code:'',
                name:'',
                mobile:'',
                street:''
              }
              this.loadingData()
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
            }else if(res.data.code == 3){
              this.$http.post(this.api + '/home/index/token')
                .then(res=>{
                  localStorage.setItem('token',res.data.data)
                  this.sendAddress()
                })
            }else if(res.data.code == 0){
              alert(res.data.msg)
            }
          })
      },
      selectCountry(msg){
        this.dataForm.country = msg
      },
      selectProvince(msg){
        this.dataForm.province = msg

      },
      selectCity(msg){
        this.dataForm.city = msg

      },
      selectXian(msg){
        this.dataForm.xian = msg

      },
      selectCountry2(msg){
        this.addressForm.country = msg[1]

      },
      selectProvince2(msg){
        this.addressForm.	province = msg[1]

      },
      selectCity2(msg){
        this.addressForm.	city = msg[1]

      },
      selectXian2(msg){
        this.addressForm.region = msg[1]

      },
      toReturn(){
        localStorage.setItem('rt','security')
        localStorage.setItem('accountNav','4')
        this.$router.push({
          path: '/security',
        })
      }
		},
   created() {
		  this.addresList = test()
		  this.loadingData()
    },
  }
</script>

<style>
@import url('../../../static/css/editdata.css');
</style>
