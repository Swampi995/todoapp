export interface ListItem {
  id: string;
  text: string;
}

export type ListReducerAction = {
  type: 'ADD_ITEM';
  item: ListItem;
} | {
  type: 'UPDATE_ITEM';
  id: string;
  text: string;
} | {
  type: 'REMOVE_ITEM';
  id: string;
};

export interface ListReducerState {
  items: {
    [key: string]: ListItem,
  };
}

const initialState = (): ListReducerState => {
  return {
    items: {},
  }
};

const appReducer = (state: ListReducerState = initialState(), action: ListReducerAction) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItems = { ...state.items, [action.item.id]: action.item };

      state = {
        ...state,
        items: newItems,
      };

      return state;
    }
    case 'UPDATE_ITEM': {
      const newItems = { ...state.items };
      newItems[action.id].text = action.text;

      state = {
        ...state,
        items: newItems,
      };

      return state;
    }
    case 'REMOVE_ITEM': {
      const newItems = { ...state.items };
      delete newItems[action.id];

      state = {
        ...state,
        items: newItems,
      };

      return state;
    }
    default:
      return state;
  }
};

export default appReducer;
