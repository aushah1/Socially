import { Navigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect } from "react";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading, handleGetMe } = useAuth();
  useEffect(() => {
    handleGetMe();
  }, []);


  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
