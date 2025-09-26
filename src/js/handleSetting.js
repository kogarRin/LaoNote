import {defineStore} from "pinia";
import {ref} from "vue";
import {notesFromDb} from "@/src/js/homeHandle.js";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/setTypes/messageType.js";

export const useFileInput = defineStore('file-input', ()=>{

    const pathSelect =  ref('');

    //重启时加载store, 显示上一次保存的路径
    async function reLoadPathStore(){
        pathSelect.value = await window.electronAPI.getSavePath();
    }

    //更新路径和保存store
    async function selectAndSave(){
        const yourSelectedDir = await window.electronAPI.selectDefault();
        if (yourSelectedDir){
            pathSelect.value = yourSelectedDir;
            ElMessage(ElMessageConfig.buildConfig('success', `路径已更新为: ${pathSelect.value}`,true, 2000));
            return pathSelect.value;
        }
        ElMessage(ElMessageConfig.buildConfig('warning', `已取消操作`,true, 2000))
    }

    return {
        pathSelect,
        reLoadPathStore,
        selectAndSave
    }
})

export const buildJsonStructure = {
    "notes": notesFromDb.value
}