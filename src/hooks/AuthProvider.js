import React, { useState, createContext, useCallback, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const userStorage = localStorage.getItem('@hackernews:user');
    if (userStorage) return { ...JSON.parse(userStorage) };
    return {};
  });

  const [authToken] = useState(() => {
    const tokenStorage = localStorage.getItem('@hackernews:token');
    return tokenStorage;
  });

  const signIn = useCallback(() => {

  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@hackernews:user');
    localStorage.removeItem('@hackernews:token');
    setUser({});
  }, []);

  return (
    <AuthContext.Provider value={{ user, authToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthProvider;