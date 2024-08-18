import { ElectronAPI } from '@electron-toolkit/preload';
import { actionAPI } from '@console/preload/action';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    action: typeof actionAPI;
  }
}
