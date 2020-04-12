import { useState, useEffect, useContext } from 'react';
import { firebase, auth } from '../firebaseInit';
import { DispatchContext } from '../pages/_app';
import { SIGN_IN } from '../actionTypes/ActionTypes';

export interface UseEmailSignInReturnType {
  onClick: { fn: (mail: string, password: string) => void };
  isProcessing: boolean;
}

const useMailSignIn = (): UseEmailSignInReturnType => {
  const [onClick, setOnClick] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    const fn = async (mail, password): Promise<void> => {
      console.log(mail);
      setIsProcessing(true);
      const userCredential: firebase.auth.UserCredential = await auth
        .createUserWithEmailAndPassword(mail, password)
        .catch(null);
      if (userCredential && userCredential.user) {
        const { user, additionalUserInfo } = userCredential;
        dispatch({
          type: SIGN_IN,
          state: {
            user,
            additionalUserInfo,
          },
        });
      } else {
        console.error('mail login failure');
      }
      setIsProcessing(false);
    };
    setOnClick({ fn });
  }, []);
  return { onClick, isProcessing };
};

export default useMailSignIn;
