import axois from 'axios'
import GLOBAL from '../api/global_variable'

const baseUrl = GLOBAL.baseURL


export function post(api,params){
    params.token = localStorage.getItem('token')
    return new Promise((resolve,reject) =>{
        axois.post(baseUrl + api,params)
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

export function get(api,params){
    params.token = localStorage.getItem('token')
    return new Promise((resolve,reject)=>{
        axois.get(baseUrl + api,{
            data: params
        })
        .then(res=>{
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}