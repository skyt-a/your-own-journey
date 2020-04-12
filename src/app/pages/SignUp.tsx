import { useInput } from '../hooks/useInput';
import SignUpForm, { SignUpFormProps } from '../components/molecules/SignUpForm';
import { useContext } from 'react';
import { StoreContext } from './_app';
import { useCheckUserExists } from '../hooks/useCheckUserExists';
import { useRouter } from 'next/router';
import { useSignIn } from '../hooks/useSignIn';

const SignUp: React.FC = () => {
  const mail = useInput('');
  const password = useInput('');
  const signUpProps: SignUpFormProps = { mail, password };
  const store = useContext(StoreContext);
  const userExists = useCheckUserExists(store.user?.uid);
  const router = useRouter();
  useSignIn();
  if (store.user?.uid && !userExists) {
    router.push('/Register');
  }
  return <SignUpForm {...signUpProps} />;
};

export default SignUp;
