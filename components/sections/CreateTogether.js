import React from 'react';
import Collaborate from '../../public/landing_illustrations/Collaborate.svg';
import styled from 'styled-components';
import Image from 'next/image';
import ParagraphStyle from './ParagraphStyle';

const Container = styled.div`
  min-height: 700px;
  margin: 50px 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 915px) {
    /* flex-direction: column-reverse;
      margin-left: auto;
      margin-right: auto; */
  }
`;

const Card = styled.div`
  height: 670px;
  width: 100%;
  max-width: 1412px;
  border-radius: 70px;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding-inline: 55px;
`;

const TextContainer = styled.div`
  h3 {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 20px;
  }
  max-width: 600px;
  text-align: right;
`;

const Paragraph = styled.p`
  ${ParagraphStyle}

  strong {
    color: var(--color-blue-primary);
  }
`;

const SVG = styled(Image)`
  @media (max-width: 915px) {
  }
`;

const CreateTogether = () => {
  return (
    <section>
      <Container>
        <Card className=" shadow-xl">
          <TextContainer>
            <h3>Real-Time Collaboration</h3>
            <h2>Create Together</h2>
            <Paragraph>
              We decided to make our platform collaborative so that you and your
              teammates can work and share your ideas together. Anyone can
              upload the designs they like and steer the design the way they
              desire.
              <br />
              <span>
                We strongly believe that <strong>teamwork</strong> increases
                productivity and leads to the best results.
              </span>
            </Paragraph>
          </TextContainer>
          <SVG src={Collaborate} alt="" layout="raw" />
        </Card>
      </Container>
    </section>
  );
};

export default CreateTogether;
