import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { applyCommonStyle } from '../../styles/common';

export interface SelectOption {
  key: number;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  name?: string;
}

const Select = (props: SelectProps): ReactElement => (
  <SelectPart
    {...props}
    css={css`
      ${applyCommonStyle({ ...props })}
    `}
  >
    {props.options.map(option => (
      <option key={option.key} value={option.key}>
        {option.value}
      </option>
    ))}
  </SelectPart>
);

const SelectPart = styled.select`
  display: block;
  box-sizing: content-box;
  width: calc(100% - 16px);
  max-width: 320px;
  height: 1.6rem;
  padding: 0.5rem;
  margin: auto;
  appearance: none;
  background-color: #fff;
  border: 1px solid #979797;
  border-radius: 6px;
`;

export default Select;
