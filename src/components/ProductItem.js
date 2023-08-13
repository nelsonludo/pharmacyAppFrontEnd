import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../contexts/AuthContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useAuthContext();

  console.log(product);
  return (
    <AppProductsItems>
      {product.map((item) => (
        <div key={item.id} className='productsContainer'>
          <div className='subProductContainer1'>
            <img alt='aProduct' src={`${item.productimage}`} />
          </div>
          <div className='subProductContainer2'>
            <span className='productDescription'>
              lorem ipsum this is a description that is very long and uselessly
              useless but very essential
            </span>
            <span className='productName'>{item.productname}</span>
            <span>Pharmacy: {item.pharmacyname}</span>
            {item.distance_m && <span>Distance (m):{item.distance_m}</span>}
            <div className='priceAndButton'>
              <h2 className='productPrice'>
                {item.productprice}
                <span className='frs'>frs</span>
              </h2>
              <button
                className='getIt'
                onClick={() => addToCart({ ...item, productamount: 1 })}
              >
                Add to Cart
              </button>
            </div>
            <span>{item.productamount} still available</span>
          </div>
        </div>
      ))}
    </AppProductsItems>
  );
};

export default ProductItem;

const navyBlue = '#3c6579';
const specialorange = '#ff9100';

const AppProductsItems = styled.div`
  width: 80%;
  display: grid;
  gap: 100px 20px;
  grid-template-columns: auto auto auto;
  padding: 0 2% 30px 2%;
  height: 70%;
  color: darkgrey;

  .productsContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
    text-decoration: none;
    color: ${navyBlue};
  }

  .subProductContainer1 {
    height: 50%;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    padding: 2px 0;
  }

  .subProductContainer2 {
    height: 50%;
    display: flex;
    flex-direction: column;
    padding: 5% 5%;
    justify-content: center;
    font-weight: light;
    color: #717171;
  }

  .productName {
    font-size: 100%;
    font-weight: bold;
    margin: 5px 0;
  }

  img {
    width: 200px;
    height: 200px;
  }

  .priceAndButton {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .getIt {
    padding: 2px 30px;
    border-radius: 15px;
    text-decoration: none;
    margin: 0 25px;
    color: ${specialorange};
    border: 2px solid ${specialorange};
    background-color: white;
  }

  .frs {
    font-size: 15px;
    font-weight: normal;
  }

  h2 {
    margin: auto 0;
  }
`;
