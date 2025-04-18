import { useState } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };

  return { message, visible, showToast };
};
