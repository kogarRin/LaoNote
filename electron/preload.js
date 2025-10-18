const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    miniWinSize: ()=> ipcRenderer.invoke('mini-window'),
    toggleScreen: () => ipcRenderer.invoke('toggle-screen'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    getNotes: () => ipcRenderer.invoke('get-notes'), //获取记录唯一接口，返回Object[]
    addNotes: () => ipcRenderer.invoke('add-note'),
    deleteNote: (getIdArray) => ipcRenderer.invoke('delete-note', getIdArray),
    updateNote: (newNote) => ipcRenderer.invoke('update-note',newNote),
    outputTxt: (title, content) => ipcRenderer.invoke('save-txt-file',title,content),
    setTheme: (theme, value) => ipcRenderer.invoke('set-theme',theme,value),
    getTheme: (theme) => ipcRenderer.invoke('get-theme',theme),
});
console.log('preload.js loaded');