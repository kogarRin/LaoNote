import {ref} from "vue";
import {notesFromDb} from "@/src/js/home/homeHandle.js";

export const isCopy = ref(false);
export const buildAllJsonStructure = () => {
    const getAllNotesArray = notesFromDb.value;
    return {notes: getAllNotesArray};
}