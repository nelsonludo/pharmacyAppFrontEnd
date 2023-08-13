import { useState, useEffect } from 'react';
import React from 'react';
import useAxios from '../hooks/useAxios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

const Products = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const { setLoading } = useAuthContext();
  const { axios } = useAxios();

  const getProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`/product`, {
        name: state.name,
        latitude: 3.84548,
        longitude: 11.520978,
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
