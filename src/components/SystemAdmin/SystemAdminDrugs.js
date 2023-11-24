import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Pagination } from '@mui/material';

import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import SystemAdminCreateDrug from './SystemAdminCreateDrug';
import SystemAdminDeleteDrug from './SystemAdminDeleteDrug';
import SystemAdminUpdateDrug from './SystemAdminUpdateDrug';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [createDrug, setCreateDrug] = useState(false);
  const [deleteDrug, setDeleteDrug] = useState({
    show: false,
    drug: {},
  });
  const [updateDrug, setUpdateDrug] = useState({
    show: false,
    drug: {},
  });

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getAllDrugs = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.get(
        `/systemAdmin/seeProducts?name=&page=1`
      );
      setDrugs(data);
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
    getAllDrugs();
  }, []);

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h1>All Drugs</h1>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a drug'
        />
        <button onClick={() => setCreateDrug(true)}>Add a drug</button>
      </header>
      {drugs.length === 0 ? (
        <h1>No drugs available</h1>
      ) : (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Normal Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug) => {
              return (
                <tr key={drug.id}>
                  <td>{drug.id}</td>
                  <td>{drug.name}</td>
                  <td>{drug.description}</td>
                  <td>{drug.productCategory.name}</td>
                  <td>{drug.normalPrice}</td>
                  <td>
                    <button onClick={() => setUpdateDrug({ show: true, drug })}>
                      Edit
                    </button>
                    <button onClick={() => setDeleteDrug({ show: true, drug })}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {createDrug && (
        <SystemAdminCreateDrug
          setCreateDrug={setCreateDrug}
          getAllDrugs={getAllDrugs}
        />
      )}
      {deleteDrug.show && (
        <SystemAdminDeleteDrug
          deleteDrug={deleteDrug}
          setDeleteDrug={setDeleteDrug}
          getAllDrugs={getAllDrugs}
        />
      )}
      {updateDrug.show && (
        <SystemAdminUpdateDrug
          updateDrug={updateDrug}
          setUpdateDrug={setUpdateDrug}
          getAllDrugs={getAllDrugs}
        />
      )}
    </Wrapper>
  );
};

export default SystemAdminDrugs;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
