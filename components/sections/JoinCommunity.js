import { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useLoginContext } from '../../contexts/LoginContext';
import { handleLoginFirestore } from '../../firebase/firebaseFunctions';
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 36px;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const MainText = styled.h2`
  margin-bottom: 10px;
  font-size: 2.7rem !important; //overridden
  letter-spacing: 0.2em;
  font-weight: 600;
`;
const AuthForm = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  gap: 30px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 62px;
  border: 1.8px solid black;
  border-radius: 10px;
  font-size: 1.2rem;
  padding-left: 20px;
  padding-right: 20px;
  font-family: inherit;
  background-color: var(--bg-color-landing-container);
`;
const Button = styled.button`
  width: 48%;
  height: 60px;
  margin-top: 5px;
  background-color: black;
`;
const ForgotPassword = styled.p`
  color: var(--color-blue-primary);
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
`;
const LoginSignup = styled.div`
  user-select: none;
  font-size: 1.2rem;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;

  p {
    display: inline-block;
    color: var(--color-blue-primary);
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Divider = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  hr {
    width: 200px;
    background: black;
    border: none;
    border-radius: 5px;
    height: 1px;
    background-color: gray;
  }

  span {
    margin-top: -1.5px;
    font-size: 1.2rem;
  }
`;

const ContinueWithGoogle = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  cursor: pointer;

  :hover {
    color: #4a47de;
  }
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

// code

const JoinCommunity = ({}) => {
  console.log('Rendering JC');

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isLogin, setIsLogin] = useState(false) // switch b/ sign up and login UI components (whatever the user decides)

  const { isLogin, setLogin } = useLoginContext();

  const { signup, login, currentUser, signInWithGoogle } = useAuth();

  const router = useRouter();

  const goToFrogotPassword = () => {
    router.push('/forgot_password');
  };

  //sign up
  const handleSignUp = async (event) => {
    event.preventDefault(); // prevent refreshing

    console.log('Signing user up...');

    // // passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setConfirmPassword('');
      return;
    }

    // if all valid, execute
    try {
      setError('');
      setLoading(true);
      await signup(email, password).then(async (userCredential) => {
        let user = userCredential.user;
        // add user to users collection
        await handleLoginFirestore(user?.uid, user?.email);
        setLoading(false); // done loading
        router.push('/platform/home?uid=' + user?.uid);
      });
    } catch (error) {
      let code = error.code;
      let msg = error.message;
      console.log('Error ', code);
      if (code === 'auth/weak-password') {
        setError('The password is too weak.');
      } else {
        setError(msg);
      }
      console.log(error);
      setLoading(false); // done loading
    }
  };

  // login
  const handleLogin = async (event) => {
    event.preventDefault(); // prevent refreshing

    console.log('Logging user in...');

    // if all valid, execute
    try {
      setError('');
      setLoading(true);
      await login(email, password).then(async (userCredential) => {
        let user = userCredential.user;
        // update user status in users collection
        await handleLoginFirestore(user?.uid);
        setLoading(false); // done loading
        router.push('/platform/home?uid=' + user?.uid);
      });
    } catch (error) {
      let code = error.code;
      // let msg = error.message
      console.log('Error ', code);
      switch (code) {
        case 'auth/wrong-password':
          setError('Wrong password!');
          break;

        case 'auth/user-not-found':
          setError('Account not found!');
          break;

        case 'auth/network-request-failed':
          setError(
            'Network request failed. Check your internet connection and try again.'
          );
          toast.warn('Check your internet connection!');
          break;

        default:
          console.log(error);
          break;
      }
      setLoading(false); // done loading
    }
  };

  const continueWithGoogle = () => {
    signInWithGoogle();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // console.log('Error', error)
  // console.log('Loading', loading)
  // console.log('isLogin', isLogin)
  // console.log('isLogin in JC', isLogin)

  return (
    <section id="JoinCommunity">
      <Container>
        <MainText>Let's Get Started!</MainText>
        <AuthForm onSubmit={isLogin ? handleLogin : handleSignUp}>
          {error && <Error>{error}</Error>}
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <Input
            hidden={isLogin}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
          />
          <Button disabled={loading} type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </AuthForm>
        <ForgotPassword onClick={goToFrogotPassword} hidden={!isLogin}>
          Forgot Password?
        </ForgotPassword>
        <LoginSignup>
          {isLogin ? 'New to create.ai?' : 'Already have an account?'}
          <p onClick={() => setLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </p>
        </LoginSignup>
        <Divider>
          <hr></hr>
          <span>or</span>
          <hr></hr>
        </Divider>
        <ContinueWithGoogle>
          <FcGoogle size={30} />
          <p disabled={loading} onClick={continueWithGoogle}>
            Continue with Google
          </p>
        </ContinueWithGoogle>
      </Container>
    </section>
  );
};

export default JoinCommunity;
