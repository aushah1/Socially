import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, loginUser, registerUser } from "../services/auth.api";

export function useAuth() {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await registerUser(username, email, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    try {
      const res = await getMe();
      console.log(res.user);
      setUser(res.user);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMe;
  }, []);

  return {
    user,
    setUser,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
  };
}
