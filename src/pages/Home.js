import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import DrugCategory from "../components/DrugCategory";
import Footer from "../components/Footer";

const Home = () => {
  const { category } = useAuthContext();
  // const navigate = useNavigate();

  // const logout = async () => {
  //   await axios.post(
  //     `/${user.title}/logout`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: "Bearer " + user.accessToken,
  //       },
  //     }
  //   );

  //   localStorage.removeItem("info");
  //   dispatch({ type: "UNSET_USER" });
  //   navigate("/");
  // };

  return (
    <Wrapper>
      <Header />
      <DrugCategory category={category} />
      <Footer />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  // position: relative;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;
`;
