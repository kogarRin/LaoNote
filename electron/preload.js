const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    miniWinSize: ()=> ipcRenderer.invoke('mini-window'),
    toggleScreen: () => ipcRenderer.invoke('toggle-screen'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    selectDefault: () => ipcRenderer.invoke('select-default'),
    getSavePath: () => ipcRenderer.invoke('get-save-path','saveDefault',''),
    getInput: () => ipcRenderer.invoke('get-input','keyInput',''),
    saveInput: (useInput) => ipcRenderer.invoke('set-input',useInput),
    getNotes: () => ipcRenderer.invoke('get-notes'),
});
console.log('preload.js loaded');
