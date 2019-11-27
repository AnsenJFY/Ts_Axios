import { isPlainObject } from './utils'
export function transformRequest(data: any): any {
  // xhr原生支持formdata blob类型 所以就不用二次转换
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
