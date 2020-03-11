import { ReactElement } from 'react';
import styled from 'styled-components';

export interface TextFieldProps {
  type?: 'password';
  value: string;
  name?: string;
}

const TextField = (props: TextFieldProps): ReactElement => <TextFieldPart type="text" {...props} />;

const TextFieldPart = styled.input`
  display: block;
  height: 1.2rem;
  padding: 0.5rem;
  appearance: none;
  border: 1px solid #979797;
  border-radius: 10px;
`;

export default TextField;
