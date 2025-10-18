<script setup>
import {onMounted} from "vue";
import {Delete, Refresh} from "@element-plus/icons-vue";
import './noteList.vue';
import {
  isEditorModal,
  addOneNote,
  selectedNoteIDs,
  deleteNote,
  deleteConfirm,
  initNotes,
  refresh,
  noticeListenerDelete
} from "@/src/js/home/homeHandle.js";
import NoteList from "@/src/components/home/noteList.vue";


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
              <span><b>选择目录以编辑</b></span>
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