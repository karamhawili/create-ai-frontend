import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled from 'styled-components';
import ProjectInfo from './ProjectInfo';
import { GiCardboardBox } from 'react-icons/gi';

const Container = styled.div`
  flex: 65%;
  height: 100%;
  padding: 20px 30px;
  background-color: #fdfefe;
`;

const BorderTop = styled.div`
  border-bottom: 1px solid #f0f3f4;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 20px;
  user-select: none;

  p {
    color: #a6acaf;
    text-align: center;
    font-size: 1rem;
    line-height: 1.8rem;

    span {
      color: var(--color-blue-primary);
    }
  }
`;

const ProjectsDisplay = ({ projects }) => {
  // console.log('Projectsssss', projects)

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        {projects.length !== 0 ? (
          <>
            <BorderTop />
            {projects?.map((p) => (
              <ProjectInfo key={p.id} project={p} />
            ))}
          </>
        ) : (
          <EmptyContainer>
            <GiCardboardBox color="#a6acaf" size="80px" />
            <p>
              No projects yet. Start by <br /> clicking the{' '}
              <span>Add Project</span> button above.
            </p>
          </EmptyContainer>
        )}
      </Container>
    </>
  );
};

export default ProjectsDisplay;
