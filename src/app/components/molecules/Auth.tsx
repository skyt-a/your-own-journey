import { FC, useContext, useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { StoreContext, DispatchContext } from '../../pages/_app';
import { auth } from '../../firebaseInit';
import { SIGN_IN } from '../../actionTypes/ActionTypes';

export const Auth: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        dispatch({
          type: SIGN_IN,
          user,
        });
      }
    });
  }, []);
  return <Component {...pageProps} />;
};
