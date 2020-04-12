import { ReactElement, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useGoogleSignIn from '../../hooks/useGoogleSignIn';
import { SignInButton, SignInButtonLogo } from './SignInButton';

const GoogleSignIn: FC = (): ReactElement => {
  const { onClick, isProcessing } = useGoogleSignIn();
  if (!onClick) {
    return null;
  }
  return (
    <GoogleSignInButton onClick={onClick.fn}>
      <GoogleIcon />
      <span
        css={css`
          margin-left: 20px;
        `}
      >
        Googleではじめる
      </span>
    </GoogleSignInButton>
  );
};

const GoogleIcon = styled(SignInButtonLogo)`
  background-image: url(/images/logo_google.svg);
`;

const GoogleSignInButton = styled(SignInButton)`
  color: rgba(0, 0, 0, 0.54);
  background-color: #fff;
`;

export default GoogleSignIn;
