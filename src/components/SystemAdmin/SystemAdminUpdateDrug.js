import React, { useState } from 'react';
import styled from 'styled-components';

import { useAuthContext } from '../../contexts/AuthContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const SystemAdminUpdateDrug = ({ updateDrug, setUpdateDrug, getAllDrugs }) => {
  const [name, setName] = useState(updateDrug.drug.name);
  const [description, setDescription] = useState(updateDrug.drug.description);
  const [categoryId, setCategoryId] = useState(updateDrug.drug.category);
  const [normalPrice, setNormalPrice] = useState(updateDrug.drug.normalPrice);

  const { dispatch, category, axiosPrivate } = useAuthContext();

  const handleUpdateDrug = async (e) => {
    e.preventDefault();

    if (!name || !description || !categoryId || !normalPrice) {
      alert('Please, enter all fields');
      return;
    }

    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.put(
        `/systemAdmin/updateProduct/${updateDrug.drug.id}`,
        {
          name,
          description,
          category: categoryId,
          normalPrice: parseFloat(normalPrice),
        }
      );
      getAllDrugs();
      setUpdateDrug({ show: false, drug: {} });
      alert('Drug has been updated');
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
        <h1>Update Drug</h1>
        <form className='modal-form' onSubmit={handleUpdateDrug}>
          <div className='field'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols={20}
              rows={5}
            ></textarea>
          </div>
          <div className='field'>
            <label htmlFor='category'>Category</label>
            <select
              name='categoryId'
              id='categoryId'
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={categoryId}>
                {updateDrug.drug.productCategory.name}
              </option>
              {category
                .filter((item) => item.id !== categoryId)
                .map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='normalPrice'>Normal Price</label>
            <input
              type='number'
              name='normalPrice'
              id='normalPrice'
              value={normalPrice}
              onChange={(e) => setNormalPrice(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button onClick={() => setUpdateDrug({ show: false, drug: {} })}>
              Close
            </button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SystemAdminUpdateDrug;

const Wrapper = styled.section``;
