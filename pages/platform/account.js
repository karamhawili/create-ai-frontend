import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import AccountHeader from '../../components/platform/AccountHeader';
import { MdModeEditOutline } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/platform/Layout';
import Navbar from '../../components/platform/Navbar';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  setUserFullNameFirestore,
  setUserJobTitleFirestore,
} from '../../firebase/firebaseFunctions';

const Section = styled.div`
  position: absolute;
  // height: 100vh;
  width: 84vw;
  top: 0;
  margin-left: 16vw;
  height: 100%;
  background-color: #fdfefe;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  padding: 10px 40px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 15%;
  padding-inline: 20px;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 50%;
`;

const SubRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 50%;
`;

const SubLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MainText = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const Description = styled.div`
  width: 400px;
  font-size: 16px;
`;

const SubText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 2rem;
`;

const Border = styled.div`
  width: 350px;
  height: 50px;
  border-radius: 50px;
  outline: none;
  padding: 10px 20px;
  border: 1px solid #777777;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditIcon = styled.i`
  float: right;
  cursor: pointer;
`;

const Password = styled.div`
  width: 350px;
`;

const ChangePassword = styled.button`
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

const NameJobContainer = styled.div`
  width: 350px;
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

const Account = ({ userData }) => {
  console.log(userData);

  const user = JSON.parse(userData);

  const [update, setUpdate] = useState(false);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(user?.fullName);
  const [jobTitle, setJobTitle] = useState(user?.jobTitle);
  const [updateFullName, setUpdateFullName] = useState(false);
  const [updateJobTitle, setUpdateJobTitle] = useState(false);
  const [tempNameState, setTempNameState] = useState('');
  const [tempJobState, setTempJobState] = useState('');

  const { currentUser, updatePassword } = useAuth();

  const passRef = useRef();
  const fullNameRef = useRef();
  const jobTitleRef = useRef();

  React.useEffect(async () => {
    // const userRef = doc(db, 'users', currentUser.uid);
    // const userSnap = await getDoc(userRef);
    // setFullName(userSnap.data().fullName)
    // setJobTitle(userSnap.data().jobTitle)
  }, []);

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePassword = () => {
    setUpdate(!update);
    passRef.current.focus();
  };

  const handleUpdatePassword = async () => {
    if (password.length < 8) {
      alert('Cannot update. Password must be at least 8 characters long.');
      return;
    }

    // password is of valid length
    try {
      await updatePassword(password);
      alert('Password updated');
      setPassword('');
      setUpdate(false);
    } catch (error) {
      alert('Failed to update password');
      console.log('Error updating pass: ', error);
      setPassword('');
      setUpdate(false);
    }
  };

  const handleCancel = () => {
    console.log('cancelling....');
    setPassword('');
    setUpdate(false);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleJobTitle = (e) => {
    setJobTitle(e.target.value);
  };

  const handleEditButtonClick = (x) => {
    if (x === 'name') {
      setTempNameState(fullName);
      setUpdateFullName(true);
      fullNameRef.current?.focus();
    } else {
      setTempJobState(jobTitle);
      setUpdateJobTitle(true);
      jobTitleRef.current?.focus();
    }
  };

  const handleUpdateCancel = (x) => {
    if (x === 'name') {
      setFullName(tempNameState);
      setTempNameState('');
      setUpdateFullName(false);
    } else {
      setJobTitle(tempJobState);
      setTempJobState('');
      setUpdateJobTitle(false);
    }
  };

  const saveToDB = async (x) => {
    if (x === 'name') {
      setUserFullNameFirestore(currentUser?.uid, fullName);
      setUpdateFullName(false);
      setTempNameState('');
    } else {
      setUserJobTitleFirestore(currentUser?.uid, jobTitle);
      setUpdateJobTitle(false);
      setTempJobState('');
    }
  };

  console.log('Rendering Account');

  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <IconContext.Provider value={{ color: 'black', size: '40px' }}>
          <Container>
            {/* Page Header */}
            <Header>
              <AccountHeader />
            </Header>
            {/* End of Page Header */}

            {/* Page body */}
            <Body>
              <IconContext.Provider value={{ color: '#2d2d2d', size: '20px' }}>
                {/* Profile Section */}
                <LeftContainer>
                  <SubLeftContainer>
                    <MainText>Profile</MainText>
                    <Description>
                      This information will be displayed publicly
                    </Description>

                    <NameJobContainer>
                      <SubText>Full Name</SubText>

                      <Border>
                        <input
                          name="FullNameTB"
                          placeholder="Set Full Name"
                          className="profile-input"
                          readOnly={!updateFullName}
                          value={fullName}
                          onChange={handleFullName}
                          ref={fullNameRef}
                        />
                        <EditIcon
                          hidden={updateFullName}
                          onClick={() => handleEditButtonClick('name')}
                        >
                          <MdModeEditOutline />
                        </EditIcon>
                      </Border>

                      <SaveButton
                        onClick={() => saveToDB('name')}
                        hidden={!updateFullName}
                      >
                        save
                      </SaveButton>

                      <CancelButton
                        onClick={() => handleUpdateCancel('name')}
                        hidden={!updateFullName}
                        type="button"
                      >
                        cancel
                      </CancelButton>
                    </NameJobContainer>

                    <NameJobContainer>
                      <SubText>Job Title</SubText>
                      <Border>
                        <input
                          name="JobTitleTB"
                          placeholder="Set Job Title"
                          className="profile-input"
                          readOnly={!updateJobTitle}
                          value={jobTitle}
                          onChange={handleJobTitle}
                          ref={jobTitleRef}
                        />
                        <EditIcon
                          hidden={updateJobTitle}
                          onClick={() => handleEditButtonClick('cancel')}
                        >
                          <MdModeEditOutline />
                        </EditIcon>
                      </Border>

                      <SaveButton
                        onClick={() => saveToDB('cancel')}
                        hidden={!updateJobTitle}
                      >
                        save
                      </SaveButton>

                      <CancelButton
                        onClick={() => handleUpdateCancel('cancel')}
                        hidden={!updateJobTitle}
                        type="button"
                      >
                        cancel
                      </CancelButton>
                    </NameJobContainer>
                  </SubLeftContainer>
                </LeftContainer>

                {/* Account Section */}
                <RightContainer>
                  <SubRightContainer>
                    <MainText>Account</MainText>
                    <Description>
                      This information will not be displayed publicly
                    </Description>

                    <SubText>Email Address</SubText>
                    <input
                      name="EmailAddressTB"
                      value={currentUser && currentUser.email}
                      className="account-input"
                      readOnly
                    />

                    <SubText>Password</SubText>
                    <Password>
                      <input
                        name="PasswordTB"
                        placeholder="************"
                        value={password}
                        onChange={handleInputPassword}
                        type="password"
                        className="account-input"
                        readOnly={!update}
                        ref={passRef}
                      />
                      <ChangePassword
                        onClick={
                          update ? handleUpdatePassword : handleChangePassword
                        }
                        type="button"
                      >
                        {update ? 'Update Password' : 'Change Password'}
                      </ChangePassword>
                      <CancelButton
                        type="button"
                        onClick={handleCancel}
                        hidden={!update}
                      >
                        Cancel
                      </CancelButton>
                    </Password>
                  </SubRightContainer>
                </RightContainer>
              </IconContext.Provider>
            </Body>
            {/*End of  Page body */}
          </Container>
        </IconContext.Provider>
      </Section>
    </>
  );
};

export default Account;

export async function getServerSideProps(context) {
  const docRef = doc(db, 'users', context.query.uid);
  const userData = (await getDoc(docRef)).data();

  return {
    props: {
      userData: JSON.stringify(userData),
    }, // will be passed to the page component as props
  };
}

Account.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
