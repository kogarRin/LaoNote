const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    miniWinSize: ()=> ipcRenderer.invoke('mini-window'),
    toggleScreen: () => ipcRenderer.invoke('toggle-screen'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    getNotes: () => ipcRenderer.invoke('get-notes'), //获取记录唯一接口，返回Object[]
    addNotes: () => ipcRenderer.invoke('add-note'),
    deleteNote: (getIdArray) => ipcRenderer.invoke('delete-note', getIdArray),
    updateNote: (newNote) => ipcRenderer.invoke('update-note',newNote),
});
console.log('preload.js loaded');