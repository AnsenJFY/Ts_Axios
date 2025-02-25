import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error'
import qs from 'qs'
// import 'nprogress/nprogress.css'
// import NProgress from 'nprogress'

// // document.cookie = 'a=b'

// // axios.get('/more/get').then(res => {
// //   console.log(res)
// // })

// // axios.post('http://127.0.0.1:8088/more/server2', { }, {
// //   withCredentials: true
// // }).then(res => {
// //   console.log(res)
// // })

// // XSRF设置跨域安全
// // const instance = axios.create({
// //   xsrfCookieName:'XSRF-TOKEN-D',
// //   xsrfHeaderName:'X-XSRF-TOKEN-D'
// // })
// // instance.get('/more/get').then(res=>{
// //   console.log(res)
// // })

// // 上传下载进度
// const instance = axios.create()

// function calculatePercentage(loaded: number, total: number){
//   return Math.floor(loaded * 1.0) / total
// }

// function loadProgressBar(){
//   // 开始
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//   // 更新进度信息
//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
//   // 停止进度更新
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }
//   // 执行
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')

// downloadEl!.addEventListener('click', e =>{
//   instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if(fileEl.files){
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

// // HTTP 授权
// axios.post('/more/post',{
//   a:1
// },{
//   auth:{
//     username:'Ansen',
//     password:'123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// 自定义合法状态码
// 失败
// axios.get('/more/304').then(res =>{
//   console.log(res)
// }).catch((e:AxiosError) => {
//   console.log(e.message)
// })
// 成功
axios.get('/more/304',{
  validateStatus(status){
    return status >=200 && status < 400
  }
}).then(res=>{
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
})

// //自定义参数序列化
// axios.get('/more/get',{
//   params: new URLSearchParams('a=b&c=d')
// }).then(res=>{
//   console.log(res)
// })
// axios.get('/more/get',{
//   params:{
//     a:1,
//     b:2,
//     c:['a','b','c']
//   }
// }).then(res=>{
//   console.log(res)
// })

// const instance = axios.create({
//   paramsSerializer(params){
//     return qs.stringify(params, { arrayFormat: 'brackets'})
//   }
// })
// instance.get('/more/get',{
//   params:{
//     a:1,
//     b:2,
//     c:['a','b','c']
//   }
// }).then(res=>{
//   console.log(res)
// })

// baseURL
// const instance = axios.create({
//   baseURL: 'https://img.mukewang.com/'
// })

// instance.get('5cc01a7b0001a33718720632.jpg')

// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// 静态方法拓展
// function getA() {
//   return axios.get('/more/A')
// }

// function getB() {
//   return axios.get('/more/B')
// }

// axios.all([getA(), getB()])
//   .then(axios.spread(function(resA, resB) {
//     console.log(resA.data)
//     console.log(resB.data)
//   }))


// axios.all([getA(), getB()])
//   .then(([resA, resB]) => {
//     console.log(resA.data)
//     console.log(resB.data)
//   })

// const fakeConfig = {
//   baseURL: 'https://www.baidu.com/',
//   url: '/user/12345',
//   params: {
//     idClient: 1,
//     idTest: 2,
//     testString: 'thisIsATest'
//   }
// }
// console.log(axios.getUri(fakeConfig))