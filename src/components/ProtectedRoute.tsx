// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { getUserRole, hasPermission, UserRole } from '@/utils/auth';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const role = getUserRole();

  if (!hasPermission(allowedRoles, role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
