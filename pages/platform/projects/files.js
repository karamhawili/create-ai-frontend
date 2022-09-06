import React from 'react';
import FilesDisplay from '../../../components/files/FilesDisplay';
import FilesHeader from '../../../components/files/FilesHeader';
import TeamDisplay from '../../../components/files/TeamDisplay';
import Layout from '../../../components/platform/Layout';
import Navbar from '../../../components/platform/Navbar';
import { GlobalStylePlatform } from '../../../styles/globalStyles';
import styled from 'styled-components';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import ModalDialog from '../../../components/dialogs/ModalDialog';
import { DialogProvider } from '../../../contexts/DialogContext';
import { useRouter } from 'next/router';

const Section = styled.div`
  position: absolute;
  // height: 100vh;
  width: 84vw;
  top: 0;
  margin-left: 16vw;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const FilesheaderWrap = styled.div`
  padding: 10px 40px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const MainContentWrap = styled.div`
  display: flex;
  padding-top: 65px;
  height: 100%;
`;

const Files = ({ files, projectData }) => {
  const data = JSON.parse(projectData);

  const router = useRouter();
  const { pid } = router.query;

  const [projectFiles, setProjectFiles] = React.useState(JSON.parse(files));

  React.useEffect(() => {
    const q = query(
      collection(db, 'files'),
      where('projectID', '==', pid),
      orderBy('dateCreated', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const files = [];

      querySnapshot.forEach((doc) =>
        files.push({
          id: doc.id,
          ...doc.data(),
          dateCreated:
            doc.data().dateCreated === null
              ? ''
              : doc.data().dateCreated.toDate(),
          lastEdited:
            doc.data().lastEdited === null
              ? ''
              : doc.data().lastEdited.toDate(),
        })
      );
      console.log('Captured some new data, modifying projectFiles...');
      setProjectFiles(files);
    });

    return () => {
      console.log('unsubscribing...');
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    console.log('Either first render or files have changed', projectFiles);
  }, [projectFiles]);

  return (
    <div>
      <GlobalStylePlatform />
      <Section>
        <DialogProvider>
          <Container>
            <FilesheaderWrap>
              <FilesHeader title={data?.projectTitle} />
            </FilesheaderWrap>

            <MainContentWrap>
              <FilesDisplay files={projectFiles} />
              <TeamDisplay
                numberOfProjects={projectFiles.length}
                projectData={data}
              />
            </MainContentWrap>

            <ModalDialog context="file" />
          </Container>
        </DialogProvider>
      </Section>
    </div>
  );
};

export default Files;

export async function getServerSideProps(context) {
  // get all files where projectID = pid
  const q = query(
    collection(db, 'files'),
    where('projectID', '==', context.query.pid),
    orderBy('dateCreated', 'desc')
  );
  const filesSnap = await getDocs(q);
  const files = filesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    dateCreated: doc.data().dateCreated.toDate(),
    lastEdited: doc.data().lastEdited.toDate(),
  }));

  // get project info
  const docRef = doc(db, 'projects', context.query.pid);
  const docSnap = await getDoc(docRef);
  const projectData = {
    ...docSnap.data(),
    dateCreated: docSnap.data().dateCreated.toDate(),
  };

  return {
    props: {
      files: JSON.stringify(files),
      projectData: JSON.stringify(projectData),
    }, // will be passed to the page component as props
  };
}

Files.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
