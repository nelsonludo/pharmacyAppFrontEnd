import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const PharmacyAdminDashboardLeft = () => {
  return (
    <Wrapper>
      <div className='links'>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Home
        </NavLink>
        <NavLink
          to={'products'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Products
        </NavLink>
        <NavLink
          to={'cashiers'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Cashiers
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Orders
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Sales
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Pharmacy Admins
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default PharmacyAdminDashboardLeft;

const Wrapper = styled.section`
  background-color: #3c6579;
  width: 15%;
  padding: 20px;

  .links {
    display: flex;
    flex-direction: column;
  }

  .link {
    padding: 20px 0;
    color: white;
    font-size: 20px;
    text-decoration: none;
  }

  .link:hover {
    font-weight: bold;
    color: black;
  }

  .active-link {
    font-weight: bold;
    color: black;
  }
`;
