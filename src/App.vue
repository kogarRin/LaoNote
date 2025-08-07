<script setup>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
</script>

<template>
  <el-container>
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <el-aside>
        <Aside />
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.header{
  padding: 0;
}
</style>
