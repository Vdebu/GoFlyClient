// 初始化全局变量
// 使用了export就意味着将文件以模块的形式进行管理
import type { IApp } from '../config/app.ts'
import type { ITools } from '../utils/tools.ts'
import type { IFnLpk } from '../config/lpk.ts'

declare global {
  // 定义全局类型的声明
  declare namespace GlobalType {
    // 定义全局对象键的类型
    type IKey = string | number
    // 定义全局对象值的类型
    type IRecord = Record<IKey, any>
  }
  // 全局层面上告诉TS有这么个东西不让他报错
  const app: IApp
  const tools: ITools
  const lpk: IFnLpk
  // 经常使用的类型
  type ITimeout = ReturnType<typeof setTimeout>
  interface Window {
    // 提供编辑器的智能提示功能
    // 当输入 app.时会显示所有(IApp接口定义的方法和属性)
    app: IApp
    // 全局工具
    tools: ITools
    // 全局语言包
    lpk: IFnLpk
  }
}
// 告诉TS在Vue组件上有可以直接通过this访问的app与tools属性
// 扩展 Vue 组件实例的自定义属性类型
declare module 'vue' {
  interface ComponentCustomProperties {
    app: IApp // 全局APP对象
    tools: ITools // 全局工具库对象
    lpk: IFnLpk
  }
}
export {}
