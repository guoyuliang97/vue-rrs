<template>
	<div class="experience_navcon">
		<div class="left_nav" >
			<p class="small_title fontweight">基本信息</p>
			<div  v-for="(item,index) in navlist" class="leftnav_list" :class="{'small_title':item.type=='1','fontweight':item.type=='1','leftnav_two':item.type=='0'}" @click="changeNav(index,item.router,)">
				<p><span :style="{borderBottom:navindex==index&&item.type!='1'?'2px solid #14c5ca':'none'}">{{item.name}}</span><i v-if="item.suo == '1'" style="margin-left:20px;font-size:16px" class="iconfont icon-suo"></i></p>
				<p  v-if="item.type=='0'"><i class="el-icon-check" style="color: #14c5ca;font-size: 16px;font-weight: bold;"></i></p>
			</div>
      <div style="margin-top:120px;"></div>
	</div>
	</div>
</template>

<script>
  import Bus from '../../assets/eventBus'
  import '../../../static/css/suo/iconfont.css'
	export default {
		props:['navindex','overType'],
		data() {
			return {
				navlist:[
					{name:'语言',type:'',router:'Language'},
					{name:'类别',type:'',router:'Type',},
					{name:'关于此次体验',type:'1',router:''},
					{name:'介绍您自己',type:'',router:'Introduce',},
					{name:'体验内容',type:'',router:'Feel',},
					{name:'我会提供什么',type:'',router:'Provide',},
					{name:'参与者需要自带的东西',type:'',router:'Bring'},
					{name:'标题',type:'',router:'Title',},
					{name:'照片',type:'',router:'Photo',},
					{name:'设置',type:'1',router:'',suo:'1'},
					{name:'体验地点',type:'',router:'Feeladdress',},
					{name:'活动时间',type:'',router:'activeTime',},
					{name:'是否提供住宿',type:'',router:'accommodation',},
					{name:'注意事项',type:'',router:'attation',},
					{name:'预定设置',type:'',router:'bookSet',},
					{name:'体验包场',type:'',router:'makeBlock',},
					{name:'志愿者',type:'',router:'needVolunter',},
					{name:'提交体验',type:'1',router:'subExperience',},
				],
        clickSub:false,
        activeId:"",
        complete:''
			};
		},
		methods:{
		changeNav(index,router){
		if(this.activeId){
          if(index!=2&&index!=9 && index !=17){
            this.$router.push({
              name: router,
              query:{
                information: this.activeId,
                complete: this.complete
              }
            })
            this.$emit('changenavf',index)
          }else if(index == 17 && this.clickSub){
            this.$router.push({
              name: router,
              query:{
                information: this.activeId,
                complete: this.complete
              }
            })
          }
        }
			}
		},
    created:function(){
     //  this.complete = this.$route.query.complete
    },
	mounted(){
	  window.scroll(0,0)
	  Bus.$on('change',(msg)=>{
		for(let i = 0; i < msg.length;i++){
			  this.navlist[msg[i]].type = '0'
			//   if(i == msg.length -1){
			// 	  this.changeNav(msg[i], this.navlist[msg[i]].router)
			//   }
        }
		if(msg.length == 15){
		      this.clickSub = true
        }else{
          this.clickSub = false
		}
		
      })
      Bus.$on('changeAC',(msg)=>{
        this.activeId = msg
      })
	  this.complete = this.$route.query.complete
	
	},

	}
</script>

<style>
.experience_navcon{
	width: 100%;

}
.left_nav{
	width: 80%;
	margin: 0 auto;
	margin-top: 20px;
	text-align: left;
}
.small_title{
	font-size: 12px;
}
.leftnav_list{
	margin-top: 40px;
	height: 20px;
	line-height: 20px;
	cursor: pointer;
}
.leftnav_two{
	display: flex;
	justify-content: space-between;
}
</style>
