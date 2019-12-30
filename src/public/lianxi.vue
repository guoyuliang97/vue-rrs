<template>
    <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="api + '/home/Upload/upload_many'"
        list-type="picture-card"
        :on-change="handleSuccess"
        :on-success="asd"
        :data="data"
        multiple
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="asdasd">上传到服务器</el-button>
      <div v-for="(item,index) in aa" v-dragging="{ item: item, list: aa, group: 'item' }">
        <img :src="item.url" width="150px" height="150px">
      </div>
    </div>
</template>

<script>
    export default {
        name: "lianxi",
      data(){
          return{
            api: this.GLOBAL.baseURL,
            fileList:[],
            aa:[],
            data:{
              token: localStorage.getItem('token')
            }
          }
      },
      methods: {
        asd(res,file){
          this.fileList.push(file)
        },
        handleProgress(file){
        },
        asdasd(){
          this.$refs.upload.submit()
         /* console.log(this.aa)
          let a = []
          const formData = new FormData()
          for(let i = 0; i< this.aa.length;i++){
            a.push(this.aa[i].raw)
          }
          console.log(a)
          formData.append('file',a)
          formData.append('token',localStorage.getItem('token'))
          this.$http.post(this.api + '/home/Upload/upload_many',formData)
            .then(res=>{
              if(res.data.code == 1){
                console.log(res)
              }else{
                alert(res.data.msg)
              }
            })
            .catch(error=>{
              alert(error)
            })*/
        },
        hangdle(file){
         /* console.log(file)
          const formData = new FormData()
          formData.append('file',file.file)
          formData.append('token',localStorage.getItem('token'))
          let data = this.data.token
          this.$http.post(this.api + '/home/Upload/upload_many',formData)
            .then(res=>{
              if(res.data.code == 1){
                console.log(res)
              }else{
                alert(res.data.msg)
              }
            })
            .catch(error=>{
              alert(error)
            })*/
        },
        handleRemove(res,file, fileList) {

        },
        handlePreview(file) {

        },
        handleSuccess(file, fileList){
            const isJPG = file.raw.type === 'image/jpeg';
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
              fileList.pop()
            }
            let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
            if (existFile) {
              this.$message.error('当前文件已经存在!');
              fileList.pop()
            }
            this.aa.push(file)

        },

      },
      watch:{
        fileList:function(){

        }
      },
      mounted() {
        this.$dragging.$on('dragged', (val) => {
          //这里我们不需要做任何操作；组件内部会把我们绑定上去的list自动排序;只需要查看结果就可以
          //如果需要在这里进行其他操作，可以查看val的内容，包括：拖动的元素，拖动后与之兑换的元素，以及原始数据和拖动组名
        })
        this.$dragging.$on('dragend', (val) => {

        })
      }
    }
</script>

<style scoped>

</style>
