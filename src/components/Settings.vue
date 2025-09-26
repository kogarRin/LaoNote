<script setup>
import { InfoFilled } from "@element-plus/icons-vue"
import { useFileInput } from "@/src/js/handleSetting.js";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";
import {buildJsonStructure} from "@/src/js/handleSetting.js";
import {ElMessageConfig} from "@/src/setTypes/messageType.js";
import {ElMessage} from "element-plus";


const pathStore = useFileInput();
const {pathSelect} = storeToRefs(pathStore);
const instructionView = ref(false);

onMounted(async ()=>{
  await pathStore.reLoadPathStore();
});
async function copyJson() {
  await navigator.clipboard.writeText(JSON.stringify(buildJsonStructure));
  ElMessage(ElMessageConfig.buildConfig('success', '复制成功',true, 2000));
}
</script>

<template>
  <el-dialog
    v-model="instructionView"
    :open-delay=100
    :before-close="()=>instructionView=false"
    center
    :show-close="false"
  >
    <div>
      <h1 class="instructionTitle"><span>说明</span></h1>
    </div>
    <div class="divideLine"></div>
    <div class="instructionContent">
      <span>
        点击<button>浏览...</button>可查看数据文件的详细保存路径
      </span><br>
      <span>
        点击<button>复制</button>可将文件数据复制到剪贴板
      </span>
    </div>
    <div class="buttonContain">
      <el-button type="primary" @click="instructionView=false">确定</el-button>
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
          <span>设置文件路径</span>
          <el-tooltip placement="top" effect="dark" content="查看说明">
            <el-icon id="infoFile" @click="instructionView=!instructionView"><InfoFilled /></el-icon>
          </el-tooltip>
          <div class="inputAndButton">
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
            <el-tooltip placement="top" effect="dark" content="点击复制 json" >
              <el-button
                  type="primary"
                  id="copyButton"
                  @click="copyJson()"
              >
                复制
              </el-button>
            </el-tooltip>
          </div>
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
    font-size: 2em;

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
    font-size: 1.4em;

    & strong{
      margin: 0 .5em;
    }
  }
}

.buttonContain{
  margin: 2em 0 0 0;
  display: flex;
  flex-direction: column-reverse;
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

    .inputAndButton{
      position: absolute;
      right: 0;
      display: flex;
      gap: .5em;

      .inputDefaultPath{
        width: 250px;
      }

    }
  }

}

</style>
