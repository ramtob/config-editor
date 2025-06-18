import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  loadConfig: () => ipcRenderer.invoke('load-config'),
  saveConfig: (data: any) => ipcRenderer.invoke('save-config', data)
});
// This preload script uses Electron's contextBridge to safely expose
// the IPC methods to the renderer process. The `loadConfig` method
// retrieves the configuration data, while the `saveConfig` method
// allows the renderer process to save new configuration data.