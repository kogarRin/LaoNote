import path from 'path';
import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";
import {fileURLToPath} from "url";
import lodash from "lodash";
import {app} from "electron";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDataDir = () => {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev ? path.join(__dirname, 'db.json') : path.join(app.getPath('userData'),'data','db.json')
};

export class globalTagsDbTool{
    #globalTagsFilePath
    #globalTagsDb


    constructor() {
        this.#globalTagsFilePath = getDataDir();
        const adapter = new JSONFile(this.#globalTagsFilePath);
        this.#globalTagsDb = new Low(adapter, {notes: [] ,globalTags: []});
    }

    // 获取
    async loadGlobalTags(){
        try {
            await this.#globalTagsDb.read();
            return this.#globalTagsDb.data.globalTags // globalTags: string[]
        } catch (error) {
            console.error(error);
            return [];
        }
    }

     //增加globalTags
     async addGlobalTags(globalTags){
        try {
            await this.#globalTagsDb.read();
            this.#globalTagsDb.data.globalTags.push(globalTags);
            this.#globalTagsDb.write();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    //删除globalTags
    async deleteGlobalTags(toDeleteGlobalTag){
        try {
            await this.#globalTagsDb.read();
            const index = lodash.findIndex(this.#globalTagsDb.data.globalTags, (tag) => tag === toDeleteGlobalTag);
            this.#globalTagsDb.update(({globalTags}) => {
                if (index > -1 && Array.isArray(globalTags) && globalTags[index]) {
                    lodash.pull(globalTags, toDeleteGlobalTag);
                    return null;
                }
                return null;
            })
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}


