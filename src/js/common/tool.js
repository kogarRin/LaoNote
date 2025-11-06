import {ref} from "vue";
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";

//显示预览内容
export function setBriefContent(dataObject, contentStringLength) {
    return dataObject.content && dataObject.content.trim().length > contentStringLength ?
           `${dataObject.content.trim().slice(0, contentStringLength)}...` :
           dataObject.content.trim();
}

//显示创建时间
export function showCreateInfo({createAt}) {
    let createDate = new Date(createAt);
    const nyr = `${createDate.getFullYear().toString().padStart(4, '0')}/${(createDate.getMonth() + 1).toString().padStart(2, '0')}/${createDate.getDate().toString().padStart(2, '0')}`
    const xsfz = `${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}`
    return `${nyr} ${xsfz}`;
}

//搜索方法
export const searchInputContent = ref('');
export const searchResult = ref([]);
export const isSearchMode = ref(false);
export function searchedNotes(tokensOrContent){
    try {
        if (!tokensOrContent || tokensOrContent.trim() === '' || tokensOrContent.trim() === 'undefined') {
            isSearchMode.value = false;
        }
        else {
            isSearchMode.value = !isSearchMode.value;
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


//// id:时间戳 + 3 位 36 进制随机数
function shortId() {
    const tail = Math.random().toString(36).slice(-3); // 取后 3 位
    return Date.now().toString(36) + tail;
}

//空记录样式
export const emptyNoteType = {
    title: "无标题",
    content: "",
    createAt: new Date(),
    id: shortId(),
    tags: [],
}

