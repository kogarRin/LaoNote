<script setup lang="js">
import {ref} from 'vue';
import {Calendar, CollectionTag, Menu as IconMenu} from '@element-plus/icons-vue'
import {addGlobalTags, globalTagsList, removeGlobalTag, removeAllGlobalTags} from "@/src/js/common/globalTags.js";


const isCollapsed = ref(true);
const calenderView = ref(false);
const tagsView = ref(false);
const tagInputView = ref(false);
const inputTag = ref("");

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

  <!--标签框-->
  <el-dialog
    v-model="tagsView"
    :show-close="false"
    title="管理标签"
    style="min-width: 60%; user-select: none;"
    center
  >
    <div class="tagsStoreContainer">
      <div class="itemTitle">
        <div style="user-select: none;">
          <h4>说明</h4>
          <div class="down">
            <p>此处用于存储标签，可以添加常用标签</p>
            <div>
              <el-button
                  size="small"
                  type="default"
                  style="color: rgb(216,41,41)"
                  @click="removeAllGlobalTags(globalTagsList)"
              >
                Delete All
              </el-button>
              <el-button
                  type="primary"
                  size="small"
                  @click="tagInputView = !tagInputView"
              >
                add
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="itemContent">
        <div class="tagsContainer">
          <el-tag
              v-for="tag in globalTagsList"
              @close="removeGlobalTag(tag)"
              closable
          >
            {{tag}}
          </el-tag>
        </div>
      </div>
    </div>
  </el-dialog>

  <!--标签输入-->
  <el-dialog
    v-model="tagInputView"
    :show-close="false"
  >
    <div class="tagInputContainer">
      <el-input
          v-model="inputTag"
          placeholder="输入标签名称"
          show-word-limit
          maxlength="10"
          @keydown.enter="() => {
            addGlobalTags(inputTag);inputTag='';
          }"
      />
      <el-button
          type="primary"
          size="default"
          @click="() => {
            addGlobalTags(inputTag);inputTag='';
          }"
      >
        添加
      </el-button>
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
