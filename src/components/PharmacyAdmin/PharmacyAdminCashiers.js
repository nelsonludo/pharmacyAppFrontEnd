import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Pagination } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import PharmacyAdminCreateCashier from './PharmacyAdminCreateCashier';
import PharmacyAdminDeleteCashier from './PharmacyAdminDeleteCashier';
import { START_LOADING, STOP_LOADING } from '../../utils/actions';

const PharmacyAdminCashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [createCashier, setCreateCashier] = useState(false);
  const [deleteCashier, setDeleteCashier] = useState({
    show: false,
    cashier: {},
  });

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getAllCashiers = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.get(`/pharmacyAdmin/seeAllCachiers`);
      setCashiers(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  useEffect(() => {
    getAllCashiers();
  }, [name, page]);

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h1>All Cashiers</h1>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a csshier'
        />
        <button onClick={() => setCreateCashier(true)}>Add a Cashier</button>
      </header>
      {cashiers.length === 0 ? (
        <h1>No cashier available</h1>
      ) : (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Pharmacy Admin Creator Name</th>
              <th>Pharmacy Admin Creator Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cashiers.map((cashier) => {
              return (
                <tr key={cashier.id}>
                  <td>{cashier.id}</td>
                  <td>{cashier.name}</td>
                  <td>{cashier.email}</td>
                  <td>{cashier.pharmacyAdminCreator.name}</td>
                  <td>{cashier.pharmacyAdminCreator.email}</td>
                  <td>
                    <button
                      onClick={() => setDeleteCashier({ show: true, cashier })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {createCashier && (
        <PharmacyAdminCreateCashier
          setCreateCashier={setCreateCashier}
          getAllCashiers={getAllCashiers}
        />
      )}
      {deleteCashier.show && (
        <PharmacyAdminDeleteCashier
          deleteCashier={deleteCashier}
          setDeleteCashier={setDeleteCashier}
          getAllCashiers={getAllCashiers}
        />
      )}
    </Wrapper>
  );
};

export default PharmacyAdminCashiers;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
