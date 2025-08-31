import {defineStore} from "pinia";
import {ref} from "vue";

export function getTodayDate() {
    const objDate = new Date();
    let mm = objDate.getMinutes() < 10 ? "0"+objDate.getMinutes() : objDate.getMinutes();
    const todayDate = `${(objDate.getMonth() + 1)}月${objDate.getDate()}日 | ${ objDate.getHours()}:${mm}`;
    const isMorning = objDate.getHours() <= 12 ? '上午' : '下午' ;
    return{
        todayDate,
        isMorning
    }
}

export const useInput = defineStore('input', () => {
    const inputValue = ref('');

    //重启时获取fileInput store
    async function getInputValue(){
        inputValue.value = await window.electronAPI.getInput();
        console.log('加载检查:', inputValue.value);
    }

    //重新设置
    async function setInputValue(useInput){
        const res = await window.electronAPI.saveInput(useInput);
        if(res){
            inputValue.value = res;
            console.log('保存检查:', inputValue.value);
        }
        else {
            console.log('保存检查', 'null')
        }
    }

    return{
        inputValue,
        getInputValue,
        setInputValue
    }
})