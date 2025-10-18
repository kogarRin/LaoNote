import { app, BrowserWindow, ipcMain ,dialog} from 'electron';
import {fileURLToPath} from 'url';
import {mkdir} from 'fs/promises';
import Store from 'electron-store';
import path from 'path';
import jsonDbToolClass, {getDataDir} from "../data/dbHandle.js";
import * as fs from "node:fs";

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonToolInMain = new jsonDbToolClass();
const dbFile = getDataDir();          // 第一次算路径
mkdir(path.dirname(dbFile), { recursive: true }).catch(() => {});
const store = new Store()


function createWindow() {
    win = new BrowserWindow({
        minWidth: 1000,
        minHeight: 750,
        icon: path.join(__dirname, '../src/assets/icon.ico'),
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });


    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
        win.loadURL('http://localhost:5173');
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


ipcMain.handle('mini-window',  () => {
    win.minimize();
});

ipcMain.handle('toggle-screen',  () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.handle('close-window',  () => {
    win.close();
});

ipcMain.handle('get-notes', () => {
    return jsonToolInMain.loadJsonDb();
});

ipcMain.handle('add-note', async () => {
    await jsonToolInMain.addNoteJson();
})

ipcMain.handle('delete-note',  async (_,toDeleteIdArray)=>{
    await jsonToolInMain.deleteNoteJson(toDeleteIdArray);
})

ipcMain.handle('update-note',  async (_,newNote)=>{
    await jsonToolInMain.updateNoteJson(newNote);
})

ipcMain.handle('save-txt-file', async (_,title,content) => {
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
        title: '保存文件',
        defaultPath: `${title}`,
        filters: [
            { name: '文本文档', extensions: ['txt'] },
            { name: '所有文件', extensions: ['*'] }
        ]
    });

    if (canceled || !filePath) {
        return null;
    }
    try {
        await fs.promises.writeFile(filePath, content, 'utf8');
        return filePath;
    }
    catch (error){
        console.error(error);
    }
})

ipcMain.handle('set-theme', async (_, theme, value) =>{
    store.set(theme, value);
    console.log(store.get(theme));
})

ipcMain.handle('get-theme', async (_, theme) => {
    return store.get(theme);
})
