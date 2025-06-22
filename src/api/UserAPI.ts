import mdlBaseAPI from './BaseAPI.ts'
import { get } from 'lodash'
export interface IUser {
  id: number
  name: string
}

// 限制能用于API方法初始化的参数
const initBaseAPIParams: BaseAPIType.IInitParams = {
  // 每一个方法回去请求的地址
  uri: {
    get: { path: '/data-get.json', errMsg: 'err.user.load' },
    list: { path: '/data-list.json', errMsg: 'err.user.load' },
  },
  // 对后端返回的字段做简单的映射
  mapper(item: GlobalType.IRecord) {
    // 把从后端取到的字段进行映射
    return {
      // 方便在UI层面直接调用
      // 注意这里处理数组或者处理单挑数据会使用到的格式化方法并不一样
      /*
      * 假设你正在处理items数组中的某一项
        const processItem = (item) => ({
          id: get(item, 'id'),        // 直接访问，因为id就在顶层
          name: get(item, 'name'),    // 直接访问，因为name就在顶层
        });

        // 处理整个items数组
        const processedItems = get(response, 'items', []).map(processItem);
      *
      * */
      id: get(item, 'data.id'),
      name: get(item, 'data.name'),
    }
  },
}
export default {
  // 初始化 -> (返回的是一个对象，直接解包变成当前导出模块中的方法)
  ...mdlBaseAPI.initAPI<IUser, Pick<BaseAPIType.IMethods<IUser>, 'get' | 'list'>>(
    initBaseAPIParams,
  ),
  // 使用Ajax封装一般返回一个Promise
  getSelfInfo(): Promise<IUser> {
    return Promise.resolve({
      id: 39,
      name: 'miku',
    })
  },
}
