import { get, isArray } from 'lodash'
import tools from '../utils/tools.ts'
// 语言包通用kv类型
const tblLpk: Record<string, string | string[]> = {}
const LocalStorageName = 'locale'
// 导出的初始化方法
export const initLpk = () => {
  // 从本地获取所有的语言包信息(/src/locales)
  // eager:true -> 热启动
  mergeLpk(import.meta.glob('@/locales/*', { eager: true }))
}
// 返回当前使用的语言包
export const getLocale = () => {
  // 默认语言包
  const defaultLocale = 'zh-CN'
  let stLanguage: string | undefined = defaultLocale
  // 优先从登入者自定义信息中获取语言环境
  // 第一个参数是一个对象 第二个参数是对象的健 返回值
  stLanguage = get(app.getAppCtl().getLoginUser(), 'cust.locale')
  // 从本地存储中获取
  stLanguage = stLanguage || tools.LocalStorage.getItem(LocalStorageName)
  // 使用默认语言包
  stLanguage = stLanguage || defaultLocale
  return stLanguage
}
// 自定义类型用于存储语言包内容
type ILpkFile = {
  // /src/locales/ch-CN.ts -> JSON数据
  [path: string]: {
    default: Record<string, string | string[]>
  }
}
// 将获取到的语言包信息整合使用
export const mergeLpk = (lpkFiles: ILpkFile) => {
  // 将文件内容整合到tblLpk
  // 获取语言包信息
  const stLocale = getLocale()
  // 遍历读入的本地语言包数据找到当前语言包
  for (const path in lpkFiles) {
    if (-1 == path.indexOf(stLocale)) {
      // 查找子字符串若不存在当前目标的语言包进行下一轮迭代
      continue
    }
    // 解释JSON对象 从当前对象中将default值取出来
    const { default: iLpkFileItem } = lpkFiles[path]
    // 将读取到的值存储到本地变量中
    for (const key in iLpkFileItem) {
      tblLpk[key] = iLpkFileItem[key]
    }
    break
  }
}
// 作为全局方法导出使用
export type IFnLpk = (key: string, options?: { index: number; default?: string }) => string
// App.vue中使用的语言包配置方法
export const lpk: IFnLpk = (key, options) => {
  // 获取载入语言包中的键值信息
  // lpk('zh-CN',{idx:1,default:''})
  const mixValue = tblLpk[key]
  // 数组越界访问是不会报错的
  if (isArray(mixValue)) {
    // 返回索引下的值(避免undefined原封不动返回key保底)
    return mixValue[options?.index || 0] || options?.default || key
  }
  // 单个string不是数组
  return mixValue || options?.default || key
}
// 更换语言包(绑定到Ctl上进行使用)
export const changeLocale = (Locale: string) => {
  // 若已登入调用API接口更新用户数据
  // 在本地缓存最新的语言包
  tools.LocalStorage.setItem(LocalStorageName, Locale)
  // 刷新页面防止UI错位
  document.location.reload()
}
