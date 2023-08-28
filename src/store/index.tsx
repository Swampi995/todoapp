import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer } from './reducer';

// create the store and add the thunk middleware so we can add async actions
export const reduxStore = configureStore({ reducer, middleware: [thunk] });