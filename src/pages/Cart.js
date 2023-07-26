import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Cart = () => {
  const { cart } = useAuthContext();
  console.log('cart', cart);
  return (
    <div>
      <Navbar />
      <Wrapper>
        <h1>Cart page</h1>
        {cart.length === 0 ? (
          <h1>No item on the cart page</h1>
        ) : (
          <div>
            <div className='cart-items'>
              {cart.map((product) => {
                return (
                  <article key={product.productid} className='item'>
                    <div className='itemText'>
                      <p>
                        <p className='name'> Name:</p>{' '}
                        <p className='item_name'>{product.productname}</p>
                      </p>
                      <p>
                        <p className='quantity'> Quantity:</p>{' '}
                        <p className='item_name'>{product.productamount}</p>
                      </p>
                    </div>
                    <div>
                      <img
                        className='images'
                        alt='aProduct'
                        src={`http://localhost:4000/static/productImages/${product.productimage}`}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
            <div className='btn-container'>
              <button>Proceed to payment</button>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;

const navyBlue = '#3c6579';
const specialorange = '#ff9100';

const Wrapper = styled.section`
  width: 80%;
  margin: 0 auto;

  h1 {
    text-align: center;
    color: ${navyBlue};
  }

  .cart-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  .item {
    border: 1px solid #f1f1f2;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px 10px #f1f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item .name,
  .quantity {
    color: ${navyBlue};
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 50px 0;
  }

  .btn-container button {
    padding: 5px 30px;
    border-radius: 15px;
    text-decoration: none;
    margin: 0 25px;
    color: white;
    border: 2px solid ${specialorange};
    background-color: ${specialorange};
  }
  .images {
    height: 200px;
    width: 175px;
  }
  .item_name {
    color: ${specialorange};
  }
  .btn-container button:hover {
    cursor: pointer;
    background-color: #bb6b03;
    border-color: #bb6b03;
    transition: 0.3s linear;
  }
`;
