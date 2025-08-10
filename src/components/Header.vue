<script setup>

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
        <el-menu-item index="personal" route="/personal">个人</el-menu-item>
        <el-menu-item index="settings" route="settings">设置</el-menu-item>
      </el-menu>
    </div>

    <div class="rightHeader">

      <div class="minIcons">
        <el-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"></path></svg>
        </el-icon>
      </div>
      <div class="maxIcons">
        <el-icon>
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"></path></svg>
        </el-icon>
      </div>
      <div class="closeIcon">
        <el-icon>
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
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
