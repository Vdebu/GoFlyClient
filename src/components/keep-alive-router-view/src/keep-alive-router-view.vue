<!--带keep-alive的router-view组件-->
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { get } from 'lodash'
  // 使用自定义类型维护状态
  interface IKeepAliveRouterViewState {
    giExcludeNames: string[]
  }
  // 属性初始化
  const iState = reactive<IKeepAliveRouterViewState>({
    giExcludeNames: [],
  })
  // 提取数据用于使用
  const { giExcludeNames } = toRefs(iState)
  // 判断当前要跳转的路由中的组件是否需要keep-alive
  watch(useRoute(), (newPath, oldPath) => {
    if (false === get(newPath, 'meta.keepAlive', true)) {
      // 获取当前活动的路由记录
      const matchedRoute = newPath.matched[newPath.matched.length - 1]
      if (!matchedRoute) return

      // 获取默认组件
      const component = get(matchedRoute, 'components.default')
      if (!component) return

      // 尝试多种方式获取组件名称
      let componentName = ''

      // 1. 直接从组件上获取name属性
      if (component.name) {
        componentName = component.name
      }
      // 2. 从组件的options中获取
      else if (component.options && component.options.name) {
        componentName = component.options.name
      }
      // 3. 检查__name属性（在某些构建工具中可能存在）
      else if (component.__name) {
        componentName = component.__name
      }
      // 4. 检查type属性（Vue 3.2+的某些情况下）
      else if (component.type && component.type.name) {
        componentName = component.type.name
      }
      // 5. 尝试从显示名称中提取（如果存在）
      else {
        const displayName = component.displayName || ''
        if (displayName && typeof displayName === 'string') {
          // 从显示名称中提取实际名称（通常格式为"Component<Name>"）
          const match = displayName.match(/<([^>]+)>/)
          if (match && match[1]) {
            componentName = match[1]
          }
        }
      }

      console.log('找到组件名称:', componentName)

      // 如果找到了组件名称且尚未在排除列表中，则添加它
      if (componentName && !iState.giExcludeNames.includes(componentName)) {
        iState.giExcludeNames.push(componentName)
      }
    }
  })
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="giExcludeNames">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
