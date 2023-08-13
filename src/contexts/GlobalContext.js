import React, { createContext, useReducer, useContext } from 'react';
import reducer from '../reducers/globalReducer';

const initialState = {};

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { useGlobalContext, GlobalProvider };
