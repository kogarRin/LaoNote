<script setup>
import {InfoFilled} from "@element-plus/icons-vue";
import {isCopy, copyUrl} from "@/src/js/common/copyStyle.js";
import {instructionView, editView, copyJson, settingStore} from "@/src/js/setting/mainSetting.js";
import {storeToRefs} from "pinia";

const {toggleTheme, selectFont} = settingStore();
const {isDark, fontsList, activeEn} = storeToRefs(settingStore());
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

            <div class="item">
              <div>
                <span>选择字体</span>
              </div>
              <div>
                <el-select style="width: 160px;" v-model="activeEn" :model-value="activeEn" @change="selectFont">
                  <el-option
                      v-for="font in fontsList"
                      :key="font.en"
                      :label="font.name"
                      :value="font.en"
                      :style="{ fontFamily: font.family }"
                  >
                  </el-option>
                </el-select>
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
                <el-tooltip placement="top" effect="dark" content="选择复制或导出的内容">
                  <el-button
                      type="default"
                      id="copyChooserButton"
                      @click="()=>isCopy=!isCopy"
                  >
                    浏览
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="dark" content="点击复制 json">
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
              <div class="item">
                <div>
                  <span>仓库</span>
                </div>
                <div class="repo" @click="copyUrl">
                  <el-tooltip placement="top" effect="dark" content="点击复制仓库地址">
                    <u style="font-size: 14px;">Github仓库</u>
                  </el-tooltip>
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
