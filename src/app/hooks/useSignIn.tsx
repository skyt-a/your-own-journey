import { User } from 'firebase';
import { useContext, useEffect } from 'react';
import { DispatchContext } from '../pages/_app';
import { db, auth } from '../firebaseInit';
import { SIGN_IN } from '../actionTypes/ActionTypes';

export const useSignIn = (): void => {
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    let isMounted = true;
    const fn = async (): Promise<void> => {
      const user: User = await new Promise<User>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(result => {
          unsubscribe();
          resolve(result);
        });
      });
      console.log(user);
      if (!user?.uid) {
        return;
      }
      const result = await db
        .collection('user')
        .doc(user?.uid)
        .get();
      if (isMounted) {
        const userInfo = result.data();
        dispatch({
          type: SIGN_IN,
          user,
          userInfo,
        });
      }
    };
    fn();
    return () => {
      isMounted = false;
    };
  }, []);
};
