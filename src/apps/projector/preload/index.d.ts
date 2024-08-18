import { ElectronAPI } from '@electron-toolkit/preload';
import { actionAPI } from '@projector/preload/action';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    action: typeof actionAPI;
  }
}
