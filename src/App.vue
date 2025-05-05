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
</template>

<script setup lang="ts">
  import { lpk } from './config/lpk.ts'
  import Icon from './components/icon/src/icon.vue'
  // console.log(app.getAppCtl().changeLocale('en-US'))
  console.log(lpk('Index'))
  tools.LocalStorage.setItem('miku', '39')
</script>

<style scoped></style>
