import axios from "../../src";

// axios({
//   url:'/extend/post',
//   method: 'post',
//   data:{
//     msg:'Hey'
//   }
// })

// axios.request({
//   url:'/extend/post',
//   method:'post',
//   data:{
//     msg:'Hello request'
//   }
// })

// axios.get('/extend/get')
// axios.options('/extend/options')
// axios.delete('/extend/delete')
// axios.head('/extend/head')
// axios.post('/extend/post', {msg:'post'})
// axios.put('/extend/put', {msg:'put'})

interface ResponseData<T = any>{
  code: number
  result: T
  message: string
}

interface User{
  name: string
  age: number
}

function getUser<T>(){
  return axios<ResponseData<T>>({
    url:'/extend/user'
  })
    .then(res=>res.data)
    .catch(err => console.error(err))
}
async function test(){
  const user = await getUser<User>()
  if(user){
    console.log(user.result)
  }
}
test()