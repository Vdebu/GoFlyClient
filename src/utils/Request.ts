// 基于Axios实现Ajax的凤凰

import axios, { Axios, type AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { LOGIN_TOKEN } from './Constants.ts'
import { data } from 'autoprefixer'
// 拓展Axios的类型适配后端返回的数据类型
export interface IResponse<T = any> {
  code: number
  message: string
  data: any
}
// 拓展Axios的请求参数类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
  reqParams: AxiosRequestConfigExt // 方便之后取值
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
// 支持的所有方法
const gstMethods: string[] = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
// 定义模块内全局变量
const axiosInstance: AxiosInstance = axios.create({
  // 自定义配置选项
  baseURL: app.getConfig('baseUrl'),
  timeout: 10000, // 十秒钟超时
})

const Ajax = {
  // 定义大类方法封装GET/POST
  // 使用T = any来限制返回结果
  request<T = any>(method: string, reqParams: AxiosRequestConfigExt): Promise<IResponse<T>> {
    // 获取请求参数
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
