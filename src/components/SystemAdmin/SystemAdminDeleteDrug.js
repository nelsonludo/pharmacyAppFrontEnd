import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminDeleteDrug = ({ deleteDrug, setDeleteDrug, getAllDrugs }) => {
  const { dispatch, axiosPrivate } = useAuthContext();

  const handleDeleteDrug = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.delete(
        `/systemAdmin/deleteProduct/${deleteDrug.drug.id}`
      );
      getAllDrugs();
      setDeleteDrug({ show: false, drug: {} });
      alert('Drug has been deleted');
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
