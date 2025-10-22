import {ref} from "vue";
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";

//复制内容展示
export function setBriefContent(dataObject, contentStringLength) {
    return dataObject.content && dataObject.content.trim().length > contentStringLength ?
           `${dataObject.content.trim().slice(0, contentStringLength)}...` :
           dataObject.content.trim();
}

//搜索
export const searchInputContent = ref('');
export function searchedNotes(tokensOrContent){
    let getNotes = [...notesFromDb.value];
    try {
        if (getNotes.length > 0) {

            const searchResult = getNotes.filter(note => (
                note.title.includes(tokensOrContent) || note.content.includes(tokensOrContent)
            ));
            console.log(searchResult)
            return {searchResult};
        }
        return getNotes;
    } catch (error) {
        ElMessage(ElMessageConfig.buildConfig('error', error.message, true, 1500));
        return [];
    }
}