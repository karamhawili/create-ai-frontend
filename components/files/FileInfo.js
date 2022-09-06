import React from 'react';
import styled from 'styled-components';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import { FaCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import TimeAgo from 'timeago-react';

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f3f4;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 50px;
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
  gap: 50px;

  & p {
    font-weight: 400;
    font-size: 0.9rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 200px; // some width
  }

  & span {
  }
`;

const Date = styled(TimeAgo)`
  font-weight: 300;
  margin-left: 10px;
  color: #283747;
`;

const FileInfo = ({ file }) => {
  const router = useRouter();
  const pid = router.query.pid;

  const goToFile = () => {
    router.push('/platform/projects/file?fid=' + file.id + '&pid=' + pid);
  };

  // console.log('Type of last created: ', file.dateCreated, typeof file.dateCreated)

  return (
    <>
      <GlobalStylePlatform />
      <Container onClick={goToFile}>
        <InnerContainer className=" hover:shadow-lg">
          <Title>
            <FaCircle color="#3EAFA9" size="20px" />
            <p>{file.fileName}</p>
          </Title>
          <Info>
            <p>
              created: <Date datetime={file.dateCreated} />
            </p>
            <p>
              last edited: <Date datetime={file.lastEdited} />
            </p>
          </Info>
        </InnerContainer>
      </Container>
    </>
  );
};

export default FileInfo;
