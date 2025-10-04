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
const editView = ref(false);

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
    :show-close="false"
    center
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
  <el-dialog
      v-model="editView"
      :open-delay=100
      :before-close="()=>editView=false"
      :show-close="false"
      center
  >
    <div>
      <h1 class="instructionTitle"><span>编辑说明</span></h1>
    </div>
    <div class="divideLine"></div>
    <div class="instructionContent">
      <p>当前支持普通文本编辑，适用情景如：随记、笔记等（甚至创作短篇小说，如果不嫌弃体验较差的编辑页面（doge））</p>
      <p>同时，在编辑文本时，段落前无需缩进，段落之间回车换行即可，在预览模式时会自动缩进和分段</p>
    </div>
    <div class="buttonContain">
      <el-button type="primary" @click="editView=false">确定</el-button>
    </div>
  </el-dialog>


  <div class="settingsContainer">
    <el-space
        style="width: 100%"
        direction="vertical"
        fill
    >
      <el-card>
        <div class="mainContainer">
          <div class="title">
            <b>设置与说明</b>
          </div>

          <el-divider/>

          <div class="itemsContainer">
            <div class="item">
              <div>
                <span>设置文件路径</span>
                <el-tooltip placement="top" effect="dark" content="查看说明">
                  <el-icon id="infoFile" @click="instructionView=!instructionView"><InfoFilled /></el-icon>
                </el-tooltip>
              </div>
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
            <div class="divideLine"></div>
            <div class="item">
              <div>
                <span>文本编辑说明</span>
              </div>
              <div>
                <el-button type="default" @click="editView=!editView">查看说明</el-button>
              </div>
            </div>
            <div class="divideLine"></div>
            <div class="item">
              <div>
                <span>更多</span>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>

      </el-card>
    </el-space>
  </div>
</template>

<style lang="scss">
.divideLine{
  margin: 1.5em .5em 1.5em .5em;
  width: 100%;
  translate: -7px;
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
  & p{
    font-size: 1.2em;
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

  .item{
    display: flex;
    justify-content: space-between;

    #infoFile{
      margin: .3em 0 0 .5em;

      &:hover{
        cursor: pointer;
      }
    }

    .inputAndButton{

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
