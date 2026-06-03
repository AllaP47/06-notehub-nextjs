import React from 'react';

// Якщо у майбутньому GoIT додасть ErrorMessage.module.css, його можна імпортувати тут.
// Наразі використовуємо прості вбудовані інлайн-стилі, щоб не ламалася збірка.
interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Something went wrong.' 
}) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', color: '#dc3545' }}>
      <p style={{ fontSize: '16px', fontWeight: '500' }}>⚠️ {message}</p>
    </div>
  );
};
