<script setup>
import {InfoFilled} from "@element-plus/icons-vue";
import {isCopy} from "@/src/js/common/copyStyle.js";
import {instructionView, editView, copyJson, settingStore} from "@/src/js/setting/mainSetting.js";
import {storeToRefs} from "pinia";

const {initTheme, toggleTheme} = settingStore();
const {isDark} = storeToRefs(settingStore());
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

          <div class="theme">
            <div class="item">
              <div>
                <span>主题</span>
              </div>
            </div>
            <el-divider />

            <div class="item">
              <div>
                <span>深色模式</span>
              </div>
              <div class="modeButton">
                <el-switch
                  active-text="开启"
                  inactive-text="关闭"
                  v-model="isDark"
                  @change="toggleTheme"
                />
              </div>
            </div>
          </div>

          <el-divider class="partsDivider" />

          <div class="options">
            <div class="item">
              <div>
                <span>选项</span>
              </div>
            </div>

            <el-divider />

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

            <el-divider class="partsDivider" />

            <div class="about">
              <div class="item">
                <div>
                  <span>关于</span>
                </div>
              </div>

              <el-divider />

              <div class="item">
                <div>
                  <span>编辑</span>
                </div>
                <div>
                  <el-button type="default" @click="editView=!editView">查看说明</el-button>
                </div>
              </div>
            </div>
          </div>

      </el-card>
    </el-space>
  </div>
</template>

<style scoped lang="scss" src="./SettingContain.scss">
</style>