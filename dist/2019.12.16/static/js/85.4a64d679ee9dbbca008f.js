webpackJsonp([85],{"9a4f":function(e,t){},ePHz:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"makeBlock",data:function(){return{api:this.GLOBAL.baseURL,checked:!1,price:"",priceChoose:!1,money:"",isMoney:!1,currency:[{value:0,label:"人民币-￥"},{value:1,label:"美元-$"},{value:2,label:"日元-J.￥ "}],complete:"",active_id:""}},methods:{cancel:function(){this.price="",this.checked=!1,this.priceChoose=!1},sendActive:function(){var e=this;1==this.checked?this.price&&/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.price)?this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,book_whole:this.checked,low_price:this.price,step:15}).then(function(t){1==t.data.code?e.complete?e.$message({type:"success",message:"保存成功！"}):e.$emit("changeRouter",{id:16,router:"needVolunter",information:e.active_id,complete:e.complete}):3==t.data.code?e.sendActive():0==t.data.code&&e.$alert(t.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),book_whole:this.checked,low_price:this.price,step:15}).then(function(t){1==t.data.code?(e.$emit("saveId",t.data.data),e.$emit("changeRouter",{id:16,router:"needVolunter",information:t.data.data})):3==t.data.code?e.sendActive():0==t.data.code&&e.$alert(t.data.msg)}):this.$message({type:"info",message:"请填写正确金额！（最多保留两位小数的正数）"}):this.active_id?this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),activity_id:this.active_id,book_whole:this.checked,low_price:this.price,step:15}).then(function(t){1==t.data.code?e.complete?e.$message({type:"success",message:"保存成功！"}):e.$emit("changeRouter",{id:16,router:"needVolunter",information:e.active_id,complete:e.complete}):3==t.data.code?e.sendActive():0==t.data.code&&e.$alert(t.data.msg)}):this.$http.post(this.api+"/home/Activity/save_activity",{token:localStorage.getItem("token"),book_whole:this.checked,low_price:this.price,step:15}).then(function(t){1==t.data.code?(e.$emit("saveId",t.data.data),e.$emit("changeRouter",{id:16,router:"needVolunter",information:t.data.data})):3==t.data.code?e.sendActive():0==t.data.code&&e.$alert(t.data.msg)})},getActives:function(){var e=this;this.$http.post(this.api+"/ActivityE",{token:localStorage.getItem("token"),activity_id:this.active_id,visit:0}).then(function(t){1==t.data.code?(t.data.data.currency>=0?(e.money=t.data.data.currency,e.isMoney=!0):e.isMoney=!1,t.data.data.book_whole&&(e.checked=!0,e.price=t.data.data.low_price)):3==t.data.code?e.getActives():0==t.data.code&&e.$alert(t.data.msg)})}},mounted:function(){this.active_id&&this.getActives()},created:function(){window.scroll(0,0),this.complete=this.$route.query.complete,this.active_id=this.$route.query.information}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"exp_con"},[i("h2",{staticClass:"title"},[e._v("体验包场")]),e._v(" "),i("p",{staticClass:"language_txt",staticStyle:{"font-size":"18px"}},[e._v("如果参与者可以包下整场体验，您就不必费心等待更多预订，从而进一步专注于分享您的专业知识。")]),e._v(" "),i("p",{staticClass:"language_txt",staticStyle:{"font-size":"18px"}},[e._v("  参与者可以把单次体验整个包下来作为私人体验。 如果您日历上的某次体验还没有人预订，参与者可以包下整场体验。")]),e._v(" "),i("el-checkbox",{staticStyle:{margin:"20px 0"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("允许参与者包场")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.checked,expression:"checked"}]},[i("h2",{staticStyle:{margin:"10px 0"}},[e._v("设置最低价格")]),e._v(" "),i("p",{staticStyle:{margin:"10px 0"}},[e._v("这是您为体验包场设置的最低价格。")]),e._v(" "),i("div",{staticStyle:{display:"flex","justify-content":"flex-start",margin:"10px 0"}},[i("div",{staticStyle:{"line-height":"40px",border:"1px solid #008489","border-radius":"5px",padding:"0 10px","border-right":"none"}},[e._v("\n       APY(人民币)\n     ")]),e._v(" "),i("div",{staticStyle:{border:"1px solid #d93900",width:"300px","border-radius":"5px","padding-left":"10px"},style:{"background-color":""==e.price?"rgba(252, 100, 45,)":"#fff",border:""==e.price?"1px solid #d93900":"1px solid #008489"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"price"}],staticStyle:{width:"200px",height:"38px","font-size":"15px",border:"0"},attrs:{placeholder:"输入最低价格"},domProps:{value:e.price},on:{input:function(t){t.target.composing||(e.price=t.target.value)}}})])]),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:""==e.price,expression:"price == ''"}],staticStyle:{color:"#d93900"}},[e._v("体验包场必须设置最低价格")]),e._v(" "),i("p",{staticStyle:{margin:"10px 0"}},[e._v("如果每人的费用高于输入的最低价格，参与者将支付较高的金额。")]),e._v(" "),1==e.checked?i("div",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:e.sendActive}},[e._v(e._s(e.complete?"保存":"下一步"))]),e._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:e.cancel}},[e._v("撤销")])],1):e._e()]),e._v(" "),0==e.checked?i("div",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:e.sendActive}},[e._v(e._s(e.complete?"保存":"下一步"))])],1):e._e()],1)},staticRenderFns:[]};var o=i("VU/8")(a,c,!1,function(e){i("9a4f")},"data-v-68a7cb87",null);t.default=o.exports}});
//# sourceMappingURL=85.4a64d679ee9dbbca008f.js.map