import path from 'path';
import {Low} from "lowdb";
import {app} from "electron";
import {JSONFile} from "lowdb/node";
import {fileURLToPath} from "url";
import {randomBytes} from "node:crypto"
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
        this.#jsonDb = new Low(adapter, {notes: []});
    }

    #setIdPrototype = () => {
        const timeStringRandom = Date.now().toString();
        const randomString = randomBytes(8).toString('base64url');
        return timeStringRandom + randomString;
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

    async addNoteJson(){ //直接添加逻辑
        const emptyNoteType = ()=> ({
            "title": "无标题",
            "content": "",
            "createAt": new Date(),
            "id": this.#setIdPrototype(),
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

    async deleteNoteJson(idArray){
        this.#jsonDb.read();
        if (Array.isArray(idArray) || idArray.length !== 0) {
            lodash.remove(this.#jsonDb.data.notes, item => idArray.includes(item.id));
            this.#jsonDb.write();
        }
        return null;
    }

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
}

