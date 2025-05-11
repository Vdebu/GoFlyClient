<template>
  <div class="app-w">
    <div class="title">App.vue</div>
    <!--    载入最上层路由组件-->
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .app-w {
    background-color: #66ccff;
    padding: 30px;
    .title {
      margin: 30px;
    }
  }
</style>
