// components/auth/AuthGuard.jsx
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;