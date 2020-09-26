const { ipcRenderer } = require('electron');

async function updateWindowSetting(setting) {
  await ipcRenderer.invoke('update-setting', setting);
}

export { updateWindowSetting };
