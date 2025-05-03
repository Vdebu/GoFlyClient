// 处理初始化步骤1中的所有细节

import app from './app'
import tools from '../utils/tools.ts'
import { initLpk, lpk } from './lpk.ts'
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
  // 初始化语言包
  initLpk()
}
