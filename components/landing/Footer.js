import React from 'react';
import styled from 'styled-components';
import {
  AiOutlineCopyrightCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiFillGithub,
} from 'react-icons/ai';

const Footers = styled.footer`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3a3a3a;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-left: 2%;

  p {
    display: inline;
    font-size: 18px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
  }
`;

const ContactUs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-right: 2%;

  a {
    cursor: pointer;
  }
`;
const Footer = () => {
  return (
    <Footers>
      <Copyright>
        <AiOutlineCopyrightCircle size={24} />
        <p>### - 2022</p>
      </Copyright>
      <ContactUs>
        <a>
          <AiFillFacebook size={28} />
        </a>
        <a>
          <AiFillTwitterCircle size={28} />
        </a>
        <a>
          <AiOutlineInstagram size={28} />
        </a>
        <a>
          <AiOutlineLinkedin size={28} />
        </a>
        <a>
          <AiFillGithub size={28} />
        </a>
      </ContactUs>
    </Footers>
  );
};

export default Footer;
