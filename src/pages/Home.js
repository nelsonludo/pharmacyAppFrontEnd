import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../axios/instance";
import Header from "../components/Header";
import DrugCategory from "../components/DrugCategory";
import Footer from "../components/Footer";

const Home = () => {
  const { user, dispatch, category } = useAuthContext();
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);

  const ref = useRef(null);

  // useEffect(() => {
  //   const newHeight = ref.current.offsetHeight;
  //   if (newHeight !== height) {
  //     setHeight(newHeight);
  //   }
  // }, [height]);

  const logout = async () => {
    await axios.post(
      `/${user.title}/logout`,
      {},
      {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      }
    );

    localStorage.removeItem("info");
    dispatch({ type: "UNSET_USER" });
    navigate("/login");
  };

  return (
    <Wrapper>
      <Header />
      <DrugCategory category={category} />
      {/* ref={ref} */}
      <Footer />
      {/* {user && user.email ? <h2>{user.email}</h2> : <h2>Not logged in</h2>}
      {user && user.email && <button onClick={logout}>Logout</button>} */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  position: relative;
`;
