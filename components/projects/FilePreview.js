import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled from 'styled-components';
import TimeAgo from 'timeago-react';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  width: 90%;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  gap: 25px;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0, 0);
  transition: 0.2s;

  & :hover {
    border: 1px solid black;
    color: #283747;
  }
`;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  p {
    max-width: 115px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const Date = styled(TimeAgo)`
  font-size: 0.9rem;
  color: #283747;
  max-width: 90px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const FilePreview = ({ name, date }) => {
  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <MdModeEditOutline size="20px" />
        <SubContainer>
          <p>{name}</p>
          <Date datetime={date} />
        </SubContainer>
      </Container>
    </>
  );
};

export default FilePreview;
