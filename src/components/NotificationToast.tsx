import React from 'react';

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl animate-pulse">
      <div className="flex items-center justify-between space-x-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">X</button>
      </div>
    </div>
  );
};

export default NotificationToast;
