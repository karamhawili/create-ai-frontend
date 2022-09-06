import React, { useState } from 'react';
import Logo from '../../public/landing_illustrations/Logo.svg';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-scroll';
import { useLoginContext } from '../../contexts/LoginContext';
import Image from 'next/image';
import { handleLogoutFirestore } from '../../firebase/firebaseFunctions';

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 20px 50px;
  user-select: none;
  background-color: rgba(0, 0, 0, 0);
  color: white;
`;

const Logos = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    font-size: 1.6rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    //color: white;

    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const LogoImage = styled(Image)`
  width: 40px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;

  & p {
    font-size: 1.3rem;
  }
`;

const Login = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
`;

const Button = styled.button`
  width: 125px;
  height: 58px;
  background-color: var(--color-blue-secondary);
  font-size: 1.2rem;
`;

const Header = () => {
  // console.log('Rendering header')

  const { logout, currentUser } = useAuth();
  const { setLogin } = useLoginContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert(error);
    }
  };

  // console.log('isLogin in header', isLogin)

  return (
    <Headers>
      <Logos>
        <LogoImage
          src={Logo}
          alt="ellipse with pink and yellow stroke"
          layout="raw"
        />
        <p>create.ai</p>
      </Logos>

      {currentUser ? (
        <Nav>
          <p>
            {currentUser.email.substring(0, currentUser.email.lastIndexOf('@'))}
          </p>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      ) : (
        <Nav>
          <Link
            to="JoinCommunity"
            smooth={true}
            duration={500}
            spy={true}
            offset={50}
          >
            <Login onClick={() => setLogin(true)}>Login</Login>
          </Link>
          <Link
            to="JoinCommunity"
            smooth={true}
            duration={500}
            spy={true}
            offset={50}
          >
            <Button onClick={() => setLogin(false)}>Sign Up</Button>
          </Link>
        </Nav>
      )}
    </Headers>
  );
};

export default Header;
