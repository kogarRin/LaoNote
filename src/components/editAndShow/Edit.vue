<script setup>
import {onBeforeRouteLeave, useRoute,useRouter} from "vue-router";
import {notesFromDb, updateNote} from "@/src/js/home/homeHandle.js";
import {ref, toRaw} from "vue";
import {ElMessageBox} from "element-plus";
import {Back} from "@element-plus/icons-vue";

const objDate = new Date();
const router = useRouter();
const route = useRoute();

//最初从db获取的note，不会改变
let editNoteObj = toRaw(
    notesFromDb.value.find(item => item.id === route.params.id)
)

const contentRef = ref(editNoteObj.content);
const titleRef = ref(editNoteObj.title);
function sendUpdateNote(){
  const sendUpdateNote =  toRaw({
    title: titleRef.value,
    content: contentRef.value,
    createAt: editNoteObj.createAt,
    id: editNoteObj.id,
  })
  return JSON.parse(JSON.stringify(sendUpdateNote))
}
function toShowForm(){
  router.push({name: "showNote"});
}

onBeforeRouteLeave((to, from, next) => {
  const currentNote = sendUpdateNote()
  //currentNote用于获取当前note，与最初editNoteObj比较
  if (currentNote.content === editNoteObj.content && currentNote.title === editNoteObj.title) {
    return next();
  } else {
    const getNewNoteDb = toRaw(notesFromDb.value.find(item => item.id === route.params.id))
    //这里currentNote再和getNewDb比较，如果已经保存，newDb会改变
    const isSaved = () => (
      currentNote.content === getNewNoteDb.content && currentNote.title === getNewNoteDb.title
    );
    if (isSaved()) {
      return next();
    } else {
      ElMessageBox.confirm('当前内容未保存，是否保存？', '提示',{
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        showClose: false,
        callback: (action) => {
          if (action === 'confirm') {
            updateNote(sendUpdateNote());
            next();
          } else {
            return next();
          }
        }
      })
    }
  }
});
</script>

<template>
<div class="editContainer">

  <el-space
      style="width: 100%"
      direction="vertical"
      fill
  >
    <el-card>

      <div class="inputTitle">
        <div>
          <h4>{{`${(objDate.getMonth() + 1)}月${objDate.getDate()}日`}}{{objDate.getHours() <= 12 ? '上午' : '下午'}}</h4>
          <h1>请输入标题</h1>
        </div>
        <div class="buttonDiv">
          <div>
            <el-button text @click="toShowForm">
              <el-icon size="18px"><Back /></el-icon>
            </el-button>
            <el-button type="primary" @click="updateNote(sendUpdateNote())">保存</el-button>
          </div>
        </div>
      </div>
      <div class="inputTitleDiv">
        <el-input
            v-model="titleRef"
            placeholder="请输入文章标题"
            clearable
        />
      </div>

      <el-divider class="crossLine"></el-divider>

      <div class="mainEditor">
        <div class="noticeTitle">
          <h1>正文内容</h1>
        </div>
        <div class="commonEditor">
          <el-input
              v-model="contentRef"
              class="commonTextarea"
              type="textarea"
              :rows="25"
              resize="none"
              placeholder="开始写下你的想法..."
              maxlength="50000"
              show-word-limit
          />
        </div>
      </div>

    </el-card>
    <el-card>
      <div class="tips">
        <h1 style="text-align: center;">增大窗口尺寸效果更好 ~ ((≧︶≦*)</h1>
      </div>
    </el-card>
  </el-space>
</div>
</template>

<style scoped lang="scss" src="./Edit.scss">
</style>