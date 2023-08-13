import React, { useState } from 'react';
import styled from 'styled-components';

import { useAuthContext } from '../../contexts/AuthContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminCreatePharmacy = ({ setCreatePharmacy, getAllPharmacies }) => {
  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacyEmail, setPharmacyEmail] = useState('');
  const [pharmacyPhoneNumber, setPharmacyPhoneNumber] = useState('');
  const [pharmacyAddress, setPharmacyAddress] = useState('');
  const [pharmacyHourly, setPharmacyHourly] = useState('');
  const [pharmacyAllNight, setPharmacyAllNight] = useState(true);
  const [pharmacyLatitude, setPharmacyLatitude] = useState(0.0);
  const [pharmacyLongitude, setPharmacyLongitude] = useState(0.0);
  const [pharmacyAdminName, setPharmacyAdminName] = useState('');
  const [pharmacyAdminEmail, setPharmacyAdminEmail] = useState('');
  const [pharmacyAdminPassword, setPharmacyAdminPassword] = useState('');

  const { dispatch, axiosPrivate } = useAuthContext();

  const handleCreatePharmacy = async (e) => {
    e.preventDefault();

    if (
      !pharmacyName ||
      !pharmacyEmail ||
      !pharmacyPhoneNumber ||
      !pharmacyAddress ||
      !pharmacyHourly ||
      !pharmacyLatitude ||
      !pharmacyLongitude ||
      !pharmacyAdminName ||
      !pharmacyAdminEmail ||
      !pharmacyAdminPassword
    ) {
      alert('Please enter all fields');
      return;
    }

    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.post(`/systemAdmin/createPharmacy`, {
        pharmacyName,
        pharmacyEmail,
        pharmacyPhoneNumber,
        pharmacyAddress,
        pharmacyHourly,
        pharmacyAdminName,
        pharmacyAdminEmail,
        pharmacyAdminPassword,
        pharmacyAllNight,
        pharmacyLatitude: parseFloat(pharmacyLatitude),
        pharmacyLongitude: parseFloat(pharmacyLongitude),
      });
      getAllPharmacies();
      setCreatePharmacy(false);
      alert('Pharmacy has been created');
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
        <h1>Create a pharmacy</h1>
        <form className='modal-form' onSubmit={handleCreatePharmacy}>
          <div className='field'>
            <label htmlFor='pharmacyName'>Pharmacy Name</label>
            <input
              type='text'
              name='pharmacyName'
              id='pharmacyName'
              value={pharmacyName}
              onChange={(e) => setPharmacyName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyEmail'>Pharmacy Email</label>
            <input
              type='text'
              name='pharmacyEmail'
              id='pharmacyEmail'
              value={pharmacyEmail}
              onChange={(e) => setPharmacyEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyPhoneNumber'>Pharmacy Phone Number</label>
            <input
              type='text'
              name='pharmacyPhoneNumber'
              id='pharmacyPhoneNumber'
              value={pharmacyPhoneNumber}
              onChange={(e) => setPharmacyPhoneNumber(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAddress'>Pharmacy Address</label>
            <input
              type='text'
              name='pharmacyAddress'
              id='pharmacyAddress'
              value={pharmacyAddress}
              onChange={(e) => setPharmacyAddress(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyHourly'>Pharmacy Hourly</label>
            <input
              type='text'
              name='pharmacyHourly'
              id='pharmacyHourly'
              value={pharmacyHourly}
              onChange={(e) => setPharmacyHourly(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAllNight'>Pharmacy All Night</label>
            True{' '}
            <input
              type='radio'
              name='pharmacyAllNight'
              id='pharmacyAllNight'
              value={true}
              checked={pharmacyAllNight}
              // onChange={(e) => setPharmacyAllNight(true)}
              onClick={() => setPharmacyAllNight(true)}
            />{' '}
            False{' '}
            <input
              type='radio'
              name='pharmacyAllNight'
              id='pharmacyAllNight'
              value={false}
              // onChange={(e) => setPharmacyAllNight(true)}
              onClick={() => setPharmacyAllNight(false)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyLatitude'>Pharmacy Latitude</label>
            <input
              type='number'
              name='pharmacyLatitude'
              id='pharmacyLatitude'
              value={pharmacyLatitude}
              onChange={(e) => setPharmacyLatitude(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyLongitude'>Pharmacy Longitude</label>
            <input
              type='number'
              name='pharmacyLongitude'
              id='pharmacyLongitude'
              value={pharmacyLongitude}
              onChange={(e) => setPharmacyLongitude(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAdminName'>Pharmacy Admin Name</label>
            <input
              type='text'
              name='pharmacyAdminName'
              id='pharmacyAdminName'
              value={pharmacyAdminName}
              onChange={(e) => setPharmacyAdminName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAdminEmail'>Pharmacy Admin Email</label>
            <input
              type='text'
              name='pharmacyAdminEmail'
              id='pharmacyAdminEmail'
              value={pharmacyAdminEmail}
              onChange={(e) => setPharmacyAdminEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAdminPassword'>
              Pharmacy Admin Password
            </label>
            <input
              type='text'
              name='pharmacyAdminPassword'
              id='pharmacyAdminPassword'
              value={pharmacyAdminPassword}
              onChange={(e) => setPharmacyAdminPassword(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button onClick={() => setCreatePharmacy(false)}>Close</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SystemAdminCreatePharmacy;

const Wrapper = styled.section``;

// PHARMACIE DE MVOG-ATANGANA MBALLA, Yaoundé
// Latitude: 3.849344
// Longitude: 11.519930
