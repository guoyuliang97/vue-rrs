// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "../static/css/public.css"
import "babel-polyfill";
Vue.use(MintUI)


import Store from './status/status'
Vue.prototype.Store = Store






Vue.config.productionTip = false
import ElementUI from 'element-ui'
import './assets/theme/index.css'
import '../static/css/animate.min.css'
import '../src/axios/request'

import xss from 'xss'
Vue.prototype.Xss = xss
import globalVariable from '@/api/global_variable.js'
Vue.prototype.GLOBAL = globalVariable

import getJSSDk from '../static/js/getJSSDK'
Vue.prototype.SDK = getJSSDk

import VueAreaLinkage from 'vue-area-linkage';
import 'Vue-area-linkage/dist/index.css';
Vue.use(VueAreaLinkage)

import axios from 'axios'
Vue.prototype.$http = axios


import VueDND from 'awe-dnd'
Vue.use(VueDND)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title || 'Allptp'
  document.querySelector('meta[name="baidu-site-verification"]').setAttribute('content','l1YQyZLrc6')
  document.querySelector('meta[name="keywords"]').setAttribute('content', '人人耍、非物质文化遗产、户外活动、民族文化、应有尽有的人文旅游体验平台')
  document.querySelector('meta[name="description"]').setAttribute('content', '一个关于非物质文化遗产、趣味十足的户外活动、各具特色的民族文化的新体验旅游平台。在这里！你将感受前所未有的活动体验，为你的旅游生活带来更多的欢乐与享受！你也可以发布属于自己的各种活动，让更多的游客来感受和体验')
  if(to.meta.requireAuth){
    if(to.meta.requireData){
      if(to.query.information){
        next()
      }else{
        next({
          path: '/language'
        })
      }
    }else{
      if(JSON.parse(localStorage.getItem('isLogin'))){
        next()
      }else{
        next({
          path: '/logion'
        })
      }
    }
  }else{
    if(to.meta.isLoginA){
      console.log(to)
      if(to.query.userId){
        next()
      }else{
        next({
          path: '/'
        })
      }
    }else{
      next()
    }
  }
  if(to.fullPath == "/logion"){
    if(JSON.parse(localStorage.getItem('isLogin'))){
    next({        path:from.fullPath
    });
  }else {
    next();
  }
  }
})



/*var name = location.hostname
var href = location.href
var pathName = location.pathname
var newhref = ''
if(name != 'localhost' && name.indexOf('192') == -1 && href.indexOf('.top') == -1){
   if(href.indexOf('www') === -1 && href.indexOf('.cn') !== -1){
      window.location.href = 'www.'+href.slice(8)
   }
   if(href.indexOf('.cn') === -1 && href.indexOf('www') !== -1){
     window.location.href = href.slice(0,18) + '.cn'+pathName
   }
    if(href.indexOf('.cn') === -1 && href.indexOf('www') === -1){
      newhref = href.slice(0,8) + 'www.'+href.slice(8)
      newhref = newhref.slice(0,18) + '.cn'+pathName
      window.location.href = newhref
    }
}*/
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
