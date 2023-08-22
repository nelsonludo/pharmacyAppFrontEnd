import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedMedications, setSearchedMedication] = useState([]);

  const { axios } = useAuthContext();

  const navigate = useNavigate();

  const submitHandle = (e) => {
    e.preventDefault();
    navigate('/products', {
      state: { name: searchTerm, category: '' },
    });
    setSearchTerm('');
  };

  const fetchSearchedProducts = async () => {
    if (searchTerm == '') {
      setSearchedMedication([]);
      return;
    }
    const { data } = await axios.get(`/product/search?name=${searchTerm}`);
    setSearchedMedication(data);
  };

  useEffect(() => {
    fetchSearchedProducts();
  }, [searchTerm]);

  return (
    <form onSubmit={submitHandle}>
      <SearchContainer>
        <input
          type='text'
          placeholder='search drug here'
          className='searchProductInput'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button name='searchButton' type='submit'>
          <img alt='seach Image' src='/images/loupe.png' />
        </button>
      </SearchContainer>
      {searchedMedications.length > 0 && (
        <div>
          {searchedMedications.map((medication) => {
            return (
              <Link
                key={medication.id}
                to={'/products'}
                state={{ name: medication.name, category: '' }}
                onClick={() => setSearchTerm('')}
              >
                {medication.name}
              </Link>
            );
          })}
        </div>
      )}
      {searchTerm !== '' && searchedMedications.length === 0 && (
        <div>
          <p>No product available</p>;
        </div>
      )}
    </form>
  );
};

export default SearchBar;

const navyBlue = '#3c6579';

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
    padding: 5px 5px;
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
