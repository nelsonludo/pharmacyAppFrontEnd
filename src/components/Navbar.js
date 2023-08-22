import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/GlobalContext';
import { UNSET_USER, START_LOADING, STOP_LOADING } from '../utils/actions';

const Navbar = () => {
  const { user, dispatch, axiosPrivate } = useAuthContext();
  const { categories, cart, dispatch: dispatchGlobal } = useGlobalContext();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatchGlobal({ type: START_LOADING });
      const { data } = await axiosPrivate.post(`/${user.title}/logout`, {});
      localStorage.removeItem('info');
      dispatch({ type: UNSET_USER });
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      dispatchGlobal({ type: STOP_LOADING });
    }
  };

  const searchWithCategory = (categoryName) => {
    if (categoryName === '') {
      return;
    }

    navigate('/products', { state: { name: '', category: categoryName } });
  };

  return (
    <div>
      {user.email ? (
        <HeaderNav>
          <FollowUs>
            <span>follow us on</span>
            <LogoImg src='/icons/instagram.png' alt='instagram Image' />
            <LogoImg src='/icons/facebook.png' alt='facebook Image' />
            <LogoImg src='/icons/tiktok.png' alt='tiktok Image' />
            <LogoImg src='/icons/linkedIn.png' alt='linkedIn Image' />
          </FollowUs>
          <ButtonsDiv>
            {/* <NavButtons>contact us</NavButtons> */}
            {user.title === 'systemAdmin' && (
              <NavButtons to={'/systemAdmin/pharmacies'}>Dashboard</NavButtons>
            )}
            {user.title === 'pharmacyAdmin' && (
              <NavButtons to={'/pharmacyAdmin/products'}>Dashboard</NavButtons>
            )}
            <button className='logout' onClick={logout}>
              Logout
            </button>
          </ButtonsDiv>
        </HeaderNav>
      ) : (
        <HeaderNav>
          <FollowUs>
            <span>follow us on</span>
            <LogoImg src='/icons/instagram.png' alt='instagram Image' />
            <LogoImg src='/icons/facebook.png' alt='facebook Image' />
            <LogoImg src='/icons/tiktok.png' alt='tiktok Image' />
            <LogoImg src='/icons/linkedIn.png' alt='linkedIn Image' />
          </FollowUs>
          <ButtonsDiv>
            {/* <NavButtons>contact us</NavButtons> */}
            <Login to='/login' className='login'>
              Login
            </Login>
          </ButtonsDiv>
        </HeaderNav>
      )}

      <HeaderSearch>
        <Link to={'/'}>
          <img src='/images/logo.png' className='logo' alt='logo' />
        </Link>
        <SearchBar />
        <div>
          <Selects
            name='categories'
            onChange={(e) => searchWithCategory(e.target.value)}
          >
            <option value=''>Category</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Selects>
          <Link to={'/cart'} className='otherLinks'>
            Cart ({cart.length})
          </Link>
          {/* <Link to='AboutUs' className='otherLinks' name='AboutUs'>
            About us
          </Link>
          <Link to='OurServices' className='otherLinks' name='OurSevices'>
            Our services
          </Link> */}
        </div>
      </HeaderSearch>
    </div>
  );
};

export default Navbar;

const navyBlue = '#3c6579';
const specialorange = '#ff9100';

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
  padding: 5px 5px 0 5px;
`;

const FollowUs = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-self: right;
`;

const NavButtons = styled(Link)`
  padding: 2px 30px;
  border-radius: 15px;
  border: 2px solid white;
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
  width: 25%;

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
