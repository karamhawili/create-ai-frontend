import React from 'react';
import styled from 'styled-components';
import PlatformHeader from '../../components/platform/PlatformHeader';
import { IoAdd } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import Card from '../../components/platform/Card';
import { CardData } from '../../components/platform/CardData';
import Layout from '../../components/platform/Layout';
import Navbar from '../../components/platform/Navbar';
import { GlobalStylePlatform } from '../../styles/globalStyles';

const Section = styled.div`
  position: absolute;
  width: 84vw;
  top: 0;
  margin-left: 15vw;
`;

const Container = styled.div`
  width: 75vw;
  margin-left: 8vw;
  margin-top: 40px;
  position: relative;
`;
const Header = styled.header`
  width: 100%;
  height: fit-content;
`;
const Body = styled.div`
  width: fit-content;
  padding: 10px;
  height: 80vh;
  overflow-y: scroll;
  margin-top: 4vh;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SavedCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 3rem 5rem;
`;

const Button = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 30px;

  &:hover {
    transform: translateY(-1rem);
  }
`;

const SavedWork = () => {
  return (
    <>
      <GlobalStylePlatform />
      <Section>
        <IconContext.Provider value={{ color: 'white', size: '60px' }}>
          <Container>
            <Header>
              <PlatformHeader />
            </Header>

            <Body>
              {/* all cards will go inside SavedCards */}
              <SavedCards>
                {CardData.map((project) => (
                  <Card key={project.id} project={project} />
                ))}
              </SavedCards>
              <Button>
                <IoAdd />
              </Button>
            </Body>
          </Container>
        </IconContext.Provider>
      </Section>
    </>
  );
};

export default SavedWork;

SavedWork.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
