import Layout from '../../../../components/platform/Layout';
import Navbar from '../../../../components/platform/Navbar';
import PlaygroundHeader from '../../../../components/playground/PlaygroundHeader';
import { GlobalStylePlatform } from '../../../../styles/globalStyles';
import styled from 'styled-components';
import GeneratedOutput from '../../../../components/playground/GeneratedOutput';
import DesignTargets from '../../../../components/playground/DesignTargets';
import { AiFillQuestionCircle } from 'react-icons/ai';

const Section = styled.div`
  position: absolute;
  height: 100%;
  width: 92vw;
  top: 0;
  margin-left: 8vw;
`;

const Container = styled.div`
  padding: 40px 80px;
  height: 100%;
  position: relative;
`;

const Workspace = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  justify-content: space-between;
  padding-inline: 70px;
`;

const InfoIcon = styled(AiFillQuestionCircle)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
`;

const Project = () => {
  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <Container>
          <PlaygroundHeader />

          <Workspace>
            <GeneratedOutput />
            <DesignTargets />
          </Workspace>
        </Container>
        <InfoIcon size="40px" />
      </Section>
    </>
  );
};

export default Project;

Project.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
