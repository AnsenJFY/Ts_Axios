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
})

const arr = new Int32Array([21,31])
axios({
  method:'post',
  url:'/base/buffer',
  data:arr
})