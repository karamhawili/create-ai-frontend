import styled from 'styled-components';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import { RiArrowDropDownLine } from 'react-icons/ri';
import UserDisplay from '../users/UserDisplay';

const Container = styled.div`
  display: flex;
  height: fit-content;
`;

const Dropdown = styled.div`
  position: relative;
  //display: inline-block;

  & :hover {
    & > div:nth-child(2) {
      display: block;
    }

    /* & > p:first-child {
            color: #1b1b1b;
        } */
  }

  & > div:nth-child(2) {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    background-color: white;
    width: max-content;
    min-width: 180px;
    //box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 40;
    border-radius: 6px;
    border: 1px solid #899099;

    & > p {
      color: #1b1b1b;
      padding: 16px 20px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    & p:hover {
      background-color: #fbfcfc;
    }
  }
`;

const TitleIconContainer = styled.div`
  display: flex;
  align-items: center;

  & > p:first-child {
    color: #0a265b;
    cursor: pointer;
  }
`;

const UsersOnHover = ({ membersInfo }) => {
  const team_members =
    membersInfo === null ? (
      <p key="nomembers">No team members yet</p>
    ) : (
      Object.keys(membersInfo).map((memberID) => (
        <UserDisplay key={memberID} email={membersInfo[memberID].email} />
      ))
    );

  return (
    <Container>
      <GlobalStylePlatform />
      <Dropdown>
        <TitleIconContainer>
          <p>Team Members</p>
          <RiArrowDropDownLine color="#0a265b" size="30px" />
        </TitleIconContainer>
        <div className=" shadow-xl">{team_members}</div>
      </Dropdown>
    </Container>
  );
};

export default UsersOnHover;
