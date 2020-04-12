import { firebase, auth } from '../firebaseInit';
import { useEffect, useState, useContext } from 'react';
import { DispatchContext } from '../pages/_app';
import { SIGN_IN } from '../actionTypes/ActionTypes';

export interface UseAuthSignInReturnType {
  onClick: { fn: () => void };
  isProcessing: boolean;
}

const useAuthSignIn = (provider: firebase.auth.AuthProvider): UseAuthSignInReturnType => {
  const [onClick, setOnClick] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    const fn = async (): Promise<void> => {
      setIsProcessing(true);
      const userCredential: firebase.auth.UserCredential = await auth
        .signInWithPopup(provider)
        .catch(null);
      if (!userCredential?.user) {
        console.error('login failure');
      }
      setIsProcessing(false);
    };
    setOnClick({ fn });
  }, []);
  return { onClick, isProcessing };
};

export default useAuthSignIn;
