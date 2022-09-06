import React, { useEffect, useState } from 'react';
import { GlobalStylePlatform } from '../../styles/globalStyles';
import styled, { css } from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import { BsShuffle } from 'react-icons/bs';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { generateOutputFromSeeds } from '../../aws/HelperFunctions';
import { updateOutputFirestore } from '../../firebase/firebaseFunctions';
import { useRouter } from 'next/router';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: fit-content;
  padding: 35px;
  height: 100%;
  position: relative;
`;

const Title = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
`;

const ImageWrapper = styled.div`
  height: 30vw;
  width: 30vw;
  border: 1px dashed #929aa4;
  border-radius: 20px;
  position: relative;
  cursor: pointer;

  & :hover {
    border: 1px solid #c2cdda;
    & > :first-child {
      display: block;
    }

    & > :nth-child(2) {
      display: block;
    }
  }
`;

const GeneratedImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const ButtonsWrap = styled.div`
  display: flex;
  //flex-direction: row-reverse;
  gap: 10px;
`;

const GenerateButton = styled.button`
  width: 110px;
  height: 52px;
  background-color: #1b1b1b;
  color: white;
  font-size: 0.9rem !important;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const DownloadButton = styled.button`
  width: 110px;
  height: 52px;
  background-color: white;
  color: black;
  border: 1px solid #929aa4;
  font-size: 0.9rem !important;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

const ClickGenerateContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;

  & p {
    line-height: 2em;
    color: #626567;
  }
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
    z-index: 20;
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

const GeneratedOutput = ({ output }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { fid } = router.query;

  const { currentTargets, currentOutput, setOutput } = useWorkspaceContext();

  const { currentUser } = useAuth();

  // the UI can be updates when the change is either:
  //          - coming from the props (team member updated the values)
  //          - coming from the states (admin updates the values)

  useEffect(() => {
    setOutput(output);
  }, [output]);

  const handleGenerateOutput = async () => {
    try {
      if (currentTargets.length === 0) {
        toast.error('There are no targets!');
        return;
      }
      setIsLoading(true);
      const results = await generateOutputFromSeeds(
        currentTargets.map((target) => target.seed)
      );
      await updateOutputFirestore(results.z_out, fid, currentUser.uid);
      setOutput({
        image: results.output,
        vector: JSON.stringify(results.z_out),
      });
      setIsLoading(false);
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <GlobalStylePlatform />
      <Container>
        <Title>Generated Output</Title>
        <ImageWrapper>
          <MainContent>
            {currentOutput?.image !== '' ? (
              <GeneratedImage src={currentOutput?.image} alt="" />
            ) : (
              <ClickGenerateContainer className=" select-none">
                <BsShuffle size="100px" color="#00A5E8" />
                <p>Click the generate button to start</p>
              </ClickGenerateContainer>
            )}
          </MainContent>
          <Backdrop open={isLoading}>
            <MoonLoader size={30} margin={2} color="#0E37AF" />
          </Backdrop>
        </ImageWrapper>
        <ButtonsWrap>
          <GenerateButton disabled={isLoading} onClick={handleGenerateOutput}>
            Generate
          </GenerateButton>
          <DownloadButton>Download</DownloadButton>
        </ButtonsWrap>
      </Container>
    </>
  );
};

export default GeneratedOutput;
