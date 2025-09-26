<script setup>
import Header from "@/src/components/Header.vue";
import Asidemenu from "@/src/components/Asidemenu.vue";
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
