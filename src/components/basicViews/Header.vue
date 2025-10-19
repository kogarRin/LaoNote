<script setup>
import {CloseBold, FullScreen, SemiSelect} from "@element-plus/icons-vue";
import {ref} from "vue";

const home = ref('home');

function miniSizeWin(){
  window.electronAPI.miniWinSize();
}

function fullScreen(){
  window.electronAPI.toggleScreen();
}

function closeWin(){
  window.electronAPI.closeWindow();
}

</script>

<template>
  <div class="header">

    <div class="leftHeader">
      <img alt="Flied" class="icon" src="/src/assets/icon/icon.ico"/>
      <div class="appTitle">
        <span>LaoNote</span>
      </div>
    </div>

    <div class="centerHeader">
      <el-menu
        class="menuHeader"
        mode="horizontal"
        router
        active-text-color="#1f2024"
        background-color="5881A39B"
        :ellipsis="false"
        :default-active="home"
      >
        <el-menu-item index="home" route="/">
          首页
        </el-menu-item>
        <el-menu-item index="setting" route="/settings">
          设置
        </el-menu-item>
      </el-menu>
    </div>

    <div class="rightHeader">
      <div class="minIcons" @click="miniSizeWin">
        <el-icon>
          <el-icon><SemiSelect /></el-icon>
        </el-icon>
      </div>
      <div class="maxIcons" @click="fullScreen">
        <el-icon>
          <el-icon><FullScreen /></el-icon>
        </el-icon>
      </div>
      <div class="closeIcon" @click="closeWin">
        <el-icon>
          <el-icon><CloseBold /></el-icon>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Header.scss">
</style>
