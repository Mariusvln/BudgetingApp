import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    // Note: Changed path to /api/auth/me to match your Java AuthController
    axios.get('http://localhost:8080/api/auth/me', { withCredentials: true })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    const res = await axios.post('http://localhost:8080/api/auth/login', credentials, { withCredentials: true });
    // After login, we immediately set the user so the app reacts
    const me = await axios.get('http://localhost:8080/api/auth/me', { withCredentials: true });
    setUser(me.data);
  };

  const register = async (userData) => {
    // Register usually returns a simple "OK" or the new user object
    await axios.post('http://localhost:8080/api/auth/register', userData, { withCredentials: true });
    // Usually, you don't setUser here unless your backend logs them in automatically
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {/* 
          IMPORTANT: Do not render children until loading is false. 
          This prevents protected routes from redirecting to /login while we are still checking the cookie.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
