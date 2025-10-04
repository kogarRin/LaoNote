<script setup>
import {onMounted} from "vue";
import {Delete, Plus, Refresh} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {
  getDate,
  notesFromDb,
  isEditorModal,
  addOneNote,
  selectedNoteIDs,
  deleteNote,
  deleteConfirm,
  debugging,
  initNotes,
  refresh,
  showSkeleton,
  noticeListenerDelete
} from "@/src/js/homeHandle.js";

//路由
const router = useRouter();
function toShowForm(eachNoteId){
  //判断是否处于编辑状态
  if (isEditorModal.value) {
    //如果处于编辑状态，判断id是否是选中状态
    if (selectedNoteIDs.value.find((id) => id === eachNoteId)) {
      selectedNoteIDs.value = selectedNoteIDs.value.filter((id) => id !== eachNoteId);
      return null;
    } else {
      selectedNoteIDs.value.push(eachNoteId);
    }
    return null;
  } else {
    router.push({
      name:'showNote',
      params:{id: eachNoteId}
    });
  }
}

//时间
const {todayDate, timeNow} = getDate();

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
    <el-space
        style="width: 100%"
        direction="vertical"
        fill
    >
      <el-card>
        <div class="insideTitle">
          <span><b>选择目录以编辑</b></span>
        </div>

        <div class="insideContent">
          <el-divider content-position="left">
            <span>今天</span>
            <span> -- </span>
            <span>{{todayDate}}</span>
          </el-divider>
        </div>
        <div class="forEditor">
          <div class="editorButtonContain">
            <el-button type="primary" size="small" @click="addOneNote" :disabled="isEditorModal">
              <el-icon><Plus /></el-icon><span>新建</span>
            </el-button>
            <el-button type="primary" size="small" @click="debugging">
              <span>渲染调试</span>
            </el-button>
            <el-icon id="refreshIcon"
                     @click="refresh"
            >
              <Refresh />
            </el-icon>
            <el-button id="editorButton" @click="()=>{isEditorModal=!isEditorModal;selectedNoteIDs=[]}">
              <span>{{ isEditorModal? '取消' : '编辑' }}</span>
            </el-button>
            <el-button v-if="isEditorModal" type="danger" :icon="Delete" @click="deleteNote" circle>
            </el-button>
          </div>
        </div>

        <div class="showContainer">
          <div style="margin: 1em 0 1em 0;" v-if="!showSkeleton" class="skeleton">
            <el-skeleton v-for="i in 3" variant="text" :rows="1" id="skeLine" animated/>
          </div>
          <div class="emptyContainer" v-else-if="(!notesFromDb.length)">
            <el-empty description="暂无记录" image="src/assets/nodata.png" :image-size="150" />
          </div>
          <el-scrollbar>
            <ul style="padding: 0">
              <li style="list-style-type: none;" v-for="eachNote in notesFromDb" :key="eachNote.id" class="contentsList">
                <input v-if="isEditorModal" type="checkbox" :value="eachNote.id" v-model="selectedNoteIDs">
                <div class="textContainer" @click="toShowForm(eachNote.id)">
                  <div class="textInfoContain">
                    <div class="upOne">
                  <span class="titleText">
                    <b>{{eachNote.title}}</b>
                  </span>
                    </div>
                    <div class="downOne">
                      <div class="downOneFirst">
                    <span class="textContent">
                      {{ eachNote.content? `${eachNote.content.trim().slice(0, 32)}......` : "暂无内容"}}
                    </span>
                      </div>
                      <div class="downOneSecond">
                        <span>编辑于{{timeNow}} 共</span><span id="wordCount">{{eachNote.content ? eachNote.content.trim().length : 0}}</span><span>字</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>

      </el-card>
    </el-space>
  </div>

</template>

<style scoped lang="scss">
.noticesTitle{
  display: flex;
  margin: 0 0 0 .5em;

  & h2{
    margin: 0;
  }
}

.divideLine{
  margin: .5em;
  border: solid 1px #d3cfcf;
}

.createNotices{
  display: flex;
  margin: 0 0 1em .5em;
}

.createNoticesButton{
  display: flex;
  flex-direction: row-reverse;
  margin: 0 1em .5em 0;

  & button{
    margin-right: .5em;
  }
}

.mainContentContain {
  padding: 1em;
  width: 100%;


  .insideTitle {
    display: flex;
  }

  .insideContent {
    display: flex;
  }

  .forEditor {
    display: flex;
    padding: 0 0 0 1em;
    position: relative;

    #refreshIcon {
      position: absolute;
      right: 14px;
      top: 5px;
      font-size: 1.5em;

      &:hover {
        cursor: pointer;
      }
    }

    #editorButton {
      position: absolute;
      right: 50px;
    }
  }

  .showContainer{
    height: calc(70vh - 1.5em);
    margin: 1em 0 0 0;
    position: relative;

    .skeleton{
      padding: 1em 0 0 .5em;
      position: absolute;
      width: 94%;
      left: 1%;

      #skeLine{
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 1em;
      }
    }

    .emptyContainer{
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }

    .contentsList{
      display: flex;

      .textContainer{
        width: 100%;

        .textInfoContain{
          display: flex;
          flex-direction: column;
          text-align: left;
          margin:  0 .8em 1.6em .8em;
          border: solid rgba(109, 127, 145, 0.45) 2px;
          border-radius: .2em;

          &:hover{
            box-shadow: 0 0 10px rgba(149, 183, 209, 0.68);
            cursor: pointer;
          }

          .upOne{
            margin: .8em;

            .titleText{
              user-select: none;
            }
          }

          .downOne{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 0 .8em .8em .8em;
            user-select: none;
          }
        }

      }
    }
  }
}
</style>