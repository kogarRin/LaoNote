const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    miniWinSize: ()=> ipcRenderer.invoke('mini-window'),
    toggleScreen: () => ipcRenderer.invoke('toggle-screen'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    getNotes: () => ipcRenderer.invoke('get-notes'), //获取记录唯一接口，返回Object[]
    addNotes: () => ipcRenderer.invoke('add-note'),
    updateTags: (noteId,tags) => ipcRenderer.invoke('update-tags', noteId, tags),
    deleteNote: (getIdArray) => ipcRenderer.invoke('delete-note', getIdArray),
    deleteTags: (noteId,tag) => ipcRenderer.invoke('delete-tags', noteId,tag),
    updateNote: (newNote) => ipcRenderer.invoke('update-note',newNote),
    outputTxt: (title, content) => ipcRenderer.invoke('save-txt-file',title,content),
    setTheme: (theme, value) => ipcRenderer.invoke('set-theme',theme,value),
    getTheme: (theme) => ipcRenderer.invoke('get-theme',theme),
    setFont: (font) => ipcRenderer.invoke('set-font',font),
    getFont: () => ipcRenderer.invoke('get-font'),
    loadGlobalTags: () => ipcRenderer.invoke('load-global-tags'),
    addGlobalTag: (tag) => ipcRenderer.invoke('add-global-tags',tag),
    deleteGlobalTags: (tag) => ipcRenderer.invoke('delete-global-tags',tag),
    deleteAllGlobalTags: (allGlobalTags) => ipcRenderer.invoke('delete-all-global-tags',allGlobalTags),
});

console.log('preload.js loaded');
