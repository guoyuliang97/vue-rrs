<template>
  <div style="text-align: left">
    <Head></Head>
    <hr style="margin-top:81px">
    <div style="margin:20px 0;">
      <span @click="goBack" style="cursor: pointer;margin-left:10%;"><i class="el-icon-arrow-left"></i>返回</span>
    </div>
    <div style="width:1080px;margin:50px auto;">
      <h3>请选择您需要的房源</h3>
    </div>
    <div style="width:1080px;margin:20px auto;display: flex;flex-wrap: wrap;font-size: 12px;">
      <div style="width:100%;display: flex;flex-wrap: wrap;justify-content: space-between;text-align: center;">
        <div style="width:180px;">房源</div>
        <div style="width:180px;">类型</div>
        <div style="width:180px;">名称</div>
        <div style="width:180px;">可住人数</div>
        <div style="width:180px;">价格</div>
        <div style="width:180px;">预定房间数</div>
      </div>
      <div v-for="(item,index) in houseList" :key="index"  style="position:relative;padding:20px 0;text-align: center;flex-wrap: wrap;display: flex;justify-content:space-between;border-bottom: 1px solid #E6E6E6">
        <div style="position: absolute;left:-50px;line-height: 80px;"><i  style="font-size:25px;border-radius: 50%;cursor: pointer" @click="chooseHouse(item,index)"  :style="{color:item.color,border:item.color == '#fff'?'1px solid #000':''}" class="el-icon-circle-check"></i></div>
        <div style="width:180px;text-align: center;position:relative">
          <img :src="item.imgUrl[0]" width="150px" height="80px" >
          <div @click="lookPhoto(item,index)" style="position: absolute;top:0;left:0;right:0;bottom:0;line-height:80px;color:#fff;cursor: pointer">
            查看更多图片
          </div>
        </div>
        <div class="width">{{item.houseType}}</div>
        <el-popover
          placement="top-start"
          trigger="hover"
          width="200"
          :content="item.title">
          <el-button  style="width:180px;line-height:80px;border:none;padding:0;background-color: white; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" slot="reference"><b>{{item.title}}</b></el-button>
        </el-popover>
        <div class="width">
          <b>房源数量:{{item.type}}&nbsp;·&nbsp;可住{{item.perNum}}人</b>
        </div>
        <div class="width">
          ￥<b>{{item.price}}/晚</b>
        </div>
        <div class="width">
          <el-button @click="reduceNum(item,index)" style="border:1px solid #008489;color:#008489" icon="el-icon-minus" size="mini" circle></el-button>
          <span style="margin: 0 20px;">{{item.number}}</span>
          <el-button @click="addNum(item,index)" style="border:1px solid #008489;color:#008489" icon="el-icon-plus" size="mini" circle></el-button>
        </div>
      </div>
    </div>
    <div v-show="check.length" style="position: fixed;bottom:0;width:1080px;left:50%;margin-left:-540px;background-color: #F4F4F4;padding:10px 20px;">
      <div style="display: flex;justify-content: flex-end;line-height: 40px;">
        <div>
          已选<span style="color:#008489">{{check.length}}</span>个房源
        </div>
        <div style="margin-left:20px;margin-right:30px;color:#008489">
          ￥{{allPrice}}
        </div>
        <div>
          <el-button @click="saveHouse" type="primary">保存</el-button>
          <el-button @click="reduce">取消</el-button>
        </div>
      </div>
    </div>
    <div v-show="lookImage" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,.5);z-index: 999">
      <div style="position:fixed;top:50%;left:50%;width:500px;height:400px;padding:10px;margin-top:-210px;margin-left:-260px;">
        <div style="text-align: right;position: relative"><i @click="closeLook" style="position:absolute;font-size:40px;color:#fff;cursor: pointer;top:-100px;right:-140px;" class="el-icon-close"></i></div>
        <div style="width:450px;height:350px;margin:auto;">
          <img :src="imgList[pageIndex]" width="100%" height="100%"/>
        </div>
        <div style="position: relative;">
          <i @click="prev" style="font-size:50px;color:#fff;position: absolute;left:-150px;top:-200px" class="el-icon-arrow-left"></i>
        </div>
        <div style="position: relative">
          <i @click="next" style="font-size:50px;color:#fff;position: absolute;right:-150px;top:-200px" class="el-icon-arrow-right"></i>
        </div>
        <div style="width:520px;height:80px;overflow: hidden;margin-top:20px;position: relative">
          <div style="position: absolute;display: flex;justify-content: space-between;" :style="{left:left +'px'}">
            <div class="marginR" v-for="(item,index) in imgList" style="width:100px;height:80px;margin-right:5px;" >
              <img :src="item" width="98px" height="78px" style="border:1px solid #000;" :style="{borderColor:pageIndex === index? '#fff':''}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from '../../public/head'
    export default {
        name: "allHouse",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            activeId:'',
            houseList:[],
            check:[],
            readyCheck:[],
            allPrice:0,
            lookImage:false,
            imgList:'',
            left:0,
            pageIndex:0,
            slot_id:'',
            chooseTime: ''
        }
      },
      components:{
          Head,
      },
      methods:{
        lookPhoto(item,index){
          this.lookImage = true
          this.imgList = item.imgUrl
        },
        chooseHouse(item,index){
          if(item.color == '#fff'){
            item.color = '#008489'
            this.check.push(item)
            this.allPrice += parseInt(item.price)
          }else{
            item.color = '#fff'
            this.allPrice -= parseInt(item.price)
            for(let i =0;i<this.check.length;i++){
              if(this.check[i].house_id == item.house_id){
                this.check.splice(i,1)
              }
            }
          }
        },
        goBack(){
          this.$router.go(-1)
        },
        saveHouse(){
          this.check.push({activeId:this.activeId})
          this.$router.push({
            name: 'choose',
            query:{
              activeId: this.activeId,
              chooseTime: this.chooseTime,
              chooseHouse: JSON.stringify( this.check)
            }
          })
        },
        reduce(){
          for(let i =0;i<this.houseList.length;i++){
            for(let j = 0;j<this.check.length;j++){
              if(this.houseList[i].house_id == this.check[j].house_id){
                this.houseList[i].color = '#fff'
                this.allPrice -= parseInt(this.check[j].price)
              }
            }
          }
          this.check = []
        },
        get_activity(){
          this.$http.post(this.api + '/HouseUseNum',{
            token: localStorage.getItem('token'),
            activity_id: this.activeId,
            visit: 0,
            slot_id:this.slot_id
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                for(let i = 0;i<data.length;i++){
                  if(data[i].flag == 1){
                    let image=[]
                    for(let j =0;j<data[i].image.length;j++){
                      image.push(data[i].image[j].domain + data[i].image[j].themb_url)
                    }
                    this.houseList.push({
                      number:1,imgUrl:image,houseType:'露营',color:'#fff',type:data[i].num,perNum:data[i].max_person,house_id:data[i].house_id,title:data[i].descript,price:data[i].price
                    })
                  }else if(data[i].flag == 2){
                    let image=[]
                    for(let j =0;j<data[i].image.length;j++){
                      image.push(data[i].image[j].domain + data[i].image[j].themb_url)
                    }
                    this.houseList.push({
                      number:1,imgUrl:image,houseType:'民宿',color:'#fff',type:data[i].num,perNum:data[i].max_person,house_id:data[i].house_id,title:data[i].descript,price: data[i].price
                    })
                  }else if(data[i].flag == 3){
                    let image=[]
                    for(let j =0;j<data[i].image.length;j++){
                      image.push(data[i].image[j].domain + data[i].image[j].themb_url)
                    }
                    this.houseList.push({
                      number:1, imgUrl:image,houseType:'酒店',color:'#fff',type:data[i].num,perNum:data[i].max_person,house_id:data[i].house_id,title:data[i].descript,price:data[i].price
                    })
                  }
                }
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.get_activity()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })

        },
        reduceNum(item,index){
          if(item.number >1){
            item.number -= 1
            this.allPrice -= parseInt(item.price) 
          }else{
            this.$message({
              type:'info',
              message:'最少预定1个房间!'
            })
          }
        },
        addNum(item,index){
          if(item.number <item.type){
            item.number +=1
            this.allPrice += parseInt(item.price) 
          }else{
            this.$message({
              type: 'info',
              message:'已超过房间数，请选择其他房源！'
            })
          }
        },
        prev(){
          if(this.pageIndex >4){
            this.pageIndex -= 1
            this.left -= 105
          }else if(this.pageIndex >0){
            this.pageIndex -= 1
          }
        },
        next(){
          if(this.pageIndex < this.imgList.length-1){
            this.pageIndex += 1
            if(this.pageIndex > 4){
              this.left -= 105
            }
          }
        },
        closeLook(){
          this.lookImage = false
          this.pageIndex =0
        }
      },
      mounted(){
        this.activeId = this.$route.query.activeId
        this.slot_id = this.$route.query.slot_id
        console.log(this.slot_id)
        this.get_activity()
      },
      created(){
          this.chooseTime = this.$route.query.chooseTime
      },
    }
</script>

<style scoped>
.width{
  width:180px;
  line-height: 80px;
}
</style>
