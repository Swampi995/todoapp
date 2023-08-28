import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { ReduxState } from '../reducer';
import { AppReducerAction } from '../reducer/appReducer';

export interface AppState {
  authenticated: boolean;
}

export interface AppActions {
  setAuthenticated(authenticated: boolean): void;
}

export interface AppProps extends AppState, AppActions {
}

const mapStateToProps = (state: ReduxState) => {
  return {
    authenticated: state.appReducer.authenticated,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppReducerAction>) => {
  return {
    setAuthenticated(authenticated: boolean) {
      return dispatch({
        type: 'SET_AUTH',
        authenticated,
      });
    },
  };
};

export const appConnect = connect(mapStateToProps, mapDispatchToProps);
