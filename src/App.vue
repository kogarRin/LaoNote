<script setup>
import Header from "@/src/components/basicViews/Header.vue";
import Asidemenu from "@/src/components/basicViews/Asidemenu.vue";
import {settingStore} from "@/src/js/setting/mainSetting.js";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const {initTheme} = settingStore();
onMounted(() => {
  if(router.currentRoute.value.path === "/") {
    router.push("/");
  }
  initTheme();
});
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
  height: 50px;
}

.el-mainContainer{
  width: 100vw;
}
</style>
