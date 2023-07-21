import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../axios/instance';
import { useAuthContext } from '../contexts/AuthContext';

const SystemAdminPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    getAllPharmacies();
  }, [name, page]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h1>All pharmacies</h1>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a pharmacy'
        />
        <button>Add a pharmacy</button>
      </header>
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
                <td>{pharmacy.allNight}</td>
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
    </Wrapper>
  );
};

export default SystemAdminPharmacies;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
