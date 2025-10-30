<script setup lang="js">
import {ref} from 'vue';
import {Calendar, CollectionTag, Menu as IconMenu} from '@element-plus/icons-vue'

const isCollapsed = ref(true);
const calenderView = ref(false);
const tagsView = ref(true);
</script>

<template>
  <!--日程框-->
  <el-dialog
      v-model="calenderView"
      title="查看日期"
      center
  >
    <div class="datePra">
      <el-calendar/>
    </div>
    <template #footer>
      <div class="dialogFooter">
        <el-button type="primary" @click="calenderView = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="tagsView"
    :show-close="false"
    title="管理标签"
    center
  >
    <div class="tagsStoreContainer">
      <div class="itemTitle">
        <h4>说明</h4>
        <p>此处用于存储标签，可以添加常用标签</p>
      </div>
      <div class="itemContent">
        <div class="tagsContainer">
          <el-table


          >

          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>

  <!--菜单-->
  <el-aside class="aside">
    <el-menu
        class="selectContain"
        :collapse="isCollapsed"
    >
      <el-menu-item @click="isCollapsed = !isCollapsed" index="menu">
        <el-icon id="menuIcon"><icon-menu /></el-icon>
        <span class="menuContent">收起菜单</span>
      </el-menu-item>
      <el-menu-item index="2" @click="calenderView = !calenderView">
        <el-icon id="menuIcon">
          <el-icon><Calendar /></el-icon>
        </el-icon>
        <span class="menuContent">选择日程</span>
      </el-menu-item>
      <el-menu-item index="3" @click="tagsView = !tagsView">
        <el-icon id="menuIcon">
          <el-icon><CollectionTag /></el-icon>
        </el-icon>
        <span class="menuContent">一些标签</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

</template>

<style scoped src="./Asidemenu.scss">
</style>
