import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const PharmacyAdminCreateProduct = ({ setCreateProduct, getAllProducts }) => {
  const [drugList, setDrugList] = useState([]);
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getDrugsList = async () => {
    try {
      dispatch({ type: START_LOADING });
      console.log('yoo');
      const { data } = await axiosPrivate.get(
        `/pharmacyAdmin/seeDrugList?name=&page=1`
      );
      setDrugList(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!productId || !(price > 0) || !(amount > 0)) {
      alert('Please, enter all fields.');
      return;
    }

    try {
      dispatch({ type: START_LOADING });

      const { data } = await axiosPrivate.post(`/pharmacyAdmin/createProduct`, {
        productId,
        price: parseFloat(price),
        amount: parseInt(amount),
      });
      getAllProducts();
      alert('Drug has been created');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setCreateProduct(false);
      dispatch({ type: STOP_LOADING });
    }
  };

  useEffect(() => {
    getDrugsList();
  }, []);

  useEffect(() => {
    if (productId !== '') {
      setPrice(() => {
        const price = drugList.find((drug) => drug.id === productId);
        return price.normalPrice;
      });
    } else {
      setPrice(0);
    }
  }, [productId]);

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h1>Create a product</h1>
        <form className='modal-form' onSubmit={handleCreateProduct}>
          <div className='field'>
            <label htmlFor='productId'>Product</label>
            <select
              name='productId'
              id='productId'
              onChange={(e) => {
                setProductId(e.target.value);
              }}
            >
              <option value=''>--Select a drug--</option>
              {drugList.map((drug, index) => {
                return (
                  <option key={index} value={drug.id}>
                    {drug.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              name='amount'
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button onClick={() => setCreateProduct(false)}>Close</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default PharmacyAdminCreateProduct;

const Wrapper = styled.section``;
