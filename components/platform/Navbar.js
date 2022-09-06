import React from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import Logo1 from '../../public/landing_illustrations/Logo.svg';
import styled, { css } from 'styled-components';
import { navItems } from './NavbarItems';
import NavLink from './NavLink';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoExitOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

const Section = styled.div(
  (props) => css`
    width: 16vw;
    height: 100vh;
    min-height: 350px;
    min-width: 100px;
    background-color: var(--bg-color-navbar);
    color: white;
    user-select: none;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 80px;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;

    ${props.isPlayground &&
    css`
      width: 8vw !important;
    `}
  `
);

const Navigation = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 1vw;
  flex-direction: column;
  align-items: center;
  gap: 38px;

  a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
  }
`;

const Items = styled.div(
  (props) => css`
    width: 100%;
    height: 55px;
    transition: 1s;

    ${props.isPlayground &&
    css`
      width: 65px;
    `}

    @media (max-width: 1000px) {
      width: 65px;
    }
  `
);

const Item = styled.div(
  (props) => css`
    width: 100%;
    height: 100%;
    padding-left: 1.5vw;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2vw;
    cursor: pointer;

    // prevent text from wrapping
    white-space: nowrap;
    overflow: hidden;

    ${props.isPlayground &&
    css`
      justify-content: center;
      padding-left: 0;
    `}

    @media (max-width: 1000px) {
      justify-content: center;
      padding-left: 0;
    }

    &:hover {
      transform: scale(1.01);
      font-weight: 500;
    }

    &[aria-current] {
      background-color: #ffffff33;
      border-radius: 10px;
    }
  `
);

const ItemOuter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 50px;
`;

const Title = styled.span(
  (props) => css`
    ${props.isPlayground &&
    css`
      display: none;
    `}
    @media (max-width: 1000px) {
      display: none;
    }
  `
);

const LogoutWrap = styled.div`
  width: 100%;
  padding: 0 1vw;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Navbar = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // back to landing page
    } catch (error) {
      console.log(error);
    }
    console.log('User pressed the logout button');
  };

  console.log('Rendering Navbar');
  console.log('Current path from navbar pov ', router.asPath);

  let isPlayground = false;
  if (
    router.asPath.includes('/playground') ||
    router.asPath.includes('/file?')
  ) {
    isPlayground = true;
  }

  return (
    <Section isPlayground={isPlayground}>
      <IconContext.Provider value={{ className: 'navbar-icons' }}>
        <Logo src={Logo1} alt="logo" layout="raw" />

        <Navigation>
          {navItems.map((item) => {
            return (
              <Items key={item.id} isPlayground={isPlayground}>
                <ItemOuter>
                  <NavLink href={item.path + currentUser?.uid}>
                    <Item isPlayground={isPlayground}>
                      {item.icon}
                      <Title isPlayground={isPlayground}>{item.title}</Title>
                    </Item>
                  </NavLink>
                </ItemOuter>
              </Items>
            );
          })}
        </Navigation>

        <LogoutWrap onClick={handleLogout}>
          <Items isPlayground={isPlayground}>
            <ItemOuter>
              <Item isPlayground={isPlayground}>
                <IoExitOutline />
                <Title isPlayground={isPlayground}>Logout</Title>
              </Item>
            </ItemOuter>
          </Items>
        </LogoutWrap>
      </IconContext.Provider>
    </Section>
  );
};

export default Navbar;
