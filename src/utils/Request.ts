// 基于Axios实现Ajax的凤凰

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'qs'
import { LOGIN_TOKEN } from './Constants.ts'
import { data } from 'autoprefixer'
import { get } from 'lodash'
// 引入app防止后续在init方法中引入提示app未定义(还没挂载到窗口上)导致初始化失败
import app from '../config/app.ts'
// 拓展Axios的类型适配后端返回的数据类型
export interface IResponse<T = any> {
  code: number
  message: string
  data: T
}
// 拓展Axios的请求参数类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
  reqParams?: AxiosRequestConfigExt // 方便之后取值
  // 添加自定义字段
  showLoading?: boolean // 是否显示Loading提示
  bIsNeedCachePrevent?: boolean // 避免浏览器对API请求进行缓存(是否要添加防缓存的cp随机数)
  bIsNeedJSONStringify?: boolean // 判断是否需要进行序列化
  bIsNeedQSStringify?: boolean // 是否需要qs.stringify
  force401ToLogin?: boolean // 对401是否强制跳转到登录界面
}
// 设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;charset=utf-8'
let timerLoading: ITimeout

// 定义模块内全局变量
const axiosInstance: AxiosInstance = axios.create({
  // 自定义配置选项
  baseURL: app.getConfig('baseUrl'),
  timeout: 10000, // 十秒钟超时
})

// 后置拦截器
// 定义每次请求相应处理 -> 这两个any分别限制了什么？AxiosResponse<any,any>
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<IResponse>) => {
    // 请求未出现异常会进行的处理
    // 清除计时器
    clearTimeout(timerLoading)
    // 清除蒙版
    tools.hideMask()
    // 获取相应内容
    const { status, data, config } = res
    // 获取调用请求时传递的参数值(默认为空)
    const { reqParams = {} } = config as AxiosRequestConfigExt
    // 获取自定义参数值(默认false)
    const { force401ToLogin = false } = reqParams
    // 对状态码进行判断
    if (status === 200) {
      // 如果成功
      if (data) {
        // 如果返回了数据
        if (401 === data.code && force401ToLogin) {
          // 权限敏感且需要跳转到登录界面则直接进行跳转
          app.getAppCtl().redirectToLogin()
          return Promise.reject({ code: 401, message: '未授权，请登录' })
        } else if ((data.code >= 400 && data.code <= 404) || 500 === data.code) {
          // 对于有问题的状态码都直接拦截
          return Promise.reject(data)
        }
      }
      // 将数据返回(这里应该只要响应data数据但是报错了返回类型不匹配)
      return res
    } else {
      // 状态码不正常直接当报错处理
      return Promise.reject(data)
    }
  },
  err => {
    // 不论成功还是失败清理工作都要做
    // 清除计时器
    clearTimeout(timerLoading)
    // 清除蒙版
    tools.hideMask()
    // 展示错误信息
    let { message = 'Request Error', response } = err
    // 查看后端有没有返回描述的错误信息没有就设置成默认值
    const stErrMsg = get(response, 'data.msg', message)
    // 抛出错误信息
    return Promise.reject({ msg: stErrMsg })
  },
)
// 定义常用请求方法(之后通过小写的形式进行调用)
type IAjaxMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
// 对函数签名进行封装(?为什么是=>而不是:)
type IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt) => Promise<IResponse<T>>
// 支持的所有方法
const gstMethods: string[] = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
// 存储所有方法的定义(key对应的类型是func())
const iAllMethods: { [key in IAjaxMethod]: IFnAjaxMethodHandler } = {} as any
gstMethods.map(method => {
  const fnHandler: IFnAjaxMethodHandler = <T = any>(
    reqParams: AxiosRequestConfigExt | string,
  ): Promise<IResponse<T>> => {
    // 判断是否是GET方法
    if (method === 'GET') {
      // 如果是再判断参数是否是字符串
      if ('string' === typeof reqParams) {
        // 格式化参数
        reqParams = {
          url: reqParams,
          reqParams: '',
        } as AxiosRequestConfigExt
      }
    }
    // 传递参数调用方法
    return Ajax.request<T>(method, reqParams as AxiosRequestConfigExt)
  }
  // 往Ajax上面挂载方法
  // 将小写的字符串转换成字面量
  iAllMethods[method.toLocaleLowerCase() as IAjaxMethod] = fnHandler
})
// Ajax.get = (reqParams: AxiosRequestConfigExt): Promise<IResponse<T>> => {}
const Ajax = {
  // 展开挂载好的方法
  ...iAllMethods,

  // 定义大类方法封装GET/POST
  // 使用T = any来限制返回结果
  request<T = any>(method: string, reqParams: AxiosRequestConfigExt): Promise<IResponse<T>> {
    // 获取请求参数(解包)
    let {
      url,
      params,
      headers = {},
      timeout,
      showLoading,
      bIsNeedCachePrevent,
      bIsNeedJSONStringify,
      bIsNeedQSStringify,
      force401ToLogin,
    } = reqParams
    // 判断是否需要显示Loading
    if (showLoading) {
      // 先清除之前的计时器再显示新的计时器
      clearTimeout(timerLoading)
      // 防止一闪而过的加载信息设置200毫秒快请求加载时间
      timerLoading = setTimeout(() => {
        tools.showLoadMask()
      }, 200)
    }
    // 是否需要预防缓存
    bIsNeedCachePrevent && (url = tools.addCachePrevent())
    // 判断是否要JSON序列化
    bIsNeedJSONStringify && (params = JSON.stringify(params))
    // 判断是否要qs.stringify
    bIsNeedQSStringify && (params = qs.stringify(params))
    // 设置登入Token
    const stLoginToken = tools.Cookie.getItem(LOGIN_TOKEN)
    stLoginToken && (headers.Authorization = `Bearer ${stLoginToken}`)

    // 重新构造请求参数
    const iSendReqParams: AxiosRequestConfigExt = {
      reqParams,
      url,
      method: gstMethods.indexOf(method) > -1 ? method : 'GET', // 判断请求是否存在并设置合理的默认值
      [method === 'GET' ? params : data]: params, // 根据请求类型动态更新值
      headers: Object.assign({}, headers),
    }
    // 判断是否存在Timeout
    timeout && (iSendReqParams.timeout = timeout)
    // 基于自定义实体发送请求(传入对应参数)
    return axiosInstance.request(iSendReqParams)
  },
}
// 导出类型
export type IAjax = typeof Ajax
// 导出实体
export default Ajax
