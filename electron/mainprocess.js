import { app, BrowserWindow, ipcMain, dialog} from 'electron';
import {writeFile} from 'fs/promises';
import {fileURLToPath} from 'url';
import {join} from 'path';
import path from 'path';

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 900,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    });

    win.webContents.openDevTools();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:5173`);
    } else {
        win.loadFile(join(__dirname, '../index.html'));
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

ipcMain.handle('saveTxt', async (_, text, filePath) => {
    if (!filePath){
        const { canceled, filePath: picked } = await dialog.showSaveDialog({
            filters:[{name: 'json', extensions:['json']}],
        });
        if (canceled || !picked){
            return null;
        }
        filePath = picked;
    }
    await writeFile(filePath, text, 'utf8');
    filePath = null;
})

ipcMain.handle('mini-window', async () => {
    win.minimize();
})

ipcMain.handle('toggle-screen',  () => {
    win.isFullScreen() ? win.setFullScreen(false) : win.setFullScreen(true);
})

ipcMain.handle('close-window', async () => {
    win.close();
})
