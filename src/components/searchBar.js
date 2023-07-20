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

  const submitHandle = (e) => {
    e.preventDefault();
    navigate("/products", {
      state: { name: searchValue, category: "" },
    });
  };

  return (
    <form onSubmit={submitHandle}>
      <SearchContainer>
        <input
          type="text"
          placeholder="search drug here"
          className="searchProductInput"
          onChange={searchHandle}
        />
        <button name="searchButton" type="submit">
          <img alt="seach Image" src="/images/loupe.png" />
        </button>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;

const navyBlue = "#3c6579";

const SearchContainer = styled.div`
  border: 2px solid ${navyBlue};
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 5px 3px;

  input {
    border: none;
    color: ${navyBlue};
    width: 400px;
  }

  input:focus {
    border: none;
    outline: none;
  }

  button {
    border: none;
    background-color: white;
  }

  img {
    width: 16px;
  }
`;
