import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'
import { head } from 'shelljs'
function axios(config: AxiosRequestConfig): void {
  // 处理config参数
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  // 首先处理url参数
  config.url = transformURL(config)
  // 需要先转换headers 因为在headers的转换中判断了data的类型
  // 如果先转换data类型 会导致headers的转换不准确
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // headers 是可选值, 所以必须设置默认值
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
