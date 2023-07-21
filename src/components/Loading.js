import React from 'react';
// import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useAuthContext } from '../contexts/AuthContext';

const Loading = () => {
  const { loading } = useAuthContext();

  return (
    <Wrapper style={{ display: `${loading ? 'flex' : 'none'}` }}>
      {/* <CircularProgress
        style={{
          color: 'var(--orange)',
        }}
      /> */}
      <h1>Loading...</h1>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
