import { Navigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading, handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
