import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { CommonStyleProps } from '../../styles/common';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export type TextFieldProps = CommonStyleProps & {
  type?: 'password';
  value: string;
  name?: string;
};

const TextField = (props: TextFieldProps): ReactElement => (
  <TextFieldPart type="text" {...props} css={css({ ...props })} />
);

const TextFieldPart = styled.input`
  display: block;
  width: calc(100% - 16px);
  max-width: 320px;
  height: 1.6rem;
  padding: 0.5rem;
  margin: auto;
  appearance: none;
  border: 1px solid #979797;
  border-radius: 6px;
`;

export default TextField;
