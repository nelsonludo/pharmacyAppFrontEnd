import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../axios/instance";
import Header from "../components/Header";
import DrugCategory from "../components/DrugCategory";
import Footer from "../components/Footer";

let i = 0;

const Home = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

  useEffect(() => {
    axios
      .get("/category")
      .then((response) =>
        // for (i = 0; i < response.data.length; i++) {
        // console.log(response.data[i].name);
        // }
        setData(response.data)
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <Wrapper>
      <Header />
      <DrugCategory category={data} />
      <Footer />
      {/* {user && user.email ? <h2>{user.email}</h2> : <h2>Not logged in</h2>}
      {user && user.email && <button onClick={logout}>Logout</button>} */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section``;
