<script setup>
import {showCreateInfo} from "@/src/js/common/getTimeAndDate.js";
import {isEditorModal, notesFromDb, selectedNoteIDs, isLoading} from "@/src/js/home/homeHandle.js";
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
    <div style="margin: 1em 0 1em 0;" v-if="isLoading" class="skeleton">
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

<style scoped lang="scss" src="./noteList.scss">
</style>