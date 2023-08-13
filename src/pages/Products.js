import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { useGlobalContext } from '../contexts/GlobalContext';
import { START_LOADING, STOP_LOADING } from '../utils/actions';

const Products = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const { axios } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getProducts = async () => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await axios.get(
        `/product?name=${state.name}&page=${page}&categoryId=${state.category}&latitude=0.22&longitude=0.88`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  useEffect(() => {
    getProducts();
  }, [state, page]);

  useEffect(() => {
    axios
      .get('/category')
      .then((response) => setCategory(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Wrapper>
      {/* <Loading /> */}
      {products.length === 0 ? (
        <Container>
          <Navbar />
          <div className='mainContent'>
            <SideBar category={category} />
            <h1>No product found</h1>
          </div>
          <Footer />
        </Container>
      ) : (
        <Container>
          <Navbar />
          <div className='mainContent'>
            <SideBar category={category} />
            <ProductItem product={products} />
          </div>
          <Footer />
        </Container>
      )}
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section`
  .mainContent {
    display: flex;
  }

  h1 {
    margin: 25%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideBarStyled = styled(SideBar)`
  width: 300px;
`;
