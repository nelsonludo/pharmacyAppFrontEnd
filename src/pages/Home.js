import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../axios/instance";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <Wrapper>
      <h1>Home page</h1>
      {/* {user?.email ? <h2>{user.email}</h2> : <h2>Not logged in</h2>} */}
      {/* {user?.email && <h1>{user.email}</h1>} */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section``;
