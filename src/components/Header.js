import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import styled from "styled-components";

const Header = () => {
  // const { loggedin } = useAuthContext();
  const { user } = useAuthContext();

  return (
    <TheContainer>
      <Navbar />
      {user.email ? (
        <Headboard>
          <h1>Manage your health and family with happiness</h1>
          <span>
            Do you want to kick out sickness and maintain good health and
            fitness?
          </span>
          <span>sign up and get access to pharmaceutical drugs</span>
        </Headboard>
      ) : (
        <Headboard>
          <h1>Manage your health and family with happiness</h1>
          <span>
            Do you want to kick out sickness and maintain good health and
            fitness? <br />
            sign up and get access to pharmaceutical drugs
          </span>
          <NavButtons to="./signup" className="signUp">
            sign up
          </NavButtons>
        </Headboard>
      )}
    </TheContainer>
  );
};

export default Header;

// const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const Headboard = styled.div`
  background-image: url(/images/guy.jpg);
  height: 450px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 100px 0 0 150px;

  h1 {
    padding: 0 0 0 80px;
    width: 300px;
    font-size: 35px;
  }
`;

const NavButtons = styled(Link)`
  padding: 2px 30px;
  border-radius: 15px;
  border: 2px solid ${specialorange};
  color: inherit;
  text-decoration: none;
  margin: 0 0 0 350px;
  background-color: ${specialorange};
  width: 60px;
`;

const TheContainer = styled.div`
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 4;
  z-index: 1;
`;
