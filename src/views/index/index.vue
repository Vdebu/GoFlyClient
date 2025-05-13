<script setup lang="ts"></script>

<template>
  <div class="index-w">
    <div class="title">index.vue</div>
    <!--    keep-alive-->
    <keep-alive-router-view />
    <!--展示index下的子路由-->
    <!--    <router-view />-->
    <ul class="g-flex-rsbc">
      <li>
        <!--在这里通过点击动态绑定的对象回到主页不会自动寻找children中path为空的路由进行展示-->
        <!--写死可以 或者跳转的时候不能指定父级的名称进行跳转 跳转指定子级的名称-->
        <router-link :to="{ name: 'home' }">{{ lpk('page.index.Title') }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'my' }">{{ lpk('page.my.Title') }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .index-w {
    background-color: #39c5bb;
    padding: 30px;
    .title {
      margin: 30px;
    }
  }
</style>
