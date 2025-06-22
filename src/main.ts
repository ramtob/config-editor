import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const configPath = path.join(__dirname, 'config.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

//   win.loadURL('http://localhost:4200');
  win.loadFile(path.join(__dirname, 'ui/index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('load-config', async () => {
  const data = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(data);
});

ipcMain.handle('save-config', async (_, newConfig) => {
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
});
