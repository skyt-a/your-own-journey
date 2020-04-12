import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { CommonStyleProps, applyCommonStyle } from '../../styles/common';

interface ButtonStyle {
  color: string;
  background: string;
}

const defaultTheme = {
  main: {
    color: '#fff',
    background: '#d06d8c',
  },
  sub: {
    color: '#fff',
    background: '#0074bf',
  },
  third: {
    color: '#fff',
    background: '#fff001',
  },
};

type ButtonProp = CommonStyleProps & {
  text: string;
  style?: 'main' | 'sub' | 'third' | ButtonStyle;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Button: FC<ButtonProp> = ({
  text,
  onClick,
  style,
  width,
  height,
  customStyle,
}: ButtonProp) => {
  const [buttonStyle, setButtonStyle] = useState(null);
  useEffect(() => {
    let target: 'main' | 'sub' | 'third' | ButtonStyle = defaultTheme['main'];
    if (style) {
      target = style;
      if (typeof style === 'string') {
        target = defaultTheme[style];
      }
    }
    setButtonStyle(target);
  }, []);
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      css={
        buttonStyle &&
        css`
          color: ${buttonStyle.color};
          background: ${buttonStyle.background};
          ${applyCommonStyle({ width, height, customStyle })}
        `
      }
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: block;
  width: 90%;
  max-width: 320px;
  padding: 12px;
  margin: auto;
  font-size: 1.4rem;
  appearance: none;
  border-radius: 10px;
  border: none;
`;
