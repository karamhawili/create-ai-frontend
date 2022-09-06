import React from 'react';
import Playground from '../../public/landing_illustrations/Playground.svg';
import styled from 'styled-components';
import Image from 'next/image';
import ParagraphStyle from './ParagraphStyle';

const Container = styled.div`
  min-height: 800px;
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  padding-inline: 80px;
  justify-content: space-between;

  @media (max-width: 915px) {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;
  }
`;

const TextContainer = styled.div`
  h3 {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 20px;
  }
  max-width: 520px;
`;

const SVG = styled(Image)`
  @media (max-width: 915px) {
  }
`;

const Paragraph = styled.p`
  ${ParagraphStyle}
  strong {
    color: var(--color-blue-primary);
  }
`;

const ControlDesign = () => {
  return (
    <section>
      <Container>
        <TextContainer>
          <h3>Your Design, Your Way</h3>
          <h2>Control the Design</h2>
          <Paragraph>
            Simply select your favorite design among the uploaded ones and the
            output will automatically change to reflect it.
            <br />
            <span>
              By doing this, you can ensure that the output will be{' '}
              <strong>exactly the way you want it.</strong>
            </span>
          </Paragraph>
        </TextContainer>
        <div className=" shadow-xl rounded-3xl">
          <SVG src={Playground} alt="control the design" layout="raw" />
        </div>
      </Container>
    </section>
  );
};

export default ControlDesign;
