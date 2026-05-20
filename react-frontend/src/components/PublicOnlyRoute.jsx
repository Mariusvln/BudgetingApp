import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
