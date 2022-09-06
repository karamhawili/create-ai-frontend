import Image from 'next/image';
import Illustration from '../../public/landing_illustrations/ShoesOnPillars.svg';
import styled from 'styled-components';
import ParagraphStyle from './ParagraphStyle';

const Container = styled.div`
  min-height: 800px;
  padding-top: 100px;
  padding-bottom: 100px;
  padding-right: 80px;
  text-align: right;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: relative;
`;

const TextContainer = styled.div`
  h3 {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 20px;
  }
  max-width: 670px;
`;

const SVG = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
  width: 685px;
  margin-top: 20px;
`;

const Paragraph = styled.p`
  ${ParagraphStyle}
`;

const Fashion = () => {
  return (
    <section>
      <Container>
        <SVG src={Illustration} alt="" layout="raw" />
        <TextContainer>
          <h3>First Stop, Fashion Industry</h3>
          <h2>create.ai - Fashion</h2>
          <Paragraph>
            In this early experimental version of create.ai, we trained NVIDIA
            <sup>TM</sup>’s GAN model, StyleGAN2-ADA, on about 10,000 pictures
            of shoes, and more specifically, sneakers, from over 100 brands.
            <br />
            <span>
              However, the idea behind our platform can be expanded across many
              other industries.
            </span>
          </Paragraph>
        </TextContainer>
      </Container>
    </section>
  );
};

export default Fashion;
