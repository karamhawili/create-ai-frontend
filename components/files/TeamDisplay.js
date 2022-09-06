import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled from 'styled-components';
import { AiOutlineTeam, AiOutlineFile } from 'react-icons/ai';
import UserDisplay from '../users/UserDisplay';
import TimeAgo from 'timeago-react';

const Container = styled.div`
  flex: 35%;
  height: 100%;
  // background-color:  #d0d3d4 ;
  background-color: #fdfefe;
  display: flex;
  flex-direction: column;

  & span {
    align-self: center;
    width: 75%;
    border-bottom: 2px solid #bdc3c7;
    opacity: 0.4;
  }
`;

const UpperSideWrap = styled.div`
  flex: 45%;
  padding: 40px 50px 50px 50px;
`;

const SideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LeftContent = styled.div`
  flex: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.95rem;
`;

const RightContent = styled.div`
  flex: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 25px;
  color: #087387;
  font-size: 1rem;
`;

const LowerSideWrap = styled.div`
  max-height: 55%;
  flex: 55%;
  padding: 40px 50px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-inline: 15px;
`;

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px 5px;
  gap: 8px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: 1px; /* Firefox */
  max-height: 90%;
`;

const TeamDisplay = ({ numberOfProjects, projectData }) => {
  // console.log('Type of date created for project ',projectData.dateCreated, typeof projectData.dateCreated)

  // if projectData, get all keys from membersInfo

  // console.log(projectData.files)

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <UpperSideWrap>
          <SideHeader>
            <AiOutlineFile size="24px" />
            <h3>Project Info</h3>
          </SideHeader>
          <Content>
            <LeftContent>
              <p>Project Name</p>
              <p>Design Files</p>
              <p>Team Members</p>
              <p>Created</p>
            </LeftContent>
            <RightContent>
              <p>{projectData?.projectTitle}</p>
              <p>{numberOfProjects}</p>
              <p>{projectData?.membersID?.length}</p>
              <TimeAgo datetime={projectData?.dateCreated} />
            </RightContent>
          </Content>
        </UpperSideWrap>
        <span></span>
        <LowerSideWrap>
          <SideHeader>
            <AiOutlineTeam size="26px" />
            <h3>Team Members</h3>
          </SideHeader>
          <UsersContainer>
            {Object.keys(projectData?.membersInfo).map((memberID) => (
              <UserDisplay
                key={memberID}
                email={projectData?.membersInfo[memberID].email}
              />
            ))}
          </UsersContainer>
        </LowerSideWrap>
      </Container>
    </>
  );
};

export default TeamDisplay;
