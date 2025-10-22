<script setup>
import {onMounted} from "vue";
import {Delete, Refresh, Search} from "@element-plus/icons-vue";
import {searchInputContent, searchedNotes} from "@/src/js/common/tool.js";
import {isEditorModal, addOneNote, selectedNoteIDs, deleteNote, deleteConfirm, initNotes, refresh, noticeListenerDelete} from "@/src/js/home/homeHandle.js";
import noteList from "@/src/components/home/noteList.vue";

onMounted( async () => {
  await initNotes();
});


</script>

<template>
<!-- 内容-->
  <el-dialog
      v-model="noticeListenerDelete"
      :show-close="false"
  >
    <div class="noticesTitle">
      <h2>提示</h2>
    </div>
    <div class="divideLine"></div>
    <div class="createNotices">
      <span>确定删除选择的{{selectedNoteIDs.length}}条记录？</span>
    </div>
    <div class="createNoticesButton">
      <el-button type="default"  @click="()=>noticeListenerDelete=!noticeListenerDelete">取消</el-button>
      <el-button type="primary"  @click="deleteConfirm">确定</el-button>
    </div>
  </el-dialog>

  <div class="mainContentContain">
        <div class="headerContain">
          <div class="header">
            <div class="headerTitle">
              <span><b>{{ new Date().getHours() > 12 ? (new Date().getHours() < 18 ? '下午好，一起摸鱼?' : '没睡，帮带个蜜雪?') : '起这么早，帮打个早八' }}</b></span>
            </div>
            <div class="searchDiv">
              <div>
                <el-input
                  v-model="searchInputContent"
                  :prefix-icon="Search"
                  :disabled="isEditorModal"
                  size="large"
                  class="searchInput"
                  placeholder="输入标题或内容搜索"
                  @keyup.enter="()=>searchedNotes(searchInputContent)"
                  style="width: 15em"
                >
                </el-input>
              </div>
            </div>
            <div class="headerButton">
              <div class="item">
                <el-button v-if="isEditorModal" type="danger" :icon="Delete" @click="deleteNote" circle>
                </el-button>
              </div>
              <div class="item">
                <el-button type="primary"  @click="addOneNote" :disabled="isEditorModal">
                  + 新建
                </el-button>
              </div>
              <div class="item">
                  <el-button id="editorButton" @click="()=>{isEditorModal=!isEditorModal;selectedNoteIDs=[]}">
                    <span>{{ isEditorModal? '取消' : '编辑' }}</span>
                  </el-button>
              </div>
              <div class="item">
                  <el-button
                      id="refreshIcon"
                      @click="refresh"
                      :disabled="isEditorModal"
                      circle
                  >
                    <el-icon>
                      <Refresh />
                    </el-icon>
                  </el-button>
              </div>
            </div>
          </div>
        </div>

        <noteList />

  </div>

</template>

<style scoped lang="scss" src="./Home.scss">
</style>