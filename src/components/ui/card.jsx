// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h3 className="text-xl font-bold">{children}</h3>;
};
