import {nextTick} from "vue";
import {isEditorModal} from "@/src/js/home/homeHandle.js";

export function  playShowAni() {
    if (!isEditorModal.value){
        nextTick(() => {
            const rows = document.querySelectorAll('.contentsList')
            rows.forEach((row, i) => {
                row.classList.remove('show')          // 先清掉
                setTimeout(() => row.classList.add('show'), i * 80) // 微延迟再加
            })
        }).then(() => {})
    }
}
