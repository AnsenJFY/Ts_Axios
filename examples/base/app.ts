import axios from '../../src/index';
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'foo',
//     bar: 'baz'
//   }
// })

// const date = new Date()
// axios({
//   method: 'get',
//   url: '/base/get',
//   params:{
//     date
//   }
// })

// axios({
//   method:'get',
//   url:'/base/get',
//   params:{
//     foo:'@:$'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'foo',
//     bar: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'foo'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=foo1',
//   params: {
//     bar: 'bar'
//   }
// })

axios({
  method:'post',
  url:'/base/post',
  data:{
    a:1,
    b:2
  }
}).then(res=>{
  console.log(res)
})

axios({
  method:'post',
  url:'/base/post',
  headers:{
    'content-type':'application/json',
    'Accept':'application/json, text/plain, */*'
  },
  data:{
    a:1,
    b:2
  }
}).then(res=>{
  console.log(res)
})

// 使用URLSearchParams后 会将请求的参数转换成formData的形式
// XHR中会针对formData的数据格式自动选择合适的headers类型
// 本demo中的headers为Content-Type: application/x-www-form-urlencoded;charset=UTF-8
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString);
axios({
  method:'post',
  url:'/base/post',
  data:searchParams
}).then(res=>{
  console.log(res)
})

// const arr = new Int32Array([21,31])
// axios({
//   method:'post',
//   url:'/base/buffer',
//   data:arr
// })