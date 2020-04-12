import { useEffect, useState } from 'react';
import { db } from '../firebaseInit';

export const useCheckUserExists = (userId: string): boolean => {
  let isMounted = true;
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (!userId) {
      setResult(false);
      return;
    }
    db.collection('user')
      .doc(userId)
      .get()
      .then(queryResult => {
        if (isMounted) {
          setResult(queryResult.exists);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);
  return result;
};
