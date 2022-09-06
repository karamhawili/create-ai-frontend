import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import PlatformHeader from '../../components/platform/PlatformHeader';
import Card from '../../components/platform/Card';
// import { CardData } from '../../components/platform/CardData';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '../../components/platform/Navbar';
import Layout from '../../components/platform/Layout';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import Head from 'next/head';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { GiCardboardBox } from 'react-icons/gi';
import {
  FilesTypeProvider,
  useFilesTypeContext,
} from '../../contexts/FilesTypeContext';

const Section = styled.div`
  position: absolute;
  // height: 100vh;
  width: 84vw;
  top: 0;
  margin-left: 16vw;
  height: 100%;
  background-color: #fdfefe;
`;

const Container = styled.div(
  (props) => css`
    position: relative;
    width: 100%;
    height: 100%;
  `
);

const Header = styled.header`
  padding: 10px 40px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const Body = styled.div(
  (props) => css`
    width: 100%;
    padding-top: 85px;
    padding-bottom: 10px;
    padding-inline: 30px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
      display: none;
    }

    ${props.isEmpty &&
    css`
      height: 80%;
    `}
  `
);

const SavedCards = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  align-content: stretch;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  grid-gap: 32px 32px;
`;

const NoProjectsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  user-select: none;

  p {
    color: #a6acaf;
    text-align: center;
    font-size: 1.1rem;
  }
`;

const Home = ({ files, drafts, projects }) => {
  files = JSON.parse(files);
  drafts = JSON.parse(drafts);
  projects = JSON.parse(projects);

  console.log('projects', projects);
  console.log('files', files);
  console.log('drafts', drafts);

  // redirect to home page if user is null
  const router = useRouter();
  const { currentUser } = useAuth();

  const { filesType } = useFilesTypeContext();

  const isTypeDrafts = filesType === 'draftFiles' ? true : false;
  const currentFiles = isTypeDrafts ? drafts : files;

  const { uid } = router.query;
  console.log('uid   ', uid);

  // redirect to landing page if user not logged in
  if (!currentUser) {
    router.push('/');
    return null;
  }

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <IconContext.Provider value={{ color: 'white', size: '60px' }}>
          <Container>
            <Header>
              <PlatformHeader />
            </Header>

            <Body isEmpty={currentFiles.length == 0 ? true : false}>
              {/* all cards will go inside SavedCards */}
              {currentFiles.length == 0 ? (
                <NoProjectsContainer>
                  <GiCardboardBox color="#a6acaf" size="100px" />
                  <p>No {isTypeDrafts ? 'drafts' : 'projects'} yet</p>
                </NoProjectsContainer>
              ) : (
                <SavedCards>
                  {currentFiles?.map((file) => (
                    <Card
                      key={file.id}
                      file={file}
                      location={
                        isTypeDrafts ? 'Drafts' : projects[file.projectID].title
                      }
                    />
                  ))}
                </SavedCards>
              )}
            </Body>
          </Container>
        </IconContext.Provider>
      </Section>
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  // first, get all projects where user is team member
  const qProjects = query(
    collection(db, 'projects'),
    where('membersID', 'array-contains', context.query.uid)
  );
  const projectsSnap = await getDocs(qProjects);
  const projectsID = projectsSnap.docs.map((doc) => doc.id);
  const projectsTitle = projectsSnap.docs.map((doc) => doc.data().projectTitle);

  // build projects object
  let projects = {};
  for (let i = 0; i < projectsID.length; i++) {
    projects[projectsID[i]] = {
      title: projectsTitle[i],
    };
  }

  // if there are projects, get the files
  let files = [];
  if (projectsID.length !== 0) {
    // get all files where pid in projectsID; if a user exists in a project, he has access to all the files
    const qFiles = query(
      collection(db, 'files'),
      where('projectID', 'in', projectsID),
      orderBy('lastEdited', 'desc')
    );
    const filesSnap = await getDocs(qFiles);
    files = filesSnap.docs.map((doc) => ({
      id: doc.id,
      projectID: doc.data().projectID,
      fileName: doc.data().fileName,
      dateCreated: doc.data().dateCreated.toDate(),
      lastEdited: doc.data().lastEdited.toDate(),
    }));
  }

  // get all drafts where admin.ID == uid
  const qDrafts = query(
    collection(db, 'drafts'),
    where('admin.ID', '==', context.query.uid),
    orderBy('lastEdited', 'desc')
  );
  const draftsSnap = await getDocs(qDrafts);
  const drafts = draftsSnap.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName,
    dateCreated: doc.data().dateCreated.toDate(),
    lastEdited: doc.data().lastEdited.toDate(),
  }));

  return {
    props: {
      projects: JSON.stringify(projects),
      drafts: JSON.stringify(drafts),
      files: JSON.stringify(files),
    }, // will be passed to the page component as props
  };
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
