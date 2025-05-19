// 系统配置模块管理系统配置信息，导出配置对象供其他组件使用
export interface ISysCfgBModItem {
  name: string
  enable: boolean
}
// 系统会用到的相关配置信息
export interface ISysCfg {
  baseUrl: string // 后端主机地址与监听端口
  bModNames: ISysCfgBModItem[]
}

const iSysCfg: ISysCfg = {
  baseUrl: 'http://localhost:9393',
  bModNames: [
    {
      name: 'blog',
      enable: true,
    },
  ],
}
export default iSysCfg
