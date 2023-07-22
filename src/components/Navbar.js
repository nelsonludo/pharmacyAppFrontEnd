import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import axios from "../axios/instance";
import Loading from "./Loading";

const Navbar = () => {
  const { user, dispatch, category, setLoading } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
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
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchWithCategory = (categoryName) => {
    if (categoryName === "") {
      return;
    }

    navigate("/products", { state: { name: "", category: categoryName } });
  };

  return (
    <div>
      {user.email ? (
        <HeaderNav>
          <Loading />
          <FollowUs>
            <span>follow us on</span>
            <LogoImg src="/images/instagramLogo.png" alt="tweeter Image" />
            <LogoImg src="/images/instagramLogo.png" alt="facebook Image" />
            <LogoImg src="/images/instagramLogo.png" alt="instagram Image" />
            <LogoImg src="/images/instagramLogo.png" alt="tiktok Image" />
          </FollowUs>
          <ButtonsDiv>
            {/* <NavButtons>contact us</NavButtons> */}
            {user.title === "systemAdmin" && (
              <NavButtons to={"/systemAdmin/pharmacies"}>Dashboard</NavButtons>
            )}
            {user.title === "pharmacyAdmin" && (
              <NavButtons to={"/pharmacyAdmin/products"}>Dashboard</NavButtons>
            )}
            <button className="logout" onClick={logout}>
              Logout
            </button>
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
            {/* <NavButtons>contact us</NavButtons> */}
            <Login to="/login" className="login">
              Login
            </Login>
          </ButtonsDiv>
        </HeaderNav>
      )}

      <HeaderSearch>
        <img src="/images/logo.png" className="logo" alt="logo" />
        <SearchBar />
        <div>
          <Selects
            name="categories"
            onChange={(e) => searchWithCategory(e.target.value)}
          >
            <option value="">Cagegory</option>
            {category.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Selects>
          <Link to="AboutUs" className="otherLinks" name="AboutUs">
            About us
          </Link>
          <Link to="OurServices" className="otherLinks" name="OurSevices">
            Our services
          </Link>
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

  .logout {
    padding: 2px 30px;
    border-radius: 15px;
    text-decoration: none;
    margin: 0 25px;
    color: ${specialorange};
    border: 2px solid ${specialorange};
    background-color: ${navyBlue};
  }
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

  .logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
    display: block;
  }

  .otherLinks {
    color: ${navyBlue};
    border: none;
    margin: 0 15px;
    font-size: 130%;
    width: 18%;
    text-decoration: none;
  }
`;

const Selects = styled.select`
  color: ${navyBlue};
  border: none;
  margin: 0 15px;
  font-size: 130%;
  width: 18%;

  :focus {
    outline: none;
  }

  option {
    color: ${navyBlue};
    display: flex;
    flex-wrap: wrap;
    width: inherit;
  }

  option:hover {
    background-color: ${navyBlue};
    color: white;
  }
`;
