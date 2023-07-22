import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from '../../axios/instance';

const PharmacyAdminDeleteDrug = ({
  deleteProduct,
  setDeleteProduct,
  getAllProducts,
}) => {
  const { user, setLoading } = useAuthContext();

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/pharmacyAdmin/deleteProduct/${deleteProduct.product.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
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

export default PharmacyAdminDeleteDrug;

const Wrapper = styled.section``;
