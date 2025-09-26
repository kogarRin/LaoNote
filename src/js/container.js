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