import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState';

function AdminRoute() {
  const { user, loading, isAdmin } = useAuthState();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;