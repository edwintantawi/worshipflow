import { BrowserWindow, shell } from 'electron';
import icon from '@resources/icon.png?asset';
import path from 'path';
import { is } from '@electron-toolkit/utils';

const ELECTRON_RENDERER_URL = process.env['ELECTRON_RENDERER_URL'];

const ROOT_PATH = path.join(__dirname, '../');
const RENDERER_PATH = path.join(ROOT_PATH, '/renderer');
const PRELOAD_PATH = path.join(ROOT_PATH, '/preload');

export function createConsoleWindow(): BrowserWindow {
  const window = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(PRELOAD_PATH, '/console.js'),
      sandbox: false,
    },
  });

  window.on('ready-to-show', () => {
    window.show();
  });

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && ELECTRON_RENDERER_URL) {
    window.loadURL(`${ELECTRON_RENDERER_URL}/console/renderer/index.html`);
  } else {
    window.loadFile(path.join(RENDERER_PATH, '/console/renderer/index.html'));
  }

  return window;
}

export function createProjectorWindow({ display }: { display: Electron.Display }): BrowserWindow {
  const window = new BrowserWindow({
    frame: false,
    fullscreen: true,
    alwaysOnTop: true,
    focusable: false,
    x: display.bounds.x + 50,
    y: display.bounds.y + 50,
    webPreferences: {
      preload: path.join(PRELOAD_PATH, '/projector.js'),
      sandbox: false,
    },
  });
  window.maximize();

  if (is.dev && ELECTRON_RENDERER_URL) {
    window.loadURL(`${ELECTRON_RENDERER_URL}/projector/renderer/index.html`);
  } else {
    window.loadFile(path.join(RENDERER_PATH, '/projector/renderer/index.html'));
  }

  return window;
}
