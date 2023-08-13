import React, { createContext, useReducer, useContext, useEffect } from 'react';
import reducer from '../reducers/globalReducer';
import { CALCULATE_CART_TOTAL, SET_CATEGORIES } from '../utils/actions';
import { useAuthContext } from '../contexts/AuthContext';

const initialState = {
  cart: [],
  cartTotalAmount: 0,
  cartTotalPrice: 0,

  loading: false,
  categories: [],
};

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { axios } = useAuthContext();

  const fetchCategories = async () => {
    const categories = await axios.get('/category');
    dispatch({ type: SET_CATEGORIES, payload: categories.data });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    dispatch({ type: CALCULATE_CART_TOTAL });
  }, [state.cart]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { useGlobalContext, GlobalProvider };
