import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminDeletePharmacy = ({
  deletePharmacy,
  setDeletePharmacy,
  getAllPharmacies,
}) => {
  const { dispatch, axiosPrivate } = useAuthContext();

  const handleDeletePharmacy = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.delete(
        `/systemAdmin/deletePharmacy/${deletePharmacy.pharmacy.id}`
      );
      getAllPharmacies();
      setDeletePharmacy({ show: false, pharmacy: {} });
      alert('Pharmacy has been deleted');
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
          Are you sure you want to delete the pharmacy "
          {deletePharmacy.pharmacy.name}" ?
        </h1>
        <div className='list-buttons'>
          <button
            onClick={() => setDeletePharmacy({ show: false, pharmacy: {} })}
          >
            Close
          </button>
          <button type='submit' onClick={handleDeletePharmacy}>
            Submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SystemAdminDeletePharmacy;

const Wrapper = styled.section``;
