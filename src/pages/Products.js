import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/instance';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import ProductItem from '../components/ProductItem';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import SideBar from '../components/SideBar';

const Products = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  const getProducts = async () => {
    try {
      setLoading(true);

      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        setLatitude(lat);
        setLongitude(long);
      });

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
  }, [state, page, latitude, longitude]);

  useEffect(() => {
    axios
      .get('/category')
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
        <SideBar category={category} />
        <div className='content'>
          <Navbar />
          {/* <ProductItem products={products} /> */}
          <Footer />
        </div>
      </Container>
      {products.map((product) => {
        return (
          <article
            key={product.productid}
            style={{
              border: '1px solid black',
              padding: '15px',
              margin: '10px',
            }}
          >
            <img
              src={`http://localhost:4000/static/productImages/${product.productimage}`}
              alt=''
            />
            <h2>Name: {product.productname}</h2>
            <h3>Pharmacy: {product.pharmacyname}</h3>
            <h3>Price: {product.productprice} FCFA</h3>
            <h3>Distance (m): {product.distance_m}</h3>
            <h3>Quantity Available: {product.productamount}</h3>
          </article>
        );
      })}
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section``;

const Container = styled.div`
  display: flex;
`;

const SideBarStyled = styled(SideBar)`
  width: 300px;
`;
