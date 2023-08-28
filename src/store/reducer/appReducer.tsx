export type AppReducerAction = {
  type: 'SET_AUTH';
  authenticated: boolean;
};

export interface AppReducerState {
  authenticated: boolean;
}

const initialState = (): AppReducerState => {
  return {
    authenticated: false,
  }
};

const appReducer = (state: AppReducerState = initialState(), action: AppReducerAction) => {
  switch (action.type) {
    case 'SET_AUTH': {
      state = {
        ...state,
        authenticated: action.authenticated,
      };
      return state;
    }
    default:
      return state;
  }
};

export default appReducer;
