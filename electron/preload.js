const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('eleAPI', {

});
console.log('preload.js loaded');