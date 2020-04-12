import { useState, useEffect } from 'react';
import { RegisterUserInfo } from '../types/user';
import { db, storageRef } from '../firebaseInit';

export interface UseRegisterReturnType {
  onClick: { fn: (info: RegisterUserInfo) => void };
  isProcessing: boolean;
}

export const useRegister = (): UseRegisterReturnType => {
  const [onClick, setOnClick] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    setOnClick({
      fn: async (info: RegisterUserInfo) => {
        const mainImageRef = storageRef.child(`mainImage-${info.userId}`);
        const snapshot = await mainImageRef.putString(info.image.substring(23), 'base64');
        db.collection('user')
          .doc(info.userId)
          .set({
            ...info,
            image: await snapshot.ref.getDownloadURL(),
          });
      },
    });
  }, []);
  return { onClick, isProcessing };
};
