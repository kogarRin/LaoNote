<script setup>
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {useRoute, useRouter} from "vue-router";
import {Back} from "@element-plus/icons-vue";


const router = useRouter();
const route = useRoute();
// 获取当前笔记对象
let currentNoteObj = (
    notesFromDb.value.find((item) => item.id === route.params.id)
);

// 返回首页
function backHome(){
    router.push({name: "home"});
}

// 格式化笔记内容
function textFormat(text){
  return  text.content.split("\n").filter((item)=>item.trim()!=="");
}
const praArray = textFormat(currentNoteObj);

//编辑页面
function toEdit(){
  router.push({
    name: "edit",
    params: {
      id: currentNoteObj.id
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
          <h1 class="title">{{currentNoteObj.title}}</h1>
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
            <p v-for="(item, index) in praArray" :key="index">{{item}}</p>
          </el-scrollbar>
        </div>
      </el-card>
    </el-space>
  </div>
</div>
</template>

<style scoped lang="scss" src="./showForm.scss">
</style>
