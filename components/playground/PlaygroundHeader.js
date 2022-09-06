import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import { MdModeEditOutline } from 'react-icons/md';
import styled from 'styled-components';
import UsersOnHover from './UsersOnHover';
import { useRouter } from 'next/router';
import CopyIcon from './CopyIcon';
import { updateFileNameFirestore } from '../../firebase/firebaseFunctions';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1rem;
`;

const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputTitle = styled.input`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  width: fit-content;
  outline: none;

  & :focus {
    border: 1px solid var(--color-blue-primary);
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
`;

const ProjectTitleWrap = styled.div`
  width: max-content;
  min-width: 100px;
`;

const SaveButton = styled.button`
  float: right;
  color: #3f2b96;
  font-weight: bold;
  font-size: 14px;
  margin-top: 0.5rem;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
  }
`;

const CancelButton = styled.button`
  color: #3f2b96;
  font-weight: bold;
  font-size: 14px;
  margin-top: 0.5rem;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
  }
`;

// const AddProjectButton = styled.button`
//     color: white;
//     font-size: 0.9rem;
//     background-color: var(--color-blue-secondary);
//     width: fit-content;
//     padding-inline: 10px;
//     height: 43px;
//     border-radius: 10px;
// `

const PlaygroundHeader = ({ membersInfo, title, isFile }) => {
  // console.log('Title ', title)

  const [fileName, setFileName] = React.useState(title);
  const [updateFileName, setUpdateFileName] = React.useState(false);
  const [tempfileName, setTempFileName] = React.useState('');

  const router = useRouter();
  const fid = router.query.fid;

  // console.log('file ID', fid)

  const titleRef = React.useRef();

  const handleEditButtonClick = () => {
    setTempFileName(fileName);
    setUpdateFileName(true);
    titleRef.current.focus();
  };

  const handleSave = async () => {
    const newName = await updateFileNameFirestore(fid, fileName);
    newName != null ? setFileName(newName) : setFileName(tempfileName);
    setUpdateFileName(false);
  };

  const handleCancel = () => {
    setFileName(tempfileName);
    setUpdateFileName(false);
  };

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <ProjectTitleWrap>
          <ProjectTitle>
            <InputTitle
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={{ width: `${fileName?.toString().length}ch` }}
              readOnly={!updateFileName}
              ref={titleRef}
            />
            <MdModeEditOutline
              className="cursor-pointer"
              size="20px"
              hidden={updateFileName}
              onClick={handleEditButtonClick}
            />
          </ProjectTitle>
          <SaveButton hidden={!updateFileName} onClick={handleSave}>
            save
          </SaveButton>
          <CancelButton hidden={!updateFileName} onClick={handleCancel}>
            cancel
          </CancelButton>
        </ProjectTitleWrap>

        <Toolbar>
          {isFile && (
            <>
              {/* <AddProjectButton>
                        Add to Project
                    </AddProjectButton> */}
              <UsersOnHover membersInfo={membersInfo} />
              <CopyIcon />
            </>
          )}
        </Toolbar>
      </Container>
    </>
  );
};

export default PlaygroundHeader;
