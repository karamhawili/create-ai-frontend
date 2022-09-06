import Layout from '../../../../components/platform/Layout';
import Navbar from '../../../../components/platform/Navbar';
import PlaygroundHeader from '../../../../components/playground/PlaygroundHeader';
import { GlobalStylePlatform } from '../../../../styles/globalStyles';
import styled from 'styled-components';
import GeneratedOutput from '../../../../components/playground/GeneratedOutput';
import DesignTargets from '../../../../components/playground/DesignTargets';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { db } from '../../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

/*
        NOT DONE YET
*
*/

const Section = styled.div`
  position: absolute;
  height: 100%;
  width: 92vw;
  top: 0;
  margin-left: 8vw;
`;

const Container = styled.div`
  height: 100%;
  position: relative;
`;

const HeaderWrapper = styled.div`
  padding: 18px 40px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
`;

const Workspace = styled.div`
  padding-inline: 1rem;
  padding-top: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const InfoIcon = styled(AiFillQuestionCircle)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  color: #1a1a1a;
  width: 100%;
  height: 100%;
`;

const Draft = ({ fileData }) => {
  // if data is null, display a project not found fallback

  const data = JSON.parse(fileData);

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <Container>
          {data ? (
            <>
              <HeaderWrapper>
                <PlaygroundHeader isFile="false" title={data?.fileName} />
              </HeaderWrapper>

              <Workspace>
                <GeneratedOutput output={[]} />
                <DesignTargets targets={[]} />
              </Workspace>
            </>
          ) : (
            <ErrorContainer>
              Either this file does not exist <br />
              or you don't have access to it
            </ErrorContainer>
          )}
        </Container>
        <InfoIcon size="40px" />
      </Section>
    </>
  );
};

export default Draft;

export async function getServerSideProps(context) {
  const docRef = doc(db, 'drafts', context.query.fid);
  const fileSnap = await getDoc(docRef);

  const fileData = fileSnap.exists() ? fileSnap.data() : null;

  return {
    props: {
      fileData: JSON.stringify(fileData),
    }, // will be passed to the page component as props
  };
}

Draft.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
