<script setup>
import { InfoFilled } from "@element-plus/icons-vue"
import { useFileInput } from "../js/handleSetting.js";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";

const pathStore = useFileInput();
const {pathSelect} = storeToRefs(pathStore);

onMounted(()=>{
  pathStore.reLoadPathStore();
});

const instructionView = ref(false);

</script>

<template>
  <el-dialog
    v-model="instructionView"
    :open-delay=100
    :before-close="()=>instructionView=false"
    center
  >
    <div>
      <h1 class="instructionTitle"><span>说明</span></h1>
    </div>
    <div class="divideLine"></div>
    <div class="instructionContent">
      <span>
        点击<button>浏览...</button>可选择文件的默认保存路径, 应用文件夹中有<strong>data</strong>目录,可以选择
      </span>
    </div>
  </el-dialog>

  <div class="settingsContainer">
    <el-space
        style="width: 100%"
        direction="vertical"
        fill
    >
      <el-card>
        <div class="title">
          <b>文件设置</b>
        </div>
        <el-divider/>
        <div class="setting-file">
          <span>设置文件保存路径</span>
          <el-icon id="infoFile" @click="instructionView=!instructionView"><InfoFilled /></el-icon>
          <el-input
              v-model="pathSelect"
              class="inputDefaultPath"
              clearable
          >
            <template #append>
              <el-button
                type="primary"
                @click="pathStore.selectAndSave()"
              >
                浏览...
              </el-button>
            </template>
          </el-input>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<style lang="scss">
.divideLine{
  margin: .5em;
  border: solid 1px #d3cfcf;
}

.instructionTitle{
  margin: 0;

  & span{
    margin: .5em;
    color: #1e1d1d;

    & strong{
      background-color: #837f7f;
    }
  }
}

.instructionContent{
  margin: 1.5em .5em .5em .5em;

  & button{
    margin: 0 .5em;
  }
  & span{
    color: #1e1d1d;

    & strong{
      margin: 0 .5em;
      border: solid 1px #d3cfcf;
      background-color: #dfdcdc;
      border-radius: .5em;
    }
  }
}

.settingsContainer{
  width: 100%;
  padding: 1em;

  .title{
    display: flex;
  }

  .setting-file{
    display: flex;
    position: relative;

    #infoFile{
      margin: .3em 0 0 .5em;

      &:hover{
        cursor: pointer;
      }
    }

    .inputDefaultPath{
      width: 250px;
      position: absolute;
      right: 0;
    }
  }

}

</style>
