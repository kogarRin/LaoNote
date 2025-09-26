import path from 'path';
import {Low} from "lowdb";
import {doomString} from "../doNotOpen.js";
import {JSONFile} from "lowdb/node";
import {fileURLToPath} from "url";
import {ElMessage} from "element-plus";
import {randomBytes} from "node:crypto"
import {listener} from "../src/js/homeHandle.js";
import {ElMessageConfig} from "../src/setTypes/messageType.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DATA_DIR_PATH = path.join(__dirname, 'db.json');

export default class jsonDbToolClass {
    #fileBasePath;
    #jsonDb

    constructor() {
        this.#fileBasePath = DATA_DIR_PATH;
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

    addNoteJson(){
        const emptyNoteType = ()=> ({
            "title": "无标题",
            "content": "",
            "createAt": new Date().toISOString(),
            "id": this.#setIdPrototype(),
        })
        try {
            this.#jsonDb.read()
            this.#jsonDb.data.notes.push(emptyNoteType());
            this.#jsonDb.write();
        } catch (err){
            return null;
        }
    }
}

let test = new jsonDbToolClass(DATA_DIR_PATH);
console.log(doomString.b);
