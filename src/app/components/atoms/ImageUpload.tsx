import { FC, ChangeEvent } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

export interface ImageUploadProps {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ImageUpload: FC<ImageUploadProps> = (props: ImageUploadProps) => (
  <>
    <ImageUploadButton htmlFor={`id-${props.name}`}>ファイルをアップロードする</ImageUploadButton>
    <input
      id={`id-${props.name}`}
      type="file"
      accept="*.jpg,*.png,*.gif,*.bmp,*.svg"
      css={css`
        display: none;
      `}
      onChange={props.onChange}
    />
    {props.value && <Image src={props.value} />}
  </>
);

const Image = styled.img`
  width: 100%;
  margin-top: 16px;
`;

const ImageUploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 320px;
  height: 1.6rem;
  padding: 12px;
  margin: auto;
  font-size: 1.4rem;
  background-color: #0074bf;
  color: #fff;
  border-radius: 10px;
`;
