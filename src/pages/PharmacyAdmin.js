import React from 'react';
import styled from 'styled-components';
import PharmacyAdminDashboardLeft from '../components/PharmacyAdmin/PharmacyAdminDashboardLeft';
import { Outlet } from 'react-router-dom';

const PharmacyAdmin = () => {
  return (
    <Wrapper>
      <PharmacyAdminDashboardLeft />
      <Outlet />
    </Wrapper>
  );
};

export default PharmacyAdmin;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
`;
