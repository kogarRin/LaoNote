import { app, BrowserWindow, ipcMain, dialog} from 'electron';
import {fileURLToPath} from 'url';
import path from 'path';
import Store from 'electron-store';
import jsonDbToolClass, {DATA_DIR_PATH} from "../data/dbHandle.js";

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const eleStore = new Store();
const jsonToolInMain = new jsonDbToolClass(DATA_DIR_PATH);

function createWindow() {
    win = new BrowserWindow({
        minWidth: 1200,
        minHeight: 900,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.webContents.openDevTools();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:5173`);
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

ipcMain.handle('get-save-path', async (_,key,def) => {
    return await eleStore.get(key, def);
});


ipcMain.handle('select-default', async () => {
    const selectedRes = dialog.showOpenDialogSync(win, {
        title: '选择文件',
        properties: ['openFile']
    });
    if (!selectedRes) {
        return null;
    }
    const [setFilePath] = selectedRes;
    eleStore.set('saveDefault', setFilePath);

    return setFilePath;
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