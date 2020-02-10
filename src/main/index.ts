import { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage, remote } from 'electron';
import { resolve } from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow: BrowserWindow | null;
let tray: Tray;

const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/index.html'
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 780,
    width: 1200,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadURL(winURL);
  mainWindow.setMinimumSize(1000, 636);

  ipcMain.on('min', () => {
    mainWindow!.minimize();
  });

  ipcMain.on('max', () => {
    mainWindow!.maximize();
  });

  ipcMain.on('close', () => {
    mainWindow!.close();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event: any) => {
    mainWindow!.hide();
    // 不在任务栏显示
    mainWindow!.setSkipTaskbar(true);
    event.preventDefault();
  });

  const iconPath = resolve(__dirname, '../../static/icons/tray.png');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: () => {
        mainWindow!.show();
      }
    },
    {
      label: '退出',
      click: () => {
        mainWindow!.destroy();
      }
    }
  ]);
  tray.setToolTip('邪王真眼最强');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow!.isVisible() ? mainWindow!.hide() : mainWindow!.show();
    mainWindow!.isVisible() ? mainWindow!.setSkipTaskbar(false) : mainWindow!.setSkipTaskbar(true);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  tray.destroy();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater';

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates();
});
