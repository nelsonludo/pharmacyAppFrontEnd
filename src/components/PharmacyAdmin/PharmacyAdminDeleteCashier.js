import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from '../../axios/instance';

const PharmacyAdminDeleteCashier = ({
  deleteCashier,
  setDeleteCashier,
  getAllCashiers,
}) => {
  const { user, setLoading } = useAuthContext();

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/pharmacyAdmin/deleteCachier/${deleteCashier.cashier.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      getAllCashiers();
      setDeleteCashier({ show: false, cashier: {} });
      alert('Cashier has been deleted');
    } catch (error) {
      console.log(error);
      alert('An error has occured');
    } finally {
      setLoading(false);
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
