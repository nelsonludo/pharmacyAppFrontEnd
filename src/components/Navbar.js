import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../contexts/AuthContext";
import styled from "styled-components";

const Navbar = () => {
  const { loggedin } = useAuthContext();

  return (
    <div>
      {loggedin ? (
        <HeaderNav>
          <FollowUs>
            <span>follow us on</span>
            <LogoImg src="/images/instagramLogo.png" alt="tweeter Image" />
            <LogoImg src="/images/instagramLogo.png" alt="facebook Image" />
            <LogoImg src="/images/instagramLogo.png" alt="instagram Image" />
            <LogoImg src="/images/instagramLogo.png" alt="tiktok Image" />
          </FollowUs>
          <ButtonsDiv>
            <NavButtons>contact us</NavButtons>
          </ButtonsDiv>
        </HeaderNav>
      ) : (
        <HeaderNav>
          <FollowUs>
            <span>follow us on</span>
            <LogoImg src="/images/instagramLogo.png" alt="tweeter Image" />
            <LogoImg src="/images/instagramLogo.png" alt="facebook Image" />
            <LogoImg src="/images/instagramLogo.png" alt="instagram Image" />
            <LogoImg src="/images/instagramLogo.png" alt="tiktok Image" />
          </FollowUs>
          <ButtonsDiv>
            <NavButtons>contact us</NavButtons>
            <Login to="/login" className="login">
              Login
            </Login>
          </ButtonsDiv>
        </HeaderNav>
      )}

      <HeaderSearch>
        <img alt="logo" />
        <SearchBar />
        <div>
          <Selects name="categories">
            <option>Categories</option>
            <option>categories</option>
            <option>categories</option>
          </Selects>
          <Selects name="AboutUs">
            <option>About us</option>
          </Selects>
          <Selects name="OurSevices">
            <option>Our services</option>
          </Selects>
        </div>
      </HeaderSearch>
    </div>
  );
};

export default Navbar;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const HeaderNav = styled.div`
  background-color: ${navyBlue};
  height: 50px;
  margin: 0 0 5px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 10px 0;
  padding-top: 5px;
`;

const FollowUs = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-self: right;
`;

const NavButtons = styled(Link)`
  padding: 2px 30px;
  border-radius: 15px;
  border: 1px solid white;
  color: inherit;
  text-decoration: none;
  margin: 0 25px;
`;

const Login = styled(NavButtons)`
  color: ${specialorange};
  border: 2px solid ${specialorange};
`;

const HeaderSearch = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-around;
  color: ${navyBlue};
  height: 70px;
  align-items: center;
`;

const Selects = styled.select`
  color: ${navyBlue};
  border: none;
  margin: 0 15px;
  font-size: 130%;

  option {
    color: ${navyBlue};
  }

  option:hover {
    background-color: white;
    color: ${navyBlue};
  }

  option:checked {
    background-color: ${navyBlue};
    color: white;
  }
`;
