import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from '../../axios/instance';

const SystemAdminDeleteDrug = ({ deleteDrug, setDeleteDrug, getAllDrugs }) => {
  const { user, setLoading } = useAuthContext();

  const handleDeleteDrug = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/systemAdmin/deleteProduct/${deleteDrug.drug.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      getAllDrugs();
      setDeleteDrug({ show: false, drug: {} });
      alert('Drug has been deleted');
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
          Are you sure you want to delete the drug "{deleteDrug.drug.name}" ?
        </h1>
        <div className='list-buttons'>
          <button onClick={() => setDeleteDrug({ show: false, drug: {} })}>
            Close
          </button>
          <button type='submit' onClick={handleDeleteDrug}>
            Submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SystemAdminDeleteDrug;

const Wrapper = styled.section``;
