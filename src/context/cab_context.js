import React, { createContext, useReducer, useContext } from 'react';

const CabContext = createContext();

const initialState = {
  bookedCabs: [],
};

function cabReducer(state, action) {
  switch (action.type) {
    case 'BOOK_CAB':
      return { ...state, bookedCabs: [...state.bookedCabs, action.payload] };
    case 'CANCEL_CAB':
      return {
        ...state,
        bookedCabs: state.bookedCabs.filter((cab) => cab !== action.payload),
      };
    default:
      return state;
  }
}

export function CabProvider({ children }) {
  const [state, dispatch] = useReducer(cabReducer, initialState);

  return (
    <CabContext.Provider value={{ state, dispatch }}>
      {children}
    </CabContext.Provider>
  );
}

export function useCabContext() {
  return useContext(CabContext);
}
