import path from 'path';
import {Low} from "lowdb";
import {app} from "electron";
import {JSONFile} from "lowdb/node";
import {fileURLToPath} from "url";
import lodash from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getDataDir = () => {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev ? path.join(__dirname, 'db.json') : path.join(app.getPath('userData'),'data','db.json')
};

export default class jsonDbToolClass {
    #fileBasePath;
    #jsonDb

    constructor() {
        this.#fileBasePath = getDataDir();
        const adapter = new JSONFile(this.#fileBasePath);
        this.#jsonDb = new Low(adapter, {notes: [], tags: []});
    }

    #setIdPrototype = () => {
        const tail = Math.random().toString(36).slice(-3); // 取后 3 位
        return Date.now().toString(36) + tail;
    }

    async loadJsonDb(){ //唯一传指定数据类型的函数 Object[]
        try {
            await this.#jsonDb.read();
            return this.#jsonDb.data.notes
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    //增
    async addNoteJson(){ //直接添加逻辑
        const emptyNoteType = ()=> ({
            "title": "无标题",
            "content": "",
            "createAt": new Date(),
            "id": this.#setIdPrototype(),
            "tags": ['test tag1', 'test tag2'],
        })
        try {
            this.#jsonDb.read();
            this.#jsonDb.data.notes.push(emptyNoteType());
            this.#jsonDb.write();
            return null;
        } catch (err){
            return null;
        }
    }

    //删
    async deleteNoteJson(idArray){
        this.#jsonDb.read();
        if (Array.isArray(idArray) || idArray.length !== 0) {
            lodash.remove(this.#jsonDb.data.notes, item => idArray.includes(item.id));
            this.#jsonDb.write();
        }
        return null;
    }
    deleteTagsInNotes(noteId, tag){
        this.#jsonDb.read();
        const noteIndexForUpdate = this.#jsonDb.data.notes.findIndex((item) => item.id === noteId)
        try {
                this.#jsonDb.update(({notes})=>{
                if (!notes[noteIndexForUpdate] || !Array.isArray(notes[noteIndexForUpdate].tags)){
                    return null;
                }
                lodash.pull(notes[noteIndexForUpdate].tags, tag);
            })
        } catch (error) {
            console.error(error);
        }
    }

    //改
    async updateNoteJson(newNote){
        this.#jsonDb.read();
        const noteIndexForUpdate = this.#jsonDb.data.notes.findIndex((item) => item.id === newNote.id)
        try {
            if (noteIndexForUpdate === -1) {
                return null;
            } else {
                this.#jsonDb.update(({notes})=>{
                    notes[noteIndexForUpdate] = newNote;
                })
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async updateTags(noteId, tag){
        this.#jsonDb.read();
        const noteIndexForUpdate = this.#jsonDb.data.notes.findIndex((item) => item.id === noteId)
        try {
            if (noteIndexForUpdate === -1) {
                return null;
            }
            this.#jsonDb.update(({notes})=>{
                const target = notes[noteIndexForUpdate];
                if (!target){
                    return null;
                }
                if (!Array.isArray(target.tags)) {
                    target.tags = [];
                }
                target.tags.push(tag);
            })
        } catch (error) {
            console.error(error);
        }
    }
}

