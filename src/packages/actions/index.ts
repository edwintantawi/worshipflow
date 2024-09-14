export const ACTION_EVENT = 'ACTION';

export type Action =
  | {
      type: 'SET_TEXT';
      payload: {
        content: string;
      };
    }
  | {
      type: 'SET_BACKGROUND';
      payload: {
        media: string;
      };
    }
  | {
      type: 'CLEAR';
      payload?: undefined;
    }
  | {
      type: 'BLACKOUT';
      payload?: undefined;
    }
  | {
      type: 'LIVE';
      payload?: undefined;
    };

export type ActionType = Action['type'];
export type ExtractPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
