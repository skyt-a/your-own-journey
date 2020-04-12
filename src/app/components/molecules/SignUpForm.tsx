import TextField from '../atoms/TextField';
import { InputProp } from '../../hooks/useInput';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import GoogleSignIn from '../atoms/GoogleSignIn';
import TwitterSignIn from '../atoms/TwitterSignIn';
import FacebookSignIn from '../atoms/FacebookSignIn';
import { Button } from '../atoms/Button';
import MailSignIn from '../atoms/MailSignIn';

export interface SignUpFormProps {
  mail: InputProp;
  password: InputProp;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ mail, password }: SignUpFormProps) => {
  return (
    <SignUpFormWrapper>
      <GoogleSignIn />
      <TwitterSignIn />
      <FacebookSignIn />
      <MailSignInWrapper>
        <TextFieldSignUp {...mail} />
        <TextFieldSignUp type="password" {...password} />
        <MailSignIn mail={mail.value} password={password.value} />
      </MailSignInWrapper>
    </SignUpFormWrapper>
  );
};

const SignUpFormWrapper = styled.article`
  display: grid;
  grid-auto-columns: min-content;
  justify-content: center;
  row-gap: 8px;
`;

const MailSignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const TextFieldSignUp = styled(TextField)`
  width: 80%;
  margin: 2px auto 0;

  &:last-of-type {
    margin-bottom: 8px;
  }
`;

export default SignUpForm;
