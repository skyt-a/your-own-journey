import { useRouter } from 'next/router';
import { FC, useContext, useEffect } from 'react';
import { useInput } from '../hooks/useInput';
import TextField from '../components/atoms/TextField';
import Select, { SelectOption } from '../components/atoms/Select';
import styled from '@emotion/styled';
import { StoreContext } from './_app';
import { ImageUpload } from '../components/atoms/ImageUpload';
import { useImageUpload } from '../hooks/useImageUpload';
import { Button } from '../components/atoms/Button';
import { useRegister } from '../hooks/useRegister';
import { RegisterUserInfo } from '../types/user';
import { genders } from '../data/common';
import { css } from '@emotion/core';

const Register: FC<{}> = () => {
  const store = useContext(StoreContext);
  const uid = !store.user?.uid;
  const name = useInput(store.user?.displayName);
  const gender = useInput(String(genders[0].key));
  const work = useInput('');
  const image = useImageUpload(null);
  const { onClick, isProcessing } = useRegister();
  if (!onClick) {
    return null;
  }
  const onClickParam: RegisterUserInfo = {
    userId: store.user?.uid,
    name: name.value,
    gender: gender.value,
    work: work.value,
    image: image.value,
  };
  const onClickFunc = () => onClick.fn(onClickParam);
  return (
    <>
      <RegisterTitle>あなたのことについて教えてください</RegisterTitle>
      <h2>ニックネーム</h2>
      <TextField {...name} />
      <h2>性別</h2>
      <Select {...gender} options={genders} />
      <h2>職業</h2>
      <TextField {...work} />
      <h2>画像</h2>
      <ImageUpload {...image} name="main" />
      <Button
        text="登録する"
        onClick={onClickFunc}
        css={css`
          margin-top: 8px;
        `}
      />
    </>
  );
};

const RegisterTitle = styled.h1`
  font-size: 1.5rem;
`;

export default Register;
