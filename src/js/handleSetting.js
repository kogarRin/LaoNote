import { ref } from "vue";
import {defineStore} from "pinia";

export const useFileInput = defineStore('file-input', ()=>{
    const pathSelect =  ref('');

    //重启时加载store, 显示上一次保存的路径
    async function reLoadPathStore(){
        pathSelect.value = await window.electronAPI.getSavePath();
    }

    //更新路径和保存store
    async function selectAndSave(){
        const dir =  await window.electronAPI.selectDefault();
        if (dir){
            pathSelect.value = dir;
            console.log('save path:', dir);
        }
    }
    return {
        pathSelect,
        reLoadPathStore,
        selectAndSave
    }
})