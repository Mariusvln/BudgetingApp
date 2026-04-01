import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Kol tikriname slapuką per API, nieko nerodome arba rodome krovimosi ikoną
  if (loading) return <div>Loading...</div>;

  // Jei vartotojo nėra - siunčiame į login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
