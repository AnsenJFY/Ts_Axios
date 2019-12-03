import { AxiosRequestConfig } from './types'

// 默认的请求配置
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

// 不携带参数的请求方式
const methodsWithoutData = ['delete', 'get', 'head', 'options']
methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

// 携带参数的请求方法
const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
