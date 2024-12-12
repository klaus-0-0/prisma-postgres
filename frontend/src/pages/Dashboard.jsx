import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Home from '../pages/Home';
import TopicPage from '../pages/TopicPage';
import '../index.css';
import buttonSvg from '../assets/button.svg';
import daySvg from '../assets/day.svg';
import nightSvg from '../assets/night.svg';

const Dashboard = ({ topics, isAuthenticated }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <button className="toggle-button" onClick={toggleSidebar}>
        <img src={buttonSvg} alt="Toggle Sidebar" />
      </button>
      <button className="theme-switch-button" onClick={toggleTheme}>
        <img src={darkMode ? daySvg : nightSvg} alt="Toggle Theme" className="theme-icon" />
      </button>
      {showSidebar && (
        <div className="sidebar-container">
          <a href="/" className="home-button">Home</a>
          <Sidebar topics={topics} />
        </div>
      )}
      <div className={`main-content ${showSidebar ? 'sidebar-visible' : ''}`}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          {topics && topics.map((topic, index) => (
            <Route
              key={index}
              path={`/topics/${topic.toLowerCase()}`}
              element={<TopicPage topic={topic} />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
