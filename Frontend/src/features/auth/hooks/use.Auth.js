import { register, login, logout, getMe } from "../services/auth.api";
import { useEffect, useContext } from "react";
import { AuthContext } from "../auth.context";


export const useAuth = () => {
  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context;



  async function handleRegister({ username, email, password }) {
    setLoading(true)
    const data = await register({ username, email, password })
    setUser(data.user)
    setLoading(false)

  }


  async function handleLogin({ username, email, password }) {
    setLoading(true)
    const data = await login({ username, email, password })
    setUser(data.user)
    setLoading(false)
  }


  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }


  async function handleGetMe() {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      // Agar user not logged in hai toh user ko null kar do
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    { user, loading, handleRegister, handleLogin, handleLogout, handleGetMe }
  )
}