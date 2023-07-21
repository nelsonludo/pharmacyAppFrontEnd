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
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [loggedin, setLoggedin] = useState(false);
  const [category, setCategory] = useState([]);

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
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      setLatitude(lat);
      setLongitude(long);
    });
  }, []);

  useEffect(() => {
    axios
      .get('/category')
      .then((response) => setCategory(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        searchValue,
        setSearchValue,
        latitude,
        longitude,
        setLoggedin,
        loggedin,
        category,
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
