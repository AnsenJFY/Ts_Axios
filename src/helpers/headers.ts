import { isPlainObject } from './utils'
function nomalizeHeaderName(headers: any, nomalizeHeaderName: string): void {
  // 实现Content-Type大小写的规范化
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== nomalizeHeaderName && name.toUpperCase() === nomalizeHeaderName.toUpperCase()) {
      headers[nomalizeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  nomalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    // 只有参数是常规对象且未配置headers的时候,才进行配置
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
