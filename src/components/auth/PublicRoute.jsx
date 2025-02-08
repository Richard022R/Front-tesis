// components/auth/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    // Si el usuario está logueado, redirigir al dashboard o a la ruta según su rol
    return <Navigate to={userInfo.role === 'admin' ? '/Secretaria' : '/dashboard'} replace />;
  }

  return children;
};

export default PublicRoute;