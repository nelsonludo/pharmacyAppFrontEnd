import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const PharmacyAdminCreateCashier = ({ setCreateCashier, getAllCashiers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleCreateCashier = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please, enter all fields.');
      return;
    }

    try {
      dispatch({ type: START_LOADING });
      await axiosPrivate.post(`/pharmacyAdmin/createCachier`, {
        name,
        email,
        password,
      });
      getAllCashiers();
      alert('Cashier has been created');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setCreateCashier(false);
      dispatch({ type: STOP_LOADING });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h1>Create a Cashier</h1>
        <form className='modal-form' onSubmit={handleCreateCashier}>
          <div className='field'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input
              type='text'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button onClick={() => setCreateCashier(false)}>Close</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default PharmacyAdminCreateCashier;

const Wrapper = styled.section``;
