<script setup>
import {InfoFilled} from "@element-plus/icons-vue";
import {isCopy} from "@/src/js/handleSetting.js";
import {instructionView, editView, copyJson} from "@/src/js/container.js";


</script>

<template>
  <div class="settingsContainer">
    <el-space
        style="width: 100%;"
        direction="vertical"
        fill
    >
      <el-card>
          <template #header>
            <div class="title">
              <b>设置与说明</b>
            </div>
          </template>

          <div class="itemsContainer">
            <div class="item">
              <div>
                <span>复制选项</span>
                <el-tooltip placement="top" effect="dark" content="查看说明">
                  <el-icon id="infoFile" @click="()=>instructionView=!instructionView"><InfoFilled /></el-icon>
                </el-tooltip>
              </div>
              <div class="copyButton">
                <el-tooltip placement="top" effect="dark" content="选择复制的内容">
                  <el-button
                      type="default"
                      id="copyChooserButton"
                      @click="()=>isCopy=!isCopy"
                  >
                    浏览
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="dark" content="点击复制 json" >
                  <el-button
                      type="primary"
                      id="copyButton"
                      @click="copyJson"
                  >
                    复制全部
                  </el-button>
                </el-tooltip>
              </div>
            </div>
            <div class="item">
              <div>
                <span>编辑</span>
              </div>
              <div>
                <el-button type="default" @click="editView=!editView">查看说明</el-button>
              </div>
            </div>
          </div>

      </el-card>
    </el-space>
  </div>
</template>

<style scoped lang="scss">
.settingsContainer{
  flex-grow: 1;
  padding: .5em;

    .title {
      display: flex;
      justify-content: flex-start;

    }

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: .5em;

      #infoFile {
        margin: .3em 0 0 .5em;

        &:hover {
          cursor: pointer;
        }
      }

      .copyButton {
        right: 0;
        display: flex;


        .inputDefaultPath {
          width: 250px;
        }

      }
    }
  }


</style>