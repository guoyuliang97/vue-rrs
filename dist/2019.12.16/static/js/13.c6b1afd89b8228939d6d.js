webpackJsonp([13],{If2H:function(t,e){},LBU0:function(t,e){},"PwV/":function(t,e){},RGWa:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("/nBy"),a=(i("If2H"),i("PwV/"),i("DjrJ")),o=(a.a,s.a,{name:"choose",data:function(){return{api:this.GLOBAL.baseURL,personNumber:1,allPrice:"",numlast:"",classa:"el-icon-arrow-up",pickIndex:-1,isAdd:!1,userImg:"",marginTop:"-50px",height:"50px",addClick:!1,dataImg:"",dataTile:"",weekDay:"",user:"",userF:"",userPhone:"",a:!0,b:!1,chooseIndex:1,payIndex:1,activeId:"",activeList:[],creditCard:{name:"",surnames:"",information:"",prompt:"卡号",overTime:"",timePrompt:"到期日期",saveNumber:"",street:"",houseNumber:"",city:"",state:"",mail:"",country:""},isPay:"",payStatus:"",giftVoucher:"",Voucher:!1,otherList:[{person:"成人",adult:1},{person:"儿童",adult:0},{person:"婴儿",adult:0}],paymentList:[{styleHead:"",mess:"选择付款方式:",check:""},{styleHead:"iconfont icon-zhifubao-copy blue",mess:"支付宝",check:"el-icon-check"},{styleHead:"iconfont icon-weixin green",mess:"微信",check:"el-icon-check"},{styleHead:"iconfont icon-xinyongqia white",mess:"信用卡",check:"el-icon-check"}],options:[{value:0,label:"中国"},{value:1,label:"日本"},{value:2,label:"美国"}],form:{token:"",person:[],house:[],num:"",slot_id:"",pay_type:"",isstay:"",is_book_whole:"",balance:""},formPerson:{name:"",mobile:"",idcard:""},isWeixin:!1,orderId:"",timeOut:"",addperson:!1,house:[],isstay:0,chooseHouse:[],closeIndex:0,book_whole:"",due_balance:0,jiJin:0,return_policy:"",age_limit:"",isPassword:!1,password:"",aindex:0,isLoading:!1,is_setpwd:"",isWithdrawal:!1}},components:{Head:a.a,Loading:s.a},watch:{aindex:function(){this.aindex<=0&&(this.aindex=0)},password:function(){6==this.password.length&&this.fundSend()},personNumber:function(){this.closeIndex||(this.getCalculate(this.closeIndex),this.form.num=this.personNumber)},closeIndex:function(){this.closeIndex?(this.getCalculate(this.closeIndex),this.form.is_book_whole=this.closeIndex):(this.getCalculate(this.closeIndex),this.form.is_book_whole="")},$route:"getParams"},directives:{myfocus:{inserted:function(t){t.focus()}}},methods:{check:function(){console.log(this.form)},checkPass:function(){document.getElementById("passW").focus()},fundSend:function(){var t=this,e="";e=this.activeList.beginTime?this.activeList.slot_id:this.activeList.list.slot_id,this.$http.post(this.api+"/orderadd",{token:localStorage.getItem("token"),activity_id:this.activeId,num:this.personNumber,slot_id:e,person:this.form.person,pay_type:4,isstay:this.isstay,is_book_whole:this.closeIndex,balance:this.jiJin,house:this.chooseHouse,password:this.password}).then(function(e){1==e.data.code?(t.isPassword=!1,t.$router.push("/stayOrder"),t.$message({type:"success",message:"支付成功！"})):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.fundSend()}):0==e.data.code&&(t.isPassword=!1,t.password="",t.aindex=0,t.jiJin=0,alert(e.data.msg))})},deletPerson:function(t,e){var i=this;this.$confirm("您正在删除已添加得乘客信息,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.form.person.splice(e,1),i.$message({type:"success",message:"删除成功！"})}).catch(function(){i.$message({type:"info",message:"已取消删除！"})})},closePay:function(){this.isPassword=!1,this.jiJin="",this.password="",this.aindex=0},abolish:function(){this.isWithdrawal=!1,this.jiJin=""},chooseCheck:function(){var t=this;parseFloat(this.jiJin)>0&&parseFloat(this.jiJin)<this.allPrice?this.form.balance=this.jiJin:parseFloat(this.jiJin)==this.allPrice?this.$confirm("您正在进行基金全额支付,是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.is_setpwd?t.isPassword=!0:t.isWithdrawal=!0}).catch(function(){t.jiJin="",t.$message({type:"info",message:"已取消"}),t.getCalculate(t.closeIndex)}):(parseFloat(this.jiJin)<0||parseFloat(this.jiJin)>this.allPrice)&&(this.$message({type:"info",message:"请输入基金大于零，小于或等于总价"}),this.jiJin="")},onFocus:function(){var t=document.getElementsByClassName("list");99===event.keyCode||96===event.keyCode||97===event.keyCode||98===event.keyCode||99===event.keyCode||100===event.keyCode||101===event.keyCode||102===event.keyCode||103===event.keyCode||104===event.keyCode||105===event.keyCode||48===event.keyCode||49===event.keyCode||50===event.keyCode||51===event.keyCode||52===event.keyCode||53===event.keyCode||54===event.keyCode||55===event.keyCode||56===event.keyCode||57===event.keyCode?this.aindex<=5&&(t[this.aindex].innerHTML="*",this.aindex+=1):8===event.keyCode&&this.aindex>0&&(this.aindex-=1,t[this.aindex].innerHTML=" ")},change:function(){this.closeIndex?this.closeIndex=0:this.closeIndex=1},getCalculate:function(t){var e=this,i="";i=this.activeList.beginTime?this.activeList.slot_id:this.activeList.list.slot_id,this.$http.post(this.api+"/Calculate",{token:localStorage.getItem("token"),slot_id:i,num:this.personNumber,isstay:this.isstay,is_book_whole:t,balance:this.jiJin,house:this.chooseHouse}).then(function(i){1==i.data.code?e.allPrice=i.data.data.total_price:3==i.data.code?e.$http.post(e.api+"/home/index/token").then(function(i){localStorage.setItem("token",i.data.data),e.getCalculate(t)}):0==i.data.code&&(e.jiJin="",alert(i.data.msg))})},reduce:function(t,e){if(0==e)if(t.adult>1&&this.personNumber>this.form.person.length+1){this.addClick=!1,t.adult=t.adult-1;for(var i=0,s=0;s<this.otherList.length;s++)i+=this.otherList[s].adult;this.personNumber=i}else this.$message({type:"info",message:"您添加了用户信息，不能少于您添加的用户信息人数！"});else if(0!=t.adult&&this.personNumber>this.form.person.length+1){this.addClick=!1,t.adult=t.adult-1;for(var a=0,o=0;o<this.otherList.length;o++)a+=this.otherList[o].adult;this.personNumber=a}else this.$message({type:"info",message:"您添加了用户信息，不能少于您添加的用户信息人数！"})},add:function(t,e){if(this.personNumber<this.numlast){this.addClick=!1,t.adult=t.adult+1;for(var i=0,s=0;s<this.otherList.length;s++)i+=this.otherList[s].adult;this.personNumber=i}else this.addClick=!0},pick:function(t){this.pickIndex==t?(this.classa="el-icon-arrow-up",this.pickIndex=-1,this.isAdd=!1):(this.classa="el-icon-arrow-down",this.pickIndex=t,this.isAdd=!0)},remove:function(t){this.height="200px",this.a=!1,this.b=!0},pay:function(t){this.height="50px",this.a=!0,this.b=!1,this.payIndex=t,t>1?2==t?(this.chooseIndex=t,this.marginTop="-100px"):(this.chooseIndex=t,this.marginTop="-150px"):1==t?(this.chooseIndex=t,this.marginTop="-50px"):(this.chooseIndex=t,this.marginTop="")},alipay:function(t){var e=this;this.jiJin>this.allPrice&&this.$message({type:"info",message:"基金抵扣不能大于总价"});var i="";i=this.activeList.beginTime?this.activeList.slot_id:this.activeList.list.slot_id,this.$http.post(this.api+"/orderadd",{token:localStorage.getItem("token"),activity_id:this.activeId,num:this.personNumber,slot_id:i,person:this.form.person,pay_type:t,isstay:this.isstay,is_book_whole:this.closeIndex,balance:this.jiJin,house:this.chooseHouse}).then(function(t){1==t.data.code?(e.isPay=0,e.isWeixin=!0,document.getElementById("weixin").innerHTML=t.data.data.url,e.orderId=t.data.data.order_id,e.setTime()):alert(t.data.msg)})},toBack:function(){this.$router.go(-1)},getParams:function(){var t=this;this.isLoading=!0,this.activeId=this.$route.query.activeId,this.activeList=JSON.parse(this.$route.query.chooseTime)[0],this.activeList.beginTime?this.numlast=this.activeList.max_person_num-this.activeList.order_person_num:(this.weekDay=this.getWeekDay(this.activeList.day),this.numlast=this.activeList.list.personNum-this.activeList.list.order_person_num),this.$http.post(this.api+"/home/Activity/get_activity",{token:localStorage.getItem("token"),activity_id:this.activeId,visit:0}).then(function(e){1==e.data.code?(t.dataImg=e.data.data.cover.domain+e.data.data.cover.image_url,t.dataTile=e.data.data.title,t.book_whole=e.data.data.book_whole,t.return_policy=e.data.data.return_policy,t.age_limit=e.data.data.age_limit,t.getbalance(),t.isLoading=!1,t.checkNUm(),t.getCalculate(t.closeIndex)):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getParams()}):0==e.data.code&&alert(e.data.msg)})},getWeekDay:function(t){return["星期天","星期一","星期二","星期三","星期四","星期五","星期六"][new Date(Date.parse(t)).getDay()]},closeWx:function(){this.isWeixin=!1,clearInterval(this.timeOut)},getOrderTime:function(){var t=this;this.$http.post(this.api+"/OrderIsPay",{token:localStorage.getItem("token"),order_id:this.orderId}).then(function(e){1==e.data.code?1==e.data.data.pay_status&&(t.isPay=1,t.payStatus=1,clearInterval(t.timeOut),localStorage.setItem("dis","stayOrder"),t.$router.push("/transaction")):3==e.data.code&&t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getOrderTime()})})},setTime:function(){var t=this,e=0;this.timeOut=setInterval(function(){e<300?(t.getOrderTime(),e+=1):(clearInterval(t.timeOut),t.isPay=1,t.payStatus=2)},1e3)},addPersonForm:function(){this.form.person.length<this.personNumber-1?this.formPerson.name?this.formPerson.mobile&&/^[1-9]\d*$/.test(this.formPerson.mobile)?this.formPerson.idcard&&/^[1-9]\d*$/.test(this.formPerson.idcard)?(this.form.person.push({name:this.formPerson.name,mobile:this.formPerson.mobile,idcard:this.formPerson.idcard}),this.formPerson={name:"",mobile:"",idcard:""},this.addperson=!1,this.$message({type:"success",message:"保存成功"})):this.$message({type:"info",message:"请添加正确身份号码"}):this.$message({type:"info",message:"请添加正确电话号码"}):this.$message({type:"info",message:"请添加名字"}):this.$message({type:"info",message:"人数信息超过参与者人数!"})},payClose:function(){this.isWeixin=!1,this.isPay="",this.payStatus=""},getbalance:function(){var t=this;this.$http.post(this.api+"/balance",{token:localStorage.getItem("token"),page:1}).then(function(e){1==e.data.code?t.due_balance=e.data.data.due_balance:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getbalance()}):0==e.data.code&&alert(e.data.msg)})},reload:function(t){this.user=t.data.data[0].family_name+t.data.data[0].middle_name+t.data.data[0].name,this.userImg=t.data.data[0].head_image?t.data.data[0].headimage.domain+t.data.data[0].headimage.image_url:"",this.is_setpwd=t.data.data[0].is_setpwd;for(var e=0;e<this.form.person.length;e++){var i=this.form.person[e];for(var s in i){var a=document.createElement("input");a.setAttribute("type","hidden"),a.setAttribute("name","person["+[e]+"]["+[s]+"]"),a.setAttribute("value",i[s]),document.getElementById("form").append(a)}}},checkNUm:function(){var t="";if(this.$route.query.chooseHouse){this.house=JSON.parse(this.$route.query.chooseHouse),this.isstay=1;for(var e=0;e<this.house.length-1;e++)this.form.house.push({house_id:this.house[e].house_id,num:this.house[e].number}),this.chooseHouse.push({house_id:this.house[e].house_id,num:this.house[e].number});for(var i=0;i<this.form.house.length;i++){var s=this.form.house[i];for(var a in s){var o=document.createElement("input"),n=document.getElementById("form");o.setAttribute("type","hidden"),o.setAttribute("name","house["+[i]+"]["+[a]+"]"),o.setAttribute("value",s[a]),n.appendChild(o)}}}t=this.activeList.beginTime?this.activeList.slot_id:this.activeList.list.slot_id,this.form={token:localStorage.getItem("token"),activity_id:this.activeId,num:this.personNumber,slot_id:t,person:[],pay_type:2,isstay:this.isstay,is_book_whole:this.closeIndex,balance:this.jiJin,house:this.chooseHouse}}},mounted:function(){},created:function(){this.getParams()},destroyed:function(){clearInterval(this.timeOut),localStorage.removeItem("house")}}),n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Head",{attrs:{type:"choose"},on:{reload:t.reload}}),t._v(" "),i("div",{staticStyle:{width:"80%",margin:"80px 10%",display:"flex","justify-content":"flex-start"}},[i("div",{staticStyle:{width:"50%","min-width":"500px","text-align":"left"}},[i("div",{staticStyle:{width:"50px",cursor:"pointer"},on:{click:t.toBack}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("返回")]),t._v(" "),i("div",{staticStyle:{padding:"20px 50px"}},[i("h1",[t._v("确认并支付")]),t._v(" "),i("p",[t._v("您可以将更多好友添加为此体验的参与者，然后确认预订。")]),t._v(" "),i("p",[t._v("可接待年满"+t._s(t.age_limit)+"周岁及以上的参与者。")]),t._v(" "),i("h1",[t._v("还有谁一起参加？")]),t._v(" "),i("h3",[t._v("参与者人数")]),t._v(" "),i("el-button",{staticStyle:{width:"300px"},on:{click:function(e){t.pick(1)}}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("span",{staticStyle:{padding:"5px"},style:{"background-color":1==t.personNumber?"none":"#008489",color:1==t.personNumber?"none":"#fff"}},[t._v(t._s(t.personNumber)+"位游客")]),i("span",{staticStyle:{padding:"5px"}},[i("i",{class:t.classa})])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isAdd,expression:"isAdd"}],staticClass:"animated fadeInDown",staticStyle:{width:"280px","background-color":"#fff",padding:"10px"}},t._l(t.otherList,function(e,s){return i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"10px 0"}},[i("div",[i("b",[t._v(t._s(e.person))])]),t._v(" "),i("div",[i("el-button",{attrs:{icon:"el-icon-minus",size:"mini",circle:"",disabled:0==s?1==e.adult:0==e.adult},on:{click:function(i){t.reduce(e,s)}}}),t._v(" "),i("span",{staticStyle:{margin:"0 10px"}},[t._v(t._s(e.adult))]),t._v(" "),i("el-button",{attrs:{icon:"el-icon-plus",size:"mini",circle:"",disabled:t.personNumber==t.numlast||t.addClick},on:{click:function(i){t.add(e,s)}}})],1)])})),t._v(" "),i("p",[t._v("此体验"),i("b",[t._v("只剩下"+t._s(t.numlast)+"个名额")]),t._v("了，记得尽快预订哦。")]),t._v(" "),i("h3",[t._v("参与者详细资料")]),t._v(" "),i("p",[t._v("输入的信息将用于添加此预订的参与者。")]),t._v(" "),i("div",{staticStyle:{"border-top":"1px solid #eee","border-bottom":"1px solid #eee",padding:"10px 0"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",{staticStyle:{"line-height":"52px"}},[i("span",[t._v(t._s(t.user?t.user:"匿名用户"))]),i("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t.userF))])]),t._v(" "),i("div",[i("img",{staticStyle:{"border-radius":"50%"},attrs:{src:t.userImg?t.userImg.domain+t.userImg.image_url:"../../../static/img/static/user.png",width:"48px",height:"48px"}})])]),t._v(" "),t._l(t.form.person,function(e,s){return i("div",{staticStyle:{display:"flex","justify-content":"space-between",margin:"20px 0","font-size":"14px"}},[i("div",{staticStyle:{"text-overflow":"ellipsis",overflow:"hidden","white-space":"nowrap","max-width":"90px","min-width":"50px"}},[i("span",[t._v(t._s(e.name))])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.mobile,expression:"item.mobile"}]},[i("span",[t._v("电话："),i("span",[t._v(t._s(e.mobile))])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.idcard,expression:"item.idcard"}]},[i("span",[t._v("身份证："+t._s(e.idcard))])]),t._v(" "),i("div",[i("i",{staticClass:"el-icon-remove",staticStyle:{color:"red",cursor:"pointer"},on:{click:function(i){t.deletPerson(e,s)}}})])])})],2),t._v(" "),i("p",{staticStyle:{color:"#008489",cursor:"pointer","font-size":"15px"},on:{click:function(e){t.addperson=!0}}},[i("i",{staticClass:"el-icon-plus"}),t._v("添加新旅客")]),t._v(" "),i("h1",[t._v("付款方式")]),t._v(" "),t._m(0),t._v(" "),i("div",{staticStyle:{width:"100%",border:"1px solid #008489",position:"relative",overflow:"hidden",transition:"height 1s"},style:{height:t.height}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.a,expression:"a"}],staticStyle:{width:"100%",height:"200px",position:"absolute","z-index":"999"},style:{"margin-top":t.marginTop}},t._l(t.paymentList,function(e,s){return i("div",{staticStyle:{width:"94%",height:"50px","line-height":"50px",display:"flex","justify-content":"space-between",padding:"0 2%"},on:{click:function(e){t.remove(s)}}},[i("div",[i("span",[i("i",{class:e.styleHead})]),i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.mess))])]),t._v(" "),i("div",{staticStyle:{"text-align":"right"}},[i("span",[i("i",{directives:[{name:"show",rawName:"v-show",value:t.chooseIndex==s,expression:"chooseIndex == index? true:false"}],class:e.check,staticStyle:{color:"#008489","font-weight":"bold","font-size":"18px"}})])])])})),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.b,expression:"b"}],staticStyle:{width:"500px",height:"200px",position:"absolute"}},t._l(t.paymentList,function(e,s){return i("div",{staticStyle:{width:"94%",height:"50px","line-height":"50px",display:"flex","justify-content":"space-between",padding:"0 2%"},on:{click:function(e){t.pay(s)}}},[i("div",[i("span",[i("i",{class:e.styleHead})]),i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.mess))])]),t._v(" "),i("div",{staticStyle:{"text-align":"right"}},[i("span",{directives:[{name:"show",rawName:"v-show",value:t.chooseIndex==s,expression:"chooseIndex == index? true:false"}]},[i("i",{class:e.check,staticStyle:{color:"#008489","font-weight":"bold","font-size":"18px"}})])])])}))]),t._v(" "),1==t.payIndex?i("div",{staticStyle:{width:"500px","margin-top":"50px"}},[i("p",[t._v("通过安全链接前往支付宝完成添加")]),t._v(" "),i("form",{attrs:{model:t.form,id:"form",action:t.api+"/orderadd",method:"get"},on:{submit:t.check}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.token,expression:"form.token"}],attrs:{name:"token",type:"hidden"},domProps:{value:t.form.token},on:{input:function(e){e.target.composing||t.$set(t.form,"token",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.activity_id,expression:"form.activity_id"}],attrs:{name:"activity_id",type:"hidden"},domProps:{value:t.form.activity_id},on:{input:function(e){e.target.composing||t.$set(t.form,"activity_id",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.num,expression:"form.num"}],attrs:{name:"num",type:"hidden"},domProps:{value:t.form.num},on:{input:function(e){e.target.composing||t.$set(t.form,"num",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.slot_id,expression:"form.slot_id"}],attrs:{name:"slot_id",type:"hidden"},domProps:{value:t.form.slot_id},on:{input:function(e){e.target.composing||t.$set(t.form,"slot_id",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.pay_type,expression:"form.pay_type"}],attrs:{name:"pay_type",type:"hidden"},domProps:{value:t.form.pay_type},on:{input:function(e){e.target.composing||t.$set(t.form,"pay_type",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.isstay,expression:"form.isstay"}],attrs:{name:"isstay",type:"hidden"},domProps:{value:t.form.isstay},on:{input:function(e){e.target.composing||t.$set(t.form,"isstay",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.is_book_whole,expression:"form.is_book_whole"}],attrs:{name:"is_book_whole",type:"hidden"},domProps:{value:t.form.is_book_whole},on:{input:function(e){e.target.composing||t.$set(t.form,"is_book_whole",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.balance,expression:"form.balance"}],attrs:{name:"balance",type:"hidden"},domProps:{value:t.form.balance},on:{input:function(e){e.target.composing||t.$set(t.form,"balance",e.target.value)}}}),t._v(" "),i("button",{staticStyle:{width:"168px",padding:"10px 20px","background-color":"#008489",color:"#fff",border:"1px solid #008489","text-align":"center","border-radius":"5px",cursor:"pointer"},attrs:{type:"submit"}},[t._v("确认并支付")])])]):t._e(),t._v(" "),2==t.payIndex?i("div",{staticStyle:{width:"500px","margin-top":"50px"}},[i("p",[t._v("通过安全链接前往微信完成添加")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.alipay(1)}}},[t._v("确认并支付")])],1):t._e(),t._v(" "),3==t.payIndex?i("div",{staticStyle:{width:"500px","margin-top":"50px"}},[i("el-form",{attrs:{model:t.creditCard}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-form-item",{attrs:{label:"名字"}},[i("el-input",{model:{value:t.creditCard.name,callback:function(e){t.$set(t.creditCard,"name",e)},expression:"creditCard.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"姓氏"}},[i("el-input",{model:{value:t.creditCard.surnames,callback:function(e){t.$set(t.creditCard,"surnames",e)},expression:"creditCard.surnames"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"information",attrs:{label:"信用卡信息"}},[i("el-input",{attrs:{placeholder:t.creditCard.prompt},model:{value:t.creditCard.information,callback:function(e){t.$set(t.creditCard,"information",e)},expression:"creditCard.information"}}),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-input",{attrs:{placeholder:t.creditCard.timePrompt},model:{value:t.creditCard.overTime,callback:function(e){t.$set(t.creditCard,"overTime",e)},expression:"creditCard.overTime"}}),t._v(" "),i("el-input",{attrs:{placeholder:"安全码"},model:{value:t.creditCard.saveNumber,callback:function(e){t.$set(t.creditCard,"saveNumber",e)},expression:"creditCard.saveNumber"}})],1)],1),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-form-item",{attrs:{label:"街道信息"}},[i("el-input",{model:{value:t.creditCard.street,callback:function(e){t.$set(t.creditCard,"street",e)},expression:"creditCard.street"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"门牌号"}},[i("el-input",{model:{value:t.creditCard.houseNumber,callback:function(e){t.$set(t.creditCard,"houseNumber",e)},expression:"creditCard.houseNumber"}})],1)],1),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-form-item",{attrs:{label:"城市"}},[i("el-input",{model:{value:t.creditCard.city,callback:function(e){t.$set(t.creditCard,"city",e)},expression:"creditCard.city"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"州/省"}},[i("el-input",{model:{value:t.creditCard.state,callback:function(e){t.$set(t.creditCard,"state",e)},expression:"creditCard.state"}})],1)],1),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-form-item",{attrs:{label:"邮政编码"}},[i("el-input",{model:{value:t.creditCard.mail,callback:function(e){t.$set(t.creditCard,"mail",e)},expression:"creditCard.mail"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"国家"}},[i("el-select",{staticStyle:{margin:"0 0",width:"202px"},attrs:{placeholder:"请选择"},model:{value:t.creditCard.country,callback:function(e){t.$set(t.creditCard,"country",e)},expression:"creditCard.country"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),i("p",{staticStyle:{color:"#008489",cursor:"pointer"},on:{click:function(e){t.Voucher=!0}}},[t._v("添加新的礼金券")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.Voucher,expression:"Voucher"}],staticStyle:{display:"flex","justify-content":"flex-start"}},[i("el-input",{staticStyle:{width:"300px","margin-right":"20px"},model:{value:t.giftVoucher,callback:function(e){t.giftVoucher=e},expression:"giftVoucher"}}),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.Voucher=!1}}},[t._v("取消")])],1),t._v(" "),i("p",[t._v("如果您以中国居民的身份预订中国的体验，您的信息将会与爱彼迎中国共享。 中国政府部门可能会要求爱彼迎中国披露与中国的体验相关的体验达人资料和参与者资料。\n              了解更多。 您还同意体验参与者免责声明、退订政策和体验参与者退款政策。")]),t._v(" "),i("div",{staticStyle:{width:"200px",padding:"10px 20px","background-color":"rgb(255, 90, 95)",color:"#fff","border-radius":"5px","text-align":"center","font-weight":"bold","font-size":"20px",cursor:"pointer"}},[t._v("确认并支付")])],1):t._e()],1)]),t._v(" "),i("div",{staticStyle:{"min-width":"300px",width:"30%","margin-left":"20px",height:"800px","margin-top":"50px",border:"1px solid #eee",padding:"20px","text-align":"left"}},[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[i("h3",[t._v(t._s(t.dataTile))])]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px"}},[i("img",{staticStyle:{"margin-top":"20px"},attrs:{src:t.dataImg,width:"200px",height:"150px"}})])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),t.activeList.day?i("div",[i("div",[i("p",[t._v(t._s(t.activeList.day)+"  | "+t._s(t.weekDay))]),t._v(" "),i("p",[t._v(t._s(t.activeList.list.time[0])+" − "+t._s(t.activeList.list.time[1]))])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),i("div",[i("span",[t._v("￥"+t._s(t.activeList.list.price))]),i("span",[i("i",{staticClass:"el-icon-close"}),t._v(t._s(t.personNumber)+"位参与者")]),t._v(" "),i("span",{staticStyle:{float:"right"}},[t._v("￥"+t._s((t.activeList.list.price*t.personNumber).toFixed(2)))])])]):t._e(),t._v(" "),t.activeList.beginTime?i("div",[i("div",[i("p",[t._v(t._s(t.activeList.beginTime)+"—"+t._s(t.activeList.endTime)+"  ")]),t._v(" "),i("p",[t._v(t._s(t.activeList.begin_time)+" − "+t._s(t.activeList.end_time))])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),i("div",[i("span",[t._v("￥"+t._s(t.activeList.price))]),i("span",[i("i",{staticClass:"el-icon-close"}),t._v(t._s(t.personNumber)+"位参与者")]),t._v(" "),i("span",{staticStyle:{float:"right"}},[t._v("￥"+t._s((t.activeList.price*t.personNumber).toFixed(2)))])])]):t._e(),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.house.length,expression:"house.length"}]},[t._l(t.house,function(e,s){return i("div",{directives:[{name:"show",rawName:"v-show",value:s<t.house.length-1,expression:"index < house.length -1 "}],key:s,staticStyle:{display:"flex","justify-content":"space-between"}},[i("p",{staticStyle:{"font-size":"15px"}},[t._v("住宿    "),i("span",[t._v(t._s(e.houseType)+" | "),i("span",[t._v("￥")]),t._v(t._s(e.price))]),t._v("/晚")]),t._v(" "),i("p",{staticStyle:{"font-size":"15px"}},[i("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"15px"}}),t._v(t._s(e.number))]),t._v(" "),i("p",{staticStyle:{"font-size":"15px"}},[i("span",[t._v("￥")]),t._v(t._s((e.price*e.number).toFixed(2)))])])}),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}})],2),t._v(" "),t.book_whole?i("div",[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("div",[t._v("是否包场")]),t._v(" "),i("div",{staticStyle:{transition:"width .5s",overflow:"hidden","border-top-right-radius":"20px","border-bottom-right-radius":"20px","border-top-left-radius":"20px","border-bottom-left-radius":"20px"},style:{width:(t.closeIndex,"70px"),backgroundColor:t.closeIndex?"#008489":"#eee"},on:{click:t.change}},[0==t.closeIndex?i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{"font-size":"30px",float:"left"}}):t._e(),t._v(" "),1==t.closeIndex?i("i",{staticClass:"el-icon-circle-check-outline",staticStyle:{"font-size":"30px","background-color":"#fff","border-radius":"50%",color:"#008489",float:"right"}}):t._e()])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}})]):t._e(),t._v(" "),i("div",[i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[t._m(1),t._v(" "),i("div",[i("div",{staticStyle:{border:"1px solid #008489",padding:"5px 0"}},[i("span",{staticStyle:{padding:"0 10px","border-right":"1px solid #008489"}},[t._v("-")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.jiJin,expression:"jiJin"}],staticStyle:{width:"40px",border:"none",padding:"10px 0"},attrs:{type:"number"},domProps:{value:t.jiJin},on:{blur:function(e){t.chooseCheck()},input:function(e){e.target.composing||(t.jiJin=e.target.value)}}})]),t._v(" "),i("p",{staticStyle:{"font-size":"12px",margin:"0 0",color:"#008489"}},[t._v("(基金余额"),i("span",[t._v(t._s(t.due_balance))]),t._v(")")])])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}})]),t._v(" "),i("div",[i("span",[t._v("总价 (CNY)")]),i("span",{staticStyle:{float:"right"}},[i("span",[t._v("￥")]),t._v(t._s(t.allPrice.toFixed(2)))])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),i("div",[i("h3",[t._v("退订政策")]),t._v(" "),i("p",[t._v(t._s(0==t.return_policy?"随时全额退款":1==t.return_policy?"活动开始24小时前":"活动开始7天前")),1==t.return_policy||2==t.return_policy?i("span",[t._v("取消可全额退款")]):t._e()])]),t._v(" "),i("hr",{staticStyle:{margin:"20px 0",border:"none","border-bottom":"1px solid #eee"}}),t._v(" "),i("div",[i("h3",[t._v("查看参与者预订条件")]),t._v(" "),i("h3",[t._v("年龄要求")]),t._v(" "),i("p",[t._v("可接待年满"+t._s(t.age_limit)+"周岁及以上的参与者。")])])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isWeixin,expression:"isWeixin"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"360px",height:"400px","background-color":"#fff","border-radius":"10px","margin-top":"-220px","margin-left":"-200px",padding:"20px"}},[0==t.isPay?i("div",[i("div",{staticStyle:{"text-align":"right"}},[i("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"25px"},on:{click:t.closeWx}})]),t._v(" "),t._m(2)]):t._e(),t._v(" "),1==t.isPay?i("div",[i("div",{staticStyle:{display:"flex","justify-content":"space-between"},style:{color:1==t.payStatus?"green":"orangered"}},[1==t.payStatus?i("div",{staticStyle:{width:"0px",height:"0px","border-top":"70px solid green","border-left":"1px solid green","border-right":"70px solid transparent",position:"relative"}},[i("div",{staticStyle:{transform:"rotate(45deg)",position:"absolute","margin-top":"-70px",right:"-31px","font-family":"华文楷体","font-weight":"bold",color:"#fff"}},[t._v("成功")])]):t._e(),t._v(" "),2==t.payStatus?i("div",{staticStyle:{width:"0px",height:"0px","border-top":"70px solid orangered","border-left":"1px solid orangered","border-right":"70px solid transparent",position:"relative"}},[i("div",{staticStyle:{transform:"rotate(45deg)",position:"absolute","margin-top":"-70px",right:"-31px","font-family":"华文楷体","font-weight":"bold",color:"#fff"}},[t._v("失败")])]):t._e(),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start",padding:"10px 0"}},[i("div",{staticStyle:{"border-radius":"5px",padding:"0px 10px"}},[i("i",{staticClass:"iconfont icon-changyonglogo28",staticStyle:{"font-size":"45px"},style:{color:1==t.payStatus?"green":"orangered"}})]),t._v(" "),t._m(3)])]),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[1==t.payStatus?i("p",[i("i",{staticClass:"el-icon-success",staticStyle:{"font-size":"50px",color:"green"}})]):t._e(),t._v(" "),2==t.payStatus?i("p",[i("i",{staticClass:"el-icon-error",staticStyle:{"font-size":"50px",color:"orangered"}})]):t._e(),t._v(" "),1==t.payStatus?i("p",{staticStyle:{"font-size":"20px"}},[i("b",[t._v("您已支付成功")])]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{"font-size":"20px",color:"orangered"}},[i("b",[t._v("您支付已过期")])]):t._e(),t._v(" "),1==t.payStatus?i("p",[t._v("欢迎预定Allptp体验项目，希望您体验愉快！")]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{color:"orangered"}},[t._v("您的支付时间已过期，请重新支付！")]):t._e(),t._v(" "),1==t.payStatus?i("p",{staticStyle:{"font-size":"15px",color:"green"}},[t._v("此订单已添加到您的交易中心！请您及时核实！")]):t._e(),t._v(" "),2==t.payStatus?i("p",{staticStyle:{"font-size":"15px",color:"orangered"}},[t._v("此订单已添加到您的未完成订单！您可前往支付！")]):t._e(),t._v(" "),1==t.payStatus?i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"50px"}},[i("el-button",{staticStyle:{color:"green"},on:{click:t.payClose}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("继续浏览")]),t._v(" "),i("el-button",{staticStyle:{color:"green"}},[t._v("订单中心"),i("i",{staticClass:"el-icon-arrow-right"})])],1):t._e(),t._v(" "),2==t.payStatus?i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"50px"}},[i("el-button",{staticStyle:{color:"orangered",border:"1px solid orangered"},on:{click:t.payClose}},[i("i",{staticClass:"el-icon-arrow-left"}),t._v("重新提交")]),t._v(" "),i("el-button",{staticStyle:{color:"orangered",border:"1px solid orangered"}},[t._v("前往支付"),i("i",{staticClass:"el-icon-arrow-right"})])],1):t._e()])]):t._e()])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.addperson,expression:"addperson"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"360px",height:"400px","background-color":"#fff","border-radius":"10px","margin-top":"-220px","margin-left":"-200px",padding:"20px"}},[i("div",{staticStyle:{margin:"20px 0"}},[t._v("\n          请填写您朋友的身份信息\n        ")]),t._v(" "),i("el-form",{attrs:{"label-position":"left","label-width":"80px",model:t.formPerson}},[i("el-form-item",{attrs:{label:"姓名"}},[i("el-input",{attrs:{onkeyup:"value=value.replace(/[\\d]/g,'')"},model:{value:t.formPerson.name,callback:function(e){t.$set(t.formPerson,"name",e)},expression:"formPerson.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系电话"}},[i("el-input",{attrs:{maxlength:"11"},model:{value:t.formPerson.mobile,callback:function(e){t.$set(t.formPerson,"mobile",e)},expression:"formPerson.mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证"}},[i("el-input",{attrs:{maxlength:"18"},model:{value:t.formPerson.idcard,callback:function(e){t.$set(t.formPerson,"idcard",e)},expression:"formPerson.idcard"}})],1)],1),t._v(" "),i("p",{staticStyle:{color:"#008489","font-size":"15px"}},[t._v("(以上信息都是选填)")]),t._v(" "),i("p",{staticStyle:{color:"#008489","font-size":"15px"}},[t._v("本公司承诺，该信息不会参与无相关的活动")]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.addperson=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addPersonForm}},[t._v("添加")])],1)],1)]),t._v(" "),t.isPassword?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",width:"400px",height:"120px",padding:"20px",top:"50%",left:"50%","margin-top":"-120px","margin-left":"-220px","background-color":"#fff"}},[i("div",{staticStyle:{"border-bottom":"1px solid #eee","text-align":"center","padding-bottom":"10px",position:"relative"}},[i("i",{staticClass:"el-icon-close",staticStyle:{cursor:"pointer","font-size":"20px",position:"absolute",left:"0"},on:{click:t.closePay}}),t._v(" "),t._m(4)]),t._v(" "),i("div",{staticClass:"password-div",on:{click:t.checkPass}},[t._m(5),t._v(" "),i("input",{directives:[{name:"myfocus",rawName:"v-myfocus"},{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"passW",type:"tel",oninput:"value=value.replace(/[^\\d]/g,'')",name:"password",maxlength:"6"},domProps:{value:t.password},on:{keydown:t.onFocus,input:function(e){e.target.composing||(t.password=e.target.value)}}})])])]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isWithdrawal,expression:"isWithdrawal"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.3)","z-index":"999"}},[i("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"340px","background-color":"#fff",padding:"20px","border-radius":"5px","margin-top":"-140px","margin-left":"-190px"}},[i("p",{staticStyle:{"text-align":"right"}},[i("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"20px"},on:{click:t.abolish}})]),t._v(" "),i("h4",[t._v("Allptop 密码设置")]),t._v(" "),i("p",{staticStyle:{"font-size":"14px",color:"#008489",margin:"20px 0"}},[t._v("您还未设置安全密码！")]),t._v(" "),i("p",[t._v("请前往【账户设置】=>【安全】=>设置安全密码，设置成功后可提现！")])])]),t._v(" "),t.isLoading?i("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0",display:"flex","justify-content":"center","align-items":"center","background-color":"rgba(255,255,255,.8)"}},[i("Loading")],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("b",[this._v("付款方式：")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("基金抵扣")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"240px",height:"300px",margin:"0 auto","border-radius":"5px","text-align":"center","background-color":"#fff",padding:"20px"}},[i("div",{staticStyle:{display:"flex","justify-content":"flex-start",width:"150px",margin:"0 auto"}},[i("div",[i("i",{staticClass:"iconfont icon-changyonglogo28",staticStyle:{"font-size":"40px",color:"green"}})]),t._v(" "),i("div",{staticStyle:{"margin-left":"20px"}},[i("span",[i("b",[t._v("微信支付")])]),i("br"),t._v(" "),i("span",{staticStyle:{"font-size":"15px"}},[t._v("WeChat Pay")])])]),t._v(" "),i("div",{staticStyle:{margin:"20px 0"},attrs:{id:"weixin"}}),t._v(" "),i("div",[i("p",[t._v("用微信扫码付款")])]),t._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[i("span",[t._v("-")]),i("span",[t._v("方便")]),i("span",[t._v("|")]),i("span",[t._v("快捷")]),i("span",[t._v("|")]),i("span",[t._v("安全")]),i("span",[t._v("-")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[e("b",[this._v("微信支付")])]),e("br"),this._v(" "),e("span",{staticStyle:{"font-size":"15px"}},[this._v("WeChat Pay")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("b",[this._v("请输入安全密码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"})])}]};var r=i("VU/8")(o,n,!1,function(t){i("LBU0")},"data-v-53fe31cd",null);e.default=r.exports}});
//# sourceMappingURL=13.c6b1afd89b8228939d6d.js.map