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

// 优化笔记展示
function textFormat(text){
  text = text.replace(/\\+$/, '');
  try {
    if (!text || text.trim() === "") return [];
    console.log("text:", text)
    return text.split("\n").filter((item) => item.trim()!== "");
  } catch (error) {
    console.log(error);
    return [];
  }
}
const praList = textFormat(toShowNote.value.content);
//编辑页面
function toEdit(){
  router.push({
    name: "edit",
  });
}
</script>

<template>
<div class="mainContainer">
  <el-space
      style="width: 100%;"
      direction="vertical"
      fill>
    <el-card>
      <div class="headerForm">
        <h1 class="title">{{toShowNote.title}}</h1>
        <div class="buttonsContainer">
          <el-button text @click="backHome">
            <el-icon size="18px"><Back /></el-icon>
            <span>返回首页</span>
          </el-button>
          <el-button type="primary" @click="toEdit">
            <span>继续编辑</span>
          </el-button>
        </div>
      </div>
      <el-divider>
      </el-divider>
      <div class="contentForm">
        <el-scrollbar>
          <p v-for="(item, index) in praList" :key="index">{{item}}</p>
        </el-scrollbar>
      </div>
    </el-card>
  </el-space>
</div>
</template>

<style scoped lang="scss" src="./showForm.scss">
</style>
