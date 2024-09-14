import { ipcRenderer } from 'electron';
import { ACTION_EVENT, ActionType, ExtractPayload } from '~/actions';

export const actionAPI = {
  on: <T extends ActionType>(type: T, callback: (payload: ExtractPayload<T>) => void) => {
    ipcRenderer.on(ACTION_EVENT, (_, action) => {
      if (action.type === type) callback(action.payload);
    });
  },
};
