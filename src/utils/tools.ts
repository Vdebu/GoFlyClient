import cookies from 'js-cookie'
// 防止API请求被缓存的随机数
const fCachePreventRandom = Math.random()
let nCachePreventNum = 0
const iTools = {
  // 路由相关工具方法
  Router: {},
  // 状态管理
  Store: {},
  // 本地存储相关
  LocalStorage: {
    // 往本地添加新元素
    setItem(key: string, value: any) {
      // 以JSON形式传入数据
      localStorage.setItem(key, JSON.stringify(value))
    },
    getItem(key: string) {
      const stValue = localStorage.getItem(key)
      // 尝试强制进行JSON转换在外部使用的时候直接当JSON用就好
      try {
        return JSON.parse(stValue as string)
      } catch (e) {
        // 发生错误了直接返回取到的值
        return stValue
      }
    },
    removeItem(key: string) {
      localStorage.removeItem(key)
    },
  },
  Cookie: {
    // 设置cookie(30天有效期)
    setItem(key: string, value: any) {
      cookies.set(key, value, { expires: 30 })
    },
    // 使用?表示其是可选的
    getItem(key: string, defaultValue?: any): any {
      // 如果没有获取到key就使用defaultValue
      const stValue = cookies.get(key) || defaultValue
      // 强制进行JSON转换
      try {
        return JSON.parse(stValue)
      } catch (e) {
        return stValue
      }
    },
    removeItem(key: string) {
      cookies.remove(key)
    },
  },
  Time: {},
  Dom: {},
  // 展示加载信息
  showLoadMask() {},
  // 增加
  addCachePrevent(url: string = '') {
    // 判断是否是带参数的url
    const nQueryStringStringFlagIndex = url.indexOf('?')
    // 如果有查询参数就加个问号没就加个&
    url +=
      -1 === nQueryStringStringFlagIndex
        ? '?'
        : '&' + 'cp=' + (nCachePreventNum++ + fCachePreventRandom)
    return url
  },
  // 隐藏全局遮罩
  hideMask() {},
  // 处理API调用错误
  processAPIError(
    title: string,
    res: string | { msg: string } = { msg: '' },
    options: { bIsShowInfo: boolean } = { bIsShowInfo: true },
  ) {
    // 开始逐步构造对象
    if ('string' === typeof res) {
      res = { msg: res }
    }
    // 使用原先传入的title key进行消息格式化
    title = lpk(title)
    // 定义要展示的信息
    const stContent = lpk(res.msg) || ''
    const stMsg = `${title}:${stContent}`
    // 如果不展示信息
    if (false !== options.bIsShowInfo) {
      tools.showError(title, stContent)
    }
    // 尝试输出后端返回的错误信息
    window.console && window.console.log && window.console.log(res)
    // 抛出错误
    throw stMsg
  },
  // 展示错误信息
  showError(title: string = '', msg: string = '') {
    alert(`${title}:${msg}`)
  },
}
// 导出类型
export type ITools = typeof iTools
export default iTools
