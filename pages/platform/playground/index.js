import React, { useState } from 'react';
import Navbar from '../../../components/platform/Navbar';
import Layout from '../../../components/platform/Layout';
import { GlobalStylePlatform } from '../../../styles/globalStyles';
import styled from 'styled-components';
import { db } from '../../../firebase/firebase';
import {
  serverTimestamp,
  doc,
  collection,
  addDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { v4 as uuidV4 } from 'uuid';
import { useProjectContext } from '../../../contexts/ProjectContext';
import {
  addNewDraftFirestore,
  addFileToUserFirestore,
  joinExistingProjectFirestore,
} from '../../../firebase/firebaseFunctions';
import { toast } from 'react-toastify';

const Section = styled.div`
  position: absolute;
  height: 100%;
  width: 92vw;
  top: 0;
  margin-left: 8vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 550px;
  height: 340px;
  border-radius: 40px;
  margin-top: -40px;
  padding: 45px 0;
`;

const Title = styled.h2`
  font-size: 22px;
  text-align: center;
  line-height: 40px;
  color: #333333;

  & span:nth-child(1) {
    font-size: 18px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

const CreateButton = styled.button`
  width: 70%;
  height: 55px;
  background-color: #1a1a1a;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;

  :hover {
    transform: scale(1.01);
  }
`;

const JoinButton = styled.button`
  width: 70%;
  height: 55px;
  background-color: white;
  border: 1px solid #1a1a1a !important;
  color: #1a1a1a !important;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;

  :hover {
    transform: scale(1.01);
  }
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  border-bottom: 1px solid #1a1a1a;
  outline: none;
  font-family: 'Quicksand', sans-serif;
`;

const Error = styled.p`
  background-color: red;
  color: white;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #1a1a1a;
`;

const AddButton = styled.button`
  background-color: transparent;
  color: blue;
`;

const Index = () => {
  const [create, setCreate] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // const { currentProject, setCurrentProject } = useProjectContext()

  // // if the user is working on a project, navigate to project
  // if (currentProject !== null) {
  //     navigateToProject(currentProject)
  // }

  const { currentUser } = useAuth();
  const router = useRouter();
  const { uid } = router.query;

  //
  //
  // UI ->

  const handleCreateNewFile = () => {
    setShowButtons(false);
    setCreate(true);
  };

  const handleJoinProject = () => {
    setShowButtons(false);
    setCreate(false);
  };

  // on cancel, clear error and set show buttons to true
  const handleCancel = () => {
    setShowButtons(true);
    setError('');
    setInputValue('');
  };

  //
  //
  //firestore ->

  // create new project and save it to firestore and navigate to it
  const createNewFile = async () => {
    if (!inputValue) {
      setError('Field Required');
      return;
    }

    try {
      // Add a new document with a generated id
      const docRef = await addNewDraftFirestore(
        inputValue,
        uid,
        currentUser?.email
      );
      // Add file to list of files under user
      // await addFileToUserFirestore(uid, docRef.id)
      // go to file
      // navigateToFile(docRef.id)
      toast.warn('Cannot access drafts. Feature under development!');
      handleCancel();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // join an already existing project and navigate to it
  const joinExistingProject = async () => {
    if (!inputValue) {
      setError('Field Required');
      return;
    }
    // KqgcXM9XPKoIGi2iCx5D
    try {
      const pid = await joinExistingProjectFirestore(
        currentUser.uid,
        currentUser.email,
        inputValue
      );
      router.push('/platform/projects/file?fid=' + inputValue + '&pid=' + pid);
    } catch (e) {
      toast.error(e);
      handleCancel();
    }
  };

  const navigateToFile = (fid) => {
    // console.log('pid value:', pid)
    router.push({
      pathname: '/platform/playground/draft/[fid]',
      query: { fid },
    });
  };

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <Container className="shadow-lg">
          <Title>
            <span>Start Experimenting</span> <br />
            with the <span>GAN Model</span>
          </Title>
          <Error hidden={showButtons}>{error}</Error>
          <Buttons>
            <CreateButton hidden={!showButtons} onClick={handleCreateNewFile}>
              Create Draft File
            </CreateButton>
            <JoinButton hidden={!showButtons} onClick={handleJoinProject}>
              Join Existing File
            </JoinButton>
            <Input
              hidden={showButtons}
              type="text"
              placeholder={create ? 'File Name' : 'File ID'}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <div
              className={`justify-between w-[70%] mt-2 ${
                showButtons ? 'hidden' : 'flex'
              }`}
            >
              <CancelButton onClick={handleCancel}>cancel</CancelButton>
              <AddButton onClick={create ? createNewFile : joinExistingProject}>
                add file
              </AddButton>
            </div>
          </Buttons>
        </Container>
      </Section>
    </>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
