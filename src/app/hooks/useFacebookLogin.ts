import { firebase } from '../firebaseInit';
import useAuthSignIn, { UseAuthSignInReturnType } from './useAuthSignIn';

const useFacebookSignIn = (): UseAuthSignInReturnType => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return useAuthSignIn(provider);
};

export default useFacebookSignIn;
