import useMailSignIn from '../../hooks/useMailSignIn';
import { FC } from 'react';
import { Button } from './Button';

export interface MailSignInProps {
  mail: string;
  password: string;
}

const MailSignIn: FC<MailSignInProps> = ({ mail, password }: MailSignInProps) => {
  const { onClick, isProcessing } = useMailSignIn();
  if (!onClick) {
    return null;
  }
  const createEmailUser = (): void => onClick.fn(mail, password);
  return (
    <Button
      onClick={createEmailUser}
      text="メールで新規登録"
      customStyle={{
        width: '100%',
      }}
    />
  );
};

export default MailSignIn;
