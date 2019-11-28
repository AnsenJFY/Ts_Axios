import axios, { AxiosError } from '../../src/index'

// 未配置对应路由 404
axios({
  method:'get',
  url:'/error/get1',
}).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e)
})

// 正常的get请求 在路由中有概率会返回失败
axios({
  method:'get',
  url:'/error/get',
}).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e)
})

setTimeout(() => {
  axios({
    method:'get',
    url:'/error/get',
  }).then(res=>{
    console.log(res)
  }).catch((e:AxiosError) =>{
    console.log(e)
  })
}, 5000);

// 模拟超时
axios({
  method:'get',
  url:'/error/timeout',
  timeout: 2000
}).then(res=>{
  console.log(res)
}).catch((e)=>{
  console.log(e)
})