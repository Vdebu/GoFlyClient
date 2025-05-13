import { createApp } from 'vue'
import App from './App.vue'
// 引入组件样式
import 'vant/lib/index.css'
// 引入通用样式
import 'normalize.css/normalize.css'
// 引入字体图标(因此可以直接使用)
import './assets/fonts/iconfont.css'
// 引入全局样式
import './assets/styles/global.scss'
import { initApp, initGlobalComponents } from './config/init.ts'
import { Button } from 'vant'
import { initRouter } from './router'
;(async () => {
  // 保证所有模块初始化完成后再创建UI
  // 1.app,lpk(语言包),Ajax(与后端交互的方法),Tools(dom节点CRUD)
  // Ajax的封装:
  // 1).通过任务队列解决基于XHR异步请求产生的回调地狱问题
  // 2).阅读Axios部分源码
  // 3).基于Axios库实现Ajax的封装
  // 4).在封装好的Ajax库的基础上实现BaseAPI的封装(简单API请求进行封装提高代码复用率)
  // 5).在封装好的BaseAPI基础上实现各模块WebAPI的调用
  // 6).Mock数据的处理
  // 2.异步初始化基础模块的配置信息
  // [1]加载系统当前的状态信息
  // [2]加载当前用户的登录信息

  // 3.异步加载业务模块初始化信息
  await initApp()
  // 初始化UI
  const uiApp = createApp(App)
  // 注册全局组件
  initGlobalComponents(uiApp)
  /**
   * 在创建出来的app上注册全局的组件使这些对象在任何组件中都可以通过(this.app)和(this.tools)访问
   * 允许在应用层面上设置各种全局选项从而影响整个应用的行为
   * 每个应用实例(通过(createApp()创建)都拥有自己的配置对象config
   */
  uiApp.config.globalProperties.app = window.app
  // 这个配置对象
  uiApp.config.globalProperties.tools = window.tools
  // 绑定语言包
  uiApp.config.globalProperties.lpk = window.lpk
  // 向根组件绑定全局对象
  // 状态管理与路由的初始化并渲染根组件

  // 1.初始化基础模块的路由配置
  // 2.初始化各业务模块的路由配置
  // 3.对路由守卫进行处理
  // 4.keep-alive的使用
  // 使用组件
  // 注意这里不加括号使用的是函数 一般的写法应该是 先调用函数初始化变量在app.use变量
  uiApp.use(initRouter())
  uiApp.use(Button)
  uiApp.mount('#app')
})()
