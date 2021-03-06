'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

const { localStorage } = require('electron-browser-storage');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
async function writeLocalStorage(setting) {
  await localStorage.setItem('AudioSetting', await JSON.stringify(setting));
}

async function readLocalStorage() {
  const LOCAL_DATA = await localStorage.getItem('AudioSetting');
  // 初期値
  let setting = { alwaysOnTop: true, backgroundColor: '#000000' };
  // localStrageのデータがあれば初期値上書き
  if (LOCAL_DATA) {
    setting = JSON.parse(LOCAL_DATA);
  } else {
    // なければ初期値で設定を作成
    await writeLocalStorage(setting);
  }
  return setting;
}

function createWindow(setting) {
  // Create the browser window.
  win = new BrowserWindow({
    width: 310,
    height: 520,
    x: 100,
    y: 100,
    resizable: true,
    alwaysOnTop: setting.alwaysOnTop,
    backgroundColor: setting.backgroundColor,
    autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// update-setting(rendererプロセスから呼び出す)
ipcMain.handle('update-setting', async (event, setting) => {
  await writeLocalStorage(setting);
  win.setBackgroundColor(setting.backgroundColor);
  win.setAlwaysOnTop(setting.alwaysOnTop);
  win.reload();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    const SETTING = await readLocalStorage();
    createWindow(SETTING);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  const SETTING = await readLocalStorage();
  createWindow(SETTING);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
