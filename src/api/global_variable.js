var baseURL = ''
var webs = ''
var domain = '/web'
var origin=location.hostname
if(origin == 'localhost' || origin.indexOf('192') != -1){
/*  origin = 'http://192.168.0.112/allptp'*/
  origin = 'https://www.allptp.top'
  baseURL = origin + domain
  webs = 'ws://192.168.0.112:8282'
}else if(origin.indexOf('.top') != -1){
  baseURL =  domain
  webs = 'wss://www.allptp.top:8282'
}else{
  baseURL =  domain
  webs = 'wss://www.allptp.cn:8282'
}
export default {
  baseURL,webs
}



