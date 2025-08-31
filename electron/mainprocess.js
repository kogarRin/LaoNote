import { app, BrowserWindow, ipcMain, dialog} from 'electron';
import {fileURLToPath} from 'url';
import path from 'path';
import Store from 'electron-store';
import JsLiteRest from 'js-lite-rest';

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileDefault = new Store();
const fileInput = new Store();
const dbstore = await JsLiteRest.create('./data/db.json');

function createWindow() {
    win = new BrowserWindow({
        minWidth: 1000,
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
    return  fileDefault.get(key, def);
});


ipcMain.handle('select-default', async (_) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties:['openFile']
    });
    if (canceled || !filePaths)
        return null;
    const userSelect = filePaths[0];
    fileDefault.set('saveDefault',userSelect);
    return userSelect;
});

ipcMain.handle('mini-window', async () => {
    await win.minimize();
});

ipcMain.handle('toggle-screen', async () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.handle('close-window', async () => {
    await win.close();
});

ipcMain.handle('get-input', async (_, key, def) =>{
    return fileInput.get(key, def);
});

ipcMain.handle('set-input', async (_, userInput) => {
    console.log(userInput);
    if (userInput) {
        fileInput.set('keyInput', userInput);
        return userInput;
    }
});

ipcMain.handle('get-notes', async () => {
    return await dbstore.get('notes');
});

ipcMain.handle('add-note', async (_, note) => {
    dbstore.post('notes', {...note, createAt: new Date().toISOString()});
})