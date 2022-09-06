import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled, { css } from 'styled-components';

const RoundContainer = styled.div(
  (props) => css`
    width: 40px;
    height: 40px;
    background-color: ${props.color};
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;

    & p {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 1.2rem;
      color: white;
    }
  `
);

const UserProfile = ({ letter }) => {
  const colors = [
    '#00a5e8',
    '#006be8',
    '#0031e8',
    '#0900e8',
    '#4300e8',
    '#3EAFA9',
  ];

  return (
    <>
      <GlobalStylePlatform />
      <RoundContainer color={colors[Math.floor(Math.random() * 6)]}>
        <p>{letter}</p>
      </RoundContainer>
    </>
  );
};

export default UserProfile;
