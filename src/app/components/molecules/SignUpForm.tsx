import TextField from '../atoms/TextField';
import { InputProp } from '../../hooks/useInput';
import styled from 'styled-components';

export interface SignUpFormProps {
  mail: InputProp;
  password: InputProp;
  onSubmit: () => Promise<void>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ mail, password, onSubmit }: SignUpFormProps) => {
  return (
    <SignUpFormWrapper>
      <TextFieldSignUp {...mail} />
      <TextFieldSignUp type="password" {...password} />
      <button type="button" onClick={onSubmit}>
        新規登録
      </button>
    </SignUpFormWrapper>
  );
};

const SignUpFormWrapper = styled.article`
  text-align: center;
`;

const TextFieldSignUp = styled(TextField)`
  width: 80%;
  margin: 12px auto;
`;

export default SignUpForm;
