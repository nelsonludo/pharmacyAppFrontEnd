import React, { useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useGlobalContext } from '../contexts/GlobalContext';
import { SET_USER, START_LOADING, STOP_LOADING } from '../utils/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('customer');

  const navigate = useNavigate();
  const { dispatch, setLoading, axios } = useAuthContext();
  const { dispatch: dispatchGlobalContext } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !title) {
      alert('please enter both email, password and title');
    }

    try {
      dispatchGlobalContext({ type: START_LOADING });
      const { data } = await axios.post(`/${title}/login`, {
        email,
        password,
      });

      localStorage.setItem('info', JSON.stringify(data.title));
      dispatch({ type: SET_USER, payload: data });
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      dispatchGlobalContext({ type: STOP_LOADING });
    }
  };

  return (
    <Wrapper>
      <div className='mainContainer'>
        <div className='signupHead'>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='secondContainer'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='secondContainer'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='secondContainer'>
            <label>Title</label>
            <select
              className='i'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value={'customer'}>Customer</option>
              <option value={'cachier'}>Cachier</option>
              <option value={'pharmacyAdmin'}>Pharmacy Admin</option>
              <option value={'systemAdmin'}>System Admin</option>
            </select>
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;

const navyBlue = '#3c6579';
const specialorange = '#ff9100';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 10% 0 0 0;

  .mainContainer {
    width: 45%;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-self: center;
    box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
  }

  .signupHead {
    background-color: ${navyBlue};
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 30px 30px 0 0;
  }

  form {
    padding: 5%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${navyBlue};
    border-radius: 0 0 30px 30px;
  }

  input,
  select {
    border: 1px solid ${navyBlue};
    padding: 5px;
    width: 90%;
    border-radius: 5px;
    margin: 5px;
    color: ${navyBlue};
  }

  .i {
    width: 93%;
  }

  input:focus,
  select:focus {
    outline: none;
  }

  button {
    width: 75%;
    background-color: ${specialorange};
    color: white;
    border-radius: 5px;
    margin: 10px 4% 10px 0px;
    border: none;
    padding: 5px;
  }

  label {
    margin-left: 5px;
  }
  .secondContainer {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
`;
