import { FC, useContext } from 'react';
import styled from '@emotion/styled';
import { StoreContext } from './_app';
import { useSignIn } from '../hooks/useSignIn';
import { getValueFromKey, genders } from '../data/common';

const Register: FC<{}> = () => {
  const store = useContext(StoreContext);
  useSignIn();
  return (
    <main>
      <RegisterTitle>あなたのことについて教えてください</RegisterTitle>
      <h2>ニックネーム</h2>
      {store.userInfo?.name}
      <h2>性別</h2>
      {getValueFromKey(store.userInfo?.gender, genders)}
      <h2>職業</h2>
      {store.userInfo?.work}
      <h2>画像</h2>
      <img src={store.userInfo?.image} />
    </main>
  );
};

const RegisterTitle = styled.h1`
  font-size: 1.5rem;
`;

export default Register;
