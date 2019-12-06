import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

// 通过默认请求设置 可以在调试面板看到
// Content-Type: application/x-www-form-urlencoded
// 0905
// axios({
//   transformRequest:[(function(data){
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]), function(data){
//     if(typeof data === 'object'){
//       data.b = 2
//     }
//     return data
//   }],
//   url:'/config/post',
//   method:'post',
//   data:{
//     a:1
//   }
// }).then((res)=>{
//   console.log(res.data)
// })

// 0907
const fetch = axios.create({
  transformRequest:[(function(data){
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]), function(data){
    if(typeof data === 'object'){
      data.b = 2
    }
    return data
  }]
})

fetch({
  url:'/config/post',
  method:'post',
  data:{
    a:1
  }
}).then((res)=>{
  console.log(res.data)
})