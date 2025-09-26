const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    miniWinSize: ()=> ipcRenderer.invoke('mini-window'),
    toggleScreen: () => ipcRenderer.invoke('toggle-screen'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    selectDefault: () => ipcRenderer.invoke('select-default'),
    getSavePath: () => ipcRenderer.invoke('get-save-path','saveDefault',''),
    getNotes: () => ipcRenderer.invoke('get-notes'), //获取记录唯一接口，返回Object[]
    addNotes: () => ipcRenderer.invoke('add-note'),
    deleteNote: (idArray) => ipcRenderer.invoke('delete-note', idArray),
});
console.log('preload.js loaded');