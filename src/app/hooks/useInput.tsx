import { useState, ChangeEvent } from 'react';

export interface InputProp {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (initialValue: string): InputProp => {
  const [value, set] = useState(initialValue);
  return { value, onChange: (e: ChangeEvent<HTMLInputElement>): void => set(e.target.value) };
};
