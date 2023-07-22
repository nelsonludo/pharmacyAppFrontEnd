import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SystemAdminDashboardLeft = () => {
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
          to={'pharmacies'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Pharmacies
        </NavLink>
        <NavLink
          to={'drugs'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Drugs
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
        >
          Product Categories
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default SystemAdminDashboardLeft;

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
