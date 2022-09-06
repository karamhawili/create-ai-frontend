import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled, { css } from 'styled-components';
import UserProfile from './UserProfile';

const Container = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;

  & :hover {
    background-color: #f0f3f4;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
  height: 100%;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: #1c1c1c;
`;

const Username = styled.p`
  font-size: 1rem;
`;

const Email = styled.p`
  font-weight: 400;
`;

const UserDisplay = ({ email }) => {
  const username = email?.substring(0, email.lastIndexOf('@'));

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <UserProfile letter={email[0]} />
        <InfoContainer>
          <Username>{username}</Username>
          <Email>{email}</Email>
        </InfoContainer>
      </Container>
    </>
  );
};

export default UserDisplay;
