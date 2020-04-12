import { useEffect } from 'react';

export const useSafetyEffect = (func: () => void, dependency: any[]) => {
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      func();
    }
    return () => {
      unmounted = true;
    };
  });
};
