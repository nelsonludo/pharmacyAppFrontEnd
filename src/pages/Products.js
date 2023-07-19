import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import DrugCategory from "../components/DrugCategory";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/product?name=${state?.name}&page=${page}&categoryId=${state?.category}&longitude=&latitude=`
      )
      .then((response) =>
        // for (i = 0; i < response.data.length; i++) {
        // console.log(response.data[i].name);
        // }
        setProduct(response.data)
      )
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/category")
      .then((response) =>
        // for (i = 0; i < response.data.length; i++) {
        // console.log(response.data[i].name);
        // }
        setCategory(response.data)
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <Wrapper>
      <Container>
        <SideBar>
          <DrugCategory category={category} />
        </SideBar>
        <div className="content">
          <Navbar />
          <ProductItem product={product} />
          <Footer />
        </div>
      </Container>
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
