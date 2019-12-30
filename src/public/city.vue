<template>
    <div>
      <div v-if="type == '1'" style="display: flex;justify-content: flex-start">
        <el-select v-model="selectCountry" @change="sendCountry"  filterable clearable  placeholder="请选择国家" >
          <el-option
            v-for="(item,index) in countryList "
            v-show="index<1"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
        <el-select v-model="selectProvince" style="margin-left:10px;" @change="sendProvince" @focus="province" filterable clearable  placeholder="请选择省份" :disabled="selectCountry === ''? true:false">
          <el-option
            v-for="(item,index) in provinceList"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
        <el-select v-model="selectCity" style="margin-left:10px;" @change="sendCity"  @focus="city" placeholder="请选择市区" filterable clearable  :disabled="selectProvince === ''? true:false">
          <el-option
            v-for="(item,index) in cityList"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
        <el-select v-model="selectXian" style="margin-left:10px;" @change="sendXian"  @focus="xian" placeholder="请选择县" filterable clearable  :disabled="selectCity === ''? true:false" >
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
         <el-select v-model="selectCountry" @change="sendCountry" style="width:270px;" filterable clearable  placeholder="请选择国家"  >
           <el-option
             v-for="(item,index) in countryList "
             v-show="index<1"
             :key="index"
             :label="item"
             :value="index">
           </el-option>
         </el-select>
       </div>
       <div class="adress">
         <p>州/省/郡/区：</p>
         <el-select v-model="selectProvince" @change="sendProvince" style="width:270px;" @focus="province" filterable clearable  placeholder="请选择省份"   :disabled="selectCountry === ''? true:false">
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
        <el-select v-model="selectCity" @change="sendCity"  @focus="city" style="width:270px;" placeholder="请选择市区" filterable clearable  :disabled="cityList === ''? true:false">
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
        <el-select v-model="selectXian" @change="sendXian"  @focus="xian" style="width:270px;" placeholder="请选择县" filterable clearable   :disabled="xianList === ''? true:false" >
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
  import test from '../../static/js/worldRegion.js'
    export default {
      name: "city",
      props:['type'],
      data() {
        return {
          selectProvince: '',
          selectCity: '',
          selectCountry: '',
          selectXian: '',
          provinceList: [],
          cityList: [],
          xianList: [],
          selectList: [],
          countryList: [],
        }
      },
      methods: {
        country() {
          let CountryList = this.selectList[0].Location.CountryRegion
          for (let i = 0; i < CountryList.length; i++) {
            this.countryList.push(CountryList[i]['-Name'])
          }
        },
        province() {
          let C = this.selectCountry
          let CountryList = this.selectList[0].Location.CountryRegion
          if(CountryList[C].State){
              this.selectCity = ''
            let province = CountryList[C].State.length>1? CountryList[C].State : CountryList[C].State.City
            let a = []
            for (let i = 0; i < province.length; i++) {
              a.push(province[i]['-Name'])
            }
            this.provinceList = a
          }else{
            this.provinceList = []
          
          }
        },
      city() {
        let C = this.selectCountry
        let P = this.selectProvince
        let CountryList = this.selectList[0].Location.CountryRegion
        if (CountryList[C].State.length>1) {
          if (this.provinceList[P] == '上海' || this.provinceList[P] == '重庆' || this.provinceList[P] == '北京' || this.provinceList[P] == '天津') {
            this.cityList =[this.provinceList[P]]
               this.selectXian = ''
          } else{
            this.selectXian = ''
            let a = []
            for (let i = 0; i < CountryList[C].State[P].City.length; i++) {
              a.push(CountryList[C].State[P].City[i]['-Name'])
            }
            this.cityList = a
          }
        } else {

        }
      },
      xian() {
        let C = this.selectCountry
        let P = this.selectProvince
        let CountryList = this.selectList[0].Location.CountryRegion
        if (CountryList[C].State.length>1) {
          if (this.provinceList[P] == '上海' || this.provinceList[P] == '重庆' || this.provinceList[P] == '北京' || this.provinceList[P] == '天津') {
            let a = []
            for(let i = 0;i< CountryList[C].State[P].City.length;i++){
              a.push(CountryList[C].State[P].City[i]['-Name'])
            }
            this.xianList = a
          } else if( CountryList[C].State[P].City[this.selectCity].Region){
            let a = []
            for(let i = 0;i< CountryList[C].State[P].City[this.selectCity].Region.length;i++){
              a.push(CountryList[C].State[P].City[this.selectCity].Region[i]['-Name'])
            }
            this.xianList = a
          }else{
            this.xianList = []
          }
        }
        this.$emit('checkXian',this.xianList)
      },
        sendCountry(){
          this.$emit('selectCountry',[this.selectCountry,this.countryList[this.selectCountry]])
        },
        sendProvince(){

          this.$emit('selectProvince',[this.selectProvince,this.provinceList[this.selectProvince]])
        },
        sendCity(){
          this.$emit('selectCity',[this.selectCity,this.cityList[this.selectCity]])

        },
        sendXian(){

          this.$emit('selectXian',[this.selectXian,this.xianList[this.selectXian]])
        }
      },
      mounted() {
          this.selectList = test()
        this.country()
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
