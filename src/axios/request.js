
import axios from 'axios'
import globalVariable from '../api/global_variable.js'
import {Message} from 'element-ui'
import router from '../router'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {

  return config
}, error => {
  Message.info({message:'请求超时，刷新后重试'})
  return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(res => {// 响应成功关闭loading 
  const code = res.data.code
  switch (code) {
    case 3:
      axios.post(globalVariable.baseURL + '/home/index/token')
        .then(msg=>{
          localStorage.setItem('token',msg.data.data)
        })
          break;
    case 4:
      // axios.post(globalVariable.baseURL + '/home/index/token')
      //   .then(msg=>{
      //     localStorage.setItem('token',msg.data.data)
      //   })
      router.push('/logion')
          break;
    case 0:
      Message.error({message:res.data.msg})
      break;
    case 5:
      Message.info({message:res.data.msg})
          break;
    case 6:
      Message.info({message:res.data.msg})
          break;
    case 7:
      Message.info({message:res.data.msg})
          break;
    case 99:
      Message.info({message:res.data.msg})
          break
  }
  return res
}, error => {
      router.push('/')
      Message.info({message:'哎哟，服务器跑到火星了！'})
  return Promise.reject(error)
})
export default axios


