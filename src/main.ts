import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

console.log('Electron main process starting...');

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

    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Load failed:', errorDescription);
    });

    const isDev = process.argv.includes('--dev');
    if (isDev) {
        win.loadURL('http://localhost:4200');
    } else {
        win.loadFile(path.join(__dirname, 'ui/index.html'));
    }
    //   win.loadFile(path.join(__dirname, 'ui/index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('read-config', async () => {
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
});

ipcMain.handle('save-config', async (_, newConfig) => {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
});
