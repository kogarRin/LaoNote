import { app, BrowserWindow, ipcMain} from 'electron';
import {fileURLToPath} from 'url';
import {mkdir} from 'fs/promises';
import path from 'path';
import jsonDbToolClass, {getDataDir} from "../data/dbHandle.js";

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonToolInMain = new jsonDbToolClass();
const dbFile = getDataDir();          // 第一次算路径
mkdir(path.dirname(dbFile), { recursive: true }).catch(() => {});


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