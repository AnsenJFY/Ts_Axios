import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  // 处理config参数
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  // 首先处理url参数
  config.url = transformURL(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
