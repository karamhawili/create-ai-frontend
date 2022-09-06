import React from 'react';
import { GlobalStylePlatform } from '../../../styles/globalStyles';
import styled from 'styled-components';
import Layout from '../../../components/platform/Layout';
import Navbar from '../../../components/platform/Navbar';
import ProjectsHeader from '../../../components/projects/ProjectsHeader';
import Sidebar from '../../../components/projects/Sidebar';
import ProjectsDisplay from '../../../components/projects/ProjectsDisplay';
import { useRouter } from 'next/router';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { DialogProvider } from '../../../contexts/DialogContext';
import ModalDialog from '../../../components/dialogs/ModalDialog';

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

const ProjectsheaderWrap = styled.div`
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

const Projects = ({ projects, recentFiles, draftFiles }) => {
  /*

    const ref = firestore.doc('items/foo')
    const [item] = useDocumentData(ref)

    return (
      <div>
        { (item ?? props.item).title }
      </div>
    )

  */

  const router = useRouter();
  const { uid } = router.query;

  const userRecent = JSON.parse(recentFiles);
  const userDraft = JSON.parse(draftFiles);

  const [userProjects, setUserProjects] = React.useState(JSON.parse(projects));

  React.useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('membersID', 'array-contains', uid),
      orderBy('dateCreated', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects = [];

      querySnapshot.forEach((doc) =>
        projects.push({
          id: doc.id,
          ...doc.data(),
          dateCreated:
            doc.data().dateCreated === null
              ? ''
              : doc.data().dateCreated.toDate(),
        })
      );
      console.log('Captured some new data, modifying userProjects...');
      setUserProjects(projects);
    });

    return () => {
      console.log('unsubscribing...');
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    console.log(
      'Either first render or project data has changed',
      userProjects
    );
  }, [userProjects]);

  console.log('Data', userProjects, userRecent, userDraft);

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <DialogProvider>
          <Container>
            <ProjectsheaderWrap>
              <ProjectsHeader />
            </ProjectsheaderWrap>

            <MainContentWrap>
              <ProjectsDisplay projects={userProjects} />
              <Sidebar recentFiles={userRecent} draftFiles={userDraft} />
            </MainContentWrap>

            <ModalDialog context="project" />
          </Container>
        </DialogProvider>
      </Section>
    </>
  );
};

export default Projects;

export async function getServerSideProps(context) {
  // get all projects where user with uid is a member
  const q = query(
    collection(db, 'projects'),
    where('membersID', 'array-contains', context.query.uid),
    orderBy('dateCreated', 'desc')
  );
  const projectsSnap = await getDocs(q);
  const projects = projectsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    dateCreated: doc.data().dateCreated.toDate(),
  }));

  // get all project IDs
  const projectIDs = projectsSnap.docs.map((doc) => doc.id);

  // get the 3 recent files under these projects
  // since the user is a member of these projects, this means he has access to all their files
  let recentFiles = [];
  if (projectIDs.length !== 0) {
    const q2 = query(
      collection(db, 'files'),
      where('projectID', 'in', projectIDs),
      orderBy('dateCreated', 'desc'),
      limit(3)
    );
    const recentFilesSnap = await getDocs(q2);
    recentFiles = recentFilesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dateCreated: doc.data().dateCreated.toDate(),
    }));
  }

  // get all drafts where admin.ID == uid
  const q3 = query(
    collection(db, 'drafts'),
    where('admin.ID', '==', context.query.uid),
    orderBy('dateCreated', 'desc'),
    limit(3)
  );
  const draftFilesSnap = await getDocs(q3);
  const draftFiles = draftFilesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    dateCreated: doc.data().dateCreated.toDate(),
  }));

  return {
    props: {
      projects: JSON.stringify(projects),
      recentFiles: JSON.stringify(recentFiles),
      draftFiles: JSON.stringify(draftFiles),
    }, // will be passed to the page component as props
  };
}

Projects.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
