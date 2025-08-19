<script setup>
import {useRouter} from "vue-router";
import router from "../router/index.js";

const objDate = new Date();
const todayDate = objDate.getFullYear() + ' / ' + (objDate.getMonth() + 1) + ' / ' + objDate.getDate();

let timeMinutes = objDate.getMinutes() < 10 ? "0"+objDate.getMinutes() : objDate.getMinutes();
const timeNow = objDate.getHours() + ':' + timeMinutes;

function toEditor(){
  router.push('/editor');
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

        <div class="textContainer" @click="toEditor">

             <div class="textInfoContain">

               <div class="upOne">
                  <span class="titleText">
                    <b>无标题</b>
                  </span>
               </div>
               <div class="downOne">
                  <div class="downOneFirst">
                    <span class="textContent">
                      段落内容段落内容
                    </span>
                  </div>
                  <div>
                     <span>编辑于{{timeNow}} 共000字</span>
                  </div>
               </div>

             </div>

        </div>

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