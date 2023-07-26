import axios from '../axios/instance';
import React, { useContext, useReducer, useEffect, useState } from 'react';
import reducer from '../reducers/authReducer';

const getInfoFromLocalStorage = () => {
  let info = localStorage.getItem('info');
  if (info) {
    return JSON.parse(info);
  } else {
    return {};
  }
};

const initialState = {
  user: {
    info: getInfoFromLocalStorage(),
  },
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchValue, setSearchValue] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const calculateCartTotal = () => {
    const cartAmount = cart.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);

    const cartTotalPrice = cart.reduce((total, item) => {
      total += item.price * item.productamount;
      return total;
    }, 0);

    setCartTotalAmount(cartAmount);
    setCartTotalPrice(cartTotalPrice);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const refreshToken = async (link) => {
    try {
      const { data } = await axios.post(`/${link}/token`);
      dispatch({ type: 'SET_USER', payload: data });
      console.log('token refreshed ! mouf');
    } catch (error) {
      dispatch({ type: 'UNSET_USER' });
    }
  };

  useEffect(() => {
    refreshToken(state.user.info);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.user && state.user.email) {
        refreshToken(state.user.title);
      }
    }, 780000);

    return () => clearInterval(interval);
  }, [state.user]);

  useEffect(() => {
    axios
      .get('/category')
      .then((response) => setCategory(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        searchValue,
        setSearchValue,
        setLoggedin,
        loggedin,
        category,
        loading,
        setLoading,
        cart,
        cartTotalAmount,
        cartTotalPrice,
        addToCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
