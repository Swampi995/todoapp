import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReduxState } from '../reducer';
import { ListReducerAction, ListReducerState, ListItem } from '../reducer/listReducer';
export * from '../reducer/listReducer';

export interface ListState {
    items: ListItem[];
}

export interface ListActions {
    addItem(text: string): void;
    updateItem(id: string, text: string): void;
    removeItem(id: string): void;
}

export interface ListProps extends ListState, ListActions {
}

function addItem(text: string) {
    return async (dispatch: Dispatch<ListReducerAction>, getState: () => ReduxState) => {
        const item: ListItem = {
            id: new Date().getTime().toString(),
            text,
        }

        dispatch({
            type: 'ADD_ITEM',
            item,
        });

        await storeItems(getState().listReducer.items);
    };
}

function updateItem(id: string, text: string) {
    return async (dispatch: Dispatch<ListReducerAction>, getState: () => ReduxState) => {
        dispatch({
            type: 'UPDATE_ITEM',
            id,
            text,
        });

        await storeItems(getState().listReducer.items);
    };
}

function removeItem(id: string) {
    return async (dispatch: Dispatch<ListReducerAction>, getState: () => ReduxState) => {
        dispatch({
            type: 'REMOVE_ITEM',
            id,
        });

        await storeItems(getState().listReducer.items);
    };
}

async function storeItems(items: ListReducerState['items']) {
    const newItems = JSON.stringify(items);
    await AsyncStorage.setItem('todoItems', newItems);
}

const mapStateToProps = (state: ReduxState) => {
    return {
        items: Object.values(state.listReducer.items),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ListReducerAction>) => {
    return {
        addItem(text: string) {
            return dispatch(addItem(text) as any);
        },
        updateItem(id: string, text: string) {
            return dispatch(updateItem(id, text) as any);
        },
        removeItem(id: string) {
            return dispatch(removeItem(id) as any);
        },
    };
};

export const listConnect = connect(mapStateToProps, mapDispatchToProps);
