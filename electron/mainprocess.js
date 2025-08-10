import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win = null;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.webContents.openDevTools();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:5173`);
    } else {
        win.loadFile(path.join(__dirname, '../index.html'));
    }

    ipcMain.on('minimize-window', () => {
        win.minimize();
    });
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