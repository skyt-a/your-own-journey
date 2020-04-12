import { firebase } from '../firebaseInit';
import useAuthSignIn, { UseAuthSignInReturnType } from './useAuthSignIn';

const useGoogleSignIn = (): UseAuthSignInReturnType => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return useAuthSignIn(provider);
};

export default useGoogleSignIn;
