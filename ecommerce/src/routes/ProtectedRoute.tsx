import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? children : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;