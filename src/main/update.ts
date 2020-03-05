import { autoUpdater } from 'electron-updater';
import { ipcMain, BrowserWindow } from 'electron';
import { join } from 'path';
import log from 'electron-log';

const sendMsg = (win: BrowserWindow | null, txt: any) => {
  win!.webContents.send('update-msg', txt);
};

export function handleUpdate(window: BrowserWindow | null, updateUrl: string) {
  autoUpdater.setFeedURL(updateUrl);
  autoUpdater.autoDownload = false;

  if (process.env.NODE_ENV === 'development') {
    autoUpdater.updateConfigPath = join(__dirname, '../../dev-app-update.yml');
  }

  autoUpdater.on('error', err => {
    sendMsg(window, {
      event: 'error',
      message: err
    });
  });

  autoUpdater.on('checking-for-update', message => {
    sendMsg(window, {
      event: 'checking-for-update',
      message
    });
  });

  autoUpdater.on('update-available', message => {
    sendMsg(window, {
      event: 'update-available',
      message
    });
  });

  autoUpdater.on('update-not-available', message => {
    sendMsg(window, {
      event: 'update-not-available',
      message
    });
  });

  autoUpdater.on('download-progress', progress => {
    sendMsg(window, {
      event: 'download-progress',
      message: progress
    });
  });

  autoUpdater.on('update-downloaded', (e, note, name, date, url) => {
    sendMsg(window, {
      event: 'update-downloaded',
      message: {
        note,
        name,
        date,
        url
      }
    });
    autoUpdater.quitAndInstall();
  });

  autoUpdater.logger = log;

  ipcMain.on('check-update', () => {
    autoUpdater.checkForUpdates();
  });

  ipcMain.on('confirm-download', () => {
    autoUpdater.downloadUpdate();
  });
}
