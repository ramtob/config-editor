import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readConfig: () => ipcRenderer.invoke('read-config'),
  saveConfig: (data: any) => ipcRenderer.invoke('save-config', data)
});
