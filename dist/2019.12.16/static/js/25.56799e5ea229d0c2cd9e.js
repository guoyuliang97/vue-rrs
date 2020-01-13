webpackJsonp([25],{MXC2:function(t,e){},oWBE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("MXC2");var i=a("DjrJ"),o=(i.a,{name:"transaction",data:function(){return{api:this.GLOBAL.baseURL,transactionlist:[{title:"交易记录",router:"/records"},{title:"已完成订单",router:"/completeOrder"},{title:"待体验订单",router:"/stayOrder"},{title:"进行中订单",router:"/goingOrder"},{title:"未完成订单",router:"/noComplete"},{title:"退款订单",router:"/refundOrder"}],imgUrl:"",is_setpwd:"",isWithdrawal:!1,formLabelAlign:{password:"",re_password:""},type:"",bankList:[],bankChose:"",monney:"",due_balance:"",unpaid_amount:"",isPassword:!1,password:"",aindex:0}},components:{Head:i.a},watch:{password:function(){6==this.password.length&&(this.sendDraw(),this.aindex=0)}},mounted:function(){this.getbank(),this.getbalance()},methods:{sendDraw:function(){var t=this;this.$http.post(this.api+"/Draw",{token:localStorage.getItem("token"),amount:this.monney,bank_id:this.bankChose,pay_password:this.password}).then(function(e){1==e.data.code?(t.isPassword=!1,t.password="",t.isWithdrawal=!1,t.$message({type:"success",message:"提交成功！"})):3==e.data.code?t.$http.post(t.api+"/home/Index/token").then(function(e){localStorage.setItem("token",e.data.data),t.sendDraw()}):0==e.data.code&&(alert(e.data.msg),t.isPassword=!1,t.password="")})},getbalance:function(){var t=this;this.$http.post(this.api+"/balance",{token:localStorage.getItem("token"),page:1}).then(function(e){1==e.data.code?(t.due_balance=e.data.data.due_balance,t.unpaid_amount=e.data.data.unpaid_amount):3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getbalance()}):0==e.data.code&&alert(e.data.msg)})},getbank:function(){var t=this;this.$http.post(this.api+"/bankl",{token:localStorage.getItem("token")}).then(function(e){1==e.data.code?t.bankList=e.data.data:3==e.data.code?t.$http.post(t.api+"/home/index/token").then(function(e){localStorage.setItem("token",e.data.data),t.getbank()}):0==e.data.code&&alert(e.data.msg)})},toRouter:function(t,e){this.$router.push(t.router)},reload:function(t){this.is_setpwd=t.data.data[0].is_setpwd,t.data.data[0].head_image?this.imgUrl=t.data.data[0].headimage.domain+t.data.data[0].headimage.image_url:this.imgUrl="../../static/img/static/user.png"},withdrawal:function(){this.is_setpwd?this.$router.push({path:"/withdrawal",query:{information:this.due_balance}}):(this.isWithdrawal=!0,this.type=1)},abolish:function(){this.isWithdrawal=!1,this.formLabelAlign={password:"",re_password:""}},allReduce:function(){this.monney=this.due_balance},returnBack:function(){this.isWithdrawal=!1,this.monney="",this.bankChose=""},refer:function(){/^0|0[.]?[0]∗0/.test(this.monney)?this.$message({type:"info",message:"金额不能为0"}):(this.isPassword=!0,this.pay())},pay:function(){var t=this;this.$nextTick(function(){t.$refs.input.focus()})},onFocus:function(){var t=document.getElementsByClassName("list");99===event.keyCode||96===event.keyCode||97===event.keyCode||98===event.keyCode||99===event.keyCode||100===event.keyCode||101===event.keyCode||102===event.keyCode||103===event.keyCode||104===event.keyCode||105===event.keyCode||48===event.keyCode||49===event.keyCode||50===event.keyCode||51===event.keyCode||52===event.keyCode||53===event.keyCode||54===event.keyCode||55===event.keyCode||56===event.keyCode||57===event.keyCode?(t[this.aindex].innerHTML="*",this.aindex+=1):8===event.keyCode&&(this.aindex-=1,t[this.aindex].innerHTML=" ")},toSave:function(){localStorage.setItem("rt","security"),localStorage.setItem("accountNav","4"),this.$router.push({path:"/security"})}},destroyed:function(){localStorage.removeItem("dis")}}),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("Head",{attrs:{type:"transaction"},on:{reload:t.reload}})],1),t._v(" "),a("div",{staticStyle:{"background-color":"#eee",width:"100%",padding:"100px 0"}},[a("div",{staticStyle:{width:"1080px",margin:"0 auto",display:"flex","justify-content":"flex-start"}},[a("div",{staticStyle:{width:"250px"}},[a("div",{staticStyle:{width:"250px",height:"220px","border-radius":"10px","background-color":"#fff"}},[a("div",[a("img",{staticStyle:{"border-radius":"50%","margin-top":"50px"},attrs:{src:t.imgUrl,width:"72px",height:"72px"}})]),t._v(" "),a("p",{staticStyle:{margin:"10px 0","font-size":"14px"}},[t._v("总额："+t._s(parseFloat(t.due_balance,2)+parseFloat(t.unpaid_amount,2)?(parseFloat(t.due_balance,2)+parseFloat(t.unpaid_amount,2)).toFixed(2):0))]),t._v(" "),a("p",[a("span",{staticStyle:{"font-size":"12px",color:"#008489"}},[t._v("（可用余额："+t._s(t.due_balance)+"   未到账：￥"+t._s(t.unpaid_amount?t.unpaid_amount:0)+"）")])]),t._v(" "),a("p",{staticStyle:{margin:"10px 0","font-size":"14px",color:"#008489",cursor:"pointer"}},[a("i",{staticClass:"iconfont icon-tixian",on:{click:t.withdrawal}},[t._v("   提现")])])]),t._v(" "),a("div",{staticStyle:{"margin-top":"20px",width:"230px","background-color":"#fff","border-radius":"10px",padding:"10px 10px","font-size":"14px"}},[a("ul",t._l(t.transactionlist,function(e,i){return a("li",{key:i,staticStyle:{padding:"10px 0",display:"flex",cursor:"pointer","justify-content":"space-between","border-bottom":"1px solid #eee"},on:{click:function(a){t.toRouter(e,i)}}},[a("span",[t._v(t._s(e.title))]),t._m(0,!0)])}))])]),t._v(" "),a("div",{staticStyle:{width:"800px","margin-left":"30px",height:"auto"}},[a("router-view")],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isWithdrawal,expression:"isWithdrawal"}],staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.3)","z-index":"999"}},[1==t.type?a("div",{staticStyle:{position:"fixed",top:"50%",left:"50%",width:"340px","background-color":"#fff",padding:"20px","border-radius":"5px","margin-top":"-140px","margin-left":"-190px"}},[a("p",{staticStyle:{"text-align":"right"}},[a("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"20px"},on:{click:t.abolish}})]),t._v(" "),a("h4",[t._v("Allptop 密码设置")]),t._v(" "),a("p",{staticStyle:{"font-size":"14px",color:"#008489",margin:"20px 0"}},[t._v("您还未设置安全密码！")]),t._v(" "),a("p",[t._v("请前往【账户设置】=>【安全】=>设置安全密码，设置成功后可提现！"),a("span",{staticStyle:{"border-bottom":"1px solid #008489",color:"#008489"},on:{click:t.toSave}},[t._v("立即前往")])])]):t._e(),t._v(" "),2==t.type?a("div",{staticStyle:{width:"380px",height:"340px",padding:"20px 0","border-radius":"5px","background-color":"#eee",top:"50%",left:"50%",position:"fixed","margin-top":"-190px","margin-left":"-190px"}},[a("div",{staticStyle:{"text-align":"left"}},[a("i",{staticClass:"el-icon-arrow-left",staticStyle:{cursor:"pointer","font-size":"20px"},on:{click:t.returnBack}})]),t._v(" "),a("h4",{staticStyle:{"background-color":"#fff",padding:"10px 0"}},[t._v("Allptop 基金提现")]),t._v(" "),a("div",[a("p",{staticStyle:{"background-color":"#fff",padding:"10px 10px",margin:"10px 0","text-align":"left","font-size":"12px","font-weight":"bold"}},[t._v("选择银行卡账户:")]),t._v(" "),a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.bankChose,callback:function(e){t.bankChose=e},expression:"bankChose"}},t._l(t.bankList,function(t,e){return a("el-option",{key:e,attrs:{label:t.bank_name+"          "+t.card_number.replace(/\s/g,"").replace(/(\d{4})\d+(\d{4})$/,"**** **** **** $2"),value:t.bank_id}})}))],1),t._v(" "),a("div",{staticStyle:{padding:"10px",margin:"10px 0","background-color":"#fff","font-size":"12px","text-align":"left"}},[a("p",[t._v("提现金额（收取0.1%服务费）")]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"flex-start",padding:"10px 0","border-bottom":"1px solid #eee"}},[a("span",{staticStyle:{"font-size":"15px","margin-right":"10px"}},[t._v("￥")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.monney,expression:"monney"}],staticStyle:{border:"none","font-size":"20px",width:"250px"},attrs:{type:"number",onkeyup:"this.value= this.value.match(/\\d+(\\.\\d{0,2})?/) ? this.value.match(/\\d+(\\.\\d{0,2})?/)[0] : ''"},domProps:{value:t.monney},on:{input:function(e){e.target.composing||(t.monney=e.target.value)}}})]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"space-between","padding-top":"10px"}},[a("span",[t._v("可用余额"+t._s(t.due_balance)+"元")]),a("span",{staticStyle:{cursor:"pointer",color:"#008489"},on:{click:t.allReduce}},[t._v("全部提现")])])]),t._v(" "),a("div",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",disabled:!t.monney,plain:""},on:{click:t.refer}},[t._v("预计两小时到账，确认提现")])],1)]):t._e(),t._v(" "),t.isPassword?a("div",{staticStyle:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","background-color":"rgba(0,0,0,.5)"}},[a("div",{staticStyle:{position:"fixed",width:"400px",height:"200px",padding:"20px",top:"50%",left:"50%","margin-top":"-120px","margin-left":"-220px","background-color":"#fff"}},[a("div",{staticStyle:{"border-bottom":"1px solid #eee","text-align":"left","padding-bottom":"10px"}},[a("i",{staticClass:"el-icon-close",staticStyle:{cursor:"pointer","font-size":"20px"},on:{click:function(e){t.isPassword=!1}}}),t._v(" "),t._m(1)]),t._v(" "),a("div",{staticStyle:{"border-bottom":"1px solid #eee",padding:"10px 0"}},[a("p",{staticStyle:{"font-size":"14px"}},[t._v("零钱提现")]),t._v(" "),a("p",{staticStyle:{margin:"10px 0","font-size":"20px"}},[a("b",[t._v("￥"+t._s(t.monney))])]),t._v(" "),a("p",{staticStyle:{"font-size":"12px",color:"#A9A9A9"}},[t._v("(额外扣除￥"+t._s(.1*t.monney/100)+"服务费)")])]),t._v(" "),a("div",{staticClass:"password-div"},[t._m(2),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],ref:"input",attrs:{type:"number",oninput:"value=value.replace(/[^\\d]/g,'')",name:"password",maxlength:"6"},domProps:{value:t.password},on:{keydown:t.onFocus,input:function(e){e.target.composing||(t.password=e.target.value)}}})])])]):t._e()])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"el-icon-arrow-right"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("b",[this._v("请输入支付密码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"}),this._v(" "),e("li",{staticClass:"list"})])}]};var s=a("VU/8")(o,n,!1,function(t){a("uINU")},"data-v-b2d872e2",null);e.default=s.exports},uINU:function(t,e){}});
//# sourceMappingURL=25.56799e5ea229d0c2cd9e.js.map