import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

// 通过默认请求设置 可以在调试面板看到
// Content-Type: application/x-www-form-urlencoded

axios({
  url:'/config/post',
  method:'post',
  data: qs.stringify({
    a:1
  }),
  headers:{
    test:321
  }
}).then(res=>{
  console.log(res.data)
})