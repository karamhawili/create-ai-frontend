import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { GlobalStyleLanding } from '../styles/globalStyles';

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  gap: 35px;
`;

const MainText = styled.h2`
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 12px;
  font-size: 26px; //overridden
`;

const AuthForm = styled.form`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  gap: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 316px;
  height: 50px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 17px;
  padding-left: 15px;
  padding-right: 15px;
  font-family: inherit;
  background-color: var(--bg-color-landing);
`;

const Button = styled.button`
  width: 316px;
  height: 50px;
  border-radius: 10px;
  font-size: 17px;
  margin-top: 16px;
`;

const Error = styled.p`
  ${(error) =>
    error &&
    `
    display: block;
    color: red;
    background-color: pink;
    text-align: center;
  `}
`;
const Login = styled.p`
  color: #4a47de;
  cursor: pointer;
  user-select: none;
  font-size: 17px;
`;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const { resetPassword } = useAuth();

  // let navigate = useNavigate()

  // const goToPlatform = () => {
  //   navigate('/')
  // }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setLoading(false); // done loading
      setError('Check your inbox for further instructions');
    } catch (error) {
      let code = error.code;
      // let msg = error.message
      switch (code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;

        case 'auth/network-request-failed':
          setError(
            'Network request failed. Check your internet connection and try again.'
          );
          break;

        default:
          console.log(error);
          break;
      }
      setLoading(false); // done loading
    }
  };

  return (
    <>
      <GlobalStyleLanding />
      <Container>
        <MainText>Reset your password</MainText>
        <AuthForm onSubmit={handleResetPassword}>
          {error && <Error>{error}</Error>}
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
            required
          />
          <Button disabled={loading} type="submit">
            Reset Password
          </Button>
        </AuthForm>
        {/* <Login onClick={goToPlatform}><strong>Back to Login</strong></Login> */}
      </Container>
    </>
  );
};

export default ForgotPassword;
