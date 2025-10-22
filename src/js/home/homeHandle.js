import {ref} from "vue";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "../config/messageType.js";

const isInit = ref(false);
export const notesFromDb = ref([]);
export const noticeListenerDelete = ref(false);
export const isEditorModal = ref(false);
export const selectedNoteIDs = ref([]);
export const isLoading = ref(true);

export async function initNotes(){ //仅用于初始化，多次调用可能会导致弹窗重复
    const setInitNotes = await window.electronAPI.getNotes();
    if (!isInit.value){
        try {
            if (setInitNotes && Array.isArray(setInitNotes)) {
                isInit.value = true;
                const notesCount = setInitNotes.length;
                setTimeout(() => {
                    ElMessage(ElMessageConfig.buildConfig("success", notesCount > 0 ? `初始化成功,共有${notesCount}条笔记！` : "嘶~似乎没有记录", true, 1000));
                }, 1300);
                setTimeout(()=>{
                    notesFromDb.value = setInitNotes;
                    isLoading.value = !isLoading.value;
                },1500);
            } else {
                setTimeout(() => {
                    ElMessage(ElMessageConfig.buildConfig("error", "数据文件结构可能损坏", true, 1000));
                }, 2000);
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

//可以多次掉用,适用于仅仅获取录记数据
export async function getNotesData(){
    notesFromDb.value = await window.electronAPI.getNotes();
    return notesFromDb.value;
    // notesFromDb.value : Object[]
}

//新建
export async function addOneNote() {
    try {
        const curNotes = [...notesFromDb.value];
        console.log(curNotes)
        if (curNotes.length === 0){
            await window.electronAPI.addNotes();
            ElMessage(ElMessageConfig.buildConfig("success", "新建成功！", true, 500));
            notesFromDb.value = await getNotesData();
            return null;
        }
        if ((curNotes.reverse()[0].content && curNotes.reverse()[0].content.trim() !== "")) {
            await window.electronAPI.addNotes();
            ElMessage(ElMessageConfig.buildConfig("success", "新建成功！", true, 500));
            notesFromDb.value = await getNotesData();
            return null;
        } else {
            ElMessage(ElMessageConfig.buildConfig("error", "性能较弱，请先编辑空白记录哦~~", true, 1500))
        }
    } catch (error) {
        console.error(error);
        console.log([...notesFromDb.value])
        ElMessage(ElMessageConfig.buildConfig("error", "新建失败,请检查文件结构", true, 1000));
        return null;
    }
}


//删除部分
export async function deleteNote() {
    const deleteIdArray = [...selectedNoteIDs.value];
    try {
        if (deleteIdArray.length === 0) {
            ElMessage(ElMessageConfig.buildConfig("error", "请先选择要删除的记录！", true, 1000));
        }
        if (Array.isArray(deleteIdArray) && deleteIdArray.length > 0) {
            noticeListenerDelete.value = !noticeListenerDelete.value;
            return null;
        }
    } catch (error) {
        console.error(error);
        ElMessage(ElMessageConfig.buildConfig('error',"删除失败", true,1000))
        return null;
    }
}

export async function deleteConfirm () {
    try {
        const deleteIdArray = [...selectedNoteIDs.value];
        await window.electronAPI.deleteNote(deleteIdArray);
        noticeListenerDelete.value = !noticeListenerDelete.value;
        selectedNoteIDs.value = [];
        ElMessage(ElMessageConfig.buildConfig("success", "删除记录成功！", true, 1000));
        notesFromDb.value = await getNotesData();
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//更新
export async function updateNote(newNote) {
    try {
        if (!newNote) {
            return null;
        } else {
            await window.electronAPI.updateNote(newNote);
            ElMessage(ElMessageConfig.buildConfig("success", "保存成功！", true, 1000));
            notesFromDb.value = await getNotesData();
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

//刷新
export async function refresh(){
    notesFromDb.value = [];
    isLoading.value = !isLoading.value;
    setTimeout(async ()=>{
        notesFromDb.value = await window.electronAPI.getNotes();
        isLoading.value = !isLoading.value;
    },300);
    if (notesFromDb.value.length === 0 || notesFromDb.value) {
        ElMessage(ElMessageConfig.buildConfig("success", "刷新成功！", true, 1000));
    }
}
