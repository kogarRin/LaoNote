import {ref} from "vue";
import {buildAllJsonStructure} from "@/src/js/handleSetting.js";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/setTypes/messageType.js";

export const instructionView = ref(false);
export const editView = ref(false);
export  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(buildAllJsonStructure()));
    ElMessage(ElMessageConfig.buildConfig('success', '复制成功',true, 2000));
}

