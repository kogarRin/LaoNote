<script setup>
import Header from "./components/Header.vue";
import Maincontainer from "./components/Maincontainer.vue";

</script>

<template>
  <el-container>
    <el-header class="header">
      <Header />
    </el-header>
    <el-container class="elmaincontainer">
      <Maincontainer />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.header{
  padding: 0;
}

.elmaincontainer{
  width: 100vw;
}
</style>
