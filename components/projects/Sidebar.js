import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled from 'styled-components';
import { BiTimeFive } from 'react-icons/bi';
import { GrDocumentTime } from 'react-icons/gr';
import FilePreview from './FilePreview';

const Container = styled.div`
  flex: 35%;
  height: 100%;
  // background-color:  #d0d3d4 ;
  background-color: #fdfefe;
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  & span {
    align-self: center;
    width: 75%;
    border-bottom: 2px solid #bdc3c7;
    opacity: 0.4;
  }
`;

const RecentProjects = styled.div`
  flex: 50%;
  padding: 30px 50px;
`;

const RecentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const DraftProjects = styled.div`
  flex: 50%;
  padding: 30px 50px;
`;

const DraftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Sidebar = ({ recentFiles, draftFiles }) => {
  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <RecentProjects>
          <RecentHeader>
            <BiTimeFive size="22px" />
            <h3>Recent Project Files</h3>
          </RecentHeader>
          <Content>
            {recentFiles.map((doc) => (
              <FilePreview
                key={doc.id}
                name={doc.fileName}
                date={doc.dateCreated}
              />
            ))}
          </Content>
        </RecentProjects>
        <span></span>
        <DraftProjects>
          <DraftHeader>
            <GrDocumentTime size="20px" />
            <h3>Draft Files</h3>
          </DraftHeader>
          <Content>
            {draftFiles.map((doc) => (
              <FilePreview
                key={doc.id}
                name={doc.fileName}
                date={doc.dateCreated}
              />
            ))}
          </Content>
        </DraftProjects>
      </Container>
    </>
  );
};

export default Sidebar;
