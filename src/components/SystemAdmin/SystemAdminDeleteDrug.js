import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import useAxios from '../../hooks/useAxios';

const SystemAdminDeleteDrug = ({ deleteDrug, setDeleteDrug, getAllDrugs }) => {
  const { setLoading } = useAuthContext();
  const { axiosPrivate } = useAxios();

  const handleDeleteDrug = async () => {
    try {
      setLoading(true);
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
