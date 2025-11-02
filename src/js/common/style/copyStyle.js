import {ref} from "vue";
import {ElMessageConfig} from "@/src/js/config/messageType.js";
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {ElMessage} from "element-plus";

//获取json
export const isCopy = ref(false);
export const buildAllJsonStructure = () => {
    const getAllNotesArray = notesFromDb.value;
    return {notes: getAllNotesArray};
}

//复制仓库url
export function copyUrl(){
    const url = 'https://gitee.com/kogarrin/lao-note'
    try {
        navigator.clipboard.writeText(url).then(() => {});
        ElMessage(ElMessageConfig.buildConfig('success', '复制成功', false, 1500))
    } catch (error) {
        ElMessage(ElMessageConfig.buildConfig('error', error.message, false, 1500))
    }
}


