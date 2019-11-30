import axios from "../../src";

axios({
  url:'/extend/post',
  method: 'post',
  data:{
    msg:'Hey'
  }
})

axios.request({
  url:'/extend/post',
  method:'post',
  data:{
    msg:'Hello request'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', {msg:'post'})
axios.put('/extend/put', {msg:'put'})
