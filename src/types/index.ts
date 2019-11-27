// 作为项目中所有公共类型的编译文件

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delte'
  | 'DELETE'
  | 'heade'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
