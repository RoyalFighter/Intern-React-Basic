// App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, Navigate } from 'react-router-dom';
import UseReducerDemo from './UseReducerDemo';
import Login from './Component/Login';
import Home from './Component/Home';
import { AuthContext } from './Context/AuthContext';
import { toast } from 'react-toastify';
import Meme from './Component/Meme';
import useDarkMode from './CustomHooks/useChangeMode';
import UseEffect from './Component/UseEffect';
import './App.css'
import Footer from './Component/Footer';

const ProtectedRoute = ({ isAuthenticated, path, element, actionOnUnauthenticated }) => {
  useEffect(() => {
    if (!isAuthenticated && actionOnUnauthenticated === 'toastError') {
      // Toastify to display an error toast
      toast.error('Please log in to view the content.');
    }
  }, [isAuthenticated, actionOnUnauthenticated]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/home">
            React_Basic
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <Link className="nav-link" to="/login" onClick={handleLogout}>
                    LogOut
                  </Link>
                ) : (
                  <NavLink className="nav-link" to="/login" activeClassName="active-link">
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/useReducer" activeClassName="active-link">
                  UseReducer Demo
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/useEffect" activeClassName="active-link">
                  UseEffect Demo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/meme" activeClassName="active-link">
                  Generate Meme
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={toggleDarkMode}>
                  Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>
              </li>
              
            </ul>
          </div>
        </nav>

        <div className="mt-3">
        <Routes>
            <Route
              path="/home"
              element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Home />} />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/useReducer"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<UseReducerDemo />}
                  actionOnUnauthenticated="toastError"
                />
              }
            />
            <Route
              path="/meme"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Meme />}
                  actionOnUnauthenticated="toastError"
                />
              }
            />
              <Route
              path="/useEffect"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<UseEffect />}
                  actionOnUnauthenticated="toastError"
                />
              }
            />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;