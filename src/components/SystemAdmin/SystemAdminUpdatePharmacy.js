import React, { useState } from 'react';
import styled from 'styled-components';

import { useAuthContext } from '../../contexts/AuthContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminUpdatePharmacy = ({
  updatePharmacy,
  setUpdatePharmacy,
  getAllPharmacies,
}) => {
  const [name, setName] = useState(updatePharmacy.pharmacy.name);
  const [email, setEmail] = useState(updatePharmacy.pharmacy.email);
  const [phoneNumber, setPhoneNumber] = useState(
    updatePharmacy.pharmacy.phoneNumber
  );
  const [address, setAddress] = useState(updatePharmacy.pharmacy.address);
  const [hourly, setHourly] = useState(updatePharmacy.pharmacy.hourly);
  const [allNight, setAllNight] = useState(updatePharmacy.pharmacy.allNight);
  const [latitude, setLatitude] = useState(updatePharmacy.pharmacy.latitude);
  const [longitude, setLongitude] = useState(updatePharmacy.pharmacy.longitude);

  const { dispatch, axiosPrivate } = useAuthContext();

  const handleUpdatePharmacy = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !address ||
      !hourly ||
      !latitude ||
      !longitude
    ) {
      alert('Please, enter all the fields');
      return;
    }

    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.put(
        `/systemAdmin/updatePharmacy/${updatePharmacy.pharmacy.id}`,
        {
          name,
          email,
          phoneNumber,
          address,
          hourly,
          allNight,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      );
      getAllPharmacies();
      setUpdatePharmacy({ show: false, pharmacy: {} });
      alert('Pharmacy has been updated');
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
        <h1>Update Pharmacy</h1>
        <form className='modal-form' onSubmit={handleUpdatePharmacy}>
          <div className='field'>
            <label htmlFor='pharmacyName'>Pharmacy Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='email'>Pharmacy Email</label>
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyPhoneNumber'>Pharmacy Phone Number</label>
            <input
              type='text'
              name='phoneNumber'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='pharmacyAddress'>Pharmacy Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='hourly'>Pharmacy Hourly</label>
            <input
              type='text'
              name='hourly'
              id='hourly'
              value={hourly}
              onChange={(e) => setHourly(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='allNight'>Pharmacy All Night</label>
            True{' '}
            <input
              type='radio'
              name='allNight'
              id='allNight'
              value={allNight}
              checked={allNight}
              // onChange={(e) => setallNight(true)}
              onClick={() => setAllNight(true)}
            />{' '}
            False{' '}
            <input
              type='radio'
              name='allNight'
              id='allNight'
              value={allNight}
              checked={!allNight}
              // onChange={(e) => setallNight(true)}
              onClick={() => setAllNight(false)}
            />
          </div>
          <div className='field'>
            <label htmlFor='latitude'>Pharmacy Latitude</label>
            <input
              type='number'
              name='latitude'
              id='latitude'
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='longitude'>Pharmacy Longitude</label>
            <input
              type='number'
              name='longitude'
              id='longitude'
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className='list-buttons'>
            <button
              onClick={() => setUpdatePharmacy({ show: false, pharmacy: {} })}
            >
              Close
            </button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SystemAdminUpdatePharmacy;

const Wrapper = styled.section``;
