import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on first render
    const stored = window.localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
