<script setup lang="ts">
import {ref} from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const isCollapse = ref(false);
</script>

<template>
    <el-menu
        class="selectContain"
        :collapse="isCollapse"
    >
      <el-menu-item @click="isCollapse = !isCollapse" index="menu">
        <el-icon id="menuIcon"><icon-menu /></el-icon>
        <span class="menuContent">Menu</span>
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
</template>

<style scoped lang="scss">
#menuIcon {
  user-select: none;
}

.menuContent {
  user-select: none;
}
</style>