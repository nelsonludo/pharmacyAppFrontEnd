import React, { useState } from 'react';
import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import { useAuthContext } from '../../contexts/AuthContext';

const SystemAdminCreateDrug = ({ setCreateDrug, getAllDrugs }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [normalPrice, setNormalPrice] = useState(0);

  const { setLoading, category } = useAuthContext();
  const { axiosPrivate } = useAxios();

  const handleCreateDrug = async (e) => {
    e.preventDefault();

    if (!name || !description || !categoryId || !normalPrice) {
      alert('Please, enter all fields');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosPrivate.post(`/systemAdmin/createProduct`, {
        name,
        description,
        category: categoryId,
        normalPrice: parseFloat(normalPrice),
      });
      getAllDrugs();
      setCreateDrug(false);
      alert('Drug has been created');
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
        <h1>Create a drug</h1>
        <form className='modal-form' onSubmit={handleCreateDrug}>
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
              {category.map((item, index) => {
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
            <button onClick={() => setCreateDrug(false)}>Close</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SystemAdminCreateDrug;

const Wrapper = styled.section``;
