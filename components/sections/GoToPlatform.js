import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 570px;
  justify-content: center;
  gap: 80px;
  align-items: center;
  text-align: center;
  border: 4px solid black;
  margin: 50px 50px;
`;

const MainText = styled.h2`
  margin-left: 5%;
  margin-right: 5%;
  font-size: calc(40px + 2vw);
`;

const Button = styled.button`
  width: 360px;
  height: 100px;
  border-radius: 10px;
  font-size: 26px;
  margin-top: 16px;

  @media (max-width: 640px) {
    width: 320px;
    height: 80px;
    :hover {
      border-radius: 0px;
    }
  }
`;

const GoToPlatform = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const goToPlatform = () => {
    router.push('/platform/home?uid=' + currentUser?.uid);
  };

  return (
    <Container>
      <MainText>Try create.ai for free</MainText>
      <Button onClick={goToPlatform}>Go To Platform</Button>
    </Container>
  );
};

export default GoToPlatform;
