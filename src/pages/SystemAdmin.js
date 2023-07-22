import React from 'react';
import styled from 'styled-components';
import SystemAdminDashboardLeft from '../components/SystemAdmin/SystemAdminDashboardLeft';
import { Outlet } from 'react-router-dom';

const SystemAdmin = () => {
  return (
    <Wrapper>
      <SystemAdminDashboardLeft />
      <Outlet />
    </Wrapper>
  );
};

export default SystemAdmin;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
`;
