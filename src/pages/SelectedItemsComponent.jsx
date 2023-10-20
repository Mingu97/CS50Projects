import React, { createContext, useContext, useReducer } from 'react';

const SelectedItemsContext = createContext();

function selectedItemsReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    default:
      return state;
  }
}

const initialState = [];

export function SelectedItemsProvider({ children }) {
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, initialState);
  
  return (
    <SelectedItemsContext.Provider value={{ selectedItems, dispatch }}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

export function useSelectedItems() {
  return useContext(SelectedItemsContext);
}
