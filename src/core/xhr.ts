import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { cookie } from '../helpers/cookie'
import { isFormData } from '../helpers/utils'
import btoa from 'btoa'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config
    // 创建一个 request 实例
    const request = new XMLHttpRequest()
    // 执行 request.open 方法初始化
    request.open(method.toUpperCase(), url!, true)
    // 执行 configureRequest 配置 request 对象
    configureRequest()
    // 执行 addEvents 给 request 添加事件处理函数
    addEvents()
    // 执行 processHeaders 处理请求 headers
    processHeaders()
    // 执行 processCancel 处理请求取消逻辑
    processCancel()
    // 执行 request.send 方法发送请求
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      // 0601 设置超时
      if (timeout) {
        request.timeout = timeout
      }
      // 1101 设置跨域cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange
      // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        // 0601 响应状态码非2xx状态时
        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
      // 0601 网络错误
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }
      // 0601 请求超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }
      // 监听上传和下载的进度
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 监控上传和下载的进度
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      // XSRF
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
      // HTTP授权
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      // 判断Data类型 设置对应的headers
      Object.keys(headers).forEach(name => {
        // data为空时, headers是没有意义的
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `request fail with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
