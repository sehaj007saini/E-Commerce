import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      return parsed.role === 'ROLE_ADMIN' || parsed.username === 'admin';
    }
    return localStorage.getItem('isAdmin') === 'true';
  });

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    const adminFlag = userData.role === 'ROLE_ADMIN' || userData.username === 'admin';
    setIsAdmin(adminFlag);

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken || 'token-sample');
    localStorage.setItem('isAdmin', adminFlag ? 'true' : 'false');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAdmin(parsed.role === 'ROLE_ADMIN' || parsed.username === 'admin');
      } else {
        setUser(null);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      }
      setToken(localStorage.getItem('token') || null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, loginUser, logout, login: loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
