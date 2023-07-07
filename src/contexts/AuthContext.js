import axios from "../axios/instance";
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/authReducer";

const getInfoFromLocalStorage = () => {
  let info = localStorage.getItem("info");
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

  const refreshToken = async (link) => {
    try {
      const { data } = await axios.post(`/${link}/token`);
      dispatch({ type: "SET_USER", payload: data });
      console.log("token refreshed ! mouf");
    } catch (error) {
      dispatch({ type: "UNSET_USER" });
    }
  };

  useEffect(() => {
    refreshToken(state.user.info);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.user.email) {
        refreshToken(state.user.title);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
