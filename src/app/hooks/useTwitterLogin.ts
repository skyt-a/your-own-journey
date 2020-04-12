import { firebase } from '../firebaseInit';
import useAuthSignIn, { UseAuthSignInReturnType } from './useAuthSignIn';

const useTwitterSignIn = (): UseAuthSignInReturnType => {
  const provider = new firebase.auth.TwitterAuthProvider();
  return useAuthSignIn(provider);
};

export default useTwitterSignIn;
