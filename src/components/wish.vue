<template>
    <div>
      <el-container>
        <el-header>
          <Head type="wish"></Head>
        </el-header>
        <el-main>
          <div style="margin:20px auto;width:1080px;text-align:left">
          <div style="display: flex;justify-content: space-between">
            <div style="font-size:30px;font-weight:bold;">心愿单</div>
            <el-button style="color:#008489;font-weight:bold;font-size:15px;cursor: pointer" @click="createWish">创建心愿单</el-button>
          </div>
          <hr style="border:1px  solid #eee;margin:20px 0;">
          <div v-if="wishList.length" style="text-align: right"><span style="color:#008489;cursor: pointer" @click="deelList">{{cancel}}</span></div>
          <div style="display: flex;flex-wrap: wrap">
            <div class="wishMargin" v-for="(item,index) in wishList" style="position:relative;width:330px;height:250px;cursor: pointer;border-radius: 10px;overflow: hidden" :style="{'background-color':item.cover == ''? 'rgba(0,0,0,.8)':''}">
              <div @click="toList(item,index)" style="width:330px;height:250px;overflow: hidden">
                <loadingImg type="3" :src="item.cover.domain + item.cover.image_url" style="width:330px;height:250px;"  v-show="item.cover == ''? false:true"></loadingImg>
              </div>
              <div style="position:absolute;bottom:10px;left:10px;display: flex;justify-content: space-between;width:90%;">
                <div>
                  <span style="color:#FFF;font-weight: bold">{{item.group_name}}</span><br>
                  <span style="color:#fff;font-weight:bold">{{item.count}}个心愿</span>
                </div>
                <div>
                  <i @click="toRename(item,index)" style="color:#fff;" class="el-icon-edit"></i>
                </div>
              </div>
              <div v-show="deelIndex" class="animated fadeIn" @click="deel(item,index)" style="width:25px;height:25px;font-size:25px;position:absolute;top:10px;right:10px;color:#fff">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
            <div v-if="isXin" >
              <None type="xin"></None>
            </div>
          <Foot></Foot>
        </div>
        </el-main>
      </el-container>
      <Bounced v-show="isCreate" type="create" v-on:saveWish="saveWish" v-on:closeCreat="closeCreat" :wishCreate="wishCreate" ></Bounced>
      <div v-if="isRena" style="position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(0,0,0,.5);display: flex;justify-content: center;align-items: center;z-index:999">
         <div style="width:400px;padding: 20px;border-radius: 10px;background-color: #fff;z-index:999">
           <h3>修改心愿单</h3>
           <div style="margin: 20px 0;text-align: left">
             <div><b>修改心愿单名称</b>:</div>
             <el-input style="width:100%;margin-top:20px;" v-model="reName" placeholder="输入新名称"></el-input>
           </div>
           <div style="margin: 20px 0;text-align: left">
             <div> <b>隐私设置</b>:</div>
             <el-select v-model="newChoose" clearable placeholder="请选择" style="width:100%;margin-top:20px;">
               <el-option style="width:100%;" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
             </el-select>
           </div>
           <div style="display: flex;justify-content: space-between">
             <el-button @click="abolishName">取消</el-button>
             <el-button @click="reNameCheck">确定</el-button>
           </div>
         </div>
      </div>
    </div>
</template>
<script>
  import Bounced from '../public/bounced.vue'
  import Foot from "../public/foot.vue"
  import Detail from "../public/detail.vue"
  import Head from "../public/head.vue"
  import None from '../public/noNumber'
  import loadingImg from '../public/loadingImg'
     export default {
        name: "wish",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            isCreate:false,
            wishCreate:{
              wishCreat:'',
              wishChoose:'',
            },
            wishList:[],
            deelIndex:false,
            cancel:'删除',
            isXin: false,
            reName:'',
            newChoose:'',
            options:[
              {value:0,label:'共享'},
              {value:1,label:'私密'}
            ],
            isRena:false,
            group_id:''
          }
      },
      components:{
          Head,
        Detail,
        Foot,
        Bounced,
        None,
        loadingImg
      },
      methods:{
        createWish(){
          this.isCreate = true
        },
        closeCreat(){
          this.isCreate = false
        },
        saveWish(){
          if(this.wishCreate.wishCreat == ''||this.wishCreate.wishCreat.split(' ').join('').length == 0){
            this.$message({
              type: 'error',
              message: '保存心愿单失败'
            })
          }else{
            this.$http.post(this.api + '/home/Comment/add_collegroup',{
              token: localStorage.getItem('token'),
              group_name: this.wishCreate.wishCreat,
              hide: this.wishCreate.wishChoose
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.getGroup()
                  this.wishCreate.wishCreat = ''
                  this.wishCreate.wishChoose = ''
                  this.isCreate = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.saveWish()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }

        },
        toList(item,index){
          this.$router.push({
            path: '/wishPage',
            query:{
              group_id: item.group_id,
              name: item.group_name
            }
          })
        },
        deel(item,index){
          this.$http.post(this.api + '/GroupD',{
            token:localStorage.getItem('token'),
            group_id: item.group_id,
          })
            .then(res=>{
              if(res.data.code == 1){
                this.wishList.splice(index,1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.deel(item,index)
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        deelList(){
          this.deelIndex = !this.deelIndex
        },
        getGroup(){
          this.$http.post(this.api + '/home/Comment/collegroup_list',{
            token: localStorage.getItem('token')
          })
            .then(res=>{
              if(res.data.code == 1){
                if(res.data.data.length){
                  this.isXin = false
                }else{
                  this.isXin = true
                }
                this.wishList = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getGroup()
                  })
              }else{
                alert(res.data.msg)
              }
            })
        },
        toRename(item,index){
          console.log(item,index)
          this.group_id = item.group_id
          this.isRena = true
        },
        abolishName(){
          this.isRena = false
          this.reName = ''
          this.newChoose = ''
        },
        reNameCheck(){
          this.$http.post(this.api + '/home/Comment/add_collegroup',{
            token: localStorage.getItem('token'),
            group_id: this.group_id,
            group_name: this.reName,
            hide: this.newChoose
          })
            .then(res=>{
              if(res.data.code == 1){
                this.isRena = false
                this.reName = ''
                this.newChoose = ''
                this.$message({
                  type: 'success',
                  message:'修改成功！'
                })
                this.getGroup()
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.reNameCheck()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      watch:{
        deelIndex:function(){
          if(this.deelIndex == true){
            this.cancel = '取消'
          }else{
            this.cancel = '删除'
          }
        }
      },
      mounted() {
          let _this = this
        this.getGroup();
      }
    }
</script>

<style scoped>
.wishMargin{
  margin-top:20px
}
.wishMargin:nth-child(3n-1){
  margin-left:30px;
  margin-right:30px;
}
</style>
