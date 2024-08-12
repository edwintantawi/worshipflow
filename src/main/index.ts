import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { createConsoleWindow, createProjectorWindow } from '@main/window';
import { getExternalDisplay } from '@main/utilities';

// Keep single instance of projector window
let projectorWindow: BrowserWindow | undefined;

function createWindow(): void {
  const externalDisplay = getExternalDisplay();

  // Create the main console window
  createConsoleWindow();

  // Create the projector window if an external display
  if (externalDisplay && !projectorWindow) {
    projectorWindow = createProjectorWindow({ display: externalDisplay });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.worshipflow');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  screen.on('display-added', (_, display) => {
    if (!projectorWindow) {
      projectorWindow = createProjectorWindow({ display });
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
