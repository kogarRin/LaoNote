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
export const searchResult = ref([]);
export function searchedNotes(tokensOrContent){
    try {
        if (!tokensOrContent || tokensOrContent.trim() === '' || tokensOrContent.trim() === 'undefined') {
            searchResult.value = [...notesFromDb.value];
        } else {
            let lowerQuery = tokensOrContent.trim().toLowerCase();
            searchResult.value = notesFromDb.value.filter(
                (item) => (
                    item.title.toLowerCase().includes(lowerQuery) || item.content.toLowerCase().includes(lowerQuery)
                )
            );
        }
    } catch (error) {
        ElMessage(ElMessageConfig.buildConfig('error', error.message, true, 1500));
        return [];
    }
}