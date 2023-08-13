import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Pagination } from '@mui/material';

import { useAuthContext } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/GlobalContext';
import PharmacyAdminCreateProduct from './PharmacyAdminCreateProduct';
import PharmacyAdminDeleteProduct from './PharmacyAdminDeleteProduct';
import PharmacyAdminUpdateProduct from './PharmacyAdminUpdateProduct';
import { STOP_LOADING, START_LOADING } from '../../utils/actions';

const PharmacyAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [createProduct, setCreateProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState({
    show: false,
    product: {},
  });
  const [updateProduct, setUpdateProduct] = useState({
    show: false,
    product: {},
  });

  const { axiosPrivate } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getAllProducts = async () => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axiosPrivate.get(
        `/pharmacyAdmin/seeOurProducts?name=${name}&page=${page}`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [name, page]);

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h1>All Products</h1>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a product'
        />
        <button onClick={() => setCreateProduct(true)}>Add a Product</button>
      </header>
      {products.length === 0 ? (
        <h1>No products available</h1>
      ) : (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productList.name}</td>
                  <td>{product.productList.description}</td>
                  <td>{product.productList.productCategory.name}</td>
                  <td>{product.amount}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => setUpdateProduct({ show: true, product })}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteProduct({ show: true, product })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {createProduct && (
        <PharmacyAdminCreateProduct
          setCreateProduct={setCreateProduct}
          getAllProducts={getAllProducts}
        />
      )}
      {deleteProduct.show && (
        <PharmacyAdminDeleteProduct
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          getAllProducts={getAllProducts}
        />
      )}
      {updateProduct.show && (
        <PharmacyAdminUpdateProduct
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
          getAllProducts={getAllProducts}
        />
      )}
    </Wrapper>
  );
};

export default PharmacyAdminProducts;

const Wrapper = styled.section`
  width: 85%;
  padding: 20px;
`;
