<script setup>
import {CloseBold, FullScreen, SemiSelect} from "@element-plus/icons-vue";

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
      <img alt="Flied" class="icon" src="/src/assets/icon.jpg"/>
      <div class="appTitle">
        <span>LaoNote</span>
      </div>
    </div>

    <div class="centerHeader">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          background-color="transparent"
          text-color="#303133"
          active-text-color="6D7F9172">
        <el-menu-item index="home" route="/">首页</el-menu-item>
        <el-menu-item index="personal" route="/settings">设置</el-menu-item>
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

<style scoped lang="scss">
.header {
  $headerHeight: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vw;
  background-color: rgba(88, 129, 163, 0.61);
  -webkit-app-region: drag;

  .leftHeader {
    display: flex;
    position: absolute;
    left: 0;
    margin: 0 .6em 0 .6em;

    .icon {
      height: 30px;
      width: 30px;
      border-radius: 23%;
      margin-right: .6em;
    }

    .appTitle {
      display: flex;
      align-items: center;
    }
  }

  .centerHeader {
    width:fit-content;
    -webkit-app-region: no-drag;

    .el-menu-demo{
      background-color: rgba(88, 129, 163, 0.61);
      border-bottom: none;
      caret-color: transparent;

      & > .el-menu-item{
        -webkit-user-select: none;

          &:hover{
            background-color: rgba(109, 127, 145, 0.45);
          }

          &::after{
            display: none;
          }
        }
    }
  }

  .rightHeader {
    display: flex;
    position: absolute;
    right: 0;
    height: 100%;
    cursor: pointer;
    -webkit-app-region: no-drag;

    .minIcons{
      padding: 1em;

      &:hover{
        background-color: rgba(109, 127, 145, 0.45);
      }
    }

    .maxIcons{
      padding: 1em;

      &:hover{
        background-color: rgba(109, 127, 145, 0.45);
      }
    }

    .closeIcon{
      padding: 1em;

       &:hover{
         background-color: rgba(255, 9, 0, 0.68);
       }
    }
  }
}
</style>
