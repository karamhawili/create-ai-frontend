import React, { useState, useEffect } from 'react';
import Layout from '../../../components/platform/Layout';
import Navbar from '../../../components/platform/Navbar';
import PlaygroundHeader from '../../../components/playground/PlaygroundHeader';
import { GlobalStylePlatform } from '../../../styles/globalStyles';
import styled from 'styled-components';
import GeneratedOutput from '../../../components/playground/GeneratedOutput';
import DesignTargets from '../../../components/playground/DesignTargets';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { db } from '../../../firebase/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Backdrop from '../../../components/Backdrop';
import { loadOutput, loadTargets } from '../../../aws/HelperFunctions';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useWorkspaceContext } from '../../../contexts/WorkspaceContext';
import { toast } from 'react-toastify';

const Section = styled.div`
  position: absolute;
  height: 100%;
  width: 92vw;
  top: 0;
  margin-left: 8vw;
  min-height: 700px;
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

const File = ({ fileData, teamMemb }) => {
  console.log('team members unparsed', teamMemb, fileData);

  const data = JSON.parse(fileData);
  const team = JSON.parse(teamMemb);

  const [output, setCurrentOutput] = useState({ image: '', vector: '' }); // object with properties image and vector
  const [targets, setTargetsInfo] = useState([]); // array of objects with properties seed, image, locked
  const [teamMembers, setTeamMembers] = useState(team);
  const [isLoading, setIsLoading] = useState(false);

  const outputRef = React.useRef(output);
  const targetsRef = React.useRef(targets);
  const teamRef = React.useRef(teamMembers);

  const { currentUser } = useAuth();
  const router = useRouter();
  const { fid } = router.query;

  const { currentOutput, currentTargets } = useWorkspaceContext();

  const processOutput = async (vector) => {
    setIsLoading(true);
    try {
      const outputImage = await loadOutput(vector);
      outputRef.current = {
        image: outputImage,
        vector,
      };
      setCurrentOutput({
        image: outputImage,
        vector,
      });
    } catch (e) {
      console.log('Error', e);
    }
    setIsLoading(false);
  };

  const processTargets = async (targetSeeds) => {
    setIsLoading(true);
    try {
      const targetImages = await loadTargets(Object.keys(targetSeeds));
      const targetsInfo = Object.keys(targetSeeds).map((seed, index) => ({
        ...targetSeeds[seed],
        image: targetImages[index],
        seed,
      }));
      targetsRef.current = targetsInfo;
      setTargetsInfo(targetsInfo);
    } catch (e) {
      console.log('Error', e);
    }
    setIsLoading(false);
  };

  const checkIfTargetsChanged = (newTargets) => {
    const fsSeeds = Object.keys(newTargets);
    const userSeeds = targetsRef.current.map((t) => t.seed);

    console.log('fsSeeds', fsSeeds);
    console.log('userSeeds', userSeeds);

    if (fsSeeds.filter((x) => !userSeeds.includes(x)).length === 0)
      return false;

    return true;
  };

  const checkIfOutputChanged = (newOutput) => {
    if (newOutput !== outputRef.current.vector) return true;
    return false;
  };

  const checkIfNoTargets = () => {
    if (targetsRef.current.length === 0) return true;
    return false;
  };

  const checkIfNoOutput = () => {
    if (outputRef.current.vector === '') return true;
    return false;
  };

  useEffect(() => {
    if (data === null) return;

    teamRef.current = team;

    const unsubscribe = onSnapshot(
      doc(db, 'projects', data.projectID),
      (doc) => {
        if (
          Object.keys(doc.data().membersInfo).length !==
          Object.keys(teamRef.current).length
        ) {
          const newM = Object.keys(doc.data().membersInfo);
          const oldM = Object.keys(teamRef.current);
          console.log('newM', newM);
          console.log('oldM', oldM);
          const newMemberID = newM.filter((x) => !oldM.includes(x));
          console.log('newMemberID', newMemberID);
          toast.success(
            doc.data()?.membersInfo[newMemberID]?.email + ' joined the team'
          );
          setTeamMembers(doc.data().membersInfo);
          teamRef.current = doc.data().membersInfo;
        }
      }
    );

    return () => {
      console.log('unsubscribing from projects...');
      unsubscribe();
    };
  }, []);

  useEffect(async () => {
    if (data === null) return;

    if (currentTargets.length !== 0) return;

    if (data?.editedBy === currentUser.uid) {
      try {
        if (data?.output !== '') {
          await processOutput(data?.output);
        }
        if (Object.keys(data?.targetSeeds).length !== 0) {
          await processTargets(data?.targetSeeds);
        }
      } catch (error) {
        toast.warn('Something went wrong, refresh page');
      }
    }

    // subscribe to real time updates
    const unsubscribe = onSnapshot(doc(db, 'files', fid), async (doc) => {
      if (doc?.data().editedBy !== currentUser.uid) {
        console.log('The data was edited by', doc?.data().editedBy);
        try {
          if (doc.data()?.output !== '') {
            if (checkIfNoOutput()) {
              console.log('no current output... generating new output');
              await processOutput(doc.data()?.output);
            } else {
              if (checkIfOutputChanged(doc?.data().output)) {
                console.log('output changed... generating new output');
                await processOutput(doc.data()?.output);
              }
            }
          }
          if (Object.keys(doc.data()?.targetSeeds).length !== 0) {
            if (checkIfNoTargets()) {
              console.log('no current targets... generating new targets');
              await processTargets(doc.data()?.targetSeeds);
            } else {
              // first, check if seeds are still the same
              if (checkIfTargetsChanged(doc.data()?.targetSeeds)) {
                console.log('Targets changed... generating new targets');
                await processTargets(doc.data()?.targetSeeds);
              }
            }
          }
        } catch (error) {
          toast.warn('Something went wrong, refresh page');
        }
      }
    });

    return () => {
      console.log('unsubscribing from files...');
      unsubscribe();
    };
  }, []);

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <Container>
          <Backdrop isOpen={isLoading} />
          {data ? (
            <>
              <HeaderWrapper>
                <PlaygroundHeader
                  isFile="true"
                  title={data?.fileName}
                  membersInfo={teamMembers}
                />
              </HeaderWrapper>

              <Workspace>
                <GeneratedOutput output={output} />
                <DesignTargets targets={targets} />
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

export default File;

export async function getServerSideProps(context) {
  const docRef = doc(db, 'files', context.query.fid);
  const fileSnap = await getDoc(docRef);
  const fileData = fileSnap.exists() ? fileSnap.data() : null;

  const projectRef = doc(db, 'projects', context.query.pid);
  const projectSnap = await getDoc(projectRef);
  const projectData = projectSnap.data();
  const teamMembers = projectData?.membersInfo;

  return {
    props: {
      fileData: JSON.stringify(fileData),
      teamMemb: JSON.stringify(teamMembers),
    }, // will be passed to the page component as props
  };
}

File.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
