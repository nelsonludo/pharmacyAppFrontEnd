import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import useAxios from '../../hooks/useAxios';

const PharmacyAdminDeleteProduct = ({
  deleteProduct,
  setDeleteProduct,
  getAllProducts,
}) => {
  const { setLoading } = useAuthContext();
  const { axiosPrivate } = useAxios();

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.delete(
        `/pharmacyAdmin/deleteProduct/${deleteProduct.product.id}`
      );
      getAllProducts();
      setDeleteProduct({ show: false, product: {} });
      alert('Product has been deleted');
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
          Are you sure you want to delete the product "
          {deleteProduct.product.productList.name}" ?
        </h1>
        <div className='list-buttons'>
          <button
            onClick={() => setDeleteProduct({ show: false, product: {} })}
          >
            Close
          </button>
          <button type='submit' onClick={handleDeleteProduct}>
            Submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PharmacyAdminDeleteProduct;

const Wrapper = styled.section``;
