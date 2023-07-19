import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/instance';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import ProductItem from '../components/ProductItem';
import DrugCategory from '../components/DrugCategory';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Products = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { latitude, longitude } = useAuthContext();

  const getProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`/product`, {
        name: state.name,
        latitude,
        longitude,
        page: 1,
        categoryId: state.category,
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [state, page]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/category')
      .then((response) => setCategory(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (products.length === 0) {
    return <h1>No product found</h1>;
  }

  return (
    <Wrapper>
      <Container>
        <SideBar>
          <DrugCategory category={category} />
        </SideBar>
        <div className='content'>
          <Navbar />
          {/* <ProductItem products={products} /> */}
          <Footer />
        </div>
      </Container>
      {products.map((product) => {
        return <h2 key={product.productid}>{product.productname}</h2>;
      })}
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section``;

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 300px;
`;
