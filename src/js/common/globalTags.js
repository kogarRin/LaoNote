import {ref} from "vue";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";

/**
 * @param globalTagsList 渲染层标签数组
 */
export const globalTagsList = ref([]);

export async function getGlobalTags() {
    return await window.electronAPI.loadGlobalTags();
}

/**
 * @function initGlobalTags 初始化渲染层标签数组
 * @returns {Promise<null>}
 */
export async function initGlobalTags() {
    try {
        globalTagsList.value = await getGlobalTags();
        if (Array.isArray(globalTagsList.value) && globalTagsList.value.length === 0) return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * @function addGlobalTags 添加全局标签
 * @param inputContent
 * @returns {Promise<null>}
 */
export async function addGlobalTags(inputContent) {
    try {
        const tag = inputContent?.trim();
        if (tag.length === 0 || tag === 'undefined') {
            ElMessage(ElMessageConfig.buildConfig("warning", "标签不能为空", true, 1500))
            return null;
        }
        else if (globalTagsList.value.find(item => item === tag.trim())){
            ElMessage(ElMessageConfig.buildConfig("warning", `标签“${tag.trim()}”已存在`, true, 1500))
            return null;
        }
        else if (tag.length > 0 && tag.length <= 10){
            await window.electronAPI.addGlobalTag(tag.trim());
            globalTagsList.value.push(tag);
            ElMessage(ElMessageConfig.buildConfig("success", `标签“${tag.trim()}”添加成功`, true, 1000))
        }
    } catch (error){
        globalTagsList.value.pop();
        ElMessage(ElMessageConfig.buildConfig("error", `标签“${inputContent.trim()}”添加失败`, true, 1000))
        console.log(error);
    }
}

/**
 * @param tag 需要删除的标签
 * @returns {Promise<void>}
 */
export async function removeGlobalTag(tag) {
    try {
        const index = globalTagsList.value.indexOf(tag);
        if (index !== -1) {
            await window.electronAPI.deleteGlobalTags(tag);
            globalTagsList.value.splice(index, 1);
            ElMessage(ElMessageConfig.buildConfig("success", "删除成功", true, 1000))
        }
    } catch (error) {
        console.log(error);
    }
}


