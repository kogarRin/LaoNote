import {ref} from "vue";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";

const sanitize = (str) => (String(str ?? '').trim());

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
        if (!Array.isArray(globalTagsList.value) && globalTagsList.value.length === 0) return [];
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * @function addGlobalTags 添加全局标签
 * @param inputContent
 * @returns {Promise<null>}
 */
export async function addGlobalTags(inputContent) {
    if (!Array.isArray(globalTagsList.value)) {
        globalTagsList.value = [];
    }
    const tag = sanitize(inputContent);
    try {
        if (tag.length === 0 || tag === 'undefined') {
            ElMessage(ElMessageConfig.buildConfig("warning", "标签不能为空", true, 1500))
            return null;
        }
        if (globalTagsList.value.find(item => item === tag.trim())){
            ElMessage(ElMessageConfig.buildConfig("warning", `标签“${tag.trim()}”已存在`, true, 1500))
            return null;
        }
        if (tag.length > 0 && tag.length <= 10){
            await window.electronAPI.addGlobalTag(tag.trim());
            setTimeout(async ()=>{
                globalTagsList.value = await getGlobalTags();
            },300);
            ElMessage(ElMessageConfig.buildConfig("success", `标签“${tag.trim()}”添加成功`, true, 1000))
        }
    } catch (error){
        ElMessage(ElMessageConfig.buildConfig("error", `标签“${tag.trim()}”添加失败`, true, 1000))
        console.log(error);
    }
}

/**
 * @param tag 需要删除的标签
 * @returns {Promise<void>}
 */
export async function removeGlobalTag(tag) {
    const tagString = sanitize(tag);
    try {
        const index = globalTagsList.value.indexOf(tagString);
        if (index === -1) {
            ElMessage(ElMessageConfig.buildConfig('warning', `标签“${tagString}”不存在`, true, 1500));
            return null;
        }
        await window.electronAPI.deleteGlobalTags(tagString);
        globalTagsList.value.splice(index, 1);
        ElMessage(ElMessageConfig.buildConfig("success", "删除成功", true, 1000));
    } catch (error) {
        console.log(error);
    }
}

export async function removeAllGlobalTags(allTagsList) {
    if (allTagsList.length === 0) {
        ElMessage(ElMessageConfig.buildConfig("warning", "无标签", true, 1500))
    }
    const getAllTags = [...allTagsList];
    try {
        await window.electronAPI.deleteAllGlobalTags(getAllTags);
        globalTagsList.value = [];
        ElMessage(ElMessageConfig.buildConfig("success", "删除成功", true, 1000));
    } catch (error) {
        globalTagsList.value = getAllTags;
        ElMessage(ElMessageConfig.buildConfig("error", "删除失败", true, 1000));
        console.log(error);
    }
}


