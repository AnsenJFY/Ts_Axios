import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'

const strats = Object.create(null)

// 默认策略如果有配置2则优先使用配置2
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只使用配置2中的参数
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 针对对象的复杂合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    // 如果是一个对象形式则深拷贝val2
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    // 如果不是对象形式也不是undefined 即简单类型则直接返回
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeyDeepMerge = ['headers']
stratKeyDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

// 配置合并的策略
// 如果配置2中的参数是stratKeysFromVal2中列举的 则后者覆盖前者
// 否则使用配置1中的参数

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 正对两个config中不同的字段制定不同的合并策略,最终赋值给config
  const config = Object.create(null)

  // 遍历配置2中的k&v
  for (let key in config2) {
    mergeField(key)
  }
  // 遍历配置1中的k&v
  for (let key in config1) {
    // 且配置1中出现的参数不得出现在配置2中
    if (!config2[key]) {
      mergeField(key)
    }
  }
  // 这个函数的意义在于 根据传入的key的类型
  // 选择合适的合并策略方法
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
