import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="appProductsItems">
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
    </div>
  );
};

export default ProductItem;
