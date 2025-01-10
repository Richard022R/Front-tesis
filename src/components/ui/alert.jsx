// src/components/ui/alert.jsx
import React from 'react';

export const Alert = ({ children, variant }) => {
  const variantClass = variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white';
  return (
    <div className={`p-4 rounded-md ${variantClass}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p>{children}</p>;
};
