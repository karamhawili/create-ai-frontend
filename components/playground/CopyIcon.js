import styled from 'styled-components';
import { FiCopy } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  height: fit-content;
`;

const Icon = styled(FiCopy)``;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  & :hover {
    & > :nth-child(2) {
      display: block;
    }
  }

  & > :nth-child(2) {
    display: none;
    position: absolute;
    right: -10px;
    background-color: white;
    border: 1px solid #899099;
    width: max-content;
    //box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.8rem;
    margin-top: 7px;
    color: #1b1b1b;
    font-weight: 300;
  }
`;

const CopyIcon = () => {
  const router = useRouter();
  const fid = router.query.fid;

  const copyIDToClipboard = () => {
    navigator.clipboard.writeText(fid);
    toast.success('ID copied to clipboard');
  };

  return (
    <Container>
      <Dropdown>
        <Icon
          className=" cursor-pointer"
          onClick={copyIDToClipboard}
          size="25px"
        />
        <div className=" shadow-lg">copy ID to clipboard</div>
      </Dropdown>
    </Container>
  );
};

export default CopyIcon;
