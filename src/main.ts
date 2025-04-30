import { createApp } from 'vue'
import App from './App.vue'
// 引入通用样式
import 'normalize.css/normalize.css'
// 引入字体图标
import './assets/fonts/iconfont.css'
// 引入全局样式
import './assets/styles/global.scss'
import {initApp} from "./config/init.ts";
(async ()=>{
    // 保证所有模块初始化完成后再创建UI
    // 1.app,lpk(语言包),Ajax(与后端交互的方法),Tools(dom节点CRUD)
    // 2.异步初始化基础模块的配置信息
    // 3.异步加载业务模块初始化信息
    await initApp()
    // 初始化UI
    const uiApp = createApp(App)
    // 在创建出来的app上注册全局的组件
    uiApp.config.globalProperties.app = window.app
    // 向根组件绑定全局对象
    // 状态管理与路由的初始化并渲染根组件
    uiApp.mount('#app')
})()

