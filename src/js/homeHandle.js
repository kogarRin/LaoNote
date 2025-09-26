import {ref} from "vue";
import {ElMessage} from "element-plus";
import {defineStore} from "pinia";
import {ElMessageConfig} from "../setTypes/messageType.js";

const isInit = ref(false);
export const notesFromDb = ref([]);
export const listener = ref(false);
export const isEditorModal = ref(false);
export const selectedNoteIDs = ref([]);

//显示时间
export function getDate(){
    const objDate = new Date();
    const todayDate = `${objDate.getFullYear()} / ${(objDate.getMonth() + 1)} / ${objDate.getDate()}`;
    let timeMinutes = objDate.getMinutes() < 10 ? `0${objDate.getMinutes()}` : `${objDate.getMinutes()}`;
    const timeNow = `${objDate.getHours()} : ${timeMinutes}`;
    return{
        todayDate,
        timeNow
    }
}


export async function initNotes(){ //仅用于初始化，多次调用可能会导致弹窗重复 awa
    const setInitNotes = await window.electronAPI.getNotes();
    if (!isInit.value){
        try {
            if (setInitNotes && Array.isArray(setInitNotes)) {
                isInit.value = true;
                const notesCount = setInitNotes.length;
                setTimeout(() => {
                    ElMessage(ElMessageConfig.buildConfig("success", notesCount > 0 ? `初始化成功,共有${notesCount}条笔记！` : "嘶~似乎没有记录", true, 2000))
                }, 1500);
                notesFromDb.value = setInitNotes;
            } else {
                setTimeout(() => {
                    ElMessage(ElMessageConfig.buildConfig("error", "数据文件结构可能损坏", true, 2000));
                }, 2000)
            }
        } catch (error) {
            if (error.code === 'ENTENTE') {
                ElMessage(ElMessageConfig.buildConfig("error","数据文件不存在"));
            } else {
                ElMessage(ElMessageConfig.buildConfig("error","初始化失败"));
            }
            console.error(error);
            return null;
        }
    }
}

//渲染进程用，可以多次掉用,适用于仅仅获取录记数据
export async function loadNotesInRenderer(){
    notesFromDb.value = await window.electronAPI.getNotes();
    return notesFromDb.value;
    // notesFromDb.value : Object[]
}

//新建函数
export async function addOneNote() {
    await window.electronAPI.addNotes();
    ElMessage(ElMessageConfig.buildConfig("success", "正在添加...", true, 900));
    setTimeout(async () => {
        try {
            notesFromDb.value = await window.electronAPI.getNotes();
            ElMessage(ElMessageConfig.buildConfig("success", "添加记录成功！", true, 1000));
        } catch (error) {
            ElMessage(ElMessageConfig.buildConfig("error", "添加记录失败！", true, 1000));
        }
    },800)
    console.log(notesFromDb.value);
}


//编辑
export async function deleteNote() {

}

//刷新
export async function refresh(){
    notesFromDb.value = []
    setTimeout(async ()=>{
        notesFromDb.value = await window.electronAPI.getNotes();
    },500)
    if (notesFromDb.value.length === 0 || notesFromDb.value) {
        ElMessage(ElMessageConfig.buildConfig("success", "刷新成功！", true, 1000));
    }
}

//调试
export function debugging(){
   console.log(notesFromDb.value,Array.isArray(notesFromDb.value));
}


