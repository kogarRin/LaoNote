<script setup>
import {editView, instructionView} from "@/src/js/setting/mainSetting.js";
import './SettingContain.vue';
import SettingContain from "@/src/components/setting/SettingContain.vue";
import {handleNoteTable} from "@/src/js/setting/mainSetting.js";
import {isCopy} from "@/src/js/common/copyStyle.js";

const {getAndCopyContent,getOutputContent,searchTitle,filterData} = handleNoteTable();

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
      <h1 class="instructionTitle">说明</h1>
    </div>
    <div class="divideLine"></div>
    <div class="instructionContent">
      <p>
        点击<button>浏览</button>可选择内容复制或导出为txt文件
      </p><br>
      <p>
        点击<button>复制</button>可将文件数据复制到剪贴板
      </p>
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
  <el-dialog
      v-model="isCopy"
      :before-close="()=>isCopy=false"
      width="700"
  >
    <div class="instructionTitle">
      <h1>全部内容</h1>
    </div>
    <div class="divideLine"></div>
    <div class="noteTable">
      <el-table
          :data="filterData"
          height="400"
          :show-overflow-tooltip="true"
      >
        <el-table-column fixed="left" label="标题" prop="title" width="100"/>
        <el-table-column label="创建时间" prop="createAt" width="150"/>
        <el-table-column label="内容" prop="content" width="450"/>
        <el-table-column fixed="right" width="150">
          <template #header>
            <el-input
              placeholder="搜索标题"
              v-model="searchTitle"
            />
          </template>
          <template #default="scope">
            <div class="tableBtn" style="display: flex; justify-content: flex-end;">
              <el-button type="default" size="default" @click="getOutputContent(scope.$index)">
                导出
              </el-button>
              <el-button type="primary" size="default" @click="getAndCopyContent(scope.$index)">
                复制
              </el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </el-dialog>

  <SettingContain />

</template>

<style lang="scss" src="./Setiingdialog.scss">
</style>
