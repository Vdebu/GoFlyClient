<template>
  <div>
    {{ app.getConfig('bModNames') }}
    <br />
    {{ tools.LocalStorage.getItem('miku') }}
    <br />
    <div>
      {{ lpk('Index') }}
    </div>
    <br />
    <div>
      {{ lpk('Type', { index: 3 }) }}
    </div>
  </div>
  <div>
    <!--    使用子组件-->
    <icon icon="icon-time" />
  </div>
  <div>
    <van-button plain>空心按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
  </div>
  <div data-theme="blue">
    <!--    [data-theme="#{$theme-name}"] & 这个选择器在没有设置 data-theme 属性的情况下无法匹配任何元素。-->
    <div class="theme">
      <div class="theme-item" v-for="idx in 3">{{ idx }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { lpk } from './config/lpk.ts'
  import Icon from './components/icon/src/icon.vue'
  // console.log(app.getAppCtl().changeLocale('en-US'))
  console.log(lpk('Index'))
  tools.LocalStorage.setItem('miku', '39')
</script>

<style lang="scss" scoped>
  @use './assets/styles/theme-handle';
  .theme {
    display: flex;
    justify-content: space-between;
  }

  .theme-item {
    margin: 10px 20px;
    width: 30%;
    padding: 30px 0;
    text-align: center;
    @include theme-handle.font-size('big-size');
    @include theme-handle.bg('primary-bg');
    @include theme-handle.color('menu-text-color');
  }
</style>
