
<template>
  <!--使用 router-link 组件进行导航 -->
  <!--通过传递 `to` 来指定链接 -->
  <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
  <el-button> <router-link to="/Btable">Btable</router-link></el-button>
  <el-button> <router-link to="/Bform">Bform</router-link> </el-button>
  <el-button>
    <router-link to="/BformDialog">BformDialog</router-link></el-button
  >
  <el-button>
    <router-link to="/BnoticeBar">BnoticeBar</router-link></el-button
  >

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>
<script setup lang="ts">
</script>

<style scoped >
</style>
