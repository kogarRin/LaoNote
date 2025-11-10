<script setup>
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {useRoute, useRouter} from "vue-router";
import {Back} from "@element-plus/icons-vue";
import {ref} from "vue";


const router = useRouter();
const route = useRoute();
const toShowNote = ref();
// 获取当前笔记对象
toShowNote.value = notesFromDb.value.find((item) => item.id === route.params.id);
// 返回首页
function backHome(){
    router.push({name: "home"});
}

// 格式化笔记内容
function textFormat(text){
  try {
    if (!text || text.trim() === "") return [];
    if (!/\n$/.test(text)) {
      console.log("text:", text)
     return text;
    }
    console.log("text:", text)
    return text.split("\n").filter((item) => item.trim()!== "");
  } catch (error) {
    console.log("return:", text)
    console.log(error);
    return [];
  }
}
function getPraArray(toFormatContent){
  try {
    if (!toFormatContent) return [];
    if (Array.isArray(toFormatContent)) {
      return toFormatContent;
    }
    String(toFormatContent).trim();
    console.log(Array(1).fill(toFormatContent));
    return Array(1).fill(toFormatContent);
  } catch (error) {
    console.log(error);
    return [];
  }
}
//编辑页面
function toEdit(){
  router.push({
    name: "edit",
    params: {
      id: toShowNote.value.id
    }
  });
}
</script>

<template>
<div class="mainContainer">
  <div class="spaceContainer">
    <el-space
        style="width: 100%;"
        direction="vertical"
        fill>
      <el-card>
        <div class="headerForm">
          <h1 class="title">{{toShowNote}}</h1>
          <div class="buttonsContainer">
            <el-button text @click="backHome">
              <el-icon size="18px"><Back /></el-icon>
            </el-button>
            <el-button type="primary" @click="toEdit">
              <span>编辑</span>
            </el-button>
          </div>
        </div>
        <el-divider>
        </el-divider>
        <div class="contentForm">
          <el-scrollbar>
            <p v-for="(item, index) in awa" style="background-color: #808890" :key="index">{{item}}</p>
          </el-scrollbar>
        </div>
      </el-card>
    </el-space>
  </div>
</div>
</template>

<style scoped lang="scss" src="./showForm.scss">
</style>
