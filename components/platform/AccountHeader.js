import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import DropDownMenu from './DropDownMenu';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1rem;
`;

const TitleSearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  & p {
    color: #34495e;
    font-weight: 500;
  }
`;

const AccountButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
`;

const UserIcon = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const Account = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-family: 'Poppins', sans-serif;
`;

const AccountHeader = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <TitleSearchWrap>
          <p>User Account</p>
        </TitleSearchWrap>

        <AccountButtonWrap>
          <Account>
            <p>
              {currentUser &&
                currentUser.email.substring(
                  0,
                  currentUser.email.lastIndexOf('@')
                )}
            </p>
            <IconContext.Provider value={{ color: '#3D3D3D', size: '32px' }}>
              <UserIcon>
                <DropDownMenu />
              </UserIcon>
            </IconContext.Provider>
          </Account>
        </AccountButtonWrap>
      </Container>
    </>
  );
};

export default AccountHeader;
