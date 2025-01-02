import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Not logged in, redirect to '/' or '/login'
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, render the protected component
  return children;
}
