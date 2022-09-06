import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled, { css } from 'styled-components';
import { IoIosLock, IoIosUnlock } from 'react-icons/io';
import Image from 'next/image';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { interpolate } from '../../aws/HelperFunctions';
import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useAuth } from '../../contexts/AuthContext';
import { updateOutputFirestore } from '../../firebase/firebaseFunctions';

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px dashed #929aa4;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  & :hover {
    border: 1px solid #c2cdda;
    & > :first-child {
      display: block;
      visibility: visible;
    }
  }
`;

const UnlockedBtn = styled(IoIosUnlock)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 30;
  cursor: pointer;
  color: #1b1b1b;

  & :hover {
    color: #444444;
  }
`;

const LockedBtn = styled(IoIosLock)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 30;
  cursor: pointer;
  color: #1b1b1b;

  & :hover {
    color: #444444;
  }
`;

const GeneratedImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const Backdrop = styled.div(
  (props) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
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

const DesignTarget = ({ image, seed, locked }) => {
  const { currentOutput, setOutput, currentTargets, setTargets } =
    useWorkspaceContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { fid } = router.query;
  const { currentUser } = useAuth();

  const handleTargetClick = async () => {
    try {
      setIsLoading(true);
      console.log('Interpolating', currentOutput?.vector, seed);
      const result = await interpolate(currentOutput?.vector, seed);
      await updateOutputFirestore(result.z_out, fid, currentUser.uid);
      setOutput({
        image: result.output,
        vector: JSON.stringify(result.z_out),
      });
      setIsLoading(false);
    } catch (e) {
      console.log('error', e);
      setIsLoading(false);
    }
  };

  const updateLockValue = async () => {
    // update context value and UI
    const targetsCopy = [];
    currentTargets.forEach((element) => {
      if (element.seed === seed) {
        element.locked = !locked;
      }
      targetsCopy.push(element);
    });
    setTargets(targetsCopy);

    // update lock value of target in firestore
    const fileRef = doc(db, 'files', fid);
    try {
      await updateDoc(fileRef, {
        [`targetSeeds.${seed}.locked`]: !locked,
      });
    } catch (error) {
      console.error('Error writing to DB', error);
    }
  };

  return (
    <>
      <GlobalStylePlatform />
      <ImageWrapper>
        {locked ? (
          <LockedBtn className="block" size="50px" onClick={updateLockValue} />
        ) : (
          <UnlockedBtn
            className="hidden invisible"
            size="50px"
            onClick={updateLockValue}
          />
        )}
        <Backdrop open={isLoading}>
          <MoonLoader size={30} margin={2} color="#0E37AF" />
        </Backdrop>
        <GeneratedImage src={image} alt="" onClick={handleTargetClick} />
      </ImageWrapper>
    </>
  );
};

export default DesignTarget;
