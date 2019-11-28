import { isPlainObject } from './utils'
export function transformRequest(data: any): any {
  // xhr原生支持formdata blob类型 所以就不用二次转换
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }
  return data
}
