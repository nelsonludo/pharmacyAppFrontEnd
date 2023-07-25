import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios/instance";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import SideBar from "../components/SideBar";

const Products = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
      .get("/category")
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
        <Navbar />
        <div className="mainContent">
          <SideBar category={category} />
          <ProductItem product={products} />
        </div>
        <Footer />
      </Container>
      {/* {products.map((product) => {
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
      })} */}
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section`
  .mainContent {
    display: flex;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideBarStyled = styled(SideBar)`
  width: 300px;
`;
