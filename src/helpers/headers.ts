import { isPlainObject, deepMerge } from './utils'
import { parse } from 'path'
import { Method } from '../types'
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

// 0511 处理响应的headers
// xhr中使用getAllResponseHeaders返回的是一段字符串 不便于使用 所以转换成对象
/* 这种格式
    "connection: keep-alive
    content-length: 13
    content-type: application/json; charset=utf-8
    date: Thu, 28 Nov 2019 03:25:51 GMT
    etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
    x-powered-by: Express
    "
*/
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parse
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    let val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
