import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 900,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.webContents.openDevTools();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:5173`);
    } else {
        win.loadFile(path.join(__dirname, '../index.html'));
    }

}

app.whenReady().then(() => {
    createWindow();
    console.log(path.join(__dirname, '../index.html'));
    console.log(process.env.NODE_ENV);
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});