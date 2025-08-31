<script setup>
import {onActivated, onMounted, ref} from "vue";
import {getTodayDate} from "../js/container.js";
import {useInput} from "../js/container.js";
import {storeToRefs} from "pinia";

const textContent = ref('');
const editorStyle = ref(false);
const {todayDate, isMorning} = getTodayDate();
const inputStore = useInput();
const {inputValue} = storeToRefs(inputStore);

onMounted(() => {
  inputStore.getInputValue();
});

</script>

<template>
<div class="editorContainer">

  <el-space
      style="width: 100%"
      direction="vertical"
      fill
  >
    <el-card>

      <div class="inputTitle">
        <h4>{{todayDate}} {{isMorning}}</h4>
        <h1>请输入标题</h1>

      </div>
      <div class="inputTitleDiv">
        <el-input
            v-model="inputValue"
            placeholder="请输入文章标题"
            clearable

        />
      </div>

      <el-divider class="crossLine"></el-divider>

      <div class="mainEditor">
        <div class="contentInput">
          <h1>正文内容</h1>
        </div>
        <div class="buttonContain">
          <div class="chooseEditor">
            <el-switch
                v-model="editorStyle"
                active-text="Markdown预览"
                inactive-text="普通文本编辑"
            >
            </el-switch>
          </div>
          <div class="saveText">
            <el-button type="primary" @click="inputStore.setInputValue(inputValue)" id="save">
              保存
            </el-button>
          </div>
        </div>
        <div class="commonEditor">
          <el-input
            class="commonTextarea"
            v-model="textContent"
            type="textarea"
            :rows="19"
          />
        </div>
      </div>

    </el-card>

  </el-space>
</div>
</template>

<style scoped lang="scss">
.inputTitle{
  & span{
    text-align: left;
  }
}

.editorContainer {
  width: 100%;
  padding: 1em;

  h4{
    margin: 0;
    text-align: left;
    color: dimgrey;
  }

  h1{
    margin: 0;
    text-align: left;
  }

  .inputTitleDiv{
    display:flex;
    padding: 1em 0;
  }

  .crossLine{
    margin: .5em;
  }

  .mainEditor{

    .buttonContain{
      display: flex;
      align-items: center;
      position: relative;

      .chooseEditor{
        display: flex;
        padding: 1em 0;
      }

      .saveText{
        position: absolute;
        right: 0;
      }
    }

    .commonEditor{
      display: flex;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
      border: solid rgba(109, 127, 145, 0.45) 2px;
      border-radius: .5em;
      max-height: 560px;
      overflow-y: scroll;

      .commonTextarea{
        margin: 1em;
        font-size: medium;
      }
    }

  }
}
</style>