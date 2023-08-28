import { combineReducers } from '@reduxjs/toolkit';
import appReducer, { AppReducerState } from './appReducer';
import listReducer, { ListReducerState } from './listReducer';

export interface ReduxState {
  appReducer: AppReducerState;
  listReducer: ListReducerState,
}

export const reducer = combineReducers({
  appReducer,
  listReducer,
});
