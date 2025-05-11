// 基础模块的路由信息

import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { get } from 'lodash'
import index from '../views/index/index.vue'
// 拓展封装vue中的原始路由类型 -> 方便后续拓展指定页面下的新页面
type RouteRecordRawExt = RouteRecordRaw & { children?: RouteRecordRawExt }
// 收集其他所有模块的路由信息
let giAllRoutes: RouteRecordRawExt[] = []

// 返回路由实体
export const initRouter: () => Router = () => {
  let routes: RouteRecordRawExt[] = [
    { path: '/', redirect: '/index' },
    {
      // 主页容器
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: lpk('page.index.Title'), // 使用当前语言包定制页面标题
        requireAuth: false, // 是否需要权限
      },
      // 主页中真实可交互的元素(主页/我的)
      children: [
        {
          path: '', // 如果是空的在访问主页时默认就会进行展示
          name: 'home',
          component: () => import('../views/index/home.vue'),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('../views/index/my.vue'),
          meta: {
            title: lpk('page.my.Title'),
            requireAuth: true, // 这里如果不进行设置的话就默认需要授权
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue'),
      meta: {
        title: lpk('page.login.Title'),
        requireAuth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login/register.vue'),
      meta: {
        title: lpk('page.register.Title'),
        requireAuth: false,
      },
    },
    // 捕获所有不存在的页面
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: import('../views/notfound.vue'),
      meta: { title: 'notfound' },
    },
  ]
  const iRouter = createRouter({
    history: createWebHistory(), // path模式进行路由导航 还有hash可选
    routes: routes, // 表示路由实体中有哪些路由条目
  })
  // 通过守卫方法更改标题信息
  iRouter.afterEach((to, from) => {
    // 尝试获取标题信息(目标，字段值，默认值)
    const title = get(to, 'meta.title', '')
    // 如果title存在就将其更换为标题
    title && (document.title = title)
  })
  return iRouter
}
