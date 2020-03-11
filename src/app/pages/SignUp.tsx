import { useInput } from '../hooks/useInput';
import { auth } from '../firebaseInit';
import SignUpForm, { SignUpFormProps } from '../components/molecules/SignUpForm';

const SignUp: React.FC = () => {
  const mail = useInput('');
  const password = useInput('');
  const onSubmit = async (): Promise<void> => {
    await auth
      .createUserWithEmailAndPassword(mail.value, password.value)
      .then(user => console.log(user));
  };
  const signUpProps: SignUpFormProps = { mail, password, onSubmit };
  return <SignUpForm {...signUpProps} />;
};

export default SignUp;
