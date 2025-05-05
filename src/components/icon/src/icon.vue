<!-- 图表组件-->
<script setup lang="ts">
  // 通过父级组件知道要用哪个图标

  interface IIconProps {
    icon: string
  }
  // 获取父组件的信息
  const props = defineProps<IIconProps>()
  // 利用响应式对象使用父组件传进来的信息
  const { icon } = toRefs(props)
</script>

<template>
  <!--  动态更新图标-->
  <i :class="`iconfont ${icon}`"></i>
</template>

<style scoped></style>
