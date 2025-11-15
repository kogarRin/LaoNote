import {ref} from "vue";
import {notesFromDb} from "@/src/js/home/homeHandle.js";
import {onBeforeRouteLeave} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";

export function useEditNote(route){
    //ori对象用于接收数据，作为渲染初始值

    const oriNoteObj = notesFromDb.value.find(item => item.id === route.params.id);
    const contentRef = ref(oriNoteObj.content);
    const titleRef = ref(oriNoteObj.title);
    const tagsRef = ref(oriNoteObj.tags);
    const inputVisible = ref(false);
    const inputValue = ref('');


    //点击保存
    async function saveClick(){
        const payload = JSON.parse(JSON.stringify(
            {
                id: oriNoteObj.id,
                title: titleRef.value,
                content: contentRef.value,
                tags: tagsRef.value,
                createAt: oriNoteObj.createAt
            }
        ));
        notesFromDb.value.splice(
            notesFromDb.value.findIndex(
                item => item.id === payload.id
            ), 1, payload);
        try {
            console.log(payload);
            await window.electronAPI.updateNote(payload);

            ElMessage(ElMessageConfig.buildConfig('success', '已保存', false, 1000));
        } catch (error) {
            console.log(error);
        }
    }

    //更新标签
    async function updateTags(noteId, tag){
        try {
            if (tagsRef.value.includes(tag)){
                ElMessage(ElMessageConfig.buildConfig('warning', '标签已存在', false, 1000));
                return null;
            }
            if (tag.trim().length === 0){
                ElMessage(ElMessageConfig.buildConfig('warning', '标签不能为空', false, 1000));
                return null;
            }
            await window.electronAPI.updateTags(noteId, tag);
            tagsRef.value.push(tag);
            inputValue.value = '';
            inputVisible.value = !inputVisible.value;
            const index = notesFromDb.value.findIndex(item => item.id === noteId);
            notesFromDb.value[index].tags = tagsRef.value;
            ElMessage(ElMessageConfig.buildConfig('success', '标签已保存', false, 1000));
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    //取消添加标签
    function cancelSetTag(){
        try {
            if (inputVisible.value) {
                inputValue.value = '';
                inputVisible.value = !inputVisible.value;
                ElMessage(ElMessageConfig.buildConfig('warning', '已取消', true, 1000));
                return null;
            }
            inputVisible.value = !inputVisible.value;
        } catch (error) {
            console.log(error);
        }
    }

    //删除标签
    function deleteEditTags(noteId, tag){
        window.electronAPI.deleteTags(noteId, tag)
        tagsRef.value.splice(tagsRef.value.indexOf(tag),1);
        ElMessage(ElMessageConfig.buildConfig('success', '已删除', false, 1000))
    }

    //路由守卫
    function setRouteGuard(){
        onBeforeRouteLeave(async (to, from, next) => {
            const current = { title: titleRef.value, content: contentRef.value };
            const afterSaved = notesFromDb.value.find(item => item.id === route.params.id);
            if (current.title === afterSaved.title && current.content === afterSaved.content) {
                return next();
            }
             await ElMessageBox.confirm('当前内容未保存，是否保存？', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '取消',
                    showClose: false,
                    callback: async (action) => {
                        if (action === 'confirm') await saveClick();
                        next();
                    }
             });
        });
    }

    async function selectedTags(noteId, tag){
        try {
            if (tagsRef.value.includes(tag)){
                ElMessage(ElMessageConfig.buildConfig('warning', '标签已存在', false, 1000));
                return null;
            }
            await window.electronAPI.updateTags(noteId, tag);
            tagsRef.value.push(tag);
            const index = notesFromDb.value.findIndex(item => item.id === noteId);
            notesFromDb.value[index].tags = tagsRef.value;
            ElMessage(ElMessageConfig.buildConfig('success', '标签已添加', false, 1000));
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    return{
        contentRef,
        titleRef,
        tagsRef,
        inputVisible,
        inputValue,
        updateTags,
        cancelSetTag,
        saveClick,
        setRouteGuard,
        deleteEditTags,
        selectedTags
    }
}
