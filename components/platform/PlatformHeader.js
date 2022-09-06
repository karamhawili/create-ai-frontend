import React from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import DropDownMenu from './DropDownMenu';
import { IoSearchOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';
import SelectorDrop from './SelectorDrop';

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
`;

const SearchBar = styled.div`
  width: 480px;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 50px;
  background-color: #f7f9f9;
  padding: 5px 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  background-color: #f7f9f9;
  outline: none;
`;

const AccountButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
`;

const AddProjectButton = styled.button`
  color: white;
  font-size: 0.9rem;
  background-color: var(--color-blue-secondary);
  width: 105px;
  height: 43px;
  border-radius: 10px;
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

const PlatformHeader = () => {
  const router = useRouter();
  const { uid } = router.query;

  const goToPlayground = () => {
    router.push('/platform/playground?uid=' + uid);
  };

  const { currentUser } = useAuth();

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <TitleSearchWrap>
          {/* <p>
                    All Files
                </p> */}
          <SelectorDrop />
          <SearchBar>
            <IoSearchOutline size="20px" color="#747474" />
            <SearchInput placeholder="Search All Files" />
          </SearchBar>
        </TitleSearchWrap>

        <AccountButtonWrap>
          <AddProjectButton onClick={goToPlayground}>
            New Draft
          </AddProjectButton>
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

export default PlatformHeader;
