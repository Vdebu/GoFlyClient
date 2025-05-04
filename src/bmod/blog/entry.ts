import syscfg from './config/syscfg.ts'

const MoudleName = syscfg.module

// 业务模块入口
export const entryInit = async () => {
  // 检测当前业务模块是否启用
  if (!app.checkBModIsEnable(MoudleName)) {
    return
  }
  // 初始化当前模块的语言包
  app.getAppCtl().mergeLpk(import.meta.glob('./locales/*', { eager: true }))
  // 初始化业务模块的配置信息
  console.log(lpk('Blog'))
  // 初始化状态管理信息

  // 初始化路由信息
}

export default {}
