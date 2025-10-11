<script setup>
import {showCreateInfo} from "@/src/js/getTimeAndDate.js";
import {isEditorModal, notesFromDb, selectedNoteIDs, showSkeleton} from "@/src/js/homeHandle.js";
import {ref} from "vue";
import {useRouter} from "vue-router";


const router = useRouter();

function toShowForm(eachNoteId){
  //判断是否处于编辑状态
  if (isEditorModal.value) {
    //如果处于编辑状态，判断id是否是选中状态
    if (selectedNoteIDs.value.find((id) => id === eachNoteId)) {
      selectedNoteIDs.value = selectedNoteIDs.value.filter((id) => id !== eachNoteId);
      return null;
    } else {
      selectedNoteIDs.value.push(eachNoteId);
    }
    return null;
  } else {
    router.push({
      name:'showNote',
      params:{id: eachNoteId}
    });
  }
}
</script>

<template>
  <div class="showContainer">
    <div style="margin: 1em 0 1em 0;" v-if="!showSkeleton" class="skeleton">
      <el-skeleton v-for="i in 3" :key="i" variant="text" :rows="1" id="skeLine" animated/>
    </div>
    <div class="emptyContainer" v-else-if="(!notesFromDb.length)">
      <img src="/src/assets/nodata.png" alt="No Data"/>
      <span>暂无数据</span>
    </div>
    <el-scrollbar>
      <ul style="padding: 0">
        <li style="list-style-type: none;" v-for="eachNote in notesFromDb" :key="eachNote.id" class="contentsList">
          <input v-if="isEditorModal" type="checkbox" :value="eachNote.id" v-model="selectedNoteIDs">
          <div class="noteContainer" @click="toShowForm(eachNote.id)">
            <div class="noteInfoContain">
              <div class="contentTitle">
                <span>
                  <b>{{eachNote.title}}</b>
                </span>
              </div>
              <div class="noteContent">
                <div>
                  <span>
                    {{ eachNote.content? `${eachNote.content.trim().slice(0, 32)}......` : "暂无内容"}}
                  </span>
                </div>
              </div>
              <div class="detailInfo">
                <div>
                  <span>共<span style="padding: 0 .2em;">{{eachNote.content ? eachNote.content.trim().length : 0}}</span>字</span>
                </div>
                <div>
                  <span>创建于</span>
                  <span>{{ showCreateInfo(eachNote) }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.showContainer{
  position: relative;
  height: 80%;
  border-radius: .5em;

  .skeleton{
    padding: 1em 0 0 .5em;
    position: absolute;
    width: 94%;
    left: 1%;

    #skeLine{
      display: grid;
      grid-template-columns: 1fr;
      margin-bottom: 1em;
    }
  }

  .emptyContainer{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }

  .contentsList{
    display: flex;

    .noteContainer{
      width: 100%;

      .noteInfoContain{
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0 .6em 1em .6em;
        border: solid rgba(109, 127, 145, 0.45) 2px;
        border-radius: .2em;

        &:hover{
          box-shadow: 0 0 10px rgba(149, 183, 209, 0.68);
          cursor: pointer;
        }

        .contentTitle{
          margin: .8em .8em 0 .8em;
          user-select: none;

        }

        .noteContent{
          display: flex;
          margin: 0 .8em 0 .8em;
          user-select: none;
        }

        .detailInfo{
          display: flex;
          margin: .5em .8em .5em .8em;

          div{
            margin: 0 .5em 0 0;
          }
        }
      }

    }
  }
}
</style>