import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Illustration from '../../public/landing_illustrations/DesignBetterSVG.svg';
import Blob from '../../public/landing_illustrations/EllipseLeft.svg';

const Container = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 50px;
  background-color: rgba(0, 0, 0, 0);
  color: white;

  @media (max-width: 1160px) {
    height: auto;
    flex-direction: column;
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 120px;
  flex: 50%;
  gap: 50px;

  @media (max-width: 1160px) {
    text-align: center;
    align-items: center;
    padding-top: 25px;
    flex: none;
  }

  @media (max-width: 435px) {
    padding-top: 60px;
  }
`;

const MainText = styled.h1`
  @media (max-width: 640px) {
    font-size: 45px;
  }

  @media (max-width: 435px) {
    font-size: 40px;
  }
`;

const SubText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  min-width: 545px;

  @media (max-width: 640px) {
    min-width: 450px;
  }

  @media (max-width: 435px) {
    min-width: 380px;
  }

  span {
    width: fit-content;
    font-size: 20px;
    font-family: 'Quicksand';
    font-weight: 500;
    letter-spacing: 0.1em;

    @media (max-width: 640px) {
      font-size: 14px;
    }

    @media (max-width: 435px) {
      font-size: 12px;
    }
  }

  div {
    display: inline;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    @media (max-width: 435px) {
      width: 6px;
      height: 6px;
    }
  }
`;

const RightContainer = styled.div`
  user-select: none;
  float: right;
  flex: 50%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-top: 20px;
  padding-bottom: 40px;
  @media (max-width: 1160px) {
    float: none;
    justify-content: space-evenly;
    margin-top: 30px;
    flex: none;
  }
`;

const SVG = styled(Image)`
  width: 77%;
  margin-top: 50px;
  align-self: flex-end;
  @media (max-width: 1160px) {
    width: 25%;
    max-width: none;
    margin-bottom: 6vw;
  }
`;

const DesignBetter = () => {
  console.log('rednering design better');
  return (
    <section>
      <Container>
        <LeftContainer>
          <MainText>
            Design Better
            <br />
            Design Faster
          </MainText>
          <SubText>
            <span>
              AI Generated
              <br />
              Designs
            </span>
            <div> </div>
            <span>
              Novelty with the
              <br />
              Click of a Button
            </span>
            <div> </div>
            <span>
              Real-Time
              <br />
              Collaboration
            </span>
          </SubText>
        </LeftContainer>

        <RightContainer>
          <SVG
            src={Illustration}
            alt="illustration expressing the process of generating images using a GAN model"
            layout="raw"
          />
        </RightContainer>
      </Container>
    </section>
  );
};

export default DesignBetter;
