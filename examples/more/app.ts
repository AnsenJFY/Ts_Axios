import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error'
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

