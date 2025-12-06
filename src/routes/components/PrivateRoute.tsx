import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AuthContext } from 'src/contexts/AuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
