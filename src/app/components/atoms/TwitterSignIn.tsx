import { ReactElement, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useTwitterSignIn from '../../hooks/useTwitterLogin';
import { SignInButton, SignInButtonLogo } from './SignInButton';

const TwitterSignIn: FC = (): ReactElement => {
  const { onClick, isProcessing } = useTwitterSignIn();
  if (!onClick) {
    return null;
  }
  return (
    <TwitterSignInButton onClick={onClick.fn}>
      <TwitterIcon />
      <span
        css={css`
          margin-left: 20px;
        `}
      >
        Twitterではじめる
      </span>
    </TwitterSignInButton>
  );
};

const TwitterIcon = styled(SignInButtonLogo)`
  background-image: url(/images/logo_twitter.svg);
`;

const TwitterSignInButton = styled(SignInButton)`
  color: #f5f8fa;
  background-color: #1da1f2;
`;

export default TwitterSignIn;
