import { ReactElement, FC } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useFacebookSignIn from '../../hooks/useFacebookLogin';
import { SignInButton, SignInButtonLogo } from './SignInButton';

const FacebookSignIn: FC = (): ReactElement => {
  const { onClick, isProcessing } = useFacebookSignIn();
  if (!onClick) {
    return null;
  }
  return (
    <FacebookSignInButton onClick={onClick.fn}>
      <FacebookIcon />
      <span
        css={css`
          margin-left: 20px;
        `}
      >
        FaceBookではじめる
      </span>
    </FacebookSignInButton>
  );
};

const FacebookIcon = styled(SignInButtonLogo)`
  background-image: url(/images/logo_facebook.png);
`;

const FacebookSignInButton = styled(SignInButton)`
  color: #fff;
  background-color: #3b5998;
`;

export default FacebookSignIn;
