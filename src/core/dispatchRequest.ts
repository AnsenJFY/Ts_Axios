import xhr from './xhr'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
// import { transformRequest, transformResponse } from '../helpers/data'
// import { processHeaders } from '../helpers/headers'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 检测是否曾经使用过cancelToken这个函数
  throwIfCancellationRequested(config)
  // 处理config参数
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // 首先处理url参数
  config.url = transformURL(config)

  // 需要先转换headers 因为在headers的转换中判断了data的类型
  // 如果先转换data类型 会导致headers的转换不准确
  // config.headers = transformHeaders(config) // 0905注释
  // config.data = transformRequestData(config) //0905注释

  // 这个方法已经可以取代上述的两个方法
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}

// 0905 注释
// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig): any {
//   // headers 是可选值, 所以必须设置默认值
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
