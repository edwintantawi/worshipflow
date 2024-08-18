import { ipcRenderer } from 'electron';
import { Action, ACTION_EVENT } from '~/actions';

export const actionAPI = {
  send: (action: Action): void => {
    ipcRenderer.send(ACTION_EVENT, action);
  },
};
