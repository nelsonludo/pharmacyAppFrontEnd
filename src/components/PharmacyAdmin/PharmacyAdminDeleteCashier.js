import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const PharmacyAdminDeleteCashier = ({
  deleteCashier,
  setDeleteCashier,
  getAllCashiers,
}) => {
  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleDeleteProduct = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.delete(
        `/pharmacyAdmin/deleteCachier/${deleteCashier.cashier.id}`
      );
      getAllCashiers();
      setDeleteCashier({ show: false, cashier: {} });
      alert('Cashier has been deleted');
    } catch (error) {
      console.log(error);
      alert('An error has occured');
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h1>
          Are you sure you want to delete the cashier "
          {deleteCashier.cashier.name}" ?
        </h1>
        <div className='list-buttons'>
          <button
            onClick={() => setDeleteCashier({ show: false, cashier: {} })}
          >
            Close
          </button>
          <button type='submit' onClick={handleDeleteProduct}>
            Submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PharmacyAdminDeleteCashier;

const Wrapper = styled.section``;
