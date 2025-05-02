<template>
  <div>
    {{ app.getConfig("bModNames") }}
    <br>
    {{tools.LocalStorage.getItem("miku")}}
  </div>
</template>

<script setup lang="ts">
  import tools from "./assets/utils/tools.ts";

  tools.LocalStorage.setItem("miku","39")
</script>

<style scoped>

</style>