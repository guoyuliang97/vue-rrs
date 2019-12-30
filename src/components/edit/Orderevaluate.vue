<template>
    <div v-if="activeDate" style="background-color: #fff;text-align: left;padding:20px;">
      <div style="display: flex;justify-content: space-between;line-height: 40px;">
        <p>已完成订单&gt;立即评价</p>
        <el-button icon="el-icon-arrow-left" @click="goBack" circle></el-button>
      </div>
      <div v-if="isComment">
        <div style="margin-top:15px;background-color: #FBFBFB;padding:20px;">
          <div style="display: flex;justify-content: flex-start">
            <LoadingImg type="2" :src="activeDate.cover?activeDate.cover.domain + activeDate.cover.image_url:''" style="width:200px;height:150px;overflow: hidden"></LoadingImg>
            <div style="margin-left:15px;">
              {{activeDate.title}}
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:30px;">
            <div style="font-weight: bold">
              您的评分
            </div>
            <div style="margin-left:18px;">
              <el-rate
                v-model="score"
                show-score
                :colors="['#008489', '#008489', '#008489']"
                score-template="{value}分">
              </el-rate>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:30px;">
            <div style="font-weight: bold">
              您的晒图
            </div>
            <div style="margin-left:18px;">
              <el-upload
                :action="api + '/home/Upload/upload'"
                :data="tokenData"
                multiple
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="uploadSucess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start;margin-top:30px;">
            <div style="font-weight: bold">
              您的评价
            </div>
            <div style="margin-left:18px;width:400px;">
              <el-input type="textarea" v-model="content" :autosize="{minRows:5}" placeholder="写点什么吧，您的评价对策划者很有帮助的"></el-input>
            </div>
          </div>
        </div>
        <div style="margin-top:20px;padding-left:100px;">
          <el-button type="primary" style="width:200px;" @click="saveComent">发表评论</el-button>
        </div>
      </div>
      <div v-if="!isComment"  style="margin-top:15px;background-color: #FBFBFB;text-align: center;padding: 100px 0;">
        <div style="display: flex;justify-content: center">
          <div style="width:30px;height:30px;border-radius: 50%;background-color: #008489;color:#fff;font-size:30px;">
            <i class="el-icon-check"></i>
          </div>
          <div style="margin-left:10px;line-height: 30px;">
            评价成功
          </div>
        </div>
        <div style="margin-top:15px;font-size:12px;color:#999999">您的评价将会显示在该体验活动的评论列表</div>
      </div>
    </div>
</template>

<script>
  import LoadingImg from '../../public/loadingImg'
    export default {
        name: "Orderevaluate",
      data(){
          return{
            api:this.GLOBAL.baseURL,
            score:0,
            dialogImageUrl: '',
            dialogVisible: false,
            tokenData:{
             token: localStorage.getItem('token')
            },
            order_id:"",
            content:'',
            activeDate:[],
            cover_image:[],
            isComment:true,
          }
      },
      components:{
        LoadingImg
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        uploadSucess(res){
          this.cover_image.push({image_id:res.data.image_id})
        },
        handleRemove(file, fileList) {
          for(let i = 0; i< this.cover_image.length;i++){
            if(this.cover_image[i].image_id == file.response.data.image_id){
              this.cover_image.splice(i,1)
            }
          }
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        saveComent(){
          if(!this.score){
            this.$message({
              type: 'info',
              message: '还没有评分呢!'
            })
          }else{
            this.$http.post(this.api + '/CommentS',{
              token: localStorage.getItem('token'),
              flag: 1,
              table_id: this.activeDate.activity_id,
              content: this.content,
              score:this.score,
              image:this.cover_image,
              order_id:this.order_id
            })
              .then(res=>{
                if(res.data.code == 1){
                  this.$message({
                    type: 'success',
                    message:'评论成功!'
                  })
                  this.isComment = false
                }else if(res.data.code == 3){
                  this.$http.post(this.api + '/home/index/token')
                    .then(res=>{
                      localStorage.setItem('token',res.data.data)
                      this.saveComent()
                    })
                }else if(res.data.code == 0){
                  alert(res.data.msg)
                }
              })
          }
        },
        getActive(){
          this.$http.post(this.api + '/OrderD',{
            token: localStorage.getItem('token'),
            order_id: this.order_id
          })
            .then(res=>{
              if(res.data.code == 1){
                this.activeDate = res.data.data
              }else if(res.data.code == 3){
                this.$http.post(this.api + '/home/index/token')
                  .then(res=>{
                   localStorage.setItem('token',res.data.data)
                   this.getActive()
                  })
              }else if(res.data.code == 0){
                alert(res.data.msg)
              }
            })
        }
      },
      mounted(){
          this.getActive()
      },
      created(){
          this.order_id = this.$route.query.order_id
      },
      destroyed() {
          localStorage.removeItem('dis')
      }
    }
</script>

<style scoped>

</style>
