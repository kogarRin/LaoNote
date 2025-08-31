<script setup>
import router from "../router/index.js";
import {useInput} from "../js/container.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {List, Plus} from "@element-plus/icons-vue";

// 获取当前日期
const objDate = new Date();
const todayDate = objDate.getFullYear() + ' / ' + (objDate.getMonth() + 1) + ' / ' + objDate.getDate();
let timeMinutes = objDate.getMinutes() < 10 ? "0"+objDate.getMinutes() : objDate.getMinutes();
const timeNow = objDate.getHours() + ':' + timeMinutes;
let count;

// 路由跳转
function toEditor(){
  router.push({path:'/editor'});
}

//Pinia Store
const homeShow = useInput();
const {inputValue} = storeToRefs(homeShow);
onMounted(() => {
  homeShow.getInputValue();
});


//js-lite-rest Store
async function debugging(){
  const res = await window.electronAPI.getNotes();
  console.log(res[0].title, typeof res, typeof [], Array.isArray(res));
}

async function liulanqi(){
  console.log(typeof []);
}
</script>

<template>

<!-- 内容-->
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
            <el-button type="primary" size="small" @click="">
              <el-icon><Plus /></el-icon><span>新建</span>
            </el-button>
            <el-button type="primary" size="small" @click="debugging">
              <span>调试按钮</span>
            </el-button>
            <el-button type="primary" size="small" @click="liulanqi">
              <span>浏览器调试</span>
            </el-button>
          </div>
        </div>

        <ul style="padding: 0">
          <li style="list-style-type: none;">
            <div class="textContainer" @click="toEditor">
              <div class="textInfoContain">
                <div class="upOne">
                  <span class="titleText">
                    <b>{{inputValue}}</b>
                  </span>
                </div>
                <div class="downOne">
                  <div class="downOneFirst">
                    <span class="textContent">
                      段落内容段落内容
                    </span>
                  </div>
                  <div>
                    <span>编辑于{{timeNow}} 共 {{typeof count}} 字</span>
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
.mainContentContain{
  padding: 1em;
  width: 100%;


  .insideTitle{
    display:flex;
  }

  .insideContent{
    display: flex;
  }

  .forEditor{
    display: flex;
    padding: 0 0 0 1em;
  }

  .textContainer{

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
      }

      .downOne{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 .8em .8em .8em;
      }
    }

  }
}

</style>