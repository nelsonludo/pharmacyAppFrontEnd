import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import axios from '../axios/instance';

const Home = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(
      `/${user.title}/logout`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      }
    );
    localStorage.removeItem('info');
    dispatch({ type: 'UNSET_USER' });
    navigate('/login');
  };

  return (
    <Wrapper>
      <h1>Home page</h1>
      {user && user.email ? <h2>{user.email}</h2> : <h2>Not logged in</h2>}
      {user && user.email && <button onClick={logout}>Logout</button>}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section``;
