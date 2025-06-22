import { get } from 'lodash'
import Tools from '../utils/tools.ts'
import type { IResponse } from '../utils/Request.ts'
import * as url from 'node:url'

// 存储列表类型返回的记录数
interface IListResult<T = any> {
  total: number
  // 使用泛型对数据列表作出限定
  item: T[]
}

export default {
  // 对当前API模块定义通用类型的方法
  initAPI<T = any, R = BaseAPIType.IMethods<T>>(initParams: BaseAPIType.IInitParams<T>): R {
    // 构造返回对象
    const iResult: IListResult = {
      total: 0,
      items: [],
    }
    return {
      // 获取一组相关内容
      list(params: GlobalType.IRecord): Promise<IListResult<T>> {
        return Ajax.get<T>(
          // 构造Ajax请求参数
          {
            url: get(initParams, 'uri.list.path'),
            params,
          },
        )
          .then(res => {
            // 通过解包初始化原始数据
            const { total, items = [] } = res.data as IListResult<T>
            // 处理先前的对象
            iResult.total = total
            // 通过遍历使用映射器来处理数据
            iResult.items = items.map(item => {
              return initParams.mapper ? initParams.mapper(item) : item
            })
            return iResult
          })
          .catch(e => {
            // 处理请求中发生的错误 -> (展示错误信息)
            Tools.processAPIError(get(initParams, 'uri.list.errMsg', ''), e)
            // 确保有返回值
            return {} as iResult
          })
      },
      // 获取一条相关内容
      get(params: GlobalType.IRecord): Promise<T> {
        // {id:39}
        // user/:id
        const stIDName = 'id'
        // 直接返回Ajax请求
        return Ajax.get<T>(
          // 构造Ajax请求参数
          {
            url: get(initParams, 'uri.get.path').replace(`:${stIDName}`, get(params, stIDName)),
            params,
          },
        )
          .then(res => {
            // 直接返回数据(在这里使用字段映射器对返回的内容进行操作)
            // 如果没有就直接返回原始数据
            return initParams.mapper ? initParams.mapper(res.data) : res.data
          })
          .catch(e => {
            // 处理请求中发生的错误 -> (展示错误信息)
            Tools.processAPIError(get(initParams, 'uri.get.errMsg', ''), e)
            // 确保有返回值
            return {} as T
          })
      },
      put(params: GlobalType.IRecord): Promise<IResponse> {
        return Ajax.post({ url: get(initParams, 'uri.put.path'), params }).catch(e => {
          tools.processAPIError(get(initParams, 'uri.put.errMsg', ''), e)
          return {} as IResponse
        })
      },
      delete(params: GlobalType.IRecord): Promise<IResponse> {
        const stIDName = 'id'
        // 直接返回Ajax请求
        return Ajax.delete<T>(
          // 构造Ajax请求参数
          {
            url: get(initParams, 'uri.delete.path').replace(`:${stIDName}`, get(params, stIDName)),
            params,
          },
        ).catch(e => {
          // 处理请求中发生的错误 -> (展示错误信息)
          Tools.processAPIError(get(initParams, 'uri.delete.errMsg', ''), e)
          // 确保有返回值
          return {} as T
        })
      },
      post(params: GlobalType.IRecord): Promise<IResponse> {
        return Ajax.post({ url: get(initParams, 'uri.post.path'), params }).catch(e => {
          tools.processAPIError(get(initParams, 'uri.post.errMsg', ''), e)
          return {} as IResponse
        })
      },
      // 自定义方法...
    }
  },
}
