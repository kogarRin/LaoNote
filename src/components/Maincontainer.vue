<script setup lang="ts">
import {ref} from 'vue';
import { Menu as IconMenu, Location } from '@element-plus/icons-vue'

const isCollapsed = ref(false);
const objDate = new Date();
let todayDate = objDate.getFullYear() + ' / ' + (objDate.getMonth() + 1) + ' / ' + objDate.getDate();

</script>

<template>
  <el-aside class="aside">
    <el-menu
        class="selectContain"
        :collapse="isCollapsed"
    >
      <el-menu-item @click="isCollapsed = !isCollapsed" index="menu">
        <el-icon id="menuIcon"><icon-menu /></el-icon>
        <span class="menuContent">Hide Menu</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon id="menuIcon">
          <location />
        </el-icon>
        <span class="menuContent"></span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon id="menuIcon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"></path></svg>
        </el-icon>
        <span class="menuContent"></span>
      </el-menu-item>
    </el-menu>
  </el-aside>

  <div class="mainContentContain">
    <el-space
        style="width: 100%"
        direction="vertical"
        fill
    >
      <el-card>
        <template #header>
          <div class="insideTitle">
            <span><b>选择目录以编辑</b></span>
          </div>
        </template>
        <div class="insideContent">
          <el-divider content-position="left">
            <span>今天</span>
            <span> -- </span>
            <span>{{todayDate}}</span>
          </el-divider>
        </div>
        <el-card class="contentCard">
          <div>
            #标题标题
          </div>
        </el-card>
      </el-card>
    </el-space>
  </div>

</template>

<style scoped lang="scss">
.aside{
  width:fit-content;
}

.mainContentContain{
  padding: 1em;
  width: 100%;

  .insideTitle{
    display:flex;
  }

  .insideContent{
    display: flex;
  }

  .contentCard{
    display: flex;
  }

}

#menuIcon {
  -webkit-user-select: none;
}

.menuContent {
  -webkit-user-select: none;
}
</style>