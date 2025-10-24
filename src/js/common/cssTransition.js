import {nextTick} from "vue";

export function playShowAni() {
    nextTick(() => {
        const rows = document.querySelectorAll('.contentsList')
        rows.forEach((row, i) => {
            row.classList.remove('show')          // 先清掉
            setTimeout(() => row.classList.add('show'), i * 80) // 微延迟再加
        })
    })
}