import { ElectronAPI } from '@electron-toolkit/preload';
import { api } from '@projector/preload/api';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}
