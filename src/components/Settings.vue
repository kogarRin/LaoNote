<script setup>
import { InfoFilled } from "@element-plus/icons-vue"
import { ref } from "vue";


</script>

<template>
  <div class="settingsContainer">
    <el-space
        style="width: 100%"
        direction="vertical"
        fill
    >
      <el-card>
        <div class="title">
          <b>文件设置</b>
        </div>
        <el-divider/>
        <div class="setting-file">
          <span>设置文件保存路径</span>
          <el-icon @click=""><InfoFilled /></el-icon>
          <el-input
              v-model="setDefaultPath"
          >
            <template #append>
              <el-button
                type="primary"
              >
                浏览文件
              </el-button>
            </template>
          </el-input>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<style lang="scss">
.settingsContainer{
  width: 100%;
  padding: 1em;

  .title{
    display: flex;
  }

  .setting-file{
    display: flex;
    position: relative;
  }

}

</style>
