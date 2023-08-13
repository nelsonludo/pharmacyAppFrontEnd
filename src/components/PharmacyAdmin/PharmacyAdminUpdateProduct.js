import React, { useState } from 'react';
import styled from 'styled-components';

import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const PharmacyAdminUpdateProduct = ({
  updateProduct,
  setUpdateProduct,
  getAllProducts,
}) => {
  const [price, setPrice] = useState(updateProduct.product.price);
  const [amount, setAmount] = useState(updateProduct.product.amount);

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!(price > 0) || !(amount > 0)) {
      alert('Please, enter all fields.');
      return;
    }

    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.put(
        `/pharmacyAdmin/updateProduct/${updateProduct.product.id}`,
        {
          price: parseFloat(price),
          amount: parseInt(amount),
        }
      );
      getAllProducts();
      alert('Product has been updated');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setUpdateProduct({ show: false, product: {} });
      dispatch({ type: STOP_LOADING });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h1>Update Product</h1>
        <form className='modal-form' onSubmit={handleUpdateProduct}>
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
            <button
              onClick={() => setUpdateProduct({ show: false, product: {} })}
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

export default PharmacyAdminUpdateProduct;

const Wrapper = styled.section``;
