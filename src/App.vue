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
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="success" loading-text="加载中..." />
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model:show="show" @confirm="onConfirm" />
  </div>
</template>

<script setup lang="ts">
  import { lpk } from './config/lpk.ts'
  import Icon from './components/icon/src/icon.vue'
  // console.log(app.getAppCtl().changeLocale('en-US'))
  console.log(lpk('Index'))
  tools.LocalStorage.setItem('miku', '39')
  let show: boolean = true
</script>

<style scoped></style>
