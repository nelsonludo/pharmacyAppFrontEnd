import { useState, useContext } from "react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const { searchValue, setSearchValue } = useAuthContext();

  const navigate = useNavigate();
  //   const handleButtonClick = (theEvent) => {
  //     setDisplayText(searchValue);
  //   };

  const searchHandle = async (event) => {
    setSearchValue(event.target.value);
  };

  const submitHandle = () => {
    navigate("/product", {
      state: { name: searchValue, category: "" },
    });
  };

  return (
    <form onSubmit={submitHandle}>
      <div className="seachBarDiv">
        <input
          type="text"
          placeholder="search drug here"
          className="searchProductInput"
          onChange={searchHandle}
        />
        <button name="searchButton">
          {/* onClick={handleButtonClick} */}
          <Link to="/products">
            <img alt="seach Image" />
          </Link>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
