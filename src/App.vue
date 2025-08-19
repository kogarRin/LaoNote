<script setup>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Maincontain from "./components/Maincontain.vue";
import Asidemenu from "./components/Asidemenu.vue";


</script>

<template>
  <el-container>
    <el-header class="header">
      <Header />
    </el-header>
    <el-container class="el-mainContainer">
      <Asidemenu />
      <router-view>
      </router-view>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.header{
  padding: 0;
}

.el-mainContainer{
  width: 100vw;
}
</style>
