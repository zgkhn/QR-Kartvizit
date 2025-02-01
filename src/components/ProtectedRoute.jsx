import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState';

function ProtectedRoute() {
  const { user, loading } = useAuthState();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;