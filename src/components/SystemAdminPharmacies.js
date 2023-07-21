import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Pagination } from '@mui/material';
import axios from '../axios/instance';
import { useAuthContext } from '../contexts/AuthContext';
import SystemAdminCreatePharmacy from './SystemAdminCreatePharmacy';

const SystemAdminPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [createPharmacy, setCreatePharmacy] = useState(false);

  const { user, setLoading } = useAuthContext();

  const getAllPharmacies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/systemAdmin/allPharmacies?name=${name}&page=${page}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      setPharmacies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <th>Name</th>
            <th>Email</th>
            <th>Hourly</th>
            <th>Phone Number</th>
            <th>All Night</th>
            <th>Creator</th>
            <th>Actions</th>
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
                    <button>Edit</button>
                    <button>Delete</button>
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
    </Wrapper>
  );
};

export default SystemAdminPharmacies;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
