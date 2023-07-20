import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ProductItem = ({ product }) => {
  return (
    <AppProductsItems>
      {product.map((item) => (
        <div key={item.id} className="productsContainer">
          <div className="subProductContainer1">
            <img alt="aProduct" src="./public/paracetamol.png" />
          </div>
          <div className="subProductContainer2">
            <span className="productName">{item.productname}</span>
            <div className="priceAndButton">
              <span className="productPrice">{item.productprice}</span>
              <span className="productPharmacyName">{item.pharmacyname}</span>
              <span className="productPharmacyEmail">{item.pharmacyEmail}</span>
            </div>
          </div>
        </div>
      ))}
    </AppProductsItems>
  );
};

export default ProductItem;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const AppProductsItems = styled.div`
  width: 90%;
  display: grid;
  gap: 100px;
  grid-template-columns: auto auto auto;
  padding: 0 0 30px 5%;
  margin: 130px 0 0 0;

  .productContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
    text-decoration: none;
    color: ${navyBlue};
  }

  subContainer1 {
    height: 40%;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    padding: 2px 0;
  }

  subContainer2 {
    height: 60%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 40px 0;
  }

  .categoryName {
    font-size: 165%;
    font-weight: bold;
    margin: 5%;
  }

  img {
    width: 90px;
    height: 70px;
  }
`;
