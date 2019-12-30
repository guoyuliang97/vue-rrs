<template>
    <div>
      <div v-for="(item,index) in friendList" style="text-align:left;margin-bottom:20px;border-bottom: 1px solid #eee">
        <Person type="9" :imgUrl="item.imgUrl" v-on:toPerson="toPerson(item,index)" :name="item.name?item.name:'匿名用户'"  :content="item.content" :activeIndex="item.activeIndex" :isShow="item.isShow" v-on:agree="agree(item,index)" v-on:refuse="refuse(item,index)" v-on:ignore="ignore(item,index)"></Person>
      </div>
      <None v-if="!friendList.length" type="message"></None>
      <div style="margin:20px 0;text-align: center">
        <el-pagination  @current-change="handleCurrentChange"  :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
      <div v-if="isLoading" style="position: fixed;top:0;left:0;right:0;bottom:0;z-index:999;background-color: rgba(255,255,255,.8);display: flex;justify-content: center;align-items: center">
        <Loading></Loading>
      </div>
    </div>
</template>

<script>
  import Loading from '../../public/Loading'
  import None from '../../public/noNumber'
  import Person from '../../public/person'
  import Bus from '../../assets/eventBus'
    export default {
      name: "friendsNotice",
      data() {
        return {
          api: this.GLOBAL.baseURL,
          friendList: [],
          noThing:'',
          total:0,
          isLoading:false
        }
      },
      components: {
        Person,
        None,
        Loading
      },
      methods: {
        handleCurrentChange(val){
          this.getFrideng(val)
        },
        agree(item,index) {
          this.$http.post(this.api + '/home/Friend/agree',{
            token: localStorage.getItem('token'),
            notice_id: item.notice_id,
            status : 1
          })
            .then(res=>{
              if(res.data.code == 1){

                item.isShow = !item.isShow
                item.activeIndex = 1
              }else if(res.data.code == 3){
                alert(res.data.msg)
              }else{
                alert(res.data.msg)
              }
            })
        },
        refuse(item,index){
          this.$http.post(this.api + '/home/Friend/agree',{
            token: localStorage.getItem('token'),
            notice_id: item.notice_id,
            status : 2
          })
            .then(res=>{
              if(res.data.code == 1){

                item.isShow = !item.isShow
                item.activeIndex = 2
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.refuse(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        ignore(item,index){
          this.$http.post(this.api + '/home/Friend/agree',{
            token: localStorage.getItem('token'),
            notice_id: item.notice_id,
            status : 3
          })
            .then(res=>{
              if(res.data.code == 1){

                item.isShow = !item.isShow
                this.friendList.splice(index,1)
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.ignore(item,index)
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        },
        toPerson(item,index){
          this.$router.push({
            path: '/userdata',
            query: {
              information: item.userId
            }
          })
        },
        getFrideng(val){
          this.isLoading = true
          this.$http.post(this.api + '/home/Friend/getlist',{
            token: localStorage.getItem('token'),
            page: val
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data.data
                if(data.length){
                  var a = []
                  for(let i =0;i<data.length;i++){
                    let userImg = ''
                    if(data[i].fuser.head_image){
                      userImg = data[i].fuser.headimage.domain + data[i].fuser.headimage.image_url
                    }else{
                      userImg = '../../../static/img/static/user.png'
                    }
                    if(data[i].status == 0){
                      a.push({
                        imgUrl:userImg,
                        name: data[i].fuser.family_name + data[i].fuser.middle_name + data[i].fuser.name,
                        content: data[i].msg,
                        isShow: true,
                        userId: data[i].fuser.user_id,
                        activeIndex:	data[i].status,
                        notice_id: data[i].notice_id
                      })
                    }else{
                      a.push({
                        imgUrl:userImg,
                        name: data[i].fuser.family_name + data[i].fuser.middle_name + data[i].fuser.name,
                        content: data[i].msg,
                        isShow: false,
                        userId: data[i].fuser.user_id,
                        activeIndex:	data[i].status,
                        notice_id: data[i].notice_id
                      })
                    }
                  }
                  this.friendList = a
                }else{
                  this.noThing = '暂无数据'
                }
                this.isLoading = false
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                    localStorage.setItem('token',res.data.data)
                    this.getFrideng(val)
                  })
              }else if(res.data.code == 0){
                this.isLoading = false
                alert(res.data.msg)
              }
            })
        }
      },
      mounted() {
        let _this = this
        _this.getFrideng(1)
      }
    }
</script>

<style scoped>

</style>
