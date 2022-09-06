import React from 'react';
import styled from 'styled-components';
import ContextMenu from './ContextMenu';
import TimeAgo from 'timeago-react';
import { MdDesignServices } from 'react-icons/md';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 270px;
  height: 230px;
  display: flex;
  flex-direction: column;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  border: 1px solid #d5dbdb;
  border-radius: 11px;
  position: relative;
  cursor: pointer;

  & :hover {
    border: 1px solid rgb(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: #d5dbdb;
  /* background-image: url(${(props) => props.imgURL});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
`;

const LowerPart = styled.div`
  height: 70px;
  width: 100%;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
  align-items: center;
  padding: 6px 20px;
  gap: 20px;
  border-top: 1px solid #d5dbdb;
  background-color: #fff;
`;

const FileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  height: 100%;
  justify-content: space-around;
`;

const TimeLocationWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  gap: 8px;
  color: #616a6b;

  & p {
    max-width: 90px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & span {
    background-color: #616a6b;
    width: 3.5px;
    height: 3.5px;
    border-radius: 50px;
  }
`;

const CardTitle = styled.div``;

const Date = styled(TimeAgo)`
  max-width: 65px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Card = ({ file, location }) => {
  // const date = new window.Date(project.dateCreated).toUTCString()
  const router = useRouter();

  const goToFile = () => {
    location === 'Drafts'
      ? toast.warn('Cannot access Drafts. Feature under development!')
      : router.push(
          '/platform/projects/file?fid=' + file.id + '&pid=' + file.projectID
        );
  };

  return (
    <Container onClick={goToFile} className=" hover:shadow-md  shadow-gray-200">
      <Thumbnail imgURL={file?.thumbnailURL} />
      <LowerPart>
        <MdDesignServices color="black" size="22px" />
        <FileInfoWrap>
          <CardTitle>{file?.fileName}</CardTitle>
          <TimeLocationWrap>
            <p>In {location}</p>
            <span></span>
            <Date datetime={file?.dateCreated} />
          </TimeLocationWrap>
        </FileInfoWrap>
      </LowerPart>
    </Container>
  );
};

export default Card;
