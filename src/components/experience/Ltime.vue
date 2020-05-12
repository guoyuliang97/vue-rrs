<template>
    <div style="line-height:40px;" class="flexBetween">
      <div>
        <div v-if="XG" class="flexBetween" style="margin:20px 0;background-color: #eee;padding: 0 10px">
          <p>*您正在修改已创建<span style="color:#CA1425">{{longTime[0]}}—{{longTime[1]}}</span>的活动时间</p>
          <p @click="abiosh" style="color:#CA1425;cursor: pointer;">取消</p>
        </div>
        <h2>介绍活动举办的时间</h2>
        <div class="block" >
          <p style="margin-right: 20px;"><b>举办活动时间段:</b></p>
          <el-date-picker
             @change = 'chooseTime'
            v-model="longTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div v-show="allTimeL.length" >
           <span style="margin-right: 10px;"><b>已选活动时间段:</b></span>
            <div style="max-width:450px;">
              <el-button @click="deletTime(item,index)"  v-for="(item,index) in allTimeL" size='mini' icon="el-icon-delete">{{item.begin_date}}——{{item.end_date}}</el-button>
            </div>
        </div>
        <div style="margin:20px 0;">
          <p ><b>活动开始和结束时间:</b></p>
          <div style="display: flex;justify-content: flex-start">
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45'
            }">
            </el-time-select>
            <el-time-select style="margin-left:20px;"
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
            }">
            </el-time-select>
          </div>
          <span class="mainColor" style="font-size:12px">（小贴士：第一天和最后一天）</span>
        </div>
        <div style="margin:20px 0">
          <span style="margin: 20px 0;"><b>活动参加人数:</b></span>
          <el-input type="text" v-model="personNum"  style="width:200px;" placeholder="请输入人数"></el-input>
        </div>

        <!-- 第二版本新增 -->

        <!-- 设置优惠 -->
        <div>
          <p><b>优惠设置<span style="color:#999">(可多选)</span></b></p>
          <div style="position:relative;margin-bottom: 20px;">
            <el-checkbox-group style="text-color: #14c5ce !important" @change="checkDiscount"   v-model="discountChose">
              <el-checkbox  label="1">设置折扣价</el-checkbox>
              <el-checkbox label="2">设置亲子套餐</el-checkbox>
              <el-checkbox label="3">设置综合套餐</el-checkbox>
            </el-checkbox-group>
            <!-- 查看显示 -->
            <div class="flexStart contentTitle positionTop">
              <div class="check1 sizeCheck"  v-show="isShow('1')" :style="{'color': '1' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(1)" >
                (查看
                <i :class="{'el-icon-arrow-up':'1' != clickCheck,'el-icon-arrow-down': '1' == clickCheck}"></i>)
              </div>
              <div class="check2 sizeCheck"  v-show="isShow('2')" :style="{'color': '2' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(2)" >
                (查看
                <i :class="{'el-icon-arrow-up':'2' != clickCheck,'el-icon-arrow-down': '2' == clickCheck}"></i>)
              </div>
              <div class="check3 sizeCheck"  v-show="isShow('3')" :style="{'color': '3' == clickCheck?'#14c5ca':'#000'}" @click="changeCheck(3)" >
                (查看
                <i :class="{'el-icon-arrow-up':'3' != clickCheck,'el-icon-arrow-down': '3' == clickCheck}"></i>)
              </div>
            </div>
          </div>
          
          <!-- 设置折扣价 -->
          <div v-show="choseLook == 1" :v-model="zkCombo">
          
            <div class="flexStart " >
              <span class="contentTitle">标准原价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="zkCombo.oldPrice"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <span class="contentTitle marginLeft">折扣:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="zkCombo.discount"  placeholder="请输入折扣" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle">折</span>
              <div>
                <span class="contentTitle marginLeft">折扣价:{{disprice}}元</span>
              </div>
            </div>
            <div class="flexStart">
              <span class="contentTitle">儿童原价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="zkCombo.oldChildPrice"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <span class="contentTitle marginLeft">折扣:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="zkCombo.childDiscount"  placeholder="请输入折扣" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle">折</span>
              <div>
                <span class="contentTitle marginLeft">折扣价:{{childDisprice}}元</span>
              </div>
            </div>
          </div>
          <!-- 设置亲子套餐 -->
          <div v-show="choseLook == 2">
            <div v-show="isCreate()" class="contentTitle">
              <span @click="getCombine('1',isQzCombine)" style="cursor:pointer" :style="{'color': isQzCombine?'#999':'#14c5ca'}">
              <i class="el-icon-plus"></i>
                使用您创建过的亲子套餐
              </span> 
            </div>
            <div class="flexStart" v-for="(item,index) in pcCombo">
              <span class="contentTitle">成人人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.adult"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">儿童人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.kids"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="item.price"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <div @click="delteQzCombo(item,index)" class="circle"><i class="el-icon-close"></i></div>
            </div>
              <el-button @click="addCombo('2')" icon="el-icon-plus">增加亲子套餐</el-button>
          </div>
          <!-- 设置综合套餐价格 -->
          <div v-show="choseLook == 3">
            <div v-show="isZhCombine()" class="contentTitle">
              <span @click="getCombine('2',iszhCombo)" style="cursor:pointer" :style="{'color': iszhCombo?'#999':'#14c5ca'}">
              <i class="el-icon-plus"></i>
                使用您创建过的综合套餐
              </span> 
            </div>
            <div class="flexStart" v-for="(item,index) in zhCombo">
                <span class="contentTitle"> 套餐名称:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.name"  placeholder="请输入名称" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐人数:</span>
              <div class="inputBorder" style="height:40px;">
                <input type="text" v-model="item.adult"  placeholder="请输入人数" style="padding-left:10px;width:100px;border:none;paading-left: 10px;">
              </div>
              <span class="contentTitle marginLeft">套餐价:</span>
              <div class="inputBorder flexStart">
                <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
                <input type="text" v-model="item.price"  placeholder="请输入价格"  style="width:100px;border:none;padding-left:10px">
              </div>
              <div @click="delteZhCombo(item,index)" class="circle"><i class="el-icon-close"></i></div>
            </div>
            <el-button @click="addCombo('3')" icon="el-icon-plus">增加综合套餐</el-button>
          </div>
        </div>
        <div v-show="isPrice">
          <p><b>设置价格：</b></p>
          <div class="flexStart">
            <span class="contentTitle">标准价格:</span>
            <div class="inputBorder flexStart">
              <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
              <input type="text" v-model="bzPrice"  placeholder="请输入价格" style="width:200px;border:none;font-size:15px;padding-left:10px">
            </div>
          </div>
          <div class="flexStart">
            <span class="contentTitle">儿童价格:</span>
            <div class="inputBorder flexStart">
              <div class="contentTitle" style="padding: 0 10px;border-right:1px solid #eee">APY(人民币)</div>
              <input type="text" v-model="etPrice"  placeholder="请输入价格" style="width:200px;border:none;font-size:15px;padding-left:10px">
            </div>
          </div>
        </div>

        <!-- 存档活动 -->
        <div style="margin: 20px 0;">
          <el-button icon="el-icon-plus" @click="addTime">{{XG?'保存修改时间':'增加活动时间段'}}</el-button>
        </div>


        <div v-show="timeNumber.length">
          <div class="timeList" v-for="(item,index) in timeNumber">
            <div>
              <div><span>活动时间段：</span>{{item.begin_date}}——{{item.end_date}}</div>
              <div><span>开始时间和结束时间：</span>{{item.begin_time}} - {{item.end_time}}</div>
              <div><span>活动人数：</span>{{item.max_person_num}}</div>
              <div v-if="item.kind == '2'">
                <span>活动价格：</span>
                标准价格&nbsp;￥{{item.price[0]}} 
                <span class="marginLeft">儿童价格&nbsp;￥{{item.price[1]}}</span>
              </div>
              <div v-if="item.kind == '1'">
                <span>活动价格：</span>
                标准&nbsp;￥{{item.price.disprice}}
                <span class="marginLeft">{{item.price.discount}}折</span>
                <span class="marginLeft">原价￥{{item.price.oldPrice}}</span>
                <span class="marginLeft"></span> 
                <span class="marginLeft">儿童&nbsp;￥{{item.price.childDisprice}}</span> 
                <span class="marginLeft">{{item.price.childDiscount}}折</span>
                <span class="marginLeft">原价￥{{item.price.oldChildPrice}}</span> 
              </div>
              <div v-if="item.qzCombo.length" class="flexStart" >
                  <div>亲子套餐：</div>
                  <div class="flexWrap">
                    <div class="marginRight " v-for="(v,i) in item.qzCombo"><span>{{v.adult}}成人{{v.kids}}儿童</span> <span>￥{{v.price}}</span> </div>
                  </div>
              </div>
              <div v-if="item.zhCombo.length" class="flexStart" >
                  <div>综合套餐：</div>
                  <div class="flexWrap">
                    <div class="marginRight " v-for="(v,i) in item.zhCombo"><span>{{v.name}}{{v.adult}}人</span> <span>￥{{v.price}}</span> </div>
                  </div>
              </div>
            </div>
          <div class="flexStart">
            <div>
                <el-button tyle="primary" @click="delet(item,index)"  size="mini" plain>删除</el-button>          
            </div>
            <div class="marginLeft">
                <el-button tyle="primary" @click="modification(item,index)" plain size="mini">编辑</el-button>
            </div>
          </div>
          </div>
        </div>

        <!-- 设置反差价 -->
        <div>
          <el-checkbox v-model="chaJia"><b>设置返差价</b></el-checkbox>
          <el-tooltip content="bottom" placement="bottom" effect="light">
            <div slot="content" style="width:300px;line-height:30px;">
              <p class="fontweight">返差价说明：</p>
              <p>1.活动满设置人数且此体验完成结束时，退还用户预付的百分比金额（人数也包含购买套餐的固定人数）</p>
              <p>2.如果设置第二次的人数下限大于上一次人数时，返还比例需大于上一次比例</p>
              <p>3.体验结束时，若没有达到满设置退还人数时，
                  将不会退还金额给用户</p>
              <p>4.退差价的返还金额比例不叠加，默认选择只满
                  足要求的一档返还</p>
              <p class="zhuShi">例子：小王购买了某策划者的体验，此体验参
                  与时间为14:00-18:00，策划者设置此体验满
                  10人参与则退还10%，若此体验在结束时满了
                  10人参与，小王将收到支付的10%的退款。</p>
            </div>
            <i class='el-icon-question' style="color:#999" ></i>
          </el-tooltip>
          <div v-show="chaJia">
            <div class="flexStart" v-for="(item,index) in cjList">
              <div class="flexStart" >
                <span class="contentTitle">满人数:</span>
                <el-input type="text" v-model="item.num" @blur="isCjNum(item,index)" placeholder="输入人数" class="inputStyle"></el-input>
              </div>
              <div class="flexStart marginLeft">
                <span class="contentTitle">退还比例:</span>
                <el-input type="text" v-model="item.refund_rate" @blur="isCjScale(item,index)" placeholder="输入百分比" class="inputStyle"></el-input>
                <span>(%)</span>
              </div>
              <div @click="delteCj(item,index)" class="circle">
                <i class="el-icon-close"></i>
                </div>
            </div>
            <el-button @click="addCombo('1')" icon="el-icon-plus">新增返差价</el-button>
          </div>
        </div>
        <!-- 设置儿童年龄 -->
        <div v-show="isChildren">
          <p class="fontweight">设置儿童价标准</p>
          <div class="inputBorder flexStart" style="width:197px">
            <input @blur="isminOld" type="number" style="width:90px;border:none;text-align: center" v-model="minOld" placeholder="最小年龄">
            至
            <input @blur="ismaxOld" type="number" style="border:none;width:90px;text-align:center" v-model="maxOld" placeholder="最大年龄">
          </div>
        </div>
        <!-- 设置参与者年龄 -->
        <div>
          <p class="fontweight">设置参与者年龄下限</p>
          <div class="inputBorder" style="width:90px">
            <input @blur="isminJoinOld" type="number" style="width:90px;border:none;text-align: center" v-model="minJoinOld" placeholder="最小年龄">
          </div>
        </div>
      
        <div style="margin:20px 0;">
          <el-button type="primary" plain @click="changeRouter">{{complete == '1'?'保存':'下一步'}}</el-button>
        </div>
      </div>
    </div>
</template>

<script>

    export default {
        name: "Ltime",
      props:['active_id','complete'],
      data(){
          return{
            api: this.GLOBAL.baseURL,
            allTimeL:[],
            pickerOptions2: {
              disabledDate:(time)=> {
                if(this.timeNumber.length || this.allTimeL.length){
                  var a = ''
                  for(let i = 0;i<this.timeNumber.length;i++){
                    if(a == true){
                      a == true
                      break
                    }else{
                      a = time.getTime() >= this.parseDate(this.timeNumber[i].begin_date) && time.getTime()<=this.parseDate(this.timeNumber[i].end_date)
                    }
                  }
                   for(let i = 0;i<this.allTimeL.length;i++){
                    if(a == true){
                      a == true
                      break
                    }else{
                      a = time.getTime() >= this.parseDate(this.allTimeL[i].begin_date) && time.getTime()<=this.parseDate(this.allTimeL[i].end_date)
                    }
                  }
                return a || time.getTime() < Date.now() - 8.64e7
                }else{
                  return  time.getTime() < Date.now() - 8.64e7;
                }
              },
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }],
            },
            price:'',
            bzPrice:'',
            etPrice:'',
            money:'',
            timeNumber:[],
            personNum:'',
            startTime:'00:00',
            endTime:'00:15',
            longTime:'',
            madificIndex:'',
            XG:false,
            discountChose:[],
            chaJia:false,
            minOld:'',
            maxOld:'',
            cjList:[
              {
                num:'',
                refund_rate:''
              },
            ],
            zkCombo:{
              oldPrice:'',
              discount:'',
              disprice: '',
              oldChildPrice:'',
              childDiscount:'',
              childDisprice: ''
            },
            pcCombo:[
              {
                adult:'',
                kids:'',
                price:'',
                type: 1  
              }
            ],
            zhCombo:[
              {
                name:'',
                adult:'',
                price:'',
                type: 2  
              }
            ],
            choseLook:'',
            checkList:[
              {name: '查看',witch:'1'},
              {name: '查看',witch:'2'},
              {name: '查看',witch:'3'},
            ],
            clickCheck:'',
            showList:[],
            changeArr:[],
            minJoinOld:'',
            priceReg: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
            reg: /^[1-9]\d*$/,
            isQzCombine:false,
            iszhCombo: false,
            slot_id:'',
          }
      },
      
      watch:{
        
        timeNumber:function(){
          if(this.timeNumber.length){
            this.$emit('notChange','1')
          }else{
            this.$emit('notChange','')
          }
        },
        discountChose(){
          var t = this.discountChose.length
          if(t == 1){
            this.showList = []
            this.choseLook = this.discountChose[0]
          }else if(t == 2){
            this.showList = [this.discountChose[0]]
            this.choseLook = this.discountChose[1]
          }else if(t == 3){
            this.showList = [this.discountChose[0],this.discountChose[1]]
            this.choseLook = this.discountChose[2]
          }else{
            this.choseLook = ''
          }
        },
        disprice:{
          handler(){
              this.zkCombo.disprice = this.disprice
          }
        },
        childDisprice:{
          handler(){
             this.zkCombo.childDisprice = this.childDisprice
          }
         
        },
        
      },
      computed:{
        
        disprice(){
          if(this.zkCombo.oldPrice && this.zkCombo.discount){
            return (this.zkCombo.oldPrice*this.zkCombo.discount*0.1).toFixed(2)
          }else{
            return this.oldPrice
          }
        },
        childDisprice(){
          if(this.zkCombo.oldChildPrice && this.zkCombo.childDiscount){
            return (this.zkCombo.oldChildPrice * this.zkCombo.childDiscount *0.1).toFixed(2)
          }else{
            return this.oldChildPrice
          }
        },
        isChildren(){
          if(this.timeNumber.length){
            for(var i = 0; i< this.timeNumber.length;i++){
              if(this.timeNumber[i].price[1] || this.timeNumber[i].price.childDisprice){
                return true
              }
            }
            return false
          }else if(this.etPrice || this.zkCombo.oldChildPrice){
            return true
          }else{
            return false
          }
        },
        isPrice(){
          if(this.discountChose.indexOf('1') != -1){
            return false
          }else{
            return true
          }
        },
      },
      methods:{
        // 第二版本新增

        deletTime(item,index){
          this.$confirm('是否确定删除该已选择时间','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
            this.$message({type:'success',message:'删除成功!'})
            this.allTimeL.splice(index,1)
          })
          .catch(()=>{
            this.$message({type:'info',message:'已取消'})
          })
        },
        chooseTime(val){
          if(!this.XG){
            if(val != null){
            if(val[0] ==  val[1]){
              this.$message({type:'info',message:'不能选择同一天'})
            }else{
              var a = []
               for(let i = 0; i < this.timeNumber.length ; i ++){
                 if( this.parseDate(this.timeNumber[i].begin_date) > this.parseDate(this.longTime[0]) &&  this.parseDate(this.timeNumber[i].begin_date) < this.parseDate(this.longTime[1]) ){
                   a.push(i)
                }
               }
               for(let j = 0; j < this.allTimeL.length ; j ++){
                 if( this.parseDate(this.allTimeL[j].begin_date) > this.parseDate(this.longTime[0]) &&  this.parseDate(this.allTimeL[j].begin_date) < this.parseDate(this.longTime[1]) ){
                   a.push(j)
                }
               }
              if(a.length){
                  this.$message({
                    type:'error',
                    message: '不能添加相同时间段'
                })
              }else{
                   this.allTimeL.push({begin_date:val[0],end_date:val[1]})
              }
            } 
            this.longTime = ''
          }
          }
          
        },
        //删除返差价
        delteCj(item,index){
          if(this.cjList.length >1){
            this.Messages('是否删除该返差价',3,index)
          }else{
             this.cjList=[{num:'',refund_rate:''}]
          }
        },
        //计算差价是否满足要求
        isCjNum(item,index){
          if(this.cjList.length > 1 &&  Number(item.num) <= Number(this.cjList[index -1].num)){
            this.$message({type: 'warning',message:'满减人数必须大于上一个满减人数'})
            item.cjNum = ''
          }
        },
        isCjScale(item,index){
          if(this.cjList.length > 1 &&  Number(item.refund_rate) <= Number(this.cjList[index -1].refund_rate)){
            this.$message({type: 'warning',message:'退还比例必须大于上一个退还比例'})
            item.cjScale = ''
          }
        },
        //判断年龄要求
        isminOld(){
          if(this.maxOld && Number(this.maxOld) < Number(this.minOld) ){
             this.$message({type: 'warning',message: '儿童最小年龄不得大于儿童最大年龄'})
              this.minOld  = ''
          }
          if(this.minJoinOld && Number(this.minOld) < Number(this.minJoinOld)){
            this.$message({type: 'warning',message: '儿童年龄不得小于参与者最小年龄'})
            this.minOld = this.minJoinOld
          }
        },
        isminJoinOld(){
           if(this.minOld && Number(this.minJoinOld) > Number(this.minOld)){
            this.$message({type: 'warning',message: '参与者年龄不得大于儿童最小年龄'})
            this.minJoinOld = this.minOld
          }
        },
        ismaxOld(){
          if(this.minOld && Number(this.maxOld) <= Number(this.minOld)){
            this.$message({type: 'warning',message: '儿童最大年龄不得小于儿童最小年龄'})
            this.maxOld = ''
          }
        },
        isCreate(){
          if(this.timeNumber.length){
            for(var i = 0; i< this.timeNumber.length; i++){
              if(this.timeNumber[i].qzCombo){
                return true
              }
            }
          }
        },
        isZhCombine(){
          if(this.timeNumber.length){
            for(var i = 0; i< this.timeNumber.length; i++){
              if(this.timeNumber[i].zhCombo){
                return true
              }
            }
          }
        },
        changeCheck(index){
          var arr = this.discountChose
          if(arr.length == 3 || arr.length == 2){
             var isTrue =  this.requestTrue(arr[arr.length-1]) // 有值为true 无值为false
             if(!isTrue){
               this.$message({
                 type: 'warning',
                 message:'没填数据就取消勾选了'
               })
               arr = arr.splice(arr.length-1,1)
             }
             this.showList = arr
             this.clickCheck = index
              this.choseLook = index
          }else {
          this.showList = arr
          this.clickCheck = index
          this.choseLook = index
          }
        },
        checkDiscount(val,index){
          this.clickCheck = ''
          var arr = val
          if(this.changeArr.length > arr.length){
              for(var i=0; i < this.changeArr.length ; i ++){
                if(arr.indexOf(this.changeArr[i]) == -1){
                    this.clearCombo(this.changeArr[i])
                }
              }
          }else if(arr.length > 1){
             var isTrue =  this.requestTrue(arr[arr.length-2]) // 有值为true 无值为false
             if(!isTrue){
               this.$message({
                 type: 'warning',
                 message:'没填数据就取消勾选了'
               })
               arr = arr.splice(arr.length-2,1)
             }
          }
          this.changeArr = arr
        },
        clearCombo(i){
          if(i == '1'){
            this.zkCombo = {
              oldPrice:'',
              discount:'',
              disprice: '',
              oldChildPrice:'',
              childDiscount:'',
              childDisprice: ''
            }
          }else if(i == '2'){
            this.pcCombo = [
                {
                  adult:'',
                  kids:'',
                  price:'',
                  type: 1  
                }
              ]
          }else{
            this.zhCombo = [
                {
                  name:'',
                  adult:'',
                  price:'',
                  type: 2  
                }
              ]
          } 
        },
         isShow(index){       
          if(this.showList.indexOf(index) != -1){
            return  this.swtichAll(index)
          }
        },
        requestTrue(index){
           return this.swtichAll(index)
        },
        swtichAll(index){
          switch(index){
              case '1':
                var ob = this.zkCombo
                if( ob.oldPrice && ob.discount && ob.oldChildPrice && ob.childDiscount){
                  return true
                }else{
                  return false
                }
                break;
              case '2':
                var item = this.pcCombo[0]
                if(item.adult && item.kids && item.price){
                  return true
                }
                break;
              case '3':
                var item = this.zhCombo[0]
                if(item.name && item.price && item.adult){
                  return true
                }
                break;
            }
        },
        addCombo(num){
          if(num == '2'){
            var arr = this.pcCombo[this.pcCombo.length -1]
            if(!arr.adult || !this.reg.test(arr.adult)){
              this.$message({type: 'error',message:'请检查成人人数是否填写/是否为正整数!'})
            }else if(!arr.kids || !this.reg.test(arr.kids)){
              this.$message({type: 'error',message:'请检查儿童人数是否填写/是否为正整数!'})
            }else if(!arr.price || !this.priceReg.test(arr.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
              this.pcCombo.push({adult:'',kids:'',price:'',type:1})
            }
          }else if(num == '3'){
            var arr = this.zhCombo[this.zhCombo.length -1]
            if(!arr.name || arr.name.length > 10){
              this.$message({type: 'error',message:'请检查是否填写名称(名称小于等于10个字)'})
            }else if(!arr.adult || !this.reg.test(arr.adult)){
              this.$message({type: 'error',message:'请检查套餐人数是否填写/是否为正整数!'})
            }else if(!arr.price || !this.priceReg.test(arr.price)){
              this.$message({type: 'error',message:'请填写正确金额（最多保存两位小数）'})
            }else{
              this.zhCombo.push({name:'',adult:'',price:'',type:2})
            }
          }else{
           
            var arr = this.cjList[this.cjList.length -1]
            if(!arr.num || !this.reg.test(arr.num)){
              this.$message({type: 'error',message:'请检查是否填写正确满减人数(整数)'})
            }else if(!arr.refund_rate || !this.priceReg.test(arr.refund_rate)){
               this.$message({type: 'error',message:'请检查满减比例填写是否正确(最多两位小数)'})
            }else{
              this.cjList.push({num:'',refund_rate:'',})
            }
          }
        },
        // 亲子删除套餐
        delteQzCombo(item,index){
          if(this.pcCombo.length >1){
            this.Messages('是否删除该亲子套餐',1,index)
          }else{
            this.pcCombo=[{adult:'',kids:'',price:'',type: 1}]
          }
            
        },
        // 删除综合套餐
        delteZhCombo(item,index){
          if(this.zhCombo.length >1){
            this.Messages('是否删除该综合套餐',2,index)
          }else{
             this.zhCombo=[{name:'',adult:'',price:'',type:2}]
          }
        },
        addTime(){
       
          if(!this.isPrice){
            if(this.XG){
               if(!this.longTime){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if( !this.zkCombo.oldPrice || !this.zkCombo.discount){
                  this.$message({type: 'error',message: '请填写完整折扣价'})
                }else{
                  this.checkCombo(1) 
                }
              }else{
                  if(!this.allTimeL.length ){
                    this.$message({type: 'error',message: '请填写活动时间段'})
                  }else if(!this.personNum || !this.reg.test(this.personNum)){
                    this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                  }else if( !this.zkCombo.oldPrice || !this.zkCombo.discount){
                    this.$message({type: 'error',message: '请填写完整折扣价'})
                  }else{
                    this.checkCombo(1) 
                  }
                }
            }else{
              if(this.XG){
                 if(!this.longTime){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if(!this.bzPrice){
                  this.$message({type: 'error',message: '请填写标准价格'})
                }else{
                  this.checkCombo(2)
                }
              }else{
                if(!this.allTimeL.length){
                  this.$message({type: 'error',message: '请填写活动时间段'})
                }else if(!this.personNum || !this.reg.test(this.personNum)){
                  this.$message({type: 'error',message: '请填写正确活动人数（正整数）'})
                }else if(!this.bzPrice){
                  this.$message({type: 'error',message: '请填写标准价格'})
                }else{
                  this.checkCombo(2)
                }
              }
           }
        },
        checkCombo(val){
          if(this.discountChose.indexOf('2') != -1 && this.discountChose.indexOf('3') == -1){
                for(var i = 0; i< this.pcCombo.length;i++){
                  var ob = this.pcCombo[i]
                  if(!ob.adult || !ob.kids || !ob.price){
                    this.$message({type: 'warning',message:'您的亲子套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }else if(this.discountChose.indexOf('3') != -1 && this.discountChose.indexOf('2') == -1){
                for(var i = 0; i< this.zhCombo.length;i++){
                  var ob = this.zhCombo[i]
                  if(!ob.name || !ob.adult || !ob.price){
                    this.$message({type: 'warning',message:'您的综合套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }else if(this.discountChose.indexOf('2') == -1 && this.discountChose.indexOf('3') == -1){
                this.addTimeList(val)
              }else{
                for(var i = 0; i< this.pcCombo.length;i++){
                  var ob = this.pcCombo[i]
                  if(!ob.adult || !ob.kids || !ob.price){
                    this.$message({type: 'warning',message:'您的亲子套餐未填完整'})
                    return false
                  }
                }
                 for(var i = 0; i< this.zhCombo.length;i++){
                  var ob = this.zhCombo[i]
                  if(!ob.name || !ob.adult || !ob.price){
                    this.$message({type: 'warning',message:'您的综合套餐未填完整'})
                    return false
                  }
                }
                this.addTimeList(val)
              }
        },
        addTimeList(val){
          if(this.XG){
                  this.rediretTimeNum(val)
          }else{
            // if(this.timeNumber.length){
            //   var a = []
            //   for(let i = 0; i < this.timeNumber.length ; i ++){
            //     if( this.parseDate(this.timeNumber[i].begin_date) > this.parseDate(this.longTime[0]) &&  this.parseDate(this.timeNumber[i].begin_date) < this.parseDate(this.longTime[1]) ){
            //       a.push(i)
            //     }
            //   }
            //   if(a.length){
            //     this.$message({
            //       type:'error',
            //       message: '不能添加相同时间段'
            //     })
            //   }else{
            //       this.takeTimeNUm(val)
            //   }
            // }else{
             this.takeTimeNUm(val)
            // } 
          }
        },
        rediretTimeNum(val){
           var combine = []
          for(var i = 0; i <this.pcCombo.length;i++){
            if(this.pcCombo[i].adult && this.pcCombo[i].kids && this.pcCombo[i].price){
                  combine.push(this.pcCombo[i])
              }
          }
          for(var j = 0; j < this.zhCombo.length; j++){
             if(this.zhCombo[j].name && this.zhCombo[j].adult && this.zhCombo[j].price){
                  combine.push(this.zhCombo[j])
              }
          }
          this.$http.post(this.api + '/SlotEditAllTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            slot_id: this.slot_id,
            begin_date: this.longTime[0],
            end_date: this.longTime[1],
            begin_time: this.startTime,
            end_time: this.endTime,
            max_person_num: this.personNum,
            is_discount: val == 1? '1':'0',
            price_origin: val == 1? this.zkCombo.oldPrice:this.bzPrice,
            kids_price_origin: val == 1? this.zkCombo.oldChildPrice:this.etPrice,
            price_discount: val == 1? this.zkCombo.discount:'',
            price:val == 1? this.zkCombo.disprice: '',
            kids_price_discount: val == 1? this.zkCombo.childDiscount: '',
            kids_price: val == 1? this.zkCombo.childDisprice:'',
            combine:combine.length? JSON.stringify(combine):''
          })
          .then(res=>{
            if(res.data.code == 1){
              this.timeNumber.splice(this.madificIndex,1)
               var priceArr = [this.bzPrice,this.etPrice]
                  this.timeNumber.push(
                    {
                      begin_date: this.longTime[0],
                      end_date: this.longTime[1],
                      begin_time: this.startTime,
                      end_time: this.endTime,
                      max_person_num: this.personNum,
                      // price: this.price
                      price: val ==1? this.zkCombo: priceArr,
                      qzCombo: this.pcCombo,
                      zhCombo: this.zhCombo,
                      kind: val
                    }
                  )
                this.abiosh()
            }else if(res.data.code == 3){
              this.rediretTimeNum(val)
            }else if(res.data.cdoe == 0){
              this.$message({type: 'error',message:res.data.msg})
            }
          })
        },
        takeTimeNUm(val){
           var combine = []
          for(var i = 0; i <this.pcCombo.length;i++){
            if(this.pcCombo[i].adult && this.pcCombo[i].kids && this.pcCombo[i].price){
                  combine.push(this.pcCombo[i])
              }
          }
          for(var j = 0; j < this.zhCombo.length; j++){
             if(this.zhCombo[j].name && this.zhCombo[j].adult && this.zhCombo[j].price){
                  combine.push(this.zhCombo[j])
              }
          }
          var time = [{begin_time:this.startTime,end_time:this.endTime}]
          this.$http.post(this.api + '/SlotAddAllTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            // begin_date: this.longTime[0],
            // end_date: this.longTime[1],
            date:JSON.stringify(this.allTimeL),
            time: JSON.stringify(time),
            max_person_num: this.personNum,
            is_discount: val == 1? '1':'0',
            price_origin: val == 1? this.zkCombo.oldPrice:this.bzPrice,
            kids_price_origin: val == 1? this.zkCombo.oldChildPrice:this.etPrice,
            price_discount: val == 1? this.zkCombo.discount:'',
            price:val == 1? this.zkCombo.disprice: '',
            kids_price_discount: val == 1? this.zkCombo.childDiscount: '',
            kids_price: val == 1? this.zkCombo.childDisprice:'',
            combine: combine.length? JSON.stringify(combine):''
          })
            .then(res=>{
              if(res.data.code == 1){
                 this.getActive()
                  // var priceArr = [this.bzPrice,this.etPrice]
                  // this.timeNumber.push(
                  //   {
                  //     begin_date: this.longTime[0],
                  //     end_date: this.longTime[1],
                  //     begin_time: this.startTime,
                  //     end_time: this.endTime,
                  //     max_person_num: this.personNum,
                  //     // price: this.price
                  //     price: val ==1? this.zkCombo: priceArr,
                  //     qzCombo: this.pcCombo,
                  //     zhCombo: this.zhCombo,
                  //     kind: val
                  //   }
                  // )
                   this.abiosh()
              }else if(res.data.code == 3){
                this.takeTimeNUm(val)
              }else if(res.data.code == 0){
                this.$message({type: 'error',message: res.data.msg})
              }
            })
          
        },
        //消息提醒
        Messages(message,val,index){
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              this.$message({
              type: 'success',
              message: '删除成功!'
              });
              if(val == '1'){
                 this.pcCombo.splice(index,1)
              }else if(val == '2'){
                this.zhCombo.splice(index,1)
              }else{
                this.cjList.splice(index,1)
              }
            }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
            });        
          });
        },

        // 保存时间
        saveTime(parmas){
          this.$http.post(this.api + '/SlotAddTwo',{
            token: localStorage.getItem('token'),
            version: 2.0,
            activity_id: this.active_id,
            begin_date: parmas.begin_date,
            end_date: parmas.end_date,
            begin_time: parmas.begin_time,
            end_time: parmas.end_time
          })
          .then(res=>{
            if(res.data.code == 1){
              
            }else if(res.data.code == 3){
              this.saveTime(parmas)
            }else if(res.data.code == 0){
              this.$message({type: 'error',message: res.data.msg})
            }
          })
        },
        //获取已创建套餐
        getCombine(val,combine){
          if(!combine){
              this.$http.post(this.api + '/CombineUsedTwo',{
              token: localStorage.getItem('token'),
              version: 2.0,
              activity_id: this.active_id,
              type: val
            })
            .then(res=>{
              if(res.data.code == 1){
                var data = res.data.data
                var arr = []
                
                if(val == '1'){
                  data.forEach((item) => {
                  arr.push({
                      adult: item.adult,
                      kids: item.kids,
                      price: item.price,
                      type: 1  
                    })
                  })
                  this.pcCombo = arr
                  this.isQzCombine = true
                }else{
                  data.forEach((item) => {
                  arr.push({
                      name: item.name,
                      adult: item.adult,
                      price: item.price,
                      type: 2 
                    })
                  })
                  this.zhCombo = arr
                  this.iszhCombo = true
                }
              }else if(res.data.code == 3){
                this.getCombine(val)
              }else if(res.data.cdoe == 0){
                this.$message({type: 'error',message: res.data.msg})
              }
            })
          }
          
        },
        //第一版本函数
        sort(arr){
          var len = arr.length;
          var preIndex, current;
          for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while(preIndex >= 0 && this.parseDate(arr[preIndex].begin_date) >this.parseDate(current.begin_date)){
              arr[preIndex+1] = arr[preIndex];
              preIndex--;
            }
            arr[preIndex+1] = current;
          }
          },
        abiosh(){
          this.allTimeL = []
          this.longTime = []
          this.startTime = '00:00'
          this.endTime = '00:15'
          this.personNum = ''
          this.XG = false
          this.bzPrice = ''
          this.etPrice = ''
          this.zkCombo = {
            oldPrice:'',
            discount:'',
            disprice: '',
            oldChildPrice:'',
            childDiscount:'',
            childDisprice: ''
          }
          this.discountChose = []
          this.pcCombo = [
              {
                adult:'',
                kids:'',
                price:'',
                type: 1  
              }
            ]
          this.zhCombo = [
              {
                name:'',
                adult:'',
                price:'',
                type: 2  
              }
            ]
        },
          //修改时间
        modification(item,index){
          this.slot_id = item.slot_id        
          this.longTime = [item.begin_date,item.end_date]
          this.startTime = item.begin_time
          this.endTime = item.end_time
          this.personNum = item.max_person_num
          // this.price = item.price
          if(item.kind == 1){
            this.zkCombo = item.price
            this.discountChose = ['1']
          }else{
            this.bzPrice = item.price[0]
            this.etPrice = item.price[1]
          }
         if(item.qzCombo.length){
             this.pcCombo = item.qzCombo
             this.discountChose.push('2')
          }
          if(item.zhCombo.length){
             this.zhCombo = item.zhCombo
            this.discountChose.push('3')
          }
          this.madificIndex = index
          this.XG = true
        },
        checkCjList(arr){
          if(this.chaJia){
              for(var i = 0; i< arr.length ; i++){
              if(!arr[i].num || !arr[i].refund_rate){
                return false
              }
            }
            return true
          }else{
            return true
          }
          
        },
        changeRouter(){
           var isTrue = this.checkCjList(this.cjList)
          if(!this.timeNumber.length){
            this.$message({type:'info',message:'请填写活动'})
          }else if(!isTrue){
              this.$message({type: 'error',message:'请检查是否填写完整返差价'})
          }else{
            //if(this.active_id){
              this.$http.post(this.api + '/ActivitSaveTwo',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                version: 2.0,
                long_day: 0,
                kids_stand_low: this.minOld,
                kids_stand_high: this.maxOld,
                age_limit: this.minJoinOld,
                differ: JSON.stringify(this.cjList),
                step: 11
              })
                .then(res=>{
                  if(res.data.code = 1){
                    if(this.complete == '0'){
                       this.$emit('changeRouter',{id:12,router:'accommodation',information:this.active_id,complete:this.complete})
                    }else{
                      this.$message({
                        type: 'success',
                        message: '保存成功!'
                      })
                    }
                  }else if(res.data.code == 3){
                    this.changeRouter()
                  }else if(res.data.code == 0){
                    this.$message({type:'error',message:res.data.msg})
                  }
                })
          }
        },
        delet(item,index){
          this.$confirm('此操作将删除该时间段，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(item.slot_id){
              this.$http.post(this.api + '/ActivitySlotDelTwo',{
                token: localStorage.getItem('token'),
                activity_id: this.active_id,
                version: 2.0,
                slot_id: item.slot_id
              })
                .then(res=>{
                  if(res.data.code == 1){
                    this.timeNumber.splice(index,1)
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    })
                  }else if(res.data.code == 3){
                    this.delet(item,index)
                  }else if(res.data.code == 0){
                    alert(res.data.msg)
                  }
                })
            }else{
              this.timeNumber.splice(index,1)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
        },
        getActive(){
          this.$http.post(this.api + '/ActivityAllSlotDetailTwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0,
            version: 2.0
          })
            .then(res=>{
              if(res.data.code == 1){
                let data = res.data.data
                var timeAll = [];
                  for(let i =0;i<data.length;i++){
                    if(data[i].status == 0 && data[i].online != 1){
                        var arr = data[i]
                        var price = {
                            oldPrice:arr.price_origin,
                            discount:arr.price_discount,
                            disprice:arr.price,
                            oldChildPrice:arr.kids_price_origin,
                            childDiscount:arr.kids_price_discount,
                            childDisprice:arr.kids_price
                        }
                        var priceArr = [
                         arr.price_origin, arr.kids_price_origin
                        ]
                        var qzCombo = [],
                            zhCombo = [];
                            
                        for(var j = 0; j< arr.combine.length;j++){
                          if(arr.combine[j].type == 1){
                            qzCombo.push(arr.combine[j])
                          }else{
                            zhCombo.push(arr.combine[j])
                          }
                        }
                       timeAll.push(
                          {
                            slot_id: arr.slot_id,
                            begin_date: arr.begin_date,
                            end_date: arr.end_date,
                            begin_time: arr.begin_time,
                            end_time: arr.end_time,
                            max_person_num: arr.max_person_num,
                            price: arr.is_discount ==1? price: priceArr,
                            kind: arr.is_discount ==1? '1' : '2',
                            qzCombo:qzCombo,
                            zhCombo:zhCombo
                          }
                        )
                        
                     }
                  }
                   this.timeNumber = timeAll
                   console.log(this.timeNumber)
              }else if(res.data.code == 3){
                    this.getActive()
              }else if(res.data.code == 0){
                this.$alert(res.data.msg)
              }
            })
        },
        getPriceAcity(){
          this.$http.post(this.api + '/ActivityETwo',{
            token: localStorage.getItem('token'),
            activity_id: this.active_id,
            visit: 0
          })
          .then(res=>{
            if(res.data.code == 1){
              var data = res.data.data
               this.minOld =  data.kids_stand_low
                this.maxOld = data.kids_stand_high
                this.minJoinOld = data.age_limit
                if(data.differ.length){
                   this.cjList = data.differ
                   this.chaJia = true
                }
            }else if(res.data.cdoe == 3){
              this.getPriceAcity()
            }else if(res.data.code == 0){
              this.$message({type: 'warning',message: res.data.msg})
            }
          })
        },
        parseDate(str) { // 字符串转时间戳
          return Date.parse(new Date(Date.parse(str.replace(/-/g, "/")))) ; // 精确到秒
        },
       
      },
      mounted() {
        let _this = this
        _this.getActive()
        _this.getPriceAcity()
       
      },
      created(){
        window.scroll(0,0)
      }

    }
</script>

<style scoped>
  .block{
    margin: 20px 0;
  }
  .sizeCheck{
    width: 108px;
    text-align: center;
    color: #000;
    cursor: pointer;
    position: absolute;
  }
  .check2{
    margin-left: 138px
  }
  .check3{
    margin-left: 276px
  }
  .el-checkbox{
    color: #000 !important;
  }
  .timeList{
    margin: 20px 0;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    background-color:#F5F7FA;
    padding: 10px;
    font-weight: bold;
  }
</style>
