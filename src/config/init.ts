// 处理初始化步骤1中的所有细节

import app from './app'
import tools from '../utils/tools.ts'
import { initLpk, lpk } from './lpk.ts'
import { initLoginUserInfo } from '../controller/AppCtl.ts'
import type { App } from 'vue'
// 对能挂载的key作出限定
type IGlobalVarsKey = 'app' | 'lpk' | 'tools' | 'Ajax'
// 使用特定类型进行实现
type IGlobalVars = {
  // 可选的但是必须有
  [key in IGlobalVarsKey]?: any
}
// 全局应用对象包含全局数据与操作方法
const iGlobalVars: IGlobalVars = {
  app,
  tools,
  lpk,
}
// 遍历对象进行绑定
Object.keys(iGlobalVars).forEach(stKey => {
  // 把Windows搞成any 可以往上随意挂载东西
  ;(window as any)[stKey as IGlobalVarsKey] = iGlobalVars[stKey as IGlobalVarsKey]
})
// 作为方法导出(导出后上面的代码块会自动执行)
export const initApp = async () => {
  // 初始化基础业务相关信息(当前登录用户信息)
  await initLoginUserInfo()
  // 初始化主题
  // 1.针对不同主题书写不同的样式文件在熊初始化时根据当前主题到后端去加载文件
  // 2.通过SCSS中的变量与函数实现主题的定制
  // 3.通过SCSS中的变量实现主题定制

  // 初始化语言包
  initLpk()
  // 初始化业务模块信息
  // 获取所有业务模块中的初始化方法(./src/bmod/*/entry.ts)
  // 默认返回相关函数使用eager进行副作用应用
  const iAllEntry: GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts', { eager: true })
  for (const path in iAllEntry) {
    // 提取所有的初始化方法
    const iEntryFile = iAllEntry[path]
    // 有没有文件 -> 是否存在方法 -> 执行
    iEntryFile && iEntryFile.entryInit && (await iEntryFile.entryInit())
  }
}

// 初始化全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
  // 导入组件 ./src/components/(icon)/src/icon.vue
  const iAllComponents: GlobalType.IRecord = import.meta.glob('@/components/*/src/*.vue', {
    eager: true,
  })
  // 挂载对应的kv对
  Object.keys(iAllComponents).map(path => {
    // 分割出子组件文件夹名作为key
    const pathParts = path.split('/')
    const stCmpName = pathParts[pathParts.length - 3]
    // 挂载子组件
    uiApp.component(stCmpName, iAllComponents[path].default)
  })
}
