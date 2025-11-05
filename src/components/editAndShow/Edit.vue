<script setup>
import {useRoute,useRouter} from "vue-router";
import {Back} from "@element-plus/icons-vue";
import {useEditNote} from "@/src/js/edit/editHandle.js";

const objDate = new Date();
const router = useRouter();
const route = useRoute();
const {contentRef, titleRef, tagsRef, saveClick, setRouteGuard, updateTags, cancelSetTag, deleteEditTags, inputValue, inputVisible} = useEditNote(route);

// 路由守卫
setRouteGuard();

//返回
const toShowForm = () => router.push({ name: 'showNote' });
</script>

<template>
<div class="editContainer">

  <el-space
      style="width: 100%"
      direction="vertical"
      fill
  >
    <el-card>

      <div class="inputTitle">
        <div>
          <h4>{{`${(objDate.getMonth() + 1)}月${objDate.getDate()}日`}}{{objDate.getHours() <= 12 ? '上午' : '下午'}}</h4>
          <h1>标题</h1>
        </div>
        <div class="buttonDiv">
          <div>
            <el-button text @click="toShowForm">
              <el-icon size="18px"><Back /></el-icon>
            </el-button>
            <el-button type="primary" @click="saveClick">保存</el-button>
          </div>
        </div>
      </div>
      <div class="inputTitleDiv">
        <el-input
            v-model="titleRef"
            placeholder="输入标题"
            clearable
        />
      </div>

      <div class="mainEditor">
        <div class="headerDiv">
          <h1>内容</h1>
          <div class="tagsDiv">
              <el-tag
                  v-for="item in tagsRef"
                  :key="item"
                  @close="deleteEditTags(route.params.id, item)"
                  closable
              >
                {{ item }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                v-model="inputValue"
                size="small"
                maxlength="10"
                show-word-limit
                style="width: 100px"
              />
              <div style=" display: flex; gap: 5px">
                <el-button
                    @click="cancelSetTag"
                    size="small"
                >
                  {{ (inputVisible ? 'cancel' : '+ New Tag') }}
                </el-button>
                <el-button
                    v-if="inputVisible"
                    @click="updateTags(route.params.id, inputValue)"
                    size="small"
                    type="primary"
                    style="margin-left: 0"
                >
                  Confirm
                </el-button>
              </div>

          </div>
        </div>
        <div class="commonEditor">
          <el-input
              v-model="contentRef"
              class="commonTextarea"
              type="textarea"
              :rows="25"
              resize="none"
              placeholder="开始写下你的想法..."
              maxlength="50000"
              show-word-limit
          />
        </div>
      </div>

    </el-card>
    <el-card>
      <div class="tips">
        <h1 style="text-align: center;">增大窗口尺寸效果更好 ~ ((≧︶≦*)</h1>
      </div>
    </el-card>
  </el-space>
</div>
</template>

<style scoped lang="scss" src="./Edit.scss">
</style>
