import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import TopicPage from './pages/TopicPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';
import buttonSvg from './assets/button.svg';
import daySvg from './assets/day.svg';
import nightSvg from './assets/night.svg';
import LandingPage from './pages/LandingPage';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => setIsAuthenticated(true);

  const topics = ['Technology', 'Sports', 'Culture', 'Entertainment'];

  return (
    <Router>
      <Navbar />
      <button className="toggle-button" onClick={toggleSidebar}>
        <img src={buttonSvg} alt="Toggle Sidebar" />
      </button>
      <button className="theme-switch-button" onClick={toggleTheme}>
        <img src={darkMode ? daySvg : nightSvg} alt="Toggle Theme" className="theme-icon" />
      </button>
      {showSidebar && (
        <div className="sidebar-container">
          <Sidebar topics={topics} />
        </div>
      )}
      <div className={`main-content ${showSidebar ? 'sidebar-visible' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard topics={topics} /> : <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          {topics.map((topic, index) => (
            <Route
              key={index}
              path={`/topics/${topic.toLowerCase()}`}
              element={<TopicPage topic={topic} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
