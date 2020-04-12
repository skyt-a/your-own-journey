import { useState, ChangeEvent } from 'react';
import { processImage, doCheckUploadedImageFileExtension } from '../utls/image';

export interface ImageUploadProp {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const useImageUpload = (initialValue: string): ImageUploadProp => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const input = e.target;
      const file = input.files[0];
      const reader = new FileReader();
      const extension = await doCheckUploadedImageFileExtension(event);
      reader.addEventListener('load', async e => {
        const src = (await processImage(e.target.result, file, extension)) as string;
        set(src);
      });
      if (extension === 'jpg') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsDataURL(file);
      }
    },
  };
};
