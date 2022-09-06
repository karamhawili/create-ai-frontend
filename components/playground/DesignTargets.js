import React, { useEffect, useState } from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled, { css } from 'styled-components';
import DesignTarget from './DesignTarget';
import { BsCloudUploadFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { addDesignTargetsFirestore } from '../../firebase/firebaseFunctions';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { shuffleTargets } from '../../aws/HelperFunctions';
import { MoonLoader } from 'react-spinners';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: calc(30vw * 1.5 + 10px);
  height: 100%;
  margin: 35px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
`;

const UploadButton = styled.button`
  color: var(--color-blue-primary) !important;
  background-color: white;
  font-size: 1rem !important;
`;

const DesignTargetsGrid = styled.div`
  height: 30vw;
  width: 100%;
  /* place-items: center;
    align-content: stretch;     */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 20px 20px;
`;

const DesignTargetsEmpty = styled.div`
  height: 30vw;
  width: 100%;
  border: 1px dashed #929aa4;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  cursor: pointer;

  & p {
    padding-inline: 20px;
    line-height: 2em;
    color: #626567;

    & span {
      color: var(--color-blue-primary);
    }
  }

  & :hover {
    border: 1px solid #c2cdda;
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const GhostBtn = styled.button`
  width: 120px;
  height: 55px;
  cursor: auto;
`;

const Backdrop = styled.div(
  (props) => css`
    width: calc(30vw * 1.5 + 10px);
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
    background-color: rgba(255, 255, 255, 0.4);
    display: none;
    visibility: hidden;
    border-radius: 20px;

    ${props.open &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: visible;
    `}
  `
);

const DesignTargets = ({ targets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { fid } = router.query;

  const { currentUser } = useAuth();

  const { currentTargets, setTargets } = useWorkspaceContext();

  useEffect(() => {
    setTargets(targets);
  }, [targets]);

  const handleShuffleTargets = async () => {
    try {
      setIsLoading(true);
      const result = await shuffleTargets(currentTargets);
      const images = result.images;
      const seeds = result.seeds;

      console.log('seeds', seeds);
      console.log('Number of images sent from lambda', images.length);
      console.log('Current targets before hitting the button');

      // update seeds and images inside currentTargets
      const targetsCopy =
        currentTargets.length !== 0
          ? currentTargets.map((target) => {
              if (target.locked) return target;

              const newTarget = {
                image: images.pop(),
                seed: seeds.pop().toString(),
                locked: false,
              };
              console.log('Popped 1 image. Left: ', images.length);
              return newTarget;
            })
          : images.map((image, index) => ({
              image,
              seed: seeds[index].toString(),
              locked: false,
            }));

      console.log('targetsCopy after coping everything', targetsCopy);

      // add them to firebase
      try {
        console.log('sending thed ata to firestore');
        await addDesignTargetsFirestore(fid, targetsCopy, currentUser.uid);
      } catch (e) {
        console.log('error', e);
      }

      setTargets(targetsCopy);
      setIsLoading(false);
    } catch (e) {
      console.log('error', e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <Backdrop open={isLoading}>
          <MoonLoader size={30} margin={2} color="#0E37AF" />
        </Backdrop>
        <Header>
          <Title>Design Targets</Title>
          <UploadButton type="button" onClick={handleShuffleTargets}>
            Shuffle targets
          </UploadButton>
        </Header>
        {currentTargets?.length !== 0 ? (
          <DesignTargetsGrid>
            {currentTargets?.map((target) => (
              <DesignTarget
                key={target.seed}
                image={target.image}
                seed={target.seed}
                locked={target.locked}
              />
            ))}
          </DesignTargetsGrid>
        ) : (
          <DesignTargetsEmpty className=" select-none">
            <BsCloudUploadFill size="100px" color="#00A5E8" />
            <p>
              Design Targets are used to steer the final output. Start by
              clicking on <span>Shuffle Targets</span>.
            </p>
          </DesignTargetsEmpty>
        )}

        <ButtonsWrap>
          <GhostBtn />
        </ButtonsWrap>
      </Container>
    </>
  );
};

export default DesignTargets;
