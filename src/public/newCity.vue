<template>
   <div>
     <div v-if="type=='1'">
       <el-select v-model="selectCountry" @change="country" placeholder="请选择国家" style="width:150px">
         <el-option
           v-for="(item,index) in countryList"
           :key="index"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
       <el-select v-model="selectProvince" @change="province" placeholder="请选择省份" style="width:150px" @focus="select" :disabled="provinceList == ''? true:false">
         <el-option
           v-for="(item,index) in provinceList"
           :key="index"
           :label="item"
           :value="index">
         </el-option>
       </el-select>
       <el-select v-model="selectCity" @change="city" placeholder="请选择市区" @focus="select2" style="width:150px" :disabled="cityList == ''? true:false">
         <el-option
           v-for="(item,index) in cityList"
           :key="index"
           :label="item"
           :value="index">
         </el-option>
       </el-select>
       <el-select v-model="selectXian" @change="xian" placeholder="请选择县" :disabled="xianList == ''? true:false" style="width:150px">
         <el-option
           v-for="(item,index) in xianList"
           :key="index"
           :label="item"
           :value="index">
         </el-option>
       </el-select>
     </div>

     <div v-if="type=='2'">
       <div class="adress">
         <p>国家/地区：</p>
         <el-select v-model="selectCountry" @change="country" placeholder="请选择国家" style="width:270px">
           <el-option
             v-for="(item,index) in countryList"
             :key="index"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
       <div class="adress">
         <p>州/省/郡/区：</p>
         <el-select v-model="selectProvince" @change="province" placeholder="请选择省份" style="width:270px" @focus="select" :disabled="provinceList == ''? true:false">
           <el-option
             v-for="(item,index) in provinceList"
             :key="index"
             :label="item"
             :value="index">
           </el-option>
         </el-select>
       </div>
        <div class="adress">
          <p>市/镇/区:</p>
          <el-select v-model="selectCity" @change="city" placeholder="请选择市区" @focus="select2" style="width:270px" :disabled="cityList == ''? true:false">
            <el-option
              v-for="(item,index) in cityList"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </div>
       <div class="adress">
         <p>区:</p>
         <el-select v-model="selectXian" @change="xian" placeholder="请选择县" :disabled="xianList == ''? true:false" style="width:270px">
           <el-option
             v-for="(item,index) in xianList"
             :key="index"
             :label="item"
             :value="index">
           </el-option>
         </el-select>
       </div>
     </div>
   </div>
</template>

<script>
import test from '../../static/js/address.js'
    export default {
        name: "newCity",
      props:['type'],
      data(){
          return{
            selectProvince:'',
            selectCity:'',
            selectCountry:'',
            selectXian:'',
            provinceList:[],
            cityList:[],
            xianList:[],
            selectList:[],
            countryList:[
              {value:0,label:'中国'},
              {value:1,label:'日本'},
              {value:2,label:'美国'}
            ],
          }
      },
      methods:{
        select(){
          this.selectCity = ''
          this.selectXian = ''
          this.selectProvince=''
          if(this.selectCountry == 0){
            let a = []
            for(let i = 0;i< this.selectList.length;i++){
              a.push(this.selectList[i].name)
            }
            this.provinceList = a
          }else{
            this.cityList = []
            this.provinceList = []
            this.xianList = []
          }

        },
        getCity(){
          let a = this.selectProvince
          let c = []
          for(let i = 0;i<this.selectList.length;i++){
            if(i == a){
              for(let j =0;j<this.selectList[i].cityList.length;j++){
               c.push( this.selectList[i].cityList[j].name)
              }
            }
          }
          this.cityList = c
        },
        getXian(){
          let a = this.selectProvince
          let b = this.selectCity
          let c = []
          for(let i = 0;i<this.selectList.length;i++){
            if(i == a){
              for(let j =0;j<this.selectList[i].cityList.length;j++){
                c.push( this.selectList[i].cityList[j].areaList)
                for(let m =0;m<c.length;m++){
                  if(m == b){
                    this.xianList = c[m]
                  }
                }
              }
            }
          }

        },
        select2(){
          this.selectXian = ''
        },
        country(){
          this.$emit('selectCountry',[this.selectCountry,this.countryList[this.selectCountry].label])
        },
        province(){

          this.$emit('selectProvince',[this.selectProvince,this.selectList[this.selectProvince].name])
        },
        city(){
          this.$emit('selectCity',[this.selectCity,this.cityList[this.selectCity]])
        },
        xian(){
          this.$emit('selectXian',[this.selectXian,this.xianList[this.selectXian]])
        }
      },
      created(){
      this.selectList = test()
      },
      watch:{
        selectCountry:'select',
        selectProvince:'getCity',
        selectCity:'getXian'
      },
    }
</script>

<style scoped>
.adress{
  display: flex;
  justify-content: space-between;
  width:100%;
  margin:20px 0;
  line-height:40px;
  font-size:14px;
}
</style>
