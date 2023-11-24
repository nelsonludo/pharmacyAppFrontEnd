import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Pagination } from '@mui/material';

import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import SystemAdminCreatePharmacy from './SystemAdminCreatePharmacy';
import SystemAdminDeletePharmacy from './SystemAdminDeletePharmacy';
import SystemAdminUpdatePharmacy from './SystemAdminUpdatePharmacy';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [createPharmacy, setCreatePharmacy] = useState(false);
  const [deletePharmacy, setDeletePharmacy] = useState({
    show: false,
    pharmacy: {},
  });
  const [updatePharmacy, setUpdatePharmacy] = useState({
    show: false,
    pharmacy: {},
  });

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getAllPharmacies = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.get(
        `/systemAdmin/allPharmacies?name=${name}&page=${page}`
      );
      setPharmacies(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getAllPharmacies();
  }, [name, page]);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h1>All pharmacies</h1>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a pharmacy'
        />
        <button onClick={() => setCreatePharmacy(true)}>Add a pharmacy</button>
      </header>
      {pharmacies.length === 0 ? (
        <h1>No pharmacies available</h1>
      ) : (
        <table className='dashboard-table'>
          <thead>
            <tr>
              {' '}
              <th>Name</th>
              <th>Email</th>
              <th>Hourly</th>
              <th>Phone Number</th>
              <th>All Night</th>
              <th>Creator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => {
              return (
                <tr key={pharmacy.id}>
                  <td>{pharmacy.name}</td>
                  <td>{pharmacy.email}</td>
                  <td>{pharmacy.hourly}</td>
                  <td>{pharmacy.phoneNumber}</td>
                  <td>{pharmacy.allNight ? 'True' : 'False'}</td>
                  <td>{pharmacy.systemAdminCreator.name}</td>
                  <td>
                    <button
                      onClick={() =>
                        setUpdatePharmacy({ show: true, pharmacy })
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setDeletePharmacy({ show: true, pharmacy })
                      }
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
      {/* {pharmacies.length > 0 && (
        <div className='pagination'>
          <Pagination
            count={11}
            defaultPage={page}
            siblingCount={0}
            onChange={handleChange}
          />
        </div>
      )} */}
      {createPharmacy && (
        <SystemAdminCreatePharmacy
          setCreatePharmacy={setCreatePharmacy}
          getAllPharmacies={getAllPharmacies}
        />
      )}
      {deletePharmacy.show && (
        <SystemAdminDeletePharmacy
          deletePharmacy={deletePharmacy}
          setDeletePharmacy={setDeletePharmacy}
          getAllPharmacies={getAllPharmacies}
        />
      )}
      {updatePharmacy.show && (
        <SystemAdminUpdatePharmacy
          updatePharmacy={updatePharmacy}
          setUpdatePharmacy={setUpdatePharmacy}
          getAllPharmacies={getAllPharmacies}
        />
      )}
    </Wrapper>
  );
};

export default SystemAdminPharmacies;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
