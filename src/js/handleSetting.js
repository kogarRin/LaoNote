import {ref} from "vue";
import {getNotesData, notesFromDb} from "@/src/js/homeHandle.js";

export const isCopy = ref(false);
export const buildAllJsonStructure = () => {
    const getAllNotesArray = notesFromDb.value;
    return {notes: getAllNotesArray};
}
