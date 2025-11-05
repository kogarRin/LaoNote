import {ref, toRaw} from "vue";
import {notesFromDb, updateNote} from "@/src/js/home/homeHandle.js";
import {onBeforeRouteLeave} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {ElMessageConfig} from "@/src/js/config/messageType.js";
import {searchResult} from "@/src/js/common/use/tool.js";

export function useEditNote(route){
    //edit对象用于接收数据，作为渲染初始值
    let editNoteObj =  JSON.parse(JSON.stringify(
        toRaw(notesFromDb.value.find(item => item.id === route.params.id)) || {}
    ));

    const contentRef = ref(editNoteObj.content);
    const titleRef = ref(editNoteObj.title);
    const tagsRef = ref(editNoteObj.tags);
    const inputVisible = ref(false);
    const inputValue = ref('');
    let getNewNote = {};

    //获取更新的笔记
    function setUpdateNote(){
        const payload =  toRaw({
            title: titleRef.value,
            content: contentRef.value,
            createAt: editNoteObj.createAt,
            id: editNoteObj.id,
            tags: editNoteObj.tags
        })
        return JSON.parse(JSON.stringify(payload))
    }

    //点击保存
    async function saveClick(){
        const payload = setUpdateNote();
        await updateNote(payload);
        getNewNote = JSON.parse(JSON.stringify(payload));
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
            searchResult.value = [...notesFromDb.value];
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
        onBeforeRouteLeave((to, from, next) => {
            const currentNote = setUpdateNote();
            if (
                currentNote.content === editNoteObj.content && currentNote.title === editNoteObj.title
            ) {
                return next();
            }
            const isSaved = () =>
                currentNote.content === getNewNote.content && currentNote.title === getNewNote.title;
            if (isSaved()) {
                return next();
            }
            ElMessageBox.confirm('当前内容未保存，是否保存？', '提示', {
                confirmButtonText: '保存',
                cancelButtonText: '取消',
                showClose: false,
                callback: async (action) => {
                    if (action === 'confirm') {
                        await saveClick();
                    }
                    next();
                }
            }).then(() => {});
        });
    }

    return{
        contentRef,
        titleRef,
        tagsRef,
        inputVisible,
        inputValue,
        editNoteObj,
        updateTags,
        cancelSetTag,
        saveClick,
        setRouteGuard,
        deleteEditTags
    }
}
