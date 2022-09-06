import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import AutomatingCreativity from '../components/sections/AutomatingCreativity';
import ControlDesign from '../components/sections/ControlDesign';
import CreateTogether from '../components/sections/CreateTogether';
import DesignBetter from '../components/sections/DesignBetter';
import GoToPlatform from '../components/sections/GoToPlatform';
import JoinCommunity from '../components/sections/JoinCommunity';
import { GlobalStyleLanding } from '../styles/globalStyles';
import { useAuth } from '../contexts/AuthContext';
import { LoginProvider } from '../contexts/LoginContext';
import Blob from '../public/landing_illustrations/EllipseRight.svg';
import Blob2 from '../public/landing_illustrations/EllipseLeft.svg';
import Fashion from '../components/sections/Fashion';

const MainContainer = styled.div`
  width: 100%;
  overflow: hidden;

  //limit width for screens bigger than 1500
  //max-width: 1500px;
  //margin-left: auto;
  //margin-right: auto;
`;

const Container = styled.div`
  background-color: var(--bg-color-landing-container);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  width: 100%;
`;

const BlobRight = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  opacity: 0.6;
`;

const BlobLeft = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
`;

const index = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>create.ai</title>
      </Head>
      {/* Landing page */}
      <LoginProvider>
        <GlobalStyleLanding />
        <MainContainer>
          <BlobRight src={Blob} alt="blurry blue ellipse" layout="raw" />
          <BlobLeft src={Blob2} alt="blurry blue ellipse" layout="raw" />
          <Header />
          <DesignBetter />
          <Container>
            <AutomatingCreativity />
            <Fashion />
            <ControlDesign />
            <CreateTogether />
            {currentUser ? <GoToPlatform /> : <JoinCommunity />}
            <Footer />
          </Container>
        </MainContainer>
      </LoginProvider>
    </>
  );
};

export default index;
