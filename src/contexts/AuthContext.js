import React, { useContext, useReducer, useEffect, useState } from 'react';
import reducer from '../reducers/authReducer';
import axiosInitial from 'axios';
import { SET_USER, UNSET_USER } from '../utils/actions';

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

  const axios = axiosInitial.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
  });

  const axiosPrivate = axiosInitial.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${state.user.accessToken}`,
    },
  });

  const refreshToken = async (link) => {
    try {
      const { data } = await axios.post(`/${link}/token`);
      dispatch({ type: SET_USER, payload: data });
      console.log('token refreshed ! mouf');
    } catch (error) {
      dispatch({ type: UNSET_USER });
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        axios,
        axiosPrivate,
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
