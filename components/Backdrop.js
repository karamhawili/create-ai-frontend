import React from 'react';
import { GridLoader, MoonLoader } from 'react-spinners';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 60;
  background-color: rgba(255, 255, 255, 0.4);
`;

const Backdrop = ({ isOpen }) => {
  console.log('isOpen', isOpen);
  return (
    <Container className={isOpen ? 'block' : 'hidden invisible'}>
      <MoonLoader size={60} margin={2} color="#0E37AF" />
    </Container>
  );
};

export default Backdrop;
