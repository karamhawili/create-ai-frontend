import React from 'react';
import { Dialog } from '@headlessui/react';
import { useDialogContext } from '../../contexts/DialogContext';
import styled from 'styled-components';
import {
  addNewFileFirestore,
  addNewProjectFirestore,
} from '../../firebase/firebaseFunctions';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const DialogS = styled(Dialog)`
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const DialogOverlay = styled(Dialog.Overlay)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.form`
  width: 500px;
  height: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 30px;
  border-radius: 20px;
`;

const DialogTitle = styled(Dialog.Title)`
  color: black;
  font-size: 1.7rem;
  letter-spacing: 0.02em;
  font-family: 'Poppins', sans-serif;
`;

const TitleInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 35px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: right;
  gap: 10px;
  width: 100%;
`;

const ButtonSubmit = styled.button`
  color: white;
  font-size: 0.9rem;
  background-color: var(--color-blue-secondary);
  width: 120px;
  height: 43px;
  border-radius: 10px;
`;

const ButtonCancel = styled.button`
  color: black;
  font-size: 0.9rem;
  background-color: transparent;
  width: 120px;
  height: 43px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-bottom: 1px solid #1a1a1a;
  outline: none;
  font-family: 'Quicksand', sans-serif;
`;

const Error = styled.p`
  background-color: red;
  color: white;
`;

const ModalDialog = ({ context }) => {
  /**
   *
   *
   * context  prop is either 'file' or 'project'
   */

  if (context !== 'file' && context !== 'project') return null;

  const { isOpen, setOpen } = useDialogContext();
  const [inputValue, setInputValue] = React.useState('');

  const isFile = context === 'file' ? true : false;

  const { currentUser } = useAuth();

  const router = useRouter();
  const { pid } = router.query;

  const createNewProject = async (event) => {
    event.preventDefault();
    try {
      await addNewProjectFirestore(
        inputValue,
        currentUser.uid,
        currentUser.email
      );
      setOpen(false);
      toast.success('Created Project ' + inputValue);
    } catch (e) {
      console.log(e);
    }
    setInputValue('');
  };

  const createNewFile = async (event) => {
    event.preventDefault();
    try {
      await addNewFileFirestore(
        inputValue,
        currentUser.uid,
        currentUser.email,
        pid
      );
      setOpen(false);
      toast.success('Created File ' + inputValue);
    } catch (e) {
      console.log(e);
    }
    setInputValue('');
  };

  const handleClose = () => {
    setInputValue('');
    setOpen(false);
  };

  return (
    <>
      <DialogS open={isOpen} onClose={handleClose}>
        <DialogOverlay>
          <DialogBox
            className="shadow-xl"
            onSubmit={isFile ? createNewFile : createNewProject}
          >
            <TitleInputWrap>
              <DialogTitle>Create new {context}</DialogTitle>
              <Input
                type="text"
                placeholder={`Please enter a ${context} name`}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </TitleInputWrap>

            <ButtonWrap>
              <ButtonSubmit type="submit">Create {context}</ButtonSubmit>
              <ButtonCancel type="button" onClick={handleClose}>
                Cancel
              </ButtonCancel>
            </ButtonWrap>
          </DialogBox>
        </DialogOverlay>
      </DialogS>
    </>
  );
};

export default ModalDialog;
