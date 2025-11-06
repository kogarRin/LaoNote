import {computed, ref, watch} from "vue";
import {buildAllJsonStructure} from "@/src/js/common/copyStyle.js";
import {ElMessage} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";
import {setBriefContent, showCreateInfo} from "@/src/js/common/tool.js";
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {defineStore} from "pinia";

export const instructionView = ref(false);
export const editView = ref(false);
export  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(buildAllJsonStructure()));
    ElMessage(ElMessageConfig.buildConfig('success', '复制成功',true, 2000));
}

export function handleNoteTable(){
    //复制内容
    const baseData = notesFromDb.value.map(item => ({
        ...item,
        createAt: showCreateInfo(item),
        content:  setBriefContent(item, 20)
    }))

    function getAndCopyContent(index){
        let toCopyObject = notesFromDb.value[index];
        try {
            if(toCopyObject){
                const content = toCopyObject.content;
                navigator.clipboard.writeText(content).then(() => {return null});
                ElMessage(ElMessageConfig.buildConfig("success",`复制成功`,false,1000))
            }
        } catch (error) {
            console.log(error);
        }
    }


//导出txt
    async function outputContentTxt(title, content) {
        try {
            return  await window.electronAPI.outputTxt(title, content);
        } catch (error) {
            console.log(error);
        }
    }

    async function getOutputContent(index){
        let outputObject = filterData.value[index];
        try {
            if(outputObject) {
                const isSaved = await outputContentTxt(outputObject.title, outputObject.content);
                if (!isSaved) {
                    ElMessage(ElMessageConfig.buildConfig("warning", `已取消`, false, 1000))
                }
                else {
                    ElMessage(ElMessageConfig.buildConfig("success", `导出至${isSaved}`, false, 1000))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
//搜索
    const searchTitle = ref("");
    const filterData = computed(() => baseData.filter(
        (item) => !searchTitle.value || item.title.toLowerCase().includes(searchTitle.value.toString().toLowerCase())
    ))
    return {
        baseData,
        getAndCopyContent,
        getOutputContent,
        searchTitle,
        filterData
    }
}

//设置store
export const settingStore = defineStore('setting', () => {
    //深色模式
    const isDark = ref(false)
    async function initTheme() {
        isDark.value = await window.electronAPI.getTheme('isDark');
    }
    async function toggleTheme(val) {
        isDark.value = val
        await window.electronAPI.setTheme('isDark', isDark.value);
    }
    watch(isDark, () => {
        if (isDark.value) {
            document.getElementById('base').classList.add('dark');
        } else {
            document.getElementById('base').classList.remove('dark');
        }
    })

    //字体
    const PRE_FONTS = [
        { name: '宋体', en: 'SimSun', family: 'SimSun, serif' },
        { name: '黑体', en: 'SimHei', family: 'SimHei, sans-serif' },
        { name: '微软雅黑（默认）', en: 'Microsoft Yahei', family: '"Microsoft Yahei", sans-serif' },
        { name: '微软正黑体', en: 'Microsoft JhengHei', family: '"Microsoft JhengHei", sans-serif' },
        { name: '楷体', en: 'KaiTi', family: 'KaiTi, serif' },
        { name: '新宋体', en: 'NSimSun', family: 'NSimSun, serif' },
        { name: '仿宋', en: 'FangSong', family: 'FangSong, serif' }
    ];//family: css字体名

    const fontsList = ref(PRE_FONTS);
    const activeEn = ref('Microsoft Yahei');
    function applyFont(enName) {
        const item = fontsList.value.find(f => f.en === enName);
        try {
            if (item) {
                document.documentElement.style.setProperty('--font-family', item.family);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function initFonts() {
        let font = await window.electronAPI.getFont();
        try {
            if (font) {
                activeEn.value = font;
                applyFont(activeEn.value);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function selectFont(enName) {
        activeEn.value = enName;
        applyFont(activeEn.value);
        await window.electronAPI.setFont(activeEn.value);
        let index = fontsList.value.findIndex(f => f.en === enName);
        try {
            if (index !== -1) {
                ElMessage(ElMessageConfig.buildConfig("success", `已切换至${fontsList.value[index].name}`, false, 1000))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return{
        isDark,
        initTheme,
        toggleTheme,
        fontsList,
        activeEn,
        initFonts,
        selectFont
    }
});
