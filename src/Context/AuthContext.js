// AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  email: 'user@gmail.com', // Dummy email value
  password: 'password', // Dummy password value
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored authentication data when the component mounts
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      const currentTime = new Date().getTime();

      if (currentTime < authData.expirationTime) {
        // If the token is not expired, set authentication state
        dispatch({ type: 'LOGIN' });
      }
    }
  }, []);

  const login = () => {
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // One day from now
    const authData = { ...state, expirationTime };
    
    localStorage.setItem('authData', JSON.stringify(authData));
    dispatch({ type: 'LOGIN' });
  };

  const logout = () => {
    localStorage.removeItem('authData');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
