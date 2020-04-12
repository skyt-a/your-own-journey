import { css } from '@emotion/core';

export interface CommonStyleProps {
  width?: number;
  height?: number;
  customStyle?: Record<string, string>;
}

export const applyCommonStyle = ({
  width,
  height,
  customStyle,
}: CommonStyleProps & any): string => `
    ${width && `width: ${width}px`};
    ${height && `height: ${height}px`};
    ${customStyle &&
      Object.keys(customStyle)
        .map(key => `${key}:${customStyle[key]};`)
        .join('')}
`;
