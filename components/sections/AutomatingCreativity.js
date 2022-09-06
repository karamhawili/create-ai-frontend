import React from 'react';
import styled from 'styled-components';
import Image from 'next/dist/client/image';
import Step1 from '../../public/landing_illustrations/Step1.svg';
import Step2 from '../../public/landing_illustrations/Step2.svg';
import Step3 from '../../public/landing_illustrations/Step3.svg';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 130px;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;

  @media (max-width: 915px) {
    padding-bottom: 85px;
  }
`;

const MainText = styled.h2`
  font-size: 2.5rem;
`;

const SubText = styled.p`
  color: var(--text-body-color);
  font-family: var(--text-body-font);
  font-size: 1.3rem;
  line-height: var(--text-body-line-height);

  span {
    color: var(--color-blue-primary);
    font-weight: 600;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  text-align: center;
  font-size: 1.4rem;
  line-height: 33px;
  letter-spacing: 0.05em;
  color: #393939;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
`;

const Illustration = styled(Image)`
  height: 165px;
`;

const AutomatingCreativity = () => {
  return (
    <section>
      <Container>
        <TextContainer>
          <MainText>Automating Creativity</MainText>
          <SubText>
            Our mission is to employ AI to make the product design process
            easier by
            <br />
            allowing you to generate new concepts{' '}
            <span>with the click of a button</span>.
          </SubText>
        </TextContainer>

        <StepsContainer>
          <StepContainer className="mt-3">
            <Illustration src={Step1} alt="" layout="raw" />
            <p>
              upload your <br />
              favorite designs
            </p>
          </StepContainer>
          <StepContainer>
            <Illustration src={Step2} alt="" layout="raw" />
            <p>
              generate a <br />
              new design
            </p>
          </StepContainer>
          <StepContainer>
            <Illustration src={Step3} alt="" layout="raw" />
            <p className=" mt-4">control the output</p>
          </StepContainer>
        </StepsContainer>
      </Container>
    </section>
  );
};

export default AutomatingCreativity;
