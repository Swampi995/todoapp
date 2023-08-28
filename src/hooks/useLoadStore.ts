import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, ListReducerAction } from '../store/reducer/listReducer';

export default function useLoadStore() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch<Dispatch<ListReducerAction>>();

  useEffect(() => {
    // this method should get the stored items from the async storage, when the user gets to todo list screen
    async function loadStoreAsync() {
      const storedItems = await AsyncStorage.getItem('todoItems');

      if (storedItems) {
        for (const item of Object.values(JSON.parse(storedItems))) {
          dispatch({ type: 'ADD_ITEM', item: item as ListItem });
        }
      }

      setLoadingComplete(true);
    }

    loadStoreAsync();
  }, []);

  return isLoadingComplete;
}
