import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from '../../axios/instance';

const SystemAdminDeletePharmacy = ({
  deletePharmacy,
  setDeletePharmacy,
  getAllPharmacies,
}) => {
  const { user, setLoading } = useAuthContext();

  const handleDeletePharmacy = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/systemAdmin/deletePharmacy/${deletePharmacy.pharmacy.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      getAllPharmacies();
      setDeletePharmacy({ show: false, pharmacy: {} });
      alert('Pharmacy has been deleted');
    } catch (error) {
      console.log(error);
      alert('An error has occured');
    } finally {
      setLoading(false);
    }
  };

  console.log(deletePharmacy);
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
