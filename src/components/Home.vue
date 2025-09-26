<script setup>
import {onMounted, ref} from "vue";
import {Delete, Plus, Refresh} from "@element-plus/icons-vue";
import router from "@/src/router/index.js";
import {
  getDate,
  notesFromDb,
  listener,
  isEditorModal,
  addOneNote,
  selectedNoteIDs,
  deleteNote,
  debugging,
  initNotes,
  refresh
} from "@/src/js/homeHandle.js";

//路由
function toEditor(){
  router.push({path:'/editor'});
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
    v-model="listener"
    :show-close="false"
  >
    <div class="noticesTitle">
      <h2>提示</h2>
    </div>
    <div class="divideLine"></div>
    <div class="createNotices">
      <span>存在内容为空的记录，是否继续新建？</span>
    </div>
    <div class="createNoticesButton">
      <el-button type="default"  @click="()=>listener=!listener">取消</el-button>
      <el-button type="primary"  @click="">确定</el-button>
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
            <el-button type="primary" size="small" @click="addOneNote">
              <el-icon><Plus /></el-icon><span>新建</span>
            </el-button>
            <el-button type="primary" size="small" @click="debugging">
              <span>渲染调试</span>
            </el-button>
            <el-button type="success" size="small" @click="listener=!listener">
              <span>弹窗</span>
            </el-button>
            <el-icon id="refreshIcon"
                     @click="refresh"
            >
              <Refresh />
            </el-icon>
            <el-button id="editorButton" @click="()=>isEditorModal=!isEditorModal">
              <span>{{ isEditorModal? '取消' : '编辑' }}</span>
            </el-button>
            <el-button type="danger" :icon="Delete" @click="deleteNote" circle>

            </el-button>
          </div>
        </div>

        <ul style="padding: 0">
          <li style="list-style-type: none;" v-for="eachNote in notesFromDb" :key="eachNote.id" class="contentsList">
            <input v-if="isEditorModal" type="checkbox" :value="eachNote.id" v-model="selectedNoteIDs">
            <div class="textContainer" @click="toEditor">
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

  .contentsList{
    display: flex;

    .textContainer{
        width: 100%;

      .textInfoContain{
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: .8em;
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
</style>