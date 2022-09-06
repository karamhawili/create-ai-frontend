import React from 'react';
import styled from 'styled-components';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import { FaSquare } from 'react-icons/fa';
import { useRouter } from 'next/router';
import TimeAgo from 'timeago-react';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f3f4;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  font-family: 'Poppins', sans-serif;
  padding: 20px 20px;
  cursor: pointer;
  transition: 0.3s;

  & :hover {
    background-color: #ffffff;
    border-radius: 10px;
    // box-shadow: 5px 5px 5px 5px rgba(0,0,0,0.05);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  & p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 150px; // some width
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
`;

const ProjectInfo = ({ project }) => {
  const router = useRouter();

  const { currentUser } = useAuth();

  const goToProject = () => {
    router.push(
      '/platform/projects/files?pid=' + project.id + '&uid=' + currentUser.uid
    );
  };

  return (
    <>
      <GlobalStylePlatform />
      <Container onClick={goToProject}>
        <InnerContainer className=" hover:shadow-lg">
          <Title>
            <FaSquare color="#3a8f9f" size="20px" />
            <p>{project?.projectTitle}</p>
          </Title>
          <Info>
            <p>{`${project?.files?.length} files`}</p>
            <p>{`${project?.membersID?.length} Team Members`}</p>
            <TimeAgo datetime={project?.dateCreated} />
          </Info>
        </InnerContainer>
      </Container>
    </>
  );
};

export default ProjectInfo;
